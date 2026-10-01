namespace EnterpriseCMS.Core.Entities;

public class HelpDeskSettings : BaseEntity
{
    public bool IsEnabled { get; set; } = true;
    public string? DefaultCategory { get; set; }
    public int DefaultPriority { get; set; } = 1; // Medium
    public bool AllowAnonymousTickets { get; set; } = false;
    public string? AutoResponseMessage { get; set; }
}
