
using Newtonsoft.Json;
using SUNPN.BONUS.API.App_Start;
using SUNPN.BONUS.BLL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static SUNPN.BONUS.API.Models.GetCompanyInfo;
using static SUNPN.BONUS.API.Models.GetCompanyInfo.ComInfo;

namespace SUNPN.BONUS.API.Controllers
{
    [RoutePrefix("api/CompanyInfo")]
    [WebApiExceptionFilter]
    public class CompanyInfoController : ApiController
    {
        CompanyInfoBLL cii = new CompanyInfoBLL();


        // 接口5 获取公司信息
        public string GetCompanyInfo([FromBody]Models.GetCompanyInfo value)
        {
             
            ComInfo ci = new ComInfo();
            InfoEntity ie = new InfoEntity();
            DataTable dt = cii.GetList();
            try
            {
                //string Where = "FirmInfoID=1";
                //string sql = string.Format("select * from FirmInfo where FirmInfoID=1");
                ////DataTable dt = DALHelp.ExecuteDataTable(sql, null);
                //DataTable dt = ServerOrLit.isDataTable(LoginController.connType, sql);
                if (dt.Rows.Count > 0)
                {
                    ci.StateCode = (int)Common.EnumParam.Code.Sucess;
                    ci.Reason = "";
                    ci.Info = ie;
                    ie.LogoUrl = "http://" + dt.Rows[0]["LogoUrl"].ToString();
                    ie.CompanyName = dt.Rows[0]["CompanyName"].ToString();
                }
                else
                {
                   
                    ci.StateCode = (int)Common.EnumParam.Code.Fail;
                    ci.Reason = "获取数据失败";
                    ci.Info = null;
                }
            }
            catch (Exception ex)
            {
                ci.StateCode = 104;
                ci.Reason = ex.Message;
                ci.Info = null;
            }
            return JsonConvert.SerializeObject(ci);
        }
    }
}
