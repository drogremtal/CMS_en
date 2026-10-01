namespace EnterpriseCMS.Core.Entities;

public class HelpDeskComment : BaseEntity
{
    public int TicketId { get; set; }
    public string Content { get; set; } = string.Empty;
    public int AuthorId { get; set; }
    public bool IsInternal { get; set; } = false;
    
    // Navigation properties
    public HelpDeskTicket Ticket { get; set; } = null!;
    public User Author { get; set; } = null!;
}
