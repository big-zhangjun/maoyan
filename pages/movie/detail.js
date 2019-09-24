Page({
  data:{
    movieList:''
  },
  spread: function () {

    this.setData({
      spread: !this.data.spread
    })
  },
  onLoad(movieId){
    this.getMovieInfo(movieId)
  },
  getMovieInfo(movieId){
    var _this = this
    wx.request({
      url:'http://m.maoyan.com/ajax/detailmovie',
      data:{
        movieId:movieId.id
      },
      success(res){
        res.data.detailMovie.img=res.data.detailMovie.img.replace('w.h','110.150')
        res.data.detailMovie.snum = (res.data.detailMovie.snum/10000).toFixed(2)
        _this.setData({
          movieList:res.data.detailMovie
        })
        console.log(res.data.detailMovie)
      }
    })
  }

});
