using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GrievanceAPI
{
    public class UserModel
    {

        [Display(Name = "User Id")]
        public string UserID { get; set; }
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string Surname { get; set; }

        [Required]
        [Display(Name = "Phone Number")]
        public string phoneNumber { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "User Role")]
        public string Role { get; set; }
        public string RoleID { get; set; }

        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [Display(Name= "Identity Number")]
        public string IDNumber { get; set; }

        [Required]
        [Display(Name = "Physical Address")]
        public string PhysicalAddress { get; set; }

        //[Required]
        //[Display(Name = "Physical Address")]
        //public string Gender { get; set; }
    }
}