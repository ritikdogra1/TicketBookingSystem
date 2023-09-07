using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class BookingVm
    {
        public int UserId { get; set; }
        public int TicketId { get; set; }
        public int Count { get; set; }

    }
}
