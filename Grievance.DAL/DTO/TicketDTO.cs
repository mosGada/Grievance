namespace Grievance.DAL
{
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;
    #endregion
    [DataContract(Name = "TicketDTO")]
    public class TicketDTO
    {
        /// <summary>
        /// Sample Ticket Id property
        /// </summary>
        [DataMember(Name = "Id")]
        public int Id { get; set; }

        /// <summary>
        /// Sample Ticket Name property
        /// </summary>
        [DataMember(Name = "Name")]
        public string Name { get; set; }

        /// <summary>
        /// Sample Ticket Description property
        /// </summary>
        [DataMember(Name = "Description")]
        public string Description { get; set; }

        /// <summary>
        /// Sample Ticket Organization Property
        /// </summary>
        [DataMember(Name = "Organization")]
        public string Organization { get; set; }

        /// <summary>
        /// Sample Ticket CreatedDate Property
        /// </summary>
        [DataMember(Name = "CreatedDate")]
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Sample Ticket LastModifiedDate Property
        /// </summary>
        public DateTime LastModifiedDate { get; set; }

        /// <summary>
        /// Sample Ticket Remarks Property
        /// </summary>
        [DataMember(Name = "Remarks")]
        public string Remarks { get; set; }

        /// <summary>
        /// Ticket owner
        /// </summary>
        [DataMember(Name = "CreatedBy")]
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ticket Owner/User id.
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// Ticket Reference Number
        /// </summary>
        [DataMember(Name = "ReferenceNumber")]
        public string ReferenceNumber { get; set; }

        /// <summary>
        /// Ticket status
        /// </summary>
        [DataMember(Name = "Status")]
        public string TicketStatus { get; set; }

        /// <summary>
        /// Ticket Type
        /// </summary>
        [DataMember(Name = "Type")]
        public string TicketType { get; set; }

    }
}
