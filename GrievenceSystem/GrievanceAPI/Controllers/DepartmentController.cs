using Grievance.DAL.DTO;
using GrievanceRepository;
using GrievanceRepository.Departments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Grievance.API.Controllers
{
    [RoutePrefix("api/department")]
    public class DepartmentController : ApiController
    {

        #region Private Member Variable(s)
        DepartmentRepository _dataProvider = new DepartmentRepository();
        #endregion

        [HttpGet]
        [Route("GetAll")]
        public async Task<HttpResponseMessage> GetAll()
        {
            var response = await _dataProvider.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<DepartmentDTO> Add(DepartmentDTO department)
        {
            var newDepartment = await _dataProvider.Add(department);
            return newDepartment;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<DepartmentDTO> Update(DepartmentDTO department)
        {
            var newDepartment = await _dataProvider.Update(department);
            return newDepartment;
        }
    }
}
