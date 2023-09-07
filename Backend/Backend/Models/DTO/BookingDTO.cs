namespace Backend.Models.DTO
{
    public class BookingDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }
        public int Count { get; set; }

    }
}
