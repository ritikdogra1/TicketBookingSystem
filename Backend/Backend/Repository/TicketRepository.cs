using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Repository.IRepository;

namespace Backend.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper;
        public TicketRepository(ApplicationDbContext context,IMapper mapper)
        {
            _context= context;
            _mapper= mapper;
        }
        public void AddTicket(TicketDTO ticketDTO)
        {
            var Ticket = _mapper.Map<TicketDTO, Ticket>(ticketDTO);
            _context.Add(Ticket);
            _context.SaveChanges();
        }

        public void DeleteTicket(int id)
        {

            var Ticketindb = _context.Tickets.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (Ticketindb != null)
                _context.Remove(Ticketindb);
            _context.SaveChanges();
        }

        public IEnumerable<Ticket> GetAllTickets()
        {
            var tickets = _context.Tickets.Where(s => !s.IsDeleted);
            foreach (var ticketDTO in tickets)
            {
                var bookedTickets = _context.Bookings.Where(b => b.TicketId == ticketDTO.Id).Sum(b => b.TicketId);
                if (bookedTickets != 0)
                {
                    ticketDTO.Count = ticketDTO.Count - bookedTickets;
                    if (ticketDTO.Count <= 0)
                    {
                        var count = bookedTickets + ticketDTO.Count;
                        ticketDTO.Count = count;
                    }
                }
            }
            return tickets;
        }

        public Ticket GetTicketById(int id)
        {
            return _context.Tickets.FirstOrDefault(e => e.Id == id);

        }

        public void UpdateTicket(TicketDTO ticketDTO)
        {
            var ExistingTicket = _context.Tickets.FirstOrDefault(e => e.Id == ticketDTO.Id);

            if (ExistingTicket != null)
            {
                ExistingTicket.Name = ticketDTO.Name;
                ExistingTicket.Count = ticketDTO.Count;
                ExistingTicket.Image = ticketDTO.Image;
            }
            _context.SaveChanges();
            var tickets = GetAllTickets();
        }
    }
    
}
