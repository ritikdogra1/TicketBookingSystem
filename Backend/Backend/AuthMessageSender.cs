using Backend.Repository.IRepository;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace Backend
{
    public class AuthMessageSender:IEmailSender
    {
        private readonly EmailSettings _settings;
        public EmailSettings EmailSettings { get; }
        public AuthMessageSender(IOptions<EmailSettings> emailSettings)
        {
            _settings = emailSettings.Value;

        }
        public Task SendEmailAsync(string email, string subject, string message)
        {
            Execute(email, subject, message).Wait();
            return Task.FromResult(0);
        }
        public async Task Execute(string email, string subject, string message)
        {
            try
            {
                var SetPassword = " Click on this link to set your password: <a href='http://localhost:3001/PasswordSetting?token=" + GenerateToken(email) + "'>Set Password</a>";
                string toEmail = string.IsNullOrEmpty(email)
                                 ? _settings.ToEmail
                                 : email;
                MailMessage mail = new MailMessage()
                {
                    From = new MailAddress(_settings.UsernameEmail, "Cinema")
                };
                mail.To.Add(new MailAddress(toEmail));
                mail.CC.Add(new MailAddress(_settings.CcEmail));

                mail.Subject = "Personal Management System - " + subject;
                mail.Body = message;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                using (SmtpClient smtp = new SmtpClient(_settings.PrimaryDomain, _settings.PrimaryPort))
                {
                    smtp.Credentials = new NetworkCredential(_settings.UsernameEmail, _settings.UsernamePassword);
                    smtp.EnableSsl = true;
                    await smtp.SendMailAsync(mail);
                }
            }
            catch (Exception)
            {
                //do something here
            }
        }

        private string GenerateToken(string email)
        {
            throw new NotImplementedException();
        }
    }
}

