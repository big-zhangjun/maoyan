Page({
    data: {
        tabs: "hots",
        hots: [], //热映
        reflected: "", //待映
        offset: 0,
        limit:12,
        reflectedList:'',
        isRequest:true
    },
    checkout(e) {
        this.setData({
            tabs: e.target.dataset.tabs
        })
    },
    onLoad() {
        // 获取热映
        this.getHotShow()
        this.getReflectedLike()
        this.getReflectedList()

    },
    // 获取热映
    getHotShow() {
        var _this = this
        wx.request({
            url: 'https://wx.maoyan.com/mmdb/movie/v2/list/hot.json',
            data: {
                limit: _this.data.limit,
                offset: _this.data.offset,
                ct: '北京'
            },
            success(res) {
                if(res.data.data.hot.length===0){
                    _this.setData({
                        isRequest:false
                    })
                }
                res.data.data.hot.forEach(ele => {
                    ele.img = ele.img.replace('w.h', '120.180')
                });
                _this.data.hots.push(...res.data.data.hot)
                _this.setData({
                    hots:_this.data.hots,
                })
                _this.data.offset ++
            }
        })
    },
    // 获取待映最受喜欢
    getReflectedLike() {
        var _this = this
        wx.request({
            url: 'https://wx.maoyan.com/mmdb/movie/v1/list/wish/order/coming.json',
            data: {
                ci: 1,
                limit: 30,
                offset: 0
            },
            success(res) {
                res.data.data.coming.forEach(ele => {
                    ele.img = ele.img.replace('w.h', '120.180')
                    ele.comingTitle = ele.comingTitle.substring(-1,5)
                });
                _this.setData({
                    reflected: res.data.data.coming
                })
            }
        })
    },
    // 待映电影列表
    getReflectedList() {
        var _this = this
        wx.request({
            url: 'https://wx.maoyan.com/mmdb/movie/v2/list/rt/order/coming.json',
            data: {
                ci: 1,
                limit: 10,
            },
            success(res) {
                res.data.data.coming.forEach(ele => {
                    ele.img = ele.img.replace('w.h', '120.180')
                });
                _this.setData({
                    reflectedList:res.data.data.coming
                })    
            }
        })
    },
    onReachBottom(){
        this.data.isRequest && this.getHotShow()
    }
});