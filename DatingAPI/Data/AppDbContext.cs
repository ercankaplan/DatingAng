using System;
using DatingAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatingAPI.Data;

public class AppDbContext(DbContextOptions options):DbContext(options)
{
   public DbSet<AppUser> Users { get; set; }

    public DbSet<Member> Members { get; set; }

    public DbSet<Photo> Photos { get; set; }

    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure one-to-one relationship between AppUser and Member
        modelBuilder.Entity<AppUser>()
            .HasOne(a => a.Member)
            .WithOne(m => m.AppUser)
            .HasForeignKey<Member>(m => m.Id);

        // Configure one-to-many relationship between Member and MessagesSent
        modelBuilder.Entity<Member>()
            .HasMany(m => m.MessagesSent)
            .WithOne(ms => ms.Sender)
            .HasForeignKey(ms => ms.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure one-to-many relationship between Member and MessagesReceived
        modelBuilder.Entity<Member>()
            .HasMany(m => m.MessagesReceived)
            .WithOne(mr => mr.Recipient)
            .HasForeignKey(mr => mr.RecipientId)
            .OnDelete(DeleteBehavior.Restrict);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
            v => v.HasValue ? v.Value.ToUniversalTime() : null,
            v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : null);

         
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
                else if (property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(nullableDateTimeConverter);
                }
            }
        }
    }
}
