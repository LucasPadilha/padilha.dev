(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function xr(e,t={},n){for(const r in e){const a=e[r],i=n?`${n}:${r}`:r;typeof a=="object"&&a!==null?xr(a,t,i):typeof a=="function"&&(t[i]=a)}return t}const Co={run:e=>e()},To=()=>Co,Vi=typeof console.createTask<"u"?console.createTask:To;function Io(e,t){const n=t.shift(),r=Vi(n);return e.reduce((a,i)=>a.then(()=>r.run(()=>i(...t))),Promise.resolve())}function So(e,t){const n=t.shift(),r=Vi(n);return Promise.all(e.map(a=>r.run(()=>a(...t))))}function or(e,t){for(const n of[...e])n(t)}class Mo{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(t,n,r={}){if(!t||typeof n!="function")return()=>{};const a=t;let i;for(;this._deprecatedHooks[t];)i=this._deprecatedHooks[t],t=i.to;if(i&&!r.allowDeprecated){let s=i.message;s||(s=`${a} hook has been deprecated`+(i.to?`, please use ${i.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(s)||(console.warn(s),this._deprecatedMessages.add(s))}if(!n.name)try{Object.defineProperty(n,"name",{get:()=>"_"+t.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[t]=this._hooks[t]||[],this._hooks[t].push(n),()=>{n&&(this.removeHook(t,n),n=void 0)}}hookOnce(t,n){let r,a=(...i)=>(typeof r=="function"&&r(),r=void 0,a=void 0,n(...i));return r=this.hook(t,a),r}removeHook(t,n){if(this._hooks[t]){const r=this._hooks[t].indexOf(n);r!==-1&&this._hooks[t].splice(r,1),this._hooks[t].length===0&&delete this._hooks[t]}}deprecateHook(t,n){this._deprecatedHooks[t]=typeof n=="string"?{to:n}:n;const r=this._hooks[t]||[];delete this._hooks[t];for(const a of r)this.hook(t,a)}deprecateHooks(t){Object.assign(this._deprecatedHooks,t);for(const n in t)this.deprecateHook(n,t[n])}addHooks(t){const n=xr(t),r=Object.keys(n).map(a=>this.hook(a,n[a]));return()=>{for(const a of r.splice(0,r.length))a()}}removeHooks(t){const n=xr(t);for(const r in n)this.removeHook(r,n[r])}removeAllHooks(){for(const t in this._hooks)delete this._hooks[t]}callHook(t,...n){return n.unshift(t),this.callHookWith(Io,t,...n)}callHookParallel(t,...n){return n.unshift(t),this.callHookWith(So,t,...n)}callHookWith(t,n,...r){const a=this._before||this._after?{name:n,args:r,context:{}}:void 0;this._before&&or(this._before,a);const i=t(n in this._hooks?[...this._hooks[n]]:[],r);return i instanceof Promise?i.finally(()=>{this._after&&a&&or(this._after,a)}):(this._after&&a&&or(this._after,a),i)}beforeEach(t){return this._before=this._before||[],this._before.push(t),()=>{if(this._before!==void 0){const n=this._before.indexOf(t);n!==-1&&this._before.splice(n,1)}}}afterEach(t){return this._after=this._after||[],this._after.push(t),()=>{if(this._after!==void 0){const n=this._after.indexOf(t);n!==-1&&this._after.splice(n,1)}}}}function No(){return new Mo}function Fo(e){return Array.isArray(e)?e:[e]}const qi=["title","script","style","noscript"],Xi=["base","meta","link","style","script","noscript"],Ho=["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"],Lo=["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"],Ro=["tagPosition","tagPriority","tagDuplicateStrategy","innerHTML","textContent"];function Ji(e){let t=9;for(let n=0;n<e.length;)t=Math.imul(t^e.charCodeAt(n++),9**9);return((t^t>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function wr(e){return Ji(`${e.tag}:${e.textContent||e.innerHTML||""}:${Object.entries(e.props).map(([t,n])=>`${t}:${String(n)}`).join(",")}`)}function jo(e){let t=9;for(const n of e)for(let r=0;r<n.length;)t=Math.imul(t^n.charCodeAt(r++),9**9);return((t^t>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function Gi(e,t){const{props:n,tag:r}=e;if(Lo.includes(r))return r;if(r==="link"&&n.rel==="canonical")return"canonical";if(n.charset)return"charset";const a=["id"];r==="meta"&&a.push("name","property","http-equiv");for(const i of a)if(typeof n[i]<"u"){const s=String(n[i]);return t&&!t(s)?!1:`${r}:${i}:${s}`}return!1}function Da(e,t){return e==null?t||null:typeof e=="function"?e(t):e}function cn(e,t=!1,n){const{tag:r,$el:a}=e;a&&(Object.entries(r.props).forEach(([i,s])=>{s=String(s);const o=`attr:${i}`;if(i==="class"){if(!s)return;for(const l of s.split(" ")){const f=`${o}:${l}`;n&&n(e,f,()=>a.classList.remove(l)),a.classList.contains(l)||a.classList.add(l)}return}n&&!i.startsWith("data-h-")&&n(e,o,()=>a.removeAttribute(i)),(t||a.getAttribute(i)!==s)&&a.setAttribute(i,s)}),qi.includes(r.tag)&&(r.textContent&&r.textContent!==a.textContent?a.textContent=r.textContent:r.innerHTML&&r.innerHTML!==a.innerHTML&&(a.innerHTML=r.innerHTML)))}let Nt=!1;async function $o(e,t={}){var v,E;const n={shouldRender:!0};if(await e.hooks.callHook("dom:beforeRender",n),!n.shouldRender)return;const r=t.document||e.resolvedOptions.document||window.document,a=(await e.resolveTags()).map(o);if(e.resolvedOptions.experimentalHashHydration&&(Nt=Nt||e._hash||!1,Nt)){const _=jo(a.map(w=>w.tag._h));if(Nt===_)return;Nt=_}const i=e._popSideEffectQueue();e.headEntries().map(_=>_._sde).forEach(_=>{Object.entries(_).forEach(([w,R])=>{i[w]=R})});const s=(_,w,R)=>{w=`${_.renderId}:${w}`,_.entry&&(_.entry._sde[w]=R),delete i[w]};function o(_){const w=e.headEntries().find(A=>A._i===_._e),R={renderId:_._d||wr(_),$el:null,shouldRender:!0,tag:_,entry:w,markSideEffect:(A,y)=>s(R,A,y)};return R}const l=[],f={body:[],head:[]},u=_=>{e._elMap[_.renderId]=_.$el,l.push(_),s(_,"el",()=>{var w;(w=_.$el)==null||w.remove(),delete e._elMap[_.renderId]})};for(const _ of a){if(await e.hooks.callHook("dom:beforeRenderTag",_),!_.shouldRender)continue;const{tag:w}=_;if(w.tag==="title"){r.title=w.textContent||"",l.push(_);continue}if(w.tag==="htmlAttrs"||w.tag==="bodyAttrs"){_.$el=r[w.tag==="htmlAttrs"?"documentElement":"body"],cn(_,!1,s),l.push(_);continue}if(_.$el=e._elMap[_.renderId],!_.$el&&w.key&&(_.$el=r.querySelector(`${(v=w.tagPosition)!=null&&v.startsWith("body")?"body":"head"} > ${w.tag}[data-h-${w._h}]`)),_.$el){_.tag._d&&cn(_),u(_);continue}f[(E=w.tagPosition)!=null&&E.startsWith("body")?"body":"head"].push(_)}const m={bodyClose:void 0,bodyOpen:void 0,head:void 0};Object.entries(f).forEach(([_,w])=>{var A;if(!w.length)return;const R=(A=r==null?void 0:r[_])==null?void 0:A.children;if(R){for(const y of[...R].reverse()){const F=y.tagName.toLowerCase();if(!Xi.includes(F))continue;const T=y.getAttributeNames().reduce((X,ee)=>({...X,[ee]:y.getAttribute(ee)}),{}),z={tag:F,props:T};y.innerHTML&&(z.innerHTML=y.innerHTML);const re=wr(z);let G=w.findIndex(X=>(X==null?void 0:X.renderId)===re);if(G===-1){const X=Gi(z);G=w.findIndex(ee=>(ee==null?void 0:ee.tag._d)&&ee.tag._d===X)}if(G!==-1){const X=w[G];X.$el=y,cn(X),u(X),delete w[G]}}w.forEach(y=>{const F=y.tag.tagPosition||"head";m[F]=m[F]||r.createDocumentFragment(),y.$el||(y.$el=r.createElement(y.tag.tag),cn(y,!0)),m[F].appendChild(y.$el),u(y)})}}),m.head&&r.head.appendChild(m.head),m.bodyOpen&&r.body.insertBefore(m.bodyOpen,r.body.firstChild),m.bodyClose&&r.body.appendChild(m.bodyClose);for(const _ of l)await e.hooks.callHook("dom:renderTag",_);Object.values(i).forEach(_=>_())}let lr=null;async function Do(e,t={}){function n(){return lr=null,$o(e,t)}const r=t.delayFn||(a=>setTimeout(a,10));return lr=lr||new Promise(a=>r(()=>a(n())))}function zo(e){return{hooks:{"entries:updated":function(t){if(typeof(e==null?void 0:e.document)>"u"&&typeof window>"u")return;let n=e==null?void 0:e.delayFn;!n&&typeof requestAnimationFrame<"u"&&(n=requestAnimationFrame),Do(t,{document:(e==null?void 0:e.document)||window.document,delayFn:n})}}}}function Uo(e){var t;return((t=e==null?void 0:e.head.querySelector('meta[name="unhead:ssr"]'))==null?void 0:t.getAttribute("content"))||!1}const za={critical:2,high:9,low:12,base:-1,title:1,meta:10};function Ua(e){if(typeof e.tagPriority=="number")return e.tagPriority;if(e.tag==="meta"){if(e.props.charset)return-2;if(e.props["http-equiv"]==="content-security-policy")return 0}const t=e.tagPriority||e.tag;return t in za?za[t]:10}const Wo=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}];function Bo(){return{hooks:{"tags:resolve":e=>{const t=n=>{var r;return(r=e.tags.find(a=>a._d===n))==null?void 0:r._p};for(const{prefix:n,offset:r}of Wo)for(const a of e.tags.filter(i=>typeof i.tagPriority=="string"&&i.tagPriority.startsWith(n))){const i=t(a.tagPriority.replace(n,""));typeof i<"u"&&(a._p=i+r)}e.tags.sort((n,r)=>n._p-r._p).sort((n,r)=>Ua(n)-Ua(r))}}}}function Yo(){return{hooks:{"tags:resolve":e=>{const{tags:t}=e;let n=t.findIndex(a=>a.tag==="titleTemplate");const r=t.findIndex(a=>a.tag==="title");if(r!==-1&&n!==-1){const a=Da(t[n].textContent,t[r].textContent);a!==null?t[r].textContent=a||t[r].textContent:delete t[r]}else if(n!==-1){const a=Da(t[n].textContent);a!==null&&(t[n].textContent=a,t[n].tag="title",n=-1)}n!==-1&&delete t[n],e.tags=t.filter(Boolean)}}}}function Ko(){return{hooks:{"tag:normalise":function({tag:e}){typeof e.props.body<"u"&&(e.tagPosition="bodyClose",delete e.props.body)}}}}const Vo=["link","style","script","noscript"];function qo(){return{hooks:{"tag:normalise":({tag:e,resolvedOptions:t})=>{t.experimentalHashHydration===!0&&(e._h=wr(e)),e.key&&Vo.includes(e.tag)&&(e._h=Ji(e.key),e.props[`data-h-${e._h}`]="")}}}}const Wa=["script","link","bodyAttrs"];function Xo(){const e=(t,n)=>{const r={},a={};Object.entries(n.props).forEach(([s,o])=>{s.startsWith("on")&&typeof o=="function"?a[s]=o:r[s]=o});let i;return t==="dom"&&n.tag==="script"&&typeof r.src=="string"&&typeof a.onload<"u"&&(i=r.src,delete r.src),{props:r,eventHandlers:a,delayedSrc:i}};return{hooks:{"ssr:render":function(t){t.tags=t.tags.map(n=>(!Wa.includes(n.tag)||!Object.entries(n.props).find(([r,a])=>r.startsWith("on")&&typeof a=="function")||(n.props=e("ssr",n).props),n))},"dom:beforeRenderTag":function(t){if(!Wa.includes(t.tag.tag)||!Object.entries(t.tag.props).find(([i,s])=>i.startsWith("on")&&typeof s=="function"))return;const{props:n,eventHandlers:r,delayedSrc:a}=e("dom",t.tag);Object.keys(r).length&&(t.tag.props=n,t.tag._eventHandlers=r,t.tag._delayedSrc=a)},"dom:renderTag":function(t){const n=t.$el;if(!t.tag._eventHandlers||!n)return;const r=t.tag.tag==="bodyAttrs"&&typeof window<"u"?window:n;Object.entries(t.tag._eventHandlers).forEach(([a,i])=>{const s=`${t.tag._d||t.tag._p}:${a}`,o=a.slice(2).toLowerCase(),l=`data-h-${o}`;if(t.markSideEffect(s,()=>{}),n.hasAttribute(l))return;const f=i;n.setAttribute(l,""),r.addEventListener(o,f),t.entry&&(t.entry._sde[s]=()=>{r.removeEventListener(o,f),n.removeAttribute(l)})}),t.tag._delayedSrc&&n.setAttribute("src",t.tag._delayedSrc)}}}}const Jo=["templateParams","htmlAttrs","bodyAttrs"];function Go(){return{hooks:{"tag:normalise":function({tag:e}){["hid","vmid","key"].forEach(r=>{e.props[r]&&(e.key=e.props[r],delete e.props[r])});const n=Gi(e)||(e.key?`${e.tag}:${e.key}`:!1);n&&(e._d=n)},"tags:resolve":function(e){const t={};e.tags.forEach(r=>{const a=(r.key?`${r.tag}:${r.key}`:r._d)||r._p,i=t[a];if(i){let o=r==null?void 0:r.tagDuplicateStrategy;if(!o&&Jo.includes(r.tag)&&(o="merge"),o==="merge"){const l=i.props;["class","style"].forEach(f=>{r.props[f]&&l[f]&&(f==="style"&&!l[f].endsWith(";")&&(l[f]+=";"),r.props[f]=`${l[f]} ${r.props[f]}`)}),t[a].props={...l,...r.props};return}else if(r._e===i._e){i._duped=i._duped||[],r._d=`${i._d}:${i._duped.length+1}`,i._duped.push(r);return}}const s=Object.keys(r.props).length+(r.innerHTML?1:0)+(r.textContent?1:0);if(Xi.includes(r.tag)&&s===0){delete t[a];return}t[a]=r});const n=[];Object.values(t).forEach(r=>{const a=r._duped;delete r._duped,n.push(r),a&&n.push(...a)}),e.tags=n}}}}function un(e,t){function n(i){if(["s","pageTitle"].includes(i))return t.pageTitle;let s;return i.includes(".")?s=i.split(".").reduce((o,l)=>o&&o[l]||void 0,t):s=t[i],typeof s<"u"?s||"":!1}let r=e;try{r=decodeURI(e)}catch{}return(r.match(/%(\w+\.+\w+)|%(\w+)/g)||[]).sort().reverse().forEach(i=>{const s=n(i.slice(1));typeof s=="string"&&(e=e.replace(new RegExp(`\\${i}(\\W|$)`,"g"),`${s}$1`).trim())}),t.separator&&(e.endsWith(t.separator)&&(e=e.slice(0,-t.separator.length).trim()),e.startsWith(t.separator)&&(e=e.slice(t.separator.length).trim()),e=e.replace(new RegExp(`\\${t.separator}\\s*\\${t.separator}`,"g"),t.separator)),e}function Qo(){return{hooks:{"tags:resolve":e=>{var i;const{tags:t}=e,n=(i=t.find(s=>s.tag==="title"))==null?void 0:i.textContent,r=t.findIndex(s=>s.tag==="templateParams"),a=r!==-1?t[r].props:{};a.pageTitle=a.pageTitle||n||"";for(const s of t)if(["titleTemplate","title"].includes(s.tag)&&typeof s.textContent=="string")s.textContent=un(s.textContent,a);else if(s.tag==="meta"&&typeof s.props.content=="string")s.props.content=un(s.props.content,a);else if(s.tag==="link"&&typeof s.props.href=="string")s.props.href=un(s.props.href,a);else if(s.tag==="script"&&["application/json","application/ld+json"].includes(s.props.type)&&typeof s.innerHTML=="string")try{s.innerHTML=JSON.stringify(JSON.parse(s.innerHTML),(o,l)=>typeof l=="string"?un(l,a):l)}catch{}e.tags=t.filter(s=>s.tag!=="templateParams")}}}}const Zo=typeof window<"u";let Qi;function el(e){return Qi=e}function tl(){return Qi}async function nl(e,t){const n={tag:e,props:{}};return e==="templateParams"?(n.props=t,n):["title","titleTemplate"].includes(e)?(n.textContent=t instanceof Promise?await t:t,n):typeof t=="string"?["script","noscript","style"].includes(e)?(e==="script"&&(/^(https?:)?\/\//.test(t)||t.startsWith("/"))?n.props.src=t:n.innerHTML=t,n):!1:(n.props=await al(e,{...t}),n.props.children&&(n.props.innerHTML=n.props.children),delete n.props.children,Object.keys(n.props).filter(r=>Ro.includes(r)).forEach(r=>{(!["innerHTML","textContent"].includes(r)||qi.includes(n.tag))&&(n[r]=n.props[r]),delete n.props[r]}),["innerHTML","textContent"].forEach(r=>{if(n.tag==="script"&&typeof n[r]=="string"&&["application/ld+json","application/json"].includes(n.props.type))try{n[r]=JSON.parse(n[r])}catch{n[r]=""}typeof n[r]=="object"&&(n[r]=JSON.stringify(n[r]))}),n.props.class&&(n.props.class=rl(n.props.class)),n.props.content&&Array.isArray(n.props.content)?n.props.content.map(r=>({...n,props:{...n.props,content:r}})):n)}function rl(e){return typeof e=="object"&&!Array.isArray(e)&&(e=Object.keys(e).filter(t=>e[t])),(Array.isArray(e)?e.join(" "):e).split(" ").filter(t=>t.trim()).filter(Boolean).join(" ")}async function al(e,t){for(const n of Object.keys(t)){const r=n.startsWith("data-");t[n]instanceof Promise&&(t[n]=await t[n]),String(t[n])==="true"?t[n]=r?"true":"":String(t[n])==="false"&&(r?t[n]="false":delete t[n])}return t}const il=10;async function sl(e){const t=[];return Object.entries(e.resolvedInput).filter(([n,r])=>typeof r<"u"&&Ho.includes(n)).forEach(([n,r])=>{const a=Fo(r);t.push(...a.map(i=>nl(n,i)).flat())}),(await Promise.all(t)).flat().filter(Boolean).map((n,r)=>(n._e=e._i,n._p=(e._i<<il)+r,n))}function ol(){return[Go(),Bo(),Qo(),Yo(),qo(),Xo(),Ko()]}function ll(e={}){return[zo({document:e==null?void 0:e.document,delayFn:e==null?void 0:e.domDelayFn})]}function fl(e={}){const t=cl({...e,plugins:[...ll(e),...(e==null?void 0:e.plugins)||[]]});return e.experimentalHashHydration&&t.resolvedOptions.document&&(t._hash=Uo(t.resolvedOptions.document)),el(t),t}function cl(e={}){let t=[],n={},r=0;const a=No();e!=null&&e.hooks&&a.addHooks(e.hooks),e.plugins=[...ol(),...(e==null?void 0:e.plugins)||[]],e.plugins.forEach(o=>o.hooks&&a.addHooks(o.hooks)),e.document=e.document||(Zo?document:void 0);const i=()=>a.callHook("entries:updated",s),s={resolvedOptions:e,headEntries(){return t},get hooks(){return a},use(o){o.hooks&&a.addHooks(o.hooks)},push(o,l){const f={_i:r++,input:o,_sde:{}};return l!=null&&l.mode&&(f._m=l==null?void 0:l.mode),l!=null&&l.transform&&(f._t=l==null?void 0:l.transform),t.push(f),i(),{dispose(){t=t.filter(u=>u._i!==f._i?!0:(n={...n,...u._sde||{}},u._sde={},i(),!1))},patch(u){t=t.map(m=>(m._i===f._i&&(f.input=m.input=u,i()),m))}}},async resolveTags(){const o={tags:[],entries:[...t]};await a.callHook("entries:resolve",o);for(const l of o.entries){const f=l._t||(u=>u);if(l.resolvedInput=f(l.resolvedInput||l.input),l.resolvedInput)for(const u of await sl(l)){const m={tag:u,entry:l,resolvedOptions:s.resolvedOptions};await a.callHook("tag:normalise",m),o.tags.push(m.tag)}}return await a.callHook("tags:resolve",o),o.tags},_popSideEffectQueue(){const o={...n};return n={},o},_elMap:{}};return s.hooks.callHook("init",s),s}function Xr(e,t){const n=Object.create(null),r=e.split(",");for(let a=0;a<r.length;a++)n[r[a]]=!0;return t?a=>!!n[a.toLowerCase()]:a=>!!n[a]}const q={},bt=[],ke=()=>{},ul=()=>!1,dl=/^on[^a-z]/,Un=e=>dl.test(e),Jr=e=>e.startsWith("onUpdate:"),ie=Object.assign,Gr=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},ml=Object.prototype.hasOwnProperty,D=(e,t)=>ml.call(e,t),L=Array.isArray,yt=e=>Wn(e)==="[object Map]",Zi=e=>Wn(e)==="[object Set]",j=e=>typeof e=="function",se=e=>typeof e=="string",Qr=e=>typeof e=="symbol",J=e=>e!==null&&typeof e=="object",es=e=>J(e)&&j(e.then)&&j(e.catch),ts=Object.prototype.toString,Wn=e=>ts.call(e),pl=e=>Wn(e).slice(8,-1),ns=e=>Wn(e)==="[object Object]",Zr=e=>se(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Pn=Xr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Bn=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},hl=/-(\w)/g,Me=Bn(e=>e.replace(hl,(t,n)=>n?n.toUpperCase():"")),gl=/\B([A-Z])/g,Pt=Bn(e=>e.replace(gl,"-$1").toLowerCase()),Yn=Bn(e=>e.charAt(0).toUpperCase()+e.slice(1)),fr=Bn(e=>e?`on${Yn(e)}`:""),Bt=(e,t)=>!Object.is(e,t),cr=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Mn=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},vl=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Ba;const kr=()=>Ba||(Ba=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Kn(e){if(L(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],a=se(r)?xl(r):Kn(r);if(a)for(const i in a)t[i]=a[i]}return t}else{if(se(e))return e;if(J(e))return e}}const bl=/;(?![^(]*\))/g,yl=/:([^]+)/,_l=/\/\*[^]*?\*\//g;function xl(e){const t={};return e.replace(_l,"").split(bl).forEach(n=>{if(n){const r=n.split(yl);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function ea(e){let t="";if(se(e))t=e;else if(L(e))for(let n=0;n<e.length;n++){const r=ea(e[n]);r&&(t+=r+" ")}else if(J(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const wl="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",kl=Xr(wl);function rs(e){return!!e||e===""}const Al=e=>se(e)?e:e==null?"":L(e)||J(e)&&(e.toString===ts||!j(e.toString))?JSON.stringify(e,as,2):String(e),as=(e,t)=>t&&t.__v_isRef?as(e,t.value):yt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,a])=>(n[`${r} =>`]=a,n),{})}:Zi(t)?{[`Set(${t.size})`]:[...t.values()]}:J(t)&&!L(t)&&!ns(t)?String(t):t;let ye;class Ol{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ye,!t&&ye&&(this.index=(ye.scopes||(ye.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=ye;try{return ye=this,t()}finally{ye=n}}}on(){ye=this}off(){ye=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this._active=!1}}}function El(e,t=ye){t&&t.active&&t.effects.push(e)}function Pl(){return ye}const ta=e=>{const t=new Set(e);return t.w=0,t.n=0,t},is=e=>(e.w&Je)>0,ss=e=>(e.n&Je)>0,Cl=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Je},Tl=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const a=t[r];is(a)&&!ss(a)?a.delete(e):t[n++]=a,a.w&=~Je,a.n&=~Je}t.length=n}},Ar=new WeakMap;let Ht=0,Je=1;const Or=30;let _e;const lt=Symbol(""),Er=Symbol("");class na{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,El(this,r)}run(){if(!this.active)return this.fn();let t=_e,n=qe;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=_e,_e=this,qe=!0,Je=1<<++Ht,Ht<=Or?Cl(this):Ya(this),this.fn()}finally{Ht<=Or&&Tl(this),Je=1<<--Ht,_e=this.parent,qe=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){_e===this?this.deferStop=!0:this.active&&(Ya(this),this.onStop&&this.onStop(),this.active=!1)}}function Ya(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let qe=!0;const os=[];function Ct(){os.push(qe),qe=!1}function Tt(){const e=os.pop();qe=e===void 0?!0:e}function pe(e,t,n){if(qe&&_e){let r=Ar.get(e);r||Ar.set(e,r=new Map);let a=r.get(n);a||r.set(n,a=ta()),ls(a)}}function ls(e,t){let n=!1;Ht<=Or?ss(e)||(e.n|=Je,n=!is(e)):n=!e.has(_e),n&&(e.add(_e),_e.deps.push(e))}function je(e,t,n,r,a,i){const s=Ar.get(e);if(!s)return;let o=[];if(t==="clear")o=[...s.values()];else if(n==="length"&&L(e)){const l=Number(r);s.forEach((f,u)=>{(u==="length"||u>=l)&&o.push(f)})}else switch(n!==void 0&&o.push(s.get(n)),t){case"add":L(e)?Zr(n)&&o.push(s.get("length")):(o.push(s.get(lt)),yt(e)&&o.push(s.get(Er)));break;case"delete":L(e)||(o.push(s.get(lt)),yt(e)&&o.push(s.get(Er)));break;case"set":yt(e)&&o.push(s.get(lt));break}if(o.length===1)o[0]&&Pr(o[0]);else{const l=[];for(const f of o)f&&l.push(...f);Pr(ta(l))}}function Pr(e,t){const n=L(e)?e:[...e];for(const r of n)r.computed&&Ka(r);for(const r of n)r.computed||Ka(r)}function Ka(e,t){(e!==_e||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Il=Xr("__proto__,__v_isRef,__isVue"),fs=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Qr)),Sl=ra(),Ml=ra(!1,!0),Nl=ra(!0),Va=Fl();function Fl(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=U(this);for(let i=0,s=this.length;i<s;i++)pe(r,"get",i+"");const a=r[t](...n);return a===-1||a===!1?r[t](...n.map(U)):a}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Ct();const r=U(this)[t].apply(this,n);return Tt(),r}}),e}function Hl(e){const t=U(this);return pe(t,"has",e),t.hasOwnProperty(e)}function ra(e=!1,t=!1){return function(r,a,i){if(a==="__v_isReactive")return!e;if(a==="__v_isReadonly")return e;if(a==="__v_isShallow")return t;if(a==="__v_raw"&&i===(e?t?Gl:ps:t?ms:ds).get(r))return r;const s=L(r);if(!e){if(s&&D(Va,a))return Reflect.get(Va,a,i);if(a==="hasOwnProperty")return Hl}const o=Reflect.get(r,a,i);return(Qr(a)?fs.has(a):Il(a))||(e||pe(r,"get",a),t)?o:fe(o)?s&&Zr(a)?o:o.value:J(o)?e?hs(o):sa(o):o}}const Ll=cs(),Rl=cs(!0);function cs(e=!1){return function(n,r,a,i){let s=n[r];if(kt(s)&&fe(s)&&!fe(a))return!1;if(!e&&(!Nn(a)&&!kt(a)&&(s=U(s),a=U(a)),!L(n)&&fe(s)&&!fe(a)))return s.value=a,!0;const o=L(n)&&Zr(r)?Number(r)<n.length:D(n,r),l=Reflect.set(n,r,a,i);return n===U(i)&&(o?Bt(a,s)&&je(n,"set",r,a):je(n,"add",r,a)),l}}function jl(e,t){const n=D(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&je(e,"delete",t,void 0),r}function $l(e,t){const n=Reflect.has(e,t);return(!Qr(t)||!fs.has(t))&&pe(e,"has",t),n}function Dl(e){return pe(e,"iterate",L(e)?"length":lt),Reflect.ownKeys(e)}const us={get:Sl,set:Ll,deleteProperty:jl,has:$l,ownKeys:Dl},zl={get:Nl,set(e,t){return!0},deleteProperty(e,t){return!0}},Ul=ie({},us,{get:Ml,set:Rl}),aa=e=>e,Vn=e=>Reflect.getPrototypeOf(e);function dn(e,t,n=!1,r=!1){e=e.__v_raw;const a=U(e),i=U(t);n||(t!==i&&pe(a,"get",t),pe(a,"get",i));const{has:s}=Vn(a),o=r?aa:n?la:Yt;if(s.call(a,t))return o(e.get(t));if(s.call(a,i))return o(e.get(i));e!==a&&e.get(t)}function mn(e,t=!1){const n=this.__v_raw,r=U(n),a=U(e);return t||(e!==a&&pe(r,"has",e),pe(r,"has",a)),e===a?n.has(e):n.has(e)||n.has(a)}function pn(e,t=!1){return e=e.__v_raw,!t&&pe(U(e),"iterate",lt),Reflect.get(e,"size",e)}function qa(e){e=U(e);const t=U(this);return Vn(t).has.call(t,e)||(t.add(e),je(t,"add",e,e)),this}function Xa(e,t){t=U(t);const n=U(this),{has:r,get:a}=Vn(n);let i=r.call(n,e);i||(e=U(e),i=r.call(n,e));const s=a.call(n,e);return n.set(e,t),i?Bt(t,s)&&je(n,"set",e,t):je(n,"add",e,t),this}function Ja(e){const t=U(this),{has:n,get:r}=Vn(t);let a=n.call(t,e);a||(e=U(e),a=n.call(t,e)),r&&r.call(t,e);const i=t.delete(e);return a&&je(t,"delete",e,void 0),i}function Ga(){const e=U(this),t=e.size!==0,n=e.clear();return t&&je(e,"clear",void 0,void 0),n}function hn(e,t){return function(r,a){const i=this,s=i.__v_raw,o=U(s),l=t?aa:e?la:Yt;return!e&&pe(o,"iterate",lt),s.forEach((f,u)=>r.call(a,l(f),l(u),i))}}function gn(e,t,n){return function(...r){const a=this.__v_raw,i=U(a),s=yt(i),o=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,f=a[e](...r),u=n?aa:t?la:Yt;return!t&&pe(i,"iterate",l?Er:lt),{next(){const{value:m,done:v}=f.next();return v?{value:m,done:v}:{value:o?[u(m[0]),u(m[1])]:u(m),done:v}},[Symbol.iterator](){return this}}}}function Be(e){return function(...t){return e==="delete"?!1:this}}function Wl(){const e={get(i){return dn(this,i)},get size(){return pn(this)},has:mn,add:qa,set:Xa,delete:Ja,clear:Ga,forEach:hn(!1,!1)},t={get(i){return dn(this,i,!1,!0)},get size(){return pn(this)},has:mn,add:qa,set:Xa,delete:Ja,clear:Ga,forEach:hn(!1,!0)},n={get(i){return dn(this,i,!0)},get size(){return pn(this,!0)},has(i){return mn.call(this,i,!0)},add:Be("add"),set:Be("set"),delete:Be("delete"),clear:Be("clear"),forEach:hn(!0,!1)},r={get(i){return dn(this,i,!0,!0)},get size(){return pn(this,!0)},has(i){return mn.call(this,i,!0)},add:Be("add"),set:Be("set"),delete:Be("delete"),clear:Be("clear"),forEach:hn(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{e[i]=gn(i,!1,!1),n[i]=gn(i,!0,!1),t[i]=gn(i,!1,!0),r[i]=gn(i,!0,!0)}),[e,n,t,r]}const[Bl,Yl,Kl,Vl]=Wl();function ia(e,t){const n=t?e?Vl:Kl:e?Yl:Bl;return(r,a,i)=>a==="__v_isReactive"?!e:a==="__v_isReadonly"?e:a==="__v_raw"?r:Reflect.get(D(n,a)&&a in r?n:r,a,i)}const ql={get:ia(!1,!1)},Xl={get:ia(!1,!0)},Jl={get:ia(!0,!1)},ds=new WeakMap,ms=new WeakMap,ps=new WeakMap,Gl=new WeakMap;function Ql(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Zl(e){return e.__v_skip||!Object.isExtensible(e)?0:Ql(pl(e))}function sa(e){return kt(e)?e:oa(e,!1,us,ql,ds)}function ef(e){return oa(e,!1,Ul,Xl,ms)}function hs(e){return oa(e,!0,zl,Jl,ps)}function oa(e,t,n,r,a){if(!J(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=a.get(e);if(i)return i;const s=Zl(e);if(s===0)return e;const o=new Proxy(e,s===2?r:n);return a.set(e,o),o}function _t(e){return kt(e)?_t(e.__v_raw):!!(e&&e.__v_isReactive)}function kt(e){return!!(e&&e.__v_isReadonly)}function Nn(e){return!!(e&&e.__v_isShallow)}function gs(e){return _t(e)||kt(e)}function U(e){const t=e&&e.__v_raw;return t?U(t):e}function vs(e){return Mn(e,"__v_skip",!0),e}const Yt=e=>J(e)?sa(e):e,la=e=>J(e)?hs(e):e;function bs(e){qe&&_e&&(e=U(e),ls(e.dep||(e.dep=ta())))}function ys(e,t){e=U(e);const n=e.dep;n&&Pr(n)}function fe(e){return!!(e&&e.__v_isRef===!0)}function Cr(e){return tf(e,!1)}function tf(e,t){return fe(e)?e:new nf(e,t)}class nf{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:U(t),this._value=n?t:Yt(t)}get value(){return bs(this),this._value}set value(t){const n=this.__v_isShallow||Nn(t)||kt(t);t=n?t:U(t),Bt(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:Yt(t),ys(this))}}function fa(e){return fe(e)?e.value:e}const rf={get:(e,t,n)=>fa(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const a=e[t];return fe(a)&&!fe(n)?(a.value=n,!0):Reflect.set(e,t,n,r)}};function _s(e){return _t(e)?e:new Proxy(e,rf)}class af{constructor(t,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new na(t,()=>{this._dirty||(this._dirty=!0,ys(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const t=U(this);return bs(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function sf(e,t,n=!1){let r,a;const i=j(e);return i?(r=e,a=ke):(r=e.get,a=e.set),new af(r,a,i||!a,n)}function Xe(e,t,n,r){let a;try{a=r?e(...r):e()}catch(i){qn(i,t,n)}return a}function Ae(e,t,n,r){if(j(e)){const i=Xe(e,t,n,r);return i&&es(i)&&i.catch(s=>{qn(s,t,n)}),i}const a=[];for(let i=0;i<e.length;i++)a.push(Ae(e[i],t,n,r));return a}function qn(e,t,n,r=!0){const a=t?t.vnode:null;if(t){let i=t.parent;const s=t.proxy,o=n;for(;i;){const f=i.ec;if(f){for(let u=0;u<f.length;u++)if(f[u](e,s,o)===!1)return}i=i.parent}const l=t.appContext.config.errorHandler;if(l){Xe(l,null,10,[e,s,o]);return}}of(e,n,a,r)}function of(e,t,n,r=!0){console.error(e)}let Kt=!1,Tr=!1;const oe=[];let Ie=0;const xt=[];let He=null,at=0;const xs=Promise.resolve();let ca=null;function ws(e){const t=ca||xs;return e?t.then(this?e.bind(this):e):t}function lf(e){let t=Ie+1,n=oe.length;for(;t<n;){const r=t+n>>>1;Vt(oe[r])<e?t=r+1:n=r}return t}function ua(e){(!oe.length||!oe.includes(e,Kt&&e.allowRecurse?Ie+1:Ie))&&(e.id==null?oe.push(e):oe.splice(lf(e.id),0,e),ks())}function ks(){!Kt&&!Tr&&(Tr=!0,ca=xs.then(Os))}function ff(e){const t=oe.indexOf(e);t>Ie&&oe.splice(t,1)}function cf(e){L(e)?xt.push(...e):(!He||!He.includes(e,e.allowRecurse?at+1:at))&&xt.push(e),ks()}function Qa(e,t=Kt?Ie+1:0){for(;t<oe.length;t++){const n=oe[t];n&&n.pre&&(oe.splice(t,1),t--,n())}}function As(e){if(xt.length){const t=[...new Set(xt)];if(xt.length=0,He){He.push(...t);return}for(He=t,He.sort((n,r)=>Vt(n)-Vt(r)),at=0;at<He.length;at++)He[at]();He=null,at=0}}const Vt=e=>e.id==null?1/0:e.id,uf=(e,t)=>{const n=Vt(e)-Vt(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Os(e){Tr=!1,Kt=!0,oe.sort(uf);const t=ke;try{for(Ie=0;Ie<oe.length;Ie++){const n=oe[Ie];n&&n.active!==!1&&Xe(n,null,14)}}finally{Ie=0,oe.length=0,As(),Kt=!1,ca=null,(oe.length||xt.length)&&Os()}}function df(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||q;let a=n;const i=t.startsWith("update:"),s=i&&t.slice(7);if(s&&s in r){const u=`${s==="modelValue"?"model":s}Modifiers`,{number:m,trim:v}=r[u]||q;v&&(a=n.map(E=>se(E)?E.trim():E)),m&&(a=n.map(vl))}let o,l=r[o=fr(t)]||r[o=fr(Me(t))];!l&&i&&(l=r[o=fr(Pt(t))]),l&&Ae(l,e,6,a);const f=r[o+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[o])return;e.emitted[o]=!0,Ae(f,e,6,a)}}function Es(e,t,n=!1){const r=t.emitsCache,a=r.get(e);if(a!==void 0)return a;const i=e.emits;let s={},o=!1;if(!j(e)){const l=f=>{const u=Es(f,t,!0);u&&(o=!0,ie(s,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!o?(J(e)&&r.set(e,null),null):(L(i)?i.forEach(l=>s[l]=null):ie(s,i),J(e)&&r.set(e,s),s)}function Xn(e,t){return!e||!Un(t)?!1:(t=t.slice(2).replace(/Once$/,""),D(e,t[0].toLowerCase()+t.slice(1))||D(e,Pt(t))||D(e,t))}let ve=null,Jn=null;function Fn(e){const t=ve;return ve=e,Jn=e&&e.type.__scopeId||null,t}function mf(e){Jn=e}function pf(){Jn=null}function hf(e,t=ve,n){if(!t||e._n)return e;const r=(...a)=>{r._d&&fi(-1);const i=Fn(t);let s;try{s=e(...a)}finally{Fn(i),r._d&&fi(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function ur(e){const{type:t,vnode:n,proxy:r,withProxy:a,props:i,propsOptions:[s],slots:o,attrs:l,emit:f,render:u,renderCache:m,data:v,setupState:E,ctx:_,inheritAttrs:w}=e;let R,A;const y=Fn(e);try{if(n.shapeFlag&4){const T=a||r;R=Te(u.call(T,T,m,i,E,v,_)),A=l}else{const T=t;R=Te(T.length>1?T(i,{attrs:l,slots:o,emit:f}):T(i,null)),A=t.props?l:gf(l)}}catch(T){zt.length=0,qn(T,e,1),R=le(qt)}let F=R;if(A&&w!==!1){const T=Object.keys(A),{shapeFlag:z}=F;T.length&&z&7&&(s&&T.some(Jr)&&(A=vf(A,s)),F=At(F,A))}return n.dirs&&(F=At(F),F.dirs=F.dirs?F.dirs.concat(n.dirs):n.dirs),n.transition&&(F.transition=n.transition),R=F,Fn(y),R}const gf=e=>{let t;for(const n in e)(n==="class"||n==="style"||Un(n))&&((t||(t={}))[n]=e[n]);return t},vf=(e,t)=>{const n={};for(const r in e)(!Jr(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function bf(e,t,n){const{props:r,children:a,component:i}=e,{props:s,children:o,patchFlag:l}=t,f=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?Za(r,s,f):!!s;if(l&8){const u=t.dynamicProps;for(let m=0;m<u.length;m++){const v=u[m];if(s[v]!==r[v]&&!Xn(f,v))return!0}}}else return(a||o)&&(!o||!o.$stable)?!0:r===s?!1:r?s?Za(r,s,f):!0:!!s;return!1}function Za(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let a=0;a<r.length;a++){const i=r[a];if(t[i]!==e[i]&&!Xn(n,i))return!0}return!1}function yf({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const _f=e=>e.__isSuspense;function xf(e,t){t&&t.pendingBranch?L(e)?t.effects.push(...e):t.effects.push(e):cf(e)}function wf(e,t){return da(e,null,t)}const vn={};function jt(e,t,n){return da(e,t,n)}function da(e,t,{immediate:n,deep:r,flush:a,onTrack:i,onTrigger:s}=q){var o;const l=Pl()===((o=ae)==null?void 0:o.scope)?ae:null;let f,u=!1,m=!1;if(fe(e)?(f=()=>e.value,u=Nn(e)):_t(e)?(f=()=>e,r=!0):L(e)?(m=!0,u=e.some(T=>_t(T)||Nn(T)),f=()=>e.map(T=>{if(fe(T))return T.value;if(_t(T))return ht(T);if(j(T))return Xe(T,l,2)})):j(e)?t?f=()=>Xe(e,l,2):f=()=>{if(!(l&&l.isUnmounted))return v&&v(),Ae(e,l,3,[E])}:f=ke,t&&r){const T=f;f=()=>ht(T())}let v,E=T=>{v=y.onStop=()=>{Xe(T,l,4)}},_;if(Jt)if(E=ke,t?n&&Ae(t,l,3,[f(),m?[]:void 0,E]):f(),a==="sync"){const T=yc();_=T.__watcherHandles||(T.__watcherHandles=[])}else return ke;let w=m?new Array(e.length).fill(vn):vn;const R=()=>{if(y.active)if(t){const T=y.run();(r||u||(m?T.some((z,re)=>Bt(z,w[re])):Bt(T,w)))&&(v&&v(),Ae(t,l,3,[T,w===vn?void 0:m&&w[0]===vn?[]:w,E]),w=T)}else y.run()};R.allowRecurse=!!t;let A;a==="sync"?A=R:a==="post"?A=()=>me(R,l&&l.suspense):(R.pre=!0,l&&(R.id=l.uid),A=()=>ua(R));const y=new na(f,A);t?n?R():w=y.run():a==="post"?me(y.run.bind(y),l&&l.suspense):y.run();const F=()=>{y.stop(),l&&l.scope&&Gr(l.scope.effects,y)};return _&&_.push(F),F}function kf(e,t,n){const r=this.proxy,a=se(e)?e.includes(".")?Ps(r,e):()=>r[e]:e.bind(r,r);let i;j(t)?i=t:(i=t.handler,n=t);const s=ae;Ot(this);const o=da(a,i.bind(r),n);return s?Ot(s):ft(),o}function Ps(e,t){const n=t.split(".");return()=>{let r=e;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function ht(e,t){if(!J(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),fe(e))ht(e.value,t);else if(L(e))for(let n=0;n<e.length;n++)ht(e[n],t);else if(Zi(e)||yt(e))e.forEach(n=>{ht(n,t)});else if(ns(e))for(const n in e)ht(e[n],t);return e}function nt(e,t,n,r){const a=e.dirs,i=t&&t.dirs;for(let s=0;s<a.length;s++){const o=a[s];i&&(o.oldValue=i[s].value);let l=o.dir[r];l&&(Ct(),Ae(l,n,8,[e.el,o,e,t]),Tt())}}function Af(e,t){return j(e)?(()=>ie({name:e.name},t,{setup:e}))():e}const Cn=e=>!!e.type.__asyncLoader,Cs=e=>e.type.__isKeepAlive;function Ts(e,t){Ss(e,"a",t)}function Is(e,t){Ss(e,"da",t)}function Ss(e,t,n=ae){const r=e.__wdc||(e.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return e()});if(Gn(t,r,n),n){let a=n.parent;for(;a&&a.parent;)Cs(a.parent.vnode)&&Of(r,t,n,a),a=a.parent}}function Of(e,t,n,r){const a=Gn(t,e,r,!0);Ns(()=>{Gr(r[t],a)},n)}function Gn(e,t,n=ae,r=!1){if(n){const a=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;Ct(),Ot(n);const o=Ae(t,n,e,s);return ft(),Tt(),o});return r?a.unshift(i):a.push(i),i}}const Ue=e=>(t,n=ae)=>(!Jt||e==="sp")&&Gn(e,(...r)=>t(...r),n),Ef=Ue("bm"),Ms=Ue("m"),Pf=Ue("bu"),Cf=Ue("u"),ma=Ue("bum"),Ns=Ue("um"),Tf=Ue("sp"),If=Ue("rtg"),Sf=Ue("rtc");function Mf(e,t=ae){Gn("ec",e,t)}const Fs="components";function Nf(e,t){return Hf(Fs,e,!0,t)||e}const Ff=Symbol.for("v-ndc");function Hf(e,t,n=!0,r=!1){const a=ve||ae;if(a){const i=a.type;if(e===Fs){const o=hc(i,!1);if(o&&(o===t||o===Me(t)||o===Yn(Me(t))))return i}const s=ei(a[e]||i[e],t)||ei(a.appContext[e],t);return!s&&r?i:s}}function ei(e,t){return e&&(e[t]||e[Me(t)]||e[Yn(Me(t))])}const Ir=e=>e?Ys(e)?ba(e)||e.proxy:Ir(e.parent):null,$t=ie(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ir(e.parent),$root:e=>Ir(e.root),$emit:e=>e.emit,$options:e=>pa(e),$forceUpdate:e=>e.f||(e.f=()=>ua(e.update)),$nextTick:e=>e.n||(e.n=ws.bind(e.proxy)),$watch:e=>kf.bind(e)}),dr=(e,t)=>e!==q&&!e.__isScriptSetup&&D(e,t),Lf={get({_:e},t){const{ctx:n,setupState:r,data:a,props:i,accessCache:s,type:o,appContext:l}=e;let f;if(t[0]!=="$"){const E=s[t];if(E!==void 0)switch(E){case 1:return r[t];case 2:return a[t];case 4:return n[t];case 3:return i[t]}else{if(dr(r,t))return s[t]=1,r[t];if(a!==q&&D(a,t))return s[t]=2,a[t];if((f=e.propsOptions[0])&&D(f,t))return s[t]=3,i[t];if(n!==q&&D(n,t))return s[t]=4,n[t];Sr&&(s[t]=0)}}const u=$t[t];let m,v;if(u)return t==="$attrs"&&pe(e,"get",t),u(e);if((m=o.__cssModules)&&(m=m[t]))return m;if(n!==q&&D(n,t))return s[t]=4,n[t];if(v=l.config.globalProperties,D(v,t))return v[t]},set({_:e},t,n){const{data:r,setupState:a,ctx:i}=e;return dr(a,t)?(a[t]=n,!0):r!==q&&D(r,t)?(r[t]=n,!0):D(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:a,propsOptions:i}},s){let o;return!!n[s]||e!==q&&D(e,s)||dr(t,s)||(o=i[0])&&D(o,s)||D(r,s)||D($t,s)||D(a.config.globalProperties,s)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:D(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function ti(e){return L(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Sr=!0;function Rf(e){const t=pa(e),n=e.proxy,r=e.ctx;Sr=!1,t.beforeCreate&&ni(t.beforeCreate,e,"bc");const{data:a,computed:i,methods:s,watch:o,provide:l,inject:f,created:u,beforeMount:m,mounted:v,beforeUpdate:E,updated:_,activated:w,deactivated:R,beforeDestroy:A,beforeUnmount:y,destroyed:F,unmounted:T,render:z,renderTracked:re,renderTriggered:G,errorCaptured:X,serverPrefetch:ee,expose:Ne,inheritAttrs:St,components:sn,directives:on,filters:ar}=t;if(f&&jf(f,r,null),s)for(const Q in s){const B=s[Q];j(B)&&(r[Q]=B.bind(n))}if(a){const Q=a.call(n,n);J(Q)&&(e.data=sa(Q))}if(Sr=!0,i)for(const Q in i){const B=i[Q],et=j(B)?B.bind(n,n):j(B.get)?B.get.bind(n,n):ke,ln=!j(B)&&j(B.set)?B.set.bind(n):ke,tt=Ve({get:et,set:ln});Object.defineProperty(r,Q,{enumerable:!0,configurable:!0,get:()=>tt.value,set:Oe=>tt.value=Oe})}if(o)for(const Q in o)Hs(o[Q],r,n,Q);if(l){const Q=j(l)?l.call(n):l;Reflect.ownKeys(Q).forEach(B=>{Bf(B,Q[B])})}u&&ni(u,e,"c");function ce(Q,B){L(B)?B.forEach(et=>Q(et.bind(n))):B&&Q(B.bind(n))}if(ce(Ef,m),ce(Ms,v),ce(Pf,E),ce(Cf,_),ce(Ts,w),ce(Is,R),ce(Mf,X),ce(Sf,re),ce(If,G),ce(ma,y),ce(Ns,T),ce(Tf,ee),L(Ne))if(Ne.length){const Q=e.exposed||(e.exposed={});Ne.forEach(B=>{Object.defineProperty(Q,B,{get:()=>n[B],set:et=>n[B]=et})})}else e.exposed||(e.exposed={});z&&e.render===ke&&(e.render=z),St!=null&&(e.inheritAttrs=St),sn&&(e.components=sn),on&&(e.directives=on)}function jf(e,t,n=ke){L(e)&&(e=Mr(e));for(const r in e){const a=e[r];let i;J(a)?"default"in a?i=Dt(a.from||r,a.default,!0):i=Dt(a.from||r):i=Dt(a),fe(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:s=>i.value=s}):t[r]=i}}function ni(e,t,n){Ae(L(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function Hs(e,t,n,r){const a=r.includes(".")?Ps(n,r):()=>n[r];if(se(e)){const i=t[e];j(i)&&jt(a,i)}else if(j(e))jt(a,e.bind(n));else if(J(e))if(L(e))e.forEach(i=>Hs(i,t,n,r));else{const i=j(e.handler)?e.handler.bind(n):t[e.handler];j(i)&&jt(a,i,e)}}function pa(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:a,optionsCache:i,config:{optionMergeStrategies:s}}=e.appContext,o=i.get(t);let l;return o?l=o:!a.length&&!n&&!r?l=t:(l={},a.length&&a.forEach(f=>Hn(l,f,s,!0)),Hn(l,t,s)),J(t)&&i.set(t,l),l}function Hn(e,t,n,r=!1){const{mixins:a,extends:i}=t;i&&Hn(e,i,n,!0),a&&a.forEach(s=>Hn(e,s,n,!0));for(const s in t)if(!(r&&s==="expose")){const o=$f[s]||n&&n[s];e[s]=o?o(e[s],t[s]):t[s]}return e}const $f={data:ri,props:ai,emits:ai,methods:Lt,computed:Lt,beforeCreate:ue,created:ue,beforeMount:ue,mounted:ue,beforeUpdate:ue,updated:ue,beforeDestroy:ue,beforeUnmount:ue,destroyed:ue,unmounted:ue,activated:ue,deactivated:ue,errorCaptured:ue,serverPrefetch:ue,components:Lt,directives:Lt,watch:zf,provide:ri,inject:Df};function ri(e,t){return t?e?function(){return ie(j(e)?e.call(this,this):e,j(t)?t.call(this,this):t)}:t:e}function Df(e,t){return Lt(Mr(e),Mr(t))}function Mr(e){if(L(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function ue(e,t){return e?[...new Set([].concat(e,t))]:t}function Lt(e,t){return e?ie(Object.create(null),e,t):t}function ai(e,t){return e?L(e)&&L(t)?[...new Set([...e,...t])]:ie(Object.create(null),ti(e),ti(t??{})):t}function zf(e,t){if(!e)return t;if(!t)return e;const n=ie(Object.create(null),e);for(const r in t)n[r]=ue(e[r],t[r]);return n}function Ls(){return{app:null,config:{isNativeTag:ul,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Uf=0;function Wf(e,t){return function(r,a=null){j(r)||(r=ie({},r)),a!=null&&!J(a)&&(a=null);const i=Ls(),s=new Set;let o=!1;const l=i.app={_uid:Uf++,_component:r,_props:a,_container:null,_context:i,_instance:null,version:Vs,get config(){return i.config},set config(f){},use(f,...u){return s.has(f)||(f&&j(f.install)?(s.add(f),f.install(l,...u)):j(f)&&(s.add(f),f(l,...u))),l},mixin(f){return i.mixins.includes(f)||i.mixins.push(f),l},component(f,u){return u?(i.components[f]=u,l):i.components[f]},directive(f,u){return u?(i.directives[f]=u,l):i.directives[f]},mount(f,u,m){if(!o){const v=le(r,a);return v.appContext=i,u&&t?t(v,f):e(v,f,m),o=!0,l._container=f,f.__vue_app__=l,ba(v.component)||v.component.proxy}},unmount(){o&&(e(null,l._container),delete l._container.__vue_app__)},provide(f,u){return i.provides[f]=u,l},runWithContext(f){Ln=l;try{return f()}finally{Ln=null}}};return l}}let Ln=null;function Bf(e,t){if(ae){let n=ae.provides;const r=ae.parent&&ae.parent.provides;r===n&&(n=ae.provides=Object.create(r)),n[e]=t}}function Dt(e,t,n=!1){const r=ae||ve;if(r||Ln){const a=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Ln._context.provides;if(a&&e in a)return a[e];if(arguments.length>1)return n&&j(t)?t.call(r&&r.proxy):t}}function Yf(e,t,n,r=!1){const a={},i={};Mn(i,Zn,1),e.propsDefaults=Object.create(null),Rs(e,t,a,i);for(const s in e.propsOptions[0])s in a||(a[s]=void 0);n?e.props=r?a:ef(a):e.type.props?e.props=a:e.props=i,e.attrs=i}function Kf(e,t,n,r){const{props:a,attrs:i,vnode:{patchFlag:s}}=e,o=U(a),[l]=e.propsOptions;let f=!1;if((r||s>0)&&!(s&16)){if(s&8){const u=e.vnode.dynamicProps;for(let m=0;m<u.length;m++){let v=u[m];if(Xn(e.emitsOptions,v))continue;const E=t[v];if(l)if(D(i,v))E!==i[v]&&(i[v]=E,f=!0);else{const _=Me(v);a[_]=Nr(l,o,_,E,e,!1)}else E!==i[v]&&(i[v]=E,f=!0)}}}else{Rs(e,t,a,i)&&(f=!0);let u;for(const m in o)(!t||!D(t,m)&&((u=Pt(m))===m||!D(t,u)))&&(l?n&&(n[m]!==void 0||n[u]!==void 0)&&(a[m]=Nr(l,o,m,void 0,e,!0)):delete a[m]);if(i!==o)for(const m in i)(!t||!D(t,m))&&(delete i[m],f=!0)}f&&je(e,"set","$attrs")}function Rs(e,t,n,r){const[a,i]=e.propsOptions;let s=!1,o;if(t)for(let l in t){if(Pn(l))continue;const f=t[l];let u;a&&D(a,u=Me(l))?!i||!i.includes(u)?n[u]=f:(o||(o={}))[u]=f:Xn(e.emitsOptions,l)||(!(l in r)||f!==r[l])&&(r[l]=f,s=!0)}if(i){const l=U(n),f=o||q;for(let u=0;u<i.length;u++){const m=i[u];n[m]=Nr(a,l,m,f[m],e,!D(f,m))}}return s}function Nr(e,t,n,r,a,i){const s=e[n];if(s!=null){const o=D(s,"default");if(o&&r===void 0){const l=s.default;if(s.type!==Function&&!s.skipFactory&&j(l)){const{propsDefaults:f}=a;n in f?r=f[n]:(Ot(a),r=f[n]=l.call(null,t),ft())}else r=l}s[0]&&(i&&!o?r=!1:s[1]&&(r===""||r===Pt(n))&&(r=!0))}return r}function js(e,t,n=!1){const r=t.propsCache,a=r.get(e);if(a)return a;const i=e.props,s={},o=[];let l=!1;if(!j(e)){const u=m=>{l=!0;const[v,E]=js(m,t,!0);ie(s,v),E&&o.push(...E)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!l)return J(e)&&r.set(e,bt),bt;if(L(i))for(let u=0;u<i.length;u++){const m=Me(i[u]);ii(m)&&(s[m]=q)}else if(i)for(const u in i){const m=Me(u);if(ii(m)){const v=i[u],E=s[m]=L(v)||j(v)?{type:v}:ie({},v);if(E){const _=li(Boolean,E.type),w=li(String,E.type);E[0]=_>-1,E[1]=w<0||_<w,(_>-1||D(E,"default"))&&o.push(m)}}}const f=[s,o];return J(e)&&r.set(e,f),f}function ii(e){return e[0]!=="$"}function si(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function oi(e,t){return si(e)===si(t)}function li(e,t){return L(t)?t.findIndex(n=>oi(n,e)):j(t)&&oi(t,e)?0:-1}const $s=e=>e[0]==="_"||e==="$stable",ha=e=>L(e)?e.map(Te):[Te(e)],Vf=(e,t,n)=>{if(t._n)return t;const r=hf((...a)=>ha(t(...a)),n);return r._c=!1,r},Ds=(e,t,n)=>{const r=e._ctx;for(const a in e){if($s(a))continue;const i=e[a];if(j(i))t[a]=Vf(a,i,r);else if(i!=null){const s=ha(i);t[a]=()=>s}}},zs=(e,t)=>{const n=ha(t);e.slots.default=()=>n},qf=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=U(t),Mn(t,"_",n)):Ds(t,e.slots={})}else e.slots={},t&&zs(e,t);Mn(e.slots,Zn,1)},Xf=(e,t,n)=>{const{vnode:r,slots:a}=e;let i=!0,s=q;if(r.shapeFlag&32){const o=t._;o?n&&o===1?i=!1:(ie(a,t),!n&&o===1&&delete a._):(i=!t.$stable,Ds(t,a)),s=t}else t&&(zs(e,t),s={default:1});if(i)for(const o in a)!$s(o)&&!(o in s)&&delete a[o]};function Fr(e,t,n,r,a=!1){if(L(e)){e.forEach((v,E)=>Fr(v,t&&(L(t)?t[E]:t),n,r,a));return}if(Cn(r)&&!a)return;const i=r.shapeFlag&4?ba(r.component)||r.component.proxy:r.el,s=a?null:i,{i:o,r:l}=e,f=t&&t.r,u=o.refs===q?o.refs={}:o.refs,m=o.setupState;if(f!=null&&f!==l&&(se(f)?(u[f]=null,D(m,f)&&(m[f]=null)):fe(f)&&(f.value=null)),j(l))Xe(l,o,12,[s,u]);else{const v=se(l),E=fe(l);if(v||E){const _=()=>{if(e.f){const w=v?D(m,l)?m[l]:u[l]:l.value;a?L(w)&&Gr(w,i):L(w)?w.includes(i)||w.push(i):v?(u[l]=[i],D(m,l)&&(m[l]=u[l])):(l.value=[i],e.k&&(u[e.k]=l.value))}else v?(u[l]=s,D(m,l)&&(m[l]=s)):E&&(l.value=s,e.k&&(u[e.k]=s))};s?(_.id=-1,me(_,n)):_()}}}const me=xf;function Jf(e){return Gf(e)}function Gf(e,t){const n=kr();n.__VUE__=!0;const{insert:r,remove:a,patchProp:i,createElement:s,createText:o,createComment:l,setText:f,setElementText:u,parentNode:m,nextSibling:v,setScopeId:E=ke,insertStaticContent:_}=e,w=(c,d,p,g=null,h=null,k=null,P=!1,x=null,O=!!d.dynamicChildren)=>{if(c===d)return;c&&!Ft(c,d)&&(g=fn(c),Oe(c,h,k,!0),c=null),d.patchFlag===-2&&(O=!1,d.dynamicChildren=null);const{type:b,ref:M,shapeFlag:I}=d;switch(b){case Qn:R(c,d,p,g);break;case qt:A(c,d,p,g);break;case mr:c==null&&y(d,p,g,P);break;case Le:sn(c,d,p,g,h,k,P,x,O);break;default:I&1?z(c,d,p,g,h,k,P,x,O):I&6?on(c,d,p,g,h,k,P,x,O):(I&64||I&128)&&b.process(c,d,p,g,h,k,P,x,O,dt)}M!=null&&h&&Fr(M,c&&c.ref,k,d||c,!d)},R=(c,d,p,g)=>{if(c==null)r(d.el=o(d.children),p,g);else{const h=d.el=c.el;d.children!==c.children&&f(h,d.children)}},A=(c,d,p,g)=>{c==null?r(d.el=l(d.children||""),p,g):d.el=c.el},y=(c,d,p,g)=>{[c.el,c.anchor]=_(c.children,d,p,g,c.el,c.anchor)},F=({el:c,anchor:d},p,g)=>{let h;for(;c&&c!==d;)h=v(c),r(c,p,g),c=h;r(d,p,g)},T=({el:c,anchor:d})=>{let p;for(;c&&c!==d;)p=v(c),a(c),c=p;a(d)},z=(c,d,p,g,h,k,P,x,O)=>{P=P||d.type==="svg",c==null?re(d,p,g,h,k,P,x,O):ee(c,d,h,k,P,x,O)},re=(c,d,p,g,h,k,P,x)=>{let O,b;const{type:M,props:I,shapeFlag:N,transition:H,dirs:$}=c;if(O=c.el=s(c.type,k,I&&I.is,I),N&8?u(O,c.children):N&16&&X(c.children,O,null,g,h,k&&M!=="foreignObject",P,x),$&&nt(c,null,g,"created"),G(O,c,c.scopeId,P,g),I){for(const W in I)W!=="value"&&!Pn(W)&&i(O,W,null,I[W],k,c.children,g,h,Fe);"value"in I&&i(O,"value",null,I.value),(b=I.onVnodeBeforeMount)&&Pe(b,g,c)}$&&nt(c,null,g,"beforeMount");const Y=(!h||h&&!h.pendingBranch)&&H&&!H.persisted;Y&&H.beforeEnter(O),r(O,d,p),((b=I&&I.onVnodeMounted)||Y||$)&&me(()=>{b&&Pe(b,g,c),Y&&H.enter(O),$&&nt(c,null,g,"mounted")},h)},G=(c,d,p,g,h)=>{if(p&&E(c,p),g)for(let k=0;k<g.length;k++)E(c,g[k]);if(h){let k=h.subTree;if(d===k){const P=h.vnode;G(c,P,P.scopeId,P.slotScopeIds,h.parent)}}},X=(c,d,p,g,h,k,P,x,O=0)=>{for(let b=O;b<c.length;b++){const M=c[b]=x?Ke(c[b]):Te(c[b]);w(null,M,d,p,g,h,k,P,x)}},ee=(c,d,p,g,h,k,P)=>{const x=d.el=c.el;let{patchFlag:O,dynamicChildren:b,dirs:M}=d;O|=c.patchFlag&16;const I=c.props||q,N=d.props||q;let H;p&&rt(p,!1),(H=N.onVnodeBeforeUpdate)&&Pe(H,p,d,c),M&&nt(d,c,p,"beforeUpdate"),p&&rt(p,!0);const $=h&&d.type!=="foreignObject";if(b?Ne(c.dynamicChildren,b,x,p,g,$,k):P||B(c,d,x,null,p,g,$,k,!1),O>0){if(O&16)St(x,d,I,N,p,g,h);else if(O&2&&I.class!==N.class&&i(x,"class",null,N.class,h),O&4&&i(x,"style",I.style,N.style,h),O&8){const Y=d.dynamicProps;for(let W=0;W<Y.length;W++){const te=Y[W],be=I[te],mt=N[te];(mt!==be||te==="value")&&i(x,te,be,mt,h,c.children,p,g,Fe)}}O&1&&c.children!==d.children&&u(x,d.children)}else!P&&b==null&&St(x,d,I,N,p,g,h);((H=N.onVnodeUpdated)||M)&&me(()=>{H&&Pe(H,p,d,c),M&&nt(d,c,p,"updated")},g)},Ne=(c,d,p,g,h,k,P)=>{for(let x=0;x<d.length;x++){const O=c[x],b=d[x],M=O.el&&(O.type===Le||!Ft(O,b)||O.shapeFlag&70)?m(O.el):p;w(O,b,M,null,g,h,k,P,!0)}},St=(c,d,p,g,h,k,P)=>{if(p!==g){if(p!==q)for(const x in p)!Pn(x)&&!(x in g)&&i(c,x,p[x],null,P,d.children,h,k,Fe);for(const x in g){if(Pn(x))continue;const O=g[x],b=p[x];O!==b&&x!=="value"&&i(c,x,b,O,P,d.children,h,k,Fe)}"value"in g&&i(c,"value",p.value,g.value)}},sn=(c,d,p,g,h,k,P,x,O)=>{const b=d.el=c?c.el:o(""),M=d.anchor=c?c.anchor:o("");let{patchFlag:I,dynamicChildren:N,slotScopeIds:H}=d;H&&(x=x?x.concat(H):H),c==null?(r(b,p,g),r(M,p,g),X(d.children,p,M,h,k,P,x,O)):I>0&&I&64&&N&&c.dynamicChildren?(Ne(c.dynamicChildren,N,p,h,k,P,x),(d.key!=null||h&&d===h.subTree)&&Us(c,d,!0)):B(c,d,p,M,h,k,P,x,O)},on=(c,d,p,g,h,k,P,x,O)=>{d.slotScopeIds=x,c==null?d.shapeFlag&512?h.ctx.activate(d,p,g,P,O):ar(d,p,g,h,k,P,O):Fa(c,d,O)},ar=(c,d,p,g,h,k,P)=>{const x=c.component=cc(c,g,h);if(Cs(c)&&(x.ctx.renderer=dt),uc(x),x.asyncDep){if(h&&h.registerDep(x,ce),!c.el){const O=x.subTree=le(qt);A(null,O,d,p)}return}ce(x,c,d,p,h,k,P)},Fa=(c,d,p)=>{const g=d.component=c.component;if(bf(c,d,p))if(g.asyncDep&&!g.asyncResolved){Q(g,d,p);return}else g.next=d,ff(g.update),g.update();else d.el=c.el,g.vnode=d},ce=(c,d,p,g,h,k,P)=>{const x=()=>{if(c.isMounted){let{next:M,bu:I,u:N,parent:H,vnode:$}=c,Y=M,W;rt(c,!1),M?(M.el=$.el,Q(c,M,P)):M=$,I&&cr(I),(W=M.props&&M.props.onVnodeBeforeUpdate)&&Pe(W,H,M,$),rt(c,!0);const te=ur(c),be=c.subTree;c.subTree=te,w(be,te,m(be.el),fn(be),c,h,k),M.el=te.el,Y===null&&yf(c,te.el),N&&me(N,h),(W=M.props&&M.props.onVnodeUpdated)&&me(()=>Pe(W,H,M,$),h)}else{let M;const{el:I,props:N}=d,{bm:H,m:$,parent:Y}=c,W=Cn(d);if(rt(c,!1),H&&cr(H),!W&&(M=N&&N.onVnodeBeforeMount)&&Pe(M,Y,d),rt(c,!0),I&&sr){const te=()=>{c.subTree=ur(c),sr(I,c.subTree,c,h,null)};W?d.type.__asyncLoader().then(()=>!c.isUnmounted&&te()):te()}else{const te=c.subTree=ur(c);w(null,te,p,g,c,h,k),d.el=te.el}if($&&me($,h),!W&&(M=N&&N.onVnodeMounted)){const te=d;me(()=>Pe(M,Y,te),h)}(d.shapeFlag&256||Y&&Cn(Y.vnode)&&Y.vnode.shapeFlag&256)&&c.a&&me(c.a,h),c.isMounted=!0,d=p=g=null}},O=c.effect=new na(x,()=>ua(b),c.scope),b=c.update=()=>O.run();b.id=c.uid,rt(c,!0),b()},Q=(c,d,p)=>{d.component=c;const g=c.vnode.props;c.vnode=d,c.next=null,Kf(c,d.props,g,p),Xf(c,d.children,p),Ct(),Qa(),Tt()},B=(c,d,p,g,h,k,P,x,O=!1)=>{const b=c&&c.children,M=c?c.shapeFlag:0,I=d.children,{patchFlag:N,shapeFlag:H}=d;if(N>0){if(N&128){ln(b,I,p,g,h,k,P,x,O);return}else if(N&256){et(b,I,p,g,h,k,P,x,O);return}}H&8?(M&16&&Fe(b,h,k),I!==b&&u(p,I)):M&16?H&16?ln(b,I,p,g,h,k,P,x,O):Fe(b,h,k,!0):(M&8&&u(p,""),H&16&&X(I,p,g,h,k,P,x,O))},et=(c,d,p,g,h,k,P,x,O)=>{c=c||bt,d=d||bt;const b=c.length,M=d.length,I=Math.min(b,M);let N;for(N=0;N<I;N++){const H=d[N]=O?Ke(d[N]):Te(d[N]);w(c[N],H,p,null,h,k,P,x,O)}b>M?Fe(c,h,k,!0,!1,I):X(d,p,g,h,k,P,x,O,I)},ln=(c,d,p,g,h,k,P,x,O)=>{let b=0;const M=d.length;let I=c.length-1,N=M-1;for(;b<=I&&b<=N;){const H=c[b],$=d[b]=O?Ke(d[b]):Te(d[b]);if(Ft(H,$))w(H,$,p,null,h,k,P,x,O);else break;b++}for(;b<=I&&b<=N;){const H=c[I],$=d[N]=O?Ke(d[N]):Te(d[N]);if(Ft(H,$))w(H,$,p,null,h,k,P,x,O);else break;I--,N--}if(b>I){if(b<=N){const H=N+1,$=H<M?d[H].el:g;for(;b<=N;)w(null,d[b]=O?Ke(d[b]):Te(d[b]),p,$,h,k,P,x,O),b++}}else if(b>N)for(;b<=I;)Oe(c[b],h,k,!0),b++;else{const H=b,$=b,Y=new Map;for(b=$;b<=N;b++){const he=d[b]=O?Ke(d[b]):Te(d[b]);he.key!=null&&Y.set(he.key,b)}let W,te=0;const be=N-$+1;let mt=!1,Ra=0;const Mt=new Array(be);for(b=0;b<be;b++)Mt[b]=0;for(b=H;b<=I;b++){const he=c[b];if(te>=be){Oe(he,h,k,!0);continue}let Ee;if(he.key!=null)Ee=Y.get(he.key);else for(W=$;W<=N;W++)if(Mt[W-$]===0&&Ft(he,d[W])){Ee=W;break}Ee===void 0?Oe(he,h,k,!0):(Mt[Ee-$]=b+1,Ee>=Ra?Ra=Ee:mt=!0,w(he,d[Ee],p,null,h,k,P,x,O),te++)}const ja=mt?Qf(Mt):bt;for(W=ja.length-1,b=be-1;b>=0;b--){const he=$+b,Ee=d[he],$a=he+1<M?d[he+1].el:g;Mt[b]===0?w(null,Ee,p,$a,h,k,P,x,O):mt&&(W<0||b!==ja[W]?tt(Ee,p,$a,2):W--)}}},tt=(c,d,p,g,h=null)=>{const{el:k,type:P,transition:x,children:O,shapeFlag:b}=c;if(b&6){tt(c.component.subTree,d,p,g);return}if(b&128){c.suspense.move(d,p,g);return}if(b&64){P.move(c,d,p,dt);return}if(P===Le){r(k,d,p);for(let I=0;I<O.length;I++)tt(O[I],d,p,g);r(c.anchor,d,p);return}if(P===mr){F(c,d,p);return}if(g!==2&&b&1&&x)if(g===0)x.beforeEnter(k),r(k,d,p),me(()=>x.enter(k),h);else{const{leave:I,delayLeave:N,afterLeave:H}=x,$=()=>r(k,d,p),Y=()=>{I(k,()=>{$(),H&&H()})};N?N(k,$,Y):Y()}else r(k,d,p)},Oe=(c,d,p,g=!1,h=!1)=>{const{type:k,props:P,ref:x,children:O,dynamicChildren:b,shapeFlag:M,patchFlag:I,dirs:N}=c;if(x!=null&&Fr(x,null,p,c,!0),M&256){d.ctx.deactivate(c);return}const H=M&1&&N,$=!Cn(c);let Y;if($&&(Y=P&&P.onVnodeBeforeUnmount)&&Pe(Y,d,c),M&6)Po(c.component,p,g);else{if(M&128){c.suspense.unmount(p,g);return}H&&nt(c,null,d,"beforeUnmount"),M&64?c.type.remove(c,d,p,h,dt,g):b&&(k!==Le||I>0&&I&64)?Fe(b,d,p,!1,!0):(k===Le&&I&384||!h&&M&16)&&Fe(O,d,p),g&&Ha(c)}($&&(Y=P&&P.onVnodeUnmounted)||H)&&me(()=>{Y&&Pe(Y,d,c),H&&nt(c,null,d,"unmounted")},p)},Ha=c=>{const{type:d,el:p,anchor:g,transition:h}=c;if(d===Le){Eo(p,g);return}if(d===mr){T(c);return}const k=()=>{a(p),h&&!h.persisted&&h.afterLeave&&h.afterLeave()};if(c.shapeFlag&1&&h&&!h.persisted){const{leave:P,delayLeave:x}=h,O=()=>P(p,k);x?x(c.el,k,O):O()}else k()},Eo=(c,d)=>{let p;for(;c!==d;)p=v(c),a(c),c=p;a(d)},Po=(c,d,p)=>{const{bum:g,scope:h,update:k,subTree:P,um:x}=c;g&&cr(g),h.stop(),k&&(k.active=!1,Oe(P,c,d,p)),x&&me(x,d),me(()=>{c.isUnmounted=!0},d),d&&d.pendingBranch&&!d.isUnmounted&&c.asyncDep&&!c.asyncResolved&&c.suspenseId===d.pendingId&&(d.deps--,d.deps===0&&d.resolve())},Fe=(c,d,p,g=!1,h=!1,k=0)=>{for(let P=k;P<c.length;P++)Oe(c[P],d,p,g,h)},fn=c=>c.shapeFlag&6?fn(c.component.subTree):c.shapeFlag&128?c.suspense.next():v(c.anchor||c.el),La=(c,d,p)=>{c==null?d._vnode&&Oe(d._vnode,null,null,!0):w(d._vnode||null,c,d,null,null,null,p),Qa(),As(),d._vnode=c},dt={p:w,um:Oe,m:tt,r:Ha,mt:ar,mc:X,pc:B,pbc:Ne,n:fn,o:e};let ir,sr;return t&&([ir,sr]=t(dt)),{render:La,hydrate:ir,createApp:Wf(La,ir)}}function rt({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function Us(e,t,n=!1){const r=e.children,a=t.children;if(L(r)&&L(a))for(let i=0;i<r.length;i++){const s=r[i];let o=a[i];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=a[i]=Ke(a[i]),o.el=s.el),n||Us(s,o)),o.type===Qn&&(o.el=s.el)}}function Qf(e){const t=e.slice(),n=[0];let r,a,i,s,o;const l=e.length;for(r=0;r<l;r++){const f=e[r];if(f!==0){if(a=n[n.length-1],e[a]<f){t[r]=a,n.push(r);continue}for(i=0,s=n.length-1;i<s;)o=i+s>>1,e[n[o]]<f?i=o+1:s=o;f<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,s=n[i-1];i-- >0;)n[i]=s,s=t[s];return n}const Zf=e=>e.__isTeleport,Le=Symbol.for("v-fgt"),Qn=Symbol.for("v-txt"),qt=Symbol.for("v-cmt"),mr=Symbol.for("v-stc"),zt=[];let xe=null;function ec(e=!1){zt.push(xe=e?null:[])}function tc(){zt.pop(),xe=zt[zt.length-1]||null}let Xt=1;function fi(e){Xt+=e}function nc(e){return e.dynamicChildren=Xt>0?xe||bt:null,tc(),Xt>0&&xe&&xe.push(e),e}function rc(e,t,n,r,a,i){return nc(Ce(e,t,n,r,a,i,!0))}function Hr(e){return e?e.__v_isVNode===!0:!1}function Ft(e,t){return e.type===t.type&&e.key===t.key}const Zn="__vInternal",Ws=({key:e})=>e??null,Tn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?se(e)||fe(e)||j(e)?{i:ve,r:e,k:t,f:!!n}:e:null);function Ce(e,t=null,n=null,r=0,a=null,i=e===Le?0:1,s=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ws(t),ref:t&&Tn(t),scopeId:Jn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:ve};return o?(ga(l,n),i&128&&e.normalize(l)):n&&(l.shapeFlag|=se(n)?8:16),Xt>0&&!s&&xe&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&xe.push(l),l}const le=ac;function ac(e,t=null,n=null,r=0,a=null,i=!1){if((!e||e===Ff)&&(e=qt),Hr(e)){const o=At(e,t,!0);return n&&ga(o,n),Xt>0&&!i&&xe&&(o.shapeFlag&6?xe[xe.indexOf(e)]=o:xe.push(o)),o.patchFlag|=-2,o}if(gc(e)&&(e=e.__vccOpts),t){t=ic(t);let{class:o,style:l}=t;o&&!se(o)&&(t.class=ea(o)),J(l)&&(gs(l)&&!L(l)&&(l=ie({},l)),t.style=Kn(l))}const s=se(e)?1:_f(e)?128:Zf(e)?64:J(e)?4:j(e)?2:0;return Ce(e,t,n,r,a,s,i,!0)}function ic(e){return e?gs(e)||Zn in e?ie({},e):e:null}function At(e,t,n=!1){const{props:r,ref:a,patchFlag:i,children:s}=e,o=t?oc(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:o,key:o&&Ws(o),ref:t&&t.ref?n&&a?L(a)?a.concat(Tn(t)):[a,Tn(t)]:Tn(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Le?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&At(e.ssContent),ssFallback:e.ssFallback&&At(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function sc(e=" ",t=0){return le(Qn,null,e,t)}function Te(e){return e==null||typeof e=="boolean"?le(qt):L(e)?le(Le,null,e.slice()):typeof e=="object"?Ke(e):le(Qn,null,String(e))}function Ke(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:At(e)}function ga(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(L(t))n=16;else if(typeof t=="object")if(r&65){const a=t.default;a&&(a._c&&(a._d=!1),ga(e,a()),a._c&&(a._d=!0));return}else{n=32;const a=t._;!a&&!(Zn in t)?t._ctx=ve:a===3&&ve&&(ve.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else j(t)?(t={default:t,_ctx:ve},n=32):(t=String(t),r&64?(n=16,t=[sc(t)]):n=8);e.children=t,e.shapeFlag|=n}function oc(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const a in r)if(a==="class")t.class!==r.class&&(t.class=ea([t.class,r.class]));else if(a==="style")t.style=Kn([t.style,r.style]);else if(Un(a)){const i=t[a],s=r[a];s&&i!==s&&!(L(i)&&i.includes(s))&&(t[a]=i?[].concat(i,s):s)}else a!==""&&(t[a]=r[a])}return t}function Pe(e,t,n,r=null){Ae(e,t,7,[n,r])}const lc=Ls();let fc=0;function cc(e,t,n){const r=e.type,a=(t?t.appContext:e.appContext)||lc,i={uid:fc++,vnode:e,type:r,parent:t,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new Ol(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:js(r,a),emitsOptions:Es(r,a),emit:null,emitted:null,propsDefaults:q,inheritAttrs:r.inheritAttrs,ctx:q,data:q,props:q,attrs:q,slots:q,refs:q,setupState:q,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=df.bind(null,i),e.ce&&e.ce(i),i}let ae=null;const Bs=()=>ae||ve;let va,pt,ci="__VUE_INSTANCE_SETTERS__";(pt=kr()[ci])||(pt=kr()[ci]=[]),pt.push(e=>ae=e),va=e=>{pt.length>1?pt.forEach(t=>t(e)):pt[0](e)};const Ot=e=>{va(e),e.scope.on()},ft=()=>{ae&&ae.scope.off(),va(null)};function Ys(e){return e.vnode.shapeFlag&4}let Jt=!1;function uc(e,t=!1){Jt=t;const{props:n,children:r}=e.vnode,a=Ys(e);Yf(e,n,a,t),qf(e,r);const i=a?dc(e,t):void 0;return Jt=!1,i}function dc(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=vs(new Proxy(e.ctx,Lf));const{setup:r}=n;if(r){const a=e.setupContext=r.length>1?pc(e):null;Ot(e),Ct();const i=Xe(r,e,0,[e.props,a]);if(Tt(),ft(),es(i)){if(i.then(ft,ft),t)return i.then(s=>{ui(e,s,t)}).catch(s=>{qn(s,e,0)});e.asyncDep=i}else ui(e,i,t)}else Ks(e,t)}function ui(e,t,n){j(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:J(t)&&(e.setupState=_s(t)),Ks(e,n)}let di;function Ks(e,t,n){const r=e.type;if(!e.render){if(!t&&di&&!r.render){const a=r.template||pa(e).template;if(a){const{isCustomElement:i,compilerOptions:s}=e.appContext.config,{delimiters:o,compilerOptions:l}=r,f=ie(ie({isCustomElement:i,delimiters:o},s),l);r.render=di(a,f)}}e.render=r.render||ke}Ot(e),Ct(),Rf(e),Tt(),ft()}function mc(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return pe(e,"get","$attrs"),t[n]}}))}function pc(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return mc(e)},slots:e.slots,emit:e.emit,expose:t}}function ba(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(_s(vs(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in $t)return $t[n](e)},has(t,n){return n in t||n in $t}}))}function hc(e,t=!0){return j(e)?e.displayName||e.name:e.name||t&&e.__name}function gc(e){return j(e)&&"__vccOpts"in e}const Ve=(e,t)=>sf(e,t,Jt);function vc(e,t,n){const r=arguments.length;return r===2?J(t)&&!L(t)?Hr(t)?le(e,null,[t]):le(e,t):le(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Hr(n)&&(n=[n]),le(e,t,n))}const bc=Symbol.for("v-scx"),yc=()=>Dt(bc),Vs="3.3.4",_c="http://www.w3.org/2000/svg",it=typeof document<"u"?document:null,mi=it&&it.createElement("template"),xc={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const a=t?it.createElementNS(_c,e):it.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:e=>it.createTextNode(e),createComment:e=>it.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>it.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,a,i){const s=n?n.previousSibling:t.lastChild;if(a&&(a===i||a.nextSibling))for(;t.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{mi.innerHTML=r?`<svg>${e}</svg>`:e;const o=mi.content;if(r){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}t.insertBefore(o,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function wc(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function kc(e,t,n){const r=e.style,a=se(n);if(n&&!a){if(t&&!se(t))for(const i in t)n[i]==null&&Lr(r,i,"");for(const i in n)Lr(r,i,n[i])}else{const i=r.display;a?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=i)}}const pi=/\s*!important$/;function Lr(e,t,n){if(L(n))n.forEach(r=>Lr(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Ac(e,t);pi.test(n)?e.setProperty(Pt(r),n.replace(pi,""),"important"):e[r]=n}}const hi=["Webkit","Moz","ms"],pr={};function Ac(e,t){const n=pr[t];if(n)return n;let r=Me(t);if(r!=="filter"&&r in e)return pr[t]=r;r=Yn(r);for(let a=0;a<hi.length;a++){const i=hi[a]+r;if(i in e)return pr[t]=i}return t}const gi="http://www.w3.org/1999/xlink";function Oc(e,t,n,r,a){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(gi,t.slice(6,t.length)):e.setAttributeNS(gi,t,n);else{const i=kl(t);n==null||i&&!rs(n)?e.removeAttribute(t):e.setAttribute(t,i?"":n)}}function Ec(e,t,n,r,a,i,s){if(t==="innerHTML"||t==="textContent"){r&&s(r,a,i),e[t]=n??"";return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){e._value=n;const f=o==="OPTION"?e.getAttribute("value"):e.value,u=n??"";f!==u&&(e.value=u),n==null&&e.removeAttribute(t);return}let l=!1;if(n===""||n==null){const f=typeof e[t];f==="boolean"?n=rs(n):n==null&&f==="string"?(n="",l=!0):f==="number"&&(n=0,l=!0)}try{e[t]=n}catch{}l&&e.removeAttribute(t)}function Pc(e,t,n,r){e.addEventListener(t,n,r)}function Cc(e,t,n,r){e.removeEventListener(t,n,r)}function Tc(e,t,n,r,a=null){const i=e._vei||(e._vei={}),s=i[t];if(r&&s)s.value=r;else{const[o,l]=Ic(t);if(r){const f=i[t]=Nc(r,a);Pc(e,o,f,l)}else s&&(Cc(e,o,s,l),i[t]=void 0)}}const vi=/(?:Once|Passive|Capture)$/;function Ic(e){let t;if(vi.test(e)){t={};let r;for(;r=e.match(vi);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Pt(e.slice(2)),t]}let hr=0;const Sc=Promise.resolve(),Mc=()=>hr||(Sc.then(()=>hr=0),hr=Date.now());function Nc(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Ae(Fc(r,n.value),t,5,[r])};return n.value=e,n.attached=Mc(),n}function Fc(e,t){if(L(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>a=>!a._stopped&&r&&r(a))}else return t}const bi=/^on[a-z]/,Hc=(e,t,n,r,a=!1,i,s,o,l)=>{t==="class"?wc(e,r,a):t==="style"?kc(e,n,r):Un(t)?Jr(t)||Tc(e,t,n,r,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Lc(e,t,r,a))?Ec(e,t,r,i,s,o,l):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Oc(e,t,r,a))};function Lc(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&bi.test(t)&&j(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||bi.test(t)&&se(n)?!1:t in e}const Rc=ie({patchProp:Hc},xc);let yi;function jc(){return yi||(yi=Jf(Rc))}const $c=(...e)=>{const t=jc().createApp(...e),{mount:n}=t;return t.mount=r=>{const a=Dc(r);if(!a)return;const i=t._component;!j(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.innerHTML="";const s=n(a,!1,a instanceof SVGElement);return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),s},t};function Dc(e){return se(e)?document.querySelector(e):e}function zc(e){return typeof e=="function"?e():fa(e)}function Rn(e,t=""){if(e instanceof Promise)return e;const n=zc(e);return!e||!n?n:Array.isArray(n)?n.map(r=>Rn(r,t)):typeof n=="object"?Object.fromEntries(Object.entries(n).map(([r,a])=>r==="titleTemplate"||r.startsWith("on")?[r,fa(a)]:[r,Rn(a,r)])):n}const Uc=Vs.startsWith("3"),Wc=typeof window<"u",qs="usehead";function ya(){return Bs()&&Dt(qs)||tl()}function Bc(e){return{install(n){Uc&&(n.config.globalProperties.$unhead=e,n.config.globalProperties.$head=e,n.provide(qs,e))}}.install}function Yc(e={}){const t=fl({...e,domDelayFn:n=>setTimeout(()=>ws(()=>n()),10),plugins:[Kc(),...(e==null?void 0:e.plugins)||[]]});return t.install=Bc(t),t}function Kc(){return{hooks:{"entries:resolve":function(e){for(const t of e.entries)t.resolvedInput=Rn(t.input)}}}}function Vc(e,t={}){const n=ya(),r=Cr(!1),a=Cr({});wf(()=>{a.value=r.value?{}:Rn(e)});const i=n.push(a.value,t);return jt(a,o=>{i.patch(o)}),Bs()&&(ma(()=>{i.dispose()}),Is(()=>{r.value=!0}),Ts(()=>{r.value=!1})),i}function qc(e,t={}){return ya().push(e,t)}function Xc(e,t={}){var r;const n=ya();if(n){const a=Wc||!!((r=n.resolvedOptions)!=null&&r.document);return t.mode==="server"&&a||t.mode==="client"&&!a?void 0:a?Vc(e,t):qc(e,t)}}const Jc="/assets/lucas-santos-63626163.jpg";const Gc=(e,t)=>{const n=e.__vccOpts||e;for(const[r,a]of t)n[r]=a;return n},Qc=e=>(mf("data-v-04e3f97d"),e=e(),pf(),e),Zc=Qc(()=>Ce("img",{src:Jc,alt:"Lucas Santos' profile picture",title:"Lucas Santos' profile picture"},null,-1)),eu={class:"socials"},tu={href:"https://twitter.com/padilhadev",target:"_blank",alt:"Twitter Profile",title:"Twitter Profile"},nu={href:"https://instagram.com/padilha.dev",target:"_blank",alt:"Instagram Profile",title:"Instagram Profile"},ru={href:"https://linkedin.com/in/lucaspadilhadossantos/",target:"_blank",alt:"LinkedIn Profile",title:"LinkedIn Profile"},au={href:"https://github.com/lucaspadilha",target:"_blank",alt:"Github Profile",title:"Github Profile"},iu={href:"/lucas-santos-cv.pdf",target:"_blank",alt:"Download my CV",title:"Download my CV"},su={__name:"App",setup(e){const t=["Hello!","Olá!","Ciao!","Hola!"],n=Cr(null),r=Ve(()=>{var s;return((s=n.value)==null?void 0:s.length)??0});let a;const i=()=>{n.value===null||t.findIndex((s,o)=>n.value===s)===t.length-1?n.value=t.at(0):n.value=t.at(t.findIndex((s,o)=>n.value===s)+1)};return Ms(()=>{i(),a=setInterval(i,2e3)}),ma(()=>{clearInterval(a)}),Xc({title:"Lucas Santos - Full Stack Web Developer",meta:[{name:"description",content:"Lucas is a brazilian full stack web developer living in Sheffield, UK with near a decade of professional experience."}]}),(s,o)=>{const l=Nf("faIcon");return ec(),rc("main",null,[Ce("h1",{style:Kn({"--word-length":r.value})},Al(n.value),5),Zc,Ce("div",eu,[Ce("a",tu,[le(l,{class:"fa-2x",icon:"fa-brands fa-twitter"})]),Ce("a",nu,[le(l,{class:"fa-2x",icon:"fa-brands fa-instagram"})]),Ce("a",ru,[le(l,{class:"fa-2x",icon:"fa-brands fa-linkedin"})]),Ce("a",au,[le(l,{class:"fa-2x",icon:"fa-brands fa-github"})]),Ce("a",iu,[le(l,{class:"fa-2x",icon:"file-pdf"})])])])}}},ou=Gc(su,[["__scopeId","data-v-04e3f97d"]]);function _i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?_i(Object(n),!0).forEach(function(r){ne(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_i(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function jn(e){"@babel/helpers - typeof";return jn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},jn(e)}function lu(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function xi(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function fu(e,t,n){return t&&xi(e.prototype,t),n&&xi(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _a(e,t){return uu(e)||mu(e,t)||Xs(e,t)||hu()}function nn(e){return cu(e)||du(e)||Xs(e)||pu()}function cu(e){if(Array.isArray(e))return Rr(e)}function uu(e){if(Array.isArray(e))return e}function du(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function mu(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,s,o;try{for(n=n.call(e);!(a=(s=n.next()).done)&&(r.push(s.value),!(t&&r.length===t));a=!0);}catch(l){i=!0,o=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw o}}return r}}function Xs(e,t){if(e){if(typeof e=="string")return Rr(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Rr(e,t)}}function Rr(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function pu(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function hu(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var wi=function(){},xa={},Js={},Gs=null,Qs={mark:wi,measure:wi};try{typeof window<"u"&&(xa=window),typeof document<"u"&&(Js=document),typeof MutationObserver<"u"&&(Gs=MutationObserver),typeof performance<"u"&&(Qs=performance)}catch{}var gu=xa.navigator||{},ki=gu.userAgent,Ai=ki===void 0?"":ki,Ge=xa,V=Js,Oi=Gs,bn=Qs;Ge.document;var We=!!V.documentElement&&!!V.head&&typeof V.addEventListener=="function"&&typeof V.createElement=="function",Zs=~Ai.indexOf("MSIE")||~Ai.indexOf("Trident/"),yn,_n,xn,wn,kn,$e="___FONT_AWESOME___",jr=16,eo="fa",to="svg-inline--fa",ct="data-fa-i2svg",$r="data-fa-pseudo-element",vu="data-fa-pseudo-element-pending",wa="data-prefix",ka="data-icon",Ei="fontawesome-i2svg",bu="async",yu=["HTML","HEAD","STYLE","SCRIPT"],no=function(){try{return!0}catch{return!1}}(),K="classic",Z="sharp",Aa=[K,Z];function rn(e){return new Proxy(e,{get:function(n,r){return r in n?n[r]:n[K]}})}var Gt=rn((yn={},ne(yn,K,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),ne(yn,Z,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),yn)),Qt=rn((_n={},ne(_n,K,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),ne(_n,Z,{solid:"fass",regular:"fasr",light:"fasl"}),_n)),Zt=rn((xn={},ne(xn,K,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),ne(xn,Z,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),xn)),_u=rn((wn={},ne(wn,K,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),ne(wn,Z,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),wn)),xu=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,ro="fa-layers-text",wu=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,ku=rn((kn={},ne(kn,K,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),ne(kn,Z,{900:"fass",400:"fasr",300:"fasl"}),kn)),ao=[1,2,3,4,5,6,7,8,9,10],Au=ao.concat([11,12,13,14,15,16,17,18,19,20]),Ou=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],st={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},en=new Set;Object.keys(Qt[K]).map(en.add.bind(en));Object.keys(Qt[Z]).map(en.add.bind(en));var Eu=[].concat(Aa,nn(en),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",st.GROUP,st.SWAP_OPACITY,st.PRIMARY,st.SECONDARY]).concat(ao.map(function(e){return"".concat(e,"x")})).concat(Au.map(function(e){return"w-".concat(e)})),Ut=Ge.FontAwesomeConfig||{};function Pu(e){var t=V.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Cu(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(V&&typeof V.querySelector=="function"){var Tu=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Tu.forEach(function(e){var t=_a(e,2),n=t[0],r=t[1],a=Cu(Pu(n));a!=null&&(Ut[r]=a)})}var io={styleDefault:"solid",familyDefault:"classic",cssPrefix:eo,replacementClass:to,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};Ut.familyPrefix&&(Ut.cssPrefix=Ut.familyPrefix);var Et=C(C({},io),Ut);Et.autoReplaceSvg||(Et.observeMutations=!1);var S={};Object.keys(io).forEach(function(e){Object.defineProperty(S,e,{enumerable:!0,set:function(n){Et[e]=n,Wt.forEach(function(r){return r(S)})},get:function(){return Et[e]}})});Object.defineProperty(S,"familyPrefix",{enumerable:!0,set:function(t){Et.cssPrefix=t,Wt.forEach(function(n){return n(S)})},get:function(){return Et.cssPrefix}});Ge.FontAwesomeConfig=S;var Wt=[];function Iu(e){return Wt.push(e),function(){Wt.splice(Wt.indexOf(e),1)}}var Ye=jr,Se={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Su(e){if(!(!e||!We)){var t=V.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=V.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],s=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=i)}return V.head.insertBefore(t,r),e}}var Mu="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function tn(){for(var e=12,t="";e-- >0;)t+=Mu[Math.random()*62|0];return t}function It(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Oa(e){return e.classList?It(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function so(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Nu(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(so(e[n]),'" ')},"").trim()}function er(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function Ea(e){return e.size!==Se.size||e.x!==Se.x||e.y!==Se.y||e.rotate!==Se.rotate||e.flipX||e.flipY}function Fu(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),s="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),o="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(s," ").concat(o)},f={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:f}}function Hu(e){var t=e.transform,n=e.width,r=n===void 0?jr:n,a=e.height,i=a===void 0?jr:a,s=e.startCentered,o=s===void 0?!1:s,l="";return o&&Zs?l+="translate(".concat(t.x/Ye-r/2,"em, ").concat(t.y/Ye-i/2,"em) "):o?l+="translate(calc(-50% + ".concat(t.x/Ye,"em), calc(-50% + ").concat(t.y/Ye,"em)) "):l+="translate(".concat(t.x/Ye,"em, ").concat(t.y/Ye,"em) "),l+="scale(".concat(t.size/Ye*(t.flipX?-1:1),", ").concat(t.size/Ye*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var Lu=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function oo(){var e=eo,t=to,n=S.cssPrefix,r=S.replacementClass,a=Lu;if(n!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),s=new RegExp("\\--".concat(e,"\\-"),"g"),o=new RegExp("\\.".concat(t),"g");a=a.replace(i,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(o,".".concat(r))}return a}var Pi=!1;function gr(){S.autoAddCss&&!Pi&&(Su(oo()),Pi=!0)}var Ru={mixout:function(){return{dom:{css:oo,insertCss:gr}}},hooks:function(){return{beforeDOMElementCreation:function(){gr()},beforeI2svg:function(){gr()}}}},De=Ge||{};De[$e]||(De[$e]={});De[$e].styles||(De[$e].styles={});De[$e].hooks||(De[$e].hooks={});De[$e].shims||(De[$e].shims=[]);var we=De[$e],lo=[],ju=function e(){V.removeEventListener("DOMContentLoaded",e),$n=1,lo.map(function(t){return t()})},$n=!1;We&&($n=(V.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(V.readyState),$n||V.addEventListener("DOMContentLoaded",ju));function $u(e){We&&($n?setTimeout(e,0):lo.push(e))}function an(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,a=e.children,i=a===void 0?[]:a;return typeof e=="string"?so(e):"<".concat(t," ").concat(Nu(r),">").concat(i.map(an).join(""),"</").concat(t,">")}function Ci(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Du=function(t,n){return function(r,a,i,s){return t.call(n,r,a,i,s)}},vr=function(t,n,r,a){var i=Object.keys(t),s=i.length,o=a!==void 0?Du(n,a):n,l,f,u;for(r===void 0?(l=1,u=t[i[0]]):(l=0,u=r);l<s;l++)f=i[l],u=o(u,t[f],f,t);return u};function zu(e){for(var t=[],n=0,r=e.length;n<r;){var a=e.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=e.charCodeAt(n++);(i&64512)==56320?t.push(((a&1023)<<10)+(i&1023)+65536):(t.push(a),n--)}else t.push(a)}return t}function Dr(e){var t=zu(e);return t.length===1?t[0].toString(16):null}function Uu(e,t){var n=e.length,r=e.charCodeAt(t),a;return r>=55296&&r<=56319&&n>t+1&&(a=e.charCodeAt(t+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Ti(e){return Object.keys(e).reduce(function(t,n){var r=e[n],a=!!r.icon;return a?t[r.iconName]=r.icon:t[n]=r,t},{})}function zr(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=Ti(t);typeof we.hooks.addPack=="function"&&!a?we.hooks.addPack(e,Ti(t)):we.styles[e]=C(C({},we.styles[e]||{}),i),e==="fas"&&zr("fa",t)}var An,On,En,gt=we.styles,Wu=we.shims,Bu=(An={},ne(An,K,Object.values(Zt[K])),ne(An,Z,Object.values(Zt[Z])),An),Pa=null,fo={},co={},uo={},mo={},po={},Yu=(On={},ne(On,K,Object.keys(Gt[K])),ne(On,Z,Object.keys(Gt[Z])),On);function Ku(e){return~Eu.indexOf(e)}function Vu(e,t){var n=t.split("-"),r=n[0],a=n.slice(1).join("-");return r===e&&a!==""&&!Ku(a)?a:null}var ho=function(){var t=function(i){return vr(gt,function(s,o,l){return s[l]=vr(o,i,{}),s},{})};fo=t(function(a,i,s){if(i[3]&&(a[i[3]]=s),i[2]){var o=i[2].filter(function(l){return typeof l=="number"});o.forEach(function(l){a[l.toString(16)]=s})}return a}),co=t(function(a,i,s){if(a[s]=s,i[2]){var o=i[2].filter(function(l){return typeof l=="string"});o.forEach(function(l){a[l]=s})}return a}),po=t(function(a,i,s){var o=i[2];return a[s]=s,o.forEach(function(l){a[l]=s}),a});var n="far"in gt||S.autoFetchSvg,r=vr(Wu,function(a,i){var s=i[0],o=i[1],l=i[2];return o==="far"&&!n&&(o="fas"),typeof s=="string"&&(a.names[s]={prefix:o,iconName:l}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:o,iconName:l}),a},{names:{},unicodes:{}});uo=r.names,mo=r.unicodes,Pa=tr(S.styleDefault,{family:S.familyDefault})};Iu(function(e){Pa=tr(e.styleDefault,{family:S.familyDefault})});ho();function Ca(e,t){return(fo[e]||{})[t]}function qu(e,t){return(co[e]||{})[t]}function ot(e,t){return(po[e]||{})[t]}function go(e){return uo[e]||{prefix:null,iconName:null}}function Xu(e){var t=mo[e],n=Ca("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Qe(){return Pa}var Ta=function(){return{prefix:null,iconName:null,rest:[]}};function tr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,r=n===void 0?K:n,a=Gt[r][e],i=Qt[r][e]||Qt[r][a],s=e in we.styles?e:null;return i||s||null}var Ii=(En={},ne(En,K,Object.keys(Zt[K])),ne(En,Z,Object.keys(Zt[Z])),En);function nr(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(t={},ne(t,K,"".concat(S.cssPrefix,"-").concat(K)),ne(t,Z,"".concat(S.cssPrefix,"-").concat(Z)),t),s=null,o=K;(e.includes(i[K])||e.some(function(f){return Ii[K].includes(f)}))&&(o=K),(e.includes(i[Z])||e.some(function(f){return Ii[Z].includes(f)}))&&(o=Z);var l=e.reduce(function(f,u){var m=Vu(S.cssPrefix,u);if(gt[u]?(u=Bu[o].includes(u)?_u[o][u]:u,s=u,f.prefix=u):Yu[o].indexOf(u)>-1?(s=u,f.prefix=tr(u,{family:o})):m?f.iconName=m:u!==S.replacementClass&&u!==i[K]&&u!==i[Z]&&f.rest.push(u),!a&&f.prefix&&f.iconName){var v=s==="fa"?go(f.iconName):{},E=ot(f.prefix,f.iconName);v.prefix&&(s=null),f.iconName=v.iconName||E||f.iconName,f.prefix=v.prefix||f.prefix,f.prefix==="far"&&!gt.far&&gt.fas&&!S.autoFetchSvg&&(f.prefix="fas")}return f},Ta());return(e.includes("fa-brands")||e.includes("fab"))&&(l.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(l.prefix="fad"),!l.prefix&&o===Z&&(gt.fass||S.autoFetchSvg)&&(l.prefix="fass",l.iconName=ot(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||s==="fa")&&(l.prefix=Qe()||"fas"),l}var Ju=function(){function e(){lu(this,e),this.definitions={}}return fu(e,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var s=a.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(o){n.definitions[o]=C(C({},n.definitions[o]||{}),s[o]),zr(o,s[o]);var l=Zt[K][o];l&&zr(l,s[o]),ho()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var s=a[i],o=s.prefix,l=s.iconName,f=s.icon,u=f[2];n[o]||(n[o]={}),u.length>0&&u.forEach(function(m){typeof m=="string"&&(n[o][m]=f)}),n[o][l]=f}),n}}]),e}(),Si=[],vt={},wt={},Gu=Object.keys(wt);function Qu(e,t){var n=t.mixoutsTo;return Si=e,vt={},Object.keys(wt).forEach(function(r){Gu.indexOf(r)===-1&&delete wt[r]}),Si.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(s){typeof a[s]=="function"&&(n[s]=a[s]),jn(a[s])==="object"&&Object.keys(a[s]).forEach(function(o){n[s]||(n[s]={}),n[s][o]=a[s][o]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(s){vt[s]||(vt[s]=[]),vt[s].push(i[s])})}r.provides&&r.provides(wt)}),n}function Ur(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=vt[e]||[];return i.forEach(function(s){t=s.apply(null,[t].concat(r))}),t}function ut(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=vt[e]||[];a.forEach(function(i){i.apply(null,n)})}function ze(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return wt[e]?wt[e].apply(null,t):void 0}function Wr(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||Qe();if(t)return t=ot(n,t)||t,Ci(vo.definitions,n,t)||Ci(we.styles,n,t)}var vo=new Ju,Zu=function(){S.autoReplaceSvg=!1,S.observeMutations=!1,ut("noAuto")},ed={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return We?(ut("beforeI2svg",t),ze("pseudoElements2svg",t),ze("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;S.autoReplaceSvg===!1&&(S.autoReplaceSvg=!0),S.observeMutations=!0,$u(function(){nd({autoReplaceSvgRoot:n}),ut("watch",t)})}},td={icon:function(t){if(t===null)return null;if(jn(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:ot(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=tr(t[0]);return{prefix:r,iconName:ot(r,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(S.cssPrefix,"-"))>-1||t.match(xu))){var a=nr(t.split(" "),{skipLookups:!0});return{prefix:a.prefix||Qe(),iconName:ot(a.prefix,a.iconName)||a.iconName}}if(typeof t=="string"){var i=Qe();return{prefix:i,iconName:ot(i,t)||t}}}},ge={noAuto:Zu,config:S,dom:ed,parse:td,library:vo,findIconDefinition:Wr,toHtml:an},nd=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,r=n===void 0?V:n;(Object.keys(we.styles).length>0||S.autoFetchSvg)&&We&&S.autoReplaceSvg&&ge.dom.i2svg({node:r})};function rr(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return an(r)})}}),Object.defineProperty(e,"node",{get:function(){if(We){var r=V.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function rd(e){var t=e.children,n=e.main,r=e.mask,a=e.attributes,i=e.styles,s=e.transform;if(Ea(s)&&n.found&&!r.found){var o=n.width,l=n.height,f={x:o/l/2,y:.5};a.style=er(C(C({},i),{},{"transform-origin":"".concat(f.x+s.x/16,"em ").concat(f.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:t}]}function ad(e){var t=e.prefix,n=e.iconName,r=e.children,a=e.attributes,i=e.symbol,s=i===!0?"".concat(t,"-").concat(S.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:C(C({},a),{},{id:s}),children:r}]}]}function Ia(e){var t=e.icons,n=t.main,r=t.mask,a=e.prefix,i=e.iconName,s=e.transform,o=e.symbol,l=e.title,f=e.maskId,u=e.titleId,m=e.extra,v=e.watchable,E=v===void 0?!1:v,_=r.found?r:n,w=_.width,R=_.height,A=a==="fak",y=[S.replacementClass,i?"".concat(S.cssPrefix,"-").concat(i):""].filter(function(ee){return m.classes.indexOf(ee)===-1}).filter(function(ee){return ee!==""||!!ee}).concat(m.classes).join(" "),F={children:[],attributes:C(C({},m.attributes),{},{"data-prefix":a,"data-icon":i,class:y,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(w," ").concat(R)})},T=A&&!~m.classes.indexOf("fa-fw")?{width:"".concat(w/R*16*.0625,"em")}:{};E&&(F.attributes[ct]=""),l&&(F.children.push({tag:"title",attributes:{id:F.attributes["aria-labelledby"]||"title-".concat(u||tn())},children:[l]}),delete F.attributes.title);var z=C(C({},F),{},{prefix:a,iconName:i,main:n,mask:r,maskId:f,transform:s,symbol:o,styles:C(C({},T),m.styles)}),re=r.found&&n.found?ze("generateAbstractMask",z)||{children:[],attributes:{}}:ze("generateAbstractIcon",z)||{children:[],attributes:{}},G=re.children,X=re.attributes;return z.children=G,z.attributes=X,o?ad(z):rd(z)}function Mi(e){var t=e.content,n=e.width,r=e.height,a=e.transform,i=e.title,s=e.extra,o=e.watchable,l=o===void 0?!1:o,f=C(C(C({},s.attributes),i?{title:i}:{}),{},{class:s.classes.join(" ")});l&&(f[ct]="");var u=C({},s.styles);Ea(a)&&(u.transform=Hu({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var m=er(u);m.length>0&&(f.style=m);var v=[];return v.push({tag:"span",attributes:f,children:[t]}),i&&v.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),v}function id(e){var t=e.content,n=e.title,r=e.extra,a=C(C(C({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=er(r.styles);i.length>0&&(a.style=i);var s=[];return s.push({tag:"span",attributes:a,children:[t]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}var br=we.styles;function Br(e){var t=e[0],n=e[1],r=e.slice(4),a=_a(r,1),i=a[0],s=null;return Array.isArray(i)?s={tag:"g",attributes:{class:"".concat(S.cssPrefix,"-").concat(st.GROUP)},children:[{tag:"path",attributes:{class:"".concat(S.cssPrefix,"-").concat(st.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(S.cssPrefix,"-").concat(st.PRIMARY),fill:"currentColor",d:i[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:n,icon:s}}var sd={found:!1,width:512,height:512};function od(e,t){!no&&!S.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Yr(e,t){var n=t;return t==="fa"&&S.styleDefault!==null&&(t=Qe()),new Promise(function(r,a){if(ze("missingIconAbstract"),n==="fa"){var i=go(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&br[t]&&br[t][e]){var s=br[t][e];return r(Br(s))}od(e,t),r(C(C({},sd),{},{icon:S.showMissingIcons&&e?ze("missingIconAbstract")||{}:{}}))})}var Ni=function(){},Kr=S.measurePerformance&&bn&&bn.mark&&bn.measure?bn:{mark:Ni,measure:Ni},Rt='FA "6.4.0"',ld=function(t){return Kr.mark("".concat(Rt," ").concat(t," begins")),function(){return bo(t)}},bo=function(t){Kr.mark("".concat(Rt," ").concat(t," ends")),Kr.measure("".concat(Rt," ").concat(t),"".concat(Rt," ").concat(t," begins"),"".concat(Rt," ").concat(t," ends"))},Sa={begin:ld,end:bo},In=function(){};function Fi(e){var t=e.getAttribute?e.getAttribute(ct):null;return typeof t=="string"}function fd(e){var t=e.getAttribute?e.getAttribute(wa):null,n=e.getAttribute?e.getAttribute(ka):null;return t&&n}function cd(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(S.replacementClass)}function ud(){if(S.autoReplaceSvg===!0)return Sn.replace;var e=Sn[S.autoReplaceSvg];return e||Sn.replace}function dd(e){return V.createElementNS("http://www.w3.org/2000/svg",e)}function md(e){return V.createElement(e)}function yo(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,r=n===void 0?e.tag==="svg"?dd:md:n;if(typeof e=="string")return V.createTextNode(e);var a=r(e.tag);Object.keys(e.attributes||[]).forEach(function(s){a.setAttribute(s,e.attributes[s])});var i=e.children||[];return i.forEach(function(s){a.appendChild(yo(s,{ceFn:r}))}),a}function pd(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Sn={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(a){n.parentNode.insertBefore(yo(a),n)}),n.getAttribute(ct)===null&&S.keepOriginalSource){var r=V.createComment(pd(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(t){var n=t[0],r=t[1];if(~Oa(n).indexOf(S.replacementClass))return Sn.replace(t);var a=new RegExp("".concat(S.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(o,l){return l===S.replacementClass||l.match(a)?o.toSvg.push(l):o.toNode.push(l),o},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var s=r.map(function(o){return an(o)}).join(`
`);n.setAttribute(ct,""),n.innerHTML=s}};function Hi(e){e()}function _o(e,t){var n=typeof t=="function"?t:In;if(e.length===0)n();else{var r=Hi;S.mutateApproach===bu&&(r=Ge.requestAnimationFrame||Hi),r(function(){var a=ud(),i=Sa.begin("mutate");e.map(a),i(),n()})}}var Ma=!1;function xo(){Ma=!0}function Vr(){Ma=!1}var Dn=null;function Li(e){if(Oi&&S.observeMutations){var t=e.treeCallback,n=t===void 0?In:t,r=e.nodeCallback,a=r===void 0?In:r,i=e.pseudoElementsCallback,s=i===void 0?In:i,o=e.observeMutationsRoot,l=o===void 0?V:o;Dn=new Oi(function(f){if(!Ma){var u=Qe();It(f).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!Fi(m.addedNodes[0])&&(S.searchPseudoElements&&s(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&S.searchPseudoElements&&s(m.target.parentNode),m.type==="attributes"&&Fi(m.target)&&~Ou.indexOf(m.attributeName))if(m.attributeName==="class"&&fd(m.target)){var v=nr(Oa(m.target)),E=v.prefix,_=v.iconName;m.target.setAttribute(wa,E||u),_&&m.target.setAttribute(ka,_)}else cd(m.target)&&a(m.target)})}}),We&&Dn.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function hd(){Dn&&Dn.disconnect()}function gd(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(r,a){var i=a.split(":"),s=i[0],o=i.slice(1);return s&&o.length>0&&(r[s]=o.join(":").trim()),r},{})),n}function vd(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",a=nr(Oa(e));return a.prefix||(a.prefix=Qe()),t&&n&&(a.prefix=t,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=qu(a.prefix,e.innerText)||Ca(a.prefix,Dr(e.innerText))),!a.iconName&&S.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=e.firstChild.data)),a}function bd(e){var t=It(e.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return S.autoA11y&&(n?t["aria-labelledby"]="".concat(S.replacementClass,"-title-").concat(r||tn()):(t["aria-hidden"]="true",t.focusable="false")),t}function yd(){return{iconName:null,title:null,titleId:null,prefix:null,transform:Se,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ri(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=vd(e),r=n.iconName,a=n.prefix,i=n.rest,s=bd(e),o=Ur("parseNodeAttributes",{},e),l=t.styleParser?gd(e):[];return C({iconName:r,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:Se,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:s}},o)}var _d=we.styles;function wo(e){var t=S.autoReplaceSvg==="nest"?Ri(e,{styleParser:!1}):Ri(e);return~t.extra.classes.indexOf(ro)?ze("generateLayersText",e,t):ze("generateSvgReplacementMutation",e,t)}var Ze=new Set;Aa.map(function(e){Ze.add("fa-".concat(e))});Object.keys(Gt[K]).map(Ze.add.bind(Ze));Object.keys(Gt[Z]).map(Ze.add.bind(Ze));Ze=nn(Ze);function ji(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!We)return Promise.resolve();var n=V.documentElement.classList,r=function(m){return n.add("".concat(Ei,"-").concat(m))},a=function(m){return n.remove("".concat(Ei,"-").concat(m))},i=S.autoFetchSvg?Ze:Aa.map(function(u){return"fa-".concat(u)}).concat(Object.keys(_d));i.includes("fa")||i.push("fa");var s=[".".concat(ro,":not([").concat(ct,"])")].concat(i.map(function(u){return".".concat(u,":not([").concat(ct,"])")})).join(", ");if(s.length===0)return Promise.resolve();var o=[];try{o=It(e.querySelectorAll(s))}catch{}if(o.length>0)r("pending"),a("complete");else return Promise.resolve();var l=Sa.begin("onTree"),f=o.reduce(function(u,m){try{var v=wo(m);v&&u.push(v)}catch(E){no||E.name==="MissingIcon"&&console.error(E)}return u},[]);return new Promise(function(u,m){Promise.all(f).then(function(v){_o(v,function(){r("active"),r("complete"),a("pending"),typeof t=="function"&&t(),l(),u()})}).catch(function(v){l(),m(v)})})}function xd(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;wo(e).then(function(n){n&&_o([n],t)})}function wd(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Wr(t||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Wr(a||{})),e(r,C(C({},n),{},{mask:a}))}}var kd=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?Se:r,i=n.symbol,s=i===void 0?!1:i,o=n.mask,l=o===void 0?null:o,f=n.maskId,u=f===void 0?null:f,m=n.title,v=m===void 0?null:m,E=n.titleId,_=E===void 0?null:E,w=n.classes,R=w===void 0?[]:w,A=n.attributes,y=A===void 0?{}:A,F=n.styles,T=F===void 0?{}:F;if(t){var z=t.prefix,re=t.iconName,G=t.icon;return rr(C({type:"icon"},t),function(){return ut("beforeDOMElementCreation",{iconDefinition:t,params:n}),S.autoA11y&&(v?y["aria-labelledby"]="".concat(S.replacementClass,"-title-").concat(_||tn()):(y["aria-hidden"]="true",y.focusable="false")),Ia({icons:{main:Br(G),mask:l?Br(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:z,iconName:re,transform:C(C({},Se),a),symbol:s,title:v,maskId:u,titleId:_,extra:{attributes:y,styles:T,classes:R}})})}},Ad={mixout:function(){return{icon:wd(kd)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=ji,n.nodeCallback=xd,n}}},provides:function(t){t.i2svg=function(n){var r=n.node,a=r===void 0?V:r,i=n.callback,s=i===void 0?function(){}:i;return ji(a,s)},t.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,s=r.titleId,o=r.prefix,l=r.transform,f=r.symbol,u=r.mask,m=r.maskId,v=r.extra;return new Promise(function(E,_){Promise.all([Yr(a,o),u.iconName?Yr(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(w){var R=_a(w,2),A=R[0],y=R[1];E([n,Ia({icons:{main:A,mask:y},prefix:o,iconName:a,transform:l,symbol:f,maskId:m,title:i,titleId:s,extra:v,watchable:!0})])}).catch(_)})},t.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.transform,o=n.styles,l=er(o);l.length>0&&(a.style=l);var f;return Ea(s)&&(f=ze("generateAbstractTransformGrouping",{main:i,transform:s,containerWidth:i.width,iconWidth:i.width})),r.push(f||i.icon),{children:r,attributes:a}}}},Od={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return rr({type:"layer"},function(){ut("beforeDOMElementCreation",{assembler:n,params:r});var s=[];return n(function(o){Array.isArray(o)?o.map(function(l){s=s.concat(l.abstract)}):s=s.concat(o.abstract)}),[{tag:"span",attributes:{class:["".concat(S.cssPrefix,"-layers")].concat(nn(i)).join(" ")},children:s}]})}}}},Ed={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,s=r.classes,o=s===void 0?[]:s,l=r.attributes,f=l===void 0?{}:l,u=r.styles,m=u===void 0?{}:u;return rr({type:"counter",content:n},function(){return ut("beforeDOMElementCreation",{content:n,params:r}),id({content:n.toString(),title:i,extra:{attributes:f,styles:m,classes:["".concat(S.cssPrefix,"-layers-counter")].concat(nn(o))}})})}}}},Pd={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?Se:a,s=r.title,o=s===void 0?null:s,l=r.classes,f=l===void 0?[]:l,u=r.attributes,m=u===void 0?{}:u,v=r.styles,E=v===void 0?{}:v;return rr({type:"text",content:n},function(){return ut("beforeDOMElementCreation",{content:n,params:r}),Mi({content:n,transform:C(C({},Se),i),title:o,extra:{attributes:m,styles:E,classes:["".concat(S.cssPrefix,"-layers-text")].concat(nn(f))}})})}}},provides:function(t){t.generateLayersText=function(n,r){var a=r.title,i=r.transform,s=r.extra,o=null,l=null;if(Zs){var f=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();o=u.width/f,l=u.height/f}return S.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([n,Mi({content:n.innerHTML,width:o,height:l,transform:i,title:a,extra:s,watchable:!0})])}}},Cd=new RegExp('"',"ug"),$i=[1105920,1112319];function Td(e){var t=e.replace(Cd,""),n=Uu(t,0),r=n>=$i[0]&&n<=$i[1],a=t.length===2?t[0]===t[1]:!1;return{value:Dr(a?t[0]:t),isSecondary:r||a}}function Di(e,t){var n="".concat(vu).concat(t.replace(":","-"));return new Promise(function(r,a){if(e.getAttribute(n)!==null)return r();var i=It(e.children),s=i.filter(function(G){return G.getAttribute($r)===t})[0],o=Ge.getComputedStyle(e,t),l=o.getPropertyValue("font-family").match(wu),f=o.getPropertyValue("font-weight"),u=o.getPropertyValue("content");if(s&&!l)return e.removeChild(s),r();if(l&&u!=="none"&&u!==""){var m=o.getPropertyValue("content"),v=~["Sharp"].indexOf(l[2])?Z:K,E=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?Qt[v][l[2].toLowerCase()]:ku[v][f],_=Td(m),w=_.value,R=_.isSecondary,A=l[0].startsWith("FontAwesome"),y=Ca(E,w),F=y;if(A){var T=Xu(w);T.iconName&&T.prefix&&(y=T.iconName,E=T.prefix)}if(y&&!R&&(!s||s.getAttribute(wa)!==E||s.getAttribute(ka)!==F)){e.setAttribute(n,F),s&&e.removeChild(s);var z=yd(),re=z.extra;re.attributes[$r]=t,Yr(y,E).then(function(G){var X=Ia(C(C({},z),{},{icons:{main:G,mask:Ta()},prefix:E,iconName:F,extra:re,watchable:!0})),ee=V.createElement("svg");t==="::before"?e.insertBefore(ee,e.firstChild):e.appendChild(ee),ee.outerHTML=X.map(function(Ne){return an(Ne)}).join(`
`),e.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Id(e){return Promise.all([Di(e,"::before"),Di(e,"::after")])}function Sd(e){return e.parentNode!==document.head&&!~yu.indexOf(e.tagName.toUpperCase())&&!e.getAttribute($r)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function zi(e){if(We)return new Promise(function(t,n){var r=It(e.querySelectorAll("*")).filter(Sd).map(Id),a=Sa.begin("searchPseudoElements");xo(),Promise.all(r).then(function(){a(),Vr(),t()}).catch(function(){a(),Vr(),n()})})}var Md={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=zi,n}}},provides:function(t){t.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?V:r;S.searchPseudoElements&&zi(a)}}},Ui=!1,Nd={mixout:function(){return{dom:{unwatch:function(){xo(),Ui=!0}}}},hooks:function(){return{bootstrap:function(){Li(Ur("mutationObserverCallbacks",{}))},noAuto:function(){hd()},watch:function(n){var r=n.observeMutationsRoot;Ui?Vr():Li(Ur("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Wi=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),s=i[0],o=i.slice(1).join("-");if(s&&o==="h")return r.flipX=!0,r;if(s&&o==="v")return r.flipY=!0,r;if(o=parseFloat(o),isNaN(o))return r;switch(s){case"grow":r.size=r.size+o;break;case"shrink":r.size=r.size-o;break;case"left":r.x=r.x-o;break;case"right":r.x=r.x+o;break;case"up":r.y=r.y-o;break;case"down":r.y=r.y+o;break;case"rotate":r.rotate=r.rotate+o;break}return r},n)},Fd={mixout:function(){return{parse:{transform:function(n){return Wi(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=Wi(a)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,s=n.iconWidth,o={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),f="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(l," ").concat(f," ").concat(u)},v={transform:"translate(".concat(s/2*-1," -256)")},E={outer:o,inner:m,path:v};return{tag:"g",attributes:C({},E.outer),children:[{tag:"g",attributes:C({},E.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:C(C({},r.icon.attributes),E.path)}]}]}}}},yr={x:0,y:0,width:"100%",height:"100%"};function Bi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Hd(e){return e.tag==="g"?e.children:[e]}var Ld={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?nr(a.split(" ").map(function(s){return s.trim()})):Ta();return i.prefix||(i.prefix=Qe()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.mask,o=n.maskId,l=n.transform,f=i.width,u=i.icon,m=s.width,v=s.icon,E=Fu({transform:l,containerWidth:m,iconWidth:f}),_={tag:"rect",attributes:C(C({},yr),{},{fill:"white"})},w=u.children?{children:u.children.map(Bi)}:{},R={tag:"g",attributes:C({},E.inner),children:[Bi(C({tag:u.tag,attributes:C(C({},u.attributes),E.path)},w))]},A={tag:"g",attributes:C({},E.outer),children:[R]},y="mask-".concat(o||tn()),F="clip-".concat(o||tn()),T={tag:"mask",attributes:C(C({},yr),{},{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[_,A]},z={tag:"defs",children:[{tag:"clipPath",attributes:{id:F},children:Hd(v)},T]};return r.push(z,{tag:"rect",attributes:C({fill:"currentColor","clip-path":"url(#".concat(F,")"),mask:"url(#".concat(y,")")},yr)}),{children:r,attributes:a}}}},Rd={provides:function(t){var n=!1;Ge.matchMedia&&(n=Ge.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:C(C({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=C(C({},i),{},{attributeName:"opacity"}),o={tag:"circle",attributes:C(C({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||o.children.push({tag:"animate",attributes:C(C({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:C(C({},s),{},{values:"1;0;1;1;0;1;"})}),r.push(o),r.push({tag:"path",attributes:C(C({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:C(C({},s),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:C(C({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:C(C({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},jd={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},$d=[Ru,Ad,Od,Ed,Pd,Md,Nd,Fd,Ld,Rd,jd];Qu($d,{mixoutsTo:ge});ge.noAuto;ge.config;var Dd=ge.library;ge.dom;var qr=ge.parse;ge.findIconDefinition;ge.toHtml;var zd=ge.icon;ge.layer;ge.text;ge.counter;function Yi(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function Re(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Yi(Object(n),!0).forEach(function(r){de(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Yi(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function zn(e){"@babel/helpers - typeof";return zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},zn(e)}function de(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ud(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,i;for(i=0;i<r.length;i++)a=r[i],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Wd(e,t){if(e==null)return{};var n=Ud(e,t),r,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var Bd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ko={exports:{}};(function(e){(function(t){var n=function(A,y,F){if(!f(y)||m(y)||v(y)||E(y)||l(y))return y;var T,z=0,re=0;if(u(y))for(T=[],re=y.length;z<re;z++)T.push(n(A,y[z],F));else{T={};for(var G in y)Object.prototype.hasOwnProperty.call(y,G)&&(T[A(G,F)]=n(A,y[G],F))}return T},r=function(A,y){y=y||{};var F=y.separator||"_",T=y.split||/(?=[A-Z])/;return A.split(T).join(F)},a=function(A){return _(A)?A:(A=A.replace(/[\-_\s]+(.)?/g,function(y,F){return F?F.toUpperCase():""}),A.substr(0,1).toLowerCase()+A.substr(1))},i=function(A){var y=a(A);return y.substr(0,1).toUpperCase()+y.substr(1)},s=function(A,y){return r(A,y).toLowerCase()},o=Object.prototype.toString,l=function(A){return typeof A=="function"},f=function(A){return A===Object(A)},u=function(A){return o.call(A)=="[object Array]"},m=function(A){return o.call(A)=="[object Date]"},v=function(A){return o.call(A)=="[object RegExp]"},E=function(A){return o.call(A)=="[object Boolean]"},_=function(A){return A=A-0,A===A},w=function(A,y){var F=y&&"process"in y?y.process:y;return typeof F!="function"?A:function(T,z){return F(T,A,z)}},R={camelize:a,decamelize:s,pascalize:i,depascalize:s,camelizeKeys:function(A,y){return n(w(a,y),A)},decamelizeKeys:function(A,y){return n(w(s,y),A,y)},pascalizeKeys:function(A,y){return n(w(i,y),A)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=R:t.humps=R})(Bd)})(ko);var Yd=ko.exports,Kd=["class","style"];function Vd(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var r=n.indexOf(":"),a=Yd.camelize(n.slice(0,r)),i=n.slice(r+1).trim();return t[a]=i,t},{})}function qd(e){return e.split(/\s+/).reduce(function(t,n){return t[n]=!0,t},{})}function Ao(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var r=(e.children||[]).map(function(l){return Ao(l)}),a=Object.keys(e.attributes||{}).reduce(function(l,f){var u=e.attributes[f];switch(f){case"class":l.class=qd(u);break;case"style":l.style=Vd(u);break;default:l.attrs[f]=u}return l},{attrs:{},class:{},style:{}});n.class;var i=n.style,s=i===void 0?{}:i,o=Wd(n,Kd);return vc(e.tag,Re(Re(Re({},t),{},{class:a.class,style:Re(Re({},a.style),s)},a.attrs),o),r)}var Oo=!1;try{Oo=!0}catch{}function Xd(){if(!Oo&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function _r(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?de({},e,t):{}}function Jd(e){var t,n=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},de(t,"fa-".concat(e.size),e.size!==null),de(t,"fa-rotate-".concat(e.rotation),e.rotation!==null),de(t,"fa-pull-".concat(e.pull),e.pull!==null),de(t,"fa-swap-opacity",e.swapOpacity),de(t,"fa-bounce",e.bounce),de(t,"fa-shake",e.shake),de(t,"fa-beat",e.beat),de(t,"fa-fade",e.fade),de(t,"fa-beat-fade",e.beatFade),de(t,"fa-flash",e.flash),de(t,"fa-spin-pulse",e.spinPulse),de(t,"fa-spin-reverse",e.spinReverse),t);return Object.keys(n).map(function(r){return n[r]?r:null}).filter(function(r){return r})}function Ki(e){if(e&&zn(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(qr.icon)return qr.icon(e);if(e===null)return null;if(zn(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var Gd=Af({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(t,n){var r=n.attrs,a=Ve(function(){return Ki(t.icon)}),i=Ve(function(){return _r("classes",Jd(t))}),s=Ve(function(){return _r("transform",typeof t.transform=="string"?qr.transform(t.transform):t.transform)}),o=Ve(function(){return _r("mask",Ki(t.mask))}),l=Ve(function(){return zd(a.value,Re(Re(Re(Re({},i.value),s.value),o.value),{},{symbol:t.symbol,title:t.title}))});jt(l,function(u){if(!u)return Xd("Could not find one or more icon(s)",a.value,o.value)},{immediate:!0});var f=Ve(function(){return l.value?Ao(l.value.abstract[0],{},r):null});return function(){return f.value}}}),Qd={prefix:"fab",iconName:"linkedin",icon:[448,512,[],"f08c","M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"]},Zd={prefix:"fab",iconName:"instagram",icon:[448,512,[],"f16d","M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]},em={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]},tm={prefix:"fab",iconName:"twitter",icon:[512,512,[],"f099","M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"]},nm={prefix:"fas",iconName:"file-pdf",icon:[512,512,[],"f1c1","M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z"]};Dd.add(tm,Zd,Qd,em,nm);const Na=$c(ou);Na.use(Yc());Na.component("faIcon",Gd);Na.mount("#app");
