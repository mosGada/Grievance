namespace GrievanceRepository
{

    #region Usings
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
        #endregion

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
                        CreatedDate = ticket.CreatedDate ?? default(DateTime),
                        Description = ticket.Description,
                        Name = ticket.Name ?? default(string),
                        AssignedTo= ticket.AssignedTo,
                        AssigneToName = ticket.AspNetUser.Name,
                        CreatedBy = ticket.CreatedBy,
                        DepartmentName = ticket.Department.Name,
                        DepartmentId = ticket.DepartmentId ?? default(int),
                        ReferenceNumber = ticket.ReferenceNumber,
                        TicketCategoryName = ticket.TicketCategory.Name,
                        TicketCategoryId = ticket.TicketCategoryId ?? default(int),
                        TicketPriorityId = ticket.TicketPriorityId ?? default(int),
                        TicketPriorityName = ticket.TicketPriority.Name,
                        TicketStatusId = ticket.TicketStatusId ?? default(int),
                        TicketStatusName = ticket.TicketStatus.Name,
                        TicketIssueId = ticket.TicketIssueId ?? default(int),
                        TicketIssueName = ticket.TicketIssue.Name,
                        TicketTypeId = ticket.TicketTypeId ?? default(int),
                        TicketTypeName = ticket.TicketType.Name ?? default(string),
                        TicketOwnerId = ticket.TicketOwnerId ?? default(string)                 

                    }));
                }
            });
            return ticketsDTO;
        }

        /// <summary>
        /// Get tickets by user role
        /// </summary>
        /// <param name="userRole"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public async Task<List<TicketDTO>> GetTicketsByUserRole(string userRole, string userId = null)
        {
            var ticketsDTO = new List<TicketDTO>();            
            switch (userRole)
            {
                case "Administrator":
                    await Task.Run(() =>
                    {
                        var tickets = _ctx.Tickets.OrderByDescending(x => x.CreatedDate);
                        if (tickets.Any())
                        {
                            ticketsDTO.AddRange(tickets.Select(ticket => new TicketDTO()
                            {
                                Id = ticket.Id,
                                CreatedDate = ticket.CreatedDate ?? default(DateTime),
                                Description = ticket.Description,
                                Name = ticket.Name ?? default(string),
                                AssignedTo = ticket.AssignedTo,
                                AssigneToName = ticket.AspNetUser.Name,
                                CreatedBy = ticket.CreatedBy,
                                DepartmentName = ticket.Department.Name,
                                DepartmentId = ticket.DepartmentId ?? default(int),
                                ReferenceNumber = ticket.ReferenceNumber,
                                TicketCategoryName = ticket.TicketCategory.Name,
                                TicketCategoryId = ticket.TicketCategoryId ?? default(int),
                                TicketPriorityId = ticket.TicketPriorityId ?? default(int),
                                TicketPriorityName = ticket.TicketPriority.Name,
                                TicketStatusId = ticket.TicketStatusId ?? default(int),
                                TicketStatusName = ticket.TicketStatus.Name,
                                TicketIssueId = ticket.TicketIssueId ?? default(int),
                                TicketIssueName = ticket.TicketIssue.Name,
                                TicketTypeId = ticket.TicketTypeId ?? default(int),
                                TicketTypeName = ticket.TicketType.Name ?? default(string),
                                TicketOwnerId = ticket.TicketOwnerId ?? default(string)
                            }));
                        }
                    });
                    break;
                case "TicketOwner":
                    await Task.Run(() =>
                    {
                        var tickets = _ctx.Tickets.OrderByDescending(x => x.CreatedDate).Where(x => x.TicketOwnerId.Equals(userId));
                        if (tickets.Any())
                        {
                            ticketsDTO.AddRange(tickets.Select(ticket => new TicketDTO()
                            {
                                Id = ticket.Id,
                                CreatedDate = ticket.CreatedDate ?? default(DateTime),
                                Description = ticket.Description,
                                Name = ticket.Name ?? default(string),
                                AssignedTo = ticket.AssignedTo,
                                AssigneToName = ticket.AspNetUser.Name,
                                CreatedBy = ticket.CreatedBy,
                                DepartmentName = ticket.Department.Name,
                                DepartmentId = ticket.DepartmentId ?? default(int),
                                ReferenceNumber = ticket.ReferenceNumber,
                                TicketCategoryName = ticket.TicketCategory.Name,
                                TicketCategoryId = ticket.TicketCategoryId ?? default(int),
                                TicketPriorityId = ticket.TicketPriorityId ?? default(int),
                                TicketPriorityName = ticket.TicketPriority.Name,
                                TicketStatusId = ticket.TicketStatusId ?? default(int),
                                TicketStatusName = ticket.TicketStatus.Name,
                                TicketIssueId = ticket.TicketIssueId ?? default(int),
                                TicketIssueName = ticket.TicketIssue.Name,
                                TicketTypeId = ticket.TicketTypeId ?? default(int),
                                TicketTypeName = ticket.TicketType.Name ?? default(string),
                                TicketOwnerId = ticket.TicketOwnerId ?? default(string)
                            }));
                        }
                    });
                    break;
                case "FieldWorker":
                    await Task.Run(() =>
                    {
                        var tickets = _ctx.Tickets.OrderByDescending(x => x.CreatedDate).Where(x => x.AssignedTo.Equals(userId));
                        if (tickets.Any())
                        {
                            ticketsDTO.AddRange(tickets.Select(ticket => new TicketDTO()
                            {
                                Id = ticket.Id,
                                CreatedDate = ticket.CreatedDate ?? default(DateTime),
                                Description = ticket.Description,
                                Name = ticket.Name ?? default(string),
                                AssignedTo = ticket.AssignedTo,
                                AssigneToName = ticket.AspNetUser.Name,
                                CreatedBy = ticket.CreatedBy,
                                DepartmentName = ticket.Department.Name,
                                DepartmentId = ticket.DepartmentId ?? default(int),
                                ReferenceNumber = ticket.ReferenceNumber,
                                TicketCategoryName = ticket.TicketCategory.Name,
                                TicketCategoryId = ticket.TicketCategoryId ?? default(int),
                                TicketPriorityId = ticket.TicketPriorityId ?? default(int),
                                TicketPriorityName = ticket.TicketPriority.Name,
                                TicketStatusId = ticket.TicketStatusId ?? default(int),
                                TicketStatusName = ticket.TicketStatus.Name,
                                TicketIssueId = ticket.TicketIssueId ?? default(int),
                                TicketIssueName = ticket.TicketIssue.Name,
                                TicketTypeId = ticket.TicketTypeId ?? default(int),
                                TicketTypeName = ticket.TicketType.Name ?? default(string),
                                TicketOwnerId = ticket.TicketOwnerId ?? default(string)
                            }));
                        }
                    });
                    break;
                case "Backend":
                    await Task.Run(() =>
                    {
                        var tickets = _ctx.Tickets.OrderByDescending(x => x.CreatedDate);
                        if (tickets.Any())
                        {
                            ticketsDTO.AddRange(tickets.Select(ticket => new TicketDTO()
                            {
                                Id = ticket.Id,
                                CreatedDate = ticket.CreatedDate ?? default(DateTime),
                                Description = ticket.Description,
                                Name = ticket.Name ?? default(string),
                                AssignedTo = ticket.AssignedTo,
                                AssigneToName = ticket.AspNetUser.Name,
                                CreatedBy = ticket.CreatedBy,
                                DepartmentName = ticket.Department.Name,
                                DepartmentId = ticket.DepartmentId ?? default(int),
                                ReferenceNumber = ticket.ReferenceNumber,
                                TicketCategoryName = ticket.TicketCategory.Name,
                                TicketCategoryId = ticket.TicketCategoryId ?? default(int),
                                TicketPriorityId = ticket.TicketPriorityId ?? default(int),
                                TicketPriorityName = ticket.TicketPriority.Name,
                                TicketStatusId = ticket.TicketStatusId ?? default(int),
                                TicketStatusName = ticket.TicketStatus.Name,
                                TicketIssueId = ticket.TicketIssueId ?? default(int),
                                TicketIssueName = ticket.TicketIssue.Name,
                                TicketTypeId = ticket.TicketTypeId ?? default(int),
                                TicketTypeName = ticket.TicketType.Name ?? default(string),
                                TicketOwnerId = ticket.TicketOwnerId ?? default(string)
                            }));
                        }
                    });
                    break;
                default: //anonymous
                    break;
            }            
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
                var newTicket = new Grievance.DAL.Ticket()
                {
                    CreatedDate = ticket.CreatedDate,
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
                    UpdatedDate = ticket.UpdatedDate,
                    AssignedTo = ticket.AssignedTo,
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
                    existingTicket.AssignedTo = ticket.AssignedTo;
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
    }
}
