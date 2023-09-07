namespace Backend.Repository.IRepository
{
    public interface IEncryptionRepository
    {
        string EncryptPassword(string password);
    }
}
