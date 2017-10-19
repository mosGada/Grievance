namespace Grievance.DAL
{
    #region Usings
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    #endregion

    /// <summary>
    /// Returns user Data
    /// </summary>
    [DataContract(Name = "userDTO")]
    public class UserDTO
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

        [DataMember(Name = "designation")]
        public string Designation { get; set; }

        [Required]
        [DataMember(Name = "roleId")]
        public string RoleId { get; set; }

        [DataMember(Name = "roleName")]
        public string RoleName { get; set; }

        [DataMember(Name = "password")]
        public string Password { get; set; }

        [DataMember(Name = "confirmPassword")]
        public string ConfirmPassword { get; set; }

    }
}
