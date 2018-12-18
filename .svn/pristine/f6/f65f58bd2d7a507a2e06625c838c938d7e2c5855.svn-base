using SUNPN.BONUS.Common;
using SUNPN.BONUS.DALFactory;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.BLL
{
   public class ClientBLL
    {
        private readonly IClient dal = DataAccess.CreateClient();
        string strSucess = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(0)).ToString();
        string strFail = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(1)).ToString();
        string strError = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(2)).ToString();
        #region 全部公司信息
        /// <summary>
        /// 全部公司信息
        /// </summary>
        /// <returns></returns>
        public string GetAllList()
        {
            List<DataTable> all = dal.GetAllList();
            try
            {
                if (all != null)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", all[0],all[1],all[2]);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "暂无数据", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, "");
            }
        }
        #endregion

        #region 审核公司
        /// <summary>
        /// 审核公司
        /// </summary>
        /// <returns></returns>
        public string UpdPassState(string CompanyId,string UserCount,string EndTime)
        {
            string strmes = dal.UpdPassState(CompanyId,UserCount,EndTime);
            try
            {
                if (strmes =="ok")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "审核通过","");
                }
                else if (strmes == "no")
                {
                    return ResponseHandle<object>.GetResult(strFail, "审核未通过", "");
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, strmes, "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, "");
            }
        }
        #endregion

        #region 获取公司信息
        /// <summary>
        /// 获取公司信息
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public string GetCompanyInfo(string CompanyId)
        {
            DataTable dtbmes = dal.GetCompanyInfo(CompanyId);
            try
            {
                if (dtbmes?.Rows.Count > 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "暂无数据", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, "");
            }

        } 
        #endregion

        //#region 日志
        //private void WriteLog(string strmsg)
        //{
        //    strmsg = $"{strmsg}\r\n";
        //    using (FileStream fs = System.IO.File.Open("D:\\Client_BLL.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion

    }
}
