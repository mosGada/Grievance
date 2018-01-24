namespace GrievanceAPI.Controllers
{
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using GrievanceRepository;
    using Grievance.DAL;
    using GrievanceRepository.Departments;
    using GrievanceRepository.Ticket;
    using Grievance.DAL.DTO;
    using Grievance.API.Controllers;
    using GrievanceRepository.TicketRemarks;
    #endregion

    [Authorize]
    [RoutePrefix("api/tickets")]
    public class TicketsController : BaseController
    {
        #region Private Member Variable(s)
        TicketRepository _dataProvider = new TicketRepository();
        TicketRemarksRepository _dataTicketRemark = new TicketRemarksRepository();
        #endregion

        [HttpGet]
        [Route("GetAll")]
        public async Task<HttpResponseMessage> GetTickets()
        {
            var response = await _dataProvider.GetTickets();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpGet]
        [Route("GetTicketsByUserRole")]
        public async Task<HttpResponseMessage> GetTicketsByUserRole()
        {            
            var response = await _dataProvider.GetTicketsByUserRole(currentUserRole, currentUserId);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<TicketDTO> Add(TicketDTO ticket)
        {
            ticket.CreatedBy = User.Identity.Name;
            ticket.UpdatedBy = User.Identity.Name;
            ticket.CreatedDate = currentDateTime;
            ticket.UpdatedDate = currentDateTime;
            //ticket.TicketOwnerId = currentUserId;
            ticket.TicketOwnerId = ticket.TicketOwnerId == null ? currentUserId : ticket.TicketOwnerId;
            var newTicket = await _dataProvider.Add(ticket);
            return newTicket;            
        }

        [HttpPost]
        [Route("AddAnonymous")]
        public async Task<TicketDTO> AddAnonymous(TicketDTO ticket)
        {
            ticket.CreatedBy = "anonymous";
            ticket.UpdatedBy = "anonymous";
            ticket.CreatedDate = currentDateTime;
            ticket.UpdatedDate = currentDateTime;
            ticket.TicketOwnerId = "e298785a-d771-49a3-a829-1b360b287503"; //anonymous userId            
            var newTicket = await _dataProvider.Add(ticket);
            return newTicket;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<TicketDTO> Update(TicketDTO ticket)
        {
            ticket.UpdatedBy = currentUser;
            ticket.UpdatedDate = currentDateTime;
            var newTicket = await _dataProvider.Update(ticket);
            return newTicket;
        }
    }
}
