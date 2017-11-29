using Grievance.DAL;
using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.Ticket
{
    public interface ITicketRepository
    {
        Task<List<TicketDTO>> GetTickets();
        Task<TicketDTO> Add(TicketDTO ticket);
       // Task<TicketDTO> GetById(int id);
        Task<TicketDTO> Update(TicketDTO ticket);
        //Task<List<TicketRemarkDTO>> GetAllRemarks();
        //Task<TicketRemarkDTO> AddRmark(TicketRemarkDTO ticketRemark);
        ////Task<TicketRemarkDTO> GetRemarkById(int id);
        //Task<TicketRemarkDTO> UpdateRemark(TicketRemarkDTO ticketRemark);
    }
}
