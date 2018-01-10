using Grievance.DAL;
using Grievance.DAL.DTO;
using GrievanceRepository.Base;
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

        //public async Task<List<AccountDTO>> GetAll()
        //{
        //    var AccountDTO = new List<AccountDTO>();
        //    var _Users = _ctx.AspNetUsers.ToList();

        //    await Task.Run(() =>
        //    {

        //      //  var dd = _ctx.AspNetRoles.ToList().Select(c => c.Id);

        //        foreach (var users in _Users)
        //        {


        //            var mappedUser = new AccountDTO()
        //            {
        //                Id = users.Id,
        //                Name = users.Name,
        //                Surname = users.Surname,
        //                Email = users.Email,
        //                PhoneNumber = users.PhoneNumber,
        //                UserName = users.UserName,
        //                Password = users.PasswordHash,
        //                ConfirmPassword = users.PasswordHash,
        //                RoleName = users.AspNetRoles.Where(x => x.Id == users.Id.ToString()).ToString(),
        //                AlternativeNumber = users.AlternativeNumber,
        //                ContactNumber = users.ContactNumber,
        //                EmailAddress = users.EmailAddress,
        //                IDNumber = users.IDNumber,
        //                //Latitude = users.Latitude,
        //                //Longitude = users.Longitude,
        //                PhysicalAddress = users.PhysicalAddress
                        
        //            };
        //            AccountDTO.Add(mappedUser);
        //        }

        //    });
        //    return AccountDTO;
        //}

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
                      //  RoleName = user.AspNetRoles.Where(x => x.Id == user.Id.ToString()).ToString(),
                        IDNumber = user.IDNumber,
                        //Latitude = users.Latitude,
                        //Longitude = users.Longitude,
                        //PhysicalAddress = user.PhysicalAddress

                    }));
                }
            });
            return accountDTO;
        }

        // POST api/Account/Register
        //[AllowAnonymous]
        //[Route("Register")]
        //public async Task<IHttpActionResult> Register(UserModel userModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    IdentityResult result = await _repo.RegisterUser(userModel);

        //    IHttpActionResult errorResult = GetErrorResult(result);

        //    if (errorResult != null)
        //    {
        //        return errorResult;
        //    }

        //    return Ok();
        //}

    }
}
