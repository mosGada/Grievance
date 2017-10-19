using Grievance.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository
{
    public class UserRepository
    {
        #region Private member variable(s)
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the user Repository.
        /// </summary>
        public UserRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>

        public async Task<List<UserDTO>> GetAll()
        {
            var UserDTO = new List<UserDTO>();
            var _Users = _ctx.AspNetUsers.ToList();

            await Task.Run(() =>
            {

                var dd = _ctx.AspNetRoles.ToList().Select(c => c.Name);

                foreach (var users in _Users)
                {


                    var mappedUser = new UserDTO()
                    {
                        Id = users.Id,
                        Name = users.Name,
                        Surname = users.Surname,
                        Email = users.Email,
                        PhoneNumber = users.PhoneNumber,
                        UserName = users.UserName,
                        Password = users.PasswordHash,
                        ConfirmPassword = users.PasswordHash,
                        RoleName = users.AspNetRoles.Where(x => x.Id == users.Id.ToString()).ToString()
                    };
                    UserDTO.Add(mappedUser);
                }

            });
            return UserDTO;
        }




    }
}
