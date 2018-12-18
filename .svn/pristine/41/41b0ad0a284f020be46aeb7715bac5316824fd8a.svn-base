using SUNPN.BONUS.Common;
using SUNPN.BONUS.DALFactory;
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.BLL
{
    public class BonusItemBLL
    {
        #region 状态码枚举
        string strSucess = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(0)).ToString();
        string strFail = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(1)).ToString();
        string strError = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(2)).ToString();
        #endregion

        #region 定义变量 用户数据访问层
        /// <summary>
        /// 用户数据访问层
        /// </summary>
        private readonly IBonusItem dal = DataAccess.CreateBonusItem();

        #endregion

        #region 添加奖金项
        /// <summary>
        /// 添加奖金项
        /// </summary>
        /// <param name="bi"></param>
        /// <returns></returns>
        public string AddBonusItem(BonusItem bi)
        {
            try
            {

                string strmes = dal.AddBonusItem(bi);
                //WriteLog(mes);
                if (strmes == "ok")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", "");
                }
                else if (strmes == "no")
                {
                    return ResponseHandle<object>.GetResult(strFail, "添加失败", "");
                }
                else if (strmes == "nullCompanyId")
                {
                    return ResponseHandle<object>.GetResult(strFail, "公司Id为空", "");
                }
                else if (strmes == "isincom")
                {
                    return ResponseHandle<object>.GetResult(strFail, "公司Id无效", "");
                }
                else if (strmes == "isinname")
                {
                    return ResponseHandle<object>.GetResult(strFail, "此奖金项名称已在本公司注册", "");
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

        #region 删除奖金项
        /// <summary>
        /// 根据奖金项Id删除奖金项
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        public string DelBonusItem(string BonusItemId)
        {
            if (string.IsNullOrEmpty(BonusItemId))
            {
                return "BonusItemId为空";
            }
            try
            {
                string strmes = dal.DelBonusItem(BonusItemId);
                if (strmes == "ok")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", "");
                }
                else if (strmes == "no")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "删除失败", "");
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strSucess, strmes, "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, "");
            }
        }
        #endregion

        #region 修改奖金项
        /// <summary>
        /// 修改奖金项
        /// </summary>
        /// <param name="bi">奖金项实体类</param>
        /// <returns></returns>
        public string UpdBonusItem(BonusItem bi)
        {
            if (string.IsNullOrEmpty(bi.BonusItemId))
            {
                return "BonusItemId为空";
            }
            try
            {
                string strmes = dal.UpdBonusItem(bi);
                if (strmes == "ok")
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", "");
                }
                else if (strmes == "no")
                {
                    return ResponseHandle<object>.GetResult(strFail, "修改失败", "");
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

        #region 查询奖金项详情
        /// <summary>
        /// 根据奖金项Id查询奖金项信息
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <returns></returns>
        public string GetBonusItem(string BonusItemId)
        {
            if (string.IsNullOrEmpty(BonusItemId))
            {
                return "BonusItemId为空";
            }
            try
            {
                DataTable dtbmes = dal.GetBonusItem(BonusItemId);
                if (dtbmes.Rows.Count >= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strSucess, "查询失败", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, "");
            }
        }
        #endregion

        #region 查询奖金项列表
        /// <summary>
        /// 根据公司Id查询奖金项列表
        /// </summary>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        public string GetBonusItemList(string CompanyId)
        {
            if (string.IsNullOrEmpty(CompanyId))
            {
                return "CompanyId为空";
            }
            try
            {
                DataTable dtbmes = dal.GetBonusItemList(CompanyId);
                if (dtbmes.Rows.Count >= 0)
                {
                    return ResponseHandle<object>.GetResult(strSucess, "", dtbmes);
                }
                else
                {
                    return ResponseHandle<object>.GetResult(strSucess, "查询失败", "");
                }
            }
            catch (Exception ex)
            {
                return ResponseHandle<object>.GetResult(strError, ex.Message, "");
            }
        } 
        #endregion
    }
}
