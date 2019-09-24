// 本组件为搜索组件
// 需要传入addflag   值为true / false （搜索框右侧部分）
// 若显示搜索框右侧部分   需传入右侧图标url以及addhandle函数

Component({

  properties: {

    addflag: { //显示搜索框右侧部分
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {

      }
    },
    addimg: { //显示搜索框右侧部分icon
      type: String,
      value: ''
    },
    searchstr: { //input  值
      type: String,
      value: ''
    },
    searchflag: {
      type: Boolean,
      value: false,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    cinemas: null, //影院
    movies: null ,//影片,
  },

  /**
   * 组件的方法列表

   */
  methods: {

    //获得焦点
    getfocus() {
      this.setData({
        searchflag: true,
      })
    },
    //搜索框右侧按钮事件
    addhandle() {
      this.triggerEvent("addhandle");
    },
    //搜索输入
    searchList(e) {
      var _this = this
      if(!e.detail.value){
        _this.setData({
          movies: null,
          cinemas: null
        })
        return
      }
      wx.showLoading({
        title:'正在搜索'
      })
      wx.request({
        url: 'http://m.maoyan.com/ajax/search',
        data: {
          kw: e.detail.value,
          cityId: 1,
          stype: -1
        },
        success(res) {
          res.data.movies.list.forEach(ele => {
            ele.img = ele.img.replace('w.h', '128.188')
          });
          _this.setData({
            // cinemas: res.data.cinemas.list, //电影院
            movies: res.data.movies.list //电影
          })
          wx.hideLoading()
        }
      })
    },
    //查询
    endsearchList(e) {

      this.triggerEvent("endsearchList");
    },
    //失去焦点
    blursearch() {
      // console.log('失去焦点')

    },
    // 取消
    cancelsearch() {
      this.setData({
        searchflag: false,
        searchstr: '',
        movies: null,
        cinemas: null,
      })
      this.triggerEvent("cancelsearch");
    },
    //清空搜索框
    activity_clear(e) {
      this.setData({
        searchstr: '',
        movies: null,
        cinemas: null,
      })
    },

  }
})