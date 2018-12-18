using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
   public interface IDepartBonus
    {
        /// <summary>
        /// 获取公司所有部门
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        DataTable GetAllDepart(string CompanyId);

        /// <summary>
        /// 部门奖金列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        DataTable GetDepartBonusList(string CompanyId,string DepId);
    }
}
