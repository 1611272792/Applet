﻿using SUNPN.BONUS.DBUtility;
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
    public class BonusParamDAL : IBonusParam
    {

        /// <summary>
        /// 添加奖金参数
        /// </summary>
        /// <returns></returns>
        public string AddBonusParam(BonusParam bonusPar)
        {
            try
            {
                if (CheckParamName(bonusPar.BPName))
                {
                    return "Same Name";
                }
                else
                {


                    string str = string.Format($@"
INSERT INTO dbo.BosBonusParam
        ( BPName, BPMoney, CompanyId )
VALUES  ( '{bonusPar.BPName}', -- BPName - varchar(50)
          '{bonusPar.BPMoney}', -- BPMoney - decimal
          N'{bonusPar.CompanyId}'  -- CompanyId - nvarchar(50)
          )");
                    int num = DbHelperSQL.ExecuteSql(str);
                    if (num > 0)
                    {
                        return "100";
                    }
                    else
                    {
                        return "insert false";
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// 修改奖金参数
        /// </summary>
        /// <returns></returns>
        public string UpdBonusParam(BonusParam bonusPar)
        {
            try
            {
                string strSql = string.Format($@"
         UPDATE dbo.BosBonusParam SET  BPName='{bonusPar.BPName}',BPMoney='{bonusPar.BPMoney}' WHERE BonusParamId='{bonusPar.BonusParamId}' AND CompanyId='{bonusPar.CompanyId}'");
                int num = DbHelperSQL.ExecuteSql(strSql);
                if (num > 0)
                {
                    return "100";
                }
                else
                {
                    return "update false";
                }
            }
            catch (Exception)
            {

                return "update false";
            }
        }


        /// <summary>
        /// 删除奖金参数
        /// </summary>
        /// <returns></returns>
        public string DelBonusParam(int BonusParId)
        {
            try
            {
                string strSql = string.Format($@"DELETE FROM dbo.BosBonusParam WHERE BonusParamId={BonusParId}");
                int num = DbHelperSQL.ExecuteSql(strSql);
                if (num > 0)
                {
                    return "100";
                }
                else
                {
                    return "delete false";
                }
            }


            catch (Exception)
            {

                return "delete false";
            }
        }



        /// <summary>
        /// 查看奖金参数详情
        /// </summary>
        /// <returns></returns>
        public DataTable GetBonusParam(int BonusParId)
        {
            try
            {
                string str = string.Format($@"SELECT * FROM dbo.BosBonusParam WHERE BonusParamId={BonusParId}");
                DataTable ds = DbHelperSQL.ExecuteDataTable(str);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataTable GetAllBonusParam(string CompanyID)
        {

            try
            {
                string str = string.Format($@"SELECT *,'true' [State] FROM dbo.BosBonusParam WHERE CompanyId='{CompanyID}'");
                DataTable ds = DbHelperSQL.ExecuteDataTable(str);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// 判断参数名是否存在
        /// </summary>
        /// <param name="paramName">参数名称</param>
        /// <returns></returns>
        public bool CheckParamName(string paramName)
        {

            try
            {
                string str = string.Format($@"SELECT * FROM dbo.BosBonusParam WHERE BPName='{paramName}'");
                DataTable ds = DbHelperSQL.ExecuteDataTable(str);
                if (ds.Rows.Count>0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}