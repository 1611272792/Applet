﻿using SUNPN.BONUS.BLL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SUNPN.BONUS.API.Areas.Sys.Controllers
{
    public class ClientController : ApiController
    {
        #region 定义变量
        /// <summary>
        /// 客户管理逻辑类
        /// </summary>
        ClientBLL clientBLL = new ClientBLL();
        #endregion

        #region 全部公司信息
        /// <summary>
        /// 全部公司信息 data:所有公司   data1：过期公司    data2：未审核公司
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetAllList()
        {
            return new HttpResponseMessage { Content = new StringContent(clientBLL.GetAllList(), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 审核公司
        /// <summary>
        /// 审核公司
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="UserCount"></param>
        /// <param name="EndTime"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage UpdPassState(string CompanyId, string UserCount, string EndTime)
        {
            return new HttpResponseMessage { Content = new StringContent(clientBLL.UpdPassState(CompanyId, UserCount, EndTime), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取公司信息
        /// <summary>
        /// 获取公司信息
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetCompanyInfo(string CompanyId)
        {
            return new HttpResponseMessage { Content = new StringContent(clientBLL.GetCompanyInfo(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 日志
        private void WriteLog(string strmsg)
        {
            strmsg = $"{strmsg}\r\n";
            using (FileStream fs = System.IO.File.Open("D:\\Client.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
            {
                byte[] bys = Encoding.Default.GetBytes(strmsg);
                fs.Write(bys, 0, bys.Length);
                fs.Close();
            }
        }
        #endregion

    }
}