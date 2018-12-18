﻿using SUNPN.BONUS.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
   public interface IRole
    {
        /// <summary>
        /// 增加角色
        /// </summary>
        /// <param name="role">Role实体类</param>
        /// <returns></returns>
        string AddRole(Role role);

        /// <summary>
        /// 编辑角色
        /// </summary>
        /// <param name="role">Role实体类</param>
        /// <returns></returns>
        string UpdRole(Role role);

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="RoleId">RoleID</param>
        /// <returns></returns>
        string DelRole(string RoleId);

        /// <summary>
        /// 查询本公司所有角色(IsActive为0)
        /// </summary>
        /// <param name="RoleId"></param>
        /// <returns></returns>
        DataTable GetAllRole(string CompanyId, string Sign);

        /// <summary>
        /// 根据RoleId获取角色的权限信息
        /// </summary>
        /// <param name="RoleId">角色Id</param>
        /// <returns></returns>
        List<AuthorModellist> GetAuthorInfo(string RoleId);

        /// <summary>
        /// 根据RoleId获取角色的权限信息
        /// </summary>
        /// <param name="RoleId">角色Id</param>
        /// <returns></returns>
        List<AuthorModellist> GetAuthorInfo2(string RoleId);

        /// <summary>
        /// 获取全部权限信息
        /// </summary>
        /// <returns></returns>
        List<AuthorModellist> GetAllAuthorInfo(string CompanyId);
    }
}
