﻿using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.DAL
{
    public class DepartBonusDal:IDepartBonus
    {
        #region 查询公司所有部门
        /// <summary>
        /// 查询公司所有部门
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public DataTable GetAllDepart(string CompanyId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            try
            {
                string departsql = string.Format($"SELECT DepId,DepName FROM dbo.SysDepart WHERE CompanyId='{CompanyId}'");
                DataTable depart = DbHelperSQL.ExecuteDataTable(departsql);
                return depart;
            }
            catch (Exception ex)
            {
                throw ex;
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
        public DataTable GetDepartBonusList(string CompanyId, string DepId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            if (string.IsNullOrEmpty(DepId))
            {
                return null;
            }
            try
            {
                string departbonussql = string.Format($@"select BdId,b2.BonusItemName,UserName DisManName,DisDate,BonusMoney,ResonId from BosBonusData b 
INNER join dbo.SysUser e on b.DisMan=e.OpenId 
INNER join  dbo.BosBonusItem b2 on b.BonusItemID=b2.BonusItemID 
WHERE BonusType=0 and EarMan='{DepId}'  
AND b2.CompanyID='{CompanyId}' AND e.CompanyID='{CompanyId}' ORDER BY BdId DESC");
                DataTable departbonus = DbHelperSQL.ExecuteDataTable(departbonussql);
                return departbonus;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    
    }
}
