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

        //[HttpGet]
        //[Route("GetTicketOwner")]
        //public async Task<HttpResponseMessage> GetTicketOwner()
        //{
        //    var response = await _dataProvider.GetOwner();
        //    return Request.CreateResponse(HttpStatusCode.OK, response);
        //}

        //[HttpGet]
        //[Route("GetTicketRemarks")]
        //public async Task<HttpResponseMessage> GetTicketRemarks(int id)
        //{
        //    var response = await _dataProvider.GetRemarksById(id);
        //    return Request.CreateResponse(HttpStatusCode.OK, response);
        //}

        [HttpPost]
        [Route("Add")]
        public async Task<TicketDTO> Add(TicketDTO ticket)
        {
            ticket.CreatedBy = User.Identity.Name;
            ticket.UpdatedBy = User.Identity.Name;
            ticket.CreatedDate = currentDateTime;
            ticket.UpdatedDate = currentDateTime;
            ticket.TicketOwnerId = currentUserId;
            ticket.TicketOwnerId = ticket.TicketOwnerId == null ? currentUserId : ticket.TicketOwnerId;
            var newTicket = await _dataProvider.Add(ticket);
            return newTicket;            
        }

        [HttpPost]
        [Route("AddRemarks")]
        public async Task<TicketRemarkDTO> AddRemarks(TicketRemarkDTO ticketRemark)
        {
            ticketRemark.CreatedBy = currentUser;
            ticketRemark.UpdatedBy = currentUser;
            ticketRemark.CreatedDate = currentDateTime;
            ticketRemark.UpdatedDate = currentDateTime;
            var newTicketRemark = await _dataTicketRemark.Add(ticketRemark);
            return newTicketRemark;
        }

        //[HttpPost]
        //[Route("AddOwners")]
        //public async Task<TicketOwnerDTO> AddOwners(TicketOwnerDTO ticketOwner)
        //{
        //    ticketOwner.CreatedBy = currentUser;
        //    ticketOwner.UpdatedBy = currentUser;
        //    ticketOwner.CreatedDate = currentDateTime;
        //    ticketOwner.UpdatedDate = currentDateTime;
        //    var newTicketOwner = await _dataTicketOwner.Add(ticketOwner);
        //    return newTicketOwner;
        //}

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
