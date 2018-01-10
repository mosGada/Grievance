using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.DAL.DTO
{
    [DataContract(Name = "DepartmentDTO")]
    public class DepartmentDTO: BaseDTO
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "hod")]
        public string HOD { get; set; }

        [DataMember(Name = "contactPerson")]
        public string ContactPerson { get; set; }

        [DataMember(Name = "tellNumber")]
        public string TellNumber { get; set; }

        [DataMember(Name = "alternativeNumber")]
        public string AlternativeNumber { get; set; }

        [DataMember(Name = "emailAddress")]
        public string EmailAddress { get; set; }
    }
}
