### 项目中的前端角色,http介绍 :smile:
#### 前端角色
- 一般项目简介
<img width="400" src="img/2.jpg"/>

>   早期 前端开发，编写 html,css,js然后 实现前端项目的独立运行。静态html让后端绑数据，通过同步跳转，异步请求 跟用户交。我们前端人员仅关注：浏览器页面优化，交互效果的实现。

- 个人理解的现在前端开发的角色
![项目中前端角色](./img/1.png)

>   前端 通过node 平台使JS 可以运行在服务器端，处理客户端请求，大大降低了 前后端联调的时间，前端可以做的事情更多，设计逻辑更灵活。其中中间层服务器 可以做的事情如下：
1. 建立路由体系，规划页面模块
2. 调用接口，处理业务逻辑，灵活拼装页面数据
3. 给前端模板绑定数据，同步渲染，或建立异步接口
4. 添加路由过滤，实现鉴权，重定向
5. 灵活缓存，session,cookie,读取配置文件
6. 跨服务器交互 调用接口 或 提供公共服务接口
7. ....

#### http介绍

##### 概念

    HTTP协议又称超文本传输协议(HyperTextTransfer Protocol),是TCP/IP协议族的一个子集。

##### 特点
1. 简单快速：
    >客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、POST。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。
2. 灵活：
    >HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。
3. 无连接：
    >无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
4. 无状态：
    >（意味着客户端跟服务器不能长时间处于连接状态，一旦请求Request -> 响应Response过程完成，连接就会关闭）的应用层协议，基于C/S模式，
```
    - 问题：对请求和响应都不做持久化处理，正因如此，导致出现了一些问题，如登录状态的持久化。 
    - 原因：这样设计是为了保证能够处理大量的事务，但是随着WEB不断的发展，许多的有状态的需求不断出现，出现了 [cookie session](https://eggjs.org/zh-cn/core/cookie-and-session.html)等持久化技术。
```
5. 同源策略：
    >也就是说当两个请求的URL的协议、host和端口都相同的情况下，我们才认为这两个请求是同域的即同源，而只要协议、host和端口只要有一项是不同的，我们就认为是不同源的，即跨域，
```
    例如：
    http://www.mukedada.com:80

    http://www.mukedada.com:8080

    上述两个请求就是跨域请求。需要注意的是跨域请求不是说浏览器限制了发起跨站请求，浏览器只是将返回结果拦截下来，最好的例子就是CSRF跨站脚本攻击。如果我们想让浏览器放行返回结果，则通过以下方法：

    服务端设置Access-Control-Allow-Origin参数为允许，例如'Access-Control-Allow-Origin' : '*' ;<link>、<img>和<script>三标签中的请求是允许跨域的，这也是JSONP的跨域做法。
```

6. 数据协商：
    >数据协商指的是客户端向服务端发送请求时，客户端会声明它希望服务端返回个格式是什么？服务端根据客户端的声明来判断返回什么要的数据。其中客户端通过Accept、Accept-Encoding等参数进行设置，而服务端通过Content-Type等参数进行设置。
    
```
客户端相关参数：

    Accept指定返回数据类型；
    Accept-Encoding指定服务端的数据压缩方式，目前服务端的压缩算法有gzip, deflate, br等；
    Accept-Language指定返回数据的语言，例如 Accept-Language:  zh-CN,zh;q=0.9,en;q=0.8，其中q表示的是权重，也就是说浏览器更希望服务器返回的是中文；
    User-Agent表示浏览器的相关信息，它能区分是移动端浏览器还是PC端浏览器，从而返回特定的页面。

服务端相关参数：
    Content-Type指的是服务端返回的数据类型；
    Content-Encoding对应客户端的Accept-Encoding，指的是数据压缩方式；
    Content-Language服务端语言。
```

##### 认识 URL
    绝对URI的格式：

    http://user:pass@www.example.com:80/dir/index.html?uid=1#ch2

    从左往右依次是： 协议名、用户名、密码、服务器地址、端口、带层次的文件路径、查询字符串、片段标识符

##### 用户输入url后发生了什么
1. 浏览器根据所使用的HTTP协议，解析出url对应的域名；
2. 通过DNS域名解析，查询出该域名对应的IP地址；
3. 通过URL解析出对应的端口号，如果是80，默认可以省略；
4. 浏览器根据ip和端口建立TCP连接；（发生三次握手）

5. 浏览器向服务器发送一条HTTP请求报文，比如get请求；
6. 服务器相应请求，并发送给浏览器返回报文；
7. 浏览器渲染网页并关闭与服务器的连接。

##### HTTP_POST请求的数据格式

###### Content-type的类型

- 常见的媒体格式类型：
```
text/html ： HTML格式
text/plain ：纯文本格式
text/xml ： XML格式
image/gif ：gif图片格式
image/jpeg ：jpg图片格式
image/png：png图片格式
```
- 以applicaton开头的媒体类型：
```
application/json ： JSON数据格式
application/xhtml+xml ：XHTML格式
application/xml ： XML数据格式
application/atom+xml ：Atom XML聚合格式
application/pdf ：pdf格式
application/javascript ：js格式
application/msword ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ：form表单默认的数据格式类型，form表单数据被编码为key/value格式发送到服务器。
```
- 另外一种常见的媒体格式是上传文件之时使用的：
```
multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式。
```
**除了原生的content-type，开发人员也可以完全自定义数据提交格式！**

###### 最常用的三种：
- **application/x-www-form-urlencoded**，form表单默认的数据格式，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。比如下面的http请求格式：

```
# Request Headers
POST /adduser HTTP/1.1
Host: localhost:8030
Connection: keep-alive
Content-Length: 16
Pragma: no-cache
Cache-Control: no-cache
Origin: chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9

# Form Data
name=name&age=11
```
- **application/json**，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。服务端语言也有很多函数去解析JSON，使用JSON可以支持更加复杂的结构化数据。比如下面的http请求格式：
```
# Request Headers
POST /adduser HTTP/1.1
Host: localhost:8030
Connection: keep-alive
Content-Length: 24
Pragma: no-cache
Cache-Control: no-cache
Origin: chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36
Content-Type: application/json
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9

# Request Payload
{"name":"121","age":121}
```
- **multipart/form-data**，对用于在表单中上传文件时，也可以上传普通数据，只需要让form的enctype等于multipart/form-data就可以了。比如下面的http请求格式：

```
# Request Header
POST /adduser HTTP/1.1
Host: localhost:8030
Connection: keep-alive
Content-Length: 232
Pragma: no-cache
Cache-Control: no-cache
Origin: chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryBRi81vNtMyBL97Rb
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9

# Request Payload
------WebKitFormBoundaryBRi81vNtMyBL97Rb
Content-Disposition: form-data; name="name"

name1
------WebKitFormBoundaryBRi81vNtMyBL97Rb
Content-Disposition: form-data; name="age"

12
------WebKitFormBoundaryBRi81vNtMyBL97Rb--
```

###### [Request Headers部分各个字段的功能](https://wangjun-scu.gitbooks.io/learnjava/content/%E6%8A%80%E6%9C%AF%E5%AD%A6%E4%B9%A0/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP_POST%E8%AF%B7%E6%B1%82%E7%9A%84%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F.html)

###### [Response Headers部分各个字段的功能](https://wangjun-scu.gitbooks.io/learnjava/content/%E6%8A%80%E6%9C%AF%E5%AD%A6%E4%B9%A0/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP_POST%E8%AF%B7%E6%B1%82%E7%9A%84%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F.html)

##### 响应状态码
```
（1）200 客户端的请求在服务器端被正常处理
（2）204 请求处理成功，但没有可返回的资源
（3）206 表示客户端进行了范围请求

（4）301 永久重定向，请求的资源已被分配新的uri，以后应使用资源现在所指的URI
（5）302 临时性重定向
（6）304 客户端附带条件的请求，允许访问资源，但未满足条件

（7）400 请求报文中存在语法错误
（8）401 请求需要认证
（9）403 资源不允许被访问
（10）404 服务器上没有请求的资源

（11）500 服务器内部出现错
（12）503 服务器超负荷或停机维护，无法处理请求
```

#### 参考链接
0. [HTTP协议入门](https://segmentfault.com/a/1190000014999721?utm_source=tag-newest)

1. [我的HTTP学习之路一](https://segmentfault.com/a/1190000015190867?utm_source=tag-newest)

2. [我的HTTP学习之路二](https://segmentfault.com/a/1190000015232115?utm_source=tag-newest)

3. [深入浅出HTTP](https://segmentfault.com/a/1190000015239049?utm_source=tag-newest)
4. [图解HTTP](https://segmentfault.com/a/1190000015210796?utm_source=tag-newest)