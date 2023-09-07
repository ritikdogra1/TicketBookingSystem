using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("Ticket")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TicketController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public IEnumerable<Ticket> GetAllTickets()
        {
            var tickets = _context.Tickets.Where(s => !s.IsDeleted);
            foreach (var ticketDTO in tickets)
            {
                var bookedTickets = _context.Bookings.Count(b => b.TicketId == ticketDTO.Id);
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
        [HttpPost("TicketPost")]
        public IActionResult TicketPost( Ticket ticket)
        {
            if (ticket == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();
            var isTicketExists = _context.Tickets.FirstOrDefault(x => x.Name == ticket.Name);
            if (isTicketExists != null) return BadRequest();
            _context.Tickets.Add(ticket);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPut("TicketEditPost")]
        public IActionResult TicketEditPost([FromBody] Ticket ticket)
        {
            if (ticket == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();
            _context.Tickets.Update(ticket);
            _context.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id:int}")]
        public void Delete(int id)
        {
            var ticketInDb = _context.Tickets.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (ticketInDb != null)
                _context.Remove(ticketInDb);
            _context.SaveChanges();

        }

    }
}
