using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
    public interface IBonusRule
    {
        /// <summary>
        /// 添加奖金项规则
        /// </summary>
        /// <param name="br"></param>
        /// <returns></returns>
        string AddBonusRule(BonusRule br);

        /// <summary>
        /// 删除奖金规则
        /// </summary>
        /// <param name="BRId"></param>
        /// <returns></returns>
        string DelBonusRule(string BRId);

        /// <summary>
        /// 修改奖金规则
        /// </summary>
        /// <param name="BRId"></param>
        /// <returns></returns>
        string UpdBonusRule(BonusRule br);

        /// <summary>
        /// 查询奖金规则
        /// </summary>
        /// <param name="BRId"></param>
        /// <returns></returns>
        DataTable GetBonusRule(string BRId);

        /// <summary>
        /// 添加固定金额
        /// </summary>
        /// <param name="bid"></param>
        /// <returns></returns>
        string AddGDMoney(BonusItemData bid);
    }
}
