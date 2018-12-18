﻿using SUNPN.BONUS.Common.PinYin;
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
   public class PositionDAL:IPosition
    {
        /// <summary>
        /// 添加职位
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        public string AddPosition(Position pos) {

            try
            {
                if (isSameName(pos.PostName, pos.CompanyId))
                {
                    return "职位名不能相同";
                }
                string str = string.Format($@"INSERT INTO dbo.SysPosition
        (  
          PostName ,
          CompanyId ,
          DepId ,
          Remake
        )
VALUES  ( 
          N'{pos.PostName}' , -- PostName - nvarchar(50)
          N'{pos.CompanyId}' , -- CompanyId - nvarchar(50)
          {pos.DepId} , -- DepId - int
          N'{pos.Remake}'  -- Remake - nvarchar(50)
        )");
                int num = DbHelperSQL.ExecuteSql(str);
                if (num > 0)
                {
                    return "100";
                }
                else
                {
                    return "插入失败";
                }

            }
            catch (Exception e)
            {
                return e.Message;
            }

          
        }

        /// <summary>
        /// 修改职位
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
     public   string UpdPosition(Position pos) {
            try
            {
                string strSql = string.Format($@"
          UPDATE dbo.SysPosition
          SET PostName='{pos.PostName}',DepId={pos.DepId},Remake='{pos.Remake}'  WHERE PostId={pos.PostId}");
                int num = DbHelperSQL.ExecuteSql(strSql);
                if (num > 0)
                {
                    return "100";
                }
                else
                {
                    return "修改失败";
                }
            }
            catch (Exception e)
            {

                return e.Message;
            }
           
        }

        /// <summary>
        /// 删除职位
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
    public  string DelPosition(int posID) {
            try
            {
                    string strSql = string.Format($@"DELETE FROM dbo.SysPosition WHERE PostId={posID}");
                    int num = DbHelperSQL.ExecuteSql(strSql);
                    if (num > 0)
                    {
                    string s = string.Format($"UPDATE dbo.SysUser SET PostId=NULL WHERE PostId={posID}");
                    DbHelperSQL.ExecuteSql(s);
                    return "100";
                    }
                    else
                    {
                        return "删除失败";
                    }
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }


        /// <summary>
        /// 获取编辑职位信息
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        public DataTable GetPosition(int posID)
        {
            try
            {
                string strSql = string.Format($@"select PostId,PostName,SysDepart.CompanyId,SysDepart.DepId,DepName,Remake FROM dbo.SysPosition
LEFT JOIN dbo.SysDepart ON SysDepart.DepId=SysPosition.DepId
 WHERE PostId={posID}");
                DataTable ds = DbHelperSQL.ExecuteDataTable(strSql);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        #region 获取父级部门列表
        /// <summary>
        /// 员工管理--获取父级部门列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public List<ParList> GetParList(string CompanyId)
        {
            string pusersql = string.Format($"SELECT DepId,DepName FROM dbo.SysDepart WHERE Pid=0 and CompanyId='{CompanyId}'");
            DataTable pser = DbHelperSQL.ExecuteDataTable(pusersql);
            List<ParList> lpl = new List<ParList>();
            if (pser.Rows.Count > 0)
            {
                for (int i = 0; i < pser.Rows.Count; i++)
                {

                    ParList pl = new ParList();
                    //部门Id
                    pl.DepId = pser.Rows[i]["DepId"].ToString();
                    //部门名称
                    pl.DepName = pser.Rows[i]["DepName"].ToString();
                    //职位数量
                    #region 部门人数查询语句
                    string pnumsql = string.Format($@"with T as(
    select DepId from dbo.SysDepart WHERE DepId = '{pser.Rows[i]["DepId"].ToString()}' and CompanyId = '{CompanyId}'
    union all
    select D.DepId from dbo.SysDepart D, T
    where D.Pid = T.DepId  AND CompanyId = '{CompanyId}'
)
SELECT COUNT(*) Num FROM dbo.SysPosition WHERE DepId IN
(SELECT DepId from T) AND CompanyId = '{CompanyId}'");
                    #endregion
                    DataTable pnum = DbHelperSQL.ExecuteDataTable(pnumsql);
                    if (pnum.Rows.Count > 0)
                    {
                        pl.UserNum = pnum.Rows[0][0].ToString();
                    }
                    else
                    {
                        pl.UserNum = null;
                    }
                    lpl.Add(pl);
                }
                return lpl;
            }
            else
            {
                return null;
            }
        }

        #endregion


        #region 根据部门Id查询其对应的所有子部门列表
       
        public List<ParList> GetChildList(string CompanyId, string DepId)
        {
            string pusersql = string.Format($"SELECT DepId,DepName FROM dbo.SysDepart WHERE Pid='{DepId}' and CompanyId='{CompanyId}'");
            DataTable pser = DbHelperSQL.ExecuteDataTable(pusersql);
            List<ParList> lpl = new List<ParList>();
            if (pser.Rows.Count > 0)
            {
                for (int i = 0; i < pser.Rows.Count; i++)
                {

                    ParList pl = new ParList();
                    //部门Id
                    pl.DepId = pser.Rows[i]["DepId"].ToString();
                    //部门名称
                    pl.DepName = pser.Rows[i]["DepName"].ToString();
                    //部门人数
                    #region 部门人数查询语句
                    string pnumsql = string.Format($@"with T as(
    select DepId from dbo.SysDepart WHERE DepId = '{pser.Rows[i]["DepId"].ToString()}' and CompanyId = '{CompanyId}'
    union all
    select D.DepId from dbo.SysDepart D, T
    where D.Pid = T.DepId  AND CompanyId = '{CompanyId}'
)
SELECT COUNT(*) Num FROM dbo.SysPosition WHERE DepId IN
(SELECT DepId from T) AND CompanyId = '{CompanyId}'");
                    #endregion
                    DataTable pnum = DbHelperSQL.ExecuteDataTable(pnumsql);
                    if (pnum.Rows.Count > 0)
                    {
                        pl.UserNum = pnum.Rows[0][0].ToString();
                    }
                    else
                    {
                        pl.UserNum = null;
                    }
                    lpl.Add(pl);
                }
                return lpl;
            }
            else
            {
                return null;
            }
        }
        #endregion


        #region 根据部门Id查询其对应的所有职位列表
        /// <summary>
        /// 员工管理--根据部门Id查询其对应的所有职位列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        public DataTable GetPosList(string CompanyId, string DepId)
        {
            //部门人员信息
            try
            {
                #region 部门人员信息查询语句
                string userdatasql = string.Format($@"with T as(
    select DepId from dbo.SysDepart WHERE DepId = '{DepId}' and CompanyId = '{CompanyId}'
    union all
    select D.DepId from dbo.SysDepart D, T
    where D.Pid = T.DepId  AND CompanyId = '{CompanyId}'
)
SELECT * FROM dbo.SysPosition WHERE DepId IN
(SELECT DepId from T) AND CompanyId = '{CompanyId}'");
                #endregion
                DataTable userdata = DbHelperSQL.ExecuteDataTable(userdatasql);
                return userdata;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        /// <summary>
        /// 获取无部门的职位
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
       public DataTable GetNoDepPos(string CompanyId)
        {
            try
            {
                string sql = string.Format($"SELECT * FROM dbo.SysPosition WHERE DepId=0 AND CompanyId='{CompanyId}'");
                DataTable ds = DbHelperSQL.ExecuteDataTable(sql);
                return ds;

            }
            catch (Exception)
            {

                return null;
            }


        }

        /// <summary>
        /// 判断职位名称是否一样
        /// </summary>
        /// <param name="depName"></param>
        /// <returns></returns>
        public bool isSameName(string posName,string CompanyId)
        {
            string sql = string.Format($"SELECT * FROM  dbo.SysPosition WHERE PostName='{posName}' and CompanyId='{CompanyId}'");
            DataTable ds = DbHelperSQL.ExecuteDataTable(sql);
            if (ds.Rows.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }


         
  
    }
}
