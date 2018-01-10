using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketOwner
{
    public interface ITicketOwnerRepository
    {
        Task<List<TicketOwnerDTO>> GetAll();
        Task<TicketOwnerDTO> Add(TicketOwnerDTO ticketOwner);
        Task<TicketOwnerDTO> GetById(int id);
        Task<TicketOwnerDTO> Update(TicketOwnerDTO ticketOwner);
    }
}
