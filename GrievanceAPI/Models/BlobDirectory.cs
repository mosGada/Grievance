namespace GrievanceAPI.Models
{
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    #endregion

    /// <summary>
    /// BlobDirectory model: Used as directory info return type
    /// </summary>
    public class BlobDirectory
    {
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public long size { get; set; }
    }
}