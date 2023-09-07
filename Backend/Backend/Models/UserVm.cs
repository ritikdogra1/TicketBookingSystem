namespace Backend.Models
{
    public class UserVm
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }

    public class UserUpdate
    {
        public int Id { get; set; }
        public string Password { get; set; }

    }
}
