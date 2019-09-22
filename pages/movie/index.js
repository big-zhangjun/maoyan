Page({
    data: {
        tabs: "hots"
    },
    checkout(e) {
        this.setData({
            tabs: e.target.dataset.tabs
        })
    },
    onLoad() {
        wx.request({
            url: 'https://wx.maoyan.com/mmdb/movie/v2/list/hot.json',
            data: {
                limit : 12,
                offset : 0,
                ct :'北京'
            },
            success(res){
                console.log(res)
            }
        })
    }
});