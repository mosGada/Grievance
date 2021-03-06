﻿namespace Grievance.DAL
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
    public class TicketDTO: DTO.BaseDTO
    {

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "assignedTo")]
        public string AssignedTo { get; set; }

        [DataMember(Name = "assignedToName")]
        public string AssigneToName { get; set; }

        [DataMember(Name = "ticketCategoryId")]
        public int TicketCategoryId { get; set; }

        [DataMember(Name = "ticketCategoryName")]
        public string TicketCategoryName { get; set; }

        [DataMember(Name = "ticketTypeId")]
        public int TicketTypeId { get; set; }

        [DataMember(Name = "ticketTypeName")]
        public string TicketTypeName { get; set; }

        [DataMember(Name = "departmentId")]
        public int DepartmentId { get; set; }
        [DataMember(Name = "departmentName")]
        public string DepartmentName { get; set; }

        [DataMember(Name = "ticketStatusId")]
        public int TicketStatusId { get; set; }

        [DataMember(Name = "ticketStatusName")]
        public string TicketStatusName { get; set; }

        [DataMember(Name = "ticketIssueId")]
        public int TicketIssueId { get; set; }

        [DataMember(Name = "ticketIssueName")]
        public string TicketIssueName { get; set; }

        [DataMember(Name = "ticketPriorityId")]
        public int TicketPriorityId { get; set; }

        [DataMember(Name = "ticketPriorityName")]
        public string TicketPriorityName { get; set; }

        [DataMember(Name = "ticketOwnerId")]
        public int TicketOwnerId { get; set; }

        [DataMember(Name = "ticketOwnerName")]
        public string TicketOwnerName { get; set; }

        [DataMember(Name = "gender")]
        public string Gender { get; set; }

        [DataMember(Name = "idNumber")]
        public string IDNumber { get; set; }

        [DataMember(Name = "email")]
        public string EmailAddress { get; set; }

        [DataMember(Name = "phone")]
        public string PhoneNumber { get; set; }

        [DataMember(Name = "surname")]
        public string Surname { get; set; }

        [DataMember(Name = "referenceNumber")]
        public string ReferenceNumber { get; set; }

        [DataMember(Name = "userId")]
        public string UserId { get; set; }
        [DataMember(Name = "userName")]
        public string UserName { get; set; }

        [DataMember(Name = "address")]
        public string Address { get; set; }

        [DataMember(Name = "remark")]
        public string RemarkDesription { get; set; }


    }
}
