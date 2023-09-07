using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/Booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll")]
        public IActionResult Index()
        {
            var allBooking = _context.Bookings.Include
                (t => t.User)
                .Include(t => t.Ticket)
               .Select(b => new Booking
               {
                   Id = b.Id,
                   User = b.User,
                   UserId=b.UserId,
                   TicketId=b.TicketId,
                   Ticket = b.Ticket,
                  
               }).ToList();
            return Ok(allBooking);
        }
        [HttpPut("BookingEditPost")]
        public IActionResult BookingEditPost([FromBody] Booking booking)
        {
            if (booking == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();
            _context.Bookings.Update(booking);
            _context.SaveChanges();
            return Ok();
        }

        //[HttpPost("BookingPost1")]
        //public IActionResult BookingPost1([FromBody] BookingVm request)

        //{

        //    try
        //    {
        //        var booking = new Booking
        //        {
        //            TicketId = request.TicketId,
        //            UserId = request.UserId,
        //            Count = request.Count


        //        };
        //        _context.Bookings.Add(booking);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the error
        //        return StatusCode(500, "An error occurred.");
        //    }
        //}



        [HttpPost("BookingPost1")]
        public IActionResult BookingPost1([FromBody] BookingVm request)
        {
            try
            {
                var booking = new Booking
                {
                    TicketId = request.TicketId,
                    UserId = request.UserId,
                    Count = request.Count
                };
                _context.Bookings.Add(booking);
                _context.SaveChanges();

                // Update the ticket count after booking
                //var ticket = _context.Tickets.FirstOrDefault(t => t.Id == request.TicketId);
                //if (ticket != null)
                //{
                //    ticket.Count -= request.Count;
                //    if (ticket.Count < 0)
                //    {
                //        ticket.Count = 0;
                //    }
                //    _context.SaveChanges();
                    
                //}

                return Ok();
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, "An error occurred.");
            }
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteBooking(int id)
        {
            if (id == 0) return NotFound();
            var booking = _context.Bookings.Find(id);
            if (booking == null) return NotFound();
            _context.Bookings.Remove(booking);
            _context.SaveChanges();
            return Ok();
        }

    }
}
