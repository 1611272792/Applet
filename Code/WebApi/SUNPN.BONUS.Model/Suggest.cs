using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.Model
{
    //意见反馈
    public class Suggest
    {
        public string OpenId { get; set; }

        public string SugContentId { get; set; }

        public string lxType { get; set; }

        //public string CommitDate { get; set; }

        public string CompanyId { get; set; }

        public string SugImage { get; set; }

        public int ImageCount { get; set; }

        public string SugContent { get; set; }
    }
}
