using SUNPN.BONUS.DBUtility;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.DAL
{
   public class ReasonDal:IReason
    {
        #region 文字原因
        /// <summary>
        /// 文字原因
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>
        public DataTable GetWZReason(string ReasonId)
        {
            if (string.IsNullOrEmpty(ReasonId))
            {
                return null;
            }
            try
            {
                string wzreasonsql = string.Format($"SELECT * FROM dbo.BosBonusReson WHERE BrId='{ReasonId}' AND BrType=0");
                DataTable wzreason = DbHelperSQL.ExecuteDataTable(wzreasonsql);
                return wzreason;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region 图片原因
        /// <summary>
        /// 图片原因
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>
        public DataTable GetTPReason(string ReasonId)
        {
            if (string.IsNullOrEmpty(ReasonId))
            {
                return null;
            }
            try
            {
                string tpreasonsql = string.Format($"SELECT * FROM dbo.BosBonusReson WHERE BrId='{ReasonId}' AND BrType=1");
                DataTable tpreason = DbHelperSQL.ExecuteDataTable(tpreasonsql);
                return tpreason;
            }
            catch (Exception)
            {
                return null;
            }
        } 
        #endregion
    }
}
