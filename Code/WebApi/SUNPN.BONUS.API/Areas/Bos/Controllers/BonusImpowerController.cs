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
    public class BonusImpowerController : ApiController
    {
        #region 定义变量
        /// <summary>
        /// 奖金项业务逻辑类
        /// </summary>
        BonusImpowerBLL bosImpowerBLL = new BonusImpowerBLL();
        #endregion

        #region 获取可授权奖金项列表
        /// <summary>
        /// 获取可授权奖金项列表
        /// </summary>
        /// <param name="OpenId">奖金项负责人Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetCanImpowerList(string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosImpowerBLL.GetCanImpowerList(OpenId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 添加奖金授权
        /// <summary>
        /// 添加奖金授权
        /// </summary>
        /// <param name="bi"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddBonusImpower([FromBody]BonusImpower bi)
        {
            return new HttpResponseMessage { Content = new StringContent(bosImpowerBLL.AddBonusImpower(bi), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 奖金授权记录
        /// <summary>
        /// 奖金授权记录
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetBonusRecord(string BonusItemId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosImpowerBLL.GetBonusRecord(BonusItemId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 奖金授权详情
        /// <summary>
        /// 奖金授权详情
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <param name="BImpowerUser">被授权人Id</param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetBonusImpowerList(string BonusItemId,string BImpowerUser)
        {
            return new HttpResponseMessage { Content = new StringContent(bosImpowerBLL.GetBonusImpowerList(BonusItemId, BImpowerUser), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 根据时间和奖金项Id和被授权人Id查看授权详情
        /// <summary>
        /// 根据时间和奖金项Id和被授权人Id查看授权详情
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <param name="BImpowerUser"></param>
        /// <param name="StartTime"></param>
        /// <param name="EndTime"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetImpowerListByTime(string BonusItemId, string BImpowerUser, string StartTime, string EndTime)
        {
            return new HttpResponseMessage { Content = new StringContent(bosImpowerBLL.GetImpowerListByTime(BonusItemId, BImpowerUser, StartTime, EndTime), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 收回授权
        /// <summary>
        /// 收回授权
        /// </summary>
        /// <param name="BiId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage UpdState(string BiId)
        {
            return new HttpResponseMessage { Content = new StringContent(bosImpowerBLL.UpdState(BiId), Encoding.GetEncoding("UTF-8"), "text/json") };
        } 
        #endregion

        #region 日志
        private void WriteLog(string strmsg)
        {
            strmsg = $"{strmsg}\r\n";
            using (FileStream fs = System.IO.File.Open("D:\\Impower.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
            {
                byte[] bys = Encoding.Default.GetBytes(strmsg);
                fs.Write(bys, 0, bys.Length);
                fs.Close();
            }
        }
        #endregion
    }
}
