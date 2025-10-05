using System;
using DatingAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatingAPI.Data;

public class AppDbContext(DbContextOptions options):DbContext(options)
{
   public DbSet<AppUser> Users { get; set; }

    public DbSet<Member> Members { get; set; }

    public DbSet<Photo> Photos { get; set; }
}
