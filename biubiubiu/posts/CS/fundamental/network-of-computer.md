---
title: 计算机网络
icon: network
date: 2022-12-31
category:
  - 挖坑
  - 基础
---

这可能是为数不多的...我这学期听下来的课...

先，过一下网络的五层模型。

给我的感觉是，这是一个贯穿硬件到软件还有协议的科目...底层的某些东西像C2C，汉明码和计组那边算是通用的，TCP的各种算法调度又像是到了操作系统...

1. 物理层，提供最基本的连接，几种传输线和介质...传输线、信道的复用以及怎么一边复用一边避免冲突...
2. 链路层就要考虑谁和谁连接和传输的有效性的问题了，这里出现了mac地址，交换机和c2c校验这种东西
3. 网络层，mac地址依旧有问题，由于它的扁平化，分布随机，想要在较大网络相互找到很困难。于是有了IP协议，将网络地址的分配做成层级的，有规律的，相关的像子网划分、CIDR、DHCP、NAT...然而...怎么说呢，现在大部分网民似乎搞不到公网IP，ipv6，内网转发算是办法，但现在...从大的互联网公司申请服务，然后在它们ip之下的一些应用去获取身份似乎更加普遍。
4. 在网络层解决了基本的相互找到的需求，而在相互找到之后的通信数据传输，则还要有运输层的TCP UDP之类的协议来保证，这里TCP的调度，滑动窗口，拥塞避免，重传，握手，等等等等...
5. 再然后就是应用层了，http ftp smtp p2p来满足进一步的具体需求。这里也是之后会进一步了解学习然后使用的部分..毕竟搞软件，这是最直接最基本的接口.....

嗯...我想弄一个网盘，除了基本的文件储存上传下载，还想在在线查看上做点东西，比如图片搞个画廊，音频视频的在线播放...

[网盘常用协议](https://www.zhihu.com/question/21511143)
>webdav

[webdav基于http协议](https://www.zhihu.com/question/30719209/answer/222264978)

>HTTP协议定义了几种请求: GET, POST,PUT等用来下载文件上传数据。WebDAV在标准的HTTP协议上扩展了特有的请求方式: PROPFIND, MOVE, COPY等。 然后用这些请求，操作web服务器上的磁盘(像不像一个网盘！！！)

[视频播放相关的网络协议有哪些？](https://www.zhihu.com/question/20621558)

>支持HTTP range-request的服务器，目前就可以支持我们一般网络看视频的要求了。但是，这种方式，无法支持实时视频流，或者准实时视频流。因为视频流，是不存在一个视频文件的概念的。HTTP协议播放视频的好处，就是简单。采取通用的HTTP服务器，就可以提供服务，不需要专门类型的服务器，也不需要特别的网络端口，穿过路由器防火墙一点都没有问题。而且还可以利用通用的CDN来简化视频的部署分发的工作，减少带宽的使用。这个是目前用于PC端或者网页端，视频点播业务，最常见的解决方案。客户端的实现，一般采用flash完成，flash本是的videoplayer或者videodisplay控件就可以完成。资源一般采用flv格式，也可以使用mp4格式。

但...貌似不用现有的这些专门的网络协议，就http然后在客户端浏览器服务端自己写东西也可以？

而另一部分，除开这些协议本身，多线程下载...哦，这应该放操作系统对吧。
