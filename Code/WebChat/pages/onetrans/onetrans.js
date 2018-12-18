// pages/onetrans/onetrans.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    max: 10,
    currentlength: 0,
    ShowTop: false,
    inputValue: '',//点击结果项之后替换到文本框的值
    inputName: '',
    adapterSource: [],//本地匹配源
    bindSource: [],//绑定到页面的数据，根据用户输入动态变化
    geprice: 0,
    durl: app.globalData.ddurl,
  },
  formSubmit: function (e) {
    var that = this;
    var geprice = this.data.geprice;
    var inputName = this.data.inputName;
    // console.log("inputName:" + inputName)
    if (e.detail.value.EarMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写您的姓名',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (e.detail.value.EarMoney == "") {
      wx.showModal({
        title: '提示',
        content: '请输入金额',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (!(/^\d{1,}$/.test(e.detail.value.EarMoney))) {
      wx.showModal({
        title: '提示',
        content: '金额为数字',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    // else if (e.detail.value.ResonContent == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入原因',
    //     showCancel: false,
    //     confirmColor: '#007aff'
    //   });
    // }
    else {
      //提交
      var openid = '';
      if (inputName != "") {
        openid = inputName;
      } else {
        // openid = resp.data;
        wx.showModal({
          title: '提示',
          content: '请输入有效的人员',
          showCancel: false,
          confirmColor: '#007aff'
        })
        return;
      }
      wx.getStorage({
        key: 'openid',
        success: function (resop) {
          wx.getStorage({
            key: 'CompanyId',
            success: function (resc) {
              wx.request({
                url: that.data.durl+'/api/Bos/Wo/AddTrading',
                data: {
                  CompanyId: resc.data,
                  DisMan: resop.data,
                  EarMan: openid,
                  Remark: e.detail.value.ResonContent,
                  TradingMoney: e.detail.value.EarMoney,
                  HaveMoney: geprice
                },
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (ress) {
                  // console.log(ress.data);
                  if (ress.data.code == 100) {
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 3000
                    });
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
      })
    }
  },
  TextareaInput: function (e) {
    var that = this;
    if (e.detail.cursor >= 10) {
      wx.showModal({
        title: '提示',
        content: '不可超过10',
      })
    }
    else {
      var currentlength = this.data.currentlength;
      that.setData({
        currentlength: e.detail.cursor
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var grprice = options.grprice;
    var geprice = this.data.geprice;
    this.setData({
      geprice: grprice
    })
    var adapterSource = this.data.adapterSource;
    var ShowTop = this.data.ShowTop;
    //查询本地匹配数据源
    //查询本地匹配数据源
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl +'/api/Sys/PinYin/GetPinYin',
          method: "GET",
          data: {
            CompanyId: resc.data
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //console.log(res.data.data);
            that.setData({
              adapterSource: res.data.data,
              ShowTop: true
            })
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    })
  },
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var prefix = e.detail.value //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出名字
          wx.getStorage({
            key: 'CompanyId',
            success: function (resc) {
              // console.log("123:" + e);
              wx.request({
                url: that.data.durl +'/api/Sys/PinYin/GetUserName',
                data: {
                  pinyin: e,
                  CompanyId: resc.data
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  // console.log(res.data.data);
                  e = res.data.data;

                  newSource.push(e);
                  if (newSource.length != 0) {
                    that.setData({
                      bindSource: newSource,
                      ShowTop: true
                    })
                  }
                  else {
                    that.setData({
                      bindSource: [],
                      ShowTop: false
                    })
                  }
                },
                fail: function () {
                  console.log("no");
                }
              })
            },
          })
          // newSource.push(e)
        }
      })
    }
    else {
      that.setData({
        bindSource: [],
        ShowTop: false
      })
    }
  },
  itemtap: function (e) {
    var ShowTop = this.data.ShowTop;
    this.setData({
      inputValue: e.target.id.split(',')[0],
      inputName: e.target.id.split(',')[1],
      bindSource: [],
      ShowTop: false
    })
  },
  Saoyisao: function () {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var inputValue = this.data.value;
    var inputName = this.data.inputName;
    //扫一扫 通过工号找到姓名
    wx.scanCode({
      success: (rescode) => {
        // console.log(rescode.result)
        wx.getStorage({
          key: 'CompanyId',
          success: function (resc) {
            wx.request({
              url: that.data.durl +'/api/Bos/SendBonus/CheckQRValid',
              data: {
                UserId: rescode.result,
                CompanyId: resc.data
              },
              method: "GET",
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                // console.log(res.data);
                if (res.data.code == 100) {
                  that.setData({
                    inputValue: res.data.data[0].UserName,
                    inputName: res.data.data[0].OpenId,
                  })
                }
                else {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
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
      fail: function () {
        wx.showModal({
          title: '提示',
          content: "程序错误",
          showCancel: false,
          confirmColor: '#007aff'
        })
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

  }
})