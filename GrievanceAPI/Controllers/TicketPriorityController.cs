using Grievance.DAL.DTO;
using GrievanceRepository.TicketPriority;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{

    [RoutePrefix("api/ticketPriority")]
    public class TicketPriorityController : ApiController
    {
        #region Private Member Variable(s)
        TicketPriorityRepository _dataProvider = new TicketPriorityRepository();
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
        public async Task<TicketPriorityDTO> Add(TicketPriorityDTO priority)
        {
            var newPriority = await _dataProvider.Add(priority);
            return newPriority;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<TicketPriorityDTO> Update(TicketPriorityDTO priority)
        {
            var newPriority = await _dataProvider.Update(priority);
            return newPriority;
        }
    }
}
