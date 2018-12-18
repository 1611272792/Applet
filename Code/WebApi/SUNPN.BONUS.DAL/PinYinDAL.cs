using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SUNPN.BONUS.Model;
using System.IO;
using System.Text.RegularExpressions;
using SUNPN.BONUS.Common;

namespace SUNPN.BONUS.DAL
{
  public  class PinYinDAL:IPinYin
    {
        public DataTable  GetPinYin(string CompanyId) {
            try
            {
                string mysql = string.Format($@"SELECT * FROM dbo.SysUser where CompanyId='{CompanyId}'");
                DataTable dt = DbHelperSQL.ExecuteDataTable(mysql);
                return dt;
            }
            catch (Exception)
            {

                return null;
            }          
           
        }


        public DataTable GetUserName(string username,string CompanyId)
        {
            try
            {
                string mysql;
                if (username.Contains(","))//单纯传用户名如果同名的话胡有冲突所以会加一个逗号拼接 2018-12-13
                {
                    string[] sArray = Regex.Split(username, ",", RegexOptions.IgnoreCase);
                    mysql = string.Format($" SELECT * FROM dbo.SysUser WHERE SpellJp='{sArray[0]}' and OpenId='{sArray[1]}' and CompanyId='{CompanyId}'");
                }
                else
                {
                    mysql = string.Format($" SELECT * FROM dbo.SysUser WHERE SpellJp='{username}' and CompanyId='{CompanyId}'");
                }
                DataTable dt = DbHelperSQL.ExecuteDataTable(mysql);
                return dt;
            }
            catch (Exception)
            {

                return null;
            }

        }

        #region 获取部门简写
        /// <summary>
        /// 获取部门简写
        /// </summary>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        public DataTable GetDepPY(string CompanyId)
        {
            try
            {
                string mysql = string.Format($@"SELECT SpellJp FROM dbo.SysDepart WHERE CompanyId='{CompanyId}'");
                DataTable dt = DbHelperSQL.ExecuteDataTable(mysql);
                return dt;
            }
            catch (Exception)
            {
                return null;
            }
        } 
        #endregion

        /// <summary>
        /// 获取部门名字
        /// </summary>
        /// <param name="DepName">部门名称</param>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        public DataTable GetDepName(string DepName, string CompanyId)
        {
            try
            {
                string mysql = string.Format($" SELECT DepId,DepName,OpenId FROM dbo.SysDepart WHERE SpellJp='{DepName}' and CompanyId='{CompanyId}'");                
                DataTable dt = DbHelperSQL.ExecuteDataTable(mysql);
                return dt;
            }
            catch (Exception)
            {
                return null;
            }
        }
        
    }
}
