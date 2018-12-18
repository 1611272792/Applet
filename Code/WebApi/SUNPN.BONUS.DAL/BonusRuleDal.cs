using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.DAL
{
    public class BonusRuleDal : IBonusRule
    {
        #region 添加奖金规则
        /// <summary>
        /// 添加奖金规则
        /// </summary>
        /// <param name="br">规则实体类</param>
        /// <returns></returns>
        public string AddBonusRule(BonusRule br)
        {
            if (string.IsNullOrEmpty(br.BonusItemId))
            {
                return "BonusItemId Is Null";
            }
            string GainNum = "";
            #region 查询受益人数
            if (br.BonuType == "0")
            {
                //公司级
                try
                {
                    string gainnumsql = string.Format($"SELECT COUNT(OpenId) GainNum FROM dbo.SysUser WHERE CompanyId='{br.CompanyId}'");
                    DataTable gainnum = DbHelperSQL.ExecuteDataTable(gainnumsql);
                    GainNum = (int.Parse(gainnum.Rows[0][0].ToString()) - int.Parse(br.RemainNum.ToString())).ToString();
                }
                catch (Exception)
                {
                    GainNum = null;
                }
            }
            else
            {
                //部门级
                try
                {
                    string gainnumsql = string.Format($"SELECT COUNT(OpenId) GainNum FROM dbo.SysUser WHERE CompanyId='{br.CompanyId}' AND DepId='{br.DepId}'");
                    DataTable gainnum = DbHelperSQL.ExecuteDataTable(gainnumsql);
                    GainNum = (int.Parse(gainnum.Rows[0][0].ToString()) - int.Parse(br.RemainNum.ToString())).ToString();
                }
                catch (Exception)
                {
                    GainNum = null;
                }
            } 
            #endregion
            #region 插入奖金规则sql
            string addrulesql = string.Format($@"INSERT INTO dbo.BosBonusItemRule
        (BRId,
          BRName,
          RemainNum,
          GainNum,
          AvgMoney,
          BonusItemId,
          OpenId
        )
VALUES(NEWID(), --BRId - nvarchar(200)
          N'{br.BRName}', --BRName - nvarchar(50)
          {br.RemainNum}, --RemainNum - int
          {GainNum}, --GainNum - int
          '{br.AvgMoney}', --AvgMoney - decimal
          N'{br.BonusItemId}',-- BonusItemId - nvarchar(200)
          '{br.OpenId}'
        )");
            #endregion
            try
            {
                int addrule = DbHelperSQL.ExecuteSql(addrulesql);
                if (addrule > 0)
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

        #region 删除奖金规则
        /// <summary>
        /// 根据BRId删除奖金规则
        /// </summary>
        /// <param name="BRId">奖金规则Id</param>
        /// <returns></returns>
        public string DelBonusRule(string BRId)
        {
            if (string.IsNullOrEmpty(BRId))
            {
                return "BRId Is Not In Dal";
            }
            string delsql = string.Format($"DELETE FROM dbo.BosBonusItemRule WHERE BRId='{BRId}'");
            try
            {
                int delRule = DbHelperSQL.ExecuteSql(delsql);
                if (delRule > 0)
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

        #region 更新奖金规则
        /// <summary>
        /// 更新奖金项规则
        /// </summary>
        /// <param name="br">规则实体类</param>
        /// <returns></returns>
        public string UpdBonusRule(BonusRule br)
        {
            if (string.IsNullOrEmpty(br.BRId))
            {
                return "BRId Is Not In Dal";
            }
            string GainNum = "";
            #region 查询受益人数
            if (br.BonuType == "0")
            {
                //公司级
                try
                {
                    string gainnumsql = string.Format($"SELECT COUNT(OpenId) GainNum FROM dbo.SysUser WHERE CompanyId='{br.CompanyId}'");
                    DataTable gainnum = DbHelperSQL.ExecuteDataTable(gainnumsql);
                    GainNum = (int.Parse(gainnum.Rows[0][0].ToString()) - int.Parse(br.RemainNum.ToString())).ToString();
                }
                catch (Exception)
                {
                    GainNum = null;
                }
            }
            else
            {
                //部门级
                try
                {
                    string gainnumsql = string.Format($"SELECT COUNT(OpenId) GainNum FROM dbo.SysUser WHERE CompanyId='{br.CompanyId}' AND DepId='{br.DepId}'");
                    DataTable gainnum = DbHelperSQL.ExecuteDataTable(gainnumsql);
                    GainNum = (int.Parse(gainnum.Rows[0][0].ToString()) - int.Parse(br.RemainNum.ToString())).ToString();
                }
                catch (Exception)
                {
                    GainNum = null;
                }
            }
            #endregion
            try
            {
                string updbrsql = string.Format($@"UPDATE dbo.BosBonusItemRule SET BRName='{br.BRName}',RemainNum='{br.RemainNum}',GainNum='{GainNum}',AvgMoney='{br.AvgMoney}',OpenId='{br.OpenId}' WHERE BRId='{br.BRId}'");
                int updbr = DbHelperSQL.ExecuteSql(updbrsql);
                if (updbr > 0)
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

        #region 查询奖金规则
        /// <summary>
        /// 查询奖金规则
        /// </summary>
        /// <param name="BRId">规则Id</param>
        /// <returns></returns>
        public DataTable GetBonusRule(string BRId)
        {
            if (string.IsNullOrEmpty(BRId))
            {
                return null;
            }
            string getrulesql = string.Format($@"SELECT * FROM dbo.BosBonusItemRule WHERE BRId='{BRId}'");
            try
            {
                DataTable getrule = DbHelperSQL.ExecuteDataTable(getrulesql);
                return getrule;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 添加固定金额
        /// <summary>
        /// 添加固定金额
        /// </summary>
        /// <param name="bid"></param>
        /// <returns></returns>
        public string AddGDMoney(BonusItemData bid)
        {
            //注入时间
            string AddDate = DateTime.Now.ToString("yyyy-MM-dd");
            //根据奖金项有效期推算有效时间
            DateTime EndDate = Convert.ToDateTime(DateTime.Today.AddMonths(+bid.InDate).ToString("yyyy-MM-01"));
            #region 添加固定金额sql
            string addgdsql = string.Format($@"
INSERT INTO dbo.BosBonusItemData

        (BonusItemId,
          AddMoney,
          RemainMoney,
          AddDate,
          EndDate,
          BdType,
          OpenId
        )
VALUES(N'{bid.BonusItemId}', --BonusItemId - nvarchar(200)
          '{bid.AddMoney}', --AddMoney - decimal
          '{bid.AddMoney}', --RemainMoney - decimal
          '{AddDate}', --AddDate - datetime
          '{EndDate}', --EndDate - datetime
          0, --BdType - bit
          '{bid.OpenId}'
        )");
            #endregion

            try
            {
                int addgd = DbHelperSQL.ExecuteSql(addgdsql);
                if (addgd > 0)
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
    }
}
