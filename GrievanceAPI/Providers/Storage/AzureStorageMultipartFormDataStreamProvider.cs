namespace GrievanceAPI.Providers.Storage
{
    using Microsoft.WindowsAzure.Storage.Blob;
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Web;
    using System.IO;
    using System.Net.Http.Headers;
    #endregion

    public class AzureStorageMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        #region Private member variable(s)
        private readonly CloudBlobContainer _blobContainer;
        private readonly string[] _supportedMimeTypes = { "image/png", "image/jpeg", "image/jpg" };
        #endregion

        public AzureStorageMultipartFormDataStreamProvider(CloudBlobContainer blobContainer) : base("azure")
        {
            _blobContainer = blobContainer;
        }

        public override Stream GetStream(HttpContent parent, HttpContentHeaders headers)
        {
            if (parent == null) throw new ArgumentNullException(nameof(parent));
            if (headers == null) throw new ArgumentNullException(nameof(headers));

            if (!_supportedMimeTypes.Contains(headers.ContentType.ToString().ToLower()))
            {
                throw new NotSupportedException("Only jpeg and png types are supported.");
            }

            // Generate a new filename for every new blob
            var fileName = Guid.NewGuid().ToString();

            CloudBlockBlob blob = _blobContainer.GetBlockBlobReference(fileName);

            if(headers.ContentType != null)
            {
                // Set appropriate content type for uploaded file
                blob.Properties.ContentType = headers.ContentType.MediaType;
            }

            this.FileData.Add(new MultipartFileData(headers, blob.Name));
            return blob.OpenWrite();
            //return base.GetStream(parent, headers);
        }
    }
}