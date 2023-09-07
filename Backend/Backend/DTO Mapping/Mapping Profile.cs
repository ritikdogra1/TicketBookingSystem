using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;

namespace Backend.DTO_Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TicketDTO,Ticket>().ReverseMap();
            CreateMap<BookingDTO,Booking>().ReverseMap();

        }
    }
}
