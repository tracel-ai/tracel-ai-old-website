import{c as Re,o as ot,a as qe,r as lt,b as ct,d as We,e as I,m as Ge,s as ut,u as _e,D as ft,f as dt,h as ht,g as D,t as B,F as oe,i as gt,j as le,k as L}from"./entry-client-d18c051e.js";import{c as Se}from"./_commonjsHelpers-edff4021.js";import{L as pt}from"./page-6b1e0867.js";var ge={},mt={get exports(){return ge},set exports(e){ge=e}};(function(e){var t=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var n=function(r){var u=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,p={},o={manual:r.Prism&&r.Prism.manual,disableWorkerMessageHandler:r.Prism&&r.Prism.disableWorkerMessageHandler,util:{encode:function a(i){return i instanceof b?new b(i.type,a(i.content),i.alias):Array.isArray(i)?i.map(a):i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).slice(8,-1)},objId:function(a){return a.__id||Object.defineProperty(a,"__id",{value:++d}),a.__id},clone:function a(i,s){s=s||{};var l,c;switch(o.util.type(i)){case"Object":if(c=o.util.objId(i),s[c])return s[c];l={},s[c]=l;for(var f in i)i.hasOwnProperty(f)&&(l[f]=a(i[f],s));return l;case"Array":return c=o.util.objId(i),s[c]?s[c]:(l=[],s[c]=l,i.forEach(function(h,g){l[g]=a(h,s)}),l);default:return i}},getLanguage:function(a){for(;a;){var i=u.exec(a.className);if(i)return i[1].toLowerCase();a=a.parentElement}return"none"},setLanguage:function(a,i){a.className=a.className.replace(RegExp(u,"gi"),""),a.classList.add("language-"+i)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(l){var a=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(l.stack)||[])[1];if(a){var i=document.getElementsByTagName("script");for(var s in i)if(i[s].src==a)return i[s]}return null}},isActive:function(a,i,s){for(var l="no-"+i;a;){var c=a.classList;if(c.contains(i))return!0;if(c.contains(l))return!1;a=a.parentElement}return!!s}},languages:{plain:p,plaintext:p,text:p,txt:p,extend:function(a,i){var s=o.util.clone(o.languages[a]);for(var l in i)s[l]=i[l];return s},insertBefore:function(a,i,s,l){l=l||o.languages;var c=l[a],f={};for(var h in c)if(c.hasOwnProperty(h)){if(h==i)for(var g in s)s.hasOwnProperty(g)&&(f[g]=s[g]);s.hasOwnProperty(h)||(f[h]=c[h])}var v=l[a];return l[a]=f,o.languages.DFS(o.languages,function(A,T){T===v&&A!=a&&(this[A]=f)}),f},DFS:function a(i,s,l,c){c=c||{};var f=o.util.objId;for(var h in i)if(i.hasOwnProperty(h)){s.call(i,h,i[h],l||h);var g=i[h],v=o.util.type(g);v==="Object"&&!c[f(g)]?(c[f(g)]=!0,a(g,s,null,c)):v==="Array"&&!c[f(g)]&&(c[f(g)]=!0,a(g,s,h,c))}}},plugins:{},highlightAll:function(a,i){o.highlightAllUnder(document,a,i)},highlightAllUnder:function(a,i,s){var l={callback:s,container:a,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",l),l.elements=Array.prototype.slice.apply(l.container.querySelectorAll(l.selector)),o.hooks.run("before-all-elements-highlight",l);for(var c=0,f;f=l.elements[c++];)o.highlightElement(f,i===!0,l.callback)},highlightElement:function(a,i,s){var l=o.util.getLanguage(a),c=o.languages[l];o.util.setLanguage(a,l);var f=a.parentElement;f&&f.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(f,l);var h=a.textContent,g={element:a,language:l,grammar:c,code:h};function v(T){g.highlightedCode=T,o.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,o.hooks.run("after-highlight",g),o.hooks.run("complete",g),s&&s.call(g.element)}if(o.hooks.run("before-sanity-check",g),f=g.element.parentElement,f&&f.nodeName.toLowerCase()==="pre"&&!f.hasAttribute("tabindex")&&f.setAttribute("tabindex","0"),!g.code){o.hooks.run("complete",g),s&&s.call(g.element);return}if(o.hooks.run("before-highlight",g),!g.grammar){v(o.util.encode(g.code));return}if(i&&r.Worker){var A=new Worker(o.filename);A.onmessage=function(T){v(T.data)},A.postMessage(JSON.stringify({language:g.language,code:g.code,immediateClose:!0}))}else v(o.highlight(g.code,g.grammar,g.language))},highlight:function(a,i,s){var l={code:a,grammar:i,language:s};if(o.hooks.run("before-tokenize",l),!l.grammar)throw new Error('The language "'+l.language+'" has no grammar.');return l.tokens=o.tokenize(l.code,l.grammar),o.hooks.run("after-tokenize",l),b.stringify(o.util.encode(l.tokens),l.language)},tokenize:function(a,i){var s=i.rest;if(s){for(var l in s)i[l]=s[l];delete i.rest}var c=new _;return y(c,c.head,a),E(a,c,i,c.head,0),C(c)},hooks:{all:{},add:function(a,i){var s=o.hooks.all;s[a]=s[a]||[],s[a].push(i)},run:function(a,i){var s=o.hooks.all[a];if(!(!s||!s.length))for(var l=0,c;c=s[l++];)c(i)}},Token:b};r.Prism=o;function b(a,i,s,l){this.type=a,this.content=i,this.alias=s,this.length=(l||"").length|0}b.stringify=function a(i,s){if(typeof i=="string")return i;if(Array.isArray(i)){var l="";return i.forEach(function(v){l+=a(v,s)}),l}var c={type:i.type,content:a(i.content,s),tag:"span",classes:["token",i.type],attributes:{},language:s},f=i.alias;f&&(Array.isArray(f)?Array.prototype.push.apply(c.classes,f):c.classes.push(f)),o.hooks.run("wrap",c);var h="";for(var g in c.attributes)h+=" "+g+'="'+(c.attributes[g]||"").replace(/"/g,"&quot;")+'"';return"<"+c.tag+' class="'+c.classes.join(" ")+'"'+h+">"+c.content+"</"+c.tag+">"};function x(a,i,s,l){a.lastIndex=i;var c=a.exec(s);if(c&&l&&c[1]){var f=c[1].length;c.index+=f,c[0]=c[0].slice(f)}return c}function E(a,i,s,l,c,f){for(var h in s)if(!(!s.hasOwnProperty(h)||!s[h])){var g=s[h];g=Array.isArray(g)?g:[g];for(var v=0;v<g.length;++v){if(f&&f.cause==h+","+v)return;var A=g[v],T=A.inside,J=!!A.lookbehind,we=!!A.greedy,rt=A.alias;if(we&&!A.pattern.global){var it=A.pattern.toString().match(/[imsuy]*$/)[0];A.pattern=RegExp(A.pattern.source,it+"g")}for(var Ae=A.pattern||A,$=l.next,k=c;$!==i.tail&&!(f&&k>=f.reach);k+=$.value.length,$=$.next){var V=$.value;if(i.length>a.length)return;if(!(V instanceof b)){var X=1,O;if(we){if(O=x(Ae,k,a,J),!O||O.index>=a.length)break;var Q=O.index,at=O.index+O[0].length,z=k;for(z+=$.value.length;Q>=z;)$=$.next,z+=$.value.length;if(z-=$.value.length,k=z,$.value instanceof b)continue;for(var G=$;G!==i.tail&&(z<at||typeof G.value=="string");G=G.next)X++,z+=G.value.length;X--,V=a.slice(k,z),O.index-=k}else if(O=x(Ae,0,V,J),!O)continue;var Q=O.index,Y=O[0],ie=V.slice(0,Q),Ee=V.slice(Q+Y.length),ae=k+V.length;f&&ae>f.reach&&(f.reach=ae);var ee=$.prev;ie&&(ee=y(i,ee,ie),k+=ie.length),S(i,ee,X);var st=new b(h,T?o.tokenize(Y,T):Y,rt,Y);if($=y(i,ee,st),Ee&&y(i,$,Ee),X>1){var se={cause:h+","+v,reach:ae};E(a,i,s,$.prev,k,se),f&&se.reach>f.reach&&(f.reach=se.reach)}}}}}}function _(){var a={value:null,prev:null,next:null},i={value:null,prev:a,next:null};a.next=i,this.head=a,this.tail=i,this.length=0}function y(a,i,s){var l=i.next,c={value:s,prev:i,next:l};return i.next=c,l.prev=c,a.length++,c}function S(a,i,s){for(var l=i.next,c=0;c<s&&l!==a.tail;c++)l=l.next;i.next=l,l.prev=i,a.length-=c}function C(a){for(var i=[],s=a.head.next;s!==a.tail;)i.push(s.value),s=s.next;return i}if(!r.document)return r.addEventListener&&(o.disableWorkerMessageHandler||r.addEventListener("message",function(a){var i=JSON.parse(a.data),s=i.language,l=i.code,c=i.immediateClose;r.postMessage(o.highlight(l,o.languages[s],s)),c&&r.close()},!1)),o;var m=o.util.currentScript();m&&(o.filename=m.src,m.hasAttribute("data-manual")&&(o.manual=!0));function w(){o.manual||o.highlightAll()}if(!o.manual){var P=document.readyState;P==="loading"||P==="interactive"&&m&&m.defer?document.addEventListener("DOMContentLoaded",w):window.requestAnimationFrame?window.requestAnimationFrame(w):window.setTimeout(w,16)}return o}(t);e.exports&&(e.exports=n),typeof Se<"u"&&(Se.Prism=n)})(mt);const vt=ge;(function(e){for(var t=/\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source,n=0;n<2;n++)t=t.replace(/<self>/g,function(){return t});t=t.replace(/<self>/g,function(){return/[^\s\S]/.source}),e.languages.rust={comment:[{pattern:RegExp(/(^|[^\\])/.source+t),lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,greedy:!0},char:{pattern:/b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,greedy:!0},attribute:{pattern:/#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,greedy:!0,alias:"attr-name",inside:{string:null}},"closure-params":{pattern:/([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,lookbehind:!0,greedy:!0,inside:{"closure-punctuation":{pattern:/^\||\|$/,alias:"punctuation"},rest:null}},"lifetime-annotation":{pattern:/'\w+/,alias:"symbol"},"fragment-specifier":{pattern:/(\$\w+:)[a-z]+/,lookbehind:!0,alias:"punctuation"},variable:/\$\w+/,"function-definition":{pattern:/(\bfn\s+)\w+/,lookbehind:!0,alias:"function"},"type-definition":{pattern:/(\b(?:enum|struct|trait|type|union)\s+)\w+/,lookbehind:!0,alias:"class-name"},"module-declaration":[{pattern:/(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,lookbehind:!0,alias:"namespace"},{pattern:/(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,lookbehind:!0,alias:"namespace",inside:{punctuation:/::/}}],keyword:[/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],function:/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,macro:{pattern:/\b\w+!/,alias:"property"},constant:/\b[A-Z_][A-Z_\d]+\b/,"class-name":/\b[A-Z]\w*\b/,namespace:{pattern:/(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,inside:{punctuation:/::/}},number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,boolean:/\b(?:false|true)\b/,punctuation:/->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,operator:/[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/},e.languages.rust["closure-params"].inside.rest=e.languages.rust,e.languages.rust.attribute.inside.string=e.languages.rust.string})(Prism);function He(e,t){e.indexOf(t)===-1&&e.push(t)}function yt(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}const Ke=(e,t,n)=>Math.min(Math.max(n,e),t),M={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},N=e=>typeof e=="number",R=e=>Array.isArray(e)&&!N(e[0]),bt=(e,t,n)=>{const r=t-e;return((n-e)%r+r)%r+e};function xt(e,t){return R(e)?e[bt(0,e.length,t)]:e}const Ne=(e,t,n)=>-n*e+n*t+e,Ze=()=>{},j=e=>e,be=(e,t,n)=>t-e===0?1:(n-e)/(t-e);function Je(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const u=be(0,t,r);e.push(Ne(n,1,u))}}function wt(e){const t=[0];return Je(t,e-1),t}function At(e,t=wt(e.length),n=j){const r=e.length,u=r-t.length;return u>0&&Je(t,u),d=>{let p=0;for(;p<r-2&&!(d<t[p+1]);p++);let o=Ke(0,1,be(t[p],t[p+1],d));return o=xt(n,p)(o),Ne(e[p],e[p+1],o)}}const Xe=e=>Array.isArray(e)&&N(e[0]),pe=e=>typeof e=="object"&&Boolean(e.createAnimation),Z=e=>typeof e=="function",Et=e=>typeof e=="string",ce={ms:e=>e*1e3,s:e=>e/1e3},Qe=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,_t=1e-7,St=12;function Tt(e,t,n,r,u){let d,p,o=0;do p=t+(n-t)/2,d=Qe(p,r,u)-e,d>0?n=p:t=p;while(Math.abs(d)>_t&&++o<St);return p}function H(e,t,n,r){if(e===t&&n===r)return j;const u=d=>Tt(d,0,1,e,n);return d=>d===0||d===1?d:Qe(u(d),t,r)}const $t=(e,t="end")=>n=>{n=t==="end"?Math.min(n,.999):Math.max(n,.001);const r=n*e,u=t==="end"?Math.floor(r):Math.ceil(r);return Ke(0,1,u/e)},Te={ease:H(.25,.1,.25,1),"ease-in":H(.42,0,1,1),"ease-in-out":H(.42,0,.58,1),"ease-out":H(0,0,.58,1)},Ct=/\((.*?)\)/;function $e(e){if(Z(e))return e;if(Xe(e))return H(...e);if(Te[e])return Te[e];if(e.startsWith("steps")){const t=Ct.exec(e);if(t){const n=t[1].split(",");return $t(parseFloat(n[0]),n[1].trim())}}return j}class Pt{constructor(t,n=[0,1],{easing:r,duration:u=M.duration,delay:d=M.delay,endDelay:p=M.endDelay,repeat:o=M.repeat,offset:b,direction:x="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=j,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((_,y)=>{this.resolve=_,this.reject=y}),r=r||M.easing,pe(r)){const _=r.createAnimation(n);r=_.easing,n=_.keyframes||n,u=_.duration||u}this.repeat=o,this.easing=R(r)?j:$e(r),this.updateDuration(u);const E=At(n,b,R(r)?r.map($e):j);this.tick=_=>{var y;d=d;let S=0;this.pauseTime!==void 0?S=this.pauseTime:S=(_-this.startTime)*this.rate,this.t=S,S/=1e3,S=Math.max(S-d,0),this.playState==="finished"&&this.pauseTime===void 0&&(S=this.totalDuration);const C=S/this.duration;let m=Math.floor(C),w=C%1;!w&&C>=1&&(w=1),w===1&&m--;const P=m%2;(x==="reverse"||x==="alternate"&&P||x==="alternate-reverse"&&!P)&&(w=1-w);const a=S>=this.totalDuration?1:Math.min(w,1),i=E(this.easing(a));t(i),this.pauseTime===void 0&&(this.playState==="finished"||S>=this.totalDuration+p)?(this.playState="finished",(y=this.resolve)===null||y===void 0||y.call(this,i)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const t=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=t-this.pauseTime:this.startTime||(this.startTime=t),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var t;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(t=this.reject)===null||t===void 0||t.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(t){this.duration=t,this.totalDuration=t*(this.repeat+1)}get currentTime(){return this.t}set currentTime(t){this.pauseTime!==void 0||this.rate===0?this.pauseTime=t:this.startTime=performance.now()-t/this.rate}get playbackRate(){return this.rate}set playbackRate(t){this.rate=t}}var Ye=function(){};Ye=function(e,t){if(!e)throw new Error(t)};class Dt{setAnimation(t){this.animation=t,t?.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const ue=new WeakMap;function et(e){return ue.has(e)||ue.set(e,{transforms:[],values:new Map}),ue.get(e)}function Bt(e,t){return e.has(t)||e.set(t,new Dt),e.get(t)}const Ot=["","X","Y","Z"],Mt=["translate","scale","rotate","skew"],q={x:"translateX",y:"translateY",z:"translateZ"},Ce={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:e=>e+"deg"},kt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:e=>e+"px"},rotate:Ce,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:j},skew:Ce},W=new Map,re=e=>`--motion-${e}`,ne=["x","y","z"];Mt.forEach(e=>{Ot.forEach(t=>{ne.push(e+t),W.set(re(e+t),kt[e])})});const zt=(e,t)=>ne.indexOf(e)-ne.indexOf(t),Lt=new Set(ne),xe=e=>Lt.has(e),It=(e,t)=>{q[t]&&(t=q[t]);const{transforms:n}=et(e);He(n,t),e.style.transform=tt(n)},tt=e=>e.sort(zt).reduce(jt,"").trim(),jt=(e,t)=>`${e} ${t}(var(${re(t)}))`,me=e=>e.startsWith("--"),Pe=new Set;function Ft(e){if(!Pe.has(e)){Pe.add(e);try{const{syntax:t,initialValue:n}=W.has(e)?W.get(e):{};CSS.registerProperty({name:e,inherits:!1,syntax:t,initialValue:n})}catch{}}}const fe=(e,t)=>document.createElement("div").animate(e,t),De={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{fe({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(fe({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{fe({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},de={},U={};for(const e in De)U[e]=()=>(de[e]===void 0&&(de[e]=De[e]()),de[e]);const Vt=.015,Ut=(e,t)=>{let n="";const r=Math.round(t/Vt);for(let u=0;u<r;u++)n+=e(be(0,r-1,u))+", ";return n.substring(0,n.length-2)},Be=(e,t)=>Z(e)?U.linearEasing()?`linear(${Ut(e,t)})`:M.easing:Xe(e)?Rt(e):e,Rt=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`;function qt(e,t){for(let n=0;n<e.length;n++)e[n]===null&&(e[n]=n?e[n-1]:t());return e}const Wt=e=>Array.isArray(e)?e:[e];function ve(e){return q[e]&&(e=q[e]),xe(e)?re(e):e}const K={get:(e,t)=>{t=ve(t);let n=me(t)?e.style.getPropertyValue(t):getComputedStyle(e)[t];if(!n&&n!==0){const r=W.get(t);r&&(n=r.initialValue)}return n},set:(e,t,n)=>{t=ve(t),me(t)?e.style.setProperty(t,n):e.style[t]=n}};function Gt(e,t=!0){if(!(!e||e.playState==="finished"))try{e.stop?e.stop():(t&&e.commitStyles(),e.cancel())}catch{}}function Ht(e,t){var n;let r=t?.toDefaultUnit||j;const u=e[e.length-1];if(Et(u)){const d=((n=u.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";d&&(r=p=>p+d)}return r}function Kt(){return window.__MOTION_DEV_TOOLS_RECORD}function Nt(e,t,n,r={},u){const d=Kt(),p=r.record!==!1&&d;let o,{duration:b=M.duration,delay:x=M.delay,endDelay:E=M.endDelay,repeat:_=M.repeat,easing:y=M.easing,persist:S=!1,direction:C,offset:m,allowWebkitAcceleration:w=!1}=r;const P=et(e),a=xe(t);let i=U.waapi();a&&It(e,t);const s=ve(t),l=Bt(P.values,s),c=W.get(s);return Gt(l.animation,!(pe(y)&&l.generator)&&r.record!==!1),()=>{const f=()=>{var v,A;return(A=(v=K.get(e,s))!==null&&v!==void 0?v:c?.initialValue)!==null&&A!==void 0?A:0};let h=qt(Wt(n),f);const g=Ht(h,c);if(pe(y)){const v=y.createAnimation(h,t!=="opacity",f,s,l);y=v.easing,h=v.keyframes||h,b=v.duration||b}if(me(s)&&(U.cssRegisterProperty()?Ft(s):i=!1),a&&!U.linearEasing()&&(Z(y)||R(y)&&y.some(Z))&&(i=!1),i){c&&(h=h.map(T=>N(T)?c.toDefaultUnit(T):T)),h.length===1&&(!U.partialKeyframes()||p)&&h.unshift(f());const v={delay:ce.ms(x),duration:ce.ms(b),endDelay:ce.ms(E),easing:R(y)?void 0:Be(y,b),direction:C,iterations:_+1,fill:"both"};o=e.animate({[s]:h,offset:m,easing:R(y)?y.map(T=>Be(T,b)):void 0},v),o.finished||(o.finished=new Promise((T,J)=>{o.onfinish=T,o.oncancel=J}));const A=h[h.length-1];o.finished.then(()=>{S||(K.set(e,s,A),o.cancel())}).catch(Ze),w||(o.playbackRate=1.000001)}else if(u&&a)h=h.map(v=>typeof v=="string"?parseFloat(v):v),h.length===1&&h.unshift(parseFloat(f())),o=new u(v=>{K.set(e,s,g?g(v):v)},h,Object.assign(Object.assign({},r),{duration:b,easing:y}));else{const v=h[h.length-1];K.set(e,s,c&&N(v)?c.toDefaultUnit(v):v)}return p&&d(e,t,h,{duration:b,delay:x,easing:y,repeat:_,offset:m},"motion-one"),l.setAnimation(o),o}}const Zt=(e,t)=>e[t]?Object.assign(Object.assign({},e),e[t]):Object.assign({},e);function Jt(e,t){var n;return typeof e=="string"?t?((n=t[e])!==null&&n!==void 0||(t[e]=document.querySelectorAll(e)),e=t[e]):e=document.querySelectorAll(e):e instanceof Element&&(e=[e]),Array.from(e||[])}function nt(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,r=Object.getOwnPropertySymbols(e);u<r.length;u++)t.indexOf(r[u])<0&&Object.prototype.propertyIsEnumerable.call(e,r[u])&&(n[r[u]]=e[r[u]]);return n}const Xt={any:0,all:1};function Qt(e,t,{root:n,margin:r,amount:u="any"}={}){if(typeof IntersectionObserver>"u")return()=>{};const d=Jt(e),p=new WeakMap,o=x=>{x.forEach(E=>{const _=p.get(E.target);if(E.isIntersecting!==Boolean(_))if(E.isIntersecting){const y=t(E);Z(y)?p.set(E.target,y):b.unobserve(E.target)}else _&&(_(E),p.delete(E.target))})},b=new IntersectionObserver(o,{root:n,rootMargin:r,threshold:typeof u=="number"?u:Xt[u]});return d.forEach(x=>b.observe(x)),()=>b.disconnect()}function Yt(e,t){return typeof e!=typeof t?!0:Array.isArray(e)&&Array.isArray(t)?!en(e,t):e!==t}function en(e,t){const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}function tn(e){return typeof e=="object"}function Oe(e,t){if(tn(e))return e;if(e&&t)return t[e]}let F;function nn(){if(!F)return;const e=F.sort(an).map(sn);e.forEach(Me),e.forEach(Me),F=void 0}function he(e){F?He(F,e):(F=[e],requestAnimationFrame(nn))}function rn(e){F&&yt(F,e)}const an=(e,t)=>e.getDepth()-t.getDepth(),sn=e=>e.animateUpdates(),Me=e=>e.next(),ke=(e,t)=>new CustomEvent(e,{detail:{target:t}});function ye(e,t,n){e.dispatchEvent(new CustomEvent(t,{detail:{originalEvent:n}}))}function ze(e,t,n){e.dispatchEvent(new CustomEvent(t,{detail:{originalEntry:n}}))}const on={isActive:e=>Boolean(e.inView),subscribe:(e,{enable:t,disable:n},{inViewOptions:r={}})=>{const{once:u}=r,d=nt(r,["once"]);return Qt(e,p=>{if(t(),ze(e,"viewenter",p),!u)return o=>{n(),ze(e,"viewleave",o)}},d)}},Le=(e,t,n)=>r=>{r.pointerType&&r.pointerType!=="mouse"||(n(),ye(e,t,r))},ln={isActive:e=>Boolean(e.hover),subscribe:(e,{enable:t,disable:n})=>{const r=Le(e,"hoverstart",t),u=Le(e,"hoverend",n);return e.addEventListener("pointerenter",r),e.addEventListener("pointerleave",u),()=>{e.removeEventListener("pointerenter",r),e.removeEventListener("pointerleave",u)}}},cn={isActive:e=>Boolean(e.press),subscribe:(e,{enable:t,disable:n})=>{const r=d=>{n(),ye(e,"pressend",d),window.removeEventListener("pointerup",r)},u=d=>{t(),ye(e,"pressstart",d),window.addEventListener("pointerup",r)};return e.addEventListener("pointerdown",u),()=>{e.removeEventListener("pointerdown",u),window.removeEventListener("pointerup",r)}}},te={inView:on,hover:ln,press:cn},Ie=["initial","animate",...Object.keys(te),"exit"],je=new WeakMap;function un(e={},t){let n,r=t?t.getDepth()+1:0;const u={initial:!0,animate:!0},d={},p={};for(const m of Ie)p[m]=typeof e[m]=="string"?e[m]:t?.getContext()[m];const o=e.initial===!1?"animate":"initial";let b=Oe(e[o]||p[o],e.variants)||{},x=nt(b,["transition"]);const E=Object.assign({},x);function*_(){var m,w;const P=x;x={};const a={};for(const f of Ie){if(!u[f])continue;const h=Oe(e[f]);if(h)for(const g in h)g!=="transition"&&(x[g]=h[g],a[g]=Zt((w=(m=h.transition)!==null&&m!==void 0?m:e.transition)!==null&&w!==void 0?w:{},g))}const i=new Set([...Object.keys(x),...Object.keys(P)]),s=[];i.forEach(f=>{var h;x[f]===void 0&&(x[f]=E[f]),Yt(P[f],x[f])&&((h=E[f])!==null&&h!==void 0||(E[f]=K.get(n,f)),s.push(Nt(n,f,x[f],a[f],Pt)))}),yield;const l=s.map(f=>f()).filter(Boolean);if(!l.length)return;const c=x;n.dispatchEvent(ke("motionstart",c)),Promise.all(l.map(f=>f.finished)).then(()=>{n.dispatchEvent(ke("motioncomplete",c))}).catch(Ze)}const y=(m,w)=>()=>{u[m]=w,he(C)},S=()=>{for(const m in te){const w=te[m].isActive(e),P=d[m];w&&!P?d[m]=te[m].subscribe(n,{enable:y(m,!0),disable:y(m,!1)},e):!w&&P&&(P(),delete d[m])}},C={update:m=>{n&&(e=m,S(),he(C))},setActive:(m,w)=>{n&&(u[m]=w,he(C))},animateUpdates:_,getDepth:()=>r,getTarget:()=>x,getOptions:()=>e,getContext:()=>p,mount:m=>(Ye(Boolean(m),"Animation state must be mounted with valid Element"),n=m,je.set(n,C),S(),()=>{je.delete(n),rn(C);for(const w in d)d[w]()}),isMounted:()=>Boolean(n)};return C}function fn(e){const t={},n=[];for(let r in e){const u=e[r];xe(r)&&(q[r]&&(r=q[r]),n.push(r),r=re(r));let d=Array.isArray(u)?u[0]:u;const p=W.get(r);p&&(d=N(u)?p.toDefaultUnit(u):u),t[r]=d}return n.length&&(t.transform=tt(n)),t}const dn={initial:()=>!0,addCleanup:ot,addMount:qe},Fe=Re(),hn=Re(dn);function gn(e,t,n,r){const{addCleanup:u,addMount:d,initial:p}=n,o=un(p()?t():{...t(),initial:!1},r);return d(lt.bind(void 0,ct(),()=>{u(o.mount(e())),We(()=>o.update(t()))})),o}var pn=/([^:; ]*):\s*([^;]*)/g;function Ve(e){const t={};let n;for(;n=pn.exec(e);)t[n[1]]=n[2];return t}function mn(e,t){if(typeof e=="object"&&typeof t=="object")return{...e,...t};if(typeof e=="string"&&typeof t=="string")return`${e};${t}`;const n=typeof e=="object"?e:Ve(e),r=typeof t=="object"?t:Ve(t);return{...n,...r}}const Ue=e=>{const[t,,n]=ut(e,["initial","animate","inView","inViewOptions","hover","press","variants","transition","exit"],["tag","ref","style","onMotionStart","onMotionComplete","onHoverStart","onHoverEnd","onPressStart","onPressEnd","onViewEnter","onViewLeave"]),r=gn(()=>d,()=>({...t}),_e(hn),_e(Fe)),u=fn(r.getTarget());let d;return I(Fe.Provider,{value:r,get children(){return I(ft,Ge({ref:p=>{d=p,e.ref?.(p)},get component(){return dt(()=>e.tag||"div")},get style(){return ht(()=>!!e.style)()?mn(e.style,u):u},get["on:motionstart"](){return e.onMotionStart},get["on:motioncomplete"](){return e.onMotionComplete},get["on:hoverstart"](){return e.onHoverStart},get["on:hoverend"](){return e.onHoverEnd},get["on:pressstart"](){return e.onPressStart},get["on:pressend"](){return e.onPressEnd},get["on:viewenter"](){return e.onViewEnter},get["on:viewleave"](){return e.onViewLeave}},n))}})},vn=new Proxy(Ue,{get:(e,t)=>n=>(delete n.tag,I(Ue,Ge(n,{tag:t})))}),yn="/assets/logo-d7813d0c.png",bn="/assets/burn-33192fe7.png",xn=B('<div class="i-mdi-graph-outline"></div>',2),wn=B('<div class="i-mdi-robot-happy"></div>',2),An=B('<div class="i-mdi-fire"></div>',2),En=B('<div class="i-mdi-chip"></div>',2),_n=B('<div class="i-mdi-battery-90"></div>',2),Sn=B('<div class="i-mdi-account-group"></div>',2),Tn=[{icon:D(xn),title:"Flexible",description:"Dynamic computational graph with thread-safe data structures."},{icon:D(wn),title:"Intuitive",description:"Well-defined abstractions to streamline deep learning model development."},{icon:D(An),title:"Fast",description:"Amazing performance during both training and inference."},{icon:D(En),title:"CPU and GPU",description:"Multiple backend implementations with support for CPU and GPU."},{icon:D(_n),title:"Batteries Included",description:"Full support for logging, metric, checkpointing when training models."},{icon:D(Sn),title:"Community Driven",description:"Work with a community of passionate people."}],$n=[{code:`
  use burn::tensor::backend::Backend;
  use burn::tensor::{Distribution, Tensor};
  use burn_ndarray::NdArrayBackend;
  use burn_tch::TchBackend;

  fn simple_function<B: Backend>() -> Tensor<B, 2> {
      let x = Tensor::<B, 2>::random([3, 3], Distribution::Standard);
      let y = Tensor::<B, 2>::random([3, 3], Distribution::Standard);

      x.matmul(&y)
  }

  fn main() {
      let z = simple_function::<NdArrayBackend<f32>>();
      let z = simple_function::<TchBackend<f32>>();
  }
`,description:"The tensor struct is a fundamental aspect of the Burn framework. It allows for the development of deep learning models without the need to specify a backend implementation.",title:"Tensor"},{code:`
  use burn::tensor::backend::ADBackend;
  use burn::tensor::{Distribution, Tensor};
  use burn_autodiff::ADBackendDecorator;

  fn simple_function_grads<B: ADBackend>() -> B::Gradients {
      let z = simple_function::<B>();

      z.backward()
  }

  fn main() {
      type ADNdArrayBackend = ADBackendDecorator<NdArrayBackend<f32>>;
      type ADTchBackend = ADBackendDecorator<TchBackend<f32>>;

      let grads = simple_function_grads::<ADNdArrayBackend>();
      let grads = simple_function_grads::<ADTchBackend>();
  }
`,description:"Burn makes backpropagation easy, enabling it on any backend through the use of a simple decorator, making the computation of gradients effortless across different backends.",title:"Autodiff"},{code:`
  use burn::nn;
  use burn::module::{Module, Param};
 
  #[derive(Module, Debug)]
  pub struct MultiHeadAttention<B: Backend> {
      query: Param<nn::Linear<B>>,
      key: Param<nn::Linear<B>>,
      value: Param<nn::Linear<B>>,
      output: Param<nn::Linear<B>>,
      dropout: nn::Dropout,
      activation: nn::GELU,
      n_heads: usize,
      d_k: usize,
      min_float: f64,
  }
`,description:"The module derive let your create your own neural network module similar to PyTorch",title:"Module"},{code:`
  use burn::config::Config;
  
  #[derive(Config)]
  struct MyConfig {
      #[config(default = 1.0e-6)]
      pub epsilon: usize,
      pub dim: usize,
  }
`,description:"The config derive simplifies the management of module and component configurations and hyper-parameters, providing a serializable and deserializable structure for efficient deep learning model development.",title:"Config"}],Cn=B('<div class="flex pt-4 sm:pt-10 flex-col sm:flex-row justify-center items-center sm:h-[70vh] bg-[#202124]"><div class="max-w-[650px]"><img></div><div class="mb-5 sm:pr-28"><h1><img class="w-56"></h1><h2 class="text-red-300 font-bold text-normal w-full text-center">Burn Unstoppable Rusty Neurons</h2></div></div>',12),Pn=B('<h2 class="bg-[#202124] w-full text-center py-10"></h2>',2),Dn=B('<div class="bg-gradient-to-b flex justify-center from-[#202124] to-gray-800"><div class="grid sm:grid-cols-3 sm:gap-32"></div></div>',4),Bn=B('<div class="bg-gray-800 flex justify-center items-center flex-col"><h2 class="w-full text-center py-10 pt-20"><span class="font-black uppercase text-[#d1d5db] p-1 text-5xl">Code Snippets</span></h2><div class="max-w-7xl justify-center items-center space-y-10 sm:space-y-32 pb-14 border-b-2 border-gray-900"></div></div>',8),On=B('<div class="absolute bg-[#EBC65D] rounded-full"></div>',2),Mn=B('<div class="flex justify-center cursor-default text-gray-300"><div class="p-6 flex space-y-5 flex-col items-center w-[200px] text-center hover:bg-gray-50 hover:text-[#202124] hover:shadow-2xl hover:scale-105 rounded-lg transition-all"><div class="text-5xl text-[#F34918]"></div><h3 class="text-2xl font-bold"></h3><p class="text-lg"></p></div></div>',10),kn=B('<pre class="border-2 border-gray-900 shadow rounded-lg w-80 md:w-full"><code class="language-rust"></code></pre>',4),zn=B('<div><h3 class="font-black uppercase text-[#F34918] text-4xl"></h3><p class="text-gray-50"></p></div>',6);function Fn(){return We(()=>{vt.highlightAll()}),qe(()=>{for(let e=0;e<30;e++){const t=document.getElementById("star-"+e);t.style.left=Math.random()*100+"%",t.style.top=Math.random()*100+"%";const n=Math.random()*8;t.style.width=1+n+"px",t.style.height=1+n+"px"}}),I(pt,{get children(){return[I(oe,{get each(){return Array.from({length:30})},children:(e,t)=>(()=>{const n=D(On);return gt(()=>le(n,"id",`star-${t()}`)),n})()}),(()=>{const e=D(Cn),t=e.firstChild,n=t.firstChild,r=t.nextSibling,u=r.firstChild,d=u.firstChild;return le(n,"src",bn),le(d,"src",yn),e})(),D(Pn),(()=>{const e=D(Dn),t=e.firstChild;return L(t,I(oe,{each:Tn,children:n=>(()=>{const r=D(Mn),u=r.firstChild,d=u.firstChild,p=d.nextSibling,o=p.nextSibling;return L(d,()=>n.icon),L(p,()=>n.title),L(o,()=>n.description),r})()})),e})(),(()=>{const e=D(Bn),t=e.firstChild,n=t.nextSibling;return L(n,I(oe,{each:$n,children:(r,u)=>I(vn.div,{get initial(){return{opacity:0,x:(u()%2===0?1:-1)*20}},inView:{opacity:1,x:0},transition:{duration:1},get class(){return`flex flex-col-reverse p-4 sm:p-0 sm:space-x-10 items-center ${u()%2===1?"sm:flex-row-reverse":"sm:flex-row"}`},get children(){return[(()=>{const d=D(kn),p=d.firstChild;return L(p,()=>r.code),d})(),(()=>{const d=D(zn),p=d.firstChild,o=p.nextSibling;return L(p,()=>r.title),L(o,()=>r.description),d})()]}})})),e})()]}})}export{Fn as default};