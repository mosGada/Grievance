namespace GrievanceRepository
{
    using Grievance.DAL;
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Grievance.Common;
    #endregion

    public class BaseRepository
    {
        #region Private member variable(s)
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        public BaseRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion

        //New
        //Resolved
        //Escalated
        //Assigned
        //Pending Resolution

        #region TicketTypes
        /// <summary>
        /// Returns the Complaint ticket type id.
        /// </summary>
        /// <returns></returns>
        public int GetComplaintTicketTypeId()
        {
            var ticketType = _ctx.TicketTypes.FirstOrDefault(i => i.Name.ToLower() == Constants.TicketTypes.Complaint.ToLower());
            return ticketType?.Id ?? 0;
        }

        /// <summary>
        /// Returns the Anonymous ticket type id.
        /// </summary>
        /// <returns></returns>
        public int GetAnonymousTicketTypeId()
        {
            var ticketType = _ctx.TicketTypes.FirstOrDefault(i => i.Name.ToLower() == Constants.TicketTypes.Anonymous.ToLower());
            return ticketType?.Id ?? 0;
        }

        /// <summary>
        /// Returns a ticket type object
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public TicketType GetTicketType(int id)
        {
            var ticketType = _ctx.TicketTypes.FirstOrDefault(i => i.Id == id);
            return ticketType;
        }
        #endregion

        #region TicketStatuses
        /// <summary>
        /// Returns the New ticket status id.
        /// </summary>
        /// <returns></returns>
        public int GetNewTicketStatusId()
        {
            var newTicketStatus = _ctx.TicketStatuses.FirstOrDefault(i => i.Name.ToLower() == Constants.Statuses.New.ToLower());
            return newTicketStatus?.Id ?? 0;
        }        

        /// <summary>
        /// Returns the Resolved ticket status id.
        /// </summary>
        /// <returns></returns>
        public int GetResolvedTicketStatusId()
        {
            var resolvedTicketStatus = _ctx.TicketStatuses.FirstOrDefault(i => i.Name.ToLower() == Constants.Statuses.Resolved.ToLower());
            return resolvedTicketStatus?.Id ?? 0;
        }

        /// <summary>
        /// Returns the Escalated ticket status id.
        /// </summary>
        /// <returns></returns>
        public int GetEscalatedTicketStatusId()
        {
            var escalatedTicketStatus = _ctx.TicketStatuses.FirstOrDefault(i => i.Name.ToLower() == Constants.Statuses.Escalated.ToLower());
            return escalatedTicketStatus?.Id ?? 0;
        }

        /// <summary>
        /// Returns the Assigned ticket status id.
        /// </summary>
        /// <returns></returns>
        public int GetAssignedTicketStatusId()
        {
            var assignedTicketStatus = _ctx.TicketStatuses.FirstOrDefault(i => i.Name.ToLower() == Constants.Statuses.Assigned.ToLower());
            return assignedTicketStatus?.Id ?? 0;
        }

        /// <summary>
        /// Returns the Pending Resolution status id.
        /// </summary>
        /// <returns></returns>
        public int GetPendingTicketStatusId()
        {
            var pendingTicketStatus = _ctx.TicketStatuses.FirstOrDefault(i => i.Name.ToLower() == Constants.Statuses.Pending.ToLower());
            return pendingTicketStatus?.Id ?? 0;
        }

        /// <summary>
        /// Returns a ticket status object
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public TicketStatus GetTicketStatus(int id)
        {
            var ticketStatus = _ctx.TicketStatuses.FirstOrDefault(i => i.Id == id);
            return ticketStatus;
        }        
        #endregion
    }
}
