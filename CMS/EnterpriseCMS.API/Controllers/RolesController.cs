using Microsoft.AspNetCore.Mvc;
using EnterpriseCMS.Core.Entities;
using EnterpriseCMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace EnterpriseCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RolesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RolesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Role>>> GetRoles(bool? active = null)
    {
        var query = _context.Roles.Include(r => r.UserRoles).Include(r => r.RolePermissions).AsQueryable();
        
        if (active.HasValue)
        {
            query = query.Where(r => r.IsActive == active.Value);
        }

        return await query.OrderBy(r => r.Name).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Role>> GetRole(int id)
    {
        var role = await _context.Roles
            .Include(r => r.UserRoles)
            .Include(r => r.RolePermissions)
            .Include(r => r.PageRoles)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (role == null)
        {
            return NotFound();
        }

        return role;
    }

    [HttpPost]
    public async Task<ActionResult<Role>> CreateRole(RoleCreateDto dto)
    {
        var role = new Role
        {
            Name = dto.Name,
            Description = dto.Description,
            IsActive = dto.IsActive,
            CreatedBy = User.Identity?.Name
        };

        _context.Roles.Add(role);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRole), new { id = role.Id }, role);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRole(int id, RoleUpdateDto dto)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
            return NotFound();
        }

        role.Name = dto.Name;
        role.Description = dto.Description;
        role.IsActive = dto.IsActive;
        role.UpdatedAt = DateTime.UtcNow;
        role.UpdatedBy = User.Identity?.Name;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
            return NotFound();
        }

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{roleId}/permissions")]
    public async Task<IActionResult> AddPermission(int roleId, [FromBody] string permission)
    {
        var role = await _context.Roles.FindAsync(roleId);
        if (role == null)
        {
            return NotFound();
        }

        var rolePermission = new RolePermission
        {
            RoleId = roleId,
            Permission = permission,
            CreatedBy = User.Identity?.Name
        };

        _context.RolePermissions.Add(rolePermission);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{roleId}/permissions/{permissionId}")]
    public async Task<IActionResult> RemovePermission(int roleId, int permissionId)
    {
        var rolePermission = await _context.RolePermissions
            .FirstOrDefaultAsync(rp => rp.Id == permissionId && rp.RoleId == roleId);
        
        if (rolePermission == null)
        {
            return NotFound();
        }

        _context.RolePermissions.Remove(rolePermission);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{pageId}/roles")]
    public async Task<IActionResult> AssignRoleToPage(int pageId, [FromBody] int roleId)
    {
        var page = await _context.Pages.FindAsync(pageId);
        var role = await _context.Roles.FindAsync(roleId);
        
        if (page == null || role == null)
        {
            return NotFound();
        }

        var existing = await _context.PageRoles
            .AnyAsync(pr => pr.PageId == pageId && pr.RoleId == roleId);
        
        if (existing)
        {
            return BadRequest("Role already assigned to page");
        }

        var pageRole = new PageRole
        {
            PageId = pageId,
            RoleId = roleId,
            CreatedBy = User.Identity?.Name
        };

        _context.PageRoles.Add(pageRole);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{pageId}/roles/{roleId}")]
    public async Task<IActionResult> RemoveRoleFromPage(int pageId, int roleId)
    {
        var pageRole = await _context.PageRoles
            .FirstOrDefaultAsync(pr => pr.PageId == pageId && pr.RoleId == roleId);
        
        if (pageRole == null)
        {
            return NotFound();
        }

        _context.PageRoles.Remove(pageRole);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class RoleCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}

public class RoleUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
