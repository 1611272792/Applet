//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index: 0,
    show1: false,
    show3: true,
    files: [],//第二种
    showAdd: true,
    items: [
      { name: '0', value: '女', checked: 'true' },
      { name: '1', value: '男' }
    ],
    radioStr: 0,
    begindate: "",
    myusers: [],
    durl: app.globalData.ddurl,
    userids: "",
    userpwds: "",
    miyaos: 0,
    errorcontent: "",
    errlentght: [],
    oneshows: true,//update
    colorone: 'blue',
    borderone: '1px solid blue',
    twoshows: false,
    colortwo: 'black',
    bordertwo: '1px solid black',
    colorlineone: 'black',
    colorlinetwo: 'black',
    threeshows: false,
  }
  ,
  CreateCompany: function () {
    var that = this;
    var oneshows = this.data.oneshows;
    var threeshows = this.data.threeshows;
    var colortwo = this.data.colortwo;
    var bordertwo = this.data.bordertwo;
    var colorlineone = this.data.colorlineone;
    var colorlinetwo = this.data.colorlinetwo;
    var userInfo = this.data.userInfo;
    
    var colorone = this.data.colorone;
    var borderone = this.data.borderone;
      
    // console.log(userInfo)
    that.setData({
      oneshows: false,
      threeshows: true,
      colortwo: 'blue',
      colorlineone: 'green',
      colorlineone: 'green',
      bordertwo: '1px solid blue',
      colorone:'green',
      borderone:'1px solid green'
    })
  },
  JoinExistCompany: function () {
    var that = this;
    var oneshows = this.data.oneshows;
    var twoshows = this.data.twoshows;
    var colortwo = this.data.colortwo;
    var bordertwo = this.data.bordertwo;
    var colorlineone = this.data.colorlineone;
    var colorlinetwo = this.data.colorlinetwo;
    var userInfo = this.data.userInfo;
    var colorone = this.data.colorone;
    var borderone = this.data.borderone;
    console.log(userInfo)
    that.setData({
      oneshows: false,
      twoshows: true,
      colortwo: 'blue',
      colorlineone: 'green',
      colorlineone: 'green',
      bordertwo: '1px solid blue',
      colorone: 'green',
      borderone: '1px solid green'
    })
  },
  LastOneClicks:function(){
    var that = this;
    var oneshows = this.data.oneshows;
    var threeshows = this.data.threeshows;
    var colortwo = this.data.colortwo;
    var bordertwo = this.data.bordertwo;
    var colorlineone = this.data.colorlineone;
    var colorlinetwo = this.data.colorlinetwo;
    that.setData({
      oneshows: true,
      threeshows: false,
      colortwo: 'black',
      colorlineone: 'black',
      colorlineone: 'black',
      bordertwo: '1px solid black'
    })
  },
  LastOneClick: function () {
    var that = this;
    var oneshows = this.data.oneshows;
    var twoshows = this.data.twoshows;
    var colortwo = this.data.colortwo;
    var bordertwo = this.data.bordertwo;
    var colorlineone = this.data.colorlineone;
    var colorlinetwo = this.data.colorlinetwo;
    that.setData({
      oneshows: true,
      twoshows: false,
      colortwo: 'black',
      colorlineone: 'black',
      colorlineone: 'black',
      bordertwo: '1px solid black'
    })
  },
  radioChange: function (e) {
    var radioStr = this.data.radioStr;
    this.setData({ radioStr: e.detail.value });
  },
  changeBegindate(e) {
    var begindate = this.data.begindate;
    this.setData({ begindate: e.detail.value });
  },
  onShow: function () {
    var that = this;
    var ddurl = that.data.durl;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.request({
          url: ddurl + '/api/Sys/User/CheckReg',
          data: {
            OpenId: res.data
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (ress) {
            // console.log(ress.data);
            if (ress.data.code == 100) {
              app.globalData.contentMsg = [];
              wx.switchTab({
                url: '../main/main'
              })
            }
            else if (ress.data.code == 104) {
              // console.log("215");
              // console.log(ress.data.msg);
              if (ress.data.msg == "已离职") {
                app.globalData.contentMsg = ['您已离职，请联系管理员'];
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
              }
              else if (ress.data.msg == "已注销系统") {
                app.globalData.contentMsg = ['您已注销系统，请联系管理员'];
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
              }
              else if (ress.data.msg == "已注册未通过") {
                app.globalData.contentMsg = ['您已注册，管理员还未审核'];
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
              }
              else if (ress.data.msg == "未注册") {
                // console.log("227")
              } else {
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
                app.globalData.contentMsg = [ress.data.msg];
              }
            }
            else {
              wx.reLaunch({
                url: '../noindex/noindex',
              })
              app.globalData.contentMsg = ['未知错误'];
            }
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    })
  },
  chooseImage: function (e) {
    var that = this;
    var showAdd = that.data.showAdd;
    var files_data = that.data.files;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        console.log(res.tempFilePaths);      
        that.setData({
          files: res.tempFilePaths,
          showAdd: false
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var files = this.data.files;
    var showAdd = this.data.showAdd;
    // console.log(files.length);
    if (files.length > 1) {
      this.setData({
        showAdd: false
      });
    }
    else {
      this.setData({
        showAdd: true
      });
    }
    var index = e.currentTarget.dataset.index;
    files.splice(index, 1);
    this.setData({
      files: files
    });

  },
  changeTabbar(e) {
    this.setData({ index: e.currentTarget.dataset.id })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    var ddurl = that.data.durl;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.request({
          url: ddurl + '/api/Sys/User/CheckReg',
          data: {
            OpenId: res.data
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (ress) {
            // console.log(ress.data);
            if (ress.data.code == 100) {
              app.globalData.contentMsg = [];
              wx.switchTab({
                url: '../main/main'
              })
            }
            else if (ress.data.code == 104) {
              // console.log("215");
              // console.log(ress.data.msg);
              if (ress.data.msg == "已离职") {
                app.globalData.contentMsg = ['您已离职，请联系管理员'];
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
              }
              else if (ress.data.msg == "已注销系统") {
                app.globalData.contentMsg = ['您已注销系统，请联系管理员'];
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
              }
              else if (ress.data.msg == "已注册未通过") {
                app.globalData.contentMsg = ['您已注册，管理员还未审核'];
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
              }
              else if (ress.data.msg == "未注册") {
                // console.log("227")
              } else {
                wx.reLaunch({
                  url: '../noindex/noindex',
                })
                app.globalData.contentMsg = [ress.data.msg];
              }
            }
            else {
              wx.reLaunch({
                url: '../noindex/noindex',
              })
              app.globalData.contentMsg = ['未知错误'];
            }
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //注册用户
  formSubmit5: function (e) {
    var that = this;
    var userInfo = this.data.userInfo;
    var begindate = this.data.begindate;
    console.log(userInfo.avatarUrl);
    var ddurl = this.data.durl;
    //  console.log(e.detail.value);
    if (e.detail.value.miyao == "") {
      wx.showModal({
        title: '提示',
        content: '密钥必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.userzh == "") {
      wx.showModal({
        title: '提示',
        content: '账号必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.userxm == "") {
      wx.showModal({
        title: '提示',
        content: '姓名必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.bithtss == "") {
      wx.showModal({
        title: '提示',
        content: '出生日期必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.request({
          url: ddurl + '/api/Sys/User/AddUser',
          data: {
            OpenId: res.data,
            UserId: e.detail.value.userzh,
            UserPwd: '',
            UserName: userInfo.nickName,
            Photo : userInfo.avatarUrl,
            UserPhone: '',
            Sex: userInfo.gender,
            Birth: begindate,
            CompanyId: e.detail.value.miyao
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (ress) {
            //  console.log(ress.data);
            if (ress.data.code == '100') {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 3000
              });
              // 获取公司id
              wx.request({
                url: that.data.durl + '/api/Bos/Wo/GetEmpInfo',
                data: {
                  OpenId: res.data,
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (companyIdRes) {
                  // console.log(companyIdRes.data.data[0].CompanyID);
                  if (companyIdRes.data.code == 100) {
                    wx.setStorage({
                      key: 'CompanyId',
                      data: companyIdRes.data.data[0].CompanyID,
                    })
                  }
                },
                fail: function () {
                  console.log("no");
                }
              })
            }
            else {
              wx.showModal({
                title: '提示',
                content: ress.data.msg,
                showCancel: false,
                confirmColor: '#007aff'
              })
            }
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    })
  },
  //注册公司和用户信息
  formSubmit6:function(e){
    var that = this;
    var userInfo = this.data.userInfo;
    var begindate = this.data.begindate;
    var ddurl = this.data.ddurl;
    var files = this.data.files;
    // console.log(e.detail.value);
    // console.log(userInfo.avatarUrl);
    // console.log(begindate);
    var phone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;//手机号
    var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;//邮箱
    if (e.detail.value.comname==''){
      wx.showModal({
        title: '提示',
        content: '公司名称必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
  
    else if (e.detail.value.userzhs == '') {
      wx.showModal({
        title: '提示',
        content: '负责人账号必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.userxms == '') {
      wx.showModal({
        title: '提示',
        content: '负责人姓名必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.userPhone == '') {
      wx.showModal({
        title: '提示',
        content: '负责人手机必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!phone.test(e.detail.value.userPhone)) {
      wx.showModal({
        title: '提示',
        content: '负责人手机号格式不正确',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.usermail == '') {
      wx.showModal({
        title: '提示',
        content: '负责人邮箱必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!email.test(e.detail.value.usermail)) {
      wx.showModal({
        title: '提示',
        content: '负责人邮箱格式不正确',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }

    else{
      if (files.length==0){
        
        //没有logo 
        // wx.getStorage({
        //   key: 'openid',
        //   success: function (res) {
        //     wx.uploadFile({
        //       url: that.data.durl + '/api/Company/AddRegCompany',
        //       filePath: "/Images/CompanyImg/牛工厂 logo.gif",
        //       name: 'image',
        //       header: { 'content-type': 'multipart/form-data' },
        //       formData: {
        //         CompanyName: e.detail.value.comname,
        //         OpenId: res.data,
        //         UserName: e.detail.value.userxms,
        //         UserZh: e.detail.value.userzhs,
        //         UserPhone: e.detail.value.userPhone,
        //         UserPhoto: userInfo.avatarUrl,
        //         Sex: userInfo.gender,
        //         Birth: begindate,
        //         CompanyPhone: e.detail.value.comphone,
        //         CompanyEmail: e.detail.value.comemail
        //       },
        //       success: function (resd) {
        //          var datainfo = JSON.parse(resd.data);
        //         // var datainfo = resd.data;
        //         console.log(datainfo);
        //         if (datainfo.code == 100) {
        //           wx.showToast({
        //             title: '成功',
        //             icon: 'success',
        //             duration: 3000
        //           });
        //           // 获取公司id
        //           wx.request({
        //             url: that.data.durl + '/api/Bos/Wo/GetEmpInfo',
        //             data: {
        //               OpenId: res.data,
        //             },
        //             method: "GET",
        //             header: {
        //               'content-type': 'application/json'
        //             },
        //             success: function (companyIdRes) {
        //               // console.log(companyIdRes.data.data[0].CompanyID);
        //               if (companyIdRes.data.code == 100) {
        //                 wx.setStorage({
        //                   key: 'CompanyId',
        //                   data: companyIdRes.data.data[0].CompanyID,
        //                 })
        //               }
        //             },
        //             fail: function () {
        //               console.log("no");
        //             }
        //           })
        //         }
        //         else {
        //           wx.showModal({
        //             title: '提示',
        //             content: datainfo.msg,
        //             showCancel: false,
        //             confirmColor: '#007aff'
        //           })
        //         }
        //       },
        //       fail: function () {
        //         console.log("no");
        //       }
        //     })
        //   },
        // })
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            wx.request({
              url: that.data.durl + '/api/Company/AddRegCompany',
              data: {
                CompanyName: e.detail.value.comname,
                OpenId: res.data,
                UserZh: e.detail.value.userzhs,
                UserName: e.detail.value.userxms,                
                UserPhone: e.detail.value.userPhone,
                UserEmail: e.detail.value.usermail,
                UserPhoto: userInfo.avatarUrl,
                Sex: userInfo.gender,
              },
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (ress) {
                console.log(ress.data);
              },
              fail: function () {
                console.log("no");
              }
            })
          },
        })    
      }
      else{
        //有logo
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            for (var i = 0; i < that.data.files.length; i++) {
              wx.uploadFile({
                url: that.data.durl + '/api/Company/AddRegCompany',
                filePath: that.data.files[i],
                name: 'image',
                header: { 'content-type': 'multipart/form-data' },
                formData: {
                  CompanyName: e.detail.value.comname,
                  OpenId: res.data,
                  UserZh: e.detail.value.userzhs,
                  UserName: e.detail.value.userxms,
                  UserPhone: e.detail.value.userPhone,
                  UserEmail: e.detail.value.usermail,
                  UserPhoto: userInfo.avatarUrl,
                  Sex: userInfo.gender,
                },
                success: function (resd) {
                  var datainfo = JSON.parse(resd.data);
                  // var datainfo = resd.data;
                  console.log(datainfo);
                  if (datainfo.code == 100) {
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 3000
                    });
                    // 获取公司id
                    wx.request({
                      url: that.data.durl + '/api/Bos/Wo/GetEmpInfo',
                      data: {
                        OpenId: res.data,
                      },
                      method: "GET",
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (companyIdRes) {
                        // console.log(companyIdRes.data.data[0].CompanyID);
                        if (companyIdRes.data.code == 100) {
                          wx.setStorage({
                            key: 'CompanyId',
                            data: companyIdRes.data.data[0].CompanyID,
                          })
                        }
                      },
                      fail: function () {
                        console.log("no");
                      }
                    })
                    wx.switchTab({
                      url: '../main/main',
                    })
                  }
                  else {
                    wx.showModal({
                      title: '提示',
                      content: datainfo.msg,
                      showCancel: false,
                      confirmColor: '#007aff'
                    })
                  }
                },
                fail: function () {
                  console.log("no");
                }
              })
            }
          },
        })

      }

    }    
  },
  //注册账号
  formSubmit: function (e) {
    var that = this;
    var myusers = this.data.myusers;
    var namereg = /^[a-zA-Z0-9]{3,10}$/;//字母，数字，位数3-15位
    var pwdmyreg = /^[a-zA-Z0-9_]{3,10}$/;//字母，数字，下划线，位数3-15位
    if (e.detail.value.Name == "") {
      wx.showModal({
        title: '提示',
        content: '用户名必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!namereg.test(e.detail.value.Name)) {
      wx.showModal({
        title: '提示',
        content: '用户名可以为字母，数字，位数3-15位',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.Pwd == "") {
      wx.showModal({
        title: '提示',
        content: '密码必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!pwdmyreg.test(e.detail.value.Pwd)) {
      wx.showModal({
        title: '提示',
        content: '密码可以为字母，数字，下划线，位数3-15位',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.Pwd != e.detail.value.RePwd) {
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else {
      that.setData({
        show1: true,
        show3: false,
        myusers: e.detail.value
      });
    }
  },
  //下一步
  formSubmit2: function (e) {
    var that = this;
    // console.log(e.detail.value);
    var myusers = this.data.myusers;
    var userids = this.data.userids;
    var userpwds = this.data.userpwds;
    var username = /^[\u4E00-\u9FA5A-Za-z]+$/;//只能输入中文或英文
    var phone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;//手机号
    var miyaos = this.data.miyaos;
    if (e.detail.value.Names == "") {
      wx.showModal({
        title: '提示',
        content: '用户姓名必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!username.test(e.detail.value.Names)) {
      wx.showModal({
        title: '提示',
        content: '用户姓名只能输入中文或英文',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.phones == "") {
      wx.showModal({
        title: '提示',
        content: '手机号必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (that.data.files.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '选择头像',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!phone.test(e.detail.value.phones)) {
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.sex == "") {
      wx.showModal({
        title: '提示',
        content: '性别必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.sr == "") {
      wx.showModal({
        title: '提示',
        content: '生日必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    if (miyaos == 0) {

      if (e.detail.value.miyao == "") {
        wx.showModal({
          title: '提示',
          content: '公司秘钥必填',
          showCancel: false,
          confirmColor: '#007aff'
        })
        return false;
      }
      else {
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            for (var i = 0; i < that.data.files.length; i++) {
              wx.uploadFile({
                url: that.data.durl + '/api/Sys/User/AddUser',
                filePath: that.data.files[i],
                name: 'image',
                header: { 'content-type': 'multipart/form-data' },
                formData: {
                  OpenId: res.data,
                  UserId: myusers.Name,
                  UserPwd: myusers.Pwd,
                  UserName: e.detail.value.Names,
                  UserPhone: e.detail.value.phones,
                  Sex: that.data.radioStr,
                  Birth: that.data.begindate,
                  CompanyId: e.detail.value.miyao
                },
                success: function (resd) {
                  var datainfo = JSON.parse(resd.data);
                  // console.log(datainfo)
                  if (datainfo.code == 100) {
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 3000
                    });
                    //获取公司id
                    wx.request({
                      url: that.data.durl + '/api/Bos/Wo/GetEmpInfo',
                      data: {
                        OpenId: res.data,
                      },
                      method: "GET",
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (companyIdRes) {
                        // console.log(companyIdRes.data.data[0].CompanyID);
                        if (companyIdRes.data.code == 100) {
                          wx.setStorage({
                            key: 'CompanyId',
                            data: companyIdRes.data.data[0].CompanyID,
                          })
                        }
                      },
                      fail: function () {
                        console.log("no");
                      }
                    })

                  }
                  else if (datainfo.code == 104) {
                    if (datainfo.msg == "此UserId已在本公司注册") {
                      that.setData({
                        index: 0,
                        show1: false,
                        show3: true
                      });

                    }
                    wx.showModal({
                      title: '提示',
                      content: datainfo.msg,
                      showCancel: false,
                      confirmColor: '#007aff'
                    })
                  }
                },
                fail: function (e) {
                  console.log(e.data);
                }
              })
            }

          },
        })
      }
    }
    if (miyaos == 1) {
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          for (var i = 0; i < that.data.files.length; i++) {
            wx.uploadFile({
              url: that.data.durl + '/api/Sys/User/AddUser2',
              filePath: that.data.files[i],
              name: 'image',
              header: { 'content-type': 'multipart/form-data' },
              formData: {
                OpenId: res.data,
                UserId: userids,
                UserPwd: userpwds,
                UserName: e.detail.value.Names,
                UserPhone: e.detail.value.phones,
                Sex: that.data.radioStr,
                Birth: that.data.begindate,
              },
              success: function (resd) {
                var datainfo = JSON.parse(resd.data);
                //  console.log(datainfo)
                if (datainfo.code == 100) {
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 3000
                  });
                  // 获取公司id
                  wx.request({
                    url: that.data.durl + '/api/Bos/Wo/GetEmpInfo',
                    data: {
                      OpenId: res.data,
                    },
                    method: "GET",
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (companyIdRes) {
                      // console.log(companyIdRes.data.data[0].CompanyID);
                      if (companyIdRes.data.code == 100) {
                        wx.setStorage({
                          key: 'CompanyId',
                          data: companyIdRes.data.data[0].CompanyID,
                        })
                      }
                    },
                    fail: function () {
                      console.log("no");
                    }
                  })

                }
                else if (datainfo.code == 104) {
                  wx.getStorage({
                    key: 'openid',
                    success: function (openIdRes) {
                      wx.request({
                        url: that.data.durl + '/api/Company/DelCompany',
                        data: {
                          OpenId: openIdRes.data,
                        },
                        method: "GET",
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (companyIdRes) {
                          // console.log(companyIdRes.data);                          
                        },
                        fail: function () {
                          console.log("no");
                        }
                      })
                    },
                  })
                  if (datainfo.msg == "此UserId已在本公司注册") {
                    that.setData({
                      index: 0,
                      show1: false,
                      show3: true
                    });

                  }
                  wx.showModal({
                    title: '提示',
                    content: datainfo.msg,
                    showCancel: false,
                    confirmColor: '#007aff'
                  })
                }
              },
              fail: function (e) {
                console.log(e.data);
              }
            })
          }

        },
      })
    }
  },
  //注册公司
  formSubmit1: function (e) {
    // console.log(e.detail.value)
    var that = this;
    var userids = this.data.userids;
    var userpwds = this.data.userpwds;
    var miyaos = this.data.miyaos;
    // console.log(e.detail.value);
    var comname = /^[\u4E00-\u9FA5A-Za-z]+$/;//只能输入中文或英文
    var phone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;//手机号
    var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;//邮箱
    var namereg = /^[a-zA-Z0-9]{3,10}$/;//字母，数字，位数3-15位
    var pwdmyreg = /^[a-zA-Z0-9_]{3,10}$/;//字母，数字，下划线，位数3-15位
    if (e.detail.value.CompanyName == "") {
      wx.showModal({
        title: '提示',
        content: '公司名称必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!comname.test(e.detail.value.CompanyName)) {
      wx.showModal({
        title: '提示',
        content: '公司名称只能输入中文或英文',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (that.data.files.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '选择logo',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.CompanyPhone == "") {
      wx.showModal({
        title: '提示',
        content: '电话必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!phone.test(e.detail.value.CompanyPhone)) {
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.CompanyEmail == "") {
      wx.showModal({
        title: '提示',
        content: '邮箱必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!email.test(e.detail.value.CompanyEmail)) {
      wx.showModal({
        title: '提示',
        content: '邮箱格式不正确',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.UserID == "") {
      wx.showModal({
        title: '提示',
        content: '账号必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!namereg.test(e.detail.value.UserID)) {
      wx.showModal({
        title: '提示',
        content: '账号是字母，数字，位数3-15位',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (e.detail.value.UserPWD == "") {
      wx.showModal({
        title: '提示',
        content: '密码必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else if (!pwdmyreg.test(e.detail.value.UserPWD)) {
      wx.showModal({
        title: '提示',
        content: '密码为字母，数字，下划线，位数3-15位',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    }
    else {
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          for (var i = 0; i < that.data.files.length; i++) {
            wx.uploadFile({
              url: that.data.durl + '/api/Company/AddRegCompany',
              filePath: that.data.files[i],
              name: 'image',
              header: { 'content-type': 'multipart/form-data' },
              formData: {
                CompanyName: e.detail.value.CompanyName,
                OpenId: res.data,
                CompanyPhone: e.detail.value.CompanyPhone,
                CompanyEmail: e.detail.value.CompanyEmail
              },
              success: function (resd) {
                var datainfo = JSON.parse(resd.data);
                if (datainfo.code == 100) {
                  that.setData({
                    show1: true,
                    show3: false,
                    userids: e.detail.value.UserID,
                    userpwds: e.detail.value.UserPWD,
                    miyaos: 1
                  })
                }
                else {
                  that.setData({
                    miyaos: 0
                  })
                  wx.showModal({
                    title: '提示',
                    content: datainfo.msg,
                    showCancel: false,
                    confirmColor: '#007aff'
                  })
                }
              },
              fail: function () {
                console.log("no");
              }
            })
          }

        },
      })
    }
  }
})
