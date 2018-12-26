﻿using SUNPN.BONUS.BLL;
using SUNPN.BONUS.Common;
using SUNPN.BONUS.DBUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SUNPN.BONUS.API.Areas.Sys.Controllers
{
    public class PinYinController : ApiController
    {
        /// <summary>
        /// 获取用户名全拼
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public object GetPinYin(string CompanyId)
        {
            PinYinBLL b = new PinYinBLL();
           
            return new HttpResponseMessage { Content = new StringContent(b.GetPinYin(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
         
        }

        /// <summary>
        /// 获取用户简称    
        /// </summary>
        /// <param name="pinyin"></param>
        /// <returns></returns>
        [HttpGet]
        public object GetUserName(string pinyin, string CompanyId)
        {
            //Log.AppLog("aaaa:" + pinyin + CompanyId);
            PinYinBLL b = new PinYinBLL();
            return new HttpResponseMessage { Content = new StringContent(b.GetUserName(pinyin, CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }


        #region 获取部门简拼
        /// <summary>
        /// 获取部门简拼
        /// </summary>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        [HttpGet]
        public object GetDepPY(string CompanyId)
        {
            PinYinBLL b = new PinYinBLL();
            return new HttpResponseMessage { Content = new StringContent(b.GetDepPY(CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion

        #region 获取部门名字
        /// <summary>
        /// 获取部门名字
        /// </summary>
        /// <param name="DepName">部门名称</param>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        [HttpGet]
        public object GetDepName(string DepName, string CompanyId)
        {
            PinYinBLL b = new PinYinBLL();
            return new HttpResponseMessage { Content = new StringContent(b.GetDepName(DepName, CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion


        #region 获取部门名字
        /// <summary>
        /// 获取部门名字
        /// </summary>
        /// <param name="DepName">部门名称</param>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        [HttpGet]
        public object GetDepName2(string DepName, string CompanyId)
        {
            PinYinBLL b = new PinYinBLL();
            return new HttpResponseMessage { Content = new StringContent(b.GetDepName2(DepName, CompanyId), Encoding.GetEncoding("UTF-8"), "text/json") };
        }
        #endregion
    }
}
