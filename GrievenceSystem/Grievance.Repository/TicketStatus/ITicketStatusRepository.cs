using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketStatus
{
    public interface ITicketStatusRepository
    {
        Task<List<TicketStatusDTO>> GetAll();
        Task<TicketStatusDTO> Add(TicketStatusDTO ticketStatus);
        Task<TicketStatusDTO> GetById(int id);
        Task<TicketStatusDTO> Update(TicketStatusDTO ticketStatus);
    }
}
