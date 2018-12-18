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
    public class BonusParamController : ApiController
    {
        BonusParamBLL parBll = new BonusParamBLL();

        #region 添加奖金参数
        [HttpPost]
        public HttpResponseMessage AddBonusParam([FromBody]BonusParam bounsPar)
        {
       
            return new HttpResponseMessage { Content = new StringContent(parBll.AddBonusParam(bounsPar), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 修改奖金参数
        [HttpPost]
        public HttpResponseMessage UpdBonusParam([FromBody]BonusParam bounsPar)
        {
            return new HttpResponseMessage { Content = new StringContent(parBll.UpdBonusParam(bounsPar), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 删除奖金参数
        [HttpGet]
        public HttpResponseMessage DelBonusParam(int bounsParId)
        {
            return new HttpResponseMessage { Content = new StringContent(parBll.DelBonusParam(bounsParId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 显示奖金参数信息
        [HttpGet]
        public HttpResponseMessage GetBonusParam(int bounsParId)
        {
            return new HttpResponseMessage { Content = new StringContent(parBll.GetBonusParam(bounsParId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion


        #region 显示所有奖金参数
        [HttpGet]
        public HttpResponseMessage GetAllBonusParam(string CompanyID)
        {
            return new HttpResponseMessage { Content = new StringContent(parBll.GetAllBonusParam(CompanyID), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion
    }
}
