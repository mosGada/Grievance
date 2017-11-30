using Grievance.DAL.DTO;
using GrievanceAPI.Controllers;
using GrievanceRepository.TicketRemarks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    [RoutePrefix("api/ticketRemark")]
    public class TicketRemarksController : BaseController
    {
        #region Private Member Variable(s)
        TicketRemarksRepository _dataProvider = new TicketRemarksRepository();
        #endregion

        [HttpGet]
        [Route("GetAll")]
        public async Task<HttpResponseMessage> GetAll()
        {
            var response = await _dataProvider.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpGet]
        [Route("GetById")]
        public async Task<TicketRemarkDTO> GetById(int ticketId)
        {
            return await _dataProvider.GetById(ticketId);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<TicketRemarkDTO> Add(TicketRemarkDTO remark, int id)
        {
            var newRemark = await _dataProvider.Add(remark, id);
            return newRemark;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<TicketRemarkDTO> Update(TicketRemarkDTO remark)
        {
            var newRemark = await _dataProvider.Update(remark);
            return newRemark;
        }

        [HttpPost]
        [Route("AddRemark")]
        public async Task<TicketRemarkDTO> AddRemark(TicketRemarkDTO ticketRemark)
        {
            ticketRemark.CreatedBy = currentUser;
            ticketRemark.CreatedDate = currentDateTime;
            ticketRemark.UpdatedBy = currentUser;
            ticketRemark.UpdatedDate = currentDateTime;            
            var newRemark = await _dataProvider.AddRemark(ticketRemark);
            return newRemark;
        }

        [HttpGet]
        [Route("GetRemarksByTicketId")]
        public async Task<List<TicketRemarkDTO>> GetRemarksByTicketId(int ticketId)
        {
            return await _dataProvider.GetRemarksByTicketId(ticketId);
        }
    }
}
