using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.DAL.DTO
{
    [DataContract(Name = "baseDTO")]
    public class BaseDTO
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "createdBy")]
        public string CreatedBy { get; set; }

        [DataMember(Name = "createdDate")]
        public DateTime CreatedDate { get; set; }

        [DataMember(Name = "updatedBy")]
        public string UpdatedBy { get; set; }

        [DataMember(Name = "updatedDate")]
        public DateTime UpdatedDate { get; set; }
    }
}
