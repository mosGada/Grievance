namespace GrievanceAPI
{
    #region Usings
    using Microsoft.AspNet.Identity.EntityFramework;
    #endregion
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IDNumber { get; set; }
        public string PhysicalAddress { get; set; }
        //public string Gender { get; set; }
    }
}