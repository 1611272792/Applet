using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
  public  interface IPosition
    {
        /// <summary>
        /// 添加职位
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        string AddPosition(Position pos);

        /// <summary>
        /// 修改职位
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        string UpdPosition(Position pos);


        /// <summary>
        /// 删除职位
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        string DelPosition(int posID);


        /// <summary>
        /// 删除职位
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        DataTable GetPosition(int posID);


        /// <summary>
        /// 获取父级部门列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        List<ParList> GetParList(string CompanyId);


        /// <summary>
        /// 根据父级部门Id查询对应的子部门列表
        /// </summary>
        /// <param name="DepId"></param>
        /// <returns></returns>
        List<ParList> GetChildList(string CompanyId, string DepId);

        /// <summary>
        /// 根据部门Id查询其对应的所有职位列表
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="DepId"></param>
        /// <returns></returns>
        DataTable GetPosList(string CompanyId, string DepId);

        /// <summary>
        /// 获取无部门的职位
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        DataTable GetNoDepPos(string CompanyId);

    }
}
