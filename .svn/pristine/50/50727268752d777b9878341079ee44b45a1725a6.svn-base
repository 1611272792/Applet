
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace SUNPN.BONUS.DALFactory
{
    /// <summary>
    /// Abstract Factory pattern to create the DAL。
    /// 如果在这里创建对象报错，请检查web.config里是否修改了<add key="DAL" value="Maticsoft.SQLServerDAL" />。
    /// </summary>
    public sealed class DataAccess
    {
        private static readonly string AssemblyPath = ConfigurationManager.AppSettings["DAL"];
        public DataAccess()
        { }

        #region CreateObject 

        //不使用缓存
        private static object CreateObjectNoCache(string AssemblyPath, string classNamespace)
        {
            try
            {
                object objType = Assembly.Load(AssemblyPath).CreateInstance(classNamespace);
                return objType;
            }
            catch//(System.Exception ex)
            {
                //string str=ex.Message;// 记录错误日志
                return null;
            }

        }
        //使用缓存
        private static object CreateObject(string AssemblyPath, string classNamespace)
        {
            object objType = DataCache.GetCache(classNamespace);
            if (objType == null)
            {
                try
                {
                    objType = Assembly.Load(AssemblyPath).CreateInstance(classNamespace);
                    DataCache.SetCache(classNamespace, objType);// 写入缓存
                }
                catch//(System.Exception ex)
                {
                    //string str=ex.Message;// 记录错误日志
                }
            }
            return objType;
        }
        #endregion

        #region 泛型生成
        ///// <summary>
        ///// 创建数据层接口。
        ///// </summary>
        //public static t Create(string ClassName)
        //{

        //    string ClassNamespace = AssemblyPath +"."+ ClassName;
        //    object objType = CreateObject(AssemblyPath, ClassNamespace);
        //    return (t)objType;
        //}
        #endregion

        #region CreateSysManage
        //public static IDAL.ISysManage CreateSysManage()
        //{
        //    //方式1			
        //    //return (Sunpn.IDAL.ISysManage)Assembly.Load(AssemblyPath).CreateInstance(AssemblyPath+".SysManage");

        //    //方式2 			
        //    string classNamespace = AssemblyPath + ".SysManage";
        //    object objType = CreateObject(AssemblyPath, classNamespace);
        //    return (IDAL.ISysManage)objType;
        //}
        #endregion



        /// <summary>
        /// 创建CompanyInfo数据层接口。
        /// </summary>
        public static IDAL.ICompanyInfo CreateCompanyInfo()
        {
            string ClassNamespace = AssemblyPath + ".CompanyInfoDal";
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            return (IDAL.ICompanyInfo)objType;
        }

        /// <summary>
        /// 创建User数据层接口。
        /// </summary>
        public static IDAL.IUser CreateUser()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".UserDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IUser)objType;
        }
        /// <summary>
        /// 创建Company数据层接口。
        /// </summary>
        public static IDAL.ICompany CreateCompany()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".CompanyDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.ICompany)objType;
        }

        /// <summary>
        /// 创建Role数据层接口。
        /// </summary>
        /// <returns></returns>
        public static IDAL.IRole CreateRole()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".RoleDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IRole)objType;
        }

        /// <summary>
        /// 创建PinYin数据层接口。
        /// </summary>
        public static IDAL.IPinYin CreatePinYin()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".PinYinDAL";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IPinYin)objType;
        }

        /// <summary>
        /// 创建部门数据层接口。
        /// </summary>
        public static IDAL.IDepart CreateDepart()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".DepartDAL";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IDepart)objType;
        }


        /// <summary>
        /// 创建职位数据层接口。
        /// </summary>
        public static IDAL.IPosition CreatePosition()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".PositionDAL";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IPosition)objType;
        }

        /// <summary>
        /// 创建奖金项数据层接口。
        /// </summary>
        public static IDAL.IBonusItem CreateBonusItem()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".BonusItemDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IBonusItem)objType;
        }


        /// <summary>
        /// 创建奖金参数接口
        /// </summary>
        public static IDAL.IBonusParam CreateBonusParam()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".BonusParamDAL";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IBonusParam)objType;
        }

        /// <summary>
        /// ‘我’页面所有接口
        /// </summary>
        public static IDAL.IWo CreateWo()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".WoDAL";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IWo)objType;
        }

        /// <summary>
        /// 创建奖金数据查询接口
        /// </summary>
        public static IDAL.IBonusDataQuery CreateBonusDataQuery()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".BonusDataQueryDAL";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IBonusDataQuery)objType;
        }


        /// <summary>
        /// 创建提现审核接口
        /// </summary>
        public static IDAL.IAuditBonus CreateAuditBonus()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".AuditBonusDAL";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IAuditBonus)objType;
        }

        /// <summary>
        /// 创建奖金项规则数据层接口。
        /// </summary>
        public static IDAL.IBonusRule CreateBonusRule()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".BonusRuleDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IBonusRule)objType;
        }

        /// <summary>
        /// 创建奖金授权数据层接口。
        /// </summary>
        public static IDAL.IBonusImpower CreateBonusImpower()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".BonusImpowerDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IBonusImpower)objType;
        }

        /// <summary>
        /// 创建部门奖金数据层接口。
        /// </summary>
        public static IDAL.IDepartBonus CreateDepartBonus()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".DepartBonusDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IDepartBonus)objType;
        }

        /// <summary>
        /// 创建原因数据层接口。
        /// </summary>
        public static IDAL.IReason CreateReason()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".ReasonDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IReason)objType;
        }

        /// <summary>
        /// 创建发放奖金数据层接口。
        /// </summary>
        public static IDAL.ISendBonus CreateSendBonus()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".SendBonusDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.ISendBonus)objType;
        }

        /// <summary>
        /// 创建客户管理数据层接口。
        /// </summary>
        public static IDAL.IClient CreateClient()
        {
            //定义命名空间+类名称
            string ClassNamespace = AssemblyPath + ".ClientDal";
            //把类反序列化对象
            object objType = CreateObject(AssemblyPath, ClassNamespace);
            //接口转换
            return (IDAL.IClient)objType;
        }
    }
}
