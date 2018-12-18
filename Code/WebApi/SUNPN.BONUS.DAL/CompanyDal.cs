﻿using SUNPN.BONUS.DBUtility;
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
using SUNPN.BONUS.Common.PinYin;

namespace SUNPN.BONUS.DAL
{
    class CompanyDal : ICompany
    {

        /// <summary>
        /// 注册公司
        /// </summary>
        public string RegCompany(Company company)
        {
            if (CheckPeople(company.OpenId, company.CompanyID))
            {
                return "该负责人拥有其他公司";
            }
            //string rx = RegexData.RegexPhoneEmail(company.CompanyPhone, company.CompanyEmail);//公司验证
            string userRx = RegexData.RegexPhoneEmail(company.UserPhone);//用户验证
            string jp = "";
            string qp  = "";//全简拼音
            if (!string.IsNullOrWhiteSpace(company.UserName))
            {
                  jp = Pinyin.GetPy(company.UserName);
                  qp = Pinyin.ConvertQP(company.UserName);
            }
           
            if (userRx=="ok")
            {
                try
                {
                    string sqlstr = string.Format($@"exec AddRegCompany @CompanyName='{company.CompanyName}',@OpenId='{company.OpenId}',@CompanyEmail='{company.CompanyEmail}',
                    @CompanyPhone='{company.CompanyPhone}',@ComPhoto='{company.ComPhoto}',@UserName='{company.UserName}',@UserPwd='{company.UserPwd}',@UserZh='{company.UserZh}',
                    @UserPhoto='{company.UserPhoto}',@UserPhone='{company.UserPhone}',@Sex='{company.Sex}',@Birth='{company.Birth}',
                    @SpellJp='{jp}',@SpellQp='{qp}'");

                    string info = DbHelperSQL.EditDataCommand(sqlstr);
                    if (info == "0")
                    {
                        return "100";
                    }
                    else
                    {
                        return "添加失败";
                    }
                }
                catch (Exception ex)
                {

                    return ex.Message;
                }
            }
            else
            {
                return userRx;
            }

        }

        /// <summary>
        /// 显示公司信息
        /// </summary>
        public DataTable ShowCompany(string openid)
        {
            try
            {
                string strSql = string.Format($@"SELECT  SysCompany.CompanyId ,
        CompanyName ,
        SysCompany.OpenId ,
        ComPhoto ,
        RegTime ,
        EndTime ,
        UserCount ,
        CompanyPhone ,
        CompanyEmail,dbo.SysUser.UserName FROM dbo.SysCompany INNER JOIN dbo.SysUser ON SysCompany.OpenId=SysUser.OpenId WHERE SysCompany.OpenId='{openid}'");//WHERE SysCompany.CompanyId='{companyID}'
                //Log.AppLog(strSql);
                DataTable showCom = DbHelperSQL.ExecuteDataTable(strSql.ToString());
                if (showCom?.Rows.Count>0)
                {
                    if (showCom.Rows[0]["OpenId"].ToString() == openid)
                    {
                        return showCom;
                    }
                    else
                    {
                        return null; 
                    }
                }
               
                else
                {
                    return null;
                }
             
            }
            catch (Exception)
            {
                return null;
            }


        }

        /// <summary>
        /// 修改公司
        /// </summary>
        public string UpdateCompany(Company company)
        {
            if (CheckPeople(company.OpenId, company.CompanyID))
            {
                return "该负责人拥有其他公司";
            }
            //string rx = RegexData.RegexPhoneEmail(company.CompanyPhone, company.CompanyEmail);
            //if (rx == "ok")
            //{
                try
                {
                    string strSql = string.Format($@"UPDATE  dbo.SysCompany 
SET CompanyName='{company.CompanyName}',ComPhoto='{company.ComPhoto}',OpenId='{company.OpenId}' 
WHERE CompanyId='{company.CompanyID}'");//CompanyPhone='{ company.CompanyPhone}',CompanyEmail='{ company.CompanyEmail}',
                Log.AppLog(strSql);
                    int num = DbHelperSQL.ExecuteSql(strSql.ToString());
                    if (num > 0)
                    {
                        return "100";
                    }
                    else
                    {
                        return "更新失败";
                    }
                }
                catch (Exception ex)
                {

                    return ex.Message;
                }
            //}
            //else
            //{
            //    return rx;
            //}

        }

        /// <summary>
        /// 修改公司不包括图片
        /// </summary>
        public string UpdateComNoLog(Company company)
        {
            if (CheckPeople(company.OpenId,company.CompanyID))
            {
                return "该负责人拥有其他公司";
            }
            //string rx = RegexData.RegexPhoneEmail(company.CompanyPhone, company.CompanyEmail);
            //if (rx == "ok")
            //{
                try
                {//,CompanyPhone='{ company.CompanyPhone}',CompanyEmail='{ company.CompanyEmail}'
                    string strSql = string.Format($@"UPDATE  dbo.SysCompany 
SET CompanyName='{company.CompanyName}',OpenId='{company.OpenId}' 
WHERE CompanyId='{company.CompanyID}'");
                    //Log.AppLog(strSql);
                    int num = DbHelperSQL.ExecuteSql(strSql.ToString());
                    if (num > 0)
                    {
                        return "100";
                    }
                    else
                    {
                        return "修改失败";
                    }
                }
                catch (Exception ex)
                {

                    return ex.Message;
                }
            //}
            //else
            //{
            //    return rx;
            //}

        }

        /// <summary>
        /// 根据openid删除公司
        /// </summary>
        /// <param name="OpenId"></param>
        /// <returns></returns>
       public string DelCompany(string OpenId) {
        
                string sqls = string.Format($"DELETE FROM dbo.SysCompany WHERE OpenId='{OpenId}'");
                int num = DbHelperSQL.ExecuteSql(sqls);
                if (num>0)
                {
                    return "100";
                }
                else
                {
                    return "delete false";
                }
              
            
          
        }

        //#region 日志
        //private void WriteLog(string strmsg)
        //{
        //    strmsg = $"{strmsg}\r\n";
        //    using (FileStream fs = System.IO.File.Open("D:\\测试177-hbuilder.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion

        /// <summary>
        /// 验证公司负责人是否已拥有其他公司
        /// </summary>
        /// <param name="openID"></param>
        /// <returns></returns>
        public bool CheckPeople(string openID,string companyID) {
            string sql = string.Format($"SELECT OpenId FROM dbo.SysCompany WHERE CompanyId='{companyID}'  AND OpenId='{openID}'");
            DataTable ds = DbHelperSQL.ExecuteDataTable(sql);
            if (ds.Rows.Count>0)
            {
                return false;
            }
            else
            { 
                string checkPeopel = string.Format($@"SELECT * FROM dbo.SysCompany WHERE OpenId='{openID}'");
                DataTable cpdt = DbHelperSQL.ExecuteDataTable(checkPeopel);
                if (cpdt.Rows.Count > 0)
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
}
