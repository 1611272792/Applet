// pages/usermanager/addusermanager.js
var dateTimePicker = require('../../src/js/datepike.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinDate: "",//入职日期
    durl: app.globalData.ddurl,
    array: ['美国', '中国', '巴西', '日本'],
    showRight1: false,

    countryList: [],
    countryIndex: 0,
    currentItem: null,
    positItem: 0,
    adapterSource: [],
    ShowTop: false,
    RoleArry: [],
    selectRole: '',//选择的角色
    OutCtflag: null,//是否离职标志0在职；1离职
    UserArryE: [],//需要编辑的数据
    PositArry: [],//职位
    selectPosit: [],
    openid: '',
    inputValue: '',//部门id
    inputName: '',//部门名
    PosId: '',//职位id
    PosName: '',//职位名称
    companyId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      companyId: wx.getStorageSync('CompanyId')
    })
    //通过userid得到这个人的信息
    Promise.all([

      this.GetUserInfo(),
      // this.BonusItem(),
      this.DepPinyin(),
      this.RoleItem(),
      this.PositItem()
    ]).then(function (data) {

      console.log("that.data.UserArryE.length:" + that.data.UserArryE.length);
      if (that.data.UserArryE.length > 0) {
        console.log("角色id：" + that.data.UserArryE[0].userName);
        var RoleId = that.data.UserArryE[0].RoleId;//传过来的权限
        for (var i = 0; i < that.data.RoleArry.length; i++) {
          if (that.data.RoleArry[i].RoleId == RoleId) {
            that.setData({
              currentItem: i
            })

          }

        }


        // const x =await this.GetUserInfo();
        // const y =await this.GetUserInfo();
      }
    })

  },
  //通过openid得到这个人的信息
  GetUserInfo() {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log("GetUserInfo");

      wx.getStorage({
        key: 'EditopenId',
        success: function (resdp) {
          that.setData({
            openid: resdp.data
          })
          wx.request({
            url: that.data.durl + '/api/Sys/User/GetUserInfo',
            method: "GET",
            data: {
              OpenId: resdp.data
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (resd) {
              var countryIndexs = 0;
              if (resd.data.code == 100) {
                var jd = '';
                if (resd.data.data[0].JoinDate != null) {
                  jd = resd.data.data[0].JoinDate.substring(0, 10);
                }
                console.log();
                that.setData({
                  UserArryE: resd.data.data,
                  inputName: resd.data.data[0].DepName,
                  inputValue: resd.data.data[0].DepId,
                  selectPosit: resd.data.data[0].PostId,
                  joinDate: jd,
                  PosId: resd.data.data[0].PostId,
                  PosName: resd.data.data[0].PostName,
                  OutCtflag: resd.data.data[0].IsOut,
                  selectRole: resd.data.data[0].RoleId
                })
                //通过部门id查这个部门的职位有哪些
                wx.request({
                  url: that.data.durl + '/api/Sys/Position/GetDepPosInfo',
                  method: "GET",
                  data: {
                    DepId: that.data.inputValue,
                    CompanyId: that.data.companyId
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (resd) {
                    var countryIndexs = 0;
                    if (resd.data.code == 100) {
                      console.log(resd.data.data1);
                      if(resd.data.data1.length>0){
                        that.setData({
                          PositArry: resd.data.data1,
                          selectPosit: resd.data.data1[0].PostId
                        })
                      }
                     

                    }
                    else {
                      that.setData({
                        PositArry: [],
                        selectPosit: ''
                      })
                    }
                  },
                  fail: function () {
                    console.log("fail");
                  }
                })
                resolve();
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
        },
      })
      console.log("GetUserInfo2");
    })

  },
  //职位
  PositItem: function () {

  },
  //人员删除
  UserDel: function (e) {
    var that = this;
   
    var UserId = that.data.openid;
   
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      confirmText: "删除",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          // 删除
          wx.request({
            url: that.data.durl + '/api/Sys/User/DelUser',
            data: {
              OpenId: UserId
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (resd) {
              console.log(resd.data);
              if (resd.data.code == 100) {
               
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 3000
                });

                wx.redirectTo({
                  url: '../usermanager/usermanager',
                })

              } else if (resd.data.code == 104) {
                wx.showModal({
                  title: '提示',
                  content: resd.data.msg,
                })
              }
            },
            fail: function () {
              console.log("no");
            }
          })
        } else {
          //取消
        }
      }
    });
  },
  BonusItem: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.15.164:3322/api/Demo2',
      method: "GET",
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log("奖金项:" + res.data.data[0].BName);
        that.setData({
          array: res.data.data
        });
      }
    })
  },
  DepPinyin: function () {

    var that = this;
    wx.request({
      url: that.data.durl + '/api/Sys/PinYin/GetDepPY',
      method: "GET",
      data: {
        CompanyId: that.data.companyId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data);
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
  //权限
  RoleItem() {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log("RoleItem");

      wx.request({
        url: that.data.durl + '/api/Sys/Role/GetAllRole',
        data: {
          CompanyId: that.data.companyId,
          Sign: 2
        },
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (resd) {
          console.log('ss' + resd.data.data);
          that.setData({
            RoleArry: resd.data.data
          });
          resolve();
        },
        fail: function () {
          console.log("no");
        }
      })
    })

  },
  changeDate: function (e) {

    this.setData({ joinDate: e.detail.value });
  },
  //选择职位
  bindPositChange: function (e) {
    var that = this;
    // console.log(this.data.PositArry[e.detail.value].PostId); //得到选中的值
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    if (that.data.PositArry != null) {
      if (that.data.PositArry.length > 0) {
        that.setData({
          selectPosit: that.data.PositArry[e.detail.value].PostId,
          PosName: that.data.PositArry[e.detail.value].PostName
        })
      }

    }

  },
  //选择角色
  bindRoleChange: function (e) {
    var that = this;
    console.log(this.data.RoleArry[e.detail.value].RoleId);  //得到选中的值
    console.log('picker发送选择改变，携带值为', e.detail.value);
    that.setData({
      selectRole: that.data.RoleArry[e.detail.value].RoleId,

      currentItem: e.detail.value
    })
  },
  //部门拼音简写
  bindDep: function (e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var prefix = e.detail.value //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出名字
          wx.request({
            url: that.data.durl + '/api/Sys/PinYin/GetDepName',
            data: {
              DepName: e,
              CompanyId: that.data.companyId
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
                  ShowTop: true
                })
              }
              else {
                that.setData({
                  bindDepSource: [],
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
        ShowTop: false
      })
    }

  },
  //选择部门
  Depitemtap: function (e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    console.log(e);
    this.setData({
      inputValue: e.target.id.split(',')[0],
      inputName: e.target.id.split(',')[1],
      bindDepSource: [],
      ShowTop: false
    })
    //通过部门id查这个部门的职位有哪些
    wx.request({
      url: that.data.durl + '/api/Sys/Position/GetDepPosInfo',
      method: "GET",
      data: {
        DepId: that.data.inputValue,
        CompanyId: that.data.companyId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (resd) {
        var countryIndexs = 0;
        if (resd.data.code == 100) {
          console.log(resd.data.data1);
          if (resd.data.data1 != null) {
            that.setData({
              PositArry: resd.data.data1,
              selectPosit: resd.data.data1[0].PostId,
              PosName: resd.data.data1[0].PostName
            })
          }
          else {
            that.setData({
              PositArry: null,
              selectPosit: '',
              PosName: '暂无职位'
            })
          }
        }
        else {
          that.setData({
            PositArry: null,
            selectPosit: '',
            PosName: '暂无职位'
          })
        }
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  //离职状态
  radioChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      OutCtflag: e.detail.value
    });
  },
  //提交
  formSubmit: function (e) {
    var that = this;
    if (that.data.inputValue == "") {
      wx.showModal({
        title: '提示',
        content: '部门必选',
      })
    }
    else if (e.detail.value.UserName == "") {
      wx.showModal({
        title: '提示',
        content: '姓名必填',
      })
    }
    else if (that.data.selectPosit == "") {
      wx.showModal({
        title: '提示',
        content: '职位必选',
      })
    }
    else if (that.data.selectPosit == null) {
      wx.showModal({
        title: '提示',
        content: '职位必选',
      })
    }
    else if (that.data.OutCtflag == null) {
      // console.log("入职状态：" + );
      wx.showModal({
        title: '提示',
        content: '入职状态必选',
      })
    }
    else {
      console.log("角色id：" + that.data.selectPosit);
      wx.request({
        url: that.data.durl + '/api/Sys/User/UpdMUser',
        method: "POST",
        data: {
          JoinDate: that.data.joinDate,//入职日期
          IsOut: that.data.OutCtflag,//是否离职
          DepId: that.data.inputValue,//部门id
          PostId: that.data.selectPosit,//职位id
          CompanyId: that.data.companyId,//公司id
          RoleId: that.data.selectRole,//角色id
          OpenId: that.data.openid,//
          UserName: e.detail.value.UserName
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
              title: '提示2',
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
    console.log("bbb");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("ccc");
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