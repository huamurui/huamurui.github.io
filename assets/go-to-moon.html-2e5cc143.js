import{a6 as e,F as a,G as t,D as n,M as i,ac as l,ad as o,V as p}from"./framework-913605ae.js";const r={},c=n("s",null,"we choose to go to the monn",-1),u=n("br",null,null,-1),d=n("s",null,"we choose to go to the monn!",-1),v=o(`<p>没写的地方是要去整一个 VPS，系统是 debian，还要有个解析到这个服务器的一个域名。</p><p>大约是，v2ray 然后用 nginx 做点伪装。</p><p>首先是整服务器和域名，放个博客下载站之类的东西，用 nginx 配。</p><p>ssl 证书用 certbot 生成。</p><p>基本的安装</p><p>git 下载 blog 或者别的什么东西</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt-get update
apt-get install git -y
apt-get install nginx -y
cd /
mkdir github
cd github
git clone -b vuepress-pages https://github.com/huamurui/huamurui.github.io.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入 nginx 配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /etc/nginx
vim nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>or</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /etc/nginx/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重载配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nginx -s reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>nginx 具体配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>
user www-data;
pid /run/nginx.pid;
worker_processes auto;
worker_rlimit_nofile <span class="token number">51200</span>;

events <span class="token punctuation">{</span>
    worker_connections <span class="token number">1024</span>;
    multi_accept on;
    use epoll;
<span class="token punctuation">}</span>

http <span class="token punctuation">{</span>
    server_tokens off;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 120s;
    keepalive_requests <span class="token number">10000</span>;
    types_hash_max_size <span class="token number">2048</span>;
    include /etc/nginx/mime.types;

    access_log off;
    error_log /dev/<span class="token null keyword">null</span>;

    server <span class="token punctuation">{</span>
        listen <span class="token number">80</span>;
        listen <span class="token punctuation">[</span><span class="token operator">:</span><span class="token operator">:</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token number">80</span>;
        server_name huamurui.me;
        root /github/huamurui.github.io;
        index index.html;

        location /ray <span class="token punctuation">{</span>
            proxy_redirect off;
            proxy_pass http<span class="token operator">:</span><span class="token comment">//127.0.0.1:10086;</span>
            proxy_http_version <span class="token number">1.1</span>;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection <span class="token string">&quot;upgrade&quot;</span>;
            proxy_set_header Host $http_host;
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    server <span class="token punctuation">{</span>
        listen <span class="token number">443</span> ssl http2;
        listen <span class="token punctuation">[</span><span class="token operator">:</span><span class="token operator">:</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token number">443</span> ssl http2;
        root /github/huamurui.github.io;
        index index.html;

        server_name huamurui.me;
        ssl_protocols TLSv1 TLSv1.<span class="token number">1</span> TLSv1.<span class="token number">2</span> TLSv1.<span class="token number">3</span>;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256<span class="token operator">:</span>HIGH<span class="token operator">:</span>!aNULL<span class="token operator">:</span>!MD5<span class="token operator">:</span>!RC4<span class="token operator">:</span>!DHE;
        ssl_prefer_server_ciphers on;
        ssl_certificate /etc/letsencrypt/live/huamurui.me/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/huamurui.me/privkey.pem;
        location /ray <span class="token punctuation">{</span>
            proxy_redirect off;
            proxy_pass http<span class="token operator">:</span><span class="token comment">//127.0.0.1:10086;</span>
            proxy_http_version <span class="token number">1.1</span>;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection <span class="token string">&quot;upgrade&quot;</span>;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>v2fly 下载 yu 客户端配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-L</span> https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /usr/local/etc/v2ray/
vim config.josn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>or</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /usr/local/etc/v2ray/config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>v2fly 具体配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;inbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">10086</span><span class="token punctuation">,</span>
      <span class="token property">&quot;listen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vmess&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;clients&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;b831381d-6324-4d53-ad4f-8cda48b30811&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;alterId&quot;</span><span class="token operator">:</span> <span class="token number">64</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;streamSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;network&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ws&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;wsSettings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/ray&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;outbounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;protocol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;freedom&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;domainStrategy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UseIP&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>e
  <span class="token property">&quot;dns&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;https+local://1.1.1.1/dns-query&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;1.1.1.1&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;8.8.8.8&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;localhost&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>certbot 安装 ssl 证书</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
apt-get install certbot -y

certbot certonly --webroot -w /github/huamurui.github.io -d huamurui.me
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>others:</p><p>修改服务器时区</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>timedatectl set-timezone Asia/Shanghai
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl start nginx
systemctl start v2ray
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看端口占用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>netstat -tulpn | grep xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,31);function m(b,k){const s=p("RouterLink");return a(),t("div",null,[n("p",null,[c,u,i(s,{to:"/posts/CS/helloworld/why-the-moon.html"},{default:l(()=>[d]),_:1})]),v])}const h=e(r,[["render",m],["__file","go-to-moon.html.vue"]]);export{h as default};
