using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
  public  interface IPinYin
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        DataTable GetPinYin(string CompanyId);

        DataTable GetUserName(string userName,string CompanyId);

        /// <summary>
        /// 获取部门简写
        /// </summary>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        DataTable GetDepPY(string CompanyId);

        /// <summary>
        /// 获取部门名字
        /// </summary>
        /// <param name="DepName">部门名称</param>
        /// <param name="CompanyId">公司Id</param>
        /// <returns></returns>
        DataTable GetDepName(string DepName, string CompanyId);
    }
}
