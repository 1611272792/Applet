using SUNPN.BONUS.Common;
using SUNPN.BONUS.Common.PinYin;
using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.DAL
{
   public class AuditBonusDAL:IAuditBonus
    {
        /// <summary>
        /// 获取申请记录
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public DataTable GetAuditBonus(string CompanyId) {
            try
            {
                string strSql = string.Format($@"SELECT  AuditBonusID ,
        e.UserName ,
        GetBonusID ,
        GetMoney ,
        [GetDate]  FROM  dbo.BosAuditBonus a INNER JOIN dbo.SysUser e ON a.GetOpenId=e.OpenId WHERE a.IsDepOrEmp=1 AND IsState=0 AND a.CompanyID='{CompanyId}'
UNION ALL 
SELECT AuditBonusID ,
        d.DepName ,
        GetBonusID ,
        GetMoney ,
        [GetDate] FROM dbo.BosAuditBonus a2 INNER JOIN dbo.SysDepart d ON a2.GetOpenId=d.DepId WHERE a2.IsDepOrEmp=0 AND IsState=0
        AND a2.CompanyID='{CompanyId}'
        ORDER BY [GetDate] DESC");
                DataTable ds = DbHelperSQL.ExecuteDataTable(strSql);
                return ds;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 获取历史记录
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public DataTable GetAuditHistory(string CompanyId) {

            try
            {
                string strSql = string.Format($@"SELECT  AuditBonusID ,
        e.UserName ,
        GetBonusID ,
        GetMoney ,
        [GetDate],
        CASE  IsState WHEN  0 THEN '审核中' WHEN 1 THEN '已批准' ELSE  '驳回' END isOrNO  FROM  dbo.BosAuditBonus a INNER JOIN dbo.SysUser e ON a.GetOpenId=e.OpenId  and e.CompanyID='{CompanyId}' WHERE a.IsDepOrEmp=1 AND a.CompanyID='{CompanyId}'
UNION ALL 
SELECT AuditBonusID ,
        d.DepName ,
        GetBonusID ,
        GetMoney ,
        [GetDate],
         CASE  IsState WHEN  0 THEN '审核中' WHEN 1 THEN '已批准' ELSE  '驳回' END isOrNO FROM dbo.BosAuditBonus a2 INNER JOIN dbo.SysDepart d ON a2.GetOpenId=d.DepId WHERE a2.IsDepOrEmp=0 
        AND a2.CompanyID='{CompanyId}' and d.CompanyID='{CompanyId}'
        ORDER BY [GetDate] DESC");
                DataTable ds = DbHelperSQL.ExecuteDataTable(strSql);
                return ds;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// 获取该条审核记录的详细信息
        /// </summary>
        /// <param name="SomeBonusID"></param>
        /// <returns></returns>
        public DataTable GetAuditDetail(string GetBonusID) {
            try
            {
                string strSql = string.Format($@"SELECT e.UserName,DisDate,BonusMoney,BrContent FROM dbo.BosBonusData b 
INNER JOIN dbo.SysUser e ON b.DisMan = e.OpenId
LEFT JOIN dbo.BosBonusReson r ON b.ResonID = r.BrId
 WHERE BdId IN({GetBonusID})");
                DataTable ds = DbHelperSQL.ExecuteDataTable(strSql);
                return ds;
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        /// <summary>
        /// 批准功能
        /// </summary>
        /// <param name="SomeAuditBonusID"></param>
        /// <param name="OpenID"></param>
        /// <returns></returns>
      public  string UpdRatify(string SomeAuditBonusID, string OpenID) {
            try
            {
                string[] tijiaoNum = SomeAuditBonusID.Split(',');
                string sqls = "";
                string bd2ID = "";//bd2中的id
                string errorNum = "";
                for (int i = 0; i < tijiaoNum.Length; i++)
                {
                    sqls = string.Format(" SELECT GetBonusID FROM dbo.BosAuditBonus WHERE AuditBonusID='{0}' ", tijiaoNum[i]);
                    bd2ID = DbHelperSQL.ExecuteDataTable(sqls).Rows[0][0].ToString();  //查出bd2中的id
                    errorNum = DbHelperSQL.EditDataCommand("EXEC dbo.Ratify " + tijiaoNum[i] + ",'" + bd2ID + "'," + OpenID);
                    if (errorNum != "0")
                    {
                        return "false";
                    }
                }
                return "success";
            }
            catch (Exception)
            {
                return "error";
            }

        }



        /// <summary>
        /// 驳回
        /// </summary>
        /// <param name="SomeAuditBonusID"></param>
        /// <param name="OpenID"></param>
        /// <returns></returns>
      public  string UpdReject(string SomeAuditBonusID, string OpenID) {
            string[] tijiaoNum = SomeAuditBonusID.Split(',');
            string sqls = "";
            string bd2ID = "";//bd2中的id
            string errorNum = "";

            try
            {
                for (int i = 0; i < tijiaoNum.Length; i++)
                {
                    sqls = string.Format(" SELECT GetBonusID FROM dbo.BosAuditBonus WHERE AuditBonusID='{0}'", tijiaoNum[i]);
                    bd2ID = DbHelperSQL.ExecuteDataTable(sqls).Rows[0][0].ToString();  //查出bd2中的ids

                    errorNum = DbHelperSQL.EditDataCommand("EXEC dbo.Reject " + tijiaoNum[i] + ",'" + bd2ID + "'," + OpenID);
                    Log.AppLog("tijiaoNum:" + tijiaoNum[i] + "bd2ID:" + bd2ID + "OpenID:" + OpenID);
                    if (errorNum != "0")
                    {
                        return "false";
                    }

                }
                return "success";
            }
            catch (Exception)
            {
                return "error";
            }
        }


        //#region 日志
        //private void WriteLog(string strmsg)
        //{
        //    strmsg = $"{strmsg}\r\n";
        //    using (FileStream fs = System.IO.File.Open("D:\\AuditBonusDAL.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion
    }
}
