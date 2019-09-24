
Page({
  data:{
    movieId:'',
  },
  onLoad(movieId){
    this.setData({
        movieId:movieId
    })
    console.log(this.data.movieId)
  }
});