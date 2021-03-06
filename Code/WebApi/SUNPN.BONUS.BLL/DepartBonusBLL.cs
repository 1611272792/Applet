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
   public class DepartBonusBLL
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
        private readonly IDepartBonus dal = DataAccess.CreateDepartBonus();

        #endregion

        #region 查询公司所有部门
        /// <summary>
        /// 查询公司所有部门
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public string GetAllDepart(string CompanyId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return "CompanyId Is Null";
            }
            try
            {
                DataTable dtbmes = dal.GetAllDepart(CompanyId);
                if (dtbmes.Rows.Count >= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "查询失败", null);
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, null);
            }
        }
        #endregion

        #region 获取部门奖金列表
        /// <summary>
        /// 获取部门奖金列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        public string GetDepartBonusList(string CompanyId, string DepId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return "CompanyId Is Null";
            }
            try
            {
                DataTable dtbmes = dal.GetDepartBonusList(CompanyId, DepId);
                if (dtbmes.Rows.Count >= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "查询失败", null);
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, null);
            }
        }
        #endregion
    }
}
