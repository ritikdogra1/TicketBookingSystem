using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper;
        public BookingRepository(ApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public BookingDTO BookTicket(BookingDTO bookingDTO)
        {
            var existingBooking = _context.Bookings
                .FirstOrDefault(b => b.UserId == bookingDTO.UserId && b.TicketId == bookingDTO.TicketId);
            if (existingBooking != null)
            {
                existingBooking.Ticket.Count += bookingDTO.Count;

                _context.SaveChanges();
                var updatedBookingDTO = _mapper.Map<BookingDTO>(existingBooking);
                return updatedBookingDTO;
            }
            else
            {
                var booking = _mapper.Map<BookingDTO, Booking>(bookingDTO);
                _context.Bookings.Add(booking);
                _context.SaveChanges();
                var newBookingDTO = _mapper.Map<BookingDTO>(booking);
                return newBookingDTO;
            }

        }

        public IEnumerable<BookingDTO> GetAllBookings()
        {
            return _context.Bookings
              .Include(b => b.User)
              .Include(b => b.Ticket)
              .Select(b => new BookingDTO
              {
                  Id = b.Id,
                  UserId = b.UserId,
                  User = b.User,
                  TicketId = b.TicketId,
                  Ticket = b.Ticket,
                  Count = b.Ticket.Count
              }).ToList();

        }

        public IEnumerable<BookingDTO> GetBookingByUserID(int userId)
        {
            return _context.Bookings
       .Include(b => b.User)
       .Include(b => b.Ticket)
       .Where(b => b.UserId == userId)
       .Select(b => new BookingDTO
       {
           Id = b.Id,
           UserId = b.UserId,
           User = b.User,
           TicketId = b.TicketId,
           Ticket = b.Ticket,
           Count = b.Ticket.Count
       })
       .ToList();
        }

    }
    
}
