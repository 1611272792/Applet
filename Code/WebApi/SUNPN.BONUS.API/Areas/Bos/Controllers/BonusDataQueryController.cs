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
    public class BonusDataQueryController : ApiController
    {
        BonusDataQueryBLL bll = new BonusDataQueryBLL();
        #region 显示所有奖金流水数据列表
        [HttpGet]
        public HttpResponseMessage GetAllBonusData(string CompanyID,int Biao)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetBonusData(CompanyID,"", Biao), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 显示人员搜索补全或着部门搜素补全后奖金流水数据列表
        [HttpGet]
        public HttpResponseMessage GetAllBonusData(string CompanyID,string OpneIdOrDepId,int Biao)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetBonusData(CompanyID, OpneIdOrDepId, Biao), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 显示该员工奖金数据
        [HttpGet]
        public HttpResponseMessage GetEmpBonusData(string OpneID,string CompanyID)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetOneEmpData(OpneID,CompanyID,"",""), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 显示该员工时间筛选后的奖金数据
        [HttpGet]
        public HttpResponseMessage GetEmpBonusData(string OpneID, string CompanyID, string StartTime, string EndTime)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetOneEmpData(OpneID, CompanyID, StartTime, EndTime), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 显示该部门奖金数据
        [HttpGet]
        public HttpResponseMessage GetDepBonusData(string DepID, string CompanyID)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetOneDepData(DepID, CompanyID,"",""), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion

        #region 显示该部门时间筛选后奖金数据
        [HttpGet]
        public HttpResponseMessage GetDepBonusData(string DepID, string CompanyID, string StartTime, string EndTime)
        {
            return new HttpResponseMessage { Content = new StringContent(bll.GetOneDepData(DepID, CompanyID, StartTime, EndTime), Encoding.GetEncoding("UTF-8"), "text/json") }; ;
        }
        #endregion
    }
}
