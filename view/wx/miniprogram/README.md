# 微信小程序开发实践

#### 分享1: 2018/8/31 下午1:50:29  :+1: zym

### 一、小程序整体结构
```
    ---components ----- 放组件中的抽象节点
    ---images     ----- 放公用图片
    ---pages      ----- 所有静态页面
    ---plugins    ----- 项目用到的第三方插件
    ---style      ----- 公用的样式
    ---utils      ----- 公用的js以及小程序的脚本(wxs)
    ---app.js     ----- 小程序启动之后，在 app.js 定义的 App 实例的 onLaunch 回调会被执行，所以里面可以放我们公用的类
    ---app.json   ----- app.json 是对当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等
    ---app.wxss   ----- 小程序的全局样式设置
```

> 1. 结构细节说明：在components文件夹中放置的主要用在：就目前经验来说，当点击跳转页面，如果该页面是tab中的页面，则该跳转页面是自带tab底部的，但是如果跳转页面不是tab中的页面，则页面就不自带tab底部，所以如果想页面自带tab底部，我们就把抽象节点嵌套在页面上。

> 2. 在设置密码页面需要给密码加密，所以采用了第三方插件wx-rsa.js非对称加密方法。
> 3. 在utils中的wxapi.js封装了调取微信的login、getuserinfo、getSystemInfo、request、chooseImage、uploadFile的公用类，由于调取微信层级太多，所以采用了第三方插件es6-promise.js。
> 4. 埋点采用的是腾讯的埋点mta，使用说明详见[腾讯埋点]](http://mta.qq.com/)

### 二、在做项目中遇到的问题总结

1. 微信自带 button 的 disabled属性 不改变颜色，**只能是灰色的底白色的字**

2. 微信的 textarea的 **层级是最高的**，所以它在 picker-view的上面

3. 在使用scroll-view的时候，有这种情况,当scroll里有3个text按钮，点击1出现1对应的内容，就相当于tab，当点击1的时候没有问题，但当点击2的时候页面会回弹，最后发现跟页面的长度有关系，因为1、2、3块内容的高度不一样，目前还未解决，准备用swiper来代替tab尝试下。另一种情况是，当scroll包裹swiper，在swiper 里有个button，button的position是fixed，当切换swiper的时候，button按钮会消失或者只出现一半，目前的解决办法是 **把position改成absolute**

4. 在用swiper滚动banner时，当autoplay：true，interval： 3000的时候，当点击banner进入活动页面的时候，再返回回来，然后不断的这样操作，就会出现swiper抖动厉害，目前的解决方案是 **当该页面onhide的时候就把swiper去掉，当onshow的时候在增加swiper**。

5. web-view组件是一个可以用来承载网页的容器，会自动铺满整个小程序页面。它可以设置src和bindmessage这两个属性，当src是一个图片链接时，在安卓手机里会报‘不支持打开非业务域名，请重新配置域名’，而苹果手机显示正常，目前的解决方法是，页面代码

```
    <web-view src='{{url}}' bindmessage = 'postMessage' wx:if='{{showView}}'>
    </web-view>
    <image src='{{imgsrc}}' wx:if='{{!!imgsrc}}' mode='widthFix'></image>

    在js中判断传过来的url是否以。png或图片形式，如果是显示image区域，如果不是 用web-view  api，显示内嵌页面。

```

6. 在有需要阻止事件冒泡的时候，可以用事件的catchtap，来阻止事件冒泡。

7. 微信小程序的全局this不是window。

8. 打开footer的tab页，必须用wx.switchTab()

9. 用小程序的camara，在小米手机4和魅蓝note6会出现闪退

10. 当我们用到了微信小程序的导航的switchTab的api时，getCurrentPage()只会得到一个数组，得不到之前的页面栈，navagateTo和navagateBack可以得到之前的页面栈。

11. 微信api中的camara的z-index是最高的，所以如果想在camara的上面放置组件的话就只能用cover-view，但是在启动camara的时候有一定的时间差，所以又可能会出现组件先出来，而camara后出来，这样的话camara就把组件覆盖了，解决，最好设计的时候不要在camara上放置任何的组件。

### 三、环境配置：

1. 域名：https icp 备案，不能带端口
2. 业务域名：需要通过https://www.ssllabs.com/ssltest/analyze.html检测，评级在C级以上

### 四、开发过程中遇到的问题：

1. 事件绑定：bindtab / catchtab  
> bindtab事件会向上冒泡
> catchtab 事件不会向上冒泡

2. h5特性 canvas
>在使用canvas画图时，canvas的层级在Html中是最高的，不会因为你的z-index属性有任何变化，这个时间就需要用到 cover-view, cover-view cover-img的层级会在app原生组件之上

3. textarea 定位漂移问题：在textarea上左右滑动，textarea会的左右漂移。微信给出的解决方案：添加属性 fixed=true

4. textarea层级会比较高（在placehodler不为空时更明显），在有mask的情况，会显示在mask之上;在textarea下添加一个高度一样的view在显示mask时，让textarea隐藏，显示view

5. wx.createCameraContext 有兼容性问题，在小米4上使用时会小程序会无响应

6. `<text>` 标签只能包含 `<text>` 标签

7. 小程序不支持 background-image，只能通过标签实现 `<image src='' />`

8. 支持字体文件，可以使用svg转换字体文件的方式实现

9. 小程序的埋点通过mta 实现，mta 事件埋点需要先在mta上创建好需要埋的点，把代码拷贝到程序里

10. button样式修改：button上有样式，在button::after上也有样式

11. radiobox 跟checkbox 样式也是可以被修改的，修改方案:

```
    radio .wx-radio-input{}
    radio .wx-radio-input.wx-radio-input-checked{}
    radio .wx-radio-input.wx-radio-input-checked::before{}
    checkbox .wx-checkbox-input{}
    checkbox .wx-checkbox-input.wx-checkbox-input-checked{}
    checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{}
```

12. image 有一个默认的with height，mode的设置，设置图片的缩放，裁剪

13. swiper 问题：ios 的position:fixed 有兼容问题，在切换tab页时，如果tab1里有position是fixed 的button，再tab切换时，button 位置就是乱掉；
> 解决方案：在布局时不要用fixed 用absolute;

 ### 五、小程序相关

 

 1. 支持认证主体：（个人公众号无法使用）

 - 企业（企业法人、非企业法人、外资企业驻华代表处）;
 - 媒体（事业单位媒体、其他媒体）;
 - 政府及事业单位;
 - 其他组织
 
 2. 数量限制
 除个体工商户类型可认证5个小程序外，
 其他类型一个主体可认证50个小程序。
 
 3. 环境限制
 - 服务器域名：包含4类，一个月可修改5次，每类可配置多个域名
 - request合法域名；socket合法域名；uploadFile合法域名；downloadFile合法域名；
 - 业务域名：最多20个，一年可修改50次 
 
 4. 域名限制
  - https
  - icp 备案  
  - 格式：英文大小写，数据及”-"， 不支持Ip地址，不能带端口
  - 需要通过安全校验，评级C级以上：https://www.ssllabs.com/ssltest/analyze.html
  - 所配置域名，需要在根目录下放置微信安全校验文件：XXX.txt 内容为一个uuid
 5. 消息推送转发（暂未用到）
 - 用户发给小程序的消息及开发者需求的事件推送， 都会被微信转发至指定的服务器
 6. 扫二维码打开小程序功能（暂未用到）

 7. 小程序发布：
 - 通过小程序开发工具，提交代码，
 - 发布流程：体验版——> 审核版———> 线上版 线上版可通过搜索查到小程序
 - 审核周期（1-7个工作日）我们测试版最长审核3天，

 8. 小程序版本迭代方案：
 > 小程序类似appstroe 有审核机制 ，所以小程序版本迭代时的上线方案，及小程序缓存问题，目前通过网上暂未找到具体方案，计划在小小租二期上线时，统一测试缓存问题。具体情况二期上线后总结
