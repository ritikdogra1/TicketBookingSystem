using Backend.Data;
using Backend.Models;
using Backend.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text;

namespace Backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly AppSettings _appSettings;
        public UserRepository(ApplicationDbContext context, IOptions<AppSettings> appSetings)
        {
            _context = context;
            _appSettings = appSetings.Value;
        }
        [HttpPost]
        public User Authenticate(string Email, string Password)
        {
            var a = _context.Users.ToList();
            var userInDb = _context.Users.FirstOrDefault(u => u.Email == Email && u.Password == Password);
            if (userInDb == null) return null;
            //JWT  CODE//
            var tokenHandler = new JwtSecurityTokenHandler();
            var Key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescritor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email,userInDb.Id.ToString()),
                    new Claim(ClaimTypes.Role,userInDb.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescritor);
            userInDb.Token = tokenHandler.WriteToken(token);
            userInDb.Password = "";
            return userInDb;

        }

        public bool IsUniqueUser(string Name)
        {
            var userInDb = _context.Users.FirstOrDefault(u => u.Name == Name);
            if (userInDb == null) return true;
            return false;

        }
        public User UpdateRegister(UserUpdate userTable)
        {

            var find = _context.Users.FirstOrDefault(s => s.Id == userTable.Id);
            if (find != null)
                find.Password = userTable.Password;


            _context.Users.Update(find);
            _context.SaveChanges();
            return find;

        }

        public User Register(string Name, string Password, string Address ,string Email)
        {
            User user = new User()
            {
                Name = Name,
                Password =Password,
                Address=Address,
                Email=Email,
                Role = "User"
                
            };
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

    }
}
