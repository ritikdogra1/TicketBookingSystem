using Backend.Models;
using Backend.Models.DTO;

namespace Backend.Repository.IRepository
{
    public interface ITicketRepository
    {

        IEnumerable<Ticket> GetAllTickets();
        Ticket GetTicketById(int id);
        void AddTicket(TicketDTO ticketDTO);
        void UpdateTicket(TicketDTO ticketDTO);
        void DeleteTicket(int id);

    }
}
