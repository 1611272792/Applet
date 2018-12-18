
using SUNPN.BONUS.IDAL;
using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
   public interface IBonusParam 
    {
        /// <summary>
        /// 添加奖金参数
        /// </summary>
        /// <returns></returns>
        string AddBonusParam(BonusParam bonusPar);

        /// <summary>
        /// 修改奖金参数
        /// </summary>
        /// <returns></returns>
        string UpdBonusParam(BonusParam bonusPar);

        /// <summary>
        /// 删除奖金参数
        /// </summary>
        /// <returns></returns>
        string DelBonusParam(int BonusParId);



        /// <summary>
        /// 查看奖金参数
        /// </summary>
        /// <returns></returns>
        DataTable GetBonusParam(int BonusParId);


        /// <summary>
        /// 查看所有奖金参数
        /// </summary>
        /// <returns></returns>
        DataTable GetAllBonusParam(string CompanyID);
    }
}
