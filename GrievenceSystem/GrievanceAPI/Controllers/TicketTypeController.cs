using Grievance.DAL.DTO;
using GrievanceRepository.TicketType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    [RoutePrefix("api/ticketType")]
    public class TicketTypeController : ApiController
    {
        #region Private Member Variable(s)
        TicketTypeRepository _dataProvider = new TicketTypeRepository();
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
        public async Task<TicketTypeDTO> Add(TicketTypeDTO type)
        {
            var newType = await _dataProvider.Add(type);
            return newType;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<TicketTypeDTO> Update(TicketTypeDTO type)
        {
            var newType = await _dataProvider.Update(type);
            return newType;
        }
    }
}
