/*
 * ==========
 * 创建者
 * 
 * 
 * ==========
 * */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.Common
{
    public class EnumParam
    {

        /// <summary>
        /// 返回数据状态
        /// </summary>
        public enum Code
        {
            /// <summary>
            /// 返回成功
            /// </summary>
            Sucess = 100,
            /// <summary>
            /// 返回失败
            /// </summary>
            Fail = 104,
            /// <summary>
            /// 其他
            /// </summary>
            Others = 105,
        }

    }
}
