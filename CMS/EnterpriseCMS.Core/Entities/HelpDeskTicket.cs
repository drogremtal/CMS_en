namespace EnterpriseCMS.Core.Entities;

public class HelpDeskTicket : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TicketStatus Status { get; set; } = TicketStatus.Open;
    public TicketPriority Priority { get; set; } = TicketPriority.Medium;
    public int? RequesterId { get; set; }
    public int? AssigneeId { get; set; }
    public string? Category { get; set; }
    
    // Navigation properties
    public User? Requester { get; set; }
    public User? Assignee { get; set; }
    public ICollection<HelpDeskComment> Comments { get; set; } = new List<HelpDeskComment>();
}

public enum TicketStatus
{
    Open,
    InProgress,
    WaitingForCustomer,
    Resolved,
    Closed
}

public enum TicketPriority
{
    Low,
    Medium,
    High,
    Critical
}
