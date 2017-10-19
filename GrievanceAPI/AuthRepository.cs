namespace GrievanceAPI
{
    # region Usings
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;
    #endregion

    public class AuthRepository : IDisposable
    {
        private AuthContext _ctx;

        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public AuthRepository()
        {
            var role = new RoleStore<IdentityRole>(new AuthContext());
            var roleManager = new RoleManager<IdentityRole>(role);
            _ctx = new AuthContext();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_ctx));
            _roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_ctx));
        }

        /// <summary>
        /// Register user.
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            ApplicationUser user = new GrievanceAPI.ApplicationUser
            {
                PhoneNumber = userModel.phoneNumber,
                UserName = userModel.UserName,
                Name = userModel.Name,
                Surname = userModel.Surname,
                Email = userModel.Email
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        /// <summary>
        /// Add(s) user to role
        /// </summary>
        /// <param name="id"></param>
        /// <param name="roleid"></param>
        /// <returns></returns>
        public async Task<IdentityResult> AddUserToRole(string id, string roleid)
        {
            IdentityRole role = await _roleManager.FindByIdAsync(roleid);

            IdentityResult result = await _userManager.AddToRoleAsync(id, role.Name);
            return result;
        }

        /// <summary>
        /// Find(s) User my name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<IdentityUser> FindUserByName(string name)
        {
            IdentityUser user = await _userManager.FindByNameAsync(name);
            return user;
        }

        /// <summary>
        /// Update(s) User
        /// </summary>
        /// <param name="userModel"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        public async Task<IdentityResult> UpdateUser(UserModel userModel, string userid)
        {


            ApplicationUser user = await _userManager.FindByIdAsync(userid);

            user.PhoneNumber = userModel.phoneNumber;
            user.Name = userModel.Name;
            user.Surname = userModel.Surname;
            user.Email = userModel.Email;
            user.UserName = userModel.UserName;

            if (user.PasswordHash != userModel.Password)
            {
                var resultpasswordchange = await _userManager.ChangePasswordAsync(user.Id, user.PasswordHash, userModel.Password);
                if (!resultpasswordchange.Succeeded)
                {
                    user.PasswordHash = _userManager.PasswordHasher.HashPassword(userModel.Password);
                }
            }

            IdentityRole role = await _roleManager.FindByIdAsync(userModel.RoleID);

            var oldUser = _userManager.FindById(user.Id);
            var oldRoleId = oldUser.Roles.SingleOrDefault().RoleId;
            var oldRoleName = _ctx.Roles.SingleOrDefault(r => r.Id == oldRoleId).Name;

            if (oldRoleName != role.Name)
            {
                _userManager.RemoveFromRole(userid, oldRoleName);
                _userManager.AddToRole(userid, role.Name);
            }

            _ctx.Entry(user).State = System.Data.Entity.EntityState.Modified;

            var result = await _userManager.UpdateAsync(user);

            return result;
        }

        /// <summary>
        /// Gets User Roles
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<IList<string>> GetUserRoles(string id)
        {
            var roles = await _userManager.GetRolesAsync(id);
            return roles;
        }

        /// <summary>
        /// Returns a client
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        public Client FindClient(string clientId)
        {
            var client = _ctx.Clients.Find(clientId);

            return client;
        }

        /// <summary>
        /// Returns a list of role(s).
        /// </summary>
        /// <returns></returns>
        public List<IdentityRole> GetAllRoles()
        {
            var result = _roleManager.Roles.ToList();
            return result;
        }

        /// <summary>
        /// Create(s) a new role
        /// </summary>
        /// <param name="roleModel"></param>
        /// <returns></returns>
        public async Task<IdentityResult> CreateRole(RoleModel roleModel)
        {
            IdentityRole role = new IdentityRole
            {
                Name = roleModel.Name
            };

            var result = await _roleManager.CreateAsync(role);

            return result;
        }

        /// <summary>
        /// Modifies a role.
        /// </summary>
        /// <param name="roleModel"></param>
        /// <returns></returns>

        public async Task<IdentityResult> UpdateRole(RoleModel roleModel)
        {

            var result = await _roleManager.FindByIdAsync(roleModel.id);

            result.Name = roleModel.Name;

            await _roleManager.UpdateAsync(result);


            return null;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}