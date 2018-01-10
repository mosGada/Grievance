namespace GrievanceAPI.Providers
{
    using Models;
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    #endregion

    public interface IBlobService
    {
        Task<List<BlobDirectory>> GetRoot();
        Task<BlobDownloadModel> GetFile(string filename);
    }
}
