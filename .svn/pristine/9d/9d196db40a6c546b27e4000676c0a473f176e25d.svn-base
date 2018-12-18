// pages/onecenter/onecenter.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    begindate: "", //时间
    files: "", //第二种
    durl: app.globalData.ddurl,
    name: "",
    radio: "0",
    phone: "",
    birth: "",
    emails:"",
    items: [
      { name: '1', value: '男', checked: 'true' },
      { name: '0', value: '女', checked: 'false' }
    ],
  },
  radioChange: function (e) {
    var radio = this.data.radio;
    this.setData({
      radio: e.detail.value
    })
  },
  changeBegindate(e) {
    var begindate = this.data.begindate;
    this.setData({
      begindate: e.detail.value
    });
  },
  formSubmit: function (e) {
    var that = this;
    var radio = this.data.radio;
    var begindate = this.data.begindate;
    var phone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/; //手机号
    var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;//邮箱
    if (e.detail.value.UserPhone == "") {
      wx.showModal({
        title: '提示',
        content: "手机号必填",
        showCancel: false,
        confirmColor: '#007aff'
      })
      return;
    }
    else if (!phone.test(e.detail.value.UserPhone)) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确",
        showCancel: false,
        confirmColor: '#007aff'
      })
      return;
    }
    else if (e.detail.value.Useremails == "") {
      wx.showModal({
        title: '提示',
        content: "邮箱必填",
        showCancel: false,
        confirmColor: '#007aff'
      })
      return;
    }
    else if (!email.test(e.detail.value.Useremails)) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确",
        showCancel: false,
        confirmColor: '#007aff'
      })
      return;
    }
    else {
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          // console.log(radio);
          wx.request({
            url: that.data.durl + '/api/User/UpdBaseInfo',
            data: {
              OpenId: res.data,
              Sex: radio,
              UserPhone: e.detail.value.UserPhone,
              Birth: begindate,
              UserEmail: e.detail.value.Useremails
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (ress) {
              if (ress.data.code == 100) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 3000
                });
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
    }
  },
  chooseImage: function (e) {
    var that = this;
    var files = this.data.files;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths
        });
      },
      complete: function () {
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            wx.uploadFile({
              url: that.data.durl + '/api/User/UpdLogo',
              filePath: that.data.files[0],
              name: 'image',
              header: {
                'content-type': 'multipart/form-data'
              },
              formData: {
                OpenId: res.data,
              },
              success: function (resda) {
                //do something
                // console.log(resda.data);
                var datainfo = JSON.parse(resda.data);
                if (datainfo.code == 100) {
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 3000
                  });
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
              fail: function (e) {
                console.log(e.data);
              }
            })
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var begindate = this.data.begindate;
    var files = this.data.files;
    var name = this.data.name;
    var radio = this.data.radio;
    var phone = this.data.phone;
    var birth = this.data.birth;
    var emails = this.data.emails;
    //查询本地匹配数据源
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            //查询个人信息
            wx.request({
              url: that.data.durl + '/api/Bos/Wo/GetEmpInfo',
              data: {
                OpenId: res.data,
                CompanyId: resc.data
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (ress) {
                console.log(ress.data)
                if (ress.data.code == 100) {
                  if (ress.data.data[0].Sex){
                    var aa = that.data.items;
                    aa[0].checked = true;
                    aa[1].checked = false;
                    that.setData({
                      items: aa
                    })
                  }
                  else{
                    var aa = that.data.items;
                    aa[1].checked = true;
                    aa[0].checked = false;
                    that.setData({
                      items: aa
                    })
                  }
                  var photos = ress.data.data[0].Photo.indexOf('https');
                  that.setData({
                    
                    name: ress.data.data[0].UserName,
                    emails: ress.data.data[0].UserEmail,
                    phone: ress.data.data[0].UserPhone,
                    begindate: ress.data.data[0].Birth
                  })
                  if (photos == -1) {
                    that.setData({
                      files: that.data.durl +ress.data.data[0].Photo,
                    })
                  }
                  else {
                    that.setData({
                      files: ress.data.data[0].Photo,
                    })
                  }
                  
                } else {
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
      fail: function (e) {
        console.log("sadfsad");
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})