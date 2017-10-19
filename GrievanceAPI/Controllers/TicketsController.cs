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
    #endregion
        
    [RoutePrefix("api/tickets")]
    public class TicketsController : BaseController
    {
        #region Private Member Variable(s)
        TicketRepository _dataProvider = new TicketRepository();
        NotificationRepository _notificationProvider = new NotificationRepository();
        #endregion

        //[HttpGet]
        //[Route("GetAll")]
        //// GET: api/Tickets
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        [HttpGet]
        [Route("GetAll")]
        public async Task<HttpResponseMessage> GetTickets()
        {
            var response = await _dataProvider.GetTickets();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<TicketDTO> Add(TicketDTO ticket)
        {
            var newTicket = new TicketDTO();
            ticket.CreatedBy = currentUser;
            ticket.CreatedDate = currentDateTime;
            ticket.LastModifiedDate = currentDateTime;            
            ticket.UserId = currentUserId;
            await Task.Run(async () =>
            {
                //Add Ticket
                newTicket = await _dataProvider.Add(ticket);

                //Send Email Notification
                _notificationProvider.SendConfirmationNotification(currentUserEmail, newTicket);
            });
            
            return newTicket;
        }

        ///// <summary>
        ///// Sends a notification.
        ///// </summary>
        ///// <param name="emailAddress"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("SendNotification")]
        //public async Task<HttpResponseMessage> SendNotification(string emailAddress)
        //{
        //    var response = await _notificationProvider.SendNotification(emailAddress);
        //    return Request.CreateResponse(HttpStatusCode.OK, response);
        //}

        [HttpPost]
        [Route("Update")]
        public async Task<TicketDTO> Update(TicketDTO ticket)
        {
            var newTicket = await _dataProvider.Update(ticket);
            return newTicket;
        }

        ///// <summary>
        ///// Rejects an assigned order to Open Item 3.
        ///// </summary>
        ///// <param name="order"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("Cancel")]
        //public async Task<HttpResponseMessage> RejectAssigned(OrderDTO order)
        //{
        //    var response = await _integrationProvider.RejectAssignedOrder(order);
        //    if (response != null)
        //    {
        //        order.UpdatedBy = currentUser;
        //        order.UpdatedDate = currentDateTime;
        //        await Task.Run(() =>
        //        {
        //            _dataProvider.Delete(order);
        //        });

        //        ///Notify all clients to remove order.
        //        var _context = GlobalHost.ConnectionManager.GetHubContext<ClientHub>();
        //        _context.Clients.All.orderDelete(order);
        //    }
        //    return Request.CreateResponse(HttpStatusCode.OK, Constants.OpenItem.successMessage);
        //}

        // GET: api/Tickets/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Tickets
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Tickets/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Tickets/5
        public void Delete(int id)
        {
        }
    }
}
