using Grievance.DAL.DTO;
using GrievanceRepository.TicketOwner;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace GrievanceAPI.Controllers
{
    [RoutePrefix("api/ticketOwner")]
    public class TicketOwnerController : ApiController
    {
        #region Private Member Variable(s)
        TicketOwnerRepository _dataProvider = new TicketOwnerRepository();
        #endregion

        [HttpGet]
        [Route("getByID")]
        public async Task<TicketOwnerDTO> GetByID(int id)
        {
            return await _dataProvider.GetById(id);         
        }
    }
}
