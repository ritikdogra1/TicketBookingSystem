using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }
        public int Count { get; set; }

    }
}
