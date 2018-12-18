using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
   public interface IClient
    {
        /// <summary>
        /// 全部公司信息
        /// </summary>
        /// <returns></returns>
        List<DataTable> GetAllList();

        /// <summary>
        /// 公司审核
        /// </summary>
        /// <returns></returns>
        string UpdPassState(string CompanyId,string UserCount,string EndTime);

        /// <summary>
        /// 根据公司Id获取公司信息
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        DataTable GetCompanyInfo(string CompanyId);

    }
}
