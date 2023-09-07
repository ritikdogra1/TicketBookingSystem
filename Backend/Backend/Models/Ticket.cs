using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Name  { get; set; }
        public int Count { get; set; }
        public string Image { get; set; }
        public bool IsDeleted { get; set; }

    }
}
