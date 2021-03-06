// pages/editbonusitem/editbonusitem.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserpinyinSouce: [],//员工拼音
    ShowTop: false,//员工自动补全
    ShowDepTop: false,//部门自动补全
    durl: app.globalData.ddurl,
    bindUserSource: [],//得到的员工自动补全信息
    bindDepSource: [],//得到的部门自动补全信息
    DepSouces: [],//部门拼音
    BonusItemArry: [],
    inputValue: '',//选择的openid
    inputName: '',//选择的名字
    DepinputValue: '',//选择的部门id
    DepinputName: '',//选择的部门名字
    IsActive: '',//启用状态
    BItemType: '',//奖金类型
    BonusItemId: '',//奖金项id
    DepShow: false,//是否显示收益部门
    CompanyId: ''//测试用的，到时从前面获取
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      CompanyId: wx.getStorageSync('CompanyId'),

    })
    Promise.all([
      //人员拼音
      this.UserPinyin(),
      //部门拼音
      this.DepPinyin(),
      //找到编辑的奖金项
      this.SelectBonusItem(),
      //得到这个公司下所有部门
      this.SelectDep(),
      //得到这个公司下所有员工
      this.SelectEmp()
    ])

  },
  //得到这个公司下所有员工
  SelectEmp() {

  },
  //得到这个公司下所有部门
  SelectDep() {

  },
  //找到编辑的奖金项
  SelectBonusItem() {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.getStorage({
        key: 'BonusItemId',
        success: function (resc) {
          wx.request({
            url: that.data.durl + '/api/Bos/BonusItem/GetBonusItem',
            data: {

              BonusItemId: resc.data
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.code == 100) {

                that.setData({
                  BonusItemArry: res.data.data,
                  inputValue: res.data.data[0].OpenId,
                  BonusItemId: resc.data,
                  DepShow: res.data.data[0].BItemType,
                  inputName: res.data.data[0].UserName,
                  BItemType: res.data.data[0].BItemType ? 1 : 0,
                  IsActive: res.data.data[0].IsActive ? 1 : 0,
                  DepinputName: res.data.data[0].DepName,
                  DepinputValue: res.data.data[0].DepId
                })
                resolve();
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                })
              }

            },
            fail: function () {
              console.log("no");
            }
          })
        },
      })

    })

  },
  //人员拼音
  UserPinyin() {
    console.log("DepPinyin");
    var that = this;

    return new Promise(function (resolve, reject) {
      wx.getStorage({
        key: 'BonusItemId',
        success: function (resc) {
          wx.request({
            url: that.data.durl + '/api/Sys/PinYin/GetPinYin',
            method: "GET",
            data: {
              CompanyId: that.data.CompanyId
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log("员工拼音：" + res.data.data);
              if (res.data.code = 100) {
                that.setData({
                  UserpinyinSouce: res.data.data,
                  ShowTop: true
                })
              }
              else {
                that.setData({
                  UserpinyinSouce: [],
                  ShowTop: true
                })
              }

              resolve();
            },
            fail: function () {
              console.log("no");
            }
          })
        },
      })

    })

  },
  //部门输入框
  bindDep: function (e) {
    var that = this;
    var ShowDepTop = this.data.ShowDepTop;
    var prefix = e.detail.value //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.DepSouces.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出名字
          wx.request({
            url: that.data.durl + '/api/Sys/PinYin/GetDepName',
            data: {
              DepName: e,
              CompanyId: that.data.CompanyId
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {

              e = res.data.data;
              //console.log(res.data.data);
              newSource.push(e);
              if (newSource.length != 0) {
                that.setData({
                  bindDepSource: newSource,
                  ShowDepTop: true
                })
              }
              else {
                that.setData({
                  bindDepSource: [],
                  ShowDepTop: false
                })
              }
            },
            fail: function () {
              console.log("no");
            }
          })
        }
      })
    }
    else {
      this.setData({

        bindDepSource: [],
        ShowTop: false,
        DepinputValue: ''
      })
    }

  },
  //部门拼音
  DepPinyin() {

    var that = this;

    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.data.durl + '/api/Sys/PinYin/GetDepPY',
        method: "GET",
        data: {
          CompanyId: that.data.CompanyId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.data);
          that.setData({
            DepSouces: res.data.data,
            ShowDepTop: true
          })
        },
        fail: function () {
          console.log("no");
        }
      })

    })

  },
  //员工输入框
  bindUser: function (e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var prefix = e.detail.value //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.UserpinyinSouce.forEach(function (e) {
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
            success: function (res) {

              e = res.data.data;
              //console.log(res.data.data);
              newSource.push(e);
              if (newSource.length != 0) {
                that.setData({
                  bindUserSource: newSource,
                  ShowTop: true
                })
              }
              else {
                that.setData({
                  bindUserSource: [],
                  ShowTop: false
                })
              }
            },
            fail: function () {
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
    }
    else {
      this.setData({

        bindDepSource: [],
        ShowTop: false,
        inputValue: ''
      })
    }
  },
  //选择负责人
  Useritemtap: function (e) {
    var ShowTop = this.data.ShowTop;
    this.setData({
      inputValue: e.target.id.split(',')[1],
      inputName: e.target.id.split(',')[0],
      bindUserSource: [],
      ShowTop: false
    })
  },
  //选择部门
  Depitemtap: function (e) {
    var ShowDepTop = this.data.ShowDepTop;
    this.setData({
      DepinputValue: e.target.id.split(',')[0],
      DepinputName: e.target.id.split(',')[1],
      bindDepSource: [],
      ShowDepTop: false
    })
  },
  //是否启用选择 0启用；1禁用
  ActiveChange: function (e) {
    this.setData({
      IsActive: e.detail.value
    });
  },
  //奖金类型 0公司级；1部门级
  TypeChange: function (e) {
    var BitenType = e.detail.value;
    //如果为部门级奖金
    if (BitenType == 1) {
      this.setData({
        BItemType: e.detail.value,
        DepShow: true
      });

    }
    else {
      this.setData({
        BItemType: e.detail.value,
        DepShow: false
      });
    }

  },

  //提交
  formSubmit: function (e) {
    console.log(parseInt(e.detail.value.InDate));
    var that = this;
    var depIds = 0;
    if (e.detail.value.BonusItemName == "") {
      wx.showModal({
        title: '提示',
        content: '奖金项名称必填',
      })
    }
    else if (isNaN(parseInt(e.detail.value.InDate))) {
      wx.showModal({
        title: '提示',
        content: '有效月份必填',
      })
    }
    else if (parseInt(e.detail.value.InDate) <= 0 || parseInt(e.detail.value.InDate) > 12) {
      wx.showModal({
        title: '提示',
        content: '有效日期范围在1-12之间',
      })
    }

    else if (that.data.inputValue == "") {
      wx.showModal({
        title: '提示',
        content: '负责人必选',
      })
    }

    else {
      if (that.data.BItemType == 1) {
        //部门级奖金就需要选择部门
        if (that.data.DepinputValue == '') {
          wx.showModal({
            title: '提示',
            content: '部门级奖金项请选择受益部门',
          })
          return;
        }
        else {
          depIds = that.data.DepinputValue;
        }
      }
      wx.request({
        url: that.data.durl + '/api/Bos/BonusItem/UpdBonusItem',
        method: "POST",
        data: {
          BonusItemId: that.data.BonusItemId,//奖金项id
          BonusItemName: e.detail.value.BonusItemName,//奖金项名字
          IsActive: that.data.IsActive,//是否有效
          OpenId: that.data.inputValue,//openid
          CompanyId: that.data.CompanyId,//公司id
          InDate: e.detail.value.InDate,//有效日期
          DepId: depIds,//部门id
          BItemType: that.data.BItemType
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (resd) {

          if (resd.data.code == 100) {
            console.log(resd.data.data);
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: resd.data.msg,
            })
          }
        },
        fail: function () {
          console.log("fail");
        }
      })
    }

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