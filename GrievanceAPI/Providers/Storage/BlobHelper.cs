namespace GrievanceAPI.Providers.Storage
{
    using Microsoft.Azure;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Blob;
    using Models;
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    #endregion

    /// <summary>
    /// Blob Storage: Helper class
    /// </summary>
    public class BlobHelper
    {
        /// <summary>
        /// Returns the root cloud storage directory
        /// </summary>
        /// <returns></returns>
        public static CloudBlobContainer GetRootContainer()
        {
            // Get Azure Connection string from Web Config
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            // Get Root folder from configuration
            var containername = CloudConfigurationManager.GetSetting("rootContainer");
            // Create blob client and return reference to the container
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            return blobClient.GetContainerReference(containername);
        }

        /// <summary>
        /// Helper method to build a Blob Directory object
        /// </summary>
        /// <param name="type"></param>
        /// <param name="name"></param>
        /// <param name="url"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public static BlobDirectory AddBlob(string type, string name, string url, long size)
        {
            return new BlobDirectory
            {
                type = type,
                name = name,
                url = url,
                size = size
            };
        }
    }
}