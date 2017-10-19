namespace GrievanceAPI
{
    #region Usings
    using System.ComponentModel.DataAnnotations;
    #endregion

    /// <summary>
    /// Role View Model.
    /// </summary>
    public class RoleModel
    {
        public string id { get; set; }
        [Required]
        [StringLength(256, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        [Display(Name = "Role Name")]
        public string Name { get; set; }
        public string UserName { get; set; }
    }
}