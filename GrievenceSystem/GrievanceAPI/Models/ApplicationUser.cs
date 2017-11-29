namespace GrievanceAPI
{
    #region Usings
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    #endregion
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IDNumber { get; set; }
        public string PhysicalAddress { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        //public decimal Latitude { get; set; }
        //public decimal Longitude { get; set; }
    }
}