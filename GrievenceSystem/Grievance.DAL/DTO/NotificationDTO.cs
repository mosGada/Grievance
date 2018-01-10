using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.DAL.DTO
{
    [DataContract(Name = "NotificationDTO")]
    public class NotificationDTO:BaseDTO
    {
        [DataMember(Name = "ticketId")]
        public int TicketId { get; set; }

        [DataMember(Name = "message")]
        public string Message { get; set; }

        [DataMember(Name = "notificationTypeId")]
        public int NotificationTypeId { get; set; }
    }
}
