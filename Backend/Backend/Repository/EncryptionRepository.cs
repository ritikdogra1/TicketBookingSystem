using Backend.Repository.IRepository;
using System.Text;

namespace Backend.Repository
{
    public class EncryptionRepository : IEncryptionRepository
    {
        public string EncryptPassword(string password)
        {
            byte[] pwd = Encoding.ASCII.GetBytes(password);
            string encodedData = Convert.ToBase64String(pwd);
            return encodedData;
        }
    }
}
