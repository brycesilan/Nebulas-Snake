require=function i(a,s,u){function f(e,t){if(!s[e]){if(!a[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(c)return c(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var o=s[e]={exports:{}};a[e][0].call(o.exports,function(t){return f(a[e][1][t]||t)},o,o.exports,i,a,s,u)}return s[e].exports}for(var c="function"==typeof require&&require,t=0;t<u.length;t++)f(u[t]);return f}({1:[function(t,e,r){"use strict";var n,o,i=((n=document.createElement("style")).type="text/css",document.head.appendChild(n),o=n.sheet,function(t,e,r){r=r||0,o.insertRule(t+"{"+e+"}",r)});e.exports={isChrome:function(){if("undefined"!=typeof window&&navigator.userAgent.toLowerCase().match(/chrome\/([\d\.]+)/))return!0;return!1},isMobile:function(){return-1<navigator.userAgent.toLowerCase().indexOf("mobile")},isNano:function(){return-1<navigator.userAgent.toLowerCase().indexOf("nasnanoapp")},isWechat:function(){return-1<navigator.userAgent.toLowerCase().indexOf("micromessenger")},randomCode:function(t){var e,r,n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",o="";for(e=0;e<t;e+=1)r=Math.random()*n.length,r=Math.floor(r),o+=n.charAt(r);return o},addCssRule:i}},{}],2:[function(t,e,r){"use strict";var s=t("./config"),u=t("./Utils");e.exports=function(t,e){var r,n,o,i,a=s.nanoScheme(e.debug);a=a+"://virtual?params="+JSON.stringify(t),window.location.href=a,!u.isNano()&&e.mobile.showInstallTip&&(r=function(t){t||function(t){var e=document.createElement("BUTTON");e.className="install",e.innerHTML=t.mobile.installTip||"INSTALL NASNano/下载星云钱包";var r="text-align: center;    background-color: #000;    color: #fff;    border-radius: 20px;    width: 80%;    height: 40px;    position: absolute;    left: 50%;    top: 50%;    transform: translate(-50%,-50%);";u.addCssRule(".install",r);var n=document.createElement("div");n.className="install-background",r="position: fixed;\tbottom:0;\tz-index:1000;\theight:40px;    width:100%;\tbackground-color: rgba(0, 0, 0, 0);",u.addCssRule(".install-background",r),n.appendChild(e);var o=document.getElementsByTagName("body")[0];o.appendChild(n),e.onclick=function(){o.removeChild(n),n=null,window.location.href="https://nano.nebulas.io/"}}(e)},n=+new Date,i=0,o=setInterval(function(){i++;var t=+new Date-n;(100<=i||3e3<t)&&(clearInterval(o),3e3<t||document.hidden||document.webkitHidden?r(1):r(0))},20))}},{"./Utils":1,"./config":3}],3:[function(t,e,r){"use strict";var n="https://pay.nebulas.io/api/mainnet/pay",o="https://pay.nebulas.io/api/pay";e.exports={payUrl:function(t){return(t=t||!1)?o:n},nanoScheme:function(t){return(t=t||!1)?"openapp.NASnano.testnet":"openapp.NASnano"},mainnetUrl:n,testnetUrl:o}},{}],4:[function(t,e,r){"use strict";var n={};window.addEventListener("message",function(t){if(console.log("nebpay: received resp.data: "+JSON.stringify(t.data)),"content"===t.data.src){var e=t.data.serialNumber,r=n[e];"function"==typeof r&&r(e,t.data.resp)}}),e.exports=function(t){t.listener&&(n[t.serialNumber]=t.listener),t.listener=void 0,window.postMessage({src:"nebPay",logo:"nebulas",params:t},"*")}},{}],5:[function(t,e,r){"use strict";var n=function(n){return new Promise(function(t,e){var r=new XMLHttpRequest;r.open(n.method||"GET",n.url),n.headers&&Object.keys(n.headers).forEach(function(t){r.setRequestHeader(t,n.headers[t])}),r.onload=function(){200<=r.status&&r.status<300?t(r.response):e(r.statusText)},r.onerror=function(){return e(r.statusText)},r.send(n.body)})};e.exports={get:function(t,e){return n({url:t,method:"GET",body:e})},post:function(t,e){return n({url:t,method:"POST",body:e})},request:n}},{}],6:[function(t,e,r){"use strict";var u=t("bignumber.js"),f=t("./Utils"),c=t("./qrcode"),l=t("./extensionHandler"),h=t("./appHandler"),n=function(t,e){this.appKey=t,this.appSecret=e};n.prototype={submit:function(t,e,r,n,o){o.serialNumber=f.randomCode(32);var i=new u(r=r||"0").times("1000000000000000000"),a={serialNumber:o.serialNumber,goods:o.goods,pay:{currency:t,to:e,value:i.toString(10),payload:n},callback:o.callback,listener:o.listener,nrc20:o.nrc20};f.isChrome()&&!f.isMobile()&&o.extension.openExtension&&l(a);var s={category:"jump",des:"confirmTransfer",pageParams:a};return f.isMobile()&&h(s,o),o.qrcode.showQRCode&&!f.isNano()&&c.showQRCode(JSON.stringify(s),o),o.serialNumber}},e.exports=n},{"./Utils":1,"./appHandler":2,"./extensionHandler":4,"./qrcode":7,"bignumber.js":8}],7:[function(t,e,r){"use strict";var n=t("qrcode"),u=t("./Utils"),f=function(t,e){void 0!==e.listener&&e.listener(e.serialNumber,t)};e.exports={showQRCode:function(t,e){if("undefined"!=typeof window){var r=e.qrcode.container;void 0===r&&(r=function(t){var e=document.createElement("canvas");e.className="qrcode",u.addCssRule(".qrcode","box-shadow: 2px 2px 12px lightgray;");var r=document.createElement("div");r.className="qrcode-container";var n="text-align: center;    background-color: #fff0;    border-radius: 20px;    width: 300px;    height: 300px;    position: absolute;    left: 50%;    top: 50%;    transform: translate(-50%,-50%);";u.addCssRule(".qrcode-container",n),r.appendChild(e);var o=document.createElement("BUTTON");o.className="complete",o.innerHTML=t.qrcode.completeTip||"COMPLETE",n="background-color: #000;\tborder-radius: 4px;\twidth: 300px;\theight: 40px;\t// padding: 20px;\tmargin-top: 20px;\tcolor: #fff;\t",u.addCssRule(".complete",n),r.appendChild(o);var i=document.createElement("BUTTON");i.className="cancel",i.innerHTML=t.qrcode.cancelTip||"CANCEL",n="background-color: #666;\tborder-radius: 4px;\twidth: 300px;\theight: 40px;\t// padding: 20px;\tmargin-top: 10px;\tmargin-bottom: 20px;\tcolor: #fff;\t",u.addCssRule(".cancel",n),r.appendChild(i);var a=document.createElement("div");a.className="qrcode-background",n="position:absolute;\tleft:0;\ttop:0;\tz-index:100;\theight:100%;\twidth:100%;\tbackground-color: rgba(0, 0, 0, 0.4);",u.addCssRule(".qrcode-background",n),a.appendChild(r);var s=document.getElementsByTagName("body")[0];return s.appendChild(a),a.onclick=function(){null!==a&&(s.removeChild(a),f(!1,t))},i.onclick=function(){s.removeChild(a),a=null,f(!1,t)},o.onclick=function(){s.removeChild(a),f(!(a=null),t)},e}(e)),n.toCanvas(r,t,function(t){t&&console.error(t)})}}}},{"./Utils":1,qrcode:13}],8:[function(t,r,e){!function(t){"use strict";var e,O=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,U=Math.ceil,k=Math.floor,D=" not a boolean or binary digit",q="rounding mode",F="number type has more than 15 significant digits",j="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",H=1e14,Y=14,z=9007199254740991,J=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],K=1e7,V=1e9;function $(t){var e=0|t;return 0<t||t===e?e:e-1}function Q(t){for(var e,r,n=1,o=t.length,i=t[0]+"";n<o;){for(e=t[n++]+"",r=Y-e.length;r--;e="0"+e);i+=e}for(o=i.length;48===i.charCodeAt(--o););return i.slice(0,o+1||1)}function i(t,e){var r,n,o=t.c,i=e.c,a=t.s,s=e.s,u=t.e,f=e.e;if(!a||!s)return null;if(r=o&&!o[0],n=i&&!i[0],r||n)return r?n?0:-s:a;if(a!=s)return a;if(r=a<0,n=u==f,!o||!i)return n?0:!o^r?1:-1;if(!n)return f<u^r?1:-1;for(s=(u=o.length)<(f=i.length)?u:f,a=0;a<s;a++)if(o[a]!=i[a])return o[a]>i[a]^r?1:-1;return u==f?0:f<u^r?1:-1}function G(t,e,r){return(t=et(t))>=e&&t<=r}function W(t){return"[object Array]"==Object.prototype.toString.call(t)}function X(t,e,r){for(var n,o,i=[0],a=0,s=t.length;a<s;){for(o=i.length;o--;i[o]*=e);for(i[n=0]+=j.indexOf(t.charAt(a++));n<i.length;n++)i[n]>r-1&&(null==i[n+1]&&(i[n+1]=0),i[n+1]+=i[n]/r|0,i[n]%=r)}return i.reverse()}function Z(t,e){return(1<t.length?t.charAt(0)+"."+t.slice(1):t)+(e<0?"e":"e+")+e}function tt(t,e){var r,n;if(e<0){for(n="0.";++e;n+="0");t=n+t}else if(++e>(r=t.length)){for(n="0",e-=r;--e;n+="0");t+=n}else e<r&&(t=t.slice(0,e)+"."+t.slice(e));return t}function et(t){return(t=parseFloat(t))<0?U(t):k(t)}(e=function t(e){var v,f,r,c,a,s,u,l,h,b=0,n=B.prototype,m=new B(1),g=20,w=4,d=-7,p=21,y=-1e7,E=1e7,A=!0,N=M,C=!1,R=1,T=0,x={decimalSeparator:".",groupSeparator:",",groupSize:3,secondaryGroupSize:0,fractionGroupSeparator:" ",fractionGroupSize:0};function B(t,e){var r,n,o,i,a,s,u=this;if(!(u instanceof B))return new B(t,e);if(null!=e&&N(e,2,64,b,"base")){if(s=t+"",10==(e|=0))return L(u=new B(t instanceof B?t:s),g+u.e+1,w);if((i="number"==typeof t)&&0*t!=0||!new RegExp("^-?"+(r="["+j.slice(0,e)+"]+")+"(?:\\."+r+")?$",e<37?"i":"").test(s))return f(u,s,i,e);i?(u.s=1/t<0?(s=s.slice(1),-1):1,A&&15<s.replace(/^0\.0*|\./,"").length&&_(b,F,t),i=!1):u.s=45===s.charCodeAt(0)?(s=s.slice(1),-1):1,s=P(s,10,e,u.s)}else{if(t instanceof B)return u.s=t.s,u.e=t.e,u.c=(t=t.c)?t.slice():t,void(b=0);if((i="number"==typeof t)&&0*t==0){if(u.s=1/t<0?(t=-t,-1):1,t===~~t){for(n=0,o=t;10<=o;o/=10,n++);return u.e=n,u.c=[t],void(b=0)}s=t+""}else{if(!O.test(s=t+""))return f(u,s,i);u.s=45===s.charCodeAt(0)?(s=s.slice(1),-1):1}}for(-1<(n=s.indexOf("."))&&(s=s.replace(".","")),0<(o=s.search(/e/i))?(n<0&&(n=o),n+=+s.slice(o+1),s=s.substring(0,o)):n<0&&(n=s.length),o=0;48===s.charCodeAt(o);o++);for(a=s.length;48===s.charCodeAt(--a););if(s=s.slice(o,a+1))if(a=s.length,i&&A&&15<a&&(z<t||t!==k(t))&&_(b,F,u.s*t),E<(n=n-o-1))u.c=u.e=null;else if(n<y)u.c=[u.e=0];else{if(u.e=n,u.c=[],o=(n+1)%Y,n<0&&(o+=Y),o<a){for(o&&u.c.push(+s.slice(0,o)),a-=Y;o<a;)u.c.push(+s.slice(o,o+=Y));s=s.slice(o),o=Y-s.length}else o-=a;for(;o--;s+="0");u.c.push(+s)}else u.c=[u.e=0];b=0}function P(t,e,r,n){var o,i,a,s,u,f,c,l=t.indexOf("."),h=g,d=w;for(r<37&&(t=t.toLowerCase()),0<=l&&(a=T,T=0,t=t.replace(".",""),u=(c=new B(r)).pow(t.length-l),T=a,c.c=X(tt(Q(u.c),u.e),10,e),c.e=c.c.length),i=a=(f=X(t,r,e)).length;0==f[--a];f.pop());if(!f[0])return"0";if(l<0?--i:(u.c=f,u.e=i,u.s=n,f=(u=v(u,c,h,d,e)).c,s=u.r,i=u.e),l=f[o=i+h+1],a=e/2,s=s||o<0||null!=f[o+1],s=d<4?(null!=l||s)&&(0==d||d==(u.s<0?3:2)):a<l||l==a&&(4==d||s||6==d&&1&f[o-1]||d==(u.s<0?8:7)),o<1||!f[0])t=s?tt("1",-h):"0";else{if(f.length=o,s)for(--e;++f[--o]>e;)f[o]=0,o||(++i,f=[1].concat(f));for(a=f.length;!f[--a];);for(l=0,t="";l<=a;t+=j.charAt(f[l++]));t=tt(t,i)}return t}function I(t,e,r,n){var o,i,a,s,u;if(r=null!=r&&N(r,0,8,n,q)?0|r:w,!t.c)return t.toString();if(o=t.c[0],a=t.e,null==e)u=Q(t.c),u=19==n||24==n&&a<=d?Z(u,a):tt(u,a);else if(i=(t=L(new B(t),e,r)).e,s=(u=Q(t.c)).length,19==n||24==n&&(e<=i||i<=d)){for(;s<e;u+="0",s++);u=Z(u,i)}else if(e-=a,u=tt(u,i),s<i+1){if(0<--e)for(u+=".";e--;u+="0");}else if(0<(e+=i-s))for(i+1==s&&(u+=".");e--;u+="0");return t.s<0&&o?"-"+u:u}function o(t,e){var r,n,o=0;for(W(t[0])&&(t=t[0]),r=new B(t[0]);++o<t.length;){if(!(n=new B(t[o])).s){r=n;break}e.call(r,n)&&(r=n)}return r}function M(t,e,r,n,o){return(t<e||r<t||t!=et(t))&&_(n,(o||"decimal places")+(t<e||r<t?" out of range":" not an integer"),t),!0}function S(t,e,r){for(var n=1,o=e.length;!e[--o];e.pop());for(o=e[0];10<=o;o/=10,n++);return(r=n+r*Y-1)>E?t.c=t.e=null:r<y?t.c=[t.e=0]:(t.e=r,t.c=e),t}function _(t,e,r){var n=new Error(["new BigNumber","cmp","config","div","divToInt","eq","gt","gte","lt","lte","minus","mod","plus","precision","random","round","shift","times","toDigits","toExponential","toFixed","toFormat","toFraction","pow","toPrecision","toString","BigNumber"][t]+"() "+e+": "+r);throw n.name="BigNumber Error",b=0,n}function L(t,e,r,n){var o,i,a,s,u,f,c,l=t.c,h=J;if(l){t:{for(o=1,s=l[0];10<=s;s/=10,o++);if((i=e-o)<0)i+=Y,a=e,c=(u=l[f=0])/h[o-a-1]%10|0;else if((f=U((i+1)/Y))>=l.length){if(!n)break t;for(;l.length<=f;l.push(0));u=c=0,a=(i%=Y)-Y+(o=1)}else{for(u=s=l[f],o=1;10<=s;s/=10,o++);c=(a=(i%=Y)-Y+o)<0?0:u/h[o-a-1]%10|0}if(n=n||e<0||null!=l[f+1]||(a<0?u:u%h[o-a-1]),n=r<4?(c||n)&&(0==r||r==(t.s<0?3:2)):5<c||5==c&&(4==r||n||6==r&&(0<i?0<a?u/h[o-a]:0:l[f-1])%10&1||r==(t.s<0?8:7)),e<1||!l[0])return l.length=0,n?(e-=t.e+1,l[0]=h[(Y-e%Y)%Y],t.e=-e||0):l[0]=t.e=0,t;if(0==i?(l.length=f,s=1,f--):(l.length=f+1,s=h[Y-i],l[f]=0<a?k(u/h[o-a]%h[a])*s:0),n)for(;;){if(0==f){for(i=1,a=l[0];10<=a;a/=10,i++);for(a=l[0]+=s,s=1;10<=a;a/=10,s++);i!=s&&(t.e++,l[0]==H&&(l[0]=1));break}if(l[f]+=s,l[f]!=H)break;l[f--]=0,s=1}for(i=l.length;0===l[--i];l.pop());}t.e>E?t.c=t.e=null:t.e<y&&(t.c=[t.e=0])}return t}return B.another=t,B.ROUND_UP=0,B.ROUND_DOWN=1,B.ROUND_CEIL=2,B.ROUND_FLOOR=3,B.ROUND_HALF_UP=4,B.ROUND_HALF_DOWN=5,B.ROUND_HALF_EVEN=6,B.ROUND_HALF_CEIL=7,B.ROUND_HALF_FLOOR=8,B.EUCLID=9,B.config=B.set=function(){var t,e,r=0,n={},o=arguments,i=o[0],a=i&&"object"==typeof i?function(){if(i.hasOwnProperty(e))return null!=(t=i[e])}:function(){if(o.length>r)return null!=(t=o[r++])};return a(e="DECIMAL_PLACES")&&N(t,0,V,2,e)&&(g=0|t),n[e]=g,a(e="ROUNDING_MODE")&&N(t,0,8,2,e)&&(w=0|t),n[e]=w,a(e="EXPONENTIAL_AT")&&(W(t)?N(t[0],-V,0,2,e)&&N(t[1],0,V,2,e)&&(d=0|t[0],p=0|t[1]):N(t,-V,V,2,e)&&(d=-(p=0|(t<0?-t:t)))),n[e]=[d,p],a(e="RANGE")&&(W(t)?N(t[0],-V,-1,2,e)&&N(t[1],1,V,2,e)&&(y=0|t[0],E=0|t[1]):N(t,-V,V,2,e)&&(0|t?y=-(E=0|(t<0?-t:t)):A&&_(2,e+" cannot be zero",t))),n[e]=[y,E],a(e="ERRORS")&&(t===!!t||1===t||0===t?(b=0,N=(A=!!t)?M:G):A&&_(2,e+D,t)),n[e]=A,a(e="CRYPTO")&&(!0===t||!1===t||1===t||0===t?t?!(t="undefined"==typeof crypto)&&crypto&&(crypto.getRandomValues||crypto.randomBytes)?C=!0:A?_(2,"crypto unavailable",t?void 0:crypto):C=!1:C=!1:A&&_(2,e+D,t)),n[e]=C,a(e="MODULO_MODE")&&N(t,0,9,2,e)&&(R=0|t),n[e]=R,a(e="POW_PRECISION")&&N(t,0,V,2,e)&&(T=0|t),n[e]=T,a(e="FORMAT")&&("object"==typeof t?x=t:A&&_(2,e+" not an object",t)),n[e]=x,n},B.max=function(){return o(arguments,n.lt)},B.min=function(){return o(arguments,n.gt)},B.random=(r=9007199254740992,c=Math.random()*r&2097151?function(){return k(Math.random()*r)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(t){var e,r,n,o,i,a=0,s=[],u=new B(m);if(t=null!=t&&N(t,0,V,14)?0|t:g,o=U(t/Y),C)if(crypto.getRandomValues){for(e=crypto.getRandomValues(new Uint32Array(o*=2));a<o;)9e15<=(i=131072*e[a]+(e[a+1]>>>11))?(r=crypto.getRandomValues(new Uint32Array(2)),e[a]=r[0],e[a+1]=r[1]):(s.push(i%1e14),a+=2);a=o/2}else if(crypto.randomBytes){for(e=crypto.randomBytes(o*=7);a<o;)9e15<=(i=281474976710656*(31&e[a])+1099511627776*e[a+1]+4294967296*e[a+2]+16777216*e[a+3]+(e[a+4]<<16)+(e[a+5]<<8)+e[a+6])?crypto.randomBytes(7).copy(e,a):(s.push(i%1e14),a+=7);a=o/7}else C=!1,A&&_(14,"crypto unavailable",crypto);if(!C)for(;a<o;)(i=c())<9e15&&(s[a++]=i%1e14);for(o=s[--a],t%=Y,o&&t&&(i=J[Y-t],s[a]=k(o/i)*i);0===s[a];s.pop(),a--);if(a<0)s=[n=0];else{for(n=-1;0===s[0];s.splice(0,1),n-=Y);for(a=1,i=s[0];10<=i;i/=10,a++);a<Y&&(n-=Y-a)}return u.e=n,u.c=s,u}),v=function(){function R(t,e,r){var n,o,i,a,s=0,u=t.length,f=e%K,c=e/K|0;for(t=t.slice();u--;)s=((o=f*(i=t[u]%K)+(n=c*i+(a=t[u]/K|0)*f)%K*K+s)/r|0)+(n/K|0)+c*a,t[u]=o%r;return s&&(t=[s].concat(t)),t}function T(t,e,r,n){var o,i;if(r!=n)i=n<r?1:-1;else for(o=i=0;o<r;o++)if(t[o]!=e[o]){i=t[o]>e[o]?1:-1;break}return i}function x(t,e,r,n){for(var o=0;r--;)t[r]-=o,o=t[r]<e[r]?1:0,t[r]=o*n+t[r]-e[r];for(;!t[0]&&1<t.length;t.splice(0,1));}return function(t,e,r,n,o){var i,a,s,u,f,c,l,h,d,g,p,v,m,w,y,b,E,A=t.s==e.s?1:-1,N=t.c,C=e.c;if(!(N&&N[0]&&C&&C[0]))return new B(t.s&&e.s&&(N?!C||N[0]!=C[0]:C)?N&&0==N[0]||!C?0*A:A/0:NaN);for(d=(h=new B(A)).c=[],A=r+(a=t.e-e.e)+1,o||(o=H,a=$(t.e/Y)-$(e.e/Y),A=A/Y|0),s=0;C[s]==(N[s]||0);s++);if(C[s]>(N[s]||0)&&a--,A<0)d.push(1),u=!0;else{for(w=N.length,b=C.length,A+=2,1<(f=k(o/(C[s=0]+1)))&&(C=R(C,f,o),N=R(N,f,o),b=C.length,w=N.length),m=b,p=(g=N.slice(0,b)).length;p<b;g[p++]=0);E=C.slice(),E=[0].concat(E),y=C[0],C[1]>=o/2&&y++;do{if(f=0,(i=T(C,g,b,p))<0){if(v=g[0],b!=p&&(v=v*o+(g[1]||0)),1<(f=k(v/y)))for(o<=f&&(f=o-1),l=(c=R(C,f,o)).length,p=g.length;1==T(c,g,l,p);)f--,x(c,b<l?E:C,l,o),l=c.length,i=1;else 0==f&&(i=f=1),l=(c=C.slice()).length;if(l<p&&(c=[0].concat(c)),x(g,c,p,o),p=g.length,-1==i)for(;T(C,g,b,p)<1;)f++,x(g,b<p?E:C,p,o),p=g.length}else 0===i&&(f++,g=[0]);d[s++]=f,g[0]?g[p++]=N[m]||0:(g=[N[m]],p=1)}while((m++<w||null!=g[0])&&A--);u=null!=g[0],d[0]||d.splice(0,1)}if(o==H){for(s=1,A=d[0];10<=A;A/=10,s++);L(h,r+(h.e=s+a*Y-1)+1,n,u)}else h.e=a,h.r=+u;return h}}(),a=/^(-?)0([xbo])(?=\w[\w.]*$)/i,s=/^([^.]+)\.$/,u=/^\.([^.]+)$/,l=/^-?(Infinity|NaN)$/,h=/^\s*\+(?=[\w.])|^\s+|\s+$/g,f=function(t,e,r,n){var o,i=r?e:e.replace(h,"");if(l.test(i))t.s=isNaN(i)?null:i<0?-1:1;else{if(!r&&(i=i.replace(a,function(t,e,r){return o="x"==(r=r.toLowerCase())?16:"b"==r?2:8,n&&n!=o?t:e}),n&&(o=n,i=i.replace(s,"$1").replace(u,"0.$1")),e!=i))return new B(i,o);A&&_(b,"not a"+(n?" base "+n:"")+" number",e),t.s=null}t.c=t.e=null,b=0},n.absoluteValue=n.abs=function(){var t=new B(this);return t.s<0&&(t.s=1),t},n.ceil=function(){return L(new B(this),this.e+1,2)},n.comparedTo=n.cmp=function(t,e){return b=1,i(this,new B(t,e))},n.decimalPlaces=n.dp=function(){var t,e,r=this.c;if(!r)return null;if(t=((e=r.length-1)-$(this.e/Y))*Y,e=r[e])for(;e%10==0;e/=10,t--);return t<0&&(t=0),t},n.dividedBy=n.div=function(t,e){return b=3,v(this,new B(t,e),g,w)},n.dividedToIntegerBy=n.divToInt=function(t,e){return b=4,v(this,new B(t,e),0,1)},n.equals=n.eq=function(t,e){return b=5,0===i(this,new B(t,e))},n.floor=function(){return L(new B(this),this.e+1,3)},n.greaterThan=n.gt=function(t,e){return b=6,0<i(this,new B(t,e))},n.greaterThanOrEqualTo=n.gte=function(t,e){return b=7,1===(e=i(this,new B(t,e)))||0===e},n.isFinite=function(){return!!this.c},n.isInteger=n.isInt=function(){return!!this.c&&$(this.e/Y)>this.c.length-2},n.isNaN=function(){return!this.s},n.isNegative=n.isNeg=function(){return this.s<0},n.isZero=function(){return!!this.c&&0==this.c[0]},n.lessThan=n.lt=function(t,e){return b=8,i(this,new B(t,e))<0},n.lessThanOrEqualTo=n.lte=function(t,e){return b=9,-1===(e=i(this,new B(t,e)))||0===e},n.minus=n.sub=function(t,e){var r,n,o,i,a=this,s=a.s;if(b=10,e=(t=new B(t,e)).s,!s||!e)return new B(NaN);if(s!=e)return t.s=-e,a.plus(t);var u=a.e/Y,f=t.e/Y,c=a.c,l=t.c;if(!u||!f){if(!c||!l)return c?(t.s=-e,t):new B(l?a:NaN);if(!c[0]||!l[0])return l[0]?(t.s=-e,t):new B(c[0]?a:3==w?-0:0)}if(u=$(u),f=$(f),c=c.slice(),s=u-f){for((i=s<0)?(s=-s,o=c):(f=u,o=l),o.reverse(),e=s;e--;o.push(0));o.reverse()}else for(n=(i=(s=c.length)<(e=l.length))?s:e,s=e=0;e<n;e++)if(c[e]!=l[e]){i=c[e]<l[e];break}if(i&&(o=c,c=l,l=o,t.s=-t.s),0<(e=(n=l.length)-(r=c.length)))for(;e--;c[r++]=0);for(e=H-1;s<n;){if(c[--n]<l[n]){for(r=n;r&&!c[--r];c[r]=e);--c[r],c[n]+=H}c[n]-=l[n]}for(;0==c[0];c.splice(0,1),--f);return c[0]?S(t,c,f):(t.s=3==w?-1:1,t.c=[t.e=0],t)},n.modulo=n.mod=function(t,e){var r,n,o=this;return b=11,t=new B(t,e),!o.c||!t.s||t.c&&!t.c[0]?new B(NaN):!t.c||o.c&&!o.c[0]?new B(o):(9==R?(n=t.s,t.s=1,r=v(o,t,0,3),t.s=n,r.s*=n):r=v(o,t,0,R),o.minus(r.times(t)))},n.negated=n.neg=function(){var t=new B(this);return t.s=-t.s||null,t},n.plus=n.add=function(t,e){var r,n=this,o=n.s;if(b=12,e=(t=new B(t,e)).s,!o||!e)return new B(NaN);if(o!=e)return t.s=-e,n.minus(t);var i=n.e/Y,a=t.e/Y,s=n.c,u=t.c;if(!i||!a){if(!s||!u)return new B(o/0);if(!s[0]||!u[0])return u[0]?t:new B(s[0]?n:0*o)}if(i=$(i),a=$(a),s=s.slice(),o=i-a){for(0<o?(a=i,r=u):(o=-o,r=s),r.reverse();o--;r.push(0));r.reverse()}for((o=s.length)-(e=u.length)<0&&(r=u,u=s,s=r,e=o),o=0;e;)o=(s[--e]=s[e]+u[e]+o)/H|0,s[e]=H===s[e]?0:s[e]%H;return o&&(s=[o].concat(s),++a),S(t,s,a)},n.precision=n.sd=function(t){var e,r,n=this.c;if(null!=t&&t!==!!t&&1!==t&&0!==t&&(A&&_(13,"argument"+D,t),t!=!!t&&(t=null)),!n)return null;if(e=(r=n.length-1)*Y+1,r=n[r]){for(;r%10==0;r/=10,e--);for(r=n[0];10<=r;r/=10,e++);}return t&&this.e+1>e&&(e=this.e+1),e},n.round=function(t,e){var r=new B(this);return(null==t||N(t,0,V,15))&&L(r,~~t+this.e+1,null!=e&&N(e,0,8,15,q)?0|e:w),r},n.shift=function(t){var e=this;return N(t,-z,z,16,"argument")?e.times("1e"+et(t)):new B(e.c&&e.c[0]&&(t<-z||z<t)?e.s*(t<0?0:1/0):e)},n.squareRoot=n.sqrt=function(){var t,e,r,n,o,i=this,a=i.c,s=i.s,u=i.e,f=g+4,c=new B("0.5");if(1!==s||!a||!a[0])return new B(!s||s<0&&(!a||a[0])?NaN:a?i:1/0);if(0==(s=Math.sqrt(+i))||s==1/0?(((e=Q(a)).length+u)%2==0&&(e+="0"),s=Math.sqrt(e),u=$((u+1)/2)-(u<0||u%2),r=new B(e=s==1/0?"1e"+u:(e=s.toExponential()).slice(0,e.indexOf("e")+1)+u)):r=new B(s+""),r.c[0])for((s=(u=r.e)+f)<3&&(s=0);;)if(o=r,r=c.times(o.plus(v(i,o,f,1))),Q(o.c).slice(0,s)===(e=Q(r.c)).slice(0,s)){if(r.e<u&&--s,"9999"!=(e=e.slice(s-3,s+1))&&(n||"4999"!=e)){+e&&(+e.slice(1)||"5"!=e.charAt(0))||(L(r,r.e+g+2,1),t=!r.times(r).eq(i));break}if(!n&&(L(o,o.e+g+2,0),o.times(o).eq(i))){r=o;break}f+=4,s+=4,n=1}return L(r,r.e+g+1,w,t)},n.times=n.mul=function(t,e){var r,n,o,i,a,s,u,f,c,l,h,d,g,p,v,m=this,w=m.c,y=(b=17,t=new B(t,e)).c;if(!(w&&y&&w[0]&&y[0]))return!m.s||!t.s||w&&!w[0]&&!y||y&&!y[0]&&!w?t.c=t.e=t.s=null:(t.s*=m.s,w&&y?(t.c=[0],t.e=0):t.c=t.e=null),t;for(n=$(m.e/Y)+$(t.e/Y),t.s*=m.s,(u=w.length)<(l=y.length)&&(g=w,w=y,y=g,o=u,u=l,l=o),o=u+l,g=[];o--;g.push(0));for(p=H,v=K,o=l;0<=--o;){for(r=0,h=y[o]%v,d=y[o]/v|0,i=o+(a=u);o<i;)r=((f=h*(f=w[--a]%v)+(s=d*f+(c=w[a]/v|0)*h)%v*v+g[i]+r)/p|0)+(s/v|0)+d*c,g[i--]=f%p;g[i]=r}return r?++n:g.splice(0,1),S(t,g,n)},n.toDigits=function(t,e){var r=new B(this);return t=null!=t&&N(t,1,V,18,"precision")?0|t:null,e=null!=e&&N(e,0,8,18,q)?0|e:w,t?L(r,t,e):r},n.toExponential=function(t,e){return I(this,null!=t&&N(t,0,V,19)?1+~~t:null,e,19)},n.toFixed=function(t,e){return I(this,null!=t&&N(t,0,V,20)?~~t+this.e+1:null,e,20)},n.toFormat=function(t,e){var r=I(this,null!=t&&N(t,0,V,21)?~~t+this.e+1:null,e,21);if(this.c){var n,o=r.split("."),i=+x.groupSize,a=+x.secondaryGroupSize,s=x.groupSeparator,u=o[0],f=o[1],c=this.s<0,l=c?u.slice(1):u,h=l.length;if(a&&(n=i,i=a,h-=a=n),0<i&&0<h){for(n=h%i||i,u=l.substr(0,n);n<h;n+=i)u+=s+l.substr(n,i);0<a&&(u+=s+l.slice(n)),c&&(u="-"+u)}r=f?u+x.decimalSeparator+((a=+x.fractionGroupSize)?f.replace(new RegExp("\\d{"+a+"}\\B","g"),"$&"+x.fractionGroupSeparator):f):u}return r},n.toFraction=function(t){var e,r,n,o,i,a,s,u,f,c=A,l=this,h=l.c,d=new B(m),g=r=new B(m),p=s=new B(m);if(null!=t&&(A=!1,a=new B(t),A=c,(c=a.isInt())&&!a.lt(m)||(A&&_(22,"max denominator "+(c?"out of range":"not an integer"),t),t=!c&&a.c&&L(a,a.e+1,1).gte(m)?a:null)),!h)return l.toString();for(f=Q(h),o=d.e=f.length-l.e-1,d.c[0]=J[(i=o%Y)<0?Y+i:i],t=!t||0<a.cmp(d)?0<o?d:g:a,i=E,E=1/0,a=new B(f),s.c[0]=0;u=v(a,d,0,1),1!=(n=r.plus(u.times(p))).cmp(t);)r=p,p=n,g=s.plus(u.times(n=g)),s=n,d=a.minus(u.times(n=d)),a=n;return n=v(t.minus(r),p,0,1),s=s.plus(n.times(g)),r=r.plus(n.times(p)),s.s=g.s=l.s,e=v(g,p,o*=2,w).minus(l).abs().cmp(v(s,r,o,w).minus(l).abs())<1?[g.toString(),p.toString()]:[s.toString(),r.toString()],E=i,e},n.toNumber=function(){return+this},n.toPower=n.pow=function(t,e){var r,n,o,i=k(t<0?-t:+t),a=this;if(null!=e&&(b=23,e=new B(e)),!N(t,-z,z,23,"exponent")&&(!isFinite(t)||z<i&&(t/=0)||parseFloat(t)!=t&&!(t=NaN))||0==t)return r=Math.pow(+a,t),new B(e?r%e:r);for(e?1<t&&a.gt(m)&&a.isInt()&&e.gt(m)&&e.isInt()?a=a.mod(e):(o=e,e=null):T&&(r=U(T/Y+2)),n=new B(m);;){if(i%2){if(!(n=n.times(a)).c)break;r?n.c.length>r&&(n.c.length=r):e&&(n=n.mod(e))}if(!(i=k(i/2)))break;a=a.times(a),r?a.c&&a.c.length>r&&(a.c.length=r):e&&(a=a.mod(e))}return e?n:(t<0&&(n=m.div(n)),o?n.mod(o):r?L(n,T,w):n)},n.toPrecision=function(t,e){return I(this,null!=t&&N(t,1,V,24,"precision")?0|t:null,e,24)},n.toString=function(t){var e,r=this.s,n=this.e;return null===n?r?(e="Infinity",r<0&&(e="-"+e)):e="NaN":(e=Q(this.c),e=null!=t&&N(t,2,64,25,"base")?P(tt(e,n),0|t,10,r):n<=d||p<=n?Z(e,n):tt(e,n),r<0&&this.c[0]&&(e="-"+e)),e},n.truncated=n.trunc=function(){return L(new B(this),this.e+1,1)},n.valueOf=n.toJSON=function(){var t,e=this.e;return null===e?this.toString():(t=Q(this.c),t=e<=d||p<=e?Z(t,e):tt(t,e),this.s<0?"-"+t:t)},n.isBigNumber=!0,null!=e&&B.config(e),B}()).default=e.BigNumber=e,"function"==typeof define&&define.amd?define(function(){return e}):void 0!==r&&r.exports?r.exports=e:(t||(t="undefined"!=typeof self?self:Function("return this")()),t.BigNumber=e)}(this)},{}],9:[function(t,e,r){"use strict";var n=t("window-or-global");e.exports=function(){return"function"==typeof n.Promise&&"function"==typeof n.Promise.prototype.then}},{"window-or-global":39}],10:[function(t,e,r){"use strict";var g={single_source_shortest_paths:function(t,e,r){var n={},o={};o[e]=0;var i,a,s,u,f,c,l,h=g.PriorityQueue.make();for(h.push(e,0);!h.empty();)for(s in a=(i=h.pop()).value,u=i.cost,f=t[a]||{})f.hasOwnProperty(s)&&(c=u+f[s],l=o[s],(void 0===o[s]||c<l)&&(o[s]=c,h.push(s,c),n[s]=a));if(void 0!==r&&void 0===o[r]){var d=["Could not find a path from ",e," to ",r,"."].join("");throw new Error(d)}return n},extract_shortest_path_from_predecessor_list:function(t,e){for(var r=[],n=e;n;)r.push(n),t[n],n=t[n];return r.reverse(),r},find_path:function(t,e,r){var n=g.single_source_shortest_paths(t,e,r);return g.extract_shortest_path_from_predecessor_list(n,r)},PriorityQueue:{make:function(t){var e,r=g.PriorityQueue,n={};for(e in t=t||{},r)r.hasOwnProperty(e)&&(n[e]=r[e]);return n.queue=[],n.sorter=t.sorter||r.default_sorter,n},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var r={value:t,cost:e};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};void 0!==e&&(e.exports=g)},{}],11:[function(t,e,r){"use strict";var o=Object.prototype.hasOwnProperty,i=Object.prototype.toString,l=function(t){return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===i.call(t)},h=function(t){if(!t||"[object Object]"!==i.call(t))return!1;var e,r=o.call(t,"constructor"),n=t.constructor&&t.constructor.prototype&&o.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!r&&!n)return!1;for(e in t);return void 0===e||o.call(t,e)};e.exports=function t(){var e,r,n,o,i,a,s=arguments[0],u=1,f=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),(null==s||"object"!=typeof s&&"function"!=typeof s)&&(s={});u<f;++u)if(null!=(e=arguments[u]))for(r in e)n=s[r],s!==(o=e[r])&&(c&&o&&(h(o)||(i=l(o)))?(i?(i=!1,a=n&&l(n)?n:[]):a=n&&h(n)?n:{},s[r]=t(c,a,o)):void 0!==o&&(s[r]=o));return s}},{}],12:[function(t,e,r){var n={}.toString;e.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},{}],13:[function(t,e,r){var f=t("can-promise"),c=t("./core/qrcode"),n=t("./renderer/canvas"),o=t("./renderer/svg-tag.js");function i(n,o,i,a,e){var t=[].slice.call(arguments,1),r=t.length,s="function"==typeof t[r-1];if(!s&&!f())throw new Error("Callback required as last argument");if(!s){if(r<1)throw new Error("Too few arguments provided");return 1===r?(i=o,o=a=void 0):2!==r||o.getContext||(a=i,i=o,o=void 0),new Promise(function(t,e){try{var r=c.create(i,a);t(n(r,o,a))}catch(t){e(t)}})}if(r<2)throw new Error("Too few arguments provided");2===r?(e=i,i=o,o=a=void 0):3===r&&(o.getContext&&void 0===e?(e=a,a=void 0):(e=a,a=i,i=o,o=void 0));try{var u=c.create(i,a);e(null,n(u,o,a))}catch(t){e(t)}}r.create=c.create,r.toCanvas=i.bind(null,n.render),r.toDataURL=i.bind(null,n.renderToDataURL),r.toString=i.bind(null,function(t,e,r){return o.render(t,r)})},{"./core/qrcode":29,"./renderer/canvas":35,"./renderer/svg-tag.js":36,"can-promise":9}],14:[function(t,e,a){var s=t("./utils").getSymbolSize;a.getRowColCoords=function(t){if(1===t)return[];for(var e=Math.floor(t/7)+2,r=s(t),n=145===r?26:2*Math.ceil((r-13)/(2*e-2)),o=[r-7],i=1;i<e-1;i++)o[i]=o[i-1]-n;return o.push(6),o.reverse()},a.getPositions=function(t){for(var e=[],r=a.getRowColCoords(t),n=r.length,o=0;o<n;o++)for(var i=0;i<n;i++)0===o&&0===i||0===o&&i===n-1||o===n-1&&0===i||e.push([r[o],r[i]]);return e}},{"./utils":33}],15:[function(t,e,r){var n=t("./mode"),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(t){this.mode=n.ALPHANUMERIC,this.data=t}i.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var e;for(e=0;e+2<=this.data.length;e+=2){var r=45*o.indexOf(this.data[e]);r+=o.indexOf(this.data[e+1]),t.put(r,11)}this.data.length%2&&t.put(o.indexOf(this.data[e]),6)},e.exports=i},{"./mode":26}],16:[function(t,e,r){function n(){this.buffer=[],this.length=0}n.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},e.exports=n},{}],17:[function(t,e,r){var n=t("../utils/buffer");function o(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new n(t*t),this.data.fill(0),this.reservedBit=new n(t*t),this.reservedBit.fill(0)}o.prototype.set=function(t,e,r,n){var o=t*this.size+e;this.data[o]=r,n&&(this.reservedBit[o]=!0)},o.prototype.get=function(t,e){return this.data[t*this.size+e]},o.prototype.xor=function(t,e,r){this.data[t*this.size+e]^=r},o.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},e.exports=o},{"../utils/buffer":38}],18:[function(t,e,r){var n=t("../utils/buffer"),o=t("./mode");function i(t){this.mode=o.BYTE,this.data=new n(t)}i.getBitsLength=function(t){return 8*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){for(var e=0,r=this.data.length;e<r;e++)t.put(this.data[e],8)},e.exports=i},{"../utils/buffer":38,"./mode":26}],19:[function(t,e,r){var n=t("./error-correction-level"),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];r.getBlocksCount=function(t,e){switch(e){case n.L:return o[4*(t-1)+0];case n.M:return o[4*(t-1)+1];case n.Q:return o[4*(t-1)+2];case n.H:return o[4*(t-1)+3];default:return}},r.getTotalCodewordsCount=function(t,e){switch(e){case n.L:return i[4*(t-1)+0];case n.M:return i[4*(t-1)+1];case n.Q:return i[4*(t-1)+2];case n.H:return i[4*(t-1)+3];default:return}}},{"./error-correction-level":20}],20:[function(t,e,r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2},r.isValid=function(t){return t&&void 0!==t.bit&&0<=t.bit&&t.bit<4},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(t){return e}}},{}],21:[function(t,e,r){var n=t("./utils").getSymbolSize;r.getPositions=function(t){var e=n(t);return[[0,0],[e-7,0],[0,e-7]]}},{"./utils":33}],22:[function(t,e,r){var o=t("./utils"),i=o.getBCHDigit(1335);r.getEncodedBits=function(t,e){for(var r=t.bit<<3|e,n=r<<10;0<=o.getBCHDigit(n)-i;)n^=1335<<o.getBCHDigit(n)-i;return 21522^(r<<10|n)}},{"./utils":33}],23:[function(t,e,r){var n=t("../utils/buffer"),o=new n(512),i=new n(256);!function(){for(var t=1,e=0;e<255;e++)o[e]=t,i[t]=e,256&(t<<=1)&&(t^=285);for(e=255;e<512;e++)o[e]=o[e-255]}(),r.log=function(t){if(t<1)throw new Error("log("+t+")");return i[t]},r.exp=function(t){return o[t]},r.mul=function(t,e){return 0===t||0===e?0:o[i[t]+i[e]]}},{"../utils/buffer":38}],24:[function(t,e,r){var n=t("./mode"),o=t("./utils");function i(t){this.mode=n.KANJI,this.data=t}i.getBitsLength=function(t){return 13*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var e;for(e=0;e<this.data.length;e++){var r=o.toSJIS(this.data[e]);if(33088<=r&&r<=40956)r-=33088;else{if(!(57408<=r&&r<=60351))throw new Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");r-=49472}r=192*(r>>>8&255)+(255&r),t.put(r,13)}},e.exports=i},{"./mode":26,"./utils":33}],25:[function(t,e,s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var c=3,a=3,u=40,o=10;function i(t,e,r){switch(t){case s.Patterns.PATTERN000:return(e+r)%2==0;case s.Patterns.PATTERN001:return e%2==0;case s.Patterns.PATTERN010:return r%3==0;case s.Patterns.PATTERN011:return(e+r)%3==0;case s.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case s.Patterns.PATTERN101:return e*r%2+e*r%3==0;case s.Patterns.PATTERN110:return(e*r%2+e*r%3)%2==0;case s.Patterns.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}}s.isValid=function(t){return t&&""!==t&&!isNaN(t)&&0<=t&&t<=7},s.from=function(t){return s.isValid(t)?parseInt(t,10):void 0},s.getPenaltyN1=function(t){for(var e=t.size,r=0,n=0,o=0,i=null,a=null,s=0;s<e;s++){n=o=0,i=a=null;for(var u=0;u<e;u++){var f=t.get(s,u);f===i?n++:(5<=n&&(r+=c+(n-5)),i=f,n=1),(f=t.get(u,s))===a?o++:(5<=o&&(r+=c+(o-5)),a=f,o=1)}5<=n&&(r+=c+(n-5)),5<=o&&(r+=c+(o-5))}return r},s.getPenaltyN2=function(t){for(var e=t.size,r=0,n=0;n<e-1;n++)for(var o=0;o<e-1;o++){var i=t.get(n,o)+t.get(n,o+1)+t.get(n+1,o)+t.get(n+1,o+1);4!==i&&0!==i||r++}return r*a},s.getPenaltyN3=function(t){for(var e=t.size,r=0,n=0,o=0,i=0;i<e;i++){n=o=0;for(var a=0;a<e;a++)n=n<<1&2047|t.get(i,a),10<=a&&(1488===n||93===n)&&r++,o=o<<1&2047|t.get(a,i),10<=a&&(1488===o||93===o)&&r++}return r*u},s.getPenaltyN4=function(t){for(var e=0,r=t.data.length,n=0;n<r;n++)e+=t.data[n];return Math.abs(Math.ceil(100*e/r/5)-10)*o},s.applyMask=function(t,e){for(var r=e.size,n=0;n<r;n++)for(var o=0;o<r;o++)e.isReserved(o,n)||e.xor(o,n,i(t,o,n))},s.getBestMask=function(t,e){for(var r=Object.keys(s.Patterns).length,n=0,o=1/0,i=0;i<r;i++){e(i),s.applyMask(i,t);var a=s.getPenaltyN1(t)+s.getPenaltyN2(t)+s.getPenaltyN3(t)+s.getPenaltyN4(t);s.applyMask(i,t),a<o&&(o=a,n=i)}return n}},{}],26:[function(t,e,r){var n=t("./version"),o=t("./regex");r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,e){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!n.isValid(e))throw new Error("Invalid version: "+e);return 1<=e&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return o.testNumeric(t)?r.NUMERIC:o.testAlphanumeric(t)?r.ALPHANUMERIC:o.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},r.isValid=function(t){return t&&t.bit&&t.ccBits},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+t)}}(t)}catch(t){return e}}},{"./regex":31,"./version":34}],27:[function(t,e,r){var n=t("./mode");function o(t){this.mode=n.NUMERIC,this.data=t.toString()}o.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){var e,r,n;for(e=0;e+3<=this.data.length;e+=3)r=this.data.substr(e,3),n=parseInt(r,10),t.put(n,10);var o=this.data.length-e;0<o&&(r=this.data.substr(e),n=parseInt(r,10),t.put(n,3*o+1))},e.exports=o},{"./mode":26}],28:[function(t,e,n){var a=t("../utils/buffer"),s=t("./galois-field");n.mul=function(t,e){var r=new a(t.length+e.length-1);r.fill(0);for(var n=0;n<t.length;n++)for(var o=0;o<e.length;o++)r[n+o]^=s.mul(t[n],e[o]);return r},n.mod=function(t,e){for(var r=new a(t);0<=r.length-e.length;){for(var n=r[0],o=0;o<e.length;o++)r[o]^=s.mul(e[o],n);for(var i=0;i<r.length&&0===r[i];)i++;r=r.slice(i)}return r},n.generateECPolynomial=function(t){for(var e=new a([1]),r=0;r<t;r++)e=n.mul(e,[1,s.exp(r)]);return e}},{"../utils/buffer":38,"./galois-field":23}],29:[function(t,e,r){var C=t("../utils/buffer"),R=t("./utils"),i=t("./error-correction-level"),s=t("./bit-buffer"),l=t("./bit-matrix"),h=t("./alignment-pattern"),d=t("./finder-pattern"),g=t("./mask-pattern"),T=t("./error-correction-code"),x=t("./reed-solomon-encoder"),p=t("./version"),u=t("./format-info"),f=t("./mode"),v=t("./segments"),m=t("isarray");function w(t,e,r){var n,o,i=t.size,a=u.getEncodedBits(e,r);for(n=0;n<15;n++)o=1==(a>>n&1),n<6?t.set(n,8,o,!0):n<8?t.set(n+1,8,o,!0):t.set(i-15+n,8,o,!0),n<8?t.set(8,i-n-1,o,!0):n<9?t.set(8,15-n-1+1,o,!0):t.set(8,15-n-1,o,!0);t.set(i-8,8,1,!0)}function y(e,t,r){var n=new s;r.forEach(function(t){n.put(t.mode.bit,4),n.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(n)});var o=8*(R.getSymbolTotalCodewords(e)-T.getTotalCodewordsCount(e,t));for(n.getLengthInBits()+4<=o&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(0);for(var i=(o-n.getLengthInBits())/8,a=0;a<i;a++)n.put(a%2?17:236,8);return function(t,e,r){for(var n=R.getSymbolTotalCodewords(e),o=T.getTotalCodewordsCount(e,r),i=n-o,a=T.getBlocksCount(e,r),s=a-n%a,u=Math.floor(n/a),f=Math.floor(i/a),c=f+1,l=u-f,h=new x(l),d=0,g=new Array(a),p=new Array(a),v=0,m=new C(t.buffer),w=0;w<a;w++){var y=w<s?f:c;g[w]=m.slice(d,d+y),p[w]=h.encode(g[w]),d+=y,v=Math.max(v,y)}var b,E,A=new C(n),N=0;for(b=0;b<v;b++)for(E=0;E<a;E++)b<g[E].length&&(A[N++]=g[E][b]);for(b=0;b<l;b++)for(E=0;E<a;E++)A[N++]=p[E][b];return A}(n,e,t)}function a(t,e,r,n){var o;if(m(t))o=v.fromArray(t);else{if("string"!=typeof t)throw new Error("Invalid data");var i=e;if(!i){var a=v.rawSplit(t);i=p.getBestVersionForData(a,r)}o=v.fromString(t,i||40)}var s=p.getBestVersionForData(o,r);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(e){if(e<s)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+s+".\n")}else e=s;var u=y(e,r,o),f=R.getSymbolSize(e),c=new l(f);return function(t,e){for(var r=t.size,n=d.getPositions(e),o=0;o<n.length;o++)for(var i=n[o][0],a=n[o][1],s=-1;s<=7;s++)if(!(i+s<=-1||r<=i+s))for(var u=-1;u<=7;u++)a+u<=-1||r<=a+u||(0<=s&&s<=6&&(0===u||6===u)||0<=u&&u<=6&&(0===s||6===s)||2<=s&&s<=4&&2<=u&&u<=4?t.set(i+s,a+u,!0,!0):t.set(i+s,a+u,!1,!0))}(c,e),function(t){for(var e=t.size,r=8;r<e-8;r++){var n=r%2==0;t.set(r,6,n,!0),t.set(6,r,n,!0)}}(c),function(t,e){for(var r=h.getPositions(e),n=0;n<r.length;n++)for(var o=r[n][0],i=r[n][1],a=-2;a<=2;a++)for(var s=-2;s<=2;s++)-2===a||2===a||-2===s||2===s||0===a&&0===s?t.set(o+a,i+s,!0,!0):t.set(o+a,i+s,!1,!0)}(c,e),w(c,r,0),7<=e&&function(t,e){for(var r,n,o,i=t.size,a=p.getEncodedBits(e),s=0;s<18;s++)r=Math.floor(s/3),n=s%3+i-8-3,o=1==(a>>s&1),t.set(r,n,o,!0),t.set(n,r,o,!0)}(c,e),function(t,e){for(var r=t.size,n=-1,o=r-1,i=7,a=0,s=r-1;0<s;s-=2)for(6===s&&s--;;){for(var u=0;u<2;u++)if(!t.isReserved(o,s-u)){var f=!1;a<e.length&&(f=1==(e[a]>>>i&1)),t.set(o,s-u,f),-1==--i&&(a++,i=7)}if((o+=n)<0||r<=o){o-=n,n=-n;break}}}(c,u),n||(n=g.getBestMask(c,w.bind(null,c,r))),g.applyMask(n,c),w(c,r,n),{modules:c,version:e,errorCorrectionLevel:r,maskPattern:n,segments:o}}r.create=function(t,e){if(void 0===t||""===t)throw new Error("No input text");var r,n,o=i.M;return void 0!==e&&(o=i.from(e.errorCorrectionLevel,i.M),r=p.from(e.version),n=g.from(e.maskPattern),e.toSJISFunc&&R.setToSJISFunction(e.toSJISFunc)),a(t,r,o,n)}},{"../utils/buffer":38,"./alignment-pattern":14,"./bit-buffer":16,"./bit-matrix":17,"./error-correction-code":19,"./error-correction-level":20,"./finder-pattern":21,"./format-info":22,"./mask-pattern":25,"./mode":26,"./reed-solomon-encoder":30,"./segments":32,"./utils":33,"./version":34,isarray:12}],30:[function(t,e,r){var a=t("../utils/buffer"),s=t("./polynomial");function n(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}n.prototype.initialize=function(t){this.degree=t,this.genPoly=s.generateECPolynomial(this.degree)},n.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");var e=new a(this.degree);e.fill(0);var r=a.concat([t,e],t.length+this.degree),n=s.mod(r,this.genPoly),o=this.degree-n.length;if(0<o){var i=new a(this.degree);return i.fill(0),n.copy(i,o),i}return n},e.exports=n},{"../utils/buffer":38,"./polynomial":28}],31:[function(t,e,r){var n="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",o="(?:(?![A-Z0-9 $%*+\\-./:]|"+(n=n.replace(/u/g,"\\u"))+").)+";r.KANJI=new RegExp(n,"g"),r.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),r.BYTE=new RegExp(o,"g"),r.NUMERIC=new RegExp("[0-9]+","g"),r.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");var i=new RegExp("^"+n+"$"),a=new RegExp("^[0-9]+$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");r.testKanji=function(t){return i.test(t)},r.testNumeric=function(t){return a.test(t)},r.testAlphanumeric=function(t){return s.test(t)}},{}],32:[function(t,e,a){var d=t("./mode"),o=t("./numeric-data"),i=t("./alphanumeric-data"),s=t("./byte-data"),u=t("./kanji-data"),f=t("./regex"),c=t("./utils"),l=t("dijkstrajs");function h(t){return unescape(encodeURIComponent(t)).length}function g(t,e,r){for(var n,o=[];null!==(n=t.exec(r));)o.push({data:n[0],index:n.index,mode:e,length:n[0].length});return o}function p(t){var e,r,n=g(f.NUMERIC,d.NUMERIC,t),o=g(f.ALPHANUMERIC,d.ALPHANUMERIC,t);return c.isKanjiModeEnabled()?(e=g(f.BYTE,d.BYTE,t),r=g(f.KANJI,d.KANJI,t)):(e=g(f.BYTE_KANJI,d.BYTE,t),r=[]),n.concat(o,e,r).sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function v(t,e){switch(e){case d.NUMERIC:return o.getBitsLength(t);case d.ALPHANUMERIC:return i.getBitsLength(t);case d.KANJI:return u.getBitsLength(t);case d.BYTE:return s.getBitsLength(t)}}function r(t,e){var r,n=d.getBestModeForData(t);if((r=d.from(e,n))!==d.BYTE&&r.bit<n.bit)throw new Error('"'+t+'" cannot be encoded with mode '+d.toString(r)+".\n Suggested mode is: "+d.toString(n));switch(r!==d.KANJI||c.isKanjiModeEnabled()||(r=d.BYTE),r){case d.NUMERIC:return new o(t);case d.ALPHANUMERIC:return new i(t);case d.KANJI:return new u(t);case d.BYTE:return new s(t)}}a.fromArray=function(t){return t.reduce(function(t,e){return"string"==typeof e?t.push(r(e,null)):e.data&&t.push(r(e.data,e.mode)),t},[])},a.fromString=function(t,e){for(var r=function(t,e){for(var r={},n={start:{}},o=["start"],i=0;i<t.length;i++){for(var a=t[i],s=[],u=0;u<a.length;u++){var f=a[u],c=""+i+u;s.push(c),r[c]={node:f,lastCount:0},n[c]={};for(var l=0;l<o.length;l++){var h=o[l];r[h]&&r[h].node.mode===f.mode?(n[h][c]=v(r[h].lastCount+f.length,f.mode)-v(r[h].lastCount,f.mode),r[h].lastCount+=f.length):(r[h]&&(r[h].lastCount=f.length),n[h][c]=v(f.length,f.mode)+4+d.getCharCountIndicator(f.mode,e))}}o=s}for(l=0;l<o.length;l++)n[o[l]].end=0;return{map:n,table:r}}(function(t){for(var e=[],r=0;r<t.length;r++){var n=t[r];switch(n.mode){case d.NUMERIC:e.push([n,{data:n.data,mode:d.ALPHANUMERIC,length:n.length},{data:n.data,mode:d.BYTE,length:n.length}]);break;case d.ALPHANUMERIC:e.push([n,{data:n.data,mode:d.BYTE,length:n.length}]);break;case d.KANJI:e.push([n,{data:n.data,mode:d.BYTE,length:h(n.data)}]);break;case d.BYTE:e.push([{data:n.data,mode:d.BYTE,length:h(n.data)}])}}return e}(p(t,c.isKanjiModeEnabled())),e),n=l.find_path(r.map,"start","end"),o=[],i=1;i<n.length-1;i++)o.push(r.table[n[i]].node);return a.fromArray(o.reduce(function(t,e){var r=0<=t.length-1?t[t.length-1]:null;return r&&r.mode===e.mode?t[t.length-1].data+=e.data:t.push(e),t},[]))},a.rawSplit=function(t){return a.fromArray(p(t,c.isKanjiModeEnabled()))}},{"./alphanumeric-data":15,"./byte-data":18,"./kanji-data":24,"./mode":26,"./numeric-data":27,"./regex":31,"./utils":33,dijkstrajs:10}],33:[function(t,e,r){var n,o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];r.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||40<t)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},r.getSymbolTotalCodewords=function(t){return o[t]},r.getBCHDigit=function(t){for(var e=0;0!==t;)e++,t>>>=1;return e},r.setToSJISFunction=function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');n=t},r.isKanjiModeEnabled=function(){return void 0!==n},r.toSJIS=function(t){return n(t)}},{}],34:[function(t,e,i){var a=t("./utils"),s=t("./error-correction-code"),o=t("./error-correction-level"),u=t("./mode"),f=t("isarray"),r=a.getBCHDigit(7973);function c(t,e){return u.getCharCountIndicator(t,e)+4}function l(t,r){var n=0;return t.forEach(function(t){var e=c(t.mode,r);n+=e+t.getBitsLength()}),n}i.isValid=function(t){return!isNaN(t)&&1<=t&&t<=40},i.from=function(t,e){return i.isValid(t)?parseInt(t,10):e},i.getCapacity=function(t,e,r){if(!i.isValid(t))throw new Error("Invalid QR Code version");void 0===r&&(r=u.BYTE);var n=8*(a.getSymbolTotalCodewords(t)-s.getTotalCodewordsCount(t,e));if(r===u.MIXED)return n;var o=n-c(r,t);switch(r){case u.NUMERIC:return Math.floor(o/10*3);case u.ALPHANUMERIC:return Math.floor(o/11*2);case u.KANJI:return Math.floor(o/13);case u.BYTE:default:return Math.floor(o/8)}},i.getBestVersionForData=function(t,e){var r,n=o.from(e,o.M);if(f(t)){if(1<t.length)return function(t,e){for(var r=1;r<=40;r++)if(l(t,r)<=i.getCapacity(r,e,u.MIXED))return r}(t,n);if(0===t.length)return 1;r=t[0]}else r=t;return function(t,e,r){for(var n=1;n<=40;n++)if(e<=i.getCapacity(n,r,t))return n}(r.mode,r.getLength(),n)},i.getEncodedBits=function(t){if(!i.isValid(t)||t<7)throw new Error("Invalid QR Code version");for(var e=t<<12;0<=a.getBCHDigit(e)-r;)e^=7973<<a.getBCHDigit(e)-r;return t<<12|e}},{"./error-correction-code":19,"./error-correction-level":20,"./mode":26,"./utils":33,isarray:12}],35:[function(t,e,s){var c=t("./utils");s.render=function(t,e,r){var n=r,o=e;void 0!==n||e&&e.getContext||(n=e,e=void 0),e||(o=function(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),n=c.getOptions(n);var i,a,s=c.getImageWidth(t.modules.size,n),u=o.getContext("2d"),f=u.createImageData(s,s);return c.qrToImageData(f.data,t,n),i=o,a=s,u.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=a,i.width=a,i.style.height=a+"px",i.style.width=a+"px",u.putImageData(f,0,0),o},s.renderToDataURL=function(t,e,r){var n=r;void 0!==n||e&&e.getContext||(n=e,e=void 0),n||(n={});var o=s.render(t,e,n),i=n.type||"image/png",a=n.rendererOpts||{};return o.toDataURL(i,a.quality)}},{"./utils":37}],36:[function(t,e,r){var l=t("./utils");function h(t,e){var r=t.a/255,n=e+'="'+t.hex+'"';return r<1?n+" "+e+'-opacity="'+r.toFixed(2).slice(1)+'"':n}function d(t,e,r){var n=t+e;return void 0!==r&&(n+=" "+r),n}r.render=function(t,e,r){var n=l.getOptions(e),o=t.modules.size,i=t.modules.data,a=o+2*n.margin,s=n.color.light.a?"<path "+h(n.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",u="<path "+h(n.color.dark,"stroke")+' d="'+function(t,e,r){for(var n="",o=0,i=!1,a=0,s=0;s<t.length;s++){var u=Math.floor(s%e),f=Math.floor(s/e);u||i||(i=!0),t[s]?(a++,0<s&&0<u&&t[s-1]||(n+=i?d("M",u+r,.5+f+r):d("m",o,0),o=0,i=!1),u+1<e&&t[s+1]||(n+=d("h",a),a=0)):o++}return n}(i,o,n.margin)+'"/>',f='viewBox="0 0 '+a+" "+a+'"',c='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+f+">"+s+u+"</svg>";return"function"==typeof r&&r(null,c),c}},{"./utils":37}],37:[function(t,e,d){function o(t){if("string"!=typeof t)throw new Error("Color should be defined as hex string");var e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||8<e.length)throw new Error("Invalid hex color: "+t);3!==e.length&&4!==e.length||(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push("F","F");var r=parseInt(e.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:255&r,hex:"#"+e.slice(0,6).join("")}}d.getOptions=function(t){t||(t={}),t.color||(t.color={});var e=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,r=t.width&&21<=t.width?t.width:void 0,n=t.scale||4;return{width:r,scale:r?4:n,margin:e,color:{dark:o(t.color.dark||"#000000ff"),light:o(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},d.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},d.getImageWidth=function(t,e){var r=d.getScale(t,e);return Math.floor((t+2*e.margin)*r)},d.qrToImageData=function(t,e,r){for(var n=e.modules.size,o=e.modules.data,i=d.getScale(n,r),a=Math.floor((n+2*r.margin)*i),s=r.margin*i,u=[r.color.light,r.color.dark],f=0;f<a;f++)for(var c=0;c<a;c++){var l=4*(f*a+c),h=r.color.light;if(s<=f&&s<=c&&f<a-s&&c<a-s)h=u[o[Math.floor((f-s)/i)*n+Math.floor((c-s)/i)]?1:0];t[l++]=h.r,t[l++]=h.g,t[l++]=h.b,t[l]=h.a}}},{}],38:[function(t,e,r){"use strict";var a=t("isarray");var n=(s.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}())?2147483647:1073741823;function s(t,e,r){return s.TYPED_ARRAY_SUPPORT||this instanceof s?"number"==typeof t?f(this,t):function(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');if("undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer)return function(t,e,r,n){if(r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");var o;o=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);s.TYPED_ARRAY_SUPPORT?o.__proto__=s.prototype:o=c(t,o);return o}(t,e,r,n);if("string"==typeof e)return function(t,e){var r=0|h(e),n=u(t,r),o=n.write(e);o!==r&&(n=n.slice(0,o));return n}(t,e);return function(t,e){if(s.isBuffer(e)){var r=0|i(e.length),n=u(t,r);return 0===n.length||e.copy(n,0,0,r),n}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(o=e.length)!=o?u(t,0):c(t,e);if("Buffer"===e.type&&Array.isArray(e.data))return c(t,e.data)}var o;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}(this,t,e,r):new s(t,e,r)}function i(t){if(n<=t)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n.toString(16)+" bytes");return 0|t}function u(t,e){var r;return s.TYPED_ARRAY_SUPPORT?(r=new Uint8Array(e)).__proto__=s.prototype:(null===(r=t)&&(r=new s(e)),r.length=e),r}function f(t,e){var r=u(t,e<0?0:0|i(e));if(!s.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)r[n]=0;return r}function c(t,e){for(var r=e.length<0?0:0|i(e.length),n=u(t,r),o=0;o<r;o+=1)n[o]=255&e[o];return n}function l(t,e){var r;e=e||1/0;for(var n=t.length,o=null,i=[],a=0;a<n;++a){if(55295<(r=t.charCodeAt(a))&&r<57344){if(!o){if(56319<r){-1<(e-=3)&&i.push(239,191,189);continue}if(a+1===n){-1<(e-=3)&&i.push(239,191,189);continue}o=r;continue}if(r<56320){-1<(e-=3)&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320)}else o&&-1<(e-=3)&&i.push(239,191,189);if(o=null,r<128){if((e-=1)<0)break;i.push(r)}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function h(t){return s.isBuffer(t)?t.length:"undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)?t.byteLength:("string"!=typeof t&&(t=""+t),0===t.length?0:l(t).length)}s.TYPED_ARRAY_SUPPORT&&(s.prototype.__proto__=Uint8Array.prototype,s.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&s[Symbol.species]===s&&Object.defineProperty(s,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1})),s.prototype.write=function(t,e,r){void 0===e?(r=this.length,e=0):void 0===r&&"string"==typeof e?(r=this.length,e=0):isFinite(e)&&(e|=0,isFinite(r)?r|=0:r=void 0);var n,o,i,a=this.length-e;if((void 0===r||a<r)&&(r=a),0<t.length&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");return o=e,i=r,function(t,e,r,n){for(var o=0;o<n&&!(o+r>=e.length||o>=t.length);++o)e[o+r]=t[o];return o}(l(t,(n=this).length-o),n,o,i)},s.prototype.slice=function(t,e){var r,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):n<t&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):n<e&&(e=n),e<t&&(e=t),s.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=s.prototype;else{var o=e-t;r=new s(o,void 0);for(var i=0;i<o;++i)r[i]=this[i+t]}return r},s.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),0<n&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var o,i=n-r;if(this===t&&r<e&&e<n)for(o=i-1;0<=o;--o)t[o+e]=this[o+r];else if(i<1e3||!s.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+e]=this[o+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+i),e);return i},s.prototype.fill=function(t,e,r){if("string"==typeof t){if("string"==typeof e?(e=0,r=this.length):"string"==typeof r&&(r=this.length),1===t.length){var n=t.charCodeAt(0);n<256&&(t=n)}}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var i=s.isBuffer(t)?t:new s(t),a=i.length;for(o=0;o<r-e;++o)this[o+e]=i[o%a]}return this},s.concat=function(t,e){if(!a(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u(null,0);var r;if(void 0===e)for(r=e=0;r<t.length;++r)e+=t[r].length;var n=f(null,e),o=0;for(r=0;r<t.length;++r){var i=t[r];if(!s.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,o),o+=i.length}return n},s.byteLength=h,s.prototype._isBuffer=!0,s.isBuffer=function(t){return!(null==t||!t._isBuffer)},e.exports=s},{isarray:12}],39:[function(t,e,r){(function(t){"use strict";e.exports="object"==typeof self&&self.self===self&&self||"object"==typeof t&&t.global===t&&t||this}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],nebpay:[function(t,e,r){"use strict";var s=t("extend"),n=t("./libs/http"),o=t("./libs/config"),i=t("./libs/pay"),u=t("bignumber.js"),a="NAS",f=function(t,e){this._pay=new i(t,e)};f.config=o;var c={goods:{name:"",desc:"",orderId:"",ext:""},qrcode:{showQRCode:!0,completeTip:void 0,cancelTip:void 0,container:void 0},extension:{openExtension:!0},mobile:{showInstallTip:!0,installTip:void 0},callback:void 0,listener:void 0,nrc20:void 0,debug:!1};f.prototype={pay:function(t,e,r){return r=s(c,r),this._pay.submit(a,t,e,{type:"binary"},r)},nrc20pay:function(t,e,r,n){n.nrc20&&0<n.nrc20.decimals&&(r=new u(r=r||"0").times(new u(10).pow(n.nrc20.decimals)).toString(10));var o="";n.nrc20&&n.nrc20.address&&(o=n.nrc20.address);var i=[e,r],a={type:"call",function:"transfer",args:JSON.stringify(i)};return n=s(c,n),this._pay.submit(t,o,"0",a,n)},deploy:function(t,e,r,n){var o={type:"deploy",source:t,sourceType:e,args:r};return n=s(c,n),this._pay.submit(a,"","0",o,n)},call:function(t,e,r,n,o){var i={type:"call",function:r,args:n};return o=s(c,o),this._pay.submit(a,t,e,i,o)},simulateCall:function(t,e,r,n,o){var i={type:"simulateCall",function:r,args:n};return o=s(c,o),this._pay.submit(a,t,e,i,o)},queryPayInfo:function(t,e){var r=(e=s(c,e)).callback||o.payUrl(e.debug);return r=r+"/query?payId="+t,n.get(r)}},e.exports=f},{"./libs/config":3,"./libs/http":5,"./libs/pay":6,"bignumber.js":8,extend:11}]},{},[]);

var SNAKE = SNAKE || {};

SNAKE.addEventListener = (function() {
    if (window.addEventListener) {
        return function(obj, event, funct, evtCapturing) {
            obj.addEventListener(event, funct, evtCapturing);
        };
    } else if (window.attachEvent) {
        return function(obj, event, funct) {
            obj.attachEvent("on" + event, funct);
        };
    }
})();

SNAKE.removeEventListener = (function() {
    if (window.removeEventListener) {
        return function(obj, event, funct, evtCapturing) {
            obj.removeEventListener(event, funct, evtCapturing);
        };
    } else if (window.detachEvent) {
        return function(obj, event, funct) {
            obj.detachEvent("on" + event, funct);
        };
    }
})();

SNAKE.Snake = SNAKE.Snake || (function() {
    
    var instanceNumber = 0;
    var blockPool = [];
    
    var SnakeBlock = function() {
        this.elm = null;
        this.elmStyle = null;
        this.row = -1;
        this.col = -1;
        this.xPos = -1000;
        this.yPos = -1000;
        this.next = null;
        this.prev = null;
    };
    
    function getNextHighestZIndex(myObj) {
        var highestIndex = 0,
            currentIndex = 0,
            ii;
        for (ii in myObj) {
            if (myObj[ii].elm.currentStyle){  
                currentIndex = parseFloat(myObj[ii].elm.style["z-index"],10);
            }else if(window.getComputedStyle) {
                currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm,null).getPropertyValue("z-index"),10);  
            }
            if(!isNaN(currentIndex) && currentIndex > highestIndex){
                highestIndex = currentIndex;
            }
        }
        return(highestIndex+1);  
    }
    
    return function(config) {
    
        if (!config||!config.playingBoard) {return;}
    
        // ----- private variables -----

        var me = this,
            playingBoard = config.playingBoard,
            myId = instanceNumber++,
            growthIncr = 5,
            moveQueue = [], // a queue that holds the next moves of the snake
            currentDirection = 1, // 0: up, 1: left, 2: down, 3: right
            columnShift = [0, 1, 0, -1],
            rowShift = [-1, 0, 1, 0],
            xPosShift = [],
            yPosShift = [],
            snakeSpeed = 75,
            isDead = false,
            isPaused = false;
        function getMode (mode, speed) {
    document.getElementById(mode).addEventListener('click', function () { snakeSpeed = speed; });
}
            getMode('Easy', 100);
            getMode('Medium', 75);
            getMode('Difficult', 50);
        // ----- public variables -----
        me.snakeBody = {};
        me.snakeBody["b0"] = new SnakeBlock(); // create snake head
        me.snakeBody["b0"].row = config.startRow || 1;
        me.snakeBody["b0"].col = config.startCol || 1;
        me.snakeBody["b0"].xPos = me.snakeBody["b0"].row * playingBoard.getBlockWidth();
        me.snakeBody["b0"].yPos = me.snakeBody["b0"].col * playingBoard.getBlockHeight();
        me.snakeBody["b0"].elm = createSnakeElement();
        me.snakeBody["b0"].elmStyle = me.snakeBody["b0"].elm.style;
        playingBoard.getBoardContainer().appendChild( me.snakeBody["b0"].elm );
        me.snakeBody["b0"].elm.style.left = me.snakeBody["b0"].xPos + "px";
        me.snakeBody["b0"].elm.style.top = me.snakeBody["b0"].yPos + "px";
        me.snakeBody["b0"].next = me.snakeBody["b0"];
        me.snakeBody["b0"].prev = me.snakeBody["b0"];
        
        me.snakeLength = 1;
        me.snakeHead = me.snakeBody["b0"];
        me.snakeTail = me.snakeBody["b0"];
        me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'');
        me.snakeHead.elm.className += " snake-snakebody-alive";
        
        // ----- private methods -----
        
        function createSnakeElement() {
            var tempNode = document.createElement("div");
            tempNode.className = "snake-snakebody-block";
            tempNode.style.left = "-1000px";
            tempNode.style.top = "-1000px";
            tempNode.style.width = playingBoard.getBlockWidth() + "px";
            tempNode.style.height = playingBoard.getBlockHeight() + "px";
            return tempNode;
        }
        
        function createBlocks(num) {
            var tempBlock;
            var tempNode = createSnakeElement();

            for (var ii = 1; ii < num; ii++){
                tempBlock = new SnakeBlock();
                tempBlock.elm = tempNode.cloneNode(true);
                tempBlock.elmStyle = tempBlock.elm.style;
                playingBoard.getBoardContainer().appendChild( tempBlock.elm );
                blockPool[blockPool.length] = tempBlock;
            }
            
            tempBlock = new SnakeBlock();
            tempBlock.elm = tempNode;
            playingBoard.getBoardContainer().appendChild( tempBlock.elm );
            blockPool[blockPool.length] = tempBlock;
        }
        
        me.setPaused = function(val) {
            isPaused = val;
        };
        me.getPaused = function() {
            return isPaused;
        };
        
        /**
        * This method is called when a user presses a key. It logs arrow key presses in "moveQueue", which is used when the snake needs to make its next move.
        * @method handleArrowKeys
        * @param {Number} keyNum A number representing the key that was pressed.
        */
        /*
            Handles what happens when an arrow key is pressed. 
            Direction explained (0 = up, etc etc)
                    0
                  3   1
                    2
        */
        me.handleArrowKeys = function(keyNum) {
            if (isDead || isPaused) {return;}
            
            var snakeLength = me.snakeLength;
            var lastMove = moveQueue[0] || currentDirection;

            //console.log("lastmove="+lastMove);
            //console.log("dir="+keyNum);
            
            switch (keyNum) {
                case 37:
                case 65:
                    if ( lastMove !== 1 || snakeLength === 1 ) {
                        moveQueue.unshift(3); //SnakeDirection = 3;
                    }
                    break;    
                case 38:
                case 87:
                    if ( lastMove !== 2 || snakeLength === 1 ) {
                        moveQueue.unshift(0);//SnakeDirection = 0;
                    }
                    break;    
                case 39:
                case 68:
                    if ( lastMove !== 3 || snakeLength === 1 ) {
                        moveQueue.unshift(1); //SnakeDirection = 1;
                    }
                    break;    
                case 40:
                case 83:
                    if ( lastMove !== 0 || snakeLength === 1 ) {
                        moveQueue.unshift(2);//SnakeDirection = 2;
                    }
                    break;  
            }
        };
        
        me.go = function() {
        
            var oldHead = me.snakeHead,
                newHead = me.snakeTail,
                myDirection = currentDirection,
                grid = playingBoard.grid; // cache grid for quicker lookup
        
            if (isPaused === true) {
                setTimeout(function(){me.go();}, snakeSpeed);
                return;
            }
        
            me.snakeTail = newHead.prev;
            me.snakeHead = newHead;
        
            // clear the old board position
            if ( grid[newHead.row] && grid[newHead.row][newHead.col] ) {
                grid[newHead.row][newHead.col] = 0;
            }
        
            if (moveQueue.length){
                myDirection = currentDirection = moveQueue.pop();
            }
        
            newHead.col = oldHead.col + columnShift[myDirection];
            newHead.row = oldHead.row + rowShift[myDirection];
            newHead.xPos = oldHead.xPos + xPosShift[myDirection];
            newHead.yPos = oldHead.yPos + yPosShift[myDirection];
            
            if ( !newHead.elmStyle ) {
                newHead.elmStyle = newHead.elm.style;
            }
            
            newHead.elmStyle.left = newHead.xPos + "px";
            newHead.elmStyle.top = newHead.yPos + "px";

            // check the new spot the snake moved into

            if (grid[newHead.row][newHead.col] === 0) {
                grid[newHead.row][newHead.col] = 1;
                setTimeout(function(){me.go();}, snakeSpeed);
            } else if (grid[newHead.row][newHead.col] > 0) {
                me.handleDeath();
            } else if (grid[newHead.row][newHead.col] === playingBoard.getGridFoodValue()) {
                grid[newHead.row][newHead.col] = 1;
                me.eatFood();
                setTimeout(function(){me.go();}, snakeSpeed);
            }
        };
        
        me.eatFood = function() {
            if (blockPool.length <= growthIncr) {
                createBlocks(growthIncr*2);
            }
            var blocks = blockPool.splice(0, growthIncr);
            
            var ii = blocks.length,
                index,
                prevNode = me.snakeTail;
            while (ii--) {
                index = "b" + me.snakeLength++;
                me.snakeBody[index] = blocks[ii];
                me.snakeBody[index].prev = prevNode;
                me.snakeBody[index].elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'')
                me.snakeBody[index].elm.className += " snake-snakebody-alive";
                prevNode.next = me.snakeBody[index];
                prevNode = me.snakeBody[index];
            }
            me.snakeTail = me.snakeBody[index];
            me.snakeTail.next = me.snakeHead;
            me.snakeHead.prev = me.snakeTail;

            playingBoard.foodEaten();
        };
        
        function submitHighScore() {
        var NebPay = require("nebpay");
        var nebPay = new NebPay();
        var serialNumber; //transaction serial number
        var intervalQuery; //periodically query tx results
    //Set a periodically query
      intervalQuery = setInterval(function() {
          funcIntervalQuery(1000);}, 1000);
            
//SMART CONTRCT ADDRESS GOES HERE \/\/\/\/\/\/\/\/
            
      var to = "contractAddress";
      var value = localStorage.jsSnakeHighScore;
      var enableDebug = true
      var callFunction = "save"; //the function name to be called
      var callArgs =  "[\"" + value +"\"]";  //the parameter, it's format JSON string of parameter arrays, such as'["arg"]','["arg1","arg2]'
      var options = {
          goods: {        //commodity description
              name: "example"
          },
          callback: NebPay.config.testnetUrl
      }
      //Send transaction (here is smart contract call)
      serialNumber = nebPay.call(to, amount, callFunction, callArgs, options);
      }
        
//IMPORTANT CONTRACT STUFFF ^^^^^^^^^^^^^^^^
        
        me.handleDeath = function() {
            function recordScore () {
                var highScore = localStorage.jsSnakeHighScore;
                if (highScore == undefined) localStorage.setItem('jsSnakeHighScore', me.snakeLength);
                if (me.snakeLength > highScore) {
                    alert('Congratulations! You have beaten your previous high score, which was ' + highScore + '.');
                        localStorage.setItem('jsSnakeHighScore', me.snakeLength);
                        submitHighScore();
                }
}
            recordScore();
            me.snakeHead.elm.style.zIndex = getNextHighestZIndex(me.snakeBody);
            me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-alive\b/,'')
            me.snakeHead.elm.className += " snake-snakebody-dead";

            isDead = true;
            playingBoard.handleDeath();
            moveQueue.length = 0;
        };
        
        me.rebirth = function() {
            isDead = false;
        };

        me.reset = function() {
            if (isDead === false) {return;}
            
            var blocks = [],
                curNode = me.snakeHead.next,
                nextNode;
            while (curNode !== me.snakeHead) {
                nextNode = curNode.next;
                curNode.prev = null;
                curNode.next = null;
                blocks.push(curNode);
                curNode = nextNode;
            }
            me.snakeHead.next = me.snakeHead;
            me.snakeHead.prev = me.snakeHead;
            me.snakeTail = me.snakeHead;
            me.snakeLength = 1;
            
            for (var ii = 0; ii < blocks.length; ii++) {
                blocks[ii].elm.style.left = "-1000px";
                blocks[ii].elm.style.top = "-1000px";
                blocks[ii].elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'')
                blocks[ii].elm.className += " snake-snakebody-alive";
            }
            
            blockPool.concat(blocks);
            me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'')
            me.snakeHead.elm.className += " snake-snakebody-alive";
            me.snakeHead.row = config.startRow || 1;
            me.snakeHead.col = config.startCol || 1;
            me.snakeHead.xPos = me.snakeHead.row * playingBoard.getBlockWidth();
            me.snakeHead.yPos = me.snakeHead.col * playingBoard.getBlockHeight();
            me.snakeHead.elm.style.left = me.snakeHead.xPos + "px";
            me.snakeHead.elm.style.top = me.snakeHead.yPos + "px";
        };
  
        createBlocks(growthIncr*2);
        xPosShift[0] = 0;
        xPosShift[1] = playingBoard.getBlockWidth();
        xPosShift[2] = 0;
        xPosShift[3] = -1 * playingBoard.getBlockWidth();
        
        yPosShift[0] = -1 * playingBoard.getBlockHeight();
        yPosShift[1] = 0;
        yPosShift[2] = playingBoard.getBlockHeight();
        yPosShift[3] = 0;
    };
})();

SNAKE.Food = SNAKE.Food || (function() {
    
    var instanceNumber = 0;
    
    function getRandomPosition(x, y){
        return Math.floor(Math.random()*(y+1-x)) + x; 
    }
    
    return function(config) {
        
        if (!config||!config.playingBoard) {return;}

        // ----- private variables -----

        var me = this;
        var playingBoard = config.playingBoard;
        var fRow, fColumn;
        var myId = instanceNumber++;

        var elmFood = document.createElement("div");
        elmFood.setAttribute("id", "snake-food-"+myId);
        elmFood.className = "snake-food-block";
        elmFood.style.width = playingBoard.getBlockWidth() + "px";
        elmFood.style.height = playingBoard.getBlockHeight() + "px";
        elmFood.style.left = "-1000px";
        elmFood.style.top = "-1000px";
        playingBoard.getBoardContainer().appendChild(elmFood);
        
        // ----- public methods -----
              
        me.getFoodElement = function() {
            return elmFood;  
        };
        
        me.randomlyPlaceFood = function() {
            if (playingBoard.grid[fRow] && playingBoard.grid[fRow][fColumn] === playingBoard.getGridFoodValue()){
                playingBoard.grid[fRow][fColumn] = 0; 
            }

            var row = 0, col = 0, numTries = 0;

            var maxRows = playingBoard.grid.length-1;
            var maxCols = playingBoard.grid[0].length-1;
            
            while (playingBoard.grid[row][col] !== 0){
                row = getRandomPosition(1, maxRows);
                col = getRandomPosition(1, maxCols);
                numTries++;
                if (numTries > 20000){
                    row = -1;
                    col = -1;
                    break; 
                } 
            }

            playingBoard.grid[row][col] = playingBoard.getGridFoodValue();
            fRow = row;
            fColumn = col;
            elmFood.style.top = row * playingBoard.getBlockHeight() + "px";
            elmFood.style.left = col * playingBoard.getBlockWidth() + "px";
        };
    };
})();

SNAKE.Board = SNAKE.Board || (function() {

    var instanceNumber = 0;
    function getNextHighestZIndex(myObj) {
        var highestIndex = 0,
            currentIndex = 0,
            ii;
        for (ii in myObj) {
            if (myObj[ii].elm.currentStyle){  
                currentIndex = parseFloat(myObj[ii].elm.style["z-index"],10);
            }else if(window.getComputedStyle) {
                currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm,null).getPropertyValue("z-index"),10);  
            }
            if(!isNaN(currentIndex) && currentIndex > highestIndex){
                highestIndex = currentIndex;
            }
        }
        return(highestIndex+1);  
    }

    function getClientWidth(){
        var myWidth = 0;
        if( typeof window.innerWidth === "number" ) {
            myWidth = window.innerWidth;//Non-IE
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;//IE 6+ in 'standards compliant mode'
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;//IE 4 compatible
        } 
        return myWidth;
    }

    function getClientHeight(){
        var myHeight = 0;
        if( typeof window.innerHeight === "number" ) {
            myHeight = window.innerHeight;//Non-IE
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            myHeight = document.documentElement.clientHeight;//IE 6+ in 'standards compliant mode'
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myHeight = document.body.clientHeight;//IE 4 compatible
        } 
        return myHeight;
    }
    
    return function(inputConfig) {
    
        // --- private variables ---
        var me = this,
            myId = instanceNumber++,
            config = inputConfig || {},
            MAX_BOARD_COLS = 250,
            MAX_BOARD_ROWS = 250,
            blockWidth = 20,
            blockHeight = 20,
            GRID_FOOD_VALUE = -1, // the value of a spot on the board that represents snake food, MUST BE NEGATIVE
            myFood,
            mySnake,
            boardState = 1, // 0: in active; 1: awaiting game start; 2: playing game
            myKeyListener,
            isPaused = false,//note: both the board and the snake can be paused
            // Board components
            elmContainer, elmPlayingField, elmAboutPanel, elmLengthPanel, elmWelcome, elmTryAgain, elmPauseScreen;
        
        // --- public variables ---
        me.grid = [];
        
        function createBoardElements() {
            elmPlayingField = document.createElement("div");
            elmPlayingField.setAttribute("id", "playingField");
            elmPlayingField.className = "snake-playing-field";
            
            SNAKE.addEventListener(elmPlayingField, "click", function() {
                elmContainer.focus();
            }, false);
            
            elmPauseScreen = document.createElement("div");
            elmPauseScreen.className = "snake-pause-screen";
            elmPauseScreen.innerHTML = "<div style='padding:10px;'>[Paused]<p/>Press [space] to unpause.</div>";
            
            elmAboutPanel = document.createElement("div");
            
            elmLengthPanel = document.createElement("div");
            elmLengthPanel.className = "snake-panel-component";
            
            elmWelcome = createWelcomeElement();
            elmTryAgain = createTryAgainElement();
            
            SNAKE.addEventListener( elmContainer, "keyup", function(evt) {
                if (!evt) var evt = window.event;
                evt.cancelBubble = true;
                if (evt.stopPropagation) {evt.stopPropagation();}
                if (evt.preventDefault) {evt.preventDefault();}
                return false;
            }, false);
            
            elmContainer.className = "snake-game-container";
            
            elmPauseScreen.style.zIndex = 10000;
            elmContainer.appendChild(elmPauseScreen);
            elmContainer.appendChild(elmPlayingField);
            elmContainer.appendChild(elmAboutPanel);
            elmContainer.appendChild(elmLengthPanel);
            elmContainer.appendChild(elmWelcome);
            elmContainer.appendChild(elmTryAgain);
            
            mySnake = new SNAKE.Snake({playingBoard:me,startRow:2,startCol:2});
            myFood = new SNAKE.Food({playingBoard: me});
            
            elmWelcome.style.zIndex = 1000;
        }
        function maxBoardWidth() {
            return MAX_BOARD_COLS * me.getBlockWidth();   
        }
        function maxBoardHeight() {
            return MAX_BOARD_ROWS * me.getBlockHeight();
        }
        
        function createWelcomeElement() {
             var tmpElm = document.createElement("div");
            tmpElm.id = "sbWelcome" + myId;
            tmpElm.className = "snake-welcome-dialog";
            
            var welcomeTxt = document.createElement("div");
            var fullScreenText = "";
            if (config.fullScreen) {
                fullScreenText = "On Windows, press F11 to play in Full Screen mode.";   
            }
            welcomeTxt.innerHTML = "Nebulas Snake<p></p>Use the <strong>arrow keys</strong> on your keyboard to play the game. " + fullScreenText + "<p></p>";
            var welcomeStart = document.createElement("button");
            welcomeStart.appendChild(document.createTextNode("Play Game"));
            var loadGame = function() {
                SNAKE.removeEventListener(window, "keyup", kbShortcut, false);
                tmpElm.style.display = "none";
                me.setBoardState(1);
                me.getBoardContainer().focus();
            };
            
            var kbShortcut = function(evt) {
                if (!evt) var evt = window.event;
                var keyNum = (evt.which) ? evt.which : evt.keyCode;
                if (keyNum === 32 || keyNum === 13) {
                    loadGame();
                }
            };
            SNAKE.addEventListener(window, "keyup", kbShortcut, false);
            SNAKE.addEventListener(welcomeStart, "click", loadGame, false);
            
            tmpElm.appendChild(welcomeTxt);
            tmpElm.appendChild(welcomeStart);
            return tmpElm;
        }
        
        function createTryAgainElement() {
            var tmpElm = document.createElement("div");
            tmpElm.id = "sbTryAgain" + myId;
            tmpElm.className = "snake-try-again-dialog";
            
            var tryAgainTxt = document.createElement("div");
            tryAgainTxt.innerHTML = "Nebulas Snake<p></p>You died :(<p></p>";
            var tryAgainStart = document.createElement("button");
            tryAgainStart.appendChild( document.createTextNode("Play Again?"));
            
            var reloadGame = function() {
                tmpElm.style.display = "none";
                me.resetBoard();
                me.setBoardState(1);
                me.getBoardContainer().focus();
            };
            
            var kbTryAgainShortcut = function(evt) {
                if (boardState !== 0 || tmpElm.style.display !== "block") {return;}
                if (!evt) var evt = window.event;
                var keyNum = (evt.which) ? evt.which : evt.keyCode;
                if (keyNum === 32 || keyNum === 13) {
                    reloadGame();
                }
            };
            SNAKE.addEventListener(window, "keyup", kbTryAgainShortcut, true);
            
            SNAKE.addEventListener(tryAgainStart, "click", reloadGame, false);
            tmpElm.appendChild(tryAgainTxt);
            tmpElm.appendChild(tryAgainStart);
            return tmpElm;
        }

        me.setPaused = function(val) {
            isPaused = val;
            mySnake.setPaused(val);
            if (isPaused) {
                elmPauseScreen.style.display = "block";
            } else {
                elmPauseScreen.style.display = "none";
            }
        };
        me.getPaused = function() {
            return isPaused;
        };
        
        /**
        * Resets the playing board for a new game.
        * @method resetBoard
        */   
        me.resetBoard = function() {
            SNAKE.removeEventListener(elmContainer, "keydown", myKeyListener, false);
            mySnake.reset();
            elmLengthPanel.innerHTML = "Length: 1";
            me.setupPlayingField();
        };

        me.getBoardState = function() {
            return boardState;
        };
 
        me.setBoardState = function(state) {
            boardState = state;
        };

        me.getGridFoodValue = function() {
            return GRID_FOOD_VALUE;
        };
        /**
        * @method getPlayingFieldElement
        * @return {DOM Element} The div representing the playing field (this is where the snake can move).
        */ 
        me.getPlayingFieldElement = function() {
            return elmPlayingField;
        };
        /**
        * @method setBoardContainer
        * @param {DOM Element or String} myContainer Sets the container element for the game.
        */ 
        me.setBoardContainer = function(myContainer) {
            if (typeof myContainer === "string") {
                myContainer = document.getElementById(myContainer);   
            }
            if (myContainer === elmContainer) {return;}
            elmContainer = myContainer;
            elmPlayingField = null;
            
            me.setupPlayingField();
        };
        /**
        * @method getBoardContainer
        * @return {DOM Element}
        */ 
        me.getBoardContainer = function() {
            return elmContainer;
        };
        /**
        * @method getBlockWidth
        * @return {Number}
        */ 
        me.getBlockWidth = function() {
            return blockWidth;  
        };
        /**
        * @method getBlockHeight
        * @return {Number}
        */ 
        me.getBlockHeight = function() {
            return blockHeight;  
        };
        /**
        * Sets up the playing field.
        * @method setupPlayingField
        */ 
        me.setupPlayingField = function () {
            
            if (!elmPlayingField) {createBoardElements();} // create playing field
            
            // calculate width of our game container
            var cWidth, cHeight;
            if (config.fullScreen === true) {
                cTop = 0;
                cLeft = 0;
                cWidth = getClientWidth()-5;
                cHeight = getClientHeight()-5;
                document.body.style.backgroundColor = "#FC5454";
            } else {
                cTop = config.top;
                cLeft = config.left;
                cWidth = config.width;
                cHeight = config.height;
            }
            
            // define the dimensions of the board and playing field
            var wEdgeSpace = me.getBlockWidth()*2 + (cWidth % me.getBlockWidth());
            var fWidth = Math.min(maxBoardWidth()-wEdgeSpace,cWidth-wEdgeSpace);
            var hEdgeSpace = me.getBlockHeight()*3 + (cHeight % me.getBlockHeight());
            var fHeight = Math.min(maxBoardHeight()-hEdgeSpace,cHeight-hEdgeSpace);
            
            elmContainer.style.left = cLeft + "px";
            elmContainer.style.top = cTop + "px";
            elmContainer.style.width = cWidth + "px";
            elmContainer.style.height = cHeight + "px";
            elmPlayingField.style.left = me.getBlockWidth() + "px";
            elmPlayingField.style.top  = me.getBlockHeight() + "px";
            elmPlayingField.style.width = fWidth + "px";
            elmPlayingField.style.height = fHeight + "px";
            
            // the math for this will need to change depending on font size, padding, etc
            // assuming height of 14 (font size) + 8 (padding)
            var bottomPanelHeight = hEdgeSpace - me.getBlockHeight();
            var pLabelTop = me.getBlockHeight() + fHeight + Math.round((bottomPanelHeight - 30)/2) + "px";
            
            elmAboutPanel.style.top = pLabelTop;
            elmAboutPanel.style.width = "450px";
            elmAboutPanel.style.left = Math.round(cWidth/2) - Math.round(450/2) + "px";
            
            elmLengthPanel.style.top = pLabelTop;
            elmLengthPanel.style.left = cWidth - 120 + "px";
            
            // if width is too narrow, hide the about panel
            if (cWidth < 700) {
                elmAboutPanel.style.display = "none";
            } else {
                elmAboutPanel.style.display = "block";
            }
            
            me.grid = [];
            var numBoardCols = fWidth / me.getBlockWidth() + 2;
            var numBoardRows = fHeight / me.getBlockHeight() + 2;
            
            for (var row = 0; row < numBoardRows; row++) {
                me.grid[row] = [];
                for (var col = 0; col < numBoardCols; col++) {
                    if (col === 0 || row === 0 || col === (numBoardCols-1) || row === (numBoardRows-1)) {
                        me.grid[row][col] = 1; // an edge
                    } else {
                        me.grid[row][col] = 0; // empty space
                    }
                }
            }
            
            myFood.randomlyPlaceFood();
            
            // setup event listeners
            function getMode (mode, speed) {
    document.getElementById(mode).addEventListener('click', function () { snakeSpeed = speed; });
}
            getMode('Easy', 100);
            getMode('Medium', 75);
            getMode('Difficult', 50);
            myKeyListener = function(evt) {
                if (!evt) var evt = window.event;
                var keyNum = (evt.which) ? evt.which : evt.keyCode;

                if (me.getBoardState() === 1) {
                    if ( !(keyNum >= 37 && keyNum <= 40) && !(keyNum === 87 || keyNum === 65 || keyNum === 83 || keyNum === 68)) {return;} // if not an arrow key, leave
                    
                    // This removes the listener added at the #listenerX line
                    SNAKE.removeEventListener(elmContainer, "keydown", myKeyListener, false);
                    
                    myKeyListener = function(evt) {
                        if (!evt) var evt = window.event;
                        var keyNum = (evt.which) ? evt.which : evt.keyCode;
                        
                        //console.log(keyNum);
                        if (keyNum === 32) {
							if(me.getBoardState()!=0)
                                me.setPaused(!me.getPaused());
                        }
                        
                        mySnake.handleArrowKeys(keyNum);
                        
                        evt.cancelBubble = true;
                        if (evt.stopPropagation) {evt.stopPropagation();}
                        if (evt.preventDefault) {evt.preventDefault();}
                        return false;
                    };
                    SNAKE.addEventListener( elmContainer, "keydown", myKeyListener, false);
                    
                    mySnake.rebirth();
                    mySnake.handleArrowKeys(keyNum);
                    me.setBoardState(2); // start the game!
                    mySnake.go();
                }
                
                evt.cancelBubble = true;
                if (evt.stopPropagation) {evt.stopPropagation();}
                if (evt.preventDefault) {evt.preventDefault();}
                return false;
            };
            
            // Search for #listenerX to see where this is removed
            SNAKE.addEventListener( elmContainer, "keydown", myKeyListener, false);
        };
        
        /**
        * This method is called when the snake has eaten some food.
        * @method foodEaten
        */ 
        me.foodEaten = function() {
            elmLengthPanel.innerHTML = "Length: " + mySnake.snakeLength;
            myFood.randomlyPlaceFood();
        };
        
        /**
        * This method is called when the snake dies.
        * @method handleDeath
        */ 
        me.handleDeath = function() {
            var index = Math.max(getNextHighestZIndex( mySnake.snakeBody), getNextHighestZIndex( {tmp:{elm:myFood.getFoodElement()}} ));
            elmContainer.removeChild(elmTryAgain);
            elmContainer.appendChild(elmTryAgain);
            elmTryAgain.style.zIndex = index;
            elmTryAgain.style.display = "block";
            me.setBoardState(0);
        };

        config.fullScreen = (typeof config.fullScreen === "undefined") ? false : config.fullScreen;        
        config.top = (typeof config.top === "undefined") ? 0 : config.top;
        config.left = (typeof config.left === "undefined") ? 0 : config.left;
        config.width = (typeof config.width === "undefined") ? 400 : config.width;        
        config.height = (typeof config.height === "undefined") ? 400 : config.height;
        
        if (config.fullScreen) {
            SNAKE.addEventListener(window,"resize", function() {
                me.setupPlayingField();
            }, false);
        }
        
        me.setBoardState(0);
        
        if (config.boardContainer) {
            me.setBoardContainer(config.boardContainer);
        }
        
    }; // end return function
})();
    
function getHighScore () {
    document.getElementById('high-score').addEventListener('click', function () {
        if (localStorage.jsSnakeHighScore == undefined) alert('You have not played this game yet!');
        else
            alert('Your current high score is ' + localStorage.jsSnakeHighScore + '.'); });
}
getHighScore();