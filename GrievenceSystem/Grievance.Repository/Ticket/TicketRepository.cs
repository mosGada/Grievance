namespace GrievanceRepository
{

    #region Usings
    using GrievanceRepository.Base;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Grievance.DAL.DTO;
    using Grievance.DAL;
    using TicketRemarks;
    using Ticket;

    #endregion


    public class TicketRepository: ITicketRepository
    {
        #region Private member variable(s)
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        public TicketRepository()
        {
            _ctx = new grievancedbEntities();
        }

        //TicketRemarksRepository _dataProvider = new TicketRemarksRepository();

        #endregion


        public async Task<List<TicketOwnerDTO>>GetOwner()
        {
            var ticketOwnerDTO = new List<TicketOwnerDTO>();
            await Task.Run(() =>
            {
                var owners = _ctx.TicketOwners.ToList();
                if (owners.Any())
                {
                    ticketOwnerDTO.AddRange(owners.Select(owner => new TicketOwnerDTO()
                    {
                        Id = owner.Id,
                        CreatedDate = owner.CreatedDate,
                        Name = owner.Name,
                        EmailAddress = owner.EmailAddress,
                        Gender = owner.Gender,
                        IDNumber = owner.IDNumber,
                        PhoneNumber = owner.PhoneNumber,
                        PhysicalAddress = owner.PhysicalAddress,
                        Surname = owner.Surname,
                        TicketTypeId = owner.TicketTypeId,
                        TicketTypeName = owner.TicketType.Name                                  

                    }));
                }
            });
            return ticketOwnerDTO;
        }
        public async Task<List<TicketDTO>> GetTickets()
        {
            var ticketsDTO = new List<TicketDTO>();
            await Task.Run(() =>
            {
                var tickets = _ctx.Tickets.OrderByDescending(x => x.CreatedDate);
                if (tickets.Any())
                {
                    ticketsDTO.AddRange(tickets.Select(ticket => new TicketDTO()
                    {
                        Id = ticket.Id,
                        CreatedDate = ticket.CreatedDate,
                        Description = ticket.Description,
                        Name = ticket.Name ?? default(string),
                        AssignedTo= ticket.AssignedTo,
                        AssigneToName = ticket.AspNetUser.Name,
                        CreatedBy = ticket.CreatedBy,
                        DepartmentName = ticket.Department.Name,
                        DepartmentId = ticket.DepartmentId,
                        ReferenceNumber = ticket.ReferenceNumber,
                        TicketCategoryName = ticket.TicketCategory.Name,
                        TicketCategoryId = ticket.TicketCategoryId,
                        TicketPriorityId = ticket.TicketPriorityId,
                        TicketPriorityName = ticket.TicketPriority.Name,
                        TicketStatusId = ticket.TicketStatusId,
                        TicketStatusName = ticket.TicketStatus.Name,
                        TicketIssueId = ticket.TicketIssueId,
                        TicketIssueName = ticket.TicketIssue.Name,
                        TicketTypeId = ticket.TicketTypeId,
                        TicketTypeName = ticket.TicketType.Name ?? default(string),
                        TicketOwnerName = ticket.TicketOwner.Name ?? default(string),
                        Address = ticket.TicketOwner.PhysicalAddress ?? default(string),
                        EmailAddress = ticket.TicketOwner.EmailAddress ?? default(string),
                        Gender = ticket.TicketOwner.Gender ?? default(string),
                        IDNumber = ticket.TicketOwner.IDNumber ?? default(string),
                        PhoneNumber = ticket.TicketOwner.PhoneNumber ?? default(string),
                        Surname = ticket.TicketOwner.Surname ?? default(string)
                        //RemarkDesription = ticket.TicketRemark.Desription ?? default(string),
                                            
                     //   UserId = ticket.UserId                        
                                                
                    }));
                }
            });
            return ticketsDTO;
        }

        /// <summary>
        /// Add new Ticket
        /// </summary>
        /// <param name="ticket"></param>
        /// <returns></returns>
        public async Task<TicketDTO> Add(TicketDTO ticket)
        {
            await Task.Run((Action)(() =>
            {
                //var ticketOwnerID = _ctx.AspNetUsers.FirstOrDefault(x => x.IDNumber == idNumber).Id;
                var newTicket = new Grievance.DAL.Ticket()
                {
                    CreatedDate = DateTime.Now,
                    CreatedBy = ticket.CreatedBy,
                    DepartmentId = ticket.DepartmentId,
                    TicketTypeId = ticket.TicketTypeId,
                    ReferenceNumber = GenerateRefNumber(ticket),
                    TicketPriorityId = ticket.TicketPriorityId,
                    TicketStatusId = 1,
                    TicketOwnerId = ticket.TicketOwnerId,
                    Description = ticket.Description,
                    Name = ticket.Name,
                    UpdatedBy = ticket.UpdatedBy,
                    UpdatedDate = DateTime.Now,
                    AssignedTo = ticket.AssignedTo,// "0d64e363-89b0-4de2-8bb5-81994efc53c7",
                    TicketCategoryId = ticket.TicketCategoryId,
                    TicketIssueId = ticket.TicketIssueId


                };
                _ctx.Tickets.Add(newTicket);
                _ctx.SaveChanges();
                ticket.Id = newTicket.Id;
                ticket.ReferenceNumber = newTicket.ReferenceNumber;


            }));
            
            return ticket;
        }

        /// <summary>
        /// Update Existing ticket
        /// </summary>
        /// <param name="ticket"></param>
        /// <returns></returns>
        public async Task<TicketDTO> Update(TicketDTO ticket)
        {
            await Task.Run(() =>
            {
                var existingTicket = _ctx.Tickets.FirstOrDefault(x => x.Id == ticket.Id);
                if (existingTicket != null)
                {
                    existingTicket.Description = ticket.Description;
                    existingTicket.ReferenceNumber = ticket.ReferenceNumber;
                    existingTicket.Name = ticket.Name;
                    existingTicket.DepartmentId = ticket.DepartmentId;
                    existingTicket.TicketCategoryId = ticket.TicketCategoryId;
                    existingTicket.TicketStatusId = ticket.TicketStatusId;
                    existingTicket.TicketPriorityId = ticket.TicketPriorityId;
                    existingTicket.TicketTypeId = ticket.TicketTypeId;
                    existingTicket.TicketIssueId = ticket.TicketIssueId;
                    //existingTicket.AssignedTo = ticket.AssignedTo;
                    existingTicket.UpdatedBy = ticket.UpdatedBy;
                    existingTicket.UpdatedDate = DateTime.Now;
                    _ctx.SaveChanges();
                }
            });
            return ticket;
        }

        /// <summary>
        /// Generate Reference Number
        /// </summary>
        /// <param name="ticket"></param>
        /// <returns></returns>
        public string GenerateRefNumber(TicketDTO ticket)
        {
            string refNo = "";
            var checkAvailability = _ctx.Tickets;
            if(checkAvailability.Any())
            {
                var getLastTicketID = _ctx.Tickets.Select(x => x.Id).Max();
                int calLastID = getLastTicketID + 1;
                refNo = DateTime.Now.ToString("yyyyMMdd") + "/" + calLastID;
                
            }
            else
            {
                refNo = DateTime.Now.ToString("yyyyMMdd") + "/" + 1;
            }
            return refNo;

        }

        public string TicketOwnerNumber(TicketDTO ticket)
        {
            string refNo = "";
           // var checkTicketName = 
            var checkAvailability = _ctx.TicketOwners;
            if (checkAvailability.Any())
            {
                var getLastTicketID = _ctx.TicketOwners.Count();
                int calLastID = getLastTicketID + 1;
                refNo = ticket.TicketTypeName + "/" + calLastID;

            }
            else
            {
                refNo = DateTime.Now.ToString("yyyyMMdd") + "/" + 1;
            }
            return refNo;

        }


        public async Task<TicketRemarkDTO> AddRmark(TicketRemarkDTO ticketRemark)
        {
            await Task.Run(() =>
            {
                var newTicketRemark = new TicketRemark()
                {
                    CreatedBy = "System",
                    CreatedDate = DateTime.Now,
                    Desription = ticketRemark.Desription,
                    TicketId = ticketRemark.TicketId,
                    UpdatedBy = "System",
                    UpdatedDate = DateTime.Now,
                };
                _ctx.TicketRemarks.Add(newTicketRemark);
                _ctx.SaveChanges();

            });
            return ticketRemark;
        }
        
        public async Task<TicketOwnerDTO> AddOwner(TicketOwnerDTO ticketOwner)
        {
            await Task.Run(() =>
            {
                var newTicketOwner = new Grievance.DAL.TicketOwner()
                {
                    CreatedBy = "System",
                    CreatedDate = DateTime.Now,
                    EmailAddress = ticketOwner.EmailAddress,
                    Gender = ticketOwner.Gender,
                    IDNumber = ticketOwner.IDNumber,
                    Latitude = ticketOwner.Latitude,
                    Longitude = ticketOwner.Longitude,
                    Name = ticketOwner.Name,
                    PhoneNumber = ticketOwner.PhoneNumber,
                    PhysicalAddress = ticketOwner.PhysicalAddress,
                    Surname = ticketOwner.Surname,
                    TicketTypeId = ticketOwner.TicketTypeId,
                    UpdatedBy = "System",
                    UpdatedDate = DateTime.Now
                };
                _ctx.TicketOwners.Add(newTicketOwner);
                _ctx.SaveChanges();
                ticketOwner.Id = newTicketOwner.Id;
                ticketOwner.TicketTypeId = newTicketOwner.TicketTypeId;

            });
            return ticketOwner;
        }

    }


}
