using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketPriority
{
    public interface ITicketPriorityRepository
    {
        Task<List<TicketPriorityDTO>> GetAll();
        Task<TicketPriorityDTO> Add(TicketPriorityDTO ticketPriority);
        Task<TicketPriorityDTO> GetById(int id);
        Task<TicketPriorityDTO> Update(TicketPriorityDTO ticketPriority);
    }
}
