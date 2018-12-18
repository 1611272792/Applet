using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
   public interface IDepart
    {
        /// <summary>
        /// 添加部门
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        string AddDepart(Depart Dep);

        /// <summary>
        /// 修改部门
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        string UpdDepart(Depart Dep);


        /// <summary>
        /// 删除部门
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        string DelDepart(int DepID);


        /// <summary>
        /// 显示所有部门
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        DataTable GetDepart(string CompanyID);

        /// <summary>
        /// 显示当前部门信息
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        DataTable GetDepartInfo(int DepartID);

        /// <summary>
        /// 显示父级部门
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        DataTable GetParentDepart(string CompanyID);


             /// <summary>
             /// 显示子级部门
             /// </summary>
             /// <param name="dep"></param>
             /// <returns></returns>
        DataTable GetSonDepart(string CompanyID,int DepartId);
    }
}
