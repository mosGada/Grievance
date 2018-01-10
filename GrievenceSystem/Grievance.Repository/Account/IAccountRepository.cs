using Grievance.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.Account
{
    public interface IAccountRepository
    {
        Task<List<AccountDTO>> GetAll();

        //Task<AccountDTO> Add(AccountDTO account);

        //Task<AccountDTO> GetById(int id);

        //Task<AccountDTO> Update(AccountDTO account);
    }
}
