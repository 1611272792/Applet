using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
    public interface IBonusImpower
    {
        /// <summary>
        /// 获取奖金项负责人可授权的奖金项列表
        /// </summary>
        /// <param name="OpenId">奖金项负责人Id</param>
        /// <returns></returns>
        DataTable GetCanImpowerList(string OpenId);

        /// <summary>
        /// 添加奖金授权
        /// </summary>
        /// <param name="bi"></param>
        /// <returns></returns>
        string AddBonusImpower(BonusImpower bi);

        /// <summary>
        /// 奖金授权记录
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <returns></returns>
        DataTable GetBonusRecord(string BonusItemId);

        /// <summary>
        /// 根据奖金项Id和被授权人Id查看授权详情
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <param name="BImpowerUser"></param>
        /// <returns></returns>
        DataTable GetBonusImpowerList(string BonusItemId,string BImpowerUser);

        /// <summary>
        /// 根据奖金项Id和被授权人Id查看授权汇总信息
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <param name="BImpowerUser"></param>
        /// <returns></returns>
        DataTable GetBonusImpowerCollect(string BonusItemId, string BImpowerUser);

        /// <summary>
        /// 根据时间和奖金项Id和被授权人Id查看授权详情
        /// </summary>
        /// <param name="BonusItemId"></param>
        /// <param name="BImpowerUser"></param>
        /// <param name="StartTime"></param>
        /// <param name="EndTime"></param>
        /// <returns></returns>
        DataTable GetImpowerListByTime(string BonusItemId, string BImpowerUser, string StartTime, string EndTime);

        /// <summary>
        /// 收回授权
        /// </summary>
        /// <param name="BiId"></param>
        /// <returns></returns>
        string UpdState(string BiId);
    }
}
