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

namespace SUNPN.BONUS.API.Areas.Bos.Controllers
{
    
    // 提现审核
    public class AuditBonusController : ApiController
    {
        AuditBonusBLL bll = new AuditBonusBLL();
        #region 获取申请提现记录
        [HttpGet]
        public HttpResponseMessage GetAuditBonus(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetAuditBonus(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取审核的历史记录
        [HttpGet]
        public HttpResponseMessage GetAuditHistory(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetAuditHistory(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion


        #region 获取该条审核记录的详情
        [HttpGet]
        public HttpResponseMessage GetAuditDetail(string GetBonusID)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetAuditDetail(GetBonusID), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 批准
        [HttpGet]
        public HttpResponseMessage UpdRatify(string SomeAuditBonusID,string OpenID)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.UpdRatify(SomeAuditBonusID,OpenID), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion



        #region 驳回
        [HttpGet]
        public HttpResponseMessage UpdReject(string SomeAuditBonusID, string OpenID)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.UpdReject(SomeAuditBonusID, OpenID), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion
    }
}
