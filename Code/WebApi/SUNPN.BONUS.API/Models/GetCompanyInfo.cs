using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SUNPN.BONUS.API.Models
{
    public class GetCompanyInfo
    {
        public class ComInfo
        {
            public int StateCode { get; set; }
            public string Reason { set; get; }
            public InfoEntity Info { get; set; }
            public class InfoEntity
            {
                public string LogoUrl { get; set; }
                public string CompanyName { get; set; }
            }
        }
    }
}