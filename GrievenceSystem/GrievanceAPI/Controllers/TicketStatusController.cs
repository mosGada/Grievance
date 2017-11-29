using Grievance.DAL.DTO;
using GrievanceRepository.TicketStatus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/ticketStatus")]
    public class TicketStatusController : ApiController
    {
        #region Private Member Variable(s)
        TicketStatusRepository _dataProvider = new TicketStatusRepository();
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
        public async Task<TicketStatusDTO> Add(TicketStatusDTO status)
        {
            var newStatus = await _dataProvider.Add(status);
            return newStatus;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<TicketStatusDTO> Update(TicketStatusDTO status)
        {
            var newStatus = await _dataProvider.Update(status);
            return newStatus;
        }
    }
}
