System.register([],(function(e,t){"use strict";return{execute:function(){const s="ionic-datepicker";let n;let l;let o=false;let c=0;let $=false;const r=typeof window!=="undefined"?window:{};const a=r.CSS;const i=r.document||{head:{}};const f={$flags$:0,$resourcesUrl$:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,s,n)=>e.addEventListener(t,s,n),rel:(e,t,s,n)=>e.removeEventListener(t,s,n)};const u=(()=>(i.head.attachShadow+"").indexOf("[native")>-1)();const m=e=>Promise.resolve(e);const h=(()=>{try{new CSSStyleSheet;return true}catch(e){}return false})();const d="{visibility:hidden}.hydrated{visibility:inherit}";const p=(e,t="")=>{{return()=>{}}};const g=(e,t)=>{{return()=>{}}};const y=new WeakMap;const w=(e,t,s)=>{let n=ye.get(e);if(h&&s){n=n||new CSSStyleSheet;n.replace(t)}else{n=t}ye.set(e,n)};const b=(e,t,s,n)=>{let l=R(t.$tagName$);let o=ye.get(l);e=e.nodeType===11?e:i;if(o){if(typeof o==="string"){e=e.head||e;let s=y.get(e);let c;if(!s){y.set(e,s=new Set)}if(!s.has(l)){{if(f.$cssShim$){c=f.$cssShim$.createHostStyle(n,l,o,!!(t.$flags$&10));const e=c["s-sc"];if(e){l=e;s=null}}else{c=i.createElement("style");c.innerHTML=o}e.insertBefore(c,e.querySelector("link"))}if(s){s.add(l)}}}else if(!e.adoptedStyleSheets.includes(o)){e.adoptedStyleSheets=[...e.adoptedStyleSheets,o]}}return l};const S=e=>{const t=e.$cmpMeta$;const s=e.$hostElement$;const n=t.$flags$;const l=p("attachStyles",t.$tagName$);const o=b(u&&s.shadowRoot?s.shadowRoot:s.getRootNode(),t,e.$modeName$,s);if(n&10){s["s-sc"]=o;s.classList.add(o+"-h")}l()};const R=(e,t)=>"sc-"+e;const v={};const N=e=>e!=null;const C=e=>{e=typeof e;return e==="object"||e==="function"};const j=e=>`__sc_import_${e.replace(/\s|-/g,"_")}`;const E=e("h",(e,t,...s)=>{let n=null;let l=false;let o=false;let c=[];const $=t=>{for(let s=0;s<t.length;s++){n=t[s];if(Array.isArray(n)){$(n)}else if(n!=null&&typeof n!=="boolean"){if(l=typeof e!=="function"&&!C(n)){n=String(n)}if(l&&o){c[c.length-1].$text$+=n}else{c.push(l?M(null,n):n)}o=l}}};$(s);if(t){{const e=t.className||t.class;if(e){t.class=typeof e!=="object"?e:Object.keys(e).filter(t=>e[t]).join(" ")}}}const r=M(e,null);r.$attrs$=t;if(c.length>0){r.$children$=c}return r});const M=(e,t)=>{const s={$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null};{s.$attrs$=null}return s};const x=e("H",{});const L=e=>e&&e.$tag$===x;const U=(e,t,s,n,l,o)=>{if(s!==n){let $=he(e,t);let a=t.toLowerCase();if(t==="class"){const t=e.classList;const l=A(s);const o=A(n);t.remove(...l.filter(e=>e&&!o.includes(e)));t.add(...o.filter(e=>e&&!l.includes(e)))}else if(t==="ref"){if(n){n(e)}}else if(!$&&t[0]==="o"&&t[1]==="n"){if(t[2]==="-"){t=t.slice(3)}else if(he(r,a)){t=a.slice(2)}else{t=a[2]+t.slice(3)}if(s){f.rel(e,t,s,false)}if(n){f.ael(e,t,n,false)}}else{const r=C(n);if(($||r&&n!==null)&&!l){try{if(!e.tagName.includes("-")){let l=n==null?"":n;if(t==="list"){$=false}else if(s==null||e[t]!=l){e[t]=l}}else{e[t]=n}}catch(c){}}if(n==null||n===false){{e.removeAttribute(t)}}else if((!$||o&4||l)&&!r){n=n===true?"":n;{e.setAttribute(t,n)}}}}};const k=/\s/;const A=e=>!e?[]:e.split(k);const O=(e,t,s,n)=>{const l=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$;const o=e&&e.$attrs$||v;const c=t.$attrs$||v;{for(n in o){if(!(n in c)){U(l,n,o[n],undefined,s,t.$flags$)}}}for(n in c){U(l,n,o[n],c[n],s,t.$flags$)}};const P=(e,t,s,l)=>{let c=t.$children$[s];let $=0;let r;let a;if(c.$text$!==null){r=c.$elm$=i.createTextNode(c.$text$)}else{r=c.$elm$=i.createElement(c.$tag$);{O(null,c,o)}if(N(n)&&r["s-si"]!==n){r.classList.add(r["s-si"]=n)}if(c.$children$){for($=0;$<c.$children$.length;++$){a=P(e,c,$);if(a){r.appendChild(a)}}}}return r};const _=(e,t,s,n,o,c)=>{let $=e;let r;if($.shadowRoot&&$.tagName===l){$=$.shadowRoot}for(;o<=c;++o){if(n[o]){r=P(null,s,o);if(r){n[o].$elm$=r;$.insertBefore(r,t)}}}};const B=(e,t,s,n,l)=>{for(;t<=s;++t){if(n=e[t]){l=n.$elm$;z(n);l.remove()}}};const I=(e,t,s,n)=>{let l=0;let o=0;let c=t.length-1;let $=t[0];let r=t[c];let a=n.length-1;let i=n[0];let f=n[a];let u;while(l<=c&&o<=a){if($==null){$=t[++l]}else if(r==null){r=t[--c]}else if(i==null){i=n[++o]}else if(f==null){f=n[--a]}else if(T($,i)){H($,i);$=t[++l];i=n[++o]}else if(T(r,f)){H(r,f);r=t[--c];f=n[--a]}else if(T($,f)){H($,f);e.insertBefore($.$elm$,r.$elm$.nextSibling);$=t[++l];f=n[--a]}else if(T(r,i)){H(r,i);e.insertBefore(r.$elm$,$.$elm$);r=t[--c];i=n[++o]}else{{u=P(t&&t[o],s,o);i=n[++o]}if(u){{$.$elm$.parentNode.insertBefore(u,$.$elm$)}}}}if(l>c){_(e,n[a+1]==null?null:n[a+1].$elm$,s,n,o,a)}else if(o>a){B(t,l,c)}};const T=(e,t)=>{if(e.$tag$===t.$tag$){return true}return false};const H=(e,t)=>{const s=t.$elm$=e.$elm$;const n=e.$children$;const l=t.$children$;const c=t.$text$;if(c===null){{{O(e,t,o)}}if(n!==null&&l!==null){I(s,n,t,l)}else if(l!==null){if(e.$text$!==null){s.textContent=""}_(s,null,t,l,0,l.length-1)}else if(n!==null){B(n,0,n.length-1)}}else if(e.$text$!==c){s.data=c}};const z=e=>{{e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(null);e.$children$&&e.$children$.map(z)}};const q=(e,t)=>{const s=e.$hostElement$;const o=e.$vnode$||M(null,null);const c=L(t)?t:E(null,null,t);l=s.tagName;c.$tag$=null;c.$flags$|=4;e.$vnode$=c;c.$elm$=o.$elm$=s.shadowRoot||s;{n=s["s-sc"]}H(o,c)};const V=e=>fe(e).$hostElement$;const W=e("c",(e,t,s)=>{const n=V(e);return{emit:e=>F(n,t,{bubbles:!!(s&4),composed:!!(s&2),cancelable:!!(s&1),detail:e})}});const F=(e,t,s)=>{const n=new CustomEvent(t,s);e.dispatchEvent(n);return n};const D=(e,t)=>{if(t&&!e.$onRenderResolve$){t["s-p"].push(new Promise(t=>e.$onRenderResolve$=t))}};const Q=(e,t)=>{{e.$flags$|=16}if(e.$flags$&4){e.$flags$|=512;return}const s=p("scheduleUpdate",e.$cmpMeta$.$tagName$);const n=e.$ancestorComponent$;const l=e.$lazyInstance$;const o=()=>G(e,l,t);D(e,n);let c;if(t){{c=Z(l,"componentWillLoad")}}s();return ee(c,()=>Ee(o))};const G=(e,t,s)=>{const n=e.$hostElement$;const l=p("update",e.$cmpMeta$.$tagName$);const o=n["s-rc"];if(s){S(e)}const c=p("render",e.$cmpMeta$.$tagName$);{{q(e,J(t))}}if(f.$cssShim$){f.$cssShim$.updateHost(n)}{e.$flags$&=~16}{e.$flags$|=2}if(o){o.map(e=>e());n["s-rc"]=undefined}c();l();{const t=n["s-p"];const s=()=>K(e);if(t.length===0){s()}else{Promise.all(t).then(s);e.$flags$|=4;t.length=0}}};const J=e=>{try{e=e.render()}catch(t){de(t)}return e};const K=e=>{const t=e.$cmpMeta$.$tagName$;const s=e.$hostElement$;const n=p("postUpdate",t);const l=e.$lazyInstance$;const o=e.$ancestorComponent$;if(!(e.$flags$&64)){e.$flags$|=64;{te(s)}{Z(l,"componentDidLoad")}n();{e.$onReadyResolve$(s);if(!o){Y()}}}else{n()}{if(e.$onRenderResolve$){e.$onRenderResolve$();e.$onRenderResolve$=undefined}if(e.$flags$&512){je(()=>Q(e,false))}e.$flags$&=~(4|512)}};const X=e=>{{const t=fe(e);const s=t.$hostElement$.isConnected;if(s&&(t.$flags$&(2|16))===2){Q(t,false)}return s}};const Y=e=>{{te(i.documentElement)}{f.$flags$|=2}je(()=>F(r,"appload",{detail:{namespace:s}}))};const Z=(e,t,s)=>{if(e&&e[t]){try{return e[t](s)}catch(n){de(n)}}return undefined};const ee=(e,t)=>e&&e.then?e.then(t):t();const te=e=>e.classList.add("hydrated");const se=(e,t)=>{if(e!=null&&!C(e)){if(t&4){return e==="false"?false:e===""||!!e}if(t&1){return String(e)}return e}return e};const ne=(e,t)=>fe(e).$instanceValues$.get(t);const le=(e,t,s,n)=>{const l=fe(e);const o=l.$instanceValues$.get(t);const c=l.$flags$;const $=l.$lazyInstance$;s=se(s,n.$members$[t][0]);if((!(c&8)||o===undefined)&&s!==o){l.$instanceValues$.set(t,s);if($){if(n.$watchers$&&c&128){const e=n.$watchers$[t];if(e){e.map(e=>{try{$[e](s,o,t)}catch(n){de(n)}})}}if((c&(2|16))===2){Q(l,false)}}}};const oe=(e,t,s)=>{if(t.$members$){if(e.watchers){t.$watchers$=e.watchers}const n=Object.entries(t.$members$);const l=e.prototype;n.map(([e,[n]])=>{if(n&31||s&2&&n&32){Object.defineProperty(l,e,{get(){return ne(this,e)},set(s){le(this,e,s,t)},configurable:true,enumerable:true})}});if(s&1){const t=new Map;l.attributeChangedCallback=function(e,s,n){f.jmp(()=>{const s=t.get(e);this[s]=n===null&&typeof this[s]==="boolean"?false:n})};e.observedAttributes=n.filter(([e,t])=>t[0]&15).map(([e,s])=>{const n=s[1]||e;t.set(n,e);return n})}}return e};const ce=async(e,s,n,l,o)=>{if((s.$flags$&32)===0){s.$flags$|=32;{o=ge(n);if(o.then){const e=g();o=await o;e()}if(!o.isProxied){{n.$watchers$=o.watchers}oe(o,n,2);o.isProxied=true}const e=p("createInstance",n.$tagName$);{s.$flags$|=8}try{new o(s)}catch(r){de(r)}{s.$flags$&=~8}{s.$flags$|=128}e()}const e=R(n.$tagName$);if(!ye.has(e)&&o.style){const s=p("registerStyles",n.$tagName$);let l=o.style;if(n.$flags$&8){l=await t.import("./p-837bcc44.system.js").then(t=>t.scopeCss(l,e,false))}w(e,l,!!(n.$flags$&1));s()}}const c=s.$ancestorComponent$;const $=()=>Q(s,true);if(c&&c["s-rc"]){c["s-rc"].push($)}else{$()}};const $e=e=>{if((f.$flags$&1)===0){const t=fe(e);const s=t.$cmpMeta$;const n=p("connectedCallback",s.$tagName$);if(!(t.$flags$&1)){t.$flags$|=1;{let s=e;while(s=s.parentNode||s.host){if(s["s-p"]){D(t,t.$ancestorComponent$=s);break}}}if(s.$members$){Object.entries(s.$members$).map(([t,[s]])=>{if(s&31&&e.hasOwnProperty(t)){const s=e[t];delete e[t];e[t]=s}})}{ce(e,t,s)}}n()}};const re=e=>{if((f.$flags$&1)===0){const t=fe(e);if(f.$cssShim$){f.$cssShim$.removeHost(e)}}};const ae=e("b",(e,t={})=>{const s=p();const n=[];const l=t.exclude||[];const o=r.customElements;const c=i.head;const $=c.querySelector("meta[charset]");const a=i.createElement("style");const m=[];let h;let g=true;Object.assign(f,t);f.$resourcesUrl$=new URL(t.resourcesUrl||"./",i.baseURI).href;if(t.syncQueue){f.$flags$|=4}e.map(e=>e[1].map(t=>{const s={$flags$:t[0],$tagName$:t[1],$members$:t[2],$listeners$:t[3]};{s.$members$=t[2]}{s.$watchers$={}}if(!u&&s.$flags$&1){s.$flags$|=8}const c=s.$tagName$;const $=class extends HTMLElement{constructor(e){super(e);e=this;me(e,s);if(s.$flags$&1){if(u){{e.attachShadow({mode:"open"})}}else if(!("shadowRoot"in e)){e.shadowRoot=e}}}connectedCallback(){if(h){clearTimeout(h);h=null}if(g){m.push(this)}else{f.jmp(()=>$e(this))}}disconnectedCallback(){f.jmp(()=>re(this))}forceUpdate(){X(this)}componentOnReady(){return fe(this).$onReadyPromise$}};s.$lazyBundleIds$=e[0];if(!l.includes(c)&&!o.get(c)){n.push(c);o.define(c,oe($,s,1))}}));{a.innerHTML=n+d;a.setAttribute("data-styles","");c.insertBefore(a,$?$.nextSibling:c.firstChild)}g=false;if(m.length){m.map(e=>e.connectedCallback())}else{{f.jmp(()=>h=setTimeout(Y,30))}}s()});const ie=new WeakMap;const fe=e=>ie.get(e);const ue=e("r",(e,t)=>ie.set(t.$lazyInstance$=e,t));const me=(e,t)=>{const s={$flags$:0,$hostElement$:e,$cmpMeta$:t,$instanceValues$:new Map};{s.$onReadyPromise$=new Promise(e=>s.$onReadyResolve$=e);e["s-p"]=[];e["s-rc"]=[]}return ie.set(e,s)};const he=(e,t)=>t in e;const de=e=>console.error(e);const pe=new Map;const ge=(e,s,n)=>{const l=e.$tagName$.replace(/-/g,"_");const o=e.$lazyBundleIds$;const c=pe.get(o);if(c){return c[l]}return t.import(`./${o}.entry.js${""}`).then(e=>{{pe.set(o,e)}return e[l]},de)};const ye=new Map;const we=[];const be=[];const Se=[];const Re=(e,t)=>s=>{e.push(s);if(!$){$=true;if(t&&f.$flags$&4){je(Ce)}else{f.raf(Ce)}}};const ve=e=>{for(let s=0;s<e.length;s++){try{e[s](performance.now())}catch(t){de(t)}}e.length=0};const Ne=(e,t)=>{let s=0;let n=0;while(s<e.length&&(n=performance.now())<t){try{e[s++](n)}catch(l){de(l)}}if(s===e.length){e.length=0}else if(s!==0){e.splice(0,s)}};const Ce=()=>{c++;ve(we);const e=(f.$flags$&6)===2?performance.now()+10*Math.ceil(c*(1/22)):Infinity;Ne(be,e);Ne(Se,e);if(be.length>0){Se.push(...be);be.length=0}if($=we.length+be.length+Se.length>0){f.raf(Ce)}else{c=0}};const je=e=>m().then(e);const Ee=Re(be,true);const Me=e("a",()=>{if(!(a&&a.supports&&a.supports("color","var(--c)"))){return t.import("./p-7855c59e.system.js").then(()=>{if(f.$cssShim$=r.__cssshim){return f.$cssShim$.i()}else{return 0}})}return m()});const xe=e("p",()=>{{f.$cssShim$=r.__cssshim}const e=Array.from(i.querySelectorAll("script")).find(e=>new RegExp(`/${s}(\\.esm)?\\.js($|\\?|#)`).test(e.src)||e.getAttribute("data-stencil-namespace")===s);const n=e["data-opts"]||{};if("onbeforeload"in e&&!history.scrollRestoration){return{then(){}}}{n.resourcesUrl=new URL(".",new URL(e.getAttribute("data-resources-url")||e.src,r.location.href)).href;{Le(n.resourcesUrl,e)}if(!r.customElements){return t.import("./p-f2f3211b.system.js").then(()=>n)}}return m(n)});const Le=(e,t)=>{const n=j(s);try{r[n]=new Function("w",`return import(w);//${Math.random()}`)}catch(l){const s=new Map;r[n]=l=>{const o=new URL(l,e).href;let c=s.get(o);if(!c){const e=i.createElement("script");e.type="module";e.crossOrigin=t.crossOrigin;e.src=URL.createObjectURL(new Blob([`import * as m from '${o}'; window.${n}.m = m;`],{type:"application/javascript"}));c=new Promise(t=>{e.onload=()=>{t(r[n].m);e.remove()}});s.set(o,c);i.head.appendChild(e)}return c}}}}}}));