﻿using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.DAL
{
    public class ClientDal : IClient
    {
        #region 全部公司信息
        /// <summary>
        /// 全部公司信息
        /// </summary>
        /// <returns></returns>
        public List<DataTable> GetAllList()
        {
            string EndTime = DateTime.Now.ToString();
            string sql = string.Format($@"SELECT SysCompany.CompanyId, CompanyName, ComPhoto, UserName,UserPhone,UserCount,RegTime,EndTime FROM dbo.SysCompany LEFT JOIN dbo.SysUser ON SysUser.OpenId = SysCompany.OpenId");
            string AllSql = sql + string.Format($@" WHERE IsTongguo=0 AND EndTime>='{EndTime}'");
            string OutTimesql = sql + string.Format($@" WHERE EndTime<'{EndTime}' AND IsTongguo=0");
            string NoPassSql = sql + string.Format($@" WHERE IsTongguo=1");
            try
            {
                DataTable all = DbHelperSQL.ExecuteDataTable(AllSql);
                DataTable OutTime = DbHelperSQL.ExecuteDataTable(OutTimesql);
                DataTable NoPass = DbHelperSQL.ExecuteDataTable(NoPassSql);
                List<DataTable> ld = new List<DataTable>();
                if (all.Rows.Count >= 0 && OutTime.Rows.Count >= 0 && NoPass.Rows.Count >= 0)
                {
                    ld.Add(all);
                    ld.Add(OutTime);
                    ld.Add(NoPass);
                }
                return ld;
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
        public string UpdPassState(string CompanyId, string UserCount, string EndTime)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return "CompanyId Is Null InDal";
            }
            if (string.IsNullOrEmpty(UserCount))
            {
                return "UserCount Is Null InDal";
            }
            if (string.IsNullOrEmpty(EndTime))
            {
                return "EndTime Is Null InDal";
            }
            //string updsql = string.Format($@"UPDATE dbo.SysCompany SET UserCount='{UserCount}',EndTime='{EndTime}',IsTongguo=0 WHERE CompanyId='{CompanyId}'");
            //string AuthorIds = "1,2,4,5,6,7,8,9,10,11,12,13,14";
            string sqlstr = string.Format($"exec PassState 'UpdatePassState','{CompanyId}','{UserCount}','{EndTime}'");
            try
            {
                string info = DbHelperSQL.EditDataCommand(sqlstr);
                if (info == "0")
                {
                    return "ok";
                }
                else
                {
                    return "no";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        #endregion

        #region 查询公司信息
        /// <summary>
        /// 查询公司信息
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public DataTable GetCompanyInfo(string CompanyId)
        {
            if (string.IsNullOrWhiteSpace(CompanyId))
            {
                return null;
            }
            string infosql = string.Format($@"SELECT * FROM dbo.SysCompany LEFT JOIN dbo.SysUser ON SysUser.OpenId = SysCompany.OpenId where SysCompany.CompanyId='{CompanyId}'");
            try
            {
                DataTable info = DbHelperSQL.ExecuteDataTable(infosql);
                if (info?.Rows.Count > 0)
                {
                    return info;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        } 
        #endregion

        //#region 日志
        //private void WriteLog(string strmsg)
        //{
        //    strmsg = $"{strmsg}\r\n";
        //    using (FileStream fs = System.IO.File.Open("D:\\Client_Dal.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion

    }
}
