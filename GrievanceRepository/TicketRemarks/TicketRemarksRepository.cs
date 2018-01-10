using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grievance.DAL.DTO;
using Grievance.DAL;

namespace GrievanceRepository.TicketRemarks
{
    
    public class TicketRemarksRepository : BaseRepository, ITicketRemarksRepository
    {
        #region Private member variables
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the TicketRemarks Repository.
        /// </summary>
        public TicketRemarksRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion
        public async Task<TicketRemarkDTO> Add(TicketRemarkDTO ticketRemark)
        {
            await Task.Run(() =>
            {
                var newTicketRemark = new TicketRemark()
                {
                    CreatedBy = ticketRemark.CreatedBy,
                    CreatedDate = ticketRemark.CreatedDate,
                    Desription = ticketRemark.Desription,
                    TicketId = ticketRemark.TicketId,
                    UpdatedBy = ticketRemark.UpdatedBy,
                    UpdatedDate = ticketRemark.UpdatedDate
                };
                _ctx.TicketRemarks.Add(newTicketRemark);
                _ctx.SaveChanges();

            });
            return ticketRemark;
        }

        public Task<List<TicketRemarkDTO>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<TicketRemarkDTO> GetById(int id)
        {
            
            var ticketRemarkDTO = new TicketRemarkDTO();
            await Task.Run(() =>
            {
                var ticketOwner = _ctx.Tickets.FirstOrDefault(x => x.Id == id).TicketOwner.Name;
                var remark = _ctx.TicketRemarks.FirstOrDefault(x => x.TicketId == id);
                if (remark == null) return;
                var mappedRemark = new TicketRemarkDTO()
                {
                    Id = remark.Id,
                    Desription = remark.Desription,
                    TicketId = remark.TicketId ?? default(int),
                    UpdatedBy = remark.UpdatedBy,
                    UpdatedDate = remark.UpdatedDate ?? default(DateTime),
                    CreatedBy = remark.CreatedBy,
                    CreatedDate = remark.CreatedDate ?? default(DateTime),
                    TicketOwnerName = ticketOwner != "" ? ticketOwner : "Anonymous"
                };
                ticketRemarkDTO = mappedRemark;
            });
            return ticketRemarkDTO;
        }

        public Task<TicketRemarkDTO> Update(TicketRemarkDTO ticketRemark)
        {
            throw new NotImplementedException();
        }
    }
}

