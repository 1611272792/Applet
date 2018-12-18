using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using SUNPN.BONUS.Model.UserClass.EditUser;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
    public interface IAuditBonus
    {
        /// <summary>
        /// 获取申请记录
        /// </summary>
        /// <returns></returns>
        DataTable GetAuditBonus(string CompanyId);

        /// <summary>
        /// 获取审核的历史记录
        /// </summary>
        /// <returns></returns>
        DataTable GetAuditHistory(string CompanyId);


        /// <summary>
        /// 获取该条审核记录的详细信息
        /// </summary>
        /// <param name="SomeBonusID"></param>
        /// <returns></returns>
        DataTable GetAuditDetail(string GetBonusID);

        /// <summary>
        /// 批准
        /// </summary>
        /// <param name="SomeAuditBonusID"></param>
        /// <param name="OpenID"></param>
        /// <returns></returns>
        string  UpdRatify(string SomeAuditBonusID, string OpenID);


        /// <summary>
        /// 驳回
        /// </summary>
        /// <param name="SomeAuditBonusID"></param>
        /// <param name="OpenID"></param>
        /// <returns></returns>
        string UpdReject(string SomeAuditBonusID, string OpenID);

        

    }
}
