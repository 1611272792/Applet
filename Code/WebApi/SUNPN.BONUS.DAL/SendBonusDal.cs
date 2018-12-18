﻿using SUNPN.BONUS.Common;
using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.DAL
{
    public class SendBonusDal : ISendBonus
    {
        #region 根据部门Id和公司Id查询对应的可发放的人员列表
        /// <summary>
        /// 根据部门Id和公司Id查询对应的可发放的人员列表
        /// </summary>
        /// <param name="DepId"></param>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        //public List<BenefitList> GetBenefitList(string DepId, string CompanyId)
        //{
        //    if (string.IsNullOrEmpty(DepId))
        //    {
        //        return null;
        //    }
        //    if (string.IsNullOrEmpty(CompanyId))
        //    {
        //        return null;
        //    }
        //    //受益员工列表
        //    List<BenefitList> lbfl = new List<BenefitList>();
        //    string bflistsql = "";
        //    if (DepId == "0")
        //    {
        //        bflistsql = string.Format($@"SELECT OpenId,UserId,UserName,Photo FROM dbo.SysUser WHERE CompanyId='{CompanyId}'");
        //    }
        //    else
        //    {
        //        bflistsql = string.Format($@"SELECT OpenId,UserId,UserName,Photo FROM dbo.SysUser WHERE CompanyId='{CompanyId}' AND DepId='{DepId}'");
        //    }
        //    try
        //    {
        //        DataTable bflist = DbHelperSQL.ExecuteDataTable(bflistsql);
        //        if (bflist.Rows.Count > 0)
        //        {
        //            for (int i = 0; i < bflist.Rows.Count; i++)
        //            {
        //                //受益员工信息
        //                BenefitList bfl = new BenefitList();
        //                bfl.OpenId = bflist.Rows[i]["OpenId"].ToString();
        //                bfl.UserId = bflist.Rows[i]["UserId"].ToString();
        //                bfl.UserName = bflist.Rows[i]["UserName"].ToString();
        //                bfl.Photo = bflist.Rows[i]["Photo"].ToString();
        //                if (DepId == "0")
        //                {
        //                    //受益部门列表
        //                    List<DepList> ldp = new List<DepList>();
        //                    string deplistsql = string.Format($@"SELECT DepId,DepName FROM dbo.SysDepart WHERE CompanyId='{CompanyId}'");
        //                    DataTable deplist = DbHelperSQL.ExecuteDataTable(deplistsql);
        //                    if (deplist.Rows.Count > 0)
        //                    {
        //                        for (int j = 0; j < deplist.Rows.Count; j++)
        //                        {
        //                            //受益部门信息
        //                            DepList dl = new DepList();
        //                            dl.DepId = deplist.Rows[j]["DepId"].ToString();
        //                            dl.DepName = deplist.Rows[j]["DepName"].ToString();
        //                            ldp.Add(dl);
        //                        }
        //                        bfl.depList = ldp;
        //                    }
        //                    else
        //                    {
        //                        bfl.depList = null;
        //                    }
        //                }
        //                else
        //                {
        //                    bfl.depList = null;
        //                }
        //                lbfl.Add(bfl);
        //            }
        //            return lbfl;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        /// <summary>
        /// 受益人员列表
        /// </summary>
        /// <param name="DepId"></param>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public DataTable GetBenefitUser(string DepId, string CompanyId,string BonusItemId)
        {
            if (string.IsNullOrEmpty(DepId))
            {
                return null;
            }
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            string bflistsql = "";
            try
            {
                if (DepId == "0")
                {
                    bflistsql = string.Format($@"SELECT DISTINCT dbo.SysUser.OpenId,UserId,UserName,SpellJP,Photo FROM dbo.SysUser INNER JOIN dbo.BosBonusItem ON BosBonusItem.CompanyId = SysUser.CompanyId
 WHERE dbo.SysUser.CompanyId='{CompanyId}'
 AND dbo.SysUser.OpenId!=(SELECT OpenId FROM dbo.BosBonusItem WHERE BonusItemId='{BonusItemId}')");
                }
                else
                {
                    bflistsql = string.Format($@"SELECT DISTINCT dbo.SysUser.OpenId,UserId,UserName,SpellJP,Photo FROM dbo.SysUser INNER JOIN dbo.BosBonusItem ON BosBonusItem.CompanyId = SysUser.CompanyId
 WHERE dbo.SysUser.CompanyId='{CompanyId}' AND dbo.SysUser.DepId='{DepId}'
 AND dbo.SysUser.OpenId!=(SELECT OpenId FROM dbo.BosBonusItem WHERE BonusItemId='{BonusItemId}')");
                }
                //Log.AppLog("bflistsql:"+bflistsql);
                DataTable bflist = DbHelperSQL.ExecuteDataTable(bflistsql);
                return bflist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 受益部门列表
        /// </summary>
        /// <param name="DepId"></param>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public DataTable GetBenefitDep(string DepId, string CompanyId)
        {
            if (string.IsNullOrEmpty(DepId))
            {
                return null;
            }
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            try
            {
                string bflistsql = string.Format($@" SELECT DepId OpenId,DepId UserId,DepName UserName,SpellJp FROM dbo.SysDepart WHERE CompanyId='{CompanyId}'");
                DataTable bflist = DbHelperSQL.ExecuteDataTable(bflistsql);
                return bflist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 添加常用原因
        /// <summary>
        /// 添加常用原因
        /// </summary>
        /// <param name="ur"></param>
        /// <returns></returns>
        public string AddUsualReason(UsualReason ur)
        {
            if (string.IsNullOrEmpty(ur.BrContent))
            {
                return "BrContent为空";
            }
            if (string.IsNullOrEmpty(ur.OpenId))
            {
                return "OpenId为空";
            }
            try
            {
                string addsql = string.Format($@"
INSERT INTO dbo.BosGrendReson
        (BrContent, OpenId)
VALUES(N'{ur.BrContent}', --BrContent - nvarchar(max)
          '{ur.OpenId}'-- OpenId - varchar(200)
          )");
                int addReson = DbHelperSQL.ExecuteSql(addsql);
                if (addReson > 0)
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

        #region 获取常用原因信息
        /// <summary>
        /// 获取常用原因信息
        /// </summary>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        public DataTable GetUsualReason(string OpenId)
        {
            if (string.IsNullOrEmpty(OpenId))
            {
                return null;
            }
            try
            {
                string reasonsql = string.Format($@"select * from dbo.BosGrendReson where OpenId='{OpenId}'");
                DataTable reason = DbHelperSQL.ExecuteDataTable(reasonsql);
                return reason;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 根据UserId、CompanyId、DepId查询出二维码信息是否有效
        /// <summary>
        /// 根据UserId、CompanyId、DepId查询出二维码信息是否有效
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        public string CheckQRValid(string UserId, string CompanyId, string DepId)
        {
            if (string.IsNullOrEmpty(UserId))
            {
                return "UserId Is Null InDal";
            }
            if (string.IsNullOrEmpty(CompanyId))
            {
                return "CompanyId Is Null InDal";
            }
            if (string.IsNullOrEmpty(DepId))
            {
                //Log.AppLog("DepId:"+DepId);
                return "DepId Is Null InDal";
            }
            string checksql = string.Format($@"SELECT UserId FROM dbo.SysUser INNER JOIN dbo.SysDepart ON SysDepart.OpenId = SysUser.OpenId WHERE dbo.SysUser.CompanyId='{CompanyId}'");
            if (DepId == "0")
            {
                checksql += string.Format($@" AND UserId='{UserId}'");
            }
            else
            {
                checksql += string.Format($@" AND dbo.SysUser.DepId='{DepId}' AND UserId='{UserId}'");
            }
            //Log.AppLog("checksql:" + checksql);
            try
            {
                DataTable check = DbHelperSQL.ExecuteDataTable(checksql);
                if (check.Rows.Count > 0)
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

        #region 发奖金
        /// <summary>
        /// 发奖金
        /// </summary>
        /// <param name="bo"></param>
        /// <returns></returns>
        public string SendOut(BonusOut bo)
        {
            //Log.AppLog("Count:" + bo.ResonCount);
            //Log.AppLog("ResonContentImg:" + bo.ResonContentImg);
            //Log.AppLog("Count:" + bo.PersonCount.ToString());
            try
            {
                string ResonID = System.Guid.NewGuid().ToString();//原因guid
                bo.ResonID = ResonID;
                //如果是部门id传进来，那么类型就是0，否则就是1
                //图片
                if (bo.ResonCount != 0)
                {
                    //Log.AppLog("BonusOut.ResonContentImg：" + bo.ResonContentImg);
                    //bo.ResonContentImg = bo.ResonContentImg.Substring(0, bo.ResonContentImg.Length - 1);
                    //图片数量                    
                    bo.ResonCount = bo.ResonContentImg.Split(',').Count();
                    //Log.AppLog("BonusOut.ResonContentImg：" + bo.ResonContentImg + "Count:" + bo.ResonContent);
                }
                else
                {
                    //Log.AppLog("BonusOut.ResonContentImg：" + bo.ResonContentImg);
                    //图片数量
                    bo.ResonCount = 0;
                }
                string sqlstr = string.Format($"exec proc_SendBonus 'SendBonus','{bo.BonusItemId}','{bo.DisMan}','{bo.EarMan}',{bo.EarMoney},{bo.BonusType},{bo.IsGet},'{bo.ResonID}',{bo.PersonCount},'{bo.ResonContent}','{bo.ResonContentImg}',{bo.ResonCount},{0},{bo.BonusTypes},'{bo.companyid}'");
                Log.AppLog("sqlstr发放奖金:" + sqlstr);
                //string info = DbHelperSQL.EditDataCommand(sqlstr);

                IDataParameter[] parameters = new SqlParameter[15];
                parameters[0] = new SqlParameter("@strType", "SendBonus");
                parameters[1] = new SqlParameter("@BonusItemId", bo.BonusItemId);
                parameters[2] = new SqlParameter("@DisMan", bo.DisMan);
                parameters[3] = new SqlParameter("@EarMan", bo.EarMan);
                parameters[4] = new SqlParameter("@EarMoney", bo.EarMoney);
                parameters[5] = new SqlParameter("@BonusType", bo.BonusType);
                parameters[6] = new SqlParameter("@IsGet", bo.IsGet);
                parameters[7] = new SqlParameter("@ResonID", bo.ResonID);
                parameters[8] = new SqlParameter("@PersonCount", bo.PersonCount);
                parameters[9] = new SqlParameter("@ResonContent", bo.ResonContent);
                parameters[10] = new SqlParameter("@ResonContentImg", bo.ResonContentImg);
                parameters[11] = new SqlParameter("@ResonCount", bo.ResonCount);
                parameters[12] = new SqlParameter("@ResonType", 0);
                parameters[13] = new SqlParameter("@BonusTypes", bo.BonusTypes);
                parameters[14] = new SqlParameter("@companyid", bo.companyid);
                //Log.AppLog("Count:" + bo.ResonCount);
                int mes;
                int info = DbHelperSQL.RunProcedure("proc_SendBonus", parameters,out mes);
                //Log.AppLog("info:"+info);
                if (mes > 0)
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

        #region 罚奖金
        /// <summary>
        /// 罚奖金
        /// </summary>
        /// <param name="bo"></param>
        /// <returns></returns>
        public string SendFa(BonusOut bo)
        {
            try
            {
                string ResonID = System.Guid.NewGuid().ToString();//原因guid
                bo.ResonID = ResonID;
                //如果是部门id传进来，那么类型就是0，否则就是1
                //图片
                if (bo.ResonCount != 0)
                {
                    //Log.AppLog("bo.ResonContentImg：" + bo.ResonContentImg);
                    //bo.ResonContentImg = bo.ResonContentImg.Substring(0, bo.ResonContentImg.Length - 1);
                    //bo.ResonContentImg = bo.ResonContentImg.TrimStart(',').TrimEnd(',');
                    //图片数量
                    bo.ResonCount = bo.ResonContentImg.Split(',').Count();
                    //Log.AppLog("bo.ResonContentImg：" + bo.ResonContentImg);
                }
                else
                {
                    //Log.AppLog("bo.ResonContentImg：" + bo.ResonContentImg);
                    //图片数量
                    bo.ResonCount = 0;
                }
                string sqlstr = string.Format($"exec proc_SendBonus 'BonusFa','{bo.BonusItemId}','{bo.DisMan}','{bo.EarMan}',{bo.EarMoney},{bo.BonusType},{bo.IsGet},'{bo.ResonID}',{bo.PersonCount},'{bo.ResonContent}','{bo.ResonContentImg}',{bo.ResonCount},0,0,'{bo.companyid}'");
                //Log.AppLog("sqlstr发放奖金:" + sqlstr);
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



      public  DataTable GetUsername(string UserId, string CompanyId) {
            try
            {
                string sqlStr = string.Format($@"SELECT OpenId,UserName FROM dbo.SysUser WHERE UserId='{UserId}' AND CompanyId='{CompanyId}'");
                return DbHelperSQL.ExecuteDataTable(sqlStr);
            }
            catch (Exception)
            {

                throw;
            }
        }
        //#region 日志
        //private void WriteLog(string strmsg)
        //{
        //    strmsg = $"{strmsg}\r\n";
        //    using (FileStream fs = System.IO.File.Open("D:\\SendBonus-Dal.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion
    }
}
