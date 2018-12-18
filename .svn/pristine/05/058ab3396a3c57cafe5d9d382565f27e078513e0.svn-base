using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUNPN.BONUS.Common
{
   public class Log
    {
        private static object islock = new object();
        public static void AppLog(string logText)
        {
            lock (islock)
            {
                StreamWriter txt = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + @"\DATA_" + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + ".log", true);
                txt.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss:ffff") + " " + logText);
                txt.Close();
                txt.Dispose();
            }
        }
    }
}
