using Grievance.DAL;
using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.Account
{
    public class RoleRepository
    {
        #region Private member variable(s)
        private grievancedbEntities _ctx;
        #endregion

        public RoleRepository()
        {
            _ctx = new grievancedbEntities();
        }

        /// <summary>
        /// Get Roles
        /// </summary>
        /// <returns></returns>
        public async Task<List<RoleDTO>> GetAll()
        {
            var roleDTO = new List<RoleDTO>();
            await Task.Run(() =>
            {
                var roles = _ctx.AspNetRoles.ToList();
                if (roles.Any())
                {
                    roleDTO.AddRange(roles.Select(role => new RoleDTO()
                    {
                        Id = role.Id,
                        Name = role.Name
                    }));
                }
            });

            return roleDTO;
        }
    }
}
