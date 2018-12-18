using SUNPN.BONUS.DALFactory;
using SUNPN.BONUS.IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SUNPN.BONUS.Model;
using SUNPN.BONUS.DAL;
using SUNPN.BONUS.Common;
using SUNPN.BONUS.API.Models;
using System.Text.RegularExpressions;

namespace SUNPN.BONUS.BLL
{
   
    public  class DepartBLL
    {
        private readonly IDepart dal = DataAccess.CreateDepart();
        string strSucess = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(0)).ToString();
        string strFail = Convert.ToInt32(Enum.GetValues(typeof(EnumParam.Code)).GetValue(1)).ToString();
        
        /// <summary>
        /// 添加部门
        /// </summary>
        /// <param name="dep"></param>
        /// <returns></returns>
        public string AddDepart(Depart dep){

            string state = dal.AddDepart(dep);

            if (state == "100")
            {
                return ResponseHandle<object>.GetResult(strSucess, "", null);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, state, null);
            }
        }
        /// <summary>
        /// 显示所有部门
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public string GetDepart(string CompanyID)
        {
            DataTable state = dal.GetDepart(CompanyID);
            if (state.Rows.Count > 0)
            {
                string[] array = new string[state.Rows.Count+1];
                array[0] = "0,无部门";
                if (state.Rows.Count > 0)    
                {
                    for (int i = 1; i <state.Rows.Count+1; i++)
                    {
                        array[i] = state.Rows[i-1]["DepId"].ToString()+","+ state.Rows[i-1]["DepName"].ToString();
                    }
                }
                return ResponseHandle<object>.GetResult(strSucess, "", array);
            }
            else
            {
                string[] array = new string[1];
                array[0] = "0,无部门";
                return ResponseHandle<object>.GetResult(strSucess, "", array);
            }
        }


        /// <summary>
        /// 显示当前部门信息
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public string GetDepartInfo(int DepartID)
        {
            DataTable state = dal.GetDepartInfo(DepartID);
            if (state.Rows.Count > 0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", state);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "show false", null);
            }
        }
        /// <summary>
        /// 显示父级部门信息
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public string GetParentDepart(string CompanyID)
        {
            DataTable state = dal.GetParentDepart(CompanyID);
            if (state.Rows.Count > 0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", state);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "show false", null);
            }
        }

        /// <summary>
        /// 显示子级部门信息
        /// </summary>
        /// <param name="CompanyID"></param>
        /// <returns></returns>
        public string GetSonDepart(string CompanyID,int DepartId)
        {
            DataTable state = dal.GetSonDepart(CompanyID, DepartId);
            if (state.Rows.Count > 0)
            {
                return ResponseHandle<object>.GetResult(strSucess, "", state);
            }
            else if (state.Rows.Count ==0)
            {
                return ResponseHandle<object>.GetResult(strFail, "no SonDepart", null);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, "show false", null);
            }
        }

        /// <summary>
        /// 修改部门信息
        /// </summary>
        /// <param name="depart"></param>
        /// <returns></returns>
        public string UpdDepart(Depart depart)
        {
            string state = dal.UpdDepart(depart);

            if (state == "100")
            {
                return ResponseHandle<object>.GetResult(strSucess, "", null);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, state, null);
            }
        }


        /// <summary>
        /// 删除部门
        /// </summary>
        /// <param name="depart"></param>
        /// <returns></returns>
        public string DelDepart(int departID)
        {
            string state = dal.DelDepart(departID);

            if (state == "100")
            {
                return ResponseHandle<object>.GetResult(strSucess, "", null);
            }
            else
            {
                return ResponseHandle<object>.GetResult(strFail, state, null);
            }
        }

    }
}
