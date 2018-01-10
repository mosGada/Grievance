using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grievance.DAL.DTO;
using Grievance.DAL;

namespace GrievanceRepository.TicketOwner
{
    public class TicketOwnerRepository : ITicketOwnerRepository
    {

        #region Private member variable(s)
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        public TicketOwnerRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion
        public async Task<TicketOwnerDTO> Add(TicketOwnerDTO ticketOwner)
        {
            await Task.Run(() =>
            {
                var newTicketOwner = new Grievance.DAL.TicketOwner()
                {
                    CreatedBy = ticketOwner.CreatedBy,
                    CreatedDate = ticketOwner.CreatedDate,
                    EmailAddress = ticketOwner.EmailAddress,
                    Gender = ticketOwner.Gender,
                    IDNumber = ticketOwner.IDNumber,
                    Latitude = ticketOwner.Latitude,
                    Longitude = ticketOwner.Longitude,
                    Name = ticketOwner.Name,
                    PhoneNumber = ticketOwner.PhoneNumber,
                    PhysicalAddress = ticketOwner.PhysicalAddress,
                    Surname = ticketOwner.Surname,
                    TicketTypeId = ticketOwner.TicketTypeId,
                    UpdatedBy = ticketOwner.UpdatedBy,
                    UpdatedDate = ticketOwner.UpdatedDate
                };
                _ctx.TicketOwners.Add(newTicketOwner);
                _ctx.SaveChanges();
                ticketOwner.Id = newTicketOwner.Id;
                ticketOwner.TicketTypeId = newTicketOwner.TicketTypeId ?? default(int);

            });
            return ticketOwner;
        }

        public async Task<List<TicketOwnerDTO>> GetAll()
        {
            var ticketOwnerDTO = new List<TicketOwnerDTO>();
            await Task.Run(() =>
            {
                var ticketOwner = _ctx.Tickets.OrderByDescending(x => x.CreatedDate);
                if (ticketOwner.Any())
                {
                    ticketOwnerDTO.AddRange(ticketOwner.Select(ticket => new TicketOwnerDTO()
                    {
                        Id = ticket.Id,
                        CreatedDate = ticket.CreatedDate ?? default(DateTime),
                        Name = ticket.Name ?? default(string),
                        CreatedBy = ticket.CreatedBy,
                        TicketTypeId = ticket.TicketTypeId ?? default(int),
                        TicketTypeName = ticket.TicketType.Name ?? default(string),
                        PhysicalAddress = ticket.TicketOwner.PhysicalAddress ?? default(string),
                        EmailAddress = ticket.TicketOwner.EmailAddress ?? default(string),
                        Gender = ticket.TicketOwner.Gender ?? default(string),
                        IDNumber = ticket.TicketOwner.IDNumber ?? default(string),
                        PhoneNumber = ticket.TicketOwner.PhoneNumber ?? default(string),
                        Surname = ticket.TicketOwner.Surname ?? default(string)

                    }));
                }
            });
            return ticketOwnerDTO;
        }

        public async Task<TicketOwnerDTO> GetById(int id)
        {
            var ticketOwnerDTO = new TicketOwnerDTO();
            await Task.Run(() =>
            {
                var ticketOwner = _ctx.TicketOwners.FirstOrDefault(x => x.Id == id);
                if (ticketOwner == null) return;
                var mappedTicketOwner = new TicketOwnerDTO()
                {
                    CreatedBy = ticketOwner.CreatedBy,
                    CreatedDate = ticketOwner.CreatedDate ?? default(DateTime),
                    EmailAddress = ticketOwner.EmailAddress,
                    Gender = ticketOwner.Gender,
                    Id = ticketOwner.Id,
                    IDNumber = ticketOwner.IDNumber,
                    Latitude = ticketOwner.Latitude,
                    Longitude = ticketOwner.Longitude,
                    Name = ticketOwner.Name,
                    PhoneNumber = ticketOwner.PhoneNumber,
                    PhysicalAddress = ticketOwner.PhysicalAddress,
                    Surname = ticketOwner.Surname,
                    UpdatedBy = ticketOwner.UpdatedBy,
                    UpdatedDate = ticketOwner.UpdatedDate ?? default(DateTime)
                };
                ticketOwnerDTO = mappedTicketOwner;
            });
            return ticketOwnerDTO;

        }

        public async Task<TicketOwnerDTO> Update(TicketOwnerDTO ticketOwner)
        {
            await Task.Run(() =>
            {
                var existingTicketOwner = _ctx.TicketOwners.FirstOrDefault(x => x.Id == ticketOwner.Id);
                if (existingTicketOwner != null)
                {
                    existingTicketOwner.EmailAddress = ticketOwner.EmailAddress;
                    existingTicketOwner.Gender = ticketOwner.Gender;
                    existingTicketOwner.Name = ticketOwner.Name;
                    existingTicketOwner.IDNumber = ticketOwner.IDNumber;
                    existingTicketOwner.Latitude = ticketOwner.Latitude;
                    existingTicketOwner.Longitude = ticketOwner.Longitude;
                    existingTicketOwner.PhoneNumber = ticketOwner.PhoneNumber;
                    existingTicketOwner.TicketTypeId = ticketOwner.TicketTypeId;
                    existingTicketOwner.PhysicalAddress = ticketOwner.PhysicalAddress;
                    existingTicketOwner.Surname = ticketOwner.Surname;
                    existingTicketOwner.UpdatedBy = ticketOwner.UpdatedBy;
                    existingTicketOwner.UpdatedDate = DateTime.Now;
                    _ctx.SaveChanges();
                }
            });
            return ticketOwner;
        }
    }
}
