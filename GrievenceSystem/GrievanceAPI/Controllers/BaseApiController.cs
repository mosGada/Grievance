using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    public class BaseApiController : ApiController
    {
        public static string currentUser { get; set; }
        public static DateTime currentDateTime { get; set; }
        public static DateTime currentDateMonth { get; set; }
        public static DateTime currentDateDay { get; set; }

        public BaseApiController()
        {
            TimeZone localZone = TimeZone.CurrentTimeZone;
            currentDateTime = localZone.ToLocalTime(DateTime.UtcNow);
            currentUser = "System";
            currentDateMonth = new DateTime(currentDateTime.Year, currentDateTime.Month, 1);
            currentDateDay = new DateTime(currentDateTime.Year, currentDateTime.Month, currentDateTime.Day);
        }
    }
}
