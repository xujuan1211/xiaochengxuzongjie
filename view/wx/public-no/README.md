# 微信公众号开发实践

#### 分享1: 2018/8/31 下午1:50:29  :+1: lxq zym

### 一、公众号相关 

 1. 企业微信号需通过微信认证，所需材料见附件  微信认证材料.docx

 2. 公众号限制：

 > 同一个公司资料可以注册和认证50个公众号

 > 政府、媒体等其他组织，同一个机构资料可以注册和认证50个公众号
 > 1个身份证号最多注册5个公众号，微信认证无限次
 > 1个手机号最多注册5个公众号， 微信认证无限次
 > 同一个邮箱只能注册1个公众号
 > 个人类型公众号暂时不支持微信认证
 > 公众号可关联同主体的10个小程序及不同主体的3个小程序。
 > 同一个小程序可关联最多500个公众号。

 3. 时间限制：
 > 提交申核，支付费用后:
 > 增值税专用发票，资质审核7个工作日内（不包括周末、法定节假日）。
 > 腾讯在15个工作日内开始审核，
 > 审核周期：1-5个工作日，
 > 材料有问题，需要30个自然日补充材料，
 > 有3次补充材料机会，
 > 超时或超3次，审核失败，
 > 审核失败，费用不退还。

 ### 二、公众号大坑

#### 有一段时间没有搞微信开发了 ，今天突然要改一下程序！ 回头一看 微信的帮助文档太tm的稀烂的，太难懂了，这做个笔记以后看着方便
1. **微信有2个ACCESS_TOKEN**
```
  1，基础接口的token 获取接口是  
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
  2，用户网页授权access_token 获取接口地址是
  https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
  网页授权access_token 需要通过code去获取
   code是怎么来的，是通过调用下面接口来获取的
   https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
  注意这个接口中有个参数scope 默认有2个值snsapi_base和snsapi_userinfo，这个接口会根据scope 来生成不同的code并且获取不同作用的access_token ，不管scope传什么值都能在得到对应access_token的同时得到open_id， 如果你只需要得到opend_id 那使用snsapi_base参数到此结束了，如果需要获取用户的其他信息比如 昵称 地址 就要snsapi_userinfo 会弹出授权
 
 3 怎么获取用户信息那就调用下面接口
  https://api.weixin.qq.com/sns/userinfo?access_token={0}&openid={1}&lang=zh_CN
 很明显这个接口中的access_token是第二步获取code的时候scope 参数传snsapi_userinfo来换取的access_token
 
 4 微信还有一个获取用户基本信息的接口 但是 这个接口需要你关注了公众号
https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN  （此接口的access_token 是接口基础调用access_token 不是网页授权access_token）
微信的解释：是在用户和公众号产生消息交互或关注后事件推送后，才能根据用户OpenID来获取用户基本信息。这个接口，包括其他微信接口，都是需要该用户（即openid）关注了公众号后，才能调用成功的。

5 检查用户是否关注了这个公众号的接口是：
https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
```
2. **基础token 不能多台服务器调用**

```
公众平台的API调用所需的access_token的使用及生成方式说明：

1、建议公众号开发者使用中控服务器统一获取和刷新Access_token，其他业务逻辑服务器所使用的access_token均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致access_token覆盖而影响业务；

2、目前Access_token的有效期通过返回的expire_in来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新access_token。在刷新过程中，中控服务器可对外继续输出的老access_token，此时公众平台后台会保证在5分钟内，新老access_token都可用，这保证了第三方业务的平滑过渡；

3、Access_token的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新access_token的接口，这样便于业务服务器在API调用获知access_token已超时的情况下，可以触发access_token的刷新流程。

公众号和小程序均可以使用AppID和AppSecret调用本接口来获取access_token。AppID和AppSecret可在“微信公众平台-开发-基本配置”页中获得（需要已经成为开发者，且帐号没有异常状态）。调用接口时，请登录“微信公众平台-开发-基本配置”提前将服务器IP地址添加到IP白名单中，点击查看设置方法，否则将无法调用成功。小程序无需配置IP白名单。
```
