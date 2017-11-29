using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grievance.DAL.DTO;
using Grievance.DAL;

namespace Grievance.Repository.TicketCategory
{
    public class TicketCategoryRepository : BaseDTO, ITicketCategoryRepository
    {
        #region Private member variables
        private grievancedbEntities _ctx;
        #endregion

        #region Public Constructor
        /// <summary>
        /// Initializes the ticket Category Repository.
        /// </summary>
        public TicketCategoryRepository()
        {
            _ctx = new grievancedbEntities();
        }
        #endregion
        public async Task<CategoryDTO> Add(CategoryDTO category)
        {
            await Task.Run(() =>
            {
                var newTicketCategory = new Grievance.DAL.TicketCategory()
                {
                    CreatedBy = category.CreatedBy,
                    CreatedDate = category.CreatedDate,
                    Description = category.Description,
                    Name = category.Name,
                    UpdatedBy = category.UpdatedBy,
                    UpdatedDate = category.UpdatedDate

                };
                _ctx.TicketCategories.Add(newTicketCategory);
                _ctx.SaveChanges();
            });
            return category;
        }

        public async Task<List<CategoryDTO>> GetAll()
        {
            var ticketCategoryDTO = new List<CategoryDTO>();
            await Task.Run(() =>
            {
                var ticketCategory = _ctx.TicketCategories.OrderByDescending(x => x.Name);
                if (ticketCategory.Any())
                {
                    ticketCategoryDTO.AddRange(ticketCategory.Select(ticket => new CategoryDTO()
                    {
                        CreatedBy = ticket.CreatedBy,
                        CreatedDate = ticket.CreatedDate ?? default(DateTime),
                        Description = ticket.Description,
                        Id = ticket.Id,
                        Name = ticket.Name,
                        UpdatedBy = ticket.UpdatedBy,
                        UpdatedDate = ticket.UpdatedDate ?? default(DateTime)
                    }));
                }

            });
            return ticketCategoryDTO;
        }

        public async Task<CategoryDTO> GetById(int id)
        {
            var ticketCategoryDTO = new CategoryDTO();
            await Task.Run(() =>
            {
                var ticketCategory = _ctx.TicketCategories.FirstOrDefault(x => x.Id == id);
                if (ticketCategory == null) return;
                var mappedTicketCategory = new CategoryDTO()
                {
                    CreatedBy = ticketCategory.CreatedBy,
                    CreatedDate = ticketCategory.CreatedDate ?? default(DateTime),
                    Description = ticketCategory.Description,
                    Id = ticketCategory.Id,
                    Name = ticketCategory.Name,
                    UpdatedBy = ticketCategory.UpdatedBy,
                    UpdatedDate = ticketCategory.UpdatedDate ?? default(DateTime)
                };
                ticketCategoryDTO = mappedTicketCategory;
            });
            return ticketCategoryDTO;
        }

        public async Task<CategoryDTO> Update(CategoryDTO category)
        {
            await Task.Run(() =>
            {
                var existingTicketCategory = _ctx.TicketCategories.FirstOrDefault(x => x.Id == category.Id);
                if (existingTicketCategory != null)
                {
                    existingTicketCategory.Description = category.Description;
                    existingTicketCategory.Name = category.Name;
                    existingTicketCategory.UpdatedBy = category.UpdatedBy;
                    existingTicketCategory.UpdatedDate = category.UpdatedDate;
                    _ctx.SaveChanges();
                }
            });
            return category;
        }
    }
}
