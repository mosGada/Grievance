using Grievance.DAL;
using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketPriority
{
    public class TicketPriorityRepository : BaseDTO, ITicketPriorityRepository
    {
        #region Private member variables
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the ticketOwner Repository.
        /// </summary>
        public TicketPriorityRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion

        public async Task<TicketPriorityDTO> Add(TicketPriorityDTO ticketPriority)
        {
            await Task.Run(() =>
            {
                var newTicketPriority = new Grievance.DAL.TicketPriority()
                {
                    CreatedBy = ticketPriority.CreatedBy,
                    CreatedDate = ticketPriority.CreatedDate,
                    Description = ticketPriority.Description,
                    Name = ticketPriority.Name,
                    UpdatedBy = ticketPriority.UpdatedBy,
                    UpdatedDate = ticketPriority.UpdatedDate

                };
                _ctx.TicketPriorities.Add(newTicketPriority);
                _ctx.SaveChanges();
            });
            return ticketPriority;
        }

        public async Task<List<TicketPriorityDTO>> GetAll()
        {
            var ticketPrioryDTO = new List<TicketPriorityDTO>();
            await Task.Run(() =>
            {
                var ticketPriority = _ctx.TicketPriorities.OrderByDescending(x => x.Name);
                if (ticketPriority.Any())
                {
                    ticketPrioryDTO.AddRange(ticketPriority.Select(ticket => new TicketPriorityDTO()
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
            return ticketPrioryDTO;
        }

        public async Task<TicketPriorityDTO> GetById(int id)
        {
            var ticketPriorityDTO = new TicketPriorityDTO();
            await Task.Run(() =>
            {
                var ticketPriority = _ctx.TicketPriorities.FirstOrDefault(x => x.Id == id);
                if (ticketPriority == null) return;
                var mappedTicketPriority = new TicketPriorityDTO()
                {
                    CreatedBy = ticketPriority.CreatedBy,
                    CreatedDate = ticketPriority.CreatedDate,
                    Description = ticketPriority.Description,
                    Id = ticketPriority.Id,
                    Name = ticketPriority.Name,
                    UpdatedBy = ticketPriority.UpdatedBy,
                    UpdatedDate = ticketPriority.UpdatedDate
                };
                ticketPriorityDTO = mappedTicketPriority;
            });
            return ticketPriorityDTO;
        }

        public async Task<TicketPriorityDTO> Update(TicketPriorityDTO ticketPriority)
        {
            await Task.Run(() =>
            {
                var existingTicketPriority = _ctx.TicketPriorities.FirstOrDefault(x => x.Id == ticketPriority.Id);
                if (existingTicketPriority != null)
                {
                    existingTicketPriority.Description = ticketPriority.Description;
                    existingTicketPriority.Name = ticketPriority.Name;
                    existingTicketPriority.UpdatedBy = ticketPriority.UpdatedBy;
                    existingTicketPriority.UpdatedDate = ticketPriority.UpdatedDate;
                    _ctx.SaveChanges();
                }
            });
            return ticketPriority;
        }
    }
}
