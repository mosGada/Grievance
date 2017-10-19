namespace GrievanceAPI.Controllers
{
    #region Usings
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Microsoft.Owin.Security;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Net;
    using Grievance.DAL;
    using GrievanceRepository;
    using System.Collections.Generic;
    #endregion

    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private AuthRepository _repo = null;
        private UserRepository _userProvider = null;

        //UserRepository _userProvider = new UserRepository();

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication;  }
        }

        public AccountController()
        {
            _repo = new AuthRepository();
            _userProvider = new UserRepository();
        }

        /// <summary>
        /// Create a new user.
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Route("user/register")]
        public async Task<IHttpActionResult> Register(UserModel userModel)
        {


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
                IdentityResult roleresult = await _repo.AddUserToRole(user.Id, userModel.Role);
                var userid = user.Id;

                return Ok(userid);
            }

            return Ok("Success");
        }

        /// <summary>
        /// Update a user.
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        [AcceptVerbs("PUT", "POST")]
        [Route("user/update")]
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
        [Route("user/getAll")]
        public async Task<List<UserDTO>> GetAll()
        {
            return await _userProvider.GetAll();
        }

        /// <summary>
        /// Update a role.
        /// </summary>
        /// <param name="RoleDefinition"></param>
        /// <returns></returns>
        [AcceptVerbs("PUT", "POST")]
        [HttpPost]
        [Route("role/update")]
        public async Task<IdentityResult> Update(RoleModel RoleDefinition)
        {
            IdentityResult result = await _repo.UpdateRole(RoleDefinition);

            return result;
        }

        /// <summary>
        /// Returns all role(s).
        /// </summary>
        /// <returns></returns>
        [Route("role/getAll")]
        public HttpResponseMessage GetAllRoles()
        {
            var roles = _repo.GetAllRoles();
            return Request.CreateResponse(HttpStatusCode.OK, roles);
            //return Ok(roles);
        }

        /// <summary>
        /// Creates/registers a new role.
        /// </summary>
        /// <param name="roleModel"></param>
        /// <returns></returns>
        [Route("role/register")]
        public async Task<IHttpActionResult> Register(RoleModel roleModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.CreateRole(roleModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        /// <summary>
        /// Returns role(s) by user Id
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>

        [Route("role/getByUserId")]
        public HttpResponseMessage GetAllRolesbyUser(string userid)
        {
            var role = _repo.GetUserRoles(userid);
            return Request.CreateResponse(HttpStatusCode.OK, role);
            //return Ok(roles);
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
