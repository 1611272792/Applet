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
    public class ReasonController : ApiController
    {
        #region 定义变量
        /// <summary>
        /// 奖金项业务逻辑类
        /// </summary>
        ReasonBLL reasonBLL = new ReasonBLL();
        #endregion

        #region 根据ReasonId查询原因
        /// <summary>
        /// 根据ReasonId查询原因
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetReason(string ReasonId)
        {
            return new HttpResponseMessage { Content = new StringContent(reasonBLL.GetReason(ReasonId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion
    }
}
