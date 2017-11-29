using Grievance.DAL;
using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grievance.Repository.TicketIssues
{
    public class TicketIssuesRepository : BaseDTO, ITicketIssuesRepository
    {

        #region Private member variables
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the ticketOwner Repository.
        /// </summary>
        public TicketIssuesRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion


        public async Task<TicketIssuesDTO> Add(TicketIssuesDTO ticketIssues)
        {
            await Task.Run(() =>
            {
                var newTicketIssue = new Grievance.DAL.TicketIssue()
                {
                    CreatedBy = ticketIssues.CreatedBy,
                    CreatedDate = ticketIssues.CreatedDate,
                    Description = ticketIssues.Description,
                    Name = ticketIssues.Name,
                    UpdatedBy = ticketIssues.UpdatedBy,
                    UpdatedDate = ticketIssues.UpdatedDate

                };
                _ctx.TicketIssues.Add(newTicketIssue);
                _ctx.SaveChanges();
            });
            return ticketIssues;
        }

        public async Task<List<TicketIssuesDTO>> GetAll()
        {
            var ticketIssueDTO = new List<TicketIssuesDTO>();
            await Task.Run(() =>
            {
                var ticketIssue = _ctx.TicketIssues.OrderByDescending(x => x.Name);
                if (ticketIssue.Any())
                {
                    ticketIssueDTO.AddRange(ticketIssue.Select(issue => new TicketIssuesDTO()
                    {
                        CreatedBy = issue.CreatedBy,
                        CreatedDate = issue.CreatedDate ?? default(DateTime),
                        Description = issue.Description,
                        Id = issue.Id,
                        Name = issue.Name,
                        UpdatedBy = issue.UpdatedBy,
                        UpdatedDate = issue.UpdatedDate ?? default(DateTime)
                    }));
                }

            });
            return ticketIssueDTO;
        }

        public async Task<TicketIssuesDTO> GetById(int id)
        {
            var ticketIssueDTO = new TicketIssuesDTO();
            await Task.Run(() =>
            {
                var ticketIssue = _ctx.TicketPriorities.FirstOrDefault(x => x.Id == id);
                if (ticketIssue == null) return;
                var mappedTicketPriority = new TicketIssuesDTO()
                {
                    CreatedBy = ticketIssue.CreatedBy,
                    CreatedDate = ticketIssue.CreatedDate ?? default(DateTime),
                    Description = ticketIssue.Description,
                    Id = ticketIssue.Id,
                    Name = ticketIssue.Name,
                    UpdatedBy = ticketIssue.UpdatedBy,
                    UpdatedDate = ticketIssue.UpdatedDate ?? default(DateTime)
                };
                ticketIssueDTO = mappedTicketPriority;
            });
            return ticketIssueDTO;
        }

        public async Task<TicketIssuesDTO> Update(TicketIssuesDTO ticketIssues)
        {
            await Task.Run(() =>
            {
                var existingTicketIssue = _ctx.TicketPriorities.FirstOrDefault(x => x.Id == ticketIssues.Id);
                if (existingTicketIssue != null)
                {
                    existingTicketIssue.Description = ticketIssues.Description;
                    existingTicketIssue.Name = ticketIssues.Name;
                    existingTicketIssue.UpdatedBy = ticketIssues.UpdatedBy;
                    existingTicketIssue.UpdatedDate = ticketIssues.UpdatedDate;
                    _ctx.SaveChanges();
                }
            });
            return ticketIssues;
        }
    }
}
