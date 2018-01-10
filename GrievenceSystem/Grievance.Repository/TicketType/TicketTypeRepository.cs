using Grievance.DAL;
using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketType
{
    public class TicketTypeRepository : BaseDTO, ITicketTypeRepository
    {
        #region Private member variables
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the ticket type Repository.
        /// </summary>
        public TicketTypeRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion

        public async Task<TicketTypeDTO> Add(TicketTypeDTO type)
        {
            await Task.Run(() =>
            {
                var newTicketType = new Grievance.DAL.TicketType()
                {
                    CreatedBy = type.CreatedBy,
                    CreatedDate = type.CreatedDate,
                    Description = type.Description,
                    Name = type.Name,
                    UpdatedBy = type.UpdatedBy,
                    UpdatedDate = type.UpdatedDate

                };
                _ctx.TicketTypes.Add(newTicketType);
                _ctx.SaveChanges();
            });
            return type;
        }

        public async Task<List<TicketTypeDTO>> GetAll()
        {
            var ticketTicketDTO = new List<TicketTypeDTO>();
            await Task.Run(() =>
            {
                var ticketType = _ctx.TicketTypes.OrderByDescending(x => x.Name);
                if (ticketType.Any())
                {
                    ticketTicketDTO.AddRange(ticketType.Select(type => new TicketTypeDTO()
                    {
                        CreatedBy = type.CreatedBy,
                        CreatedDate = type.CreatedDate,
                        Description = type.Description,
                        Id = type.Id,
                        Name = type.Name,
                        UpdatedBy = type.UpdatedBy,
                        UpdatedDate = type.UpdatedDate
                    }));
                }

            });
            return ticketTicketDTO;
        }

        public async Task<TicketTypeDTO> GetById(int id)
        {
            var ticketTypeDTO = new TicketTypeDTO();
            await Task.Run(() =>
            {
                var ticketType = _ctx.TicketCategories.FirstOrDefault(x => x.Id == id);
                if (ticketType == null) return;
                var mappedTicketType = new TicketTypeDTO()
                {
                    CreatedBy = ticketType.CreatedBy,
                    CreatedDate = ticketType.CreatedDate,
                    Description = ticketType.Description,
                    Id = ticketType.Id,
                    Name = ticketType.Name,
                    UpdatedBy = ticketType.UpdatedBy,
                    UpdatedDate = ticketType.UpdatedDate
                };
                ticketTypeDTO = mappedTicketType;
            });
            return ticketTypeDTO;
        }

        public async Task<TicketTypeDTO> Update(TicketTypeDTO type)
        {
            await Task.Run(() =>
            {
                var existingTicketType = _ctx.TicketTypes.FirstOrDefault(x => x.Id == type.Id);
                if (existingTicketType != null)
                {
                    existingTicketType.Description = type.Description;
                    existingTicketType.Name = type.Name;
                    existingTicketType.UpdatedBy = type.UpdatedBy;
                    existingTicketType.UpdatedDate = type.UpdatedDate;
                    _ctx.SaveChanges();
                }
            });
            return type;
        }
    }
}
