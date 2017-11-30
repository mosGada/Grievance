namespace GrievanceAPI.Models
{
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;
    #endregion
    /// <summary>
    /// BlobDownloadModel: Used as 'GetFile' return type
    /// </summary>
    public class BlobDownloadModel
    {
        public MemoryStream BlobStream { get; set; }
        public string BlobFileName { get; set; }
        public long BlobLength { get; set; }
        public string BlobContentType { get; set; }
    }
}