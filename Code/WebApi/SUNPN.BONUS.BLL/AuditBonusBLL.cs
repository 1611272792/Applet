﻿using SUNPN.BONUS.DALFactory;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SUNPN.BONUS.Model;
using SUNPN.BONUS.DAL;
using SUNPN.BONUS.Common;
using SUNPN.BONUS.API.Models;
using System.Text.RegularExpressions;

namespace SUNPN.BONUS.BLL
{
  public  class AuditBonusBLL
    {
        private readonly IAuditBonus dal = DataAccess.CreateAuditBonus();
        string strSucess = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(0)).ToString();
        string strFail = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(1)).ToString();
        /// <summary>
        /// 获取申请提现的请求
        /// </summary>
        /// <returns></returns>
        public string GetAuditBonus(string CompanyId)
        {
            DataTable state = dal.GetAuditBonus(CompanyId);
            if (state.Rows.Count > 0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", state);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "no info",null);
            }
        }
        /// <summary>
        /// 获取审核通过的历史记录
        /// </summary>
        /// <returns></returns>
        public string GetAuditHistory(string CompanyId)
        {
            DataTable state = dal.GetAuditHistory(CompanyId);
            if (state.Rows.Count > 0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", state);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "no info", null);
            }
        }


        /// <summary>
        /// 获取该条审核记录的详细信息
        /// </summary>
        /// <param name="SomeBonusID"></param>
        /// <returns></returns>
        public string GetAuditDetail(string GetBonusID)
        {
            DataTable state = dal.GetAuditDetail(GetBonusID);
            if (state.Rows.Count > 0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", state);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "no info", null);
            }
        }
        /// <summary>
        ///批准
        /// </summary>
        /// <param name="SomeBonusID"></param>
        /// <returns></returns>
        public string UpdRatify(string SomeAuditBonusID, string OpenIDD)
        {

       
            string state = dal.UpdRatify(SomeAuditBonusID, OpenIDD);
            if (state== "success")
            {
                return ResponseHandle<object>.GetResult(strSucess, "", null);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, state, null);
            }
        }

        /// <summary>
        ///驳回
        /// </summary>
        /// <param name="SomeBonusID"></param>
        /// <returns></returns>
        public string UpdReject(string SomeAuditBonusID, string OpenIDD)
        {


            string state = dal.UpdReject(SomeAuditBonusID, OpenIDD);
            if (state == "success")
            {
                return ResponseHandle<object>.GetResult(strSucess, "", null);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, state, null);
            }
        }
        

    }
}
