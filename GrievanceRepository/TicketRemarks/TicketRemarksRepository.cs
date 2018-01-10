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

        /// <summary>
        /// Add remarks of type Image
        /// </summary>
        /// <param name="imageRemark"></param>
        /// <returns></returns>
        public async Task<TicketRemarkDTO> AddRemark(TicketRemarkDTO ticketRemark)
        {
            await Task.Run(() =>
            {
                var newTicketRemark = new TicketRemark()
                {
                    CreatedBy = ticketRemark.CreatedBy,
                    CreatedDate = ticketRemark.CreatedDate,
                    Type = ticketRemark.Type,
                    TicketId = ticketRemark.TicketId,
                    Desription = ticketRemark.Desription,
                    UpdatedBy = ticketRemark.UpdatedBy,
                    UpdatedDate = ticketRemark.UpdatedDate
                };
                _ctx.TicketRemarks.Add(newTicketRemark);
                _ctx.SaveChanges();
                ticketRemark.Id = newTicketRemark.Id;
            });
            return ticketRemark;
        }

        /// <summary>
        /// Get Ticket Remarks by Ticket Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<List<TicketRemarkDTO>> GetRemarksByTicketId(int ticketId)
        {
            var ticketRemarks = new List<TicketRemarkDTO>();
            await Task.Run(() =>
            {
                var remarks = _ctx.TicketRemarks.Where(x => x.TicketId == ticketId).OrderByDescending(x => x.CreatedDate);
                if (remarks.Any())
                {
                    ticketRemarks.AddRange(remarks.Select(ticketRemark => new TicketRemarkDTO()
                    {
                        Id = ticketRemark.Id,
                        CreatedBy = ticketRemark.CreatedBy,
                        CreatedDate = ticketRemark.CreatedDate ?? default(DateTime),
                        Desription = ticketRemark.Desription,
                        TicketId = ticketRemark.TicketId ?? -1,
                        Type = ticketRemark.Type,
                        UpdatedDate = ticketRemark.UpdatedDate ?? default(DateTime),
                        UpdatedBy = ticketRemark.UpdatedBy
                    }));
                }
            });
            return ticketRemarks;
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

