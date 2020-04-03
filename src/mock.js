import Mock from 'mockjs'
// 通过 Mock.mock() 来模拟API接口
// 轮播图
Mock.setup({
  timeout: '1000-2000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})
Mock.mock('/home/lunbotu', 'get', {
  status: 200,
  message: '获取商品列表成功！',
  'data|4-6': [
    '@dataImage(375x170)'
  ]
})
// 推荐分类
Mock.mock('/home/tuijian', 'get', {
  status: 200,
  message: '获取商品列表成功！',
  'data|8': [
    {
      title: '@cword(2,4)',
      image: '@dataImage(48x48)',
      link: 'www.baidu.com'
    }
  ]
})

Mock.mock(/\/home\/data/, 'get', function (option) {
  // console.log(type)
  // 通过 正则 的 .exec() 函数，从字符串中提取需要的数据
  // const res = /\/api\/getgoods\/(\d+)/.exec(option.url)

  return Mock.mock({
    'data|10': [{
      id: '@increment(1)',
      cfav: '@natural(0,999)',
      price: '@natural(99, 190)',
      image: '@dataImage(100x100)',
      title: '@cword(8,26)'
    }],
    status: 200,
    message: '获取商品成功！'
  })
})
// 商品分类
Mock.mock('/classify', 'get', {
  status: 200,
  message: '获取商品列表成功！',
  'data|28': [
    '@cword(2,4)'
  ]
})
// Mock.mock('/home/multidata', 'get', {
//   status: 200,
//   message: '获取商品列表成功！',
//   'data|8': [
//     '@dataImage(78x48)'
//   ],
//   'recommon|3-5':[
//     {
//       title:'@cword(2,4)',
//       image:'@dataImage(78x48)',
//       link:'www.baidu.com'
//     }
//   ]
// })
