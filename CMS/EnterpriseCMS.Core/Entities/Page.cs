namespace EnterpriseCMS.Core.Entities;

public class Page : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public bool IsPublished { get; set; } = false;
    public DateTime? PublishedAt { get; set; }
    public int? ParentPageId { get; set; }
    public int SortOrder { get; set; } = 0;
    public string? Template { get; set; }
    
    // Navigation properties
    public Page? ParentPage { get; set; }
    public ICollection<Page> ChildPages { get; set; } = new List<Page>();
    public ICollection<PageRole> PageRoles { get; set; } = new List<PageRole>();
}
