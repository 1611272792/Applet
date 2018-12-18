using SUNPN.BONUS.BLL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SUNPN.BONUS.API.Areas.Bos.Controllers
{
    public class BonusItemController : ApiController
    {
        #region 定义变量
        /// <summary>
        /// 奖金项业务逻辑类
        /// </summary>
        BonusItemBLL bosItemBLL = new BonusItemBLL();
        #endregion

        #region 添加奖金项
        /// <summary>
        /// 添加奖金项
        /// </summary>
        /// <param name="bi"></param>
        /// <returns></returns>
        public HttpResponseMessage AddBonusItem([FromBody]BonusItem bi)
        {
            return new HttpResponseMessage { Content = new StringContent(bosItemBLL.AddBonusItem(bi), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 删除奖金项
        /// <summary>
        /// 根据奖金项Id删除奖金项
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage DelBonusItem(string BonusItemId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosItemBLL.DelBonusItem(BonusItemId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 修改奖金项
        /// <summary>
        /// 修改奖金项
        /// </summary>
        /// <param name="bi">奖金项实体类</param>
        /// <returns></returns>
        public HttpResponseMessage UpdBonusItem([FromBody]BonusItem bi)
        {
            return new HttpResponseMessage { Content = new StringContent(bosItemBLL.UpdBonusItem(bi), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 查询奖金项详情
        /// <summary>
        /// 根据奖金项Id查询奖金项信息
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetBonusItem(string BonusItemId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosItemBLL.GetBonusItem(BonusItemId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 查询奖金项列表
        /// <summary>
        /// 查询奖金项列表
        /// </summary>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetBonusItemList(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosItemBLL.GetBonusItemList(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion
    }
}
