using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.TicketType
{
    public interface ITicketTypeRepository
    {
        Task<List<TicketTypeDTO>> GetAll();
        Task<TicketTypeDTO> Add(TicketTypeDTO type);
        Task<TicketTypeDTO> GetById(int id);
        Task<TicketTypeDTO> Update(TicketTypeDTO type);
    }
}
