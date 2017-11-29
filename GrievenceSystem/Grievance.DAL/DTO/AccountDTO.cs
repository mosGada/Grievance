using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.DAL.DTO
{
    [DataContract(Name = "userDTO")]
    public class AccountDTO: BaseDTO
    {
        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "email")]
        public string Email { get; set; }

        [DataMember(Name = "userName")]
        public string UserName { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "surname")]
        public string Surname { get; set; }

        [DataMember(Name = "phoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [DataMember(Name = "roleId")]
        public string RoleId { get; set; }

        [DataMember(Name = "roleName")]
        public string RoleName { get; set; }

        [DataMember(Name = "password")]
        public string Password { get; set; }

        [DataMember(Name = "confirmPassword")]
        public string ConfirmPassword { get; set; }

        [DataMember(Name = "idNumber")]
        public string IDNumber { get; set; }


        //[DataMember(Name = "physicalAddress")]
        //public string PhysicalAddress { get; set; }

        //[DataMember(Name = "latitude")]
        //public decimal Latitude { get; set; }

        //[DataMember(Name = "longitude")]
        //public decimal Longitude { get; set; }

    }
}
