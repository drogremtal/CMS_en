namespace EnterpriseCMS.Core.Entities;

public class RolePermission : BaseEntity
{
    public int RoleId { get; set; }
    public string Permission { get; set; } = string.Empty;
    
    // Navigation properties
    public Role Role { get; set; } = null!;
}
