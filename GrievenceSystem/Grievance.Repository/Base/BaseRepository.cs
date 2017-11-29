using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrievanceRepository.Base
{
    public class BaseRepository:IBaseRepository
    {
        public DateTime CurrentDateTime()
        {
            return DateTime.Now;
        }
    }
}
