namespace GrievanceAPI.Controllers
{
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Auth;
    using Microsoft.WindowsAzure.Storage.Blob;
    #region Usings
    using Providers;
    using Providers.Storage;
    using System;
    using System.Configuration;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    #endregion

    /// <summary>
    /// Core api Controller with two endpoints
    /// </summary>
    [RoutePrefix("api/blob")]
    public class BlobController : ApiController
    {
        #region Private Member variable(s)
        private readonly IBlobService _service = new BlobService();
        #endregion

        [Route("directoryinfo")]
        public async Task<HttpResponseMessage> GetDirectoryInfo()
        {
            try
            {
                var results = await _service.GetRoot();
                if (results != null && results.Count > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, results);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Root directory not found");

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        [Route("upload")]
        public async Task<IHttpActionResult> UploadFile()
        {
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var accountName = ConfigurationManager.AppSettings["storage:account:name"];
            var accountKey = ConfigurationManager.AppSettings["storage:account:key"];
            var storageAccount = new CloudStorageAccount(new StorageCredentials(accountName, accountKey), true);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            CloudBlobContainer uploadContainer = blobClient.GetContainerReference(ConfigurationManager.AppSettings["rootContainer"]);
            var provider = new AzureStorageMultipartFormDataStreamProvider(uploadContainer);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error has occured. Details: {ex.Message}");
            }

            // Retrieve the filename of the file you have uploaded
            var filename = provider.FileData.FirstOrDefault()?.LocalFileName;
            if (string.IsNullOrEmpty(filename))
            {
                return BadRequest("An error has occured while uploading your file. Please try again.");
            }

            //return Ok($"File: {filename} has successfully uploaded");
            return Ok(filename);
        }

    }
}
