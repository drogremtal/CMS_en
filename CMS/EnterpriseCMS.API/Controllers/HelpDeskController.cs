using Microsoft.AspNetCore.Mvc;
using EnterpriseCMS.Core.Entities;
using EnterpriseCMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace EnterpriseCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class HelpDeskController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HelpDeskController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("settings")]
    public async Task<ActionResult<HelpDeskSettings>> GetSettings()
    {
        var settings = await _context.HelpDeskSettings.FirstOrDefaultAsync();
        if (settings == null)
        {
            settings = new HelpDeskSettings();
            _context.HelpDeskSettings.Add(settings);
            await _context.SaveChangesAsync();
        }
        
        if (!settings.IsEnabled)
        {
            return BadRequest("HelpDesk module is disabled");
        }

        return settings;
    }

    [HttpPut("settings")]
    public async Task<IActionResult> UpdateSettings(HelpDeskSettings settings)
    {
        var existing = await _context.HelpDeskSettings.FirstOrDefaultAsync();
        if (existing == null)
        {
            _context.HelpDeskSettings.Add(settings);
        }
        else
        {
            existing.IsEnabled = settings.IsEnabled;
            existing.DefaultCategory = settings.DefaultCategory;
            existing.DefaultPriority = settings.DefaultPriority;
            existing.AllowAnonymousTickets = settings.AllowAnonymousTickets;
            existing.AutoResponseMessage = settings.AutoResponseMessage;
            existing.UpdatedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("tickets")]
    public async Task<ActionResult<IEnumerable<HelpDeskTicket>>> GetTickets(
        TicketStatus? status = null, 
        TicketPriority? priority = null)
    {
        var settings = await _context.HelpDeskSettings.FirstOrDefaultAsync();
        if (settings == null || !settings.IsEnabled)
        {
            return BadRequest("HelpDesk module is disabled");
        }

        var query = _context.HelpDeskTickets
            .Include(t => t.Requester)
            .Include(t => t.Assignee)
            .Include(t => t.Comments)
            .AsQueryable();

        if (status.HasValue)
        {
            query = query.Where(t => t.Status == status.Value);
        }

        if (priority.HasValue)
        {
            query = query.Where(t => t.Priority == priority.Value);
        }

        return await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }

    [HttpGet("tickets/{id}")]
    public async Task<ActionResult<HelpDeskTicket>> GetTicket(int id)
    {
        var settings = await _context.HelpDeskSettings.FirstOrDefaultAsync();
        if (settings == null || !settings.IsEnabled)
        {
            return BadRequest("HelpDesk module is disabled");
        }

        var ticket = await _context.HelpDeskTickets
            .Include(t => t.Requester)
            .Include(t => t.Assignee)
            .Include(t => t.Comments)
                .ThenInclude(c => c.Author)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (ticket == null)
        {
            return NotFound();
        }

        return ticket;
    }

    [HttpPost("tickets")]
    public async Task<ActionResult<HelpDeskTicket>> CreateTicket(HelpDeskTicketCreateDto dto)
    {
        var settings = await _context.HelpDeskSettings.FirstOrDefaultAsync();
        if (settings == null || !settings.IsEnabled)
        {
            return BadRequest("HelpDesk module is disabled");
        }

        var ticket = new HelpDeskTicket
        {
            Title = dto.Title,
            Description = dto.Description,
            Category = dto.Category ?? settings.DefaultCategory,
            Priority = dto.Priority.HasValue ? dto.Priority.Value : (TicketPriority)settings.DefaultPriority,
            Status = TicketStatus.Open,
            RequesterId = dto.RequesterId,
            CreatedBy = User.Identity?.Name
        };

        _context.HelpDeskTickets.Add(ticket);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
    }

    [HttpPut("tickets/{id}")]
    public async Task<IActionResult> UpdateTicket(int id, HelpDeskTicketUpdateDto dto)
    {
        var settings = await _context.HelpDeskSettings.FirstOrDefaultAsync();
        if (settings == null || !settings.IsEnabled)
        {
            return BadRequest("HelpDesk module is disabled");
        }

        var ticket = await _context.HelpDeskTickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        ticket.Title = dto.Title;
        ticket.Description = dto.Description;
        ticket.Status = dto.Status;
        ticket.Priority = dto.Priority;
        ticket.AssigneeId = dto.AssigneeId;
        ticket.UpdatedAt = DateTime.UtcNow;
        ticket.UpdatedBy = User.Identity?.Name;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("tickets/{id}/comments")]
    public async Task<ActionResult<HelpDeskComment>> AddComment(int id, HelpDeskCommentCreateDto dto)
    {
        var settings = await _context.HelpDeskSettings.FirstOrDefaultAsync();
        if (settings == null || !settings.IsEnabled)
        {
            return BadRequest("HelpDesk module is disabled");
        }

        var ticket = await _context.HelpDeskTickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        var comment = new HelpDeskComment
        {
            TicketId = id,
            Content = dto.Content,
            AuthorId = dto.AuthorId,
            IsInternal = dto.IsInternal,
            CreatedBy = User.Identity?.Name
        };

        _context.HelpDeskComments.Add(comment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTicket), new { id }, comment);
    }
}

public class HelpDeskTicketCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Category { get; set; }
    public TicketPriority? Priority { get; set; }
    public int? RequesterId { get; set; }
}

public class HelpDeskTicketUpdateDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public TicketStatus Status { get; set; }
    public TicketPriority Priority { get; set; }
    public int? AssigneeId { get; set; }
}

public class HelpDeskCommentCreateDto
{
    public string Content { get; set; } = string.Empty;
    public int AuthorId { get; set; }
    public bool IsInternal { get; set; } = false;
}
