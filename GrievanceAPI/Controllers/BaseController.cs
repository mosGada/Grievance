namespace GrievanceAPI.Controllers
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    #region Usings
    using System;
    using System.Linq;
    using System.Web.Http;
    #endregion

    //[HostAuthentication("bearer")]
    /// <summary>
    /// Base Api Controller
    /// </summary>
    public class BaseController : ApiController
    {
        #region Private Member Variable(s)
        private AuthContext _ctx;
        private UserManager<ApplicationUser> _userManager;
        #endregion

        public static string currentUser { get; set; }
        public static string currentUserId { get; set; }
        public static DateTime currentDateTime { get; set; }
        public static DateTime currentDateMonth { get; set; }
        public static DateTime currentDateDay { get; set; }
        public static string currentUserEmail { get; set; }
        
        
        
        public BaseController()
        {
            //var user = _userManager.FindByName(User.Identity.Name);
            _ctx = new AuthContext();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_ctx));

           // var user = _userManager.FindByEmail(User.Identity.Name);
            var user = _userManager.FindByName(User.Identity.Name);

            currentUser = user.Name;
            currentUserEmail = user.Email;
            currentUserId = user.Id;
            TimeZone localZone = TimeZone.CurrentTimeZone;
            currentDateTime = localZone.ToLocalTime(DateTime.UtcNow);
            currentDateMonth = new DateTime(currentDateTime.Year, currentDateTime.Month, 1);
            currentDateDay = new DateTime(currentDateTime.Year, currentDateTime.Month, currentDateTime.Day);
        }
    }
}
