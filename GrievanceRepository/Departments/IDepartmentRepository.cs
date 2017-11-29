using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.Departments
{
    public interface IDepartmentRepository
    {
        Task<List<DepartmentDTO>> GetAll();

        Task<DepartmentDTO> Add(DepartmentDTO department);

        Task<DepartmentDTO> GetById(int id);

        Task<DepartmentDTO> Update(DepartmentDTO department);
    }
}
