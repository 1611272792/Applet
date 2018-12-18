// pages/bonusitems/bonusitems.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durl: app.globalData.ddurl,
    items:[],
    icon:'../../src/image/jiangjinxiang.png',
    InputMoneyShow:false,
    AddMoney:0,//注入金额
    BonusItemId:'',//奖金项id
    InDate:0,//注入日期
    RuleType:0,//规则类型0代表没有规则，添加规则；1修改规则
    CompanyId: '',
    OpenId:''//登陆进来的openid
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      CompanyId: wx.getStorageSync('CompanyId'),
      OpenId: wx.getStorageSync('openid'),
    })
    

  },
  //添加奖金项
  addBonusItem:function(){
    wx.navigateTo({
      url: '../addbonusitems/addbonusitems',
    })
  },
  //查询奖金项列表
  BonusItems:function(e){
    var that = this;
    wx.request({
      url: that.data.durl + '/api/Bos/BonusItem/GetBonusItemList',
      data: {
        CompanyId: that.data.CompanyId,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(resd) {
        console.log('ss' + resd.data.data.length);
        that.setData({
          items:[]
        })
        for (var i = 0; i < resd.data.data.length; i++) {
          //规则类型0代表没有规则，添加规则；1修改规则
          var RuleType=0;
          if(resd.data.data[i].BRId==null){
            RuleType=0;
          }
          else{
            RuleType=1;
          }

          that.data.items.push({
            BonusItemName: resd.data.data[i].BonusItemName,
            BRId:resd.data.data[i].BRId,
            RuleType:RuleType,
            BonusItemId: resd.data.data[i].BonusItemId,
            DpId: resd.data.data[i].DepId == null ? 0 : resd.data.data[i].DepId,//部门id
            Num:resd.data.data[i].Num,//这个奖金项最多可容纳人数
            InDate:resd.data.data[i].InDate,//注入日期
            isTouchMove: false //默认全隐藏删除
          })
        }
        that.setData({
          items: that.data.items
        });
      },
      fail: function() {
        console.log("no");
      }
    })
  },
  //编辑奖金项
  editBonusItem:function(e){
    var BonusItemId = this.data.items[e.currentTarget.dataset.index].BonusItemId;
    wx.setStorage({
      key: 'BonusItemId',
      data: BonusItemId,
    })
    wx.navigateTo({
      url: '../editbonusitem/editbonusitem',
    })
  },
  //添加规则
  AddRule:function(e){
    var BonusItemName = this.data.items[e.currentTarget.dataset.index].BonusItemName;
    wx.setStorage({
      key: 'BonusItemName',
      data: BonusItemName,
    })
    var BonusItemId = this.data.items[e.currentTarget.dataset.index].BonusItemId;
    wx.setStorage({
      key: 'BonusItemId',
      data: BonusItemId,
    })
    wx.navigateTo({
      url: '../addrule/addrule',
    })
  },
  //设置规则
  EditRule:function(e){
    var BRId = this.data.items[e.currentTarget.dataset.index].BRId;
    var BonusItemName=this.data.items[e.currentTarget.dataset.index].BonusItemName;
    var BonuType = this.data.items[e.currentTarget.dataset.index].RuleType;
    var DpId = this.data.items[e.currentTarget.dataset.index].DpId;
    var BonusItemId = this.data.items[e.currentTarget.dataset.index].BonusItemId;
    var Num = this.data.items[e.currentTarget.dataset.index].Num;//奖金项最多可容纳人数

    wx.setStorage({
      key: 'BRId',
      data: BRId,
    })
    wx.setStorage({
      key: 'BonusItemName',
      data: BonusItemName,
    })
    wx.setStorage({
      key: 'BonuType',
      data: BonuType,
    })
    wx.setStorage({
      key: 'DpId',
      data: DpId,
    })
    wx.setStorage({
      key: 'BonusItemId',
      data: BonusItemId,
    })
    wx.setStorage({
      key: 'Num',
      data: Num,
    })
    wx.navigateTo({
      url: '../editrule/editrule',
    })
  },
  //注入金额
  AddMoney:function(e){
    var that=this;
    var BonusItemId = this.data.items[e.currentTarget.dataset.index].BonusItemId;
    var InDate=this.data.items[e.currentTarget.dataset.index].InDate;
this.setData({
  InputMoneyShow:true,
  BonusItemId:BonusItemId,
  InDate:InDate
})
  },
  //取消注入金额
  cancel:function(e){
    this.setData({
      InputMoneyShow:false,
      BonusItemId:'',
      InDate:0
    })
  },
  //输入注入金额
  setValue:function(e){
    this.setData({
      AddMoney:e.detail.value 
    })
  },
  //确定注入金额
  confirm:function(e){
    var that= this;
if(this.data.AddMoney<0){
  wx.showModal({
    title: '提示',
    content: '金额不能小于0',
  })

}
else if(this.data.BonusItemId==''){
  wx.showModal({
    title: '提示',
    content: '奖金项id不能为null',
  })
}
else if(this.data.InDate<0||this.data.InDate>12){
  wx.showModal({
    title: '提示',
    content: '注入日期范围在0-12之间',
  })
}
else{
  wx.request({
    url: that.data.durl+'/api/Bos/BonusRule/AddGDMoney',
    method: "POST",
    data: {
      BonusItemId: that.data.BonusItemId,//奖金项id
      AddMoney:this.data.AddMoney,//注入金额
      InDate:this.data.InDate,//注入日期
      OpenId: that.data.OpenId,//openid
     
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
        that.setData({
          InputMoneyShow:false,
          BonusItemId:'',
          InDate:0
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
//手指触摸动作开始 记录起点X坐标
touchstart: function(e) {
  //开始触摸时 重置所有删除
  this.data.items.forEach(function(v, i) {
    if (v.isTouchMove) //只操作为true的
      v.isTouchMove = false;
  })
  this.setData({
    startX: e.changedTouches[0].clientX,
    startY: e.changedTouches[0].clientY,
    items: this.data.items
  })
},
//滑动事件处理
touchmove: function(e) {
  var that = this,
    index = e.currentTarget.dataset.index, //当前索引
    startX = that.data.startX, //开始X坐标
    startY = that.data.startY, //开始Y坐标
    touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
    //获取滑动角度
    angle = that.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
  that.data.items.forEach(function(v, i) {
    v.isTouchMove = false
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    if (i == index) {
      if (touchMoveX > startX) //右滑
        v.isTouchMove = false
      else //左滑
        v.isTouchMove = true
    }
  })
  //更新数据
  that.setData({
    items: that.data.items
  })
},
/**
 * 计算滑动角度
 * @param {Object} start 起点坐标
 * @param {Object} end 终点坐标
 */
angle: function(start, end) {
  var _X = end.X - start.X,
    _Y = end.Y - start.Y
  //返回角度 /Math.atan()返回数字的反正切值
  return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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
    //查询奖金项列表
    this.BonusItems();
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