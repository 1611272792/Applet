// pages/addbonusinpower/addbonusinpower.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beizhu: '', //备注
    UserpinyinSouce: [],
    ShowTop: false,
    inputValue: '',
    inputName: '',
    bindUserSource: '',
    BonusItemName: '', //奖金项名字
    BonusItemId: '', //奖金项id
    Model: 1, //模式0本月有效；1长期有效
    currentlength: 0, //当前备注输入的字数
    durl: app.globalData.ddurl,
    CompanyId: '',
    OpenId: '' //奖金项负责人

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //从缓存里面取openid和公司id
    that.setData({
      OpenId: wx.getStorageSync('openid'),
      CompanyId: wx.getStorageSync('CompanyId'),
    })

    Promise.all([
      //人员拼音
      this.UserPinyin(),

    ])
    //奖金项名字
    wx.getStorage({
      key: 'BonusItemName',
      success: function(res) {
        that.setData({
          BonusItemName: res.data
        })
      }
    })
    //奖金项id
    wx.getStorage({
      key: 'BonusItemId',
      success: function(res) {
        that.setData({
          BonusItemId: res.data
        })
      }
    })

    //奖金项负责人
    wx.getStorage({
      key: 'OpenId',
      success: function(res) {
        that.setData({
          OpenId: res.data
        })
      }
    })
  },
  //人员拼音
  UserPinyin() {
    var that = this;

    return new Promise(function(resolve, reject) {
      wx.request({
        url: that.data.durl + '/api/Sys/PinYin/GetPinYin',
        method: "GET",
        data: {
          CompanyId: that.data.CompanyId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          //console.log(res.data.data);
          that.setData({
            UserpinyinSouce: res.data.data,
            ShowTop: true
          })
          resolve();
        },
        fail: function() {
          console.log("no");
        }
      })

    })

  },
  //选择负责人
  Useritemtap: function(e) {
    var ShowTop = this.data.ShowTop;
    this.setData({
      inputValue: e.target.id.split(',')[1],
      inputName: e.target.id.split(',')[0],
      bindUserSource: [],
      ShowTop: false
    })
  },
  //员工输入框
  bindUser: function(e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var prefix = e.detail.value //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.UserpinyinSouce.forEach(function(e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出名字
          wx.request({
            url: that.data.durl + '/api/Sys/PinYin/GetUserName',
            data: {
              pinyin: e,
              CompanyId: that.data.CompanyId
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              e = res.data.data;
              //console.log(res.data.data);
              newSource.push(e);
              if (newSource.length != 0) {
                that.setData({
                  bindUserSource: newSource,
                  ShowTop: true
                })
              } else {
                that.setData({
                  bindUserSource: [],
                  ShowTop: false
                })
              }
            },
            fail: function() {
              console.log("no");
            }
          })
          // wx.getStorage({
          //   key: 'CompanyId',
          //   success: function (resc) {

          //   },
          // })
          // newSource.push(e)
        }
      })
    } else {
      this.setData({

        bindDepSource: [],
        ShowTop: false,
        inputValue: ''
      })
    }
  },
  //备注输入
  bindContent: function(e) {
    var that = this;
    if (e.detail && e.detail.value.length > 0) {
      if (e.detail.value.length > 200) {
        wx.showModal({
          title: '提示',
          content: '备注总数不能超过200字',
        })
      } else {
        that.setData({
          beizhu: e.detail.value
        })
      }
    }
  },
  //备注长度
  TextareaInput: function(e) {
    var that = this;
    if (e.detail.cursor >= 20) {
      wx.showModal({
        title: '提示',
        content: '不可超过50字',
        showCancel: false,
        confirmColor: '#007aff'
      })
    } else {
      var currentlength = this.data.currentlength;
      that.setData({
        currentlength: e.detail.cursor
      })
    }
  },
  //模式选择
  ModeChange: function(e) {

    this.setData({
      Model: e.detail.value
    })
  },
  //提交
  formSubmit: function(e) {
    var that = this;

    if (that.data.inputValue == "") {
      wx.showModal({
        title: '提示',
        content: '被授权人必填',
      })
    } else if (e.detail.value.InpowerMoney == "") {
      wx.showModal({
        title: '提示',
        content: '授权金额必填',
      })
    } else if (parseInt(e.detail.value.InpowerMoney) < 0) {
      wx.showModal({
        title: '提示',
        content: '授权金额不能小于0',
      })
    }
    // else if(parseInt(that.data.Num)<parseInt(e.detail.value.RemainNum)){
    //   wx.showModal({
    //     title: '提示',
    //     content: '刨除人数不能大于该奖金项范围的总人数',
    //   })
    // }
    else {

      wx.request({
        url: that.data.durl + '/api/Bos/BonusImpower/AddBonusImpower',
        method: "POST",
        data: {
          BonusItemId: that.data.BonusItemId, //奖金项id
          BItemUser: that.data.OpenId, //授权人
          BImpowerUser: that.data.inputValue, //被授权人
          AddMoney: e.detail.value.InpowerMoney, //授权金额
          Model: that.data.Model, //模式
          Remake: that.data.beizhu //备注

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(resd) {

          if (resd.data.code == 100) {
            console.log(resd.data.data);
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          } else if (resd.data.code == 105) {
            wx.showModal({
              title: '提示',
              content: '该奖金项最多可授权:' + resd.data.msg,
            })
          } else {
            wx.showModal({
              title: '提示',
              content: resd.data.msg,
            })
          }
        },
        fail: function() {
          console.log("fail");
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})