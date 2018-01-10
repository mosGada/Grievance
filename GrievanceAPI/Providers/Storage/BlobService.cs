namespace GrievanceAPI.Providers.Storage
{
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;
    using Models;
    using Microsoft.WindowsAzure.Storage.Blob;
    using System.IO;
    #endregion

    public class BlobService : IBlobService
    {
        /// <summary>
        /// Returns a BlobDownloadModel object
        /// </summary>
        /// <param name="filename"></param>
        /// <returns></returns>
        public async Task<BlobDownloadModel> GetFile(string filename)
        {
            if (!string.IsNullOrEmpty(filename))
            {
                var container = BlobHelper.GetRootContainer();
                var blob = await container.GetBlobReferenceFromServerAsync(filename);

                if (blob != null)
                {
                    var ms = new MemoryStream();
                    await blob.DownloadToStreamAsync(ms);

                    // Strip off any folder structure to get the fil ename
                    var lastPost = blob.Name.LastIndexOf('/');
                    var fileName = blob.Name.Substring(lastPost + 1, blob.Name.Length - lastPost - 1);

                    // Build and return the download model with the blob stream and its relevant info
                    var download = new BlobDownloadModel
                    {
                        BlobStream = ms,
                        BlobFileName = fileName,
                        BlobLength = blob.Properties.Length,
                        BlobContentType = blob.Properties.ContentType
                    };
                    return download;
                }
            }

            return null;
        }

        /// <summary>
        /// Returns a list of file(s) and directories in cloud storage
        /// </summary>
        /// <returns></returns>
        public async Task<List<BlobDirectory>> GetRoot()
        {
            var container = BlobHelper.GetRootContainer();

            if (container != null)
            {
                BlobContinuationToken continuationToken = null;
                BlobResultSegment resultSegment = null;
                var results = new List<BlobDirectory>();

                //Call ListBlobsSegmentedAsync and enumerate the result segment returned, while the continuation token is non-null.
                //When the continuation token is null, the last page has been returned and execution can exit the loop.
                do
                {
                    //This overload allows control of the page size. You can return all remaining results by passing null for the maxResults parameter,
                    //or by calling a different overload.
                    resultSegment = await container.ListBlobsSegmentedAsync("", true, BlobListingDetails.All, 10, continuationToken, null, null);

                    if (resultSegment.Results.Count<IListBlobItem>() > 0)
                    {
                        foreach (var blobItem in resultSegment.Results)
                        {
                            Console.WriteLine("\t{0}", blobItem.StorageUri.PrimaryUri);
                            if (blobItem.GetType() == typeof(CloudBlockBlob))
                            {
                                CloudBlockBlob blob = (CloudBlockBlob)blobItem;
                                results.Add(BlobHelper.AddBlob("file", blob.Name, blob.Uri.ToString(), blob.Properties.Length));
                            }
                            else if (blobItem.GetType() == typeof(CloudPageBlob))
                            {
                                CloudPageBlob pageBlob = (CloudPageBlob)blobItem;
                                results.Add(BlobHelper.AddBlob("file", pageBlob.Name, pageBlob.Uri.ToString(), pageBlob.Properties.Length));
                            }
                            else if (blobItem.GetType() == typeof(CloudBlobDirectory))
                            {
                                CloudBlobDirectory directory = (CloudBlobDirectory)blobItem;
                                results.Add(BlobHelper.AddBlob("dir", directory.Prefix, directory.Uri.ToString(), 0));
                            }
                        }
                    }

                    //Get the continuation token.
                    continuationToken = resultSegment.ContinuationToken;
                }
                while (continuationToken != null);

                return results;
            }

            return null;
        }
    }
}