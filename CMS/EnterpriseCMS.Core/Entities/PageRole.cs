namespace EnterpriseCMS.Core.Entities;

public class PageRole : BaseEntity
{
    public int PageId { get; set; }
    public int RoleId { get; set; }
    
    // Navigation properties
    public Page Page { get; set; } = null!;
    public Role Role { get; set; } = null!;
}
