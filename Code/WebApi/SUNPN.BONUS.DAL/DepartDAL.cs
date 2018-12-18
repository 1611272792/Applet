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
   public class DepartDAL:IDepart
    {
        /// <summary>
        /// 添加部门
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        public string AddDepart(Depart Dep) {

            if (isSameName(Dep.DepName, Dep.CompanyId))
            {
                return "不能存在相同名字";
            }
            //拼音简拼
            Dep.SpellJp = Pinyin.GetPy(Dep.DepName);

            //拼音全拼
            Dep.SpellQp = Pinyin.ConvertQP(Dep.DepName);
            try
            {
                string str = string.Format($@"
INSERT INTO dbo.SysDepart
        (  
          DepName ,
          CompanyId ,
          OpenId ,
          Pid ,
          SpellJp ,
          SpellQp
        )
VALUES  (  
          N'{Dep.DepName}' , -- DepName - nvarchar(50)
          N'{Dep.CompanyId}' , -- CompanyId - nvarchar(50)
          '{Dep.OpenId}' , -- OpenId - varchar(200)
          {Dep.Pid} , -- Pid - int
          N'{Dep.SpellJp}' , -- SpellJp - nvarchar(50)
          N'{Dep.SpellQp}'  -- SpellQp - nvarchar(200)
        )");
                int num = DbHelperSQL.ExecuteSql(str);
                if (num>0)
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
        /// 修改部门
        /// </summary>
        /// <param name="Dep"></param>
        /// <returns></returns>
        public string UpdDepart(Depart Dep) {
            try
            {
                //拼音简拼
                Dep.SpellJp = Pinyin.GetPy(Dep.DepName);

                //拼音全拼
                Dep.SpellQp = Pinyin.ConvertQP(Dep.DepName);
                string strSql = string.Format($@"
          UPDATE dbo.SysDepart 
          SET DepName='{Dep.DepName}',OpenId='{Dep.OpenId}',pid={Dep.Pid},SpellJp='{Dep.SpellJp}',SpellQp='{Dep.SpellQp}' WHERE DepId={Dep.DepId}");
                int num = DbHelperSQL.ExecuteSql(strSql);
                Log.AppLog("SendBonus-Dal.txt"+strSql);
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
        /// 删除部门
        /// </summary>
        /// <param name="DepID"></param>
        /// <returns></returns>
        public string  DelDepart(int DepID) {
            try
            {
            
                //删除部门并删除子部门
                    string strSql = string.Format($@"with cte as 
(
select * from dbo.SysDepart where DepId={DepID}
union all
select SysDepart.* from dbo.SysDepart,cte where SysDepart.Pid=cte.DepId 

)
DELETE from dbo.SysDepart where DepId in(select DepId from cte)");
                    int num = DbHelperSQL.ExecuteSql(strSql);
                    if (num > 0)
                    {
                    string s = string.Format($"UPDATE dbo.SysUser SET DepId=NULL WHERE DepId={DepID}");
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
        /// 显示所有部门
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
       public  DataTable GetDepart(string CompanyID) {
            try
            {
                string str = string.Format($@"SELECT DepId,DepName FROM dbo.SysDepart WHERE CompanyId='{CompanyID}'");
                DataTable ds = DbHelperSQL.ExecuteDataTable(str);
                return ds;
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
         
        }

        /// <summary>
        /// 显示的当前部门信息
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public DataTable GetDepartInfo(int DepartID)
        {
            try
            {
                string str = string.Format($@"
SELECT d.DepName, d.DepId, d.CompanyId, d.Pid, ISNULL(d2.DepName, '无') PidName, UserName, d.OpenId FROM dbo.SysDepart  d
LEFT JOIN dbo.SysUser ON  d.OpenId = SysUser.OpenId
LEFT JOIN dbo.SysDepart d2 ON d.Pid = d2.DepId
WHERE d.DepId = '{DepartID}'");
                DataTable ds = DbHelperSQL.ExecuteDataTable(str);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 显示父级部门
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public DataTable GetParentDepart(string CompanyID)
        {
            try
            {
                //string str = string.Format($@"SELECT DepId,DepName FROM dbo.SysDepart WHERE CompanyId='{CompanyID}' AND Pid=0");

                string str = string.Format($@"    
        SELECT ss.DepId,DepName,ISNULL(ss1.sonCount,0) sonCount,Pid FROM dbo.SysDepart  ss
        Left JOIN(SELECT s.DepId,ISNULL(COUNT(*),0) sonCount FROM dbo.SysDepart s0 INNER JOIN(SELECT DepId,DepName,CompanyId,Pid FROM dbo.SysDepart) s ON s0.pid=s.DepId WHERE s.CompanyId='{CompanyID}' AND s.pid=0   GROUP BY s.DepId) ss1
        ON ss.DepId=ss1.DepId
         WHERE CompanyId='{CompanyID}' AND pid=0");
                DataTable ds = DbHelperSQL.ExecuteDataTable(str);
                return ds;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 显示子部门
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public DataTable GetSonDepart(string CompanyID,int DepartId)
        {
            try
            {
                //string str = string.Format($@"SELECT DepId,DepName FROM dbo.SysDepart WHERE CompanyId='{CompanyID}' AND Pid=0");

                string str = string.Format($@"    
        SELECT ss.DepId,DepName,ISNULL(ss1.sonCount,0) sonCount,Pid FROM dbo.SysDepart  ss
        Left JOIN(SELECT s.DepId,ISNULL(COUNT(*),0) sonCount FROM dbo.SysDepart s0 INNER JOIN(SELECT DepId,DepName,CompanyId,Pid FROM dbo.SysDepart) s ON s0.pid=s.DepId WHERE s.CompanyId='{CompanyID}' AND s.pid={DepartId}   GROUP BY s.DepId) ss1
        ON ss.DepId=ss1.DepId
         WHERE CompanyId='{CompanyID}' AND pid={DepartId}");
                DataTable ds = DbHelperSQL.ExecuteDataTable(str);
                return ds;

            }
            catch (Exception ex)
            {
                throw ex;
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

        /// <summary>
        /// 判断部门名称是否一样
        /// </summary>
        /// <param name="depName"></param>
        /// <returns></returns>
        public bool isSameName(string depName,string companyID) {
            string sql = string.Format($"SELECT * FROM dbo.SysDepart WHERE DepName='{depName}' and  CompanyId='{companyID}'");
            DataTable ds = DbHelperSQL.ExecuteDataTable(sql);
            if (ds.Rows.Count>0)
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
