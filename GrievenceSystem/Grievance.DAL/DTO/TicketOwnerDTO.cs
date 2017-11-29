using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.DAL.DTO
{
    public class TicketOwnerDTO:BaseDTO
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "surname")]
        public string Surname { get; set; }
        [DataMember(Name = "gender")]
        public string Gender { get; set; }
        [DataMember(Name = "idNumber")]
        public string IDNumber { get; set; }
        [DataMember(Name = "physicalAddress")]
        public string PhysicalAddress { get; set; }
        [DataMember(Name = "email")]
        public string EmailAddress { get; set; }
        [DataMember(Name = "phone")]
        public string PhoneNumber { get; set; }
        [DataMember(Name = "latitude")]
        public string Latitude { get; set; }
        [DataMember(Name = "longitude")]
        public string Longitude { get; set; }
        [DataMember(Name = "ticketTypeId")]
        public int TicketTypeId { get; set; }

        [DataMember(Name = "ticketTypeName")]
        public string TicketTypeName { get; set; }
    }
}
