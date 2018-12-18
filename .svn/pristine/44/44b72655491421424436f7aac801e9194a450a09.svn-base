using SUNPN.BONUS.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SUNPN.BONUS.API.Areas.Bos.Controllers
{
    public class DepartBonusController : ApiController
    {
        #region 定义变量
        /// <summary>
        /// 奖金项业务逻辑类
        /// </summary>
        DepartBonusBLL depbosBLL = new DepartBonusBLL();
        #endregion

        #region 查询公司所有部门
        /// <summary>
        /// 查询公司所有部门
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetAllDepart(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(depbosBLL.GetAllDepart(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取部门奖金列表
        /// <summary>
        /// 获取部门奖金列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetDepartBonusList(string CompanyId, string DepId)
        {
            return new HttpResponseMessage { Content = new StringContent(depbosBLL.GetDepartBonusList(CompanyId, DepId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion
    }
}
