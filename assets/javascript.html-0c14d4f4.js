import{a6 as c,F as d,G as p,D as e,M as t,ac as o,R as a,ad as l,V as r}from"./framework-913605ae.js";const i={},h=e("p",null,"我本来是想从头开始找有趣的地方写的，但我现在...有需求了。 嗯......我要重写一个瀑布流的功能，读代码断断续续读了三天多但还有好多没整清楚的。",-1),_=e("p",null,"我不想直接去手搓新的代码，我想要的是能会拆会复制粘贴。 ————面临的一个问题是，函数相互调用组合...怎么组合？写成一大堆const 字符串，里面放箭头函数？这还是在一个文件里... 拆出utils...还是另一回事。",-1),u=l('<hr><p>update 2023-01-03</p><p>我发现...我的编程水平是真的...菜逼。糊简单网页虽然有各种组件库帮忙，但...想做点东西经常性束手无策甚至要找 copilot 教...</p><p>依旧是以实用为主，但...确实没什么具体想做的了现在。我会想把想要学的分几个路线。（挖坑</p><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><h3 id="面向对象-原型" tabindex="-1"><a class="header-anchor" href="#面向对象-原型" aria-hidden="true">#</a> 面向对象 &amp;&amp; 原型</h3><h3 id="正则表达式-字符串处理" tabindex="-1"><a class="header-anchor" href="#正则表达式-字符串处理" aria-hidden="true">#</a> 正则表达式 &amp;&amp; 字符串处理</h3><h3 id="dom-api" tabindex="-1"><a class="header-anchor" href="#dom-api" aria-hidden="true">#</a> DOM API</h3><p>update 2023-01-09</p><p>好吧上面的坑我在下面的链接填了一部分。</p>',10),f={href:"http://js.okten.cn/",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"JavaScript...我感觉，快能摸到它的样子了。由于主要是浏览器中运行，没有官方搞的 IO 操作等等算是弱的地方...但它的正则表达式，为处理 URL 搞的专门的类型，为应对网络请求而到处都是的异步...还有大名鼎鼎的 JSON 这些，也都好厉害... 而一个浏览器，一个NodeJS，对应 web api 和各种各样的 .js 库......相比之下语言本身的语法特性之类的好像也并没有那么重，就算烂，不还有 Java 陪着吗，或者说... JS 并不只是那些语法，更是它所依赖，支持着它的这一大圈生态和设计。就像...语言也不只是语言本身，语言和它们所指代的那些东西是分不开的，或者说，语言所指代的那些东西才更重要，语言本身..只是进入那些地方的工具而已。",-1),b=e("p",null,"update 2023-03-28",-1),v=e("p",null,"看了本 ruby 的书。有关编程语言的发展。",-1),x=e("p",null,[a("从机器码，汇编这种基本只有 goto 语句的；到将程序抽象为几种特殊的控制流 if else for 等等的 C；然后是面向对象的发展， "),e("code",null,"云苔.变可爱()"),a(" 这种写法和再之后的 Java... 还有 lambda 运算式开始的函数式编程..."),e("br"),a(" 语言的表达能力是种很神奇的东西，它需要和机器契合，但也需要和人契合。——那本书挺老了，也许很多都已经过时或者在中国不合适...但还是挺有意思的。"),e("br"),a(" 基于原型与模板的面向对象，单继承与多重继承，语言的类型系统，强弱类型，动静，duck type。从闭包、程序块搞到迭代器... 然后是设计模式...")],-1);function k(S,J){const n=r("RouterLink"),s=r("ExternalLinkIcon");return d(),p("div",null,[h,_,e("p",null,[t(n,{to:"/posts/CS/front-end/practice/vue-waterfall.md/#javascript"},{default:o(()=>[a("实践才是动力")]),_:1})]),u,e("p",null,[e("strong",null,[t(n,{to:"/posts/CS/front-end/practice/canvas/bumping-balls.md/#2023-01-08"},{default:o(()=>[a("实践才是动力2")]),_:1})])]),e("p",null,[a("我发现...我还是有具体目标去看的时候更能看进去，虽然看见的也不一定是我想要的功能...但就是更容易看。上面那部分，主要是从这本里看到的，JavaScript权威指南...但是我看的这个最后几章都没怎么翻译了...["),e("a",f,[a("http://js.okten.cn/"),t(s)]),a("]")]),m,b,v,x])}const N=c(i,[["render",k],["__file","javascript.html.vue"]]);export{N as default};
