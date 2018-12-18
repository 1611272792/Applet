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
   public class BonusImpowerDal:IBonusImpower
    {
        #region 获取可授权奖金项列表
        /// <summary>
        /// 获取可授权奖金项列表
        /// </summary>
        /// <param name="OpenId">奖金项负责人Id</param>
        /// <returns></returns>
        public DataTable GetCanImpowerList(string OpenId)
        {
            if (string.IsNullOrEmpty(OpenId))
            {
                return null;
            }
            string strlistsql = string.Format($"SELECT BonusItemID,OpenId,BonusItemName FROM BosBonusItem WHERE IsActive=0 AND OpenId='{OpenId}'");
            try
            {
                DataTable strlist = DbHelperSQL.ExecuteDataTable(strlistsql);
                return strlist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 添加奖金授权
        /// <summary>
        /// 添加奖金授权
        /// </summary>
        /// <param name="bi"></param>
        /// <returns></returns>
        public string AddBonusImpower(BonusImpower bi)
        {
            try
            {
                string ImpowerDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                string remainsql = string.Format($"SELECT (SELECT SUM(BosBonusItemData.RemainMoney) FROM dbo.BosBonusItemData WHERE BosBonusItemData.BonusItemId='{bi.BonusItemId}' AND Convert(varchar(30),getdate(),102)<EndDate )-IsNull((SELECT sum (BosBonusImpower.RemainMoney) FROM dbo.BosBonusImpower WHERE BonusItemId='{bi.BonusItemId}' AND ImpowerDate> DATEADD(MM,DATEDIFF(MM,0,GETDATE()),0)),0) AllMoney");
                DataTable redt = DbHelperSQL.ExecuteDataTable(remainsql);
                if (bi.BItemUser == bi.BImpowerUser)
                {
                    return "same";
                }
                //员奖金项金额不能为空
                if (redt.Rows.Count > 0 && redt.Rows[0]["AllMoney"].ToString() != "")
                {
                    //被授权金额的不能大于授权金额
                    if (double.Parse(redt.Rows[0]["AllMoney"].ToString()) >= int.Parse(bi.AddMoney.ToString()))
                    {
                        string addsql = string.Format($"INSERT dbo.BosBonusImpower( BonusItemId ,BItemUser,BImpowerUser ,AddMoney ,RemainMoney ,ImpowerDate, Model,IsVaild,Remake) values('{bi.BonusItemId}','{bi.BItemUser}','{bi.BImpowerUser}','{bi.AddMoney}','{bi.AddMoney}','{ImpowerDate}',{bi.Model},{0},'{bi.Remake}')");
                        int add = DbHelperSQL.ExecuteSql(addsql);
                        if (add > 0)
                        {
                            return "ok";
                        }
                        else
                        {
                            return "ok";
                        }
                    }
                    else
                    {
                        return redt.Rows[0]["AllMoney"].ToString();
                    }
                }
                else
                {
                    return "nomoney";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        #endregion

        #region 奖金授权记录
        /// <summary>
        /// 奖金授权记录
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        public DataTable GetBonusRecord(string BonusItemId)
        {
            if (string.IsNullOrEmpty(BonusItemId))
            {
                return null;
            }
            try
            {
                string getrecordsql = string.Format($@"SELECT DISTINCT BosBonusImpower.BImpowerUser,dbo.SysUser.Photo,BonusItemId,UserName FROM dbo.BosBonusImpower 
INNER JOIN dbo.SysUser ON SysUser.OpenId = BosBonusImpower.BImpowerUser WHERE BonusItemId = '{BonusItemId}' AND ImpowerDate >= CONVERT(varchar(30), DATEADD(MM, DATEDIFF(MM, 0, GETDATE()), 0), 102)
GROUP BY BosBonusImpower.BImpowerUser, SysUser.Photo, BonusItemID, UserName having SUM(AddMoney) > 0");
                DataTable getrecord = DbHelperSQL.ExecuteDataTable(getrecordsql);
                return getrecord;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 根据奖金项Id和被授权人Id查看授权详情

        /// <summary>
        /// 授权详情
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <param name="BImpowerUser"></param>
        /// <returns></returns>
        public DataTable GetBonusImpowerList(string BonusItemId, string BImpowerUser)
        {
            try
            {
                string impowerlistsql = string.Format($@"SELECT BiId,BonusItemName,BImpowerUser,AddMoney,Model,ImpowerDate,Remake 
FROM dbo.BosBonusImpower INNER JOIN dbo.BosBonusItem
ON BosBonusItem.BonusItemId = BosBonusImpower.BonusItemId
INNER JOIN dbo.SysUser ON SysUser.OpenId = BosBonusImpower.BImpowerUser
WHERE ImpowerDate >= CONVERT(varchar(30), DATEADD(MM, DATEDIFF(MM, 0, GETDATE()), 0), 102)
AND dbo.BosBonusImpower.BImpowerUser = '{BImpowerUser}'
AND dbo.BosBonusImpower.BonusItemId = '{BonusItemId}' AND IsVaild = 0 ORDER BY ImpowerDate DESC");
                DataTable impowerlist = DbHelperSQL.ExecuteDataTable(impowerlistsql);
                return impowerlist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 根据奖金项Id和被授权人Id查看授权汇总信息
        /// <summary>
        /// 根据奖金项Id和被授权人Id查看授权汇总信息
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <param name="BImpowerUser"></param>
        /// <returns></returns>
        public DataTable GetBonusImpowerCollect(string BonusItemId, string BImpowerUser)
        {
            try
            {
                string impowercollectsql = string.Format($@"SELECT BonusItemName,UserName BItemUserName,SUM(AddMoney) AllMoney,SUM(RemainMoney) RemainMoney 
FROM dbo.BosBonusImpower
INNER JOIN dbo.BosBonusItem ON BosBonusItem.BonusItemId = BosBonusImpower.BonusItemId
INNER JOIN dbo.SysUser ON SysUser.OpenId = BosBonusImpower.BItemUser
WHERE ImpowerDate >= DATEADD(MM, DATEDIFF(MM, 0, GETDATE()), 0)
AND dbo.BosBonusImpower.BImpowerUser = '{BImpowerUser}'
AND dbo.BosBonusImpower.BonusItemId = '{BonusItemId}' AND IsVaild = 0  GROUP BY BonusItemName, UserName");
                DataTable impowercollect = DbHelperSQL.ExecuteDataTable(impowercollectsql);
                return impowercollect;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 根据时间和奖金项Id和被授权人Id查看授权详情
        /// <summary>
        /// 根据时间和奖金项Id和被授权人Id查看授权详情
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <param name="BImpowerUser"></param>
        /// <param name="StartTime"></param>
        /// <param name="EndTime"></param>
        /// <returns></returns>
        public DataTable GetImpowerListByTime(string BonusItemId, string BImpowerUser, string StartTime, string EndTime)
        {
            try
            {
                string listbytimesql = string.Format($@"SELECT BiId,BonusItemName,UserName BImpowerUserName,AddMoney,Model,ImpowerDate,IsVaild,Remake
FROM dbo.BosBonusImpower 
INNER JOIN dbo.BosBonusItem ON BosBonusItem.BonusItemId = BosBonusImpower.BonusItemId
INNER JOIN dbo.SysUser ON SysUser.OpenId = BosBonusImpower.BImpowerUser 
WHERE CONVERT(DATE,ImpowerDate) BETWEEN '{StartTime}' AND '{EndTime}' 
AND dbo.BosBonusImpower.BImpowerUser='{BImpowerUser}' 
AND dbo.BosBonusImpower.BonusItemId='{BonusItemId}' 
ORDER BY ImpowerDate DESC");
                DataTable listbytime = DbHelperSQL.ExecuteDataTable(listbytimesql);
                return listbytime;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 授权授权
        /// <summary>
        /// 收回授权
        /// </summary>
        /// <param name="BiId">授权id</param>
        /// <returns></returns>
        public string UpdState(string BiId)
        {
            if (string.IsNullOrEmpty(BiId))
            {
                return "BiId为空";
            }
            try
            {
                string updstatesql = string.Format($@"UPDATE dbo.BosBonusImpower SET IsVaild=1 WHERE BiId='{BiId}'");
                int updstate = DbHelperSQL.ExecuteSql(updstatesql);
                if (updstate > 0)
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

        //#region 日志
        //private void WriteLog(string strmsg)
        //{
        //    strmsg = $"{strmsg}\r\n";
        //    using (FileStream fs = System.IO.File.Open("D:\\BonusImpowerDal.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion
    }
}
