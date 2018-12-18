﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SUNPN.BONUS.Common
{
   public   class RegexData
    {

        /// <summary>
        /// 电话和邮箱验证
        /// </summary>
        /// <param name="PhoneNumber"></param>
        /// <param name="Email"></param>
        /// <returns></returns>
        public static string RegexPhoneEmail(string PhoneNumber, string Email)
        {
            string PhoneRx = @"^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$";//手机号码验证
            string EmailRx = @"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";  //邮箱验证
            if (Regex.IsMatch(Email, EmailRx))
            {
                if (Regex.IsMatch(PhoneNumber, PhoneRx))
                {
                    return "ok";
                }
                else
                {
                    return "PhoneNumber is false";
                }
            }
            else
            {
                return "Email is false";
            }
        }
        /// <summary>
        /// 手机号码验证
        /// </summary>
        /// <param name="PhoneNumber"></param>
        /// <returns></returns>
        public static string RegexPhoneEmail(string PhoneNumber)
        {
            string PhoneRx = @"^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$";//手机号码验证
            if (PhoneNumber.Length==0)   //为空
            {
                return "ok";
            }
            else if (Regex.IsMatch(PhoneNumber, PhoneRx))
            {
                return "ok";
            }
            else
            {
                return "手机号码格式有误";
            }
        }
    }
}
