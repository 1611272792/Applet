using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
    public interface IBonusItem
    {
        /// <summary>
        /// 新增奖金项
        /// </summary>
        /// <param name="bi">奖金项实体类</param>
        /// <returns></returns>
        string AddBonusItem(BonusItem bi);

        /// <summary>
        /// 删除奖金项
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        string DelBonusItem(string BonusItemId);

        /// <summary>
        /// 修改奖金项
        /// </summary>
        /// <param name="bi">奖金项实体类</param>
        /// <returns></returns>
        string UpdBonusItem(BonusItem bi);

        /// <summary>
        /// 查询奖金项
        /// </summary>
        /// <param name="BonusItemId">奖金项Id</param>
        /// <returns></returns>
        DataTable GetBonusItem(string BonusItemId);

        /// <summary>
        /// 奖金项列表
        /// </summary>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        DataTable GetBonusItemList(string CompanyId);
    }
}
