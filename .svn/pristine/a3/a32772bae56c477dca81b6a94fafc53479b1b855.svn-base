using SUNPN.BONUS.Common;
using SUNPN.BONUS.Common.PinYin;
using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using SUNPN.BONUS.Model.UserClass.EditUser;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SUNPN.BONUS.Model.DepUser;

namespace SUNPN.BONUS.DAL
{
    public class UserDal : IUser
    {
        #region 注册用户

        //注册用户
        /// <summary>
        /// 注册用户接口
        /// </summary>
        /// <param name="user">用户实体类</param>
        /// <returns></returns>
        public string AddUser(User user)
        {
            //判断用户的CompanyId是否有效
            string validcomsql = string.Format($"SELECT CompanyId FROM dbo.SysCompany WHERE CompanyId='{user.CompanyId}'");
            DataTable validcom = DbHelperSQL.ExecuteDataTable(validcomsql);
            if (validcom.Rows.Count <= 0)
            {
                return "isincom";
            }
            string countsql = string.Format($@"SELECT COUNT(*) Num,UserCount FROM dbo.SysUser INNER JOIN dbo.SysCompany ON SysCompany.CompanyId = SysUser.CompanyId 
WHERE SysUser.CompanyId='{user.CompanyId}'
GROUP BY UserCount");
            DataTable count = DbHelperSQL.ExecuteDataTable(countsql);
            //Log.AppLog("count:"+ count.Rows.Count);
            if (count?.Rows.Count > 0)
            {
                if (int.Parse(count.Rows[0]["Num"].ToString()) >= int.Parse(count.Rows[0]["UserCount"].ToString()))
                {
                    return "outnum";
                }
            }
            else
            {
                return "公司Id无效";
            }

            #region 判断用户注册信息有效性
            //判断此用户OpenId是否已经被注册过
            string isinsql = string.Format($"SELECT OpenId FROM dbo.SysUser WHERE OpenId='{user.OpenId}'");
            DataTable isin = DbHelperSQL.ExecuteDataTable(isinsql);
            if (isin.Rows.Count > 0)
            {
                return "isin";
            }
            //判断公司Id是否为空
            if (user.CompanyId == null || user.CompanyId == "")
            {
                return "nullCompanyId";
            }

            //判断用户的userid是否在同一个公司注册过
            string validusersql = string.Format($"SELECT * FROM dbo.SysUser WHERE UserId='{user.UserId}' AND CompanyId='{user.CompanyId}'");
            DataTable validuser = DbHelperSQL.ExecuteDataTable(validusersql);
            if (validuser.Rows.Count > 0)
            {
                return "isinuser";
            }

            ////验证电话号码有效性
            //if (user.UserPhone != null && user.UserPhone != "")
            //{
            //    string rx = RegexData.RegexPhoneEmail(user.UserPhone);
            //    if (rx != "ok")
            //    {
            //        return "电话号码无效";
            //    }
            //}

            #endregion
            //入职时间
            string Applyfortime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            //拼音简拼
            string jp = Pinyin.GetPy(user.UserName);

            //拼音全拼
            string qp = Pinyin.ConvertQP(user.UserName);
            //插入用户
            #region 插入用户sql
            string addUserSql = string.Format($@"INSERT INTO dbo.SysUser
        ( OpenId ,
          UserId ,
          UserName ,
          UserPwd ,
          UserPhone ,
          Photo ,
          Sex ,
          Birth ,
          JoinDate ,
          IsOut ,
          SpellJp ,
          SpellQp ,
          DepId ,
          PostId ,
          CompanyId ,
          RoleId,
          Applyfortime,
          UserEmail
        )
VALUES  ( '{user.OpenId}' ,
          '{user.UserId}' ,
          '{user.UserName}' ,
          '{user.UserPwd}' ,
          '{user.UserPhone}' ,
          '{user.Photo}' ,
          {user.Sex} ,
          '{user.Birth}' ,
          null ,
          3 ,
          '{jp}' ,
          '{qp}' ,
          null ,
          null ,
          '{user.CompanyId}' ,
          null,
         '{Applyfortime}',
         '{user.UserEmail}'
        )");
            #endregion
            try
            {
                //Log.AppLog(addUserSql);
                int add = DbHelperSQL.ExecuteSql(addUserSql);
                if (add > 0)
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

        #region 注册用户
        //注册用户
        /// <summary>
        /// 注册用户接口
        /// </summary>
        /// <param name="user">用户实体类</param>
        /// <returns></returns>
        public string AddUser2(User user)
        {
            string CompanyId;
            string CompanyIdsql = string.Format($"SELECT * FROM dbo.SysCompany WHERE OpenId='{user.OpenId}'");
            DataTable Company = DbHelperSQL.ExecuteDataTable(CompanyIdsql);
            if (Company?.Rows.Count > 0)
            {
                CompanyId = Company.Rows[0]["CompanyId"].ToString();
            }
            else
            {
                CompanyId = null;
            }

            #region 判断用户注册信息有效性
            //判断此用户OpenId是否已经被注册过
            string isinsql = string.Format($"SELECT OpenId FROM dbo.SysUser WHERE OpenId='{user.OpenId}'");
            DataTable isin = DbHelperSQL.ExecuteDataTable(isinsql);
            if (isin.Rows.Count > 0)
            {
                return "isin";
            }
            //判断公司Id是否为空
            if (CompanyId == null || CompanyId == "")
            {
                return "nullCompanyId";
            }
            //判断用户的CompanyId是否有效
            string validcomsql = string.Format($"SELECT CompanyId FROM dbo.SysCompany WHERE CompanyId='{CompanyId}'");
            DataTable validcom = DbHelperSQL.ExecuteDataTable(validcomsql);
            if (validcom.Rows.Count <= 0)
            {
                return "isincom";
            }
            //判断用户的userid是否在同一个公司注册过
            string validusersql = string.Format($"SELECT * FROM dbo.SysUser WHERE UserId='{user.UserId}' AND CompanyId='{CompanyId}'");
            DataTable validuser = DbHelperSQL.ExecuteDataTable(validusersql);
            if (validuser.Rows.Count > 0)
            {
                return "isinuser";
            }
            //验证电话号码有效性
            string rx = RegexData.RegexPhoneEmail(user.UserPhone);
            if (rx != "ok")
            {
                return "PhoneNumber is false";
            }
            #endregion
            //入职时间
            string Applyfortime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            //拼音简拼
            string jp = Pinyin.GetPy(user.UserName);

            //拼音全拼
            string qp = Pinyin.ConvertQP(user.UserName);

            //插入用户
            #region 插入用户sql
            string addUserSql = string.Format($@"INSERT INTO dbo.SysUser
        ( OpenId ,
          UserId ,
          UserName ,
          UserPwd ,
          UserPhone ,
          Photo ,
          Sex ,
          Birth ,
          JoinDate ,
          IsOut ,
          SpellJp ,
          SpellQp ,
          DepId ,
          PostId ,
          CompanyId ,
          RoleId,
          Applyfortime
        )
VALUES  ( '{user.OpenId}' ,
          '{user.UserId}' ,
          '{user.UserName}' ,
          '{user.UserPwd}' ,
          '{user.UserPhone}' ,
          '{user.Photo}' ,
          {user.Sex} ,
          '{user.Birth}' ,
          null ,
          3 ,
          '{jp}' ,
          '{qp}' ,
          null ,
          null ,
          '{CompanyId}' ,
          null,
         '{Applyfortime}'
        )");
            #endregion
            try
            {
                //Log.AppLog(addUserSql);
                int add = DbHelperSQL.ExecuteSql(addUserSql);
                if (add > 0)
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

        #region 判断用户是否注册过
        /// <summary>
        /// 根据OpenId判断用户是否注册
        /// </summary>
        /// <param name="OpenId">用户OpenId</param>
        /// <returns></returns>
        public string CheckReg(string OpenId)
        {
            try
            {
                if (string.IsNullOrEmpty(OpenId))
                {
                    return "OpenId为空";
                }
                //判断用户所在公司是否有效
                string IsValidsql = string.Format($"SELECT * FROM dbo.SysCompany WHERE CompanyId=(SELECT CompanyId FROM dbo.SysUser WHERE OpenId='{OpenId}')");
                DataTable isvalid = DbHelperSQL.ExecuteDataTable(IsValidsql);
                if (isvalid?.Rows.Count > 0)
                {
                    //判断时间是否过期
                    if (isvalid.Rows[0].Field<DateTime?>("EndTime") < DateTime.Now)
                    {
                        string relationsql = string.Format($"SELECT Name,Phone FROM dbo.SysParams WHERE TypeId=1");
                        DataTable relation = DbHelperSQL.ExecuteDataTable(relationsql);
                        if (relation.Rows.Count > 0)
                        {
                            return relation.Rows[0]["Name"].ToString() + "," + relation.Rows[0]["Phone"].ToString();
                        }
                        else
                        {
                            return "暂无信息";
                        }
                    }
                    //如果没过期再判断是否状态
                    else if (isvalid.Rows[0].Field<DateTime?>("EndTime") >= DateTime.Now)
                    {
                        //Log.AppLog("    OpenId:"+OpenId);
                        //判断此用户OpenId是否已经被注册过
                        string isinsql = string.Format($"SELECT OpenId,IsOut FROM dbo.SysUser WHERE OpenId='{OpenId}'");
                        //Log.AppLog(isinsql);
                        DataTable isin = DbHelperSQL.ExecuteDataTable(isinsql);
                        if (isin.Rows.Count > 0)
                        {
                            if (isin.Rows[0]["IsOut"].ToString() == "0")
                            {
                                //已在职
                                return "ok";
                            }
                            if (isin.Rows[0]["IsOut"].ToString() == "1")
                            {
                                //已离职
                                return "out";
                            }
                            if (isin.Rows[0]["IsOut"].ToString() == "2")
                            {
                                //已注销系统
                                return "del";
                            }
                            if (isin.Rows[0]["IsOut"].ToString() == "3")
                            {
                                //已注册未通过
                                return "isin";
                            }
                            else
                            {
                                return "bug";
                            }
                        }
                        else
                        {
                            return "no";
                        }
                    }
                    else
                    {
                        return "未知错误";
                    }
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

        #region 修改用户
        #region 管理员修改用户
        /// <summary>
        /// 管理员可修改的用户信息
        /// </summary>
        /// <param name="meuser">管理员可修改的用户信息类</param>
        /// <returns></returns>
        public string UpdMUser(MEditUser meuser)
        {
            try
            {
                if (string.IsNullOrEmpty(meuser.OpenId))
                {
                    return "OpenId is Null";
                }
                //拼音简拼
                meuser.SpellJp = Pinyin.GetPy(meuser.UserName);
                //拼音全拼
                meuser.SpellQp = Pinyin.ConvertQP(meuser.UserName).Replace(" ", "");
                string editUserSql = string.Format($"UPDATE	dbo.SysUser SET UserName='{meuser.UserName}',SpellJp='{meuser.SpellJp}',SpellQp='{meuser.SpellQp}', JoinDate='{meuser.JoinDate}',IsOut='{meuser.IsOut}',DepId='{meuser.DepId}',PostId='{meuser.PostId}',RoleId='{meuser.RoleId}' WHERE OpenId='{meuser.OpenId}'");
                int editUser = DbHelperSQL.ExecuteSql(editUserSql);
                if (editUser > 0)
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

        #region 自己修改用户
        /// <summary>
        /// 自己可修改的用户信息
        /// </summary>
        /// <param name="ieuser">自己可以修改的用户信息类</param>
        /// <returns></returns>
        public string UpdIUser(IEditUser ieuser)
        {
            try
            {
                if (string.IsNullOrEmpty(ieuser.OpenId))
                {
                    return "OpenId为空";
                }
                //拼音简拼
                ieuser.SpellJp = Pinyin.GetPy(ieuser.UserName);
                //拼音全拼
                ieuser.SpellQp = Pinyin.ConvertQP(ieuser.UserName).Replace(" ", "");
                string editUserSql = string.Format($"UPDATE dbo.SysUser SET UserName='{ieuser.UserName}',UserPwd='{ieuser.UserPwd}',Photo='{ieuser.Photo}',Sex='{ieuser.Sex}',Birth='{ieuser.Birth}',SpellJp='{ieuser.SpellJp}',SpellQp='{ieuser.SpellQp}',UserEmail='{ieuser.UserEmail}' WHERE OpenId='{ieuser.OpenId}'");
                //Log.AppLog(editUserSql);
                int editUser = DbHelperSQL.ExecuteSql(editUserSql);
                if (editUser > 0)
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
        #endregion

        #region 修改logo
        /// <summary>
        /// 修改logo
        /// </summary>
        /// <param name="ieuser"></param>
        /// <returns></returns>
        public string UpdLogo(IEditUser ieuser)
        {
            if (string.IsNullOrEmpty(ieuser.OpenId))
            {
                return "OpenId为空";
            }
            try
            {
                string editUserSql = string.Format($"UPDATE dbo.SysUser SET Photo='{ieuser.Photo}' WHERE OpenId='{ieuser.OpenId}'");
                //Log.AppLog(editUserSql);
                int editUser = DbHelperSQL.ExecuteSql(editUserSql);
                if (editUser > 0)
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

        #region 修改个人基本信息
        /// <summary>
        /// 修改个人基本信息
        /// </summary>
        /// <param name="ieuser"></param>
        /// <returns></returns>
        public string UpdBaseInfo(IEditUser ieuser)
        {
            if (string.IsNullOrEmpty(ieuser.OpenId))
            {
                return "OpenId为空";
            }
            try
            {
                string editUserSql = string.Format($"UPDATE dbo.SysUser SET UserPhone='{ieuser.UserPhone}', Sex='{ieuser.Sex}',Birth='{ieuser.Birth}',UserEmail='{ieuser.UserEmail}' WHERE OpenId='{ieuser.OpenId}'");
                //Log.AppLog(editUserSql);
                int editUser = DbHelperSQL.ExecuteSql(editUserSql);
                if (editUser > 0)
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

        #region 根据OpenId获取用户信息
        /// <summary>
        /// 根据OpenId获取用户信息
        /// </summary>
        /// <param name="OpenId">用户OpenId</param>
        /// <returns></returns>
        public DataTable GetUserInfo(string OpenId)
        {
            if (string.IsNullOrEmpty(OpenId))
            {
                return null;
            }
            try
            {
                string infosql = string.Format($@"SELECT dbo.SysUser.OpenId,UserId,UserName,UserPwd,UserPhone,Photo,Sex,CONVERT(VARCHAR(200),Birth,20) Birth,CONVERT(VARCHAR(200),JoinDate,20) JoinDate,IsOut,dbo.SysUser.SpellJp,dbo.SysUser.SpellQp,dbo.SysUser.DepId,DepName,dbo.SysUser.PostId,PostName,dbo.SysUser.CompanyId,RoleId,Applyfortime,UserEmail FROM dbo.SysUser
LEFT JOIN dbo.SysDepart ON SysDepart.DepId = SysUser.DepId
LEFT JOIN dbo.SysPosition ON SysPosition.PostId = SysUser.PostId WHERE dbo.SysUser.OpenId='{OpenId}'");
                DataTable info = DbHelperSQL.ExecuteDataTable(infosql);
                return info;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region 删除用户
        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="OpenId">用户OpenId唯一标识</param>
        /// <returns>返回结果</returns>
        public string DelUser(string OpenId)
        {
            //Log.AppLog("OpenId:" + OpenId);
            if (string.IsNullOrEmpty(OpenId))
            {
                return "OpenId为空";
            }
            else
            {
                try
                {
                    string delUserSql = string.Format($"DELETE FROM dbo.SysUser WHERE OpenId='{OpenId}'");
                    //Log.AppLog("delsql:"+delUserSql);
                    int deluser = DbHelperSQL.ExecuteSql(delUserSql);
                    if (deluser > 0)
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
        }
        #endregion

        #region 查询要进入我们公司的人
        /// <summary>
        /// 查询要进入我们公司的人
        /// </summary>
        /// <param name="CompanyId">公司ID</param>
        /// <param name="IsOut">离职状态(0不离职；1离职；2注销系统，3已注册未通过)</param>
        /// <returns>返回DataTable</returns>
        public DataTable GetWaitUser(string CompanyId, string IsOut)
        {
            try
            {
                if (string.IsNullOrEmpty(CompanyId))
                {
                    return null;
                }
                if (string.IsNullOrEmpty(IsOut))
                {
                    return null;
                }
                string waitsql = string.Format($"SELECT UserId,UserName,Sex,Photo,Birth,OpenId FROM dbo.SysUser WHERE CompanyId='{CompanyId}' AND IsOut='{IsOut}'");
                DataTable wait = DbHelperSQL.ExecuteDataTable(waitsql);
                return wait;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 测试使用
        public List<DepUser> GetAllUser(string CompanyId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            string pusersql = string.Format($"SELECT DepId,DepName FROM dbo.SysDepart WHERE Pid=0 and CompanyId='{CompanyId}'");
            DataTable pser = DbHelperSQL.ExecuteDataTable(pusersql);
            List<DepUser> ldu = new List<DepUser>();
            if (pser.Rows.Count > 0)
            {
                for (int i = 0; i < pser.Rows.Count; i++)
                {

                    DepUser du = new DepUser();
                    //部门Id
                    du.DepId = pser.Rows[i]["DepId"].ToString();
                    //部门名称
                    du.DepName = pser.Rows[i]["DepName"].ToString();
                    //部门人数
                    #region 部门人数查询语句
                    string pnumsql = string.Format($@"with T as(
    select DepId from dbo.SysDepart WHERE DepId = '{pser.Rows[i]["DepId"].ToString()}' and CompanyId = '{CompanyId}'
    union all
    select D.DepId from dbo.SysDepart D, T
    where D.Pid = T.DepId  AND CompanyId = '{CompanyId}'
)
SELECT COUNT(*) Num FROM dbo.SysUser WHERE DepId IN
(SELECT DepId from T) AND CompanyId = '{CompanyId}'");
                    #endregion
                    DataTable pnum = DbHelperSQL.ExecuteDataTable(pnumsql);
                    if (pnum.Rows.Count > 0)
                    {
                        du.UserNum = pnum.Rows[0][0].ToString();
                    }
                    else
                    {
                        du.UserNum = null;
                    }
                    //部门人员信息
                    #region 部门人员信息查询语句
                    string userdatasql = string.Format($@"with T as(
    select DepId from dbo.SysDepart WHERE DepId = '{pser.Rows[i]["DepId"].ToString()}' and CompanyId = '{CompanyId}'
    union all
    select D.DepId from dbo.SysDepart D, T
    where D.Pid = T.DepId  AND CompanyId = '{CompanyId}'
)
SELECT OpenId,UserName FROM dbo.SysUser WHERE DepId IN
(SELECT DepId from T) AND CompanyId = '{CompanyId}'");
                    #endregion
                    DataTable userdata = DbHelperSQL.ExecuteDataTable(userdatasql);
                    List<UserData> lud = new List<UserData>();
                    if (userdata.Rows.Count > 0)
                    {
                        for (int j = 0; j < userdata.Rows.Count; j++)
                        {
                            UserData udata = new UserData();
                            udata.OpenId = userdata.Rows[j]["OpenId"].ToString();
                            udata.UserName = userdata.Rows[j]["UserName"].ToString();
                            lud.Add(udata);
                        }
                    }
                    du.userdata = lud;
                    ldu.Add(du);
                }
                return ldu;
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 员工管理--获取父级部门列表
        /// <summary>
        /// 员工管理--获取父级部门列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public List<ParList> GetParList(string CompanyId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            string pusersql = string.Format($"SELECT Pid,DepId,DepName FROM dbo.SysDepart WHERE Pid=0 and CompanyId='{CompanyId}'");
            DataTable pser = DbHelperSQL.ExecuteDataTable(pusersql);
            List<ParList> lpl = new List<ParList>();
            if (pser.Rows.Count > 0)
            {
                for (int i = 0; i < pser.Rows.Count; i++)
                {
                    try
                    {

                        ParList pl = new ParList();
                        //父级部门Id
                        pl.Pid = pser.Rows[i]["Pid"].ToString();
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
SELECT COUNT(*) Num FROM dbo.SysUser WHERE DepId IN
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
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
                return lpl;
            }
            else
            {
                return null;
            }
        }

        #endregion

        /// <summary>
        /// 获取本公司没有部门的员工
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public DataTable GetNoDepartInfo(string CompanyId)
        {
            string sql = string.Format($"SELECT * FROM dbo.SysUser LEFT JOIN dbo.SysDepart ON SysDepart.DepId=SysUser.DepId WHERE SysDepart.DepId IS NULL AND dbo.SysUser.CompanyId='{CompanyId}'");
            DataTable dt = DbHelperSQL.ExecuteDataTable(sql);
            if (dt?.Rows.Count > 0)
            {
                return dt;
            }
            else
            {
                return null;
            }
        }

        #region 员工管理--根据公司Id和部门Id查询其对应的所有子部门列表
        /// <summary>
        /// 员工管理--根据部门Id查询其对应的所有员工列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        public List<ParList> GetChildList(string CompanyId, string DepId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            if (string.IsNullOrEmpty(DepId))
            {
                return null;
            }
            string pusersql = string.Format($"SELECT Pid,DepId,DepName FROM dbo.SysDepart WHERE Pid='{DepId}' and CompanyId='{CompanyId}'");
            DataTable pser = DbHelperSQL.ExecuteDataTable(pusersql);
            List<ParList> lpl = new List<ParList>();
            if (pser.Rows.Count > 0)
            {
                for (int i = 0; i < pser.Rows.Count; i++)
                {
                    try
                    {
                        ParList pl = new ParList();
                        //父级部门Id
                        pl.Pid = pser.Rows[i]["Pid"].ToString();
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
SELECT COUNT(*) Num FROM dbo.SysUser WHERE DepId IN
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
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
                return lpl;
            }
            else
            {
                return null;
            }
        }
        #endregion

        #region 员工管理--根据公司Id和部门Id查询其对应的所有员工列表
        /// <summary>
        /// 员工管理--根据工具公司Id和部门Id查询其对应的所有员工列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        public DataTable GetUserList(string CompanyId, string DepId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return null;
            }
            if (string.IsNullOrEmpty(DepId))
            {
                return null;
            }
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
SELECT DepId,OpenId,UserName,Photo FROM dbo.SysUser WHERE DepId IN
(SELECT DepId from T) AND CompanyId = '{CompanyId}'");
                #endregion
                DataTable userdata = DbHelperSQL.ExecuteDataTable(userdatasql);
                return userdata;
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
        //    using (FileStream fs = System.IO.File.Open("D:\\UserDal.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion
    }
}
