﻿using SUNPN.BONUS.Common;
using SUNPN.BONUS.DALFactory;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.BLL
{
    public class ReasonBLL
    {

        #region 状态码枚举
        string strSucess = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(0)).ToString();
        string strFail = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(1)).ToString();
        string strError = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(2)).ToString();
        #endregion

        #region 定义变量 用户数据访问层
        /// <summary>
        /// 用户数据访问层
        /// </summary>
        private readonly IReason dal = DataAccess.CreateReason();

        #endregion

        #region 根据ReasonId查询原因
        /// <summary>
        /// 根据Reason查询原因
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>
        public string GetReason(string ReasonId)
        {
            if (string.IsNullOrEmpty(ReasonId))
            {
                return "ReasonId为空";
            }
            try
            {
                DataTable dtbwz = dal.GetWZReason(ReasonId);
                DataTable dtbtp = dal.GetTPReason(ReasonId);
                if (dtbwz.Rows.Count > 0 && dtbtp.Rows.Count > 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbwz, dtbtp);
                }
                else if (dtbwz.Rows.Count > 0 && dtbtp.Rows.Count <= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "暂无图片原因", dtbwz, null);
                }
                else if (dtbtp.Rows.Count > 0 && dtbwz.Rows.Count <= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "暂无文字原因", null, dtbtp);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "查询失败", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, "");
            }

        } 
        #endregion
    }
}
