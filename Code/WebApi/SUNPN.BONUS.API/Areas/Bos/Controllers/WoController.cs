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
    
    public class WoController : ApiController
    {
        WoBLL bll = new WoBLL();

        #region 获取个人信息
        [HttpGet]
        public HttpResponseMessage GetEmpInfo(string CompanyId, string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetEmpInfo(CompanyId, OpenId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
     
        [HttpGet] 
        public HttpResponseMessage GetEmpInfo(string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetEmpInfo("", OpenId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
      
        #endregion



        #region 获取个人奖金余额
        [HttpGet]
        public HttpResponseMessage GetEmpBonus(string CompanyId,string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetEmpBonus(CompanyId, OpenId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

         #region 获取单个人员奖金详情信息
        [HttpGet]
        public HttpResponseMessage GetOneEmpBonusInfo(string CompanyId, string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetOneBonusInfo(CompanyId, OpenId,"",""), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 获取单个人员奖金详情信息时间筛选
        [HttpGet]
        public HttpResponseMessage GetOneEmpBonusInfo(string CompanyId, string OpenId,string StartTime,string EndTime)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetOneBonusInfo(CompanyId, OpenId, StartTime, EndTime), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion


        #region 获取部门奖金余额
        [HttpGet]
        public HttpResponseMessage GetDepBonus(string CompanyId, string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetDepBonus(CompanyId, OpenId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion
        
        #region 个人提现
        [HttpGet]
        public HttpResponseMessage GetEmpDeposit(string CompanyId, string OpenId,decimal Summoney)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetDeposit(CompanyId, OpenId, Summoney), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 部门提现
        [HttpGet]
        public HttpResponseMessage GetDepDeposit(string CompanyId, int DepartId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetDepDeposit(CompanyId, DepartId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 获取奖金项
        [HttpGet]
        public HttpResponseMessage GetItemsBonus(string CompanyId, string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetItemsBonus(CompanyId, OpenId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion


        #region 获取自己负责奖金项
        [HttpGet]
        public HttpResponseMessage GetMyItemsBonus(string CompanyId, string OpenId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetMyItemsBonus(CompanyId, OpenId), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 获取奖金项明细(支出和收入a)
        [HttpGet]
        public HttpResponseMessage GetMyItemsDetail(string CompanyId, string OpenId,string ItemsID)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetMyItemsDetail(CompanyId, OpenId,ItemsID), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion


        #region 获取部门奖金详情
        /// <summary>
        /// 获取部门奖金详情
        /// </summary> 
        /// <param name="DepId"></param>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetDepBonusInfo(string DepId, string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetDepBonusInfo(DepId, CompanyId, "", ""), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 获取部门奖金详情
        /// <summary>
        /// 获取部门奖金详情
        /// </summary>  
        /// <param name="DepId"></param>
        /// <param name="CompanyId"></param>
        /// <param name="StartTime"></param>
        /// <param name="EndTime"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetDepBonusInfo(string DepId, string CompanyId, string StartTime, string EndTime)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetDepBonusInfo(DepId, CompanyId, StartTime, EndTime), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion


        #region 个人交易
        [HttpPost]
        public HttpResponseMessage AddTrading([FromBody]BonusDeal deal)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.AddTrading(deal), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

   


        #region 意见反馈 
        [HttpPost]
        public HttpResponseMessage AddSuggest([FromBody]Suggest sug)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.AddSuggest(sug), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion


        #region 查看意见反馈 
        [HttpGet]
        public HttpResponseMessage GetSuggest()
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetSuggest("",""), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 查看意见反馈(时间筛选)
        [HttpGet]
        public HttpResponseMessage GetSuggest(string StartTime,string EndTime)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetSuggest(StartTime,EndTime), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 查看意见反馈详情 
        [HttpGet]
        public HttpResponseMessage GetSuggestDetail(string ResonId)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetSuggestDetail(ResonId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 查看奖金数据中的备注
        [HttpGet]
        public HttpResponseMessage GetRemark(string BonusId, string CompanyId) {

            return new HttpResponseMessage { Content = new StringContent(bll.GetRemark(BonusId, CompanyId), Encoding.GetEncoding("UTF-8"), "text/json")};
        }
        #endregion

        #region 我页面查看公司秘钥
        [HttpGet]
        public HttpResponseMessage GetMyCompanyInfo(string OpenId)
        {

            return new HttpResponseMessage { Content = new StringContent(bll.GetMyCompanyInfo(OpenId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion
    }
}
