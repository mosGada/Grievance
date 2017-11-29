using GrievanceRepository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grievance.DAL.DTO;
using Grievance.DAL;

namespace GrievanceRepository.Departments
{

    public class DepartmentRepository : BaseRepository, IDepartmentRepository
    {
        #region Private member variables
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the Department Repository.
        /// </summary>
        public DepartmentRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion

        public async Task<DepartmentDTO> Add(DepartmentDTO department)
        {
            await Task.Run(() =>
            {
                var newDepartment = new Department()
                {
                    AlternativeNumber = department.AlternativeNumber,
                    ContactPerson = department.ContactPerson,
                    CreatedBy = department.CreatedBy,
                    CreatedDate = department.CreatedDate,
                    EmailAddress = department.EmailAddress,
                    HOD = department.HOD,
                    Name = department.Name,
                    TellNumber = department.TellNumber,
                    UpdatedBy = department.UpdatedBy,
                    UpdatedDate = department.UpdatedDate
                };
                _ctx.Departments.Add(newDepartment);
                _ctx.SaveChanges();
            });
            return department;
        }

        public async Task<List<DepartmentDTO>> GetAll()
        {
            var departmentDTO = new List<DepartmentDTO>();
            await Task.Run(() =>
            {
                var departments = _ctx.Departments.OrderByDescending(x => x.Name);
                if (departments.Any())
                {
                    departmentDTO.AddRange(departments.Select(department => new DepartmentDTO()
                    {
                        Id = department.Id,
                        AlternativeNumber = department.AlternativeNumber,
                        ContactPerson = department.ContactPerson,
                        CreatedBy = department.CreatedBy,
                        CreatedDate = department.CreatedDate,
                        EmailAddress = department.EmailAddress,
                        HOD = department.HOD,
                        Name = department.Name,
                        TellNumber = department.TellNumber,
                        UpdatedBy = department.UpdatedBy,
                        UpdatedDate = department.UpdatedDate
                    }));
                }
            });
            return departmentDTO;
        }

        public async Task<DepartmentDTO> GetById(int id)
        {
            var departmentDTO = new DepartmentDTO();
            await Task.Run(() =>
            {
                var department = _ctx.Departments.FirstOrDefault(x => x.Id == id);
                if (department == null) return;
                var mappedDepartment = new DepartmentDTO()
                {
                    AlternativeNumber = department.AlternativeNumber,
                    ContactPerson = department.ContactPerson,
                    CreatedBy = department.CreatedBy,
                    CreatedDate = department.CreatedDate,
                    EmailAddress = department.EmailAddress,
                    HOD = department.HOD,
                    Name = department.Name,
                    TellNumber = department.TellNumber,
                    UpdatedBy = department.UpdatedBy,
                    UpdatedDate = department.UpdatedDate
                };
            });
            return departmentDTO;
        }

        public async Task<DepartmentDTO> Update(DepartmentDTO department)
        {
            await Task.Run(() =>
            {
                var existingDepartment = _ctx.Departments.FirstOrDefault(x => x.Id == department.Id);
                if (existingDepartment != null)
                {
                    existingDepartment.AlternativeNumber = department.AlternativeNumber;
                    existingDepartment.ContactPerson = department.ContactPerson;
                    existingDepartment.EmailAddress = department.EmailAddress;
                    existingDepartment.HOD = department.HOD;
                    existingDepartment.Name = department.Name;
                    existingDepartment.TellNumber = department.TellNumber;
                    existingDepartment.UpdatedBy = department.UpdatedBy;
                    existingDepartment.UpdatedDate = department.UpdatedDate;
                    _ctx.SaveChanges();
                }
            });
            return department;
        }
    }
}
