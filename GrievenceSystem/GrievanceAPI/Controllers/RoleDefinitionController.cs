using Grievance.API.Models;
//using Grievance.Repository;
using GrievanceAPI;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    [RoutePrefix("api/roleDefinition")]
    public class RoleDefinitionController : ApiController
    {
        #region Private member variables
        private AuthRepository _repository = null;
        #endregion

        public RoleDefinitionController()
        {
            _repository = new AuthRepository();
        }
        /// <summary>
        /// adds the role to the database returns error if not succesfull
        /// </summary>
        /// <param name="roleModel"></param>
        /// <returns></returns>
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RoleModel roleModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repository.CreateRole(roleModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }
        /// <summary>
        /// get all roles in the context/database
        /// </summary>
        /// <returns></returns>
        [Route("GetRoles")]
        public HttpResponseMessage GetAllRoles()
        {
            var roles = _repository.GetAllRoles();
            return Request.CreateResponse(HttpStatusCode.OK, roles);
            //return Ok(roles);
        }

        /// <summary>
        /// gets role
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>

        [Route("GetRolebyID")]
        public HttpResponseMessage GetAllRolesbyUser(string userid)
        {
            var role = _repository.GetUserRoles(userid);
            return Request.CreateResponse(HttpStatusCode.OK, role);
            //return Ok(roles);
        }

        public async Task<IHttpActionResult> Delete(string id)
        {
            IdentityResult result = await _repository.DeleteRole(id);

            IHttpActionResult errorResult = GetErrorResult(result);
            if (errorResult != null)
            {
                return errorResult;
            }
            return Ok();
        }
        [AcceptVerbs("PUT", "POST")]
        [HttpPost]
        [Route("updateRole")]
        public async Task<IdentityResult> Update(RoleModel RoleDefinition)
        {
            IdentityResult result = await _repository.UpdateRole(RoleDefinition);

            return result;
        }

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
    }
}
