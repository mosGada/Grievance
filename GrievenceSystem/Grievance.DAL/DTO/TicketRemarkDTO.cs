using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.DAL.DTO
{
    [DataContract(Name = "ticketRemarkDTO")]
    public class TicketRemarkDTO:BaseDTO
    {
        [DataMember(Name = "ticketId")]
        public int TicketId { get; set; }

        [DataMember(Name = "description")]
        public string Desription { get; set; }

        [DataMember(Name = "ticketOwnerName")]
        public string TicketOwnerName { get; set; }

        [DataMember(Name = "imangeName")]
        public string ImageName { get; set; }

        [DataMember(Name = "voiceRecordName")]
        public string VoiceRecordName { get; set; }
    }
}
