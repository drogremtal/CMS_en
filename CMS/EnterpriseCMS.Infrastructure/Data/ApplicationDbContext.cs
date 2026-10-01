using Microsoft.EntityFrameworkCore;
using EnterpriseCMS.Core.Entities;

namespace EnterpriseCMS.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Page> Pages { get; set; }
    public DbSet<PageRole> PageRoles { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }
    public DbSet<HelpDeskTicket> HelpDeskTickets { get; set; }
    public DbSet<HelpDeskComment> HelpDeskComments { get; set; }
    public DbSet<HelpDeskSettings> HelpDeskSettings { get; set; }
    public DbSet<ApiKey> ApiKeys { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.ExternalId);
        });

        // Role configuration
        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasIndex(e => e.Name).IsUnique();
        });

        // UserRole configuration
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasIndex(e => new { e.UserId, e.RoleId }).IsUnique();
            entity.HasOne(e => e.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Page configuration
        modelBuilder.Entity<Page>(entity =>
        {
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasOne(e => e.ParentPage)
                .WithMany(p => p.ChildPages)
                .HasForeignKey(e => e.ParentPageId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // PageRole configuration
        modelBuilder.Entity<PageRole>(entity =>
        {
            entity.HasIndex(e => new { e.PageId, e.RoleId }).IsUnique();
            entity.HasOne(e => e.Page)
                .WithMany(p => p.PageRoles)
                .HasForeignKey(e => e.PageId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Role)
                .WithMany(r => r.PageRoles)
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // RolePermission configuration
        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasOne(e => e.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // HelpDeskTicket configuration
        modelBuilder.Entity<HelpDeskTicket>(entity =>
        {
            entity.HasOne(e => e.Requester)
                .WithMany()
                .HasForeignKey(e => e.RequesterId)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(e => e.Assignee)
                .WithMany()
                .HasForeignKey(e => e.AssigneeId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // HelpDeskComment configuration
        modelBuilder.Entity<HelpDeskComment>(entity =>
        {
            entity.HasOne(e => e.Ticket)
                .WithMany(t => t.Comments)
                .HasForeignKey(e => e.TicketId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Author)
                .WithMany()
                .HasForeignKey(e => e.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
