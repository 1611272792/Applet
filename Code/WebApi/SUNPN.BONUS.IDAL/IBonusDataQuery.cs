using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
  public  interface IBonusDataQuery
    {
        /// <summary>
        /// 获取所有员工奖金流水记录
        /// </summary>
        /// <returns></returns>
        DataTable GetEmpBonusData(string OpenId, string CompanyId);

        /// <summary>
        /// 获取所有部门奖金流水记录
        /// </summary>
        /// <returns></returns>
        DataTable GetDepBonusData(string DepId, string CompanyId);


        /// <summary>
        /// 获取该员工奖金流水记录
        /// </summary>
        /// <returns></returns>
        DataTable GetOneEmpData(string OpenId, string CompanyId,string StartTime,string EndTime);

        /// <summary>
        /// 获取该部门奖金流水记录
        /// </summary>
        /// <returns></returns>
        DataTable GetOneDepData(string DepID, string CompanyId,string StartTime, string EndTime);
        


    }
}
