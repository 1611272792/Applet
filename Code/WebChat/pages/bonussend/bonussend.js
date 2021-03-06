// pages/bonussend/bonussend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],//根据奖金项查的可发放的人
    durl: app.globalData.ddurl,

    OpenId: '',
    CompanyId: '',
    showRight1: false,
    BonusType: 'jiang',//奖金类型
    GrantResonArry: [],//常用原因
    BonusItemArray: [],//奖金项
    currentItem: 0,//奖金项下标
    currentItem2: 0,//常用原因下标
    qtdisable: true,
    moneyArry: [], //奖金参数
    moneys: 0,//选中的金额
    qtmoneys:'',//其他金额
    currentyy: 'tab1',
    currentyy_scroll: 'tab1',
    currentyyshow: true,
    chooseImg: [],
    ResonContent: '',//常用原因文字
    respImg: '',//前台传给我的图片文件
    ShowTop: false,
    bindUserSource: [],//用户拼音简写
    UserPin: [],//原因
    qtReson: ''//其他原因，用于添加常用原因验证
    ,searchValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },
  //查询奖金项
  SelectBonusItem: function () {
    var that = this;
    console.log('查询奖金项1');
    wx.request({
      url: that.data.durl + '/api/Bos/Wo/GetItemsBonus',
      data: {
        CompanyId: that.data.CompanyId,
        OpenId: that.data.OpenId
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        console.log(resd.data.code);
        if (resd.data.code == "100") {
          console.log('查询奖金项');
          var Bonus = new Array();
          if (resd.data.data != null) {
            for (var i = 0; i < resd.data.data.length; i++) {
              resd.data.data[i].BonusItemName += ':(' + resd.data.data[i].RemainMoney + ')';
              Bonus.push(
                resd.data.data[i]

              )
            }
          }


          if (resd.data.data1 != null) {
            for (var i = 0; i < resd.data.data1.length; i++) {
              resd.data.data1[i].BonusItemName += ':(' + resd.data.data1[i].RemainMoney + ')';
              Bonus.push(
                resd.data.data1[i]

              )
            }

          }
          if(Bonus.length>0){
            for (var item in Bonus) {
              var len = that.data.BonusItemArray.findIndex(items => items.BonusItemId == Bonus[item].BonusItemId && items.RemainMoney == Bonus[item].RemainMoney && items.Type == Bonus[item].Type && items.DepId == Bonus[item].DepId);
              if (len == -1) {
                that.setData({
                  BonusItemArray: Bonus
                })
                that.SelectUserByBID();
                break;
              }
            }
          }
          else{
            that.setData({
              BonusItemArray: Bonus
            })
          }
         

          // Bonus.push(resd.data.data1)


        }
        else {
          that.setData({
            BonusItemArray: []
          })
        }
      },
      fail: function () {
        console.log("no");
      }
    })
  },
  //查询奖金参数
  SelectParams: function (event) {
    console.log("查询奖金项参数" + this.data.CompanyId);
    var that = this;
    wx.request({
      url: that.data.durl + '/api/Sys/BonusParam/GetAllBonusParam',
      data: {
        CompanyId: that.data.CompanyId,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        if (resd.data.code == "100") {
          for (var item in resd.data.data){
            var len = that.data.moneyArry.findIndex(items => items.BonusParamId == resd.data.data[item].BonusParamId && items.BPName == resd.data.data[item].BPName && items.BPMoney == resd.data.data[item].BPMoney);
            if (len == -1) {
              that.setData({
                moneyArry: resd.data.data,
                moneys: resd.data.data[0].BPMoney
              })
              break;
            }
          }
          

         
        }
        else {
          that.setData({
            moneyArry: []
          })
        }
      },
      fail: function () {
        console.log("no");
      }
    })
  },
  //选择原因类型
  handleChange({ detail }) {
    if (detail.key == 'tab1') {
      this.setData({
        currentyy: detail.key,
        currentyyshow: true
      });
      //请求常用原因的接口
      this.SelectGrentReson('1');
    } else {
      this.setData({
        currentyy: detail.key,
        currentyyshow: false,
        ResonContent: this.data.qtReson
      });
    }

  },
  //查常用原因
  SelectGrentReson: function (aa) {
    console.log('查常用原因：'+aa);
    var that = this;
    wx.request({
      url: that.data.durl + '/api/Bos/SendBonus/GetUsualReason',
      data: {
        OpenId: that.data.OpenId,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        if (resd.data.code == "100") {
          if (aa=="1"){
            that.setData({
              GrantResonArry: resd.data.data,
              ResonContent: resd.data.data[that.data.currentItem2].BrContent
            })
          }
          else{

          }
          for (var item in resd.data.data) {
            var len = that.data.GrantResonArry.findIndex(items => items.GrId == resd.data.data[item].GrId && items.BrContent == resd.data.data[item].BrContent);
            if (len == -1) {
              that.setData({
                GrantResonArry: resd.data.data,
                ResonContent: resd.data.data[that.data.currentItem2].BrContent
              })
              break;
            }
          }
         


        }
        else {
          that.setData({
            GrantResonArry: [],
            ResonContent:''
          })
        }
      },
      fail: function () {
        console.log("no");
      }
    })
  },
  //选择常用原因
  bindGrantReson: function (e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    // console.log('sss:' + that.data.GrantResonArry[e.detail.value].BrContent);
    if (that.data.ResonContent.length > 0) {
      that.setData({
        currentItem2: e.detail.value,
        ResonContent: that.data.GrantResonArry[e.detail.value].BrContent
      })
    }

  },
  //奖金项选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    if (this.data.BonusItemArray.length > 0) {
      this.setData({
        currentItem: e.detail.value

      });
      this.SelectUserByBID();
    }


  },
  //扫码
  ScansUser: function () {
    wx.scanCode({
      success: (res) => {
        var personId = res.result;
        var len = this.data.userList.findIndex(item => item.UserId == personId);
        if (len == -1) {
          wx.showModal({
            title: '提示',
            content: '该奖金项不能给该用户发奖金',
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定')
              } else if (res.cancel) {
                cons//ole.log('用户点击取消')
              }
            }
          })
        }
        for (var index in this.data.userList) {
          if (this.data.userList[index].ischeck) {
            if (this.data.userList[index].UserId == personId) {
              wx.showToast({
                title: '该用户已存在',
                icon: 'success',
                duration: 2000
              })
            }
          }
          else {
            this.data.userList[index].ischeck = false;
            if (this.data.userList[index].UserId == personId) {
              this.data.userList[index].ischeck = true;
              break;
            }
          }

        }
        this.setData({
          userList: this.data.userList
        });
      }
    })
  },
  //金额选择
  chooseMoney: function (e) {
    var that = this;

    for (var a in this.data.moneyArry) {

      if (this.data.moneyArry[a].BonusParamId == e.currentTarget.dataset.pid) {
        this.data.moneyArry[a].State = "false";
        this.data.moneys = this.data.moneyArry[a].BPMoney;

      } else {
        this.data.moneyArry[a].State = "true";
      }
    }
    this.setData({
      moneyArry: this.data.moneyArry,
      qtmoneys: ''
    })
  },
  //其他金额
  qtMoney: function (e) {
    console.log("点击" + e);
    for (var a in this.data.moneyArry) {
      this.data.moneyArry[a].State = "true";

    }
    this.setData({
      qtdisable: false,
      moneyArry: this.data.moneyArry,
      moneys: 0
    });
  },
  bindQtMoney: function (e) {
    console.log("输入其他金额：" + e.detail.value);
    if (parseInt(e.detail.value) <= 0 || parseInt(e.detail.value) > 200) {
      wx.showModal({
        title: '提示',
        content: '范围在0-200之间',
        success: function (res) {

        }
      })
    }
    else {
      this.setData({
        moneys: e.detail.value,
        qtmoneys: e.detail.value
      })
    }

  },
  //人员自动补全
  UserSelect: function (e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var prefix = e.detail.value //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      console.log(that.data.UserPin);
      that.data.UserPin.forEach(function (e) {
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
              if (res.data.code == 100) {
                e = res.data.data;
                console.log("sss");
                console.log(e);
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
              }
            },
            fail: function () {
              console.log("no");
            }
          })
          //通过拼音简写找出部门的名字
          wx.request({
            url: that.data.durl + '/api/Sys/PinYin/GetDepName2',
            data: {
              DepName: e,
              CompanyId: that.data.CompanyId
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.code == 100) {
                e = res.data.data;
                console.log("sss");
                console.log(e);
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
              }

            },
            fail: function () {
              console.log("no");
            }
          })
          // newSource.push(e)
        }
      })
    }
    else {
      that.setData({
        bindUserSource: [],
        ShowTop: false
      })
    }
  },
  //自动补全确定
  Binditemtap: function (e) {
    console.log(e.target.id.split(',')[0]);
    var ShowTop = this.data.ShowTop;
    var index = this.data.userList.findIndex(item => item.OpenId == e.target.id.split(',')[1]);
    console.log("343434:" + index);

    if (index != -1) {
      console.log("1:" + this.data.userList.count);
      for (var item in this.data.userList) {
          console.log("2");
        if (this.data.userList[item].OpenId == e.target.id.split(',')[1]) {
          console.log("3");
          if (this.data.userList[item].ischeck) {
            console.log("4");
            wx.showModal({
              title: '提示',
              content: '该用户已存在',
              success: function (res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
            console.log("5");
          }
          else{
            console.log("6");
            this.data.userList[item].ischeck = true;
            this.setData({
              bindUserSource2: [],
              ShowTop2: false,
              searchValue: ''
            })
            console.log("7");
            break;
          }
          
        }
      }
      this.setData({
        // inputValue: e.target.id.split(',')[0],
        // inputName: e.target.id.split(',')[1],
        bindUserSource: [],
        ShowTop: false,
        inputValue: '',
        userList: this.data.userList
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '该用户不存在',
        success: function (res) {
          if (res.confirm) {

          } else if (res.cancel) {

          }
        }
      })
    }

  },
  //多选人员
  ChooseUsers: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      showRight1: !this.data.showRight1
    });
    wx.hideLoading();

  },
  //多选人员确定
  quedingUsers: function (e) {
    this.setData({
      showRight1: !this.data.showRight1,
      userList: this.data.userList
    });
  },
  //多选人员下拉框改变
  checkboxChange: function (e) {
    console.log("checkboxChange:" + e.detail.value);
    for (var index in this.data.userList) {
      this.data.userList[index].ischeck = false;
      for (var index2 in e.detail.value) {
        if (this.data.userList[index].OpenId == e.detail.value[index2]) {
          this.data.userList[index].ischeck = true;
          break;
        }
      }
    }


  },
  //搜索多选人员
  catSearch: function (e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var prefix = e.detail.value //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      console.log(that.data.UserPin);
      that.data.UserPin.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出员工名字
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
              if (res.data.code == 100) {
                e = res.data.data;
                
                //console.log(res.data.data);
                newSource.push(e);
                if (newSource.length != 0) {
                  that.setData({
                    bindUserSource2: newSource,
                    ShowTop2: true
                  })
                }
                else {
                  that.setData({
                    bindUserSource2: [],
                    ShowTop2: false
                  })
                }
              }

            },
            fail: function () {
              console.log("no");
            }
          })
          //通过拼音简写找出部门的名字
          wx.request({
            url: that.data.durl + '/api/Sys/PinYin/GetDepName2',
            data: {
              DepName: e,
              CompanyId: that.data.CompanyId
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.code == 100) {
                e = res.data.data;
                console.log("sss");
                console.log(e);
                //console.log(res.data.data);
                newSource.push(e);
                if (newSource.length != 0) {
                  that.setData({
                    bindUserSource2: newSource,
                    ShowTop2: true
                  })
                }
                else {
                  that.setData({
                    bindUserSource2: [],
                    ShowTop2: false
                  })
                }
              }

            },
            fail: function () {
              console.log("no");
            }
          })
          // newSource.push(e)
        }
      })
    }
    else {
      that.setData({
        bindUserSource2: [],
        ShowTop2: false,

      })
    }
  },
  //删除选择的用户
  delUsers: function (e) {
    console.log(e.currentTarget.dataset.openid);
    var userList = this.data.userList;
    for (var item in userList) {
      if (userList[item].OpenId == e.currentTarget.dataset.openid) {
        userList[item].ischeck = false;
      }
    }
    this.setData({
      userList: userList
    })
  },
  //通过奖金项id得到这个奖金项应该发的人
  SelectUserByBID: function (e) {
    var that = this;
    var depId = that.data.BonusItemArray[that.data.currentItem].DepId;
    wx.request({
      url: that.data.durl + '/api/Bos/SendBonus/GetBenefitList',
      data: {
        DepId: depId,
        CompanyId: that.data.CompanyId,
        BonusItemId: that.data.BonusItemArray[that.data.currentItem].BonusItemId
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        if (resd.data.code == "100") {
          var UserPin = [];
          var UserList = [];
          if (resd.data.data != null) {

            for (var i = 0; i < resd.data.data.length; i++) {
              if (resd.data.data[i].Photo == "" || resd.data.data[i].Photo == null) {
                resd.data.data[i].subName = resd.data.data[i].UserName.substring(0, 1);
              }
              UserPin.push(resd.data.data[i].SpellJP);
              UserList.push(resd.data.data[i]);
            }
          }

          if (resd.data.data1 != null) {
            for (var i = 0; i < resd.data.data1.length; i++) {
              resd.data.data1[i].Photo = "";
              resd.data.data1[i].subName = resd.data.data1[i].UserName.substring(0, 1);
              UserPin.push(resd.data.data1[i].SpellJp);
              UserList.push(resd.data.data1[i]);
            }
          }

          that.setData({
            userList: UserList,
            depList: resd.data.data1,
            UserPin: UserPin
          })
        }
        else {
          that.setData({
            userList: [],
            depList: [],
            UserPin: []
          })
        }
      },
      fail: function () {
        console.log("no");
      }
    })
  },
  //添加常用原因
  bindAddReson: function (e) {
    var that = this;
    var qtReson = that.data.qtReson;
    if (qtReson.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '未输入原因',
        success: function (res) {

        }
      })
      return;
    }
    wx.request({
      url: that.data.durl + '/api/Bos/SendBonus/AddUsualReason',
      data: {
        OpenId: that.data.OpenId,
        BrContent: qtReson
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        if (resd.data.code == "100") {
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
            success: function (res) {

            }
          })
        }
      },
      fail: function () {
        console.log("no");
      }
    })
  },
  //其他原因输入
  bindReson: function (e) {
    console.log(e);
    this.setData({
      ResonContent: e.detail.value,
      qtReson: e.detail.value
    })
  },
  //隐藏多选人员框
  toggleRight1() {
    this.setData({
      showRight1: !this.data.showRight1,
      userList: this.data.userList
    });
  },
  //奖罚下拉框选择
  radioChange: function (e) {
    this.setData({
      BonusType: e.detail.value
    })
  },
  //删除选择的图片
  delImg: function (e) {
    var that = this;
    console.log("删除的：" + e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '删除图片',
      content: '确定删除该图片吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.data.chooseImg.splice(index, 1);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
        that.setData({
          chooseImg: that.data.chooseImg
        })
      }
    })

  },
  //选择图片
  CatchchooseImgs: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFiles;
        console.log("tempFilePaths:" + tempFilePaths);
        
        that.setData({
          chooseImg: tempFilePaths
        });
        // wx.showLoading({
        //   title: 'cc' + tempFilePaths,

        //   duration: 2000,
        //   mask: "ture"

        // })
      }
    })
  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    console.log("图片地址:" + data.path[i].path);
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i].path,
      name: 'uploadfile_ant',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: (resp) => {
        console.log("resp:" + resp);
        i++;//这个图片执行完上传后，开始上传下一张
        var respImg = that.data.respImg + "," + resp.data;
        that.setData({
          respImg: respImg
        })
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          var imges = that.data.respImg;
          console.log("上传图片：" + imges);
          that.SendBonus(imges);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },
  //发放奖金
  bindSendBonus: function (e) {
    var that = this;
    //得到选中的人数
    var PersonCount = 0;
    var EarMan = '';//接收奖金的id
    for (var item in that.data.userList) {
      if (that.data.userList[item].ischeck) {
        PersonCount++;
        //不能给自己发奖金
        if (this.data.OpenId == that.data.userList[item].OpenId) {
          wx.showModal({
            title: '提示',
            content: '不能给自己发奖金',
            success: function (res) {
            }
          })
          return;
        }

        EarMan += that.data.userList[item].OpenId + ",";
      }
    }
    if (PersonCount == 0) {
      wx.showModal({
        title: '提示',
        content: '未选择人员',
        success: function (res) {
        }
      })

      return;
    }



    //原因不能为空
    if (that.data.ResonContent == '') {
      wx.showModal({
        title: '提示',
        content: '原因不能为空',
        success: function (res) {
         
        }
      })
      return;
    }
    if (that.data.moneys <= 0) {
      wx.showModal({
        title: '提示',
        content: '金额不能选择小于或等于0',
        success: function (res) {
        }
      })
      return;
    }
    //判断有没有图片的原因
    var imgLen = this.data.chooseImg.length;
    if (imgLen > 0) {
      var datas = new Array();
      datas.i = 0;
      datas.success = 0;
      datas.url = this.data.durl + "/api/Bos/SendBonus/SaveImg";
      datas.path = this.data.chooseImg;
      this.uploadimg(datas);
    }
    else {
      //没有图片原因
      this.SendBonus(null);
    }

  },
  //发放奖金方法
  SendBonus: function (imges) {
    var that = this;
    //图片
    var imagesUrl;
    if (imges != null) {
      imagesUrl = imges.substring(1, imges.length);
    }
    else {
      imagesUrl = null;
    }
    //得到选中的人数
    var PersonCount = 0;
    var EarMan = '';//接收奖金的id
    for (var item in that.data.userList) {
      if (that.data.userList[item].ischeck) {
        PersonCount++;
        EarMan += that.data.userList[item].OpenId + ",";
      }
    }

    //判断奖罚
    if (that.data.BonusType == "fa") {
      //罚
      // that.data.moneyArry()
      
      var money = -that.data.moneys;
      wx.request({
        url: that.data.durl + '/api/Bos/SendBonus/SendFa',
        data: {
          BonusItemId: that.data.BonusItemArray[that.data.currentItem].BonusItemId,
          DisMan: that.data.OpenId,
          EarMan: EarMan.substring(0, EarMan.length - 1),
          EarMoney: money,
          BonusType: that.data.BonusItemArray[that.data.currentItem].Type,
          IsGet: 0,
          ReasonID: '',
          PersonCount: PersonCount,//接收奖金的人数
          ResonContent: that.data.ResonContent,
          ResonContentImg: imagesUrl,
          ResonCount: that.data.chooseImg.length,
          BonusTypes: that.data.BonusItemArray[that.data.currentItem].Type,
          CompanyId: that.data.CompanyId
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (resd) {
          if (resd.data.code == "100") {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            //查看奖金参数
            that.SelectParams();
            //查询奖金项
            that.SelectBonusItem();
            //请求常用原因的接口
            that.SelectGrentReson('1');
            that.setData({
              chooseImg: [],
              qtReson: '',
              respImg:'',
              qtmoneys:''
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: resd.data.msg,
              success: function (res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
            that.setData({
              qtmoneys: '',
              respImg: ''
            })
          }
        },
        fail: function () {
          console.log("no");
        }
      })
    }
    else {
      //奖
      // that.data.moneyArry()
      //得到选中的金额
      var money = that.data.moneys
      if (parseInt(money) * PersonCount > that.data.BonusItemArray[that.data.currentItem].RemainMoney) {
        wx.showModal({
          title: '提示',
          content: '余额不足',
          success: function (res) {
          }
        })
        that.setData({
          respImg: ''
        })
        return;
      }
      wx.request({
        url: that.data.durl + '/api/Bos/SendBonus/SendOut',
        data: {
          BonusItemId: that.data.BonusItemArray[that.data.currentItem].BonusItemId,
          DisMan: that.data.OpenId,
          EarMan: EarMan.substring(0, EarMan.length - 1),
          EarMoney: money,
          BonusType: that.data.BonusItemArray[that.data.currentItem].Type,
          IsGet: 0,
          ReasonID: '',
          PersonCount: PersonCount,//接收奖金的人数
          ResonContent: that.data.ResonContent,
          ResonContentImg: imagesUrl,
          ResonCount: that.data.chooseImg.length,
          BonusTypes: that.data.BonusItemArray[that.data.currentItem].Type,
          CompanyId: that.data.CompanyId
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (resd) {
          if (resd.data.code == "100") {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            //查看奖金参数
            that.SelectParams();
            //查询奖金项
            that.SelectBonusItem();
            //请求常用原因的接口
            that.SelectGrentReson('1');
            that.setData({
              chooseImg: [],
              qtReson: '',
              respImg: '',
              qtmoneys:''
            })
          }
          else {
            that.setData({
              qtmoneys:'',
              respImg: ''
            })
            wx.showModal({
              title: '提示',
              content: resd.data.msg,
              success: function (res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
          }
        },
        fail: function () {
          console.log("no");
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
    this.setData({
      CompanyId: wx.getStorageSync('CompanyId'),
      OpenId: wx.getStorageSync('openid'),
    })
    
    //查询奖金项
    this.SelectBonusItem();
    //查看奖金参数
    this.SelectParams();
    //请求常用原因的接口
    this.SelectGrentReson('2');
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