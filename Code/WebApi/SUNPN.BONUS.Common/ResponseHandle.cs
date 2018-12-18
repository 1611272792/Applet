using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SUNPN.BONUS.Common
{
    [Serializable]
    public class ResponseData<T> where T : class
    {
        public string code { get; set; }
        public string msg { get; set; }
        public string spec { get; set; }
        public string specname { get; set; }
        public string num { get; set; }
        public T data { get; set; }
        public T data1 { get; set; }
        public T dataExtend { get; set; }
    }

    [Serializable]
    public class TestObj<T> where T : class
    {
        public string code { get; set; }
        public string msg { get; set; }
        public T data { get; set; }
        public T data1 { get; set; }
        public T data2 { get; set; }
    }
    [Serializable]
    public class ReqData
    {
        public string token { get; set; }
        public object data { get; set; }
    }
    public class ResponseHandle<T> where T : class
    {
        /// <summary>
        /// 根据参数创建 结果对象
        /// </summary>
        /// <param name="code"></param>
        /// <param name="msg"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ResponseData<T> DefaultResultObj(string code, string msg, T data)
        {
            return new ResponseData<T>
            {
                code = code,
                msg = msg,
                data = data
            };
        }

        /// <summary>
        /// 根据参数创建 结果对象
        /// </summary>
        /// <param name="code"></param>
        /// <param name="msg"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ResponseData<T> SuccessResult(string msg, T data)
        {
            return new ResponseData<T>
            {
                code = "1",
                msg = msg,
                data = data
            };
        }

        /// <summary>
        /// 根据参数创建 结果对象
        /// </summary>
        /// <param name="code"></param>
        /// <param name="msg"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ResponseData<T> ErrorResult(string msg, T data)
        {
            return new ResponseData<T>
            {
                code = "-1",
                msg = msg,
                data = data
            };
        }

        ///// <summary>
        ///// 自定义 code 与 消息内容，返回最终结果
        ///// </summary>
        ///// <param name="code"></param>
        ///// <param name="msg"></param>
        ///// <param name="data"></param>
        ///// <returns></returns>
        //public static string GetResult(string code, string msg, string spec, string specname, string num, T data)
        //{
        //    var respObj = new ResponseData<T>
        //    {
        //        code = code.ToLower(),
        //        msg = msg,
        //        spec = spec,
        //        specname = specname,
        //        num = num,
        //        data = data
        //    };
        //    return JsonHelper.ToJson(respObj);
        //}

        //public static string GetResult(string code, string msg, string spec, string specname, string num, T data1, T data)
        //{
        //    var respObj = new ResponseData<T>
        //    {
        //        code = code.ToLower(),
        //        msg = msg,
        //        spec = spec,
        //        specname = specname,
        //        num = num,
        //        data1 = data1,
        //        data = data
        //    };
        //    return JsonHelper.ToJson(respObj);
        //}

        /// <summary>
        /// 自定义 code 与 消息内容，返回最终结果
        /// </summary>
        /// <param name="code"></param>
        /// <param name="msg"></param>
        /// <param name="data"></param>
        /// <param name="data1"></param>
        /// <param name="dataExt"></param>
        /// <returns></returns>
        public static string GetResult(string code, string msg, T data = null, T data1 = null, T data2 = null)
        {
            var respObj = new TestObj<T>
            {
                code = code.ToLower(),
                msg = msg,
                data = data,
                data1 = data1,
                data2 = data2
            };
            return JsonHelper.ToJson(respObj);
        }

        /// <summary>
        /// 根据 EnumCode 返回最终结果
        /// </summary>
        /// <param name="code"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string GetResult(string code, T data)
        {
            var respObj = new ResponseData<T>
            {
                code = (code.GetHashCode()).ToString().ToLower(),
                msg = code,
                data = data
            };
            return JsonHelper.ToJson(respObj);
        }
    }
}