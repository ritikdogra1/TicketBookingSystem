using Backend.Data;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;
using Backend.Repository.IRepository;

namespace Backend.Repository
{
    public class EmailSender : IEmailSender
    {
        private EmailSettings _emailSetting { get; }
        public EmailSender(IOptions<EmailSettings> emailSettings, ApplicationDbContext context)
        {
            _emailSetting = emailSettings.Value;
        }

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            Execute(email, subject, htmlMessage).Wait();
            return Task.FromResult(0);

        }
        public async Task Execute(string email, string subject, string Message)
        {
            try
            {
                string toEmail = string.IsNullOrEmpty(email) ? _emailSetting.ToEmail : email;
                MailMessage mailMessage = new MailMessage()
                {
                    From = new MailAddress(_emailSetting.UsernameEmail, "My Email Name")
                };
                mailMessage.To.Add(toEmail);
                mailMessage.CC.Add(_emailSetting.CcEmail);
                mailMessage.Subject = "Shopping App:" + subject;
                mailMessage.Body = Message;
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = MailPriority.High;
                using (SmtpClient smtpClient = new SmtpClient(_emailSetting.PrimaryDomain, _emailSetting.PrimaryPort))
                {
                    smtpClient.Credentials = new NetworkCredential(_emailSetting.UsernameEmail, _emailSetting.UsernamePassword);
                    smtpClient.EnableSsl = true;
                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
            catch (Exception ex)
            {
                string Str = ex.Message;

            }
        }
    }
}
