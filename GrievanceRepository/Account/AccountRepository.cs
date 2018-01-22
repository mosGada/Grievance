using Grievance.DAL;
using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.Account
{
    public class AccountRepository:BaseRepository, IAccountRepository
    {
        #region Private member variable(s)
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the account Repository.
        /// </summary>
        public AccountRepository()
        {
            _ctx = new grievancedbEntities();
        }

        #endregion

        public async Task<List<AccountDTO>> GetAll()
        {
            var accountDTO = new List<AccountDTO>();
            await Task.Run(() =>
            {
                var users = _ctx.AspNetUsers.ToList();
                if (users.Any())
                {
                    accountDTO.AddRange(users.Select(user => new AccountDTO()
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Surname = user.Surname,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        UserName = user.UserName,
                        Password = user.PasswordHash,
                        ConfirmPassword = user.PasswordHash,
                        IDNumber = user.IDNumber,
                        PhysicalAddress = user.PhysicalAddress
                        //Latitude = users.Latitude,
                        //Longitude = users.Longitude

                    }));
                }
            });
            return accountDTO;
        }        

    }
}
