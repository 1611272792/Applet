﻿using SUNPN.BONUS.Common;
using SUNPN.BONUS.DALFactory;
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.BLL
{
    public class BonusDataQueryBLL
    {
        private readonly IBonusDataQuery dal = DataAccess.CreateBonusDataQuery();
        string strSucess = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(0)).ToString();
        string strFail = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(1)).ToString();

        /// <summary>
        /// 查看所有奖金参数列表
        /// </summary>
        /// <returns></returns>
        public string GetBonusData(string CompanyID,string OpenIdOrDepID,int Biao)
        {
            if (Biao==0)
            {
                //获取员工流水记录
                DataTable emp = dal.GetEmpBonusData(OpenIdOrDepID, CompanyID);
                if (emp.Rows.Count>0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", emp);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "no info", null);
                }
            }
            else
            {
                //获取部门流水记录
                DataTable dep = dal.GetDepBonusData(OpenIdOrDepID, CompanyID);
                if (dep.Rows.Count>0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dep);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "no info", null);
                }
            }
            ////获取员工流水记录
            //DataTable emp = dal.GetEmpBonusData(OpenID, CompanyID);
            ////获取部门流水记录
            //DataTable dep = dal.GetDepBonusData("", CompanyID);
            //if (emp.Rows.Count>0&&dep.Rows.Count>0)
            //{
            //    return ResponseHandle<object>.GetResult(strSucess, "", emp,dep);
            //}
            //else if (emp.Rows.Count == 0 && dep.Rows.Count > 0)
            //{
            //    return ResponseHandle<object>.GetResult(strFail, "no emp info", "",dep);

            //}
            //else if (emp.Rows.Count > 0 && dep.Rows.Count == 0)
            //{
            //    return ResponseHandle<object>.GetResult(strFail, "no depart info", emp, "");

            //}
            //else if (emp.Rows.Count == 0 && dep.Rows.Count == 0)
            //{
            //    return ResponseHandle<object>.GetResult(strFail, "show false,no info", "");
            //}
            //else
            //{
            //    return ResponseHandle<object>.GetResult(strFail, "error", "");
            //}
            
        }

        /// <summary>
        /// 显示员工奖金数据
        /// </summary>
        /// <param name="OpneID"></param>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public string GetOneEmpData(string OpneID,string CompanyID,string StartTime,string EndTime)
        {

            DataTable emp = dal.GetOneEmpData(OpneID,CompanyID,StartTime,EndTime);

            if (emp.Rows.Count>0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", emp);

            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "no info", null);
            }
           

        }


        /// <summary>
        /// 显示该部门奖金数据
        /// </summary>
        /// <param name="DepID"></param>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public string GetOneDepData(string DepID, string CompanyID, string StartTime, string EndTime)
        {

            DataTable emp = dal.GetOneDepData(DepID, CompanyID,StartTime,EndTime);

            if (emp.Rows.Count > 0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", emp);

            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "no info", null);
            }


        }
        
    }
}