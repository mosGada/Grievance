using Grievance.DAL;
using Grievance.DAL.DTO;
using GrievanceRepository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketStatus
{
    public class TicketStatusRepository: BaseRepository, ITicketStatusRepository
    {
        #region Private member variables
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the ticketOwner Repository.
        /// </summary>
        public TicketStatusRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion

        public async Task<TicketStatusDTO> Add(TicketStatusDTO ticketStatus)
        {
            await Task.Run(() =>
            {
                var newTicketStatus = new Grievance.DAL.TicketStatus()
                {
                    CreatedBy = ticketStatus.CreatedBy,
                    CreatedDate = ticketStatus.CreatedDate,
                    Description = ticketStatus.Description,
                    Name = ticketStatus.Name,
                    UpdatedBy = ticketStatus.UpdatedBy,
                    UpdatedDate = ticketStatus.UpdatedDate

                };
                _ctx.TicketStatuses.Add(newTicketStatus);
                _ctx.SaveChanges();
            });
            return ticketStatus;
        }

        public async Task<List<TicketStatusDTO>> GetAll()
        {
            var ticketStatusDTO = new List<TicketStatusDTO>();
            await Task.Run(() =>
            {
                var ticketStatus = _ctx.TicketStatuses.OrderByDescending(x => x.Name);
                if (ticketStatus.Any())
                {
                    ticketStatusDTO.AddRange(ticketStatus.Select(ticket => new TicketStatusDTO()
                    {
                        CreatedBy = ticket.CreatedBy,
                        CreatedDate = ticket.CreatedDate,
                        Description = ticket.Description,
                        Id = ticket.Id,
                        Name = ticket.Name,
                        UpdatedBy = ticket.UpdatedBy,
                        UpdatedDate = ticket.UpdatedDate
                    }));
                }

            });
            return ticketStatusDTO;
        }

        public async Task<TicketStatusDTO> GetById(int id)
        {
            var ticketStatusDTO = new TicketStatusDTO();
            await Task.Run(() =>
            {
                var ticketStatus = _ctx.TicketStatuses.FirstOrDefault(x => x.Id == id);
                if (ticketStatus == null) return;
                var mappedTicketStatus = new TicketStatusDTO()
                {
                    CreatedBy = ticketStatus.CreatedBy,
                    CreatedDate = ticketStatus.CreatedDate,
                    Description = ticketStatus.Description,
                    Id = ticketStatus.Id,
                    Name = ticketStatus.Name,
                    UpdatedBy = ticketStatus.UpdatedBy,
                    UpdatedDate = ticketStatus.UpdatedDate
                };
                ticketStatusDTO = mappedTicketStatus;
            });
            return ticketStatusDTO;
        }

        public async Task<TicketStatusDTO> Update(TicketStatusDTO ticketStatus)
        {
            await Task.Run(() =>
            {
                var existingTicketStatus = _ctx.TicketStatuses.FirstOrDefault(x => x.Id == ticketStatus.Id);
                if (existingTicketStatus != null)
                {
                    existingTicketStatus.Description = ticketStatus.Description;
                    existingTicketStatus.Name = ticketStatus.Name;
                    existingTicketStatus.UpdatedBy = ticketStatus.UpdatedBy;
                    existingTicketStatus.UpdatedDate = ticketStatus.UpdatedDate;
                    _ctx.SaveChanges();
                }
            });
            return ticketStatus;
        }
    }
}
