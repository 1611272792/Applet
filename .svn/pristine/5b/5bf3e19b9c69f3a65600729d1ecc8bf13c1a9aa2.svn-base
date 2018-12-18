using SUNPN.BONUS.Common;
using SUNPN.BONUS.DALFactory;
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.BLL
{
   public class BonusImpowerBLL
    {
        #region 状态码枚举
        string strSucess = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(0)).ToString();
        string strFail = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(1)).ToString();
        string strOthers = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(2)).ToString();
        #endregion

        #region 定义变量 用户数据访问层
        /// <summary>
        /// 用户数据访问层
        /// </summary>
        private readonly IBonusImpower dal = DataAccess.CreateBonusImpower();

        #endregion

        #region 获取可授权奖金项列表
        /// <summary>
        /// 获取可授权奖金项列表
        /// </summary>
        /// <param name="OpenId">奖金项负责人Id</param>
        /// <returns></returns>
        public string GetCanImpowerList(string OpenId)
        {
            if (string.IsNullOrEmpty(OpenId))
            {
                return "OpenId为空";
            }
            try
            {
                DataTable dtbmes = dal.GetCanImpowerList(OpenId);
                if (dtbmes.Rows.Count >= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "查询失败", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strOthers, ex.Message, "");
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
                string strmes = dal.AddBonusImpower(bi);
                if (strmes == "ok")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", "");
                }
                else if (strmes == "no")
                {
                    return ResponseHandle<object>.GetResult(strFail, "添加失败", "");
                }
                else if (strmes == "nomoney")
                {
                    return ResponseHandle<object>.GetResult(strFail, "被授权金额为空", "");
                }
                else if (strmes=="same")
                {
                    return ResponseHandle<object>.GetResult(strFail, "不需要给自己授权", "");
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strOthers, strmes, "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strOthers, ex.Message, "");
            }
        }

        #endregion

        #region 奖金授权记录
        /// <summary>
        /// 奖金授权记录
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        public string GetBonusRecord(string BonusItemId)
        {
            if (string.IsNullOrEmpty(BonusItemId))
            {
                return "BonusItemId为空";
            }
            try
            {
                DataTable dtbmes = dal.GetBonusRecord(BonusItemId);
                if (dtbmes.Rows.Count >= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "查询失败", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strOthers, ex.Message, "");
            }
        }
        #endregion

        #region 奖金授权详情
        /// <summary>
        /// 奖金授权详情
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        public string GetBonusImpowerList(string BonusItemId,string BImpowerUser)
        {
            //Log.AppLog("id:" + BonusItemId + "user:" + BImpowerUser);
            if (string.IsNullOrEmpty(BonusItemId))
            {
                return "BonusItemId为空";
            }
            if (string.IsNullOrEmpty(BImpowerUser))
            {
                return "BImpowerUser为空";
            }
            try
            {
                DataTable dtbmes = dal.GetBonusImpowerList(BonusItemId, BImpowerUser);
                DataTable dtbcollect=dal.GetBonusImpowerCollect(BonusItemId, BImpowerUser);
                if (dtbmes.Rows.Count >0&&dtbcollect.Rows.Count>0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes,dtbcollect);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strFail, "查询失败", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strOthers, ex.Message, "");
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
        public string GetImpowerListByTime(string BonusItemId, string BImpowerUser, string StartTime, string EndTime)
        {
            if (string.IsNullOrEmpty(BonusItemId))
            {
                return "BonusItemId为空";
            }
            if (string.IsNullOrEmpty(BImpowerUser))
            {
                return "BonusItemId为空";
            }
            if (string.IsNullOrEmpty(StartTime))
            {
                return "StartTime为空";
            }
            if (string.IsNullOrEmpty(EndTime))
            {
                return "EndTime为空";
            }
            try
            {
                DataTable dtbmes = dal.GetImpowerListByTime(BonusItemId, BImpowerUser, StartTime, EndTime);
                if (dtbmes.Rows.Count > 0)
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
                return ResponseHandle<object>.GetResult(strOthers, ex.Message, "");
            }
        }

        #endregion

        #region 收回奖金授权
        /// <summary>
        /// 收回奖金授权
        /// </summary>
        /// <param name="BiId"></param>
        /// <returns></returns>
        public string UpdState(string BiId)
        {
            if (string.IsNullOrEmpty(BiId))
            {
                return "BiId为空";
            }
            try
            {
                string strmes = dal.UpdState(BiId);
                if (strmes == "ok")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", "");
                }
                else if (strmes == "no")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "收回失败", "");
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strSucess, strmes, "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strOthers, ex.Message, "");
            }
        } 
        #endregion

        //#region 日志
        //private void WriteLog(string strmsg)
        //{
        //    strmsg = $"{strmsg}\r\n";
        //    using (FileStream fs = System.IO.File.Open("D:\\Impower-BLL.txt", FileMode.Append, FileAccess.Write, FileShare.Write))
        //    {
        //        byte[] bys = Encoding.Default.GetBytes(strmsg);
        //        fs.Write(bys, 0, bys.Length);
        //        fs.Close();
        //    }
        //}
        //#endregion


    }
}

