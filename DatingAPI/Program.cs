using DatingAPI.Data;
using DatingAPI.Data.Repositories;
using DatingAPI.Interfaces;
using DatingAPI.Interfaces.IRepositories;
using DatingAPI.Middleware;
using DatingAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IMemberService, MemberService>();

builder.Services.AddScoped<IMemberRepository, MemberRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var tokenKey = builder.Configuration["TokenKey"] ?? throw new InvalidOperationException("Token key is not configured.");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
   

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("AllowAngularApp");

// Configure the HTTP request pipeline.

//if (app.Environment.IsDevelopment())
//{
//    app.MapOpenApi();
//}

//app.UseHttpsRedirection();


app.UseAuthentication();

app.UseAuthorization();

app.UseDefaultFiles();//will take a look at wwwroot folder for index.html
app.UseStaticFiles();

app.MapControllers();

app.MapFallbackToController("Index", "Fallback");
//app.MapFallbackToFile("index.html"); // Fallback for Angular routing

//Seeding Data

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    var context = services.GetRequiredService<AppDbContext>();

    var databaseCreator = context.Database.GetService<IRelationalDatabaseCreator>();
    var databaseExists = await databaseCreator.ExistsAsync();

    if (!databaseExists)
    {
        logger.LogInformation("Database does not exist. Applying all migrations.");
        await context.Database.MigrateAsync();
    }
    else
    {
        var pendingMigrations = (await context.Database.GetPendingMigrationsAsync()).ToList();

        if (pendingMigrations.Count != 0)
        {
            logger.LogInformation("Applying {MigrationCount} pending migrations.", pendingMigrations.Count);
            await context.Database.MigrateAsync();
        }
    }

    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "An error occurred during migration");
}

//-----------

app.Run();
