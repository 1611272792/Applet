using SUNPN.BONUS.BLL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SUNPN.BONUS.API.Areas.Bos.Controllers
{
    public class BonusRuleController : ApiController
    {
        #region 定义变量
        /// <summary>
        /// 奖金规则业务逻辑类
        /// </summary>
        BonusRuleBLL bosRuleBLL = new BonusRuleBLL();
        #endregion

        #region 添加奖金规则
        /// <summary>
        /// 添加规则
        /// </summary>
        /// <param name="BonusRule"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddBonusRule([FromBody] BonusRule bosrule)
        {
            return new HttpResponseMessage { Content = new StringContent(bosRuleBLL.AddBonusRule(bosrule), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 删除奖金规则
        /// <summary>
        /// 通过奖金规则Id删除奖金规则
        /// </summary>
        /// <param name="BRId">规则Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage DelBonusRule(string BRId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosRuleBLL.DelBonusRule(BRId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 更新奖金规则
        /// <summary>
        /// 更新奖金规则
        /// </summary>
        /// <param name="BonusRule"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage UpdBonusRule([FromBody] BonusRule bosrule)
        {
            return new HttpResponseMessage { Content = new StringContent(bosRuleBLL.UpdBonusRule(bosrule), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 查询奖金规则
        /// <summary>
        /// 查询奖金规则
        /// </summary>
        /// <param name="BRId">奖金规则Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetBonusRule(string BRId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosRuleBLL.GetBonusRule(BRId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 添加固定金额
        /// <summary>
        /// 添加固定金额
        /// </summary>
        /// <param name="BonusItemData"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddGDMoney([FromBody] BonusItemData bid)
        {
            return new HttpResponseMessage { Content = new StringContent(bosRuleBLL.AddGDMoney(bid), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion
    }
}
