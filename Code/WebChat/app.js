//app.js
var app = getApp();
App({

  onLaunch: function () {
    var that = this;
    // console.log("app onLaunch")
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  globalData: {
    userInfo: null,
    phoneheight: 0,
    contentMsg: [],

    ddurl: 'http://192.168.0.139:1818'//http://192.168.0.139:1818  https://ngc-mes.xyz:1212
  },
  onError: function (msg) {
    // console.log(msg);
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      confirmColor: '#007aff'
    })
  },
  onShow: function () {
    var that = this;
    console.log("app onshow")
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        wx.request({
          url: that.globalData.ddurl + '/api/Sys/User/GetOpenID',
          data: {
            appid: "wx734c6668ffb249a8",//小程序唯一标识
            secret: "754f022b549e86d1dfdf2dcc134bd935",//小程序的 app secret
            js_code: res.code,
            grant_type: "authorization_code"
          },
          method: "GET",
          header: { 'content-type': 'application/json' },
          success: function (openIdRes) {
            //把3rdsession存入缓存
            wx.setStorageSync('openIdRes.data', openIdRes.data);
            console.log(openIdRes.data);
            // console.log("openid:" + openIdRes.data);
            wx.setStorage({
              key: 'openid',
              data: openIdRes.data,
              // data:"o986o5RVO8lkbx5I0ZBGBWNrmTI0"
            });
            //通过open查询是否有此人的信息
            //获取公司id
            wx.getStorage({
              key: 'openid',
              success: function (openIdRes) {
                wx.request({
                  url: that.globalData.ddurl + '/api/Bos/Wo/GetEmpInfo',
                  data: {
                    OpenId: openIdRes.data,
                    // OpenId: "o986o5RVO8lkbx5I0ZBGBWNrmTI0",
                  },
                  method: "GET",
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (companyIdRes) {
                    console.log(companyIdRes.data);
                    if (companyIdRes.data.code == 100) {
                      wx.setStorage({
                        key: 'CompanyId',
                        data: companyIdRes.data.data[0].CompanyID,
                      })
                    }
                  },
                  fail: function () {
                    console.log("no222");
                  }
                })
              },
            })
          },
          fail: function () {
            console.log("登陆失败1");
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //that.globalData.contentMsg = ress.contentMsg
    // wx.getStorage({
    //   key: 'openid',
    //   success: function (res) {
    //     wx.request({
    //       url: that.globalData.ddurl+'/api/Sys/User/CheckReg',
    //       data: {
    //         OpenId: res.data
    //       },
    //       method: "GET",
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded' // 默认值
    //       },
    //       success: function (ress) {
    //         // console.log(ress.data);
    //         if (ress.data.code == 100) {
    //           that.globalData.contentMsg = [];


    //           // wx.switchTab({
    //           //   url: '../pricewo/pricewo'
    //           // })


    //           // console.log("203")
    //         }
    //         else if (ress.data.code == 104) {
    //           console.log("215:" + ress.data.msg);
    //           if (ress.data.msg == "已离职") {
    //             // that.setData({
    //             //   errorcontent: '您已离职，请联系管理员',
    //             // })
    //             // console.log("209")
    //             that.globalData.contentMsg = ['您已离职，请联系管理员'];
    //             wx.reLaunch({
    //               url: '../noindex/noindex',
    //             })
    //           }
    //           else if (ress.data.msg == "已注销系统") {
    //             // that.setData({
    //             //   errorcontent: '您已注销系统，请联系管理员',
    //             // })
    //             that.globalData.contentMsg = ['您已注销系统，请联系管理员'];
    //             wx.reLaunch({
    //               url: '../noindex/noindex',
    //             })
    //             // console.log("217")
    //           }
    //           else if (ress.data.msg == "已注册未通过") {
    //             // that.setData({
    //             //   errorcontent: '您已注册，管理员还未审核',
    //             // })
    //             that.globalData.contentMsg = ['您已注册，管理员还未审核'];
    //             wx.reLaunch({
    //               url: '../noindex/noindex',
    //             })
    //             // console.log("224")
    //           }
    //           else if (ress.data.msg == "未注册") {
    //             // wx.reLaunch({
    //             //   url: '../index/index',
    //             // })
    //             // console.log("227")
    //             // that.globalData.contentMsg = ['您已离职，请联系管理员'];
    //           }else{
    //             wx.reLaunch({
    //               url: '../noindex/noindex',
    //             })
    //             that.globalData.contentMsg = ['未知错误'];
    //           }
    //         }
    //       },
    //       fail: function () {
    //         console.log("no");
    //       }
    //     })
    //   },
    // })


    //获取设备信息,定义高度
    wx.getSystemInfo({
      success: function (ress) {
        // console.log(ress.windowHeight)
        that.globalData.phoneheight = ress.windowHeight
      }
    })

  },
})