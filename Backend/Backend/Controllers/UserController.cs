using Backend.Data;
using Backend.Models;
using Backend.Repository;
using Backend.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/User")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationDbContext _context;

        public UserController(IUserRepository userRepository, IEmailSender emailSender,ApplicationDbContext context)
        {
            _userRepository = userRepository;
            _emailSender = emailSender;
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var AllUser = _context.Users.ToList();
            return Ok(AllUser);
        }
        //[HttpPost("register")]
        //public async Task <IActionResult> Register([FromBody] User user)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (user.Email != null)
        //        {
        //            string emailBody = "<html><body style=\"font-family: Arial, sans-serif; background-image: background-repeat: no-repeat; background-size: cover; padding: 20px;\">"
        //                + "<div style=\"background-color: #ffffff; border-radius: 10px; padding: 20px; border: 2px solid #336699;\">"
        //                + $"<h2 style=\"color: #336699; margin-bottom: 20px;\">Dear {user.Name},</h2>"
        //                + "<p style=\"color: #444; font-size: 16px;\">Welcome to our Website.</p>"

        //                + "<p style=\"color: #444; font-size: 16px;\">Thank you and enjoy your experience with us!</p>"
        //                + "<p style=\"color: #777; font-size: 14px;\">Best regards,</p>"

        //                + "<p style=\"color: #444; font-size: 14px;\">You've successfully register to us</p>"
        //                + "</div>"
        //                + "</body></html>";

        //            await _emailSender.SendEmailAsync(user.Email, " Welcome to our website", emailBody);
        //        }

        //        //var user = _mapper.Map<UserDTO, User>(userDTO);

        //        var isUniqueUser = _userRepository.IsUniqueUser(user.Name);
        //        if (!isUniqueUser) return BadRequest("User In Use");

        //        // user.Password = _encryptionRepository.EncryptPassword(user.Password);

        //        var UserInfo = _userRepository.Register(user.Name, user.Address, user.Email, user.Password);
        //        if (UserInfo.Email != null && UserInfo.Id != 0)/**/
        //                    {
        //                       var setPasswordLink = $"http://localhost:3000/PasswordSetting?id={UserInfo.Id}";
        //                       await _emailSender.SendEmailAsync(UserInfo.Email, "Set Your Password",
        //                           $"Please click on this link to set your password: {setPasswordLink}");
        //        }
        //         if (UserInfo == null) return BadRequest();
        //    }
        //    return Ok();
        //}

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var isUniqueUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
                if (isUniqueUser != null)
                { return BadRequest("Email already in use!!!"); }
                else
                {
                    _context.Users.Add(user);
                    _context.SaveChanges();
                }
            }
            if (user.Email != null && user.Id != 0)
            {
                var setpassword = $"http://localhost:3001/PasswordSetting?id={user.Id}";
                await _emailSender.SendEmailAsync(user.Email, "Set Your Password", $"Please click on this link set password:{setpassword}");
            }
            return Ok();
        }
        [HttpPut("UpdateUser")]
        public IActionResult UpdateUser(UserUpdate user)
        {
            if (user == null || user.Id == 0)
            {
                return BadRequest();
            }

            var updatedUser = _userRepository.UpdateRegister(user);

            if (updatedUser == null)
            {
                return NotFound();
            }

            return Ok(updatedUser);
        }
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserVm userVM)
        {
            var user = _userRepository.Authenticate(userVM.Email, userVM.Password);
            if (user == null) return BadRequest("Wrong User/Pwd");
            return Ok(user);
        }
    }
}
