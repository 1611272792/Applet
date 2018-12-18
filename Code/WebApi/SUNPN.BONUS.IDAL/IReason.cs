using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.IDAL
{
    public interface IReason
    {
        /// <summary>
        /// 根据ReasonId查询文字原因
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>
        DataTable GetWZReason(string ReasonId);

        /// <summary>
        /// 根据ReasonId查图片原因
        /// </summary>
        /// <param name="ReasonId"></param>
        /// <returns></returns>
        DataTable GetTPReason(string ReasonId);
    }
}
