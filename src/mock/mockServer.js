import Mock from 'mockjs'

const data = [
  {"title": "【免费试用】网易严选，每日坚果", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 60, "deadline": "2018-01-16 00:00:00"},
  {"title": "【免费试用】网易严选，每日坚果1", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 50, "deadline": "2018-01-18 06:00:03"},
  {"title": "【免费试用】网易严选，每日坚果2", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 10, "deadline": "2018-01-12 24:16:36"},
  {"title": "【免费试用】网易严选，每日坚果3", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 90, "deadline": "2018-01-15 09:01:00"},
  {"title": "【免费试用】网易严选，每日坚果4", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 20, "deadline": "2018-01-12 02:26:59"},
  {"title": "【免费试用】网易严选，每日坚果5", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 60, "deadline": "2018-01-16 18:26:36"},
  {"title": "【免费试用】网易严选，每日坚果6", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 10, "deadline": "2018-01-16 18:26:36"},
  {"title": "【免费试用】网易严选，每日坚果7", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 30, "deadline": "2018-01-16 18:26:36"},
  {"title": "【免费试用】网易严选，每日坚果8", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 20, "deadline": "2018-01-15 18:26:36"},
  {"title": "【免费试用】网易严选，每日坚果9", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 10, "deadline": "2018-01-16 18:26:36"},
  {"title": "【免费试用】网易严选，每日坚果10", "src":"http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114", "limitNum": 20, "deadline": "2018-01-16 18:26:36"},
]
// 通过mockjs向外暴露1个接口
Mock.mock('/api/getproducts', {code: 0, data})

// export default ???  不用向外暴露什么

// 当前模块只需要被执行一次, 接口就可以访问了
console.log('执行mockServer...')