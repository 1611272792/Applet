using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.Model
{
    public class User
    {
        /// <summary>
        /// 用户唯一标识
        /// </summary>
        [Required(ErrorMessage = "OpenId不能为空")]        
        public string OpenId { get; set; }

        /// <summary>
        /// 用户Id                                                                                                                                                                          
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 用户密码
        /// </summary>
        public string UserPwd { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 用户联系电话
        /// </summary>
        [RegularExpression(@"/^[1][3,4,5,7,8][0-9]{9}$/", ErrorMessage = "名称应为2-15长度的字母组合")]
        public string UserPhone { get; set; }

        /// <summary>
        /// 用户头像
        /// </summary>
        public string Photo { get; set; }

        /// <summary>
        /// 用户性别
        /// </summary>
        public string Sex { get; set; }

        /// <summary>
        /// 用户生日
        /// </summary>
        public string Birth { get; set; }

        /// <summary>
        /// 离职状态
        /// </summary>
        public string IsOut { get; set; }

        /// <summary>
        /// 公司Id
        /// </summary>
        [Required(ErrorMessage ="CompanyId不能为空")]
        public string CompanyId { get; set; }

        /// <summary>
        /// 申请时间
        /// </summary>
        public string Applyfortime { get; set; }

        /// <summary>
        /// 用户Email
        /// </summary>
        public string UserEmail { get; set; }
    }
}
