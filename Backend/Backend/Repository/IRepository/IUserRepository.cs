using Backend.Models;

namespace Backend.Repository.IRepository
{
    public interface IUserRepository
    {
        bool IsUniqueUser(string Name);
        User Authenticate(string Name, string Password);
        User Register(string Name, string Password,string Address,string Email);
        User UpdateRegister(UserUpdate user);
    }
}
