import{g as a,i as e,b as u,s as H,d as b,t as c,c as P,e as R,f as m,a as s,A as y,F as C,h as X}from"./entry-client-c2c9bbc9.js";const q=c('<a target="_blank" rel="noreferrer"></a>',2),k=o=>(()=>{const l=a(q);return e(l,()=>o.children),u(t=>{const i=o.src,r=o.className;return i!==t._v$&&H(l,"href",t._v$=i),r!==t._v$2&&b(l,t._v$2=r),t},{_v$:void 0,_v$2:void 0}),l})(),J=[{name:"examples",items:[{label:"MNIST",href:"https://github.com/tracel-ai/burn/tree/main/examples/mnist"},{label:"Text Classification",href:"https://github.com/tracel-ai/burn/tree/main/examples/text-classification"},{label:"ONNX Inference",href:"https://github.com/tracel-ai/burn/tree/main/examples/onnx-inference"}]},{name:"community",items:[{label:"Github",href:"https://github.com/tracel-ai/burn",icon:"i-mdi-github"},{label:"Discord",href:"https://discord.gg/uPEBbYYDB6",icon:"i-mdi-discord"}]},{name:"about",items:[{label:"Documentation",href:"https://burn.dev/docs/burn"},{label:"Book",href:"/book"},{label:"Crates.io",href:"https://crates.io/crates/burn"},{label:"License",href:"https://github.com/tracel-ai/burn#license"}]}],K=c('<div class="bg-gray-800 min-h-[100vh] w-full flex flex-col"><nav><a href="/" class="text-3xl hover:scale-110 transition-all">Burn</a><ul class="ml-auto flex space-x-12 text-xl"><li class="hover:scale-110 transition-all"></li><li class="hover:scale-110 transition-all"></li><li class="hover:scale-110 transition-all"></li><li class="hidden sm:block"><iframe src="https://ghbtns.com/github-btn.html?user=tracel-ai&amp;repo=burn&amp;type=star&amp;count=true&amp;size=large" width="170" height="30" title="GitHub"></iframe></li></ul></nav><!#><!/><div class="w-full flex justify-center pt-10 pb-10 border-t-2 border-gray-900 mt-10"><div class="grid md:grid-cols-3 gap-x-16 gap-y-6 md:gap-x-60 bg-gray-800 text-gray-500"></div></div></div>',24),Q=c('<ul class="space-y-2"><h3 class="uppercase mb-2 font-bold"></h3><!#><!/></ul>',6),U=c('<div class="flex items-center"><!#><!/><!#><!/></div>',6),V=c("<li></li>",2),W=c("<div></div>",2),Z=o=>{const[l,t]=P(!1);return R(()=>{document.addEventListener("scroll",()=>{document.body.scrollTop>100||document.documentElement.scrollTop>100?t(!0):t(!1)}),(document.body.scrollTop>100||document.documentElement.scrollTop>100)&&t(!0)}),(()=>{const i=a(K),r=i.firstChild,w=r.firstChild,N=w.nextSibling,f=N.firstChild,g=f.nextSibling,E=g.nextSibling,B=r.nextSibling,[x,L]=m(B.nextSibling),T=x.nextSibling,z=T.firstChild;return e(f,s(y,{class:"text-white",href:"/demo",children:"Demo"})),e(g,s(y,{class:"text-white",href:"/blog",children:"Blog"})),e(E,s(k,{className:"text-white",src:"https://burn.dev/book/",children:"Book"})),e(i,()=>o.children,x,L),e(z,s(C,{each:J,children:$=>(()=>{const d=a(Q),_=d.firstChild,D=_.nextSibling,[F,I]=m(D.nextSibling);return e(_,()=>$.name),e(d,s(C,{get each(){return $.items},children:n=>(()=>{const p=a(V);return e(p,s(k,{get src(){return n.href},get children(){const h=a(U),M=h.firstChild,[v,O]=m(M.nextSibling),A=v.nextSibling,[G,Y]=m(A.nextSibling);return e(h,(()=>{const j=X(()=>!!n.icon);return()=>j()&&(()=>{const S=a(W);return u(()=>b(S,`${n.iconSize?n.iconSize:"text-xl"} ${n.icon} mr-2`)),S})()})(),v,O),e(h,()=>n.label,G,Y),h}})),p})()}),F,I),d})()})),u(()=>b(r,`fixed w-full px-10 py-5 z-50 flex items-center text-gray-50 font-semibold transition-colors ${l()&&"bg-[#F34918] shadow-2xl"}`)),i})()},te=Z;export{te as L,k as O};