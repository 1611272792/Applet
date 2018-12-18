using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SUNPN.BONUS.Model;

namespace SUNPN.BONUS.IDAL
{
    public interface ICompanyInfo
    {
        /// <summary>
        /// 获得数据列表
        /// </summary>
        DataTable GetList();
        /// <summary>
        /// 注册公司
        /// </summary>
        /// <returns></returns>
        string RegCompany(Company company);
    }
}
