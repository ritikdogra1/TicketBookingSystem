using Backend.Models.DTO;

namespace Backend.Repository.IRepository
{
    public interface IBookingRepository
    {
        IEnumerable<BookingDTO> GetAllBookings();
        IEnumerable<BookingDTO> GetBookingByUserID(int userId);
        BookingDTO BookTicket(BookingDTO bookingDTO);

    }
}
