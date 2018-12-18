using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.Model
{
   public class Role
    {
        /// <summary>
        /// 角色Id
        /// </summary>
        public string RoleId { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        public string RoleName { get; set; }

        /// <summary>
        /// 公司Id
        /// </summary>
        public string CompanyId { get; set; }

        /// <summary>
        /// 权限Id  RoleDetial表
        /// </summary>
        public string AuthorId { get; set; }

        /// <summary>
        /// 是否启用 0启用 1不启用
        /// </summary>
        public string IsActive { get; set; }
    }
}
