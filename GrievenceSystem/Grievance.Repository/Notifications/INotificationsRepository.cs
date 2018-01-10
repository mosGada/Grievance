using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.Notifications
{
    public interface INotificationsRepository
    {
        Task<List<NotificationDTO>> GetAll();
        Task<NotificationDTO> Add(NotificationDTO notification);
        Task<NotificationDTO> GetById(int id);
        Task<NotificationDTO> Update(NotificationDTO notification);
    }
}
