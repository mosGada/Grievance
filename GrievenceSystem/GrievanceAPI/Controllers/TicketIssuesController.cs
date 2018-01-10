using Grievance.DAL.DTO;
using Grievance.Repository.TicketIssues;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    [RoutePrefix("api/ticketIssues")]
    public class TicketIssuesController : ApiController
    {
        #region Private Member Variable(s)
        TicketIssuesRepository _dataProvider = new TicketIssuesRepository();
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
        public async Task<TicketIssuesDTO> Add(TicketIssuesDTO issue)
        {
            var newPriority = await _dataProvider.Add(issue);
            return newPriority;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<TicketIssuesDTO> Update(TicketIssuesDTO issue)
        {
            var newPriority = await _dataProvider.Update(issue);
            return newPriority;
        }
    }
}
