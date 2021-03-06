//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Grievance.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Ticket
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Ticket()
        {
            this.TicketRemarks = new HashSet<TicketRemark>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TicketOwnerId { get; set; }
        public int TicketTypeId { get; set; }
        public int DepartmentId { get; set; }
        public int TicketStatusId { get; set; }
        public int TicketPriorityId { get; set; }
        public int TicketCategoryId { get; set; }
        public string AssignedTo { get; set; }
        public string ReferenceNumber { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int TicketIssueId { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        public virtual Department Department { get; set; }
        public virtual TicketCategory TicketCategory { get; set; }
        public virtual TicketIssue TicketIssue { get; set; }
        public virtual TicketOwner TicketOwner { get; set; }
        public virtual TicketPriority TicketPriority { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TicketRemark> TicketRemarks { get; set; }
        public virtual TicketRemark TicketRemark { get; set; }
        public virtual TicketStatus TicketStatus { get; set; }
        public virtual TicketType TicketType { get; set; }
    }
}
