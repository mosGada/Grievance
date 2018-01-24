using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketRemarks
{
    public interface ITicketRemarksRepository
    {
        Task<List<TicketRemarkDTO>> GetAll();
        Task<TicketRemarkDTO> GetById(int id);
        Task<TicketRemarkDTO> Update(TicketRemarkDTO ticketRemark);

    }
}
