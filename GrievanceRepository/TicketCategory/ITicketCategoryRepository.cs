using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.Repository.TicketCategory
{
    public interface ITicketCategoryRepository
    {
        Task<List<CategoryDTO>> GetAll();
        Task<CategoryDTO> Add(CategoryDTO category);
        Task<CategoryDTO> GetById(int id);
        Task<CategoryDTO> Update(CategoryDTO category);
    }
}
