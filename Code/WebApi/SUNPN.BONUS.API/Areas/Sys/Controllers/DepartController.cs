using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SUNPN.BONUS.BLL;
using SUNPN.BONUS.Model;
using SUNPN.BONUS.API.Models;
using System.Web;
using System.IO;
using System.Text;

namespace SUNPN.BONUS.API.Areas.Sys.Controllers
{
  
    public class DepartController : ApiController
    {
        DepartBLL depBll = new DepartBLL();

        #region 添加部门
        [HttpPost]
        public HttpResponseMessage AddDepart([FromBody]Depart dep)
        {
            return new HttpResponseMessage { Content = new StringContent(depBll.AddDepart(dep), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 修改部门
        [HttpPost]
        public HttpResponseMessage UpdDepart([FromBody]Depart dep)
        {
            return new HttpResponseMessage { Content = new StringContent(depBll.UpdDepart(dep), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 删除部门
        [HttpGet]
        public HttpResponseMessage DelDepart(int DepartId)
        {
            return new HttpResponseMessage { Content = new StringContent(depBll.DelDepart(DepartId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 显示所有部门 
        [HttpGet]
        public HttpResponseMessage GetAllDepart(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(depBll.GetDepart(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 显示父级部门（pid=0）和其子部门数量 
        [HttpGet]
        public HttpResponseMessage GetParentDepart(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(depBll.GetParentDepart(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 显示子级部门（pid!=0）和其子部门数量 
        [HttpGet]
        public HttpResponseMessage GetSonDepart(string CompanyId, int DepartId)
        {
            return new HttpResponseMessage { Content = new StringContent(depBll.GetSonDepart(CompanyId, DepartId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion


        #region 显示当前部门信息 
        [HttpGet]
        public HttpResponseMessage GetDepartInfo(int DepartID)
        {
            return new HttpResponseMessage { Content = new StringContent(depBll.GetDepartInfo(DepartID), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

    }
}
