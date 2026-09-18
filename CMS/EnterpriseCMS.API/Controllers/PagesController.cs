using Microsoft.AspNetCore.Mvc;
using EnterpriseCMS.Core.Entities;
using EnterpriseCMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PagesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Page>>> GetPages(bool? published = null)
    {
        var query = _context.Pages.Include(p => p.ParentPage).AsQueryable();
        
        if (published.HasValue)
        {
            query = query.Where(p => p.IsPublished == published.Value);
        }

        return await query.OrderBy(p => p.SortOrder).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Page>> GetPage(int id)
    {
        var page = await _context.Pages
            .Include(p => p.ParentPage)
            .Include(p => p.PageRoles)
                .ThenInclude(pr => pr.Role)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (page == null)
        {
            return NotFound();
        }

        return page;
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<Page>> GetPageBySlug(string slug)
    {
        var page = await _context.Pages
            .Include(p => p.ParentPage)
            .Include(p => p.PageRoles)
                .ThenInclude(pr => pr.Role)
            .FirstOrDefaultAsync(p => p.Slug == slug);

        if (page == null)
        {
            return NotFound();
        }

        return page;
    }

    [HttpPost]
    public async Task<ActionResult<Page>> CreatePage(PageCreateDto dto)
    {
        var page = new Page
        {
            Title = dto.Title,
            Slug = dto.Slug,
            Content = dto.Content,
            MetaDescription = dto.MetaDescription,
            MetaKeywords = dto.MetaKeywords,
            IsPublished = dto.IsPublished,
            PublishedAt = dto.IsPublished ? DateTime.UtcNow : null,
            ParentPageId = dto.ParentPageId,
            SortOrder = dto.SortOrder,
            Template = dto.Template,
            CreatedBy = User.Identity?.Name
        };

        _context.Pages.Add(page);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPage), new { id = page.Id }, page);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePage(int id, PageUpdateDto dto)
    {
        var page = await _context.Pages.FindAsync(id);
        if (page == null)
        {
            return NotFound();
        }

        page.Title = dto.Title;
        page.Slug = dto.Slug;
        page.Content = dto.Content;
        page.MetaDescription = dto.MetaDescription;
        page.MetaKeywords = dto.MetaKeywords;
        page.IsPublished = dto.IsPublished;
        page.PublishedAt = dto.IsPublished ? DateTime.UtcNow : page.PublishedAt;
        page.ParentPageId = dto.ParentPageId;
        page.SortOrder = dto.SortOrder;
        page.Template = dto.Template;
        page.UpdatedAt = DateTime.UtcNow;
        page.UpdatedBy = User.Identity?.Name;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePage(int id)
    {
        var page = await _context.Pages.FindAsync(id);
        if (page == null)
        {
            return NotFound();
        }

        _context.Pages.Remove(page);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{id}/preview")]
    public async Task<ActionResult<PagePreviewDto>> PreviewPage(int id, PagePreviewDto dto)
    {
        var page = await _context.Pages.FindAsync(id);
        if (page == null)
        {
            return NotFound();
        }

        return new PagePreviewDto
        {
            Title = dto.Title ?? page.Title,
            Content = dto.Content ?? page.Content,
            Template = dto.Template ?? page.Template,
            Slug = page.Slug
        };
    }
}

public class PageCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public bool IsPublished { get; set; }
    public int? ParentPageId { get; set; }
    public int SortOrder { get; set; }
    public string? Template { get; set; }
}

public class PageUpdateDto
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public bool IsPublished { get; set; }
    public int? ParentPageId { get; set; }
    public int SortOrder { get; set; }
    public string? Template { get; set; }
}

public class PagePreviewDto
{
    public string? Title { get; set; }
    public string? Content { get; set; }
    public string? Template { get; set; }
    public string Slug { get; set; } = string.Empty;
}
