import{c as P,a as m,o as V,b as F,u as G,d as J,e as I,f as L,h,j as g,g as i,t as l,s as y,r as f,k as z,l as q,m as v,n as A,p as N,q as x,v as T,S as Y,w as D,i as K}from"../chunks/chunk-PeyjAfUL.js";import{_ as Q}from"../chunks/chunk-9zjs2ake.js";function W(t){const{components:e=[],children:o}=t;return P(()=>e.reduceRight((r,n)=>m(n,{children:r}),o))}function w(t,e={}){const o=J(t);function r(s){var c;return(c=e.onInit)==null||c.call(e),V(()=>{var a;return(a=e.onMount)==null?void 0:a.call(e)}),F(()=>{var a;return(a=e.onCleanUp)==null?void 0:a.call(e)}),m(o.Provider,{value:t,get children(){return s.children}})}function n(){const s=G(o);if(s===void 0)throw new Error("use() must be used within a Context.Provider");return s}return{Provider:r,use:n}}const[X,Z]=I(),{Provider:ee,use:Ge}=w({game:X,setGame:Z},{onInit(){},onMount(){},onCleanUp(){}}),[te,oe]=L(),{Provider:re,use:j}=w(te,{onInit(){},async onMount(){const t=(await Q(()=>import("../chunks/chunk-0Ct39pI4.js"),__vite__mapDeps([]))).default;oe(()=>t)},onCleanUp(){}});function ne(){const{room:t,setRoom:e}=b();if(!t.isHost){H();return}t.peer.on("open",o=>{console.log("[Room] room opened:",`${o}`),H()}),t.peer.on("connection",o=>{const r=o.peer;o.on("open",()=>{console.log(`[Room] player connected: ${r}`);const n={id:r,connection:o};e("players",s=>[...s,n])}).on("close",()=>{console.log(`[Room] player disconnected: ${r}`)}).on("error",n=>{console.log(`[Room] error with player: ${r}`),console.error({error:n})}).on("data",n=>{console.log(`[Room] data from player: ${r}`),console.table(n);const{type:s,payload:c}=n;if(s===void 0){console.warn(`[Room] malformed data from player: ${r}`);return}if(s=="Player::Initialise"){const{nickname:a,avatarSeed:$}=c;e("players",S=>S.map(k=>k.id!==r?k:{...k,nickname:a,avatarSeed:$}))}})})}function H(){const{localPlayer:t}=O(),{room:e,setRoom:o}=b(),r=t.peer.connect(e.id);console.log(`[Player] room connecting: ${e.id}`);const n=r.peer;o("connection",r),r.on("open",()=>{console.log(`[Player] room connected: ${n}`);const s={type:"Player::Initialise",payload:{nickname:t.nickname,avatarSeed:t.avatarSeed}};r.send(s)}).on("close",()=>{console.log(`[Player] room disconnected: ${n}`)}).on("error",s=>{console.log(`[Player] error with room: ${n}`),console.error({error:s})}).on("data",s=>{console.log(`[Player] data from room: ${n}`),console.table(s)})}const C=j(),[p,R]=I({players:[]}),{Provider:se,use:b}=w({room:p,setRoom:R},{onInit(){h(g([()=>p.players],()=>{console.log("Players changed"),console.table(p.players)},{defer:!0})),h(g([()=>p.isHost,C],()=>{p.isHost&&C()!==void 0&&R("peer",new(C())(p.id))},{defer:!0})),h(g(()=>p.id,()=>localStorage.setItem("roomId",p.id),{defer:!0}))},onMount(){const e=new URLSearchParams(document.location.search).get("room");R({isHost:e===null,id:e??window.crypto.randomUUID()})},onCleanUp(){}}),[d,M]=I(),E=j();b();const{Provider:ae,use:O}=w({localPlayer:d,setLocalPlayer:M},{onInit(){h(g([()=>d.id,()=>d.nickname,()=>d.avatarSeed],()=>{localStorage.setItem("playerId",d.id),localStorage.setItem("nickname",d.nickname),localStorage.setItem("avatarSeed",d.avatarSeed)},{defer:!0})),h(g([()=>d.id,E,()=>d.id],()=>{const t=d.id===void 0||E()===void 0?void 0:new(E())(d.id);M({peer:t})},{defer:!0}))},onMount(){M({id:localStorage.getItem("playerId")??window.crypto.randomUUID(),nickname:localStorage.getItem("nickname")??"",avatarSeed:localStorage.getItem("avatarSeed")??window.crypto.randomUUID()})},onCleanUp(){}}),ce=["light","dark"],ie=ce,U=["system",...ie],[u,_]=I({colorScheme:{isDark:!1,setting:"system"}}),{Provider:le,use:de}=w({UI:u,setUI:_},{onInit(){h(g(()=>u.colorScheme.isDark,()=>{u.colorScheme.isDark?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},{defer:!1})),h(g(()=>u.colorScheme.setting,()=>{_("colorScheme","isDark",u.colorScheme.setting!=="system"?u.colorScheme.setting==="dark":me()??u.colorScheme.isDark)},{defer:!1}))},onMount(){const t=localStorage.getItem("colorScheme")??u.colorScheme.setting;_("colorScheme","setting",t),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{u.colorScheme.setting==="system"&&_("colorScheme","setting","system")})},onCleanUp(){}});function me(){if(window.matchMedia!==void 0)return window.matchMedia("(prefers-color-scheme: dark)").matches}function ue(){const e=(U.indexOf(u.colorScheme.setting)+1)%U.length;_("colorScheme","setting",U[e])}const ge=l('<footer><p xmlns:cc=http://creativecommons.org/ns# xmlns:dct=http://purl.org/dc/terms/><a rel=cc:attributionURL property=dct:title href=https://github.com/jgrunik/upgrade>Upgrade</a>&nbsp;by&nbsp;<a rel="cc:attributionURL dct:creator"property=cc:attributionName href=https://github.com/jgrunik>Joshua Grunik</a>&nbsp;is licensed under&nbsp;<a rel="license noopener noreferrer"href=http://creativecommons.org/licenses/by-nc-sa/4.0/ target=_blank>CC BY-NC-SA 4.0</a><br><span style=display:inline-flex;height:2ch><img src=https://mirrors.creativecommons.org/presskit/icons/cc.svg><img src=https://mirrors.creativecommons.org/presskit/icons/by.svg><img src=https://mirrors.creativecommons.org/presskit/icons/nc.svg><img src=https://mirrors.creativecommons.org/presskit/icons/sa.svg>'),pe=()=>i(ge),he=l('<svg xmlns=http://www.w3.org/2000/svg width=1em height=1em fill=none stroke=currentColor stroke-width=0 style=overflow:visible;color:currentcolor viewBox="0 0 24 24"><path fill=currentColor fill-rule=evenodd stroke=none d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5"clip-rule=evenodd>'),fe=(t={})=>(()=>{const e=i(he);return y(e,t,!0,!0),f(),e})(),ve=l('<svg xmlns=http://www.w3.org/2000/svg width=1em height=1em fill=currentColor stroke-width=0 style=overflow:visible;color:currentcolor viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"></path><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z">'),$e=(t={})=>(()=>{const e=i(ve);return y(e,t,!0,!0),f(),e})(),ye=l('<svg xmlns=http://www.w3.org/2000/svg width=1em height=1em fill=currentColor stroke-width=0 style=overflow:visible;color:currentcolor viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708">'),_e=(t={})=>(()=>{const e=i(ye);return y(e,t,!0,!0),f(),e})(),we=l('<button class="card border"style=margin-right:0;margin:0;padding:0.5rem>'),Se={system:fe,dark:$e,light:_e};function xe(){const{UI:t}=de(),e=P(()=>Se[t.colorScheme.setting]);return(()=>{const o=i(we);return q(o,"click",ue,!0),v(o,e),A(()=>N(o,"popover-left",`color scheme '${t.colorScheme.setting}'`)),f(),o})()}z(["click"]);const Pe=l('<svg xmlns=http://www.w3.org/2000/svg width=1em height=1em fill=currentColor stroke-width=0 style=overflow:visible;color:currentcolor viewBox="0 0 16 16"><path d="M12.775 5.44C9.751 3.192 8.708 1.393 8.001 0c-.708 1.393-1.75 3.192-4.774 5.44-5.157 3.833-.303 9.182 3.965 6.238-.278 1.827-1.227 3.159-2.191 3.733v.59h6v-.59c-.964-.574-1.913-1.906-2.191-3.733 4.268 2.944 9.122-2.405 3.965-6.238">'),Ie=(t={})=>(()=>{const e=i(Pe);return y(e,t,!0,!0),f(),e})(),be=l("<header class=not-selectable><h1><!$><!/> Upgrade</h1><!$><!/>"),ke=()=>(()=>{const t=i(be),e=t.firstChild,o=e.firstChild,[r,n]=x(o.nextSibling);r.nextSibling;const s=e.nextSibling,[c,a]=x(s.nextSibling);return v(e,Ie,r,n),v(t,m(xe,{}),c,a),t})(),Ce=l("<img alt=avatar draggable=false>"),Re=l("<button>"),{localPlayer:B,setLocalPlayer:Me}=O();function Ee(t){const e=P(g(()=>B.avatarSeed,()=>`https://api.dicebear.com/7.x/lorelei/svg?seed=${B.avatarSeed}`,{defer:!0}));return(()=>{const o=i(Re);return y(o,T(t,{id:"avatar_selector_button",class:"container border-3 border-dashed shadow shadow-small",style:{"font-size":"x-large","max-width":"28ch","aspect-ratio":1,height:"auto"},onClick:Ue}),!1,!0),v(o,m(Y,{get when(){return e()},get children(){const r=i(Ce);return r.style.setProperty("margin","0"),r.style.setProperty("border","0"),A(()=>N(r,"src",e())),r}})),f(),o})()}function Ue(){Me("avatarSeed",window.crypto.randomUUID())}const Le=l("<button id=enter_room_button class=btn-secondary-outline style=max-width:fit-content;font-size:xx-large;font-variant:small-caps>");function Ae(){const[t,e]=L(!1),{room:o}=b(),r=P(()=>`⚔ ${o!=null&&o.isHost?"Host":"Join"} Room`);function n(s){return(()=>{const c=i(Le);return c.$$click=()=>{t()||(o.isHost&&history.pushState(null,"",`?room=${o.id}`),e(!0))},A(a=>{const $=t(),S=r();return $!==a._v$&&D(c,"disabled",a._v$=$),S!==a._v$2&&D(c,"innerText",a._v$2=S),a},{_v$:void 0,_v$2:void 0}),f(),c})()}return{EnterRoomButton:n,isEnteringRoom:t}}z(["click"]);const De=l("<input>");function He(t){const[e,o]=L("");return V(()=>{o(localStorage.getItem("nickname")??"")}),(()=>{const r=i(De);return y(r,T(t,{id:"nickname_name_input",type:"text",placeholder:"nickname goes here ♥",class:"container border-3 border-dashed shadow shadow-hover shadow-small",maxlength:"24",style:{"text-align":"center","font-size":"x-large","max-width":"28ch"},get value(){return e()},onInput:n=>localStorage.setItem("nickname",n.target.value)}),!1,!1),f(),r})()}const Be=l("<section><!$><!/><!$><!/>");function Ve(){const{EnterRoomButton:t,isEnteringRoom:e}=Ae();return{EntryLayout:()=>[(()=>{const o=i(Be),r=o.firstChild,[n,s]=x(r.nextSibling),c=n.nextSibling,[a,$]=x(c.nextSibling);return v(o,m(Ee,{get disabled(){return e()}}),n,s),v(o,m(He,{get disabled(){return e()}}),a,$),o})(),m(t,{})],isEnteringRoom:e}}const ze=l("<main>"),Ne=[le,ee,se,ae,re];function Te(){const{EntryLayout:t,isEnteringRoom:e}=Ve();return h(g(e,ne,{defer:!0})),m(W,{components:Ne,get children(){return[m(ke,{}),(()=>{const o=i(ze);return v(o,m(t,{})),o})(),m(pe,{})]}})}const je=Object.freeze(Object.defineProperty({__proto__:null,default:Te},Symbol.toStringTag,{value:"Module"})),Je=[{configName:"onRenderClient",importPath:"/renderer/+onRenderClient.tsx",isValueFile:!0,exportValues:K},{configName:"Page",importPath:"/pages/index/+Page.tsx",isValueFile:!0,exportValues:je}],qe={onBeforeRenderEnv:{definedAt:{isComputed:!0},valueSerialized:"null"}};export{Je as configValuesImported,qe as configValuesSerialized};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}