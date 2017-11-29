using Grievance.DAL.DTO;
using Grievance.Repository.TicketCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    [RoutePrefix("api/ticketCategory")]
    public class TicketCategoryController : ApiController
    {
        #region Private Member Variable(s)
        TicketCategoryRepository _dataProvider = new TicketCategoryRepository();
        #endregion

        [HttpGet]
        [Route("GetAll")]
        public async Task<HttpResponseMessage> GetAll()
        {
            var response = await _dataProvider.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<CategoryDTO> Add(CategoryDTO category)
        {
            var newCategory = await _dataProvider.Add(category);
            return newCategory;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<CategoryDTO> Update(CategoryDTO category)
        {
            var newCategory = await _dataProvider.Update(category);
            return newCategory;
        }
    }
}
