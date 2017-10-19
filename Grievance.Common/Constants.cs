namespace Grievance.Common
{
    #region Using(s)
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    #endregion
    public class Constants
    {
        /// <summary>
        /// Ticket status constant(s)
        /// </summary>
        public class Statuses
        {
            public const string New = "New";
            public const string Resolved = "Resolved";
            public const string Escalated = "Escalated";
            public const string Assigned = "Assigned";
            public const string Pending = "Pending Resolution";
        }

        /// <summary>
        /// Ticket type constant(s)
        /// </summary>
        public class TicketTypes
        {
            public const string Complaint = "Complaint";
            public const string Anonymous = "Anonymous";
        }
    }
}
