using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.Repository.TicketIssues
{
    public interface ITicketIssuesRepository
    {
        Task<List<TicketIssuesDTO>> GetAll();
        Task<TicketIssuesDTO> Add(TicketIssuesDTO ticketIssues);
        Task<TicketIssuesDTO> GetById(int id);
        Task<TicketIssuesDTO> Update(TicketIssuesDTO ticketIssues);
    }
}
