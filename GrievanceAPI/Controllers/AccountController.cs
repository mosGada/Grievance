namespace GrievanceAPI.Controllers
{
    #region Usings
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Microsoft.Owin.Security;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Collections.Generic;
    using Grievance.DAL.DTO;
    using GrievanceRepository.Account;
    #endregion

    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        #region Private Member variable(s)
        AccountRepository _dataProvider = new AccountRepository();
        private AuthRepository _repo = null;
        private RoleRepository _roleRepo = null;
        #endregion

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        public AccountController()
        {
            _repo = new AuthRepository();
            _roleRepo = new RoleRepository();
        }

        [HttpGet]
        [Route("GetAccountByID")]
        public async Task<AccountDTO> GetAccountById(string id)
        {
            return await _dataProvider.GetByID(id);
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(UserModel userModel)
        {
            userModel.UserName = _repo.GenerateUsername(userModel);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.RegisterUser(userModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            IdentityUser user = await _repo.FindUserByName(userModel.UserName);
            if (user != null)
            {
                IdentityResult roleresult = await _repo.AddUserToRole(user.Id, userModel.RoleID);
                var userid = user.Id;

                return Ok(userid);
            }

            return Ok("Success");
        }

        [Route("Update")]
        public async Task<IHttpActionResult> Update(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.UpdateUser(userModel, userModel.UserID);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok("Error");
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<List<AccountDTO>> GetAll()
        {
            return await _dataProvider.GetAll();
            //var Users = _dataProvider.GetAll();
            //return Request.CreateResponse(HttpStatusCode.OK, Users);
        }

        [HttpGet]
        [Route("GetRoles")]
        public async Task<List<RoleDTO>> GetRoles()
        {            
            return await _roleRepo.GetAll();
        }

        #region Helpers
        /// <summary>
        /// Returns the error result.
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repo.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
