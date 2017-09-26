namespace GrievanceRepository
{
    
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Grievance.DAL;

    #endregion


    public class TicketRepository
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
        //public async Task<List<Ticket>>GetTickets()
        //{
        //    List<Ticket> tickets = new List<Ticket>();
        //    await Task.Run(() =>
        //    {
        //        tickets.Add(new Ticket()
        //        {
        //            Id = 1,
        //            CreatedDate = DateTime.Now,
        //            Description = "This is a sample ticket description",
        //            Name = "Cracked Wall",
        //            LastModifiedDate = DateTime.Now,
        //            Organization = "Xplore",
        //            Priority = "Low",
        //            TimeSpent = 10,
        //            Remarks = ""
        //        });

        //        tickets.Add(new Ticket()
        //        {
        //            Id = 1,
        //            CreatedDate = DateTime.Now,
        //            Description = "Community members have been finding sediment in the water",
        //            Name = "Dirty water",
        //            LastModifiedDate = DateTime.Now,
        //            Organization = "Xplore",
        //            Priority = "Medium",
        //            TimeSpent = 20,
        //            Remarks = ""
        //        });

        //    });
        //    return tickets;
        //}

        public async Task<List<TicketDTO>> GetTickets()
        {
            var ticketsDTO = new List<TicketDTO>();
            await Task.Run(() =>
            {
                var tickets = _ctx.Tickets.ToList();
                if (tickets.Any())
                {
                    ticketsDTO.AddRange(tickets.Select(ticket => new TicketDTO()
                    {
                        Id = ticket.Id,
                        CreatedDate = ticket.CreatedDate,
                        Description = ticket.Description,
                        LastModifiedDate = ticket.LastModifiedDate,
                        Name = ticket.Name,
                        Organization = ticket.Organization,
                        Remarks = ticket.Remarks
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
            await Task.Run(() =>
            {
                var newTicket = new Ticket()
                {
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now,
                    Description = ticket.Description,
                    Name = ticket.Name,
                    Organization = ticket.Organization,
                    Remarks = ticket.Remarks
                };
                _ctx.Tickets.Add(newTicket);
                _ctx.SaveChanges();
                ticket.Id = newTicket.Id;
            });
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
                    existingTicket.Remarks = ticket.Remarks;
                    existingTicket.Name = ticket.Name;
                    existingTicket.Organization = ticket.Organization;
                    existingTicket.LastModifiedDate = DateTime.Now;
                    _ctx.SaveChanges();
                }
            });
            return ticket;
        }
    }

    //helper objects
    /// <summary>
    /// Sample Ticket Object
    /// </summary>
    //public class Ticket
    //{
    //    /// <summary>
    //    /// Sample Ticket Id property
    //    /// </summary>
    //    public int Id { get; set; }

    //    /// <summary>
    //    /// Sample Ticket Name property
    //    /// </summary>
    //    public string Name { get; set; }

    //    /// <summary>
    //    /// Sample Ticket Description property
    //    /// </summary>
    //    public string Description { get; set; }

    //    /// <summary>
    //    /// Sample Ticket Organization Property
    //    /// </summary>
    //    public string Organization{ get; set; }

    //    /// <summary>
    //    /// Sample Ticket TimeSpent Property
    //    /// </summary>
    //    public int TimeSpent { get; set; }

    //    /// <summary>
    //    /// Sample Ticket Priority Property
    //    /// </summary>
    //    public string Priority { get; set; }

    //    /// <summary>
    //    /// Sample Ticket CreatedDate Property
    //    /// </summary>
    //    public DateTime CreatedDate { get; set; }

    //    /// <summary>
    //    /// Sample Ticket LastModifiedDate Property
    //    /// </summary>
    //    public  DateTime LastModifiedDate { get; set; }

    //    /// <summary>
    //    /// Sample Ticket Remarks Property
    //    /// </summary>
    //    public string Remarks { get; set; }
    //}
}
