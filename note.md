# TrialCenter项目总结
## 项目准备阶段
  + 根据需求分析页面结构，需要5个功能页面
  + 技术选型
    + 前台数据处理，交互 `vue`+`vue-cli`+`vue-router`+`axios`+`element-ui`
    + 后台处理：mockjs
    + css预编译器：`stylus`,样式通过`@import引入`

        变量使用$声明，`$mainColor = #f66`

        混合
        ```
        error(borderWidth = 2px){
          border:borderWidth solid mainColor;
          color: #f00;
        }
        .error-register{
          font-size: 16px;
          error()
        }
        .error-login{
          font-size: 32px;
          error(5px)
        }
        ```
    + 滑动库：`better-scroll`
  + 前端路由
    + `/triallist`,`/product`,`/address`,`/trialrule`,`/mytrial`
  + 接口
    + 对接口=>接口文档=>mock数据=>切换线上接口
  + vue组件
    + 5个路由组件
    + header公共组件，
    + 商品item组件，
    + 倒计时`backtime`组件
  + 打包发布,预览效果
    + `http-server`
## dev阶段
  1. 五个页面对应五个路由，默认跳转到`TrialList`页面，`{name: '/', redirect: {name: TrialList}}`
  2. 路由按需加载：提高页面加载速度
        ```
        const trialList = () => import('../pages/TrialList.vue')
        ```
  3. 缓存组件 有两种方式
    + 缓存全部组件：
       ```
       <keep-alive>
          <router-view/>
       </keep-alive>
       ```
    + 缓存部分组件
      ```
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
      ```
      需要在路由中配置meta
      ```
      const routes = [
        ...
        {path: '/product/:productId', name: 'Product', component: Product, meta: {keepAlive: false}},
        ...
      ]
      ```
  4. 把所有的接口单独拿出来放在一个文件，便于维护，同时减少对业务代码的修改
  5. better-scroll实现上拉加载，下拉刷新，横向轮播图
    + 使用bs的`pullingUp`和`pullingDown`事件来实现上来加载和下拉刷新，同时新建两个变量isPullUp和isPullDown，当上拉或下拉结束后要使用这两个变量控制调用`finishPullUp`或者`finishPullDown`，`finishPullUp`和`finishPullDown`会通知scroll已经完成pull，接下来scroll会调用`refresh`重新计算滚动区域内容高度
    + 滑到底部（所有数据已经展示了，后台没有数据了），此时滑到最上部下拉刷新，再上拉加载时，发现加载不了，也没有报错？

      *因为在滑到最底部时，触发了`pullingUp`，但是并没有执行`finishPullUp`，解决：在最底部，触发`pullingUp`时，执行`finishPullUp`*
    + 轮播图bug：

      ```
      <self-slide>
        <div v-for="item in bannerCarousel" class="slide-item">
          <img :src="item">
        </div>
      </self-slide>
      ```
      bannerCarousel写死，`bannerCarousel=['a.jpg','b.jpg']`,可以正常轮播

      但是bannerCarousel从接口中拿到的动态图片时，不能轮播，

      因为slide组件初始化时 bannerCarousel为空数组[],所以slideGroup初始化宽度为0,进而导致无法轮播，解决方法：在slide组件中watch`bannerCarousel.length`，然后调用`update`更新slide
      `watch:{length(){this.update()}}`
  6. 头部固定定位，制定元素（scroll-wrapper）撑满剩余可见高度
     ```
     //html
      <div id="app">
        <header></header>
        <div class="box">
          <div class="scroll-wrapper">
            <div class="scroll-content"></div>
          </div>
        </div>
      </div>
      //css
      .box{height: 100%;box-sizing: border-box;padding-top: 100px}
      .scroll-wrapper { height: 100%; }
     ```
  7. 在第三方组件或者自定义组件上使用js原生事件，没有效果，无法触发事件？

     自定义的标签使用`@click=handler`没有,正确姿势：`@click.native=handler`
  8. 记录页面滚动的位置
    + 如果路由用了history模式，可以使用`saveScrollPosition`
      ```
      var router = new VueRouter({
          hashbang: false,
          history: true,
          saveScrollPosition: true,
          suppressTransitionError: true
      })
      ```
    + 如果用了hash模式，结合keep-alive,better-scroll
      ```
      this.scrool.on('scrollEnd', (pos) => {this.saveTop = pos.y})
      activated(){this.scroll.scrollTo(0,this.saveTop)}
      ```
  9. schema地址：`jcnhers://list_post/groupId=12`,`jcnhers://detail_post/postId=26`
  10. 自定义过滤器的使用，用于文本格式化
    ```
    {{message} | capitalize }
    filters: {
      capitalize(val) {
        if(!val) return
        ...//对数据做处理
        return newVal 吐出来新数据
      }
    }
    ```
  11. `<keep-alive></keep-alive>`使用时，组件切换回来时，想发送请求请求新的数据？
    启用`keep-alive`，会有两个钩子函数，第一次进入组件时依次调用`created=>mounted=>activated`,退出时触发`deactivated`,再次进入时只触发`activated`,所以，要想获取新的数据，应该activated中留一份数据获取的代码，或者不要created部分，直接将created中的代码转移到activated中。
## build阶段
  + 线上路径配置,线上域名：`bbs.j.cn`,如下把我们的项目指向了`bbs.j.cn/pages/trialcenter`
    config/index.js
    ```
    module.exports = {
      dev:{...},
      build: {
        assetsPublicPath: '/pages/trialcenter/',
      }
    }
    ```
  12. 配置路由时，使用`path:'product',name:'Product'`和`path:'product/:productId',name:'Product'`，this.$router.push({name: 'Product',params: {productId}})都会跳转到product页面，使用前者，`productId`在url中不可见(localhost:80/product/12)，使用后者在url中可见（localhost:80/product/12）,两者获取方式都一样：`this.$router.params.productId`
## 线上阶段
  + 在她社区发帖子测试，安卓有页面，但是ios有header，triallist白屏

    build阶段，`assetsPublicPath`配置成 `'/'`,使用`http-server`运行build后的项目，ios没问题，但是一旦把`assetsPublicPath`配置成 `'/pages/trialcenter/'`，ios就有问题，charles代理后发现访问的是`https://bbs.j.cn`，因此可以断定是跨域的问题，她社区把`http://bbs.j.cn`转成了`https://bbs.j.cn`,
  + 调用原生接口获取用户信息

    `getHersUserInfo('callback')`和`getUserInfo`,注意区分不同版本使用不同方法
  + 使用原生接口`void onBackPressed()`返回app,安卓有效，ios点击返回按钮不能返回app

    返回app方法换成`backToApp`，都有效（接口文档怎么没写清楚）
  + 唤起登录面板，获取userId

    调用`void appLogin(0)`，同时定义一个全局函数`window.appLoginFinish = (status, userId) => {vm.userId = userId}`，登录成功后会app会自动调用`appLoginFinish`，同时返回userId,


