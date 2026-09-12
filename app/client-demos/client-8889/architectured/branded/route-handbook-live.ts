import { GET as getOptimized } from "../optimized/route"
import { BOBA_PROJECT_IMAGE } from "./project-image-boba"
import { RESTAURANT_PROJECT_IMAGE } from "./project-image-restaurant"
import { COMMERCIAL_PROJECT_IMAGE } from "./project-image-commercial"
import { HANDBOOK_SPRITE_1 as HANDBOOK_SPRITE } from "./handbook-sprite-1"

export const dynamic = "force-dynamic"
export const revalidate = 0

const PROJECT_IMAGE_RUNTIME = String.raw`<script id="nguyen-project-image-runtime">
(()=>{
const P=[
{t:['Skyline Corporate Hub','Boba Shops & Cafés','Boba Shops & Cafes'],s:'${BOBA_PROJECT_IMAGE}'},
{t:['LuxeHaven Villa','Restaurants'],s:'${RESTAURANT_PROJECT_IMAGE}'},
{t:['Celestial Towers Condominiums','New Commercial Buildings'],s:'${COMMERCIAL_PROJECT_IMAGE}'}
];
const n=v=>(v||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
function root(e){if(!(e instanceof HTMLElement))return null;const a=e.closest('a');if(a&&a.querySelector('img'))return a;let x=e.parentElement;for(let i=0;x&&i<9;i++,x=x.parentElement){if(!x.querySelector('img'))continue;const r=x.getBoundingClientRect();if(r.width>Math.max(innerWidth,320)*.95&&i>4)continue;return x}return null}
function run(){const es=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,div')];P.forEach(p=>{const w=p.t.map(n),cs=new Set;es.forEach(e=>{if(!w.includes(n(e.textContent)))return;const c=root(e);if(c)cs.add(c)});cs.forEach(c=>{const a=[...c.querySelectorAll('img')].sort((x,y)=>(y.getBoundingClientRect().width*y.getBoundingClientRect().height)-(x.getBoundingClientRect().width*x.getBoundingClientRect().height));const im=a[0];if(!(im instanceof HTMLImageElement))return;im.src=p.s;im.srcset=p.s})})}
let q=false;const s=()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;run()})};new MutationObserver(s).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src','srcset']});run();addEventListener('load',s,{once:true});addEventListener('resize',s,{passive:true});[50,150,400,900,1800,3500].forEach(d=>setTimeout(s,d));
})();
</script>`

const HANDBOOK_RUNTIME = String.raw`<style id="nguyen-live-handbook-css">
[data-td-nguyen-handbook-host="true"]{position:relative!important;box-sizing:border-box!important;width:100%!important;max-width:none!important;min-height:clamp(720px,73vw,980px)!important;margin:0!important;padding:clamp(48px,5vw,74px) clamp(14px,3vw,44px) clamp(40px,5vw,66px)!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;background:radial-gradient(circle at 50% 36%,rgba(56,52,47,.58),transparent 40%),linear-gradient(180deg,#211f1c 0%,#191816 100%)!important}
[data-td-nguyen-handbook-host="true"]>:not([data-td-nguyen-handbook="true"]){display:none!important;visibility:hidden!important;pointer-events:none!important}
[data-td-nguyen-handbook="true"]{position:relative!important;z-index:1000!important;width:min(1240px,96vw)!important;margin:0 auto!important;color:#f5f1ea!important;font-family:Arial,Helvetica,sans-serif!important;visibility:visible!important;opacity:1!important}
.td-hb-intro{max-width:780px!important;margin:0 auto clamp(22px,3vw,34px)!important;text-align:center!important}
.td-hb-eyebrow{margin-bottom:15px!important;color:#dc914c!important;font:600 12px/1.2 Arial,Helvetica,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important}
.td-hb-title{margin:0 0 15px!important;color:#f7f4ef!important;font:400 clamp(42px,5.2vw,70px)/1 Georgia,"Times New Roman",serif!important;letter-spacing:-.03em!important}
.td-hb-sub{max-width:590px!important;margin:0 auto!important;color:#b5afa7!important;font:400 15px/1.55 Arial,Helvetica,sans-serif!important}
.td-hb-stage{position:relative!important;display:grid!important;grid-template-columns:58px minmax(0,1fr) 58px!important;gap:clamp(18px,2.2vw,34px)!important;align-items:center!important;width:100%!important}
.td-hb-wrap{min-width:0!important;padding:12px 0!important;perspective:2400px!important}
.td-hb-book{position:relative!important;width:min(930px,100%)!important;aspect-ratio:600/430!important;margin:0 auto!important;outline:none!important;user-select:none!important;touch-action:pan-y!important;transform:rotateX(1.2deg)!important;transform-style:preserve-3d!important;filter:drop-shadow(0 32px 42px rgba(0,0,0,.55))!important;cursor:pointer!important}
.td-hb-board{position:absolute!important;inset:-11px!important;border-radius:6px!important;background:#2b2925!important;box-shadow:0 0 0 1px rgba(255,255,255,.07),0 22px 60px rgba(0,0,0,.35)!important}
.td-hb-spread{position:absolute!important;inset:0!important;z-index:2!important;display:grid!important;grid-template-columns:1fr 1fr!important}
.td-hb-page,.td-hb-face{position:relative!important;overflow:hidden!important;background:#fff!important;border:1px solid rgba(0,0,0,.12)!important}
.td-hb-page.l{border-radius:3px 0 0 3px!important}.td-hb-page.r{border-radius:0 3px 3px 0!important}
.td-hb-img{position:absolute!important;inset:0!important;background-image:url("${HANDBOOK_SPRITE}")!important;background-repeat:no-repeat!important;background-size:100% 700%!important;background-color:#fff!important}
.td-hb-blank{position:absolute!important;inset:0!important;display:grid!important;place-items:center!important;padding:20px!important;background:linear-gradient(90deg,#eeeae2,#faf8f3 91%,#d7d0c6)!important;color:#b9b1a5!important;font:400 12px/1.55 Georgia,"Times New Roman",serif!important;letter-spacing:.13em!important;text-align:center!important;text-transform:uppercase!important}
.td-hb-gutter{position:absolute!important;z-index:8!important;top:0!important;bottom:0!important;left:50%!important;width:27px!important;transform:translateX(-50%)!important;background:linear-gradient(90deg,rgba(0,0,0,.17),rgba(255,255,255,.32),rgba(0,0,0,.13))!important;opacity:.55!important;pointer-events:none!important}
.td-hb-turn{position:absolute!important;z-index:20!important;top:0!important;bottom:0!important;width:50%!important;display:none!important;transform-style:preserve-3d!important;pointer-events:none!important}
.td-hb-turn.next{left:50%!important;transform-origin:left center!important}.td-hb-turn.prev{left:0!important;transform-origin:right center!important}
.td-hb-face{position:absolute!important;inset:0!important;backface-visibility:hidden!important;box-shadow:0 15px 30px rgba(0,0,0,.16)!important}.td-hb-face.back{transform:rotateY(180deg)!important}
.td-hb-turn.an{display:block!important;animation:hbn .72s cubic-bezier(.28,.17,.18,1) forwards!important}.td-hb-turn.ap{display:block!important;animation:hbp .72s cubic-bezier(.28,.17,.18,1) forwards!important}
@keyframes hbn{from{transform:rotateY(0)}to{transform:rotateY(-180deg)}}@keyframes hbp{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}
.td-hb-nav{width:54px!important;height:54px!important;padding:0!important;border:1px solid rgba(255,255,255,.19)!important;border-radius:999px!important;background:rgba(48,45,41,.86)!important;color:#fff!important;box-shadow:0 10px 28px rgba(0,0,0,.24)!important;display:grid!important;place-items:center!important;font:400 29px/1 Arial,sans-serif!important;cursor:pointer!important;transition:.2s!important}
.td-hb-nav:hover:not(:disabled){background:#3b3732!important;transform:scale(1.04)!important}.td-hb-nav:disabled{opacity:.2!important;cursor:default!important}
.td-hb-footer{margin-top:24px!important;text-align:center!important}.td-hb-dots{display:flex!important;justify-content:center!important;gap:11px!important;margin-bottom:13px!important}
.td-hb-dot{width:8px!important;height:8px!important;padding:0!important;border:0!important;border-radius:50%!important;background:#66615b!important;cursor:pointer!important}.td-hb-dot.on{background:#e29550!important;transform:scale(1.15)!important}
.td-hb-hint{color:#aaa49c!important;font:400 13px/1.4 Arial,Helvetica,sans-serif!important}.td-hb-count{margin-top:8px!important;color:#716c65!important;font:500 10px/1.3 Arial,Helvetica,sans-serif!important;letter-spacing:.14em!important}
@media(max-width:760px){[data-td-nguyen-handbook-host="true"]{min-height:590px!important;padding:36px 10px 34px!important}[data-td-nguyen-handbook="true"]{width:100%!important}.td-hb-intro{margin-bottom:18px!important}.td-hb-stage{grid-template-columns:1fr!important;gap:12px!important}.td-hb-nav{position:absolute!important;z-index:40!important;top:48%!important;width:44px!important;height:44px!important;font-size:23px!important;background:rgba(42,39,35,.92)!important}.td-hb-prev{left:3px!important}.td-hb-next{right:3px!important}.td-hb-book{width:95%!important}}
@media(prefers-reduced-motion:reduce){.td-hb-turn.an,.td-hb-turn.ap{animation-duration:.01ms!important}}
</style><script id="nguyen-live-handbook-runtime">
(()=>{
const n=v=>(v||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim().toLowerCase(),pos=['0%','16.6667%','33.3333%','50%','66.6667%','83.3333%','100%'],lab=['1 — Cover','2 — About Us','3 — Our Services','4 — Project Types','5 — Our Process','6 — Featured Projects','7 — Why Choose Us'],sp=[[null,0],[1,2],[3,4],[5,6]];
function host(){const vw=Math.max(innerWidth||0,320),all=[...document.querySelectorAll('button,a,p,span,div,h1,h2,h3,h4,h5,h6')],as=all.filter(e=>n(e.textContent).includes('client testimonial'));for(const a of as){let x=a instanceof HTMLElement?a:null,c=null;for(let d=0;x&&d<16;d++,x=x.parentElement){if(!(x instanceof HTMLElement)||!n(x.textContent).includes('client testimonial'))continue;const r=x.getBoundingClientRect();if(r.width>=320&&r.height>=260&&r.height<=1100&&!c)c=x;if(r.width>=vw*.72&&r.height>=360&&r.height<=1100)return x}if(c)return c}return null}
function im(i){return i===null?'<div class="td-hb-blank">Nguyen Architecture<br>&amp; Engineering</div>':'<div class="td-hb-img" role="img" aria-label="'+lab[i]+'" style="background-position:center '+pos[i]+'"></div>'}
function pg(i,s){return '<div class="td-hb-page '+s+'">'+im(i)+'</div>'}
function make(h){h.setAttribute('data-td-nguyen-handbook-host','true');const old=h.querySelector('[data-td-nguyen-handbook="true"]');if(old)return old;const r=document.createElement('div');r.setAttribute('data-td-nguyen-handbook','true');r.innerHTML='<div class="td-hb-intro"><div class="td-hb-eyebrow">Client Testimonial</div><h2 class="td-hb-title">See Our Work in Detail</h2><p class="td-hb-sub">Explore our project handbook to see how we approach each detail with purpose and precision.</p></div><div class="td-hb-stage"><button class="td-hb-nav td-hb-prev" type="button" aria-label="Previous handbook pages">‹</button><div class="td-hb-wrap"><div class="td-hb-book" tabindex="0"><div class="td-hb-board"></div><div class="td-hb-spread"></div><div class="td-hb-gutter"></div><div class="td-hb-turn next"><div class="td-hb-face nf"></div><div class="td-hb-face back nb"></div></div><div class="td-hb-turn prev"><div class="td-hb-face pf"></div><div class="td-hb-face back pb"></div></div></div></div><button class="td-hb-nav td-hb-next" type="button" aria-label="Next handbook pages">›</button></div><div class="td-hb-footer"><div class="td-hb-dots"></div><div class="td-hb-hint">Drag or swipe to explore the handbook</div><div class="td-hb-count" aria-live="polite"></div></div>';h.appendChild(r);
const s=r.querySelector('.td-hb-spread'),b=r.querySelector('.td-hb-book'),pr=r.querySelector('.td-hb-prev'),nx=r.querySelector('.td-hb-next'),ds=r.querySelector('.td-hb-dots'),ct=r.querySelector('.td-hb-count'),tn=r.querySelector('.td-hb-turn.next'),tp=r.querySelector('.td-hb-turn.prev'),nf=r.querySelector('.nf'),nb=r.querySelector('.nb'),pf=r.querySelector('.pf'),pb=r.querySelector('.pb');let cur=0,busy=false,start=null,sup=0;
sp.forEach((_,i)=>{const d=document.createElement('button');d.type='button';d.className='td-hb-dot';d.setAttribute('aria-label','Go to handbook spread '+(i+1));d.onclick=()=>{if(busy||i===cur)return;i>cur?next(i):prev(i)};ds.appendChild(d)});
function render(){const p=sp[cur];s.innerHTML=pg(p[0],'l')+pg(p[1],'r');pr.disabled=cur===0;nx.disabled=cur===sp.length-1;[...ds.children].forEach((d,i)=>d.classList.toggle('on',i===cur));ct.textContent=cur===0?'PAGE 1 — COVER':cur===1?'PAGES 2–3':cur===2?'PAGES 4–5':'PAGES 6–7'}
function next(t=cur+1){if(busy||cur>=sp.length-1)return;busy=true;nf.innerHTML=im(sp[cur][1]);nb.innerHTML=im(sp[t][0]);tn.classList.remove('an');void tn.offsetWidth;tn.classList.add('an');setTimeout(()=>{cur=t;render()},360);setTimeout(()=>{tn.classList.remove('an');busy=false},740)}
function prev(t=cur-1){if(busy||cur<=0)return;busy=true;pf.innerHTML=im(sp[cur][0]);pb.innerHTML=im(sp[t][1]);tp.classList.remove('ap');void tp.offsetWidth;tp.classList.add('ap');setTimeout(()=>{cur=t;render()},360);setTimeout(()=>{tp.classList.remove('ap');busy=false},740)}
pr.onclick=e=>{e.preventDefault();e.stopPropagation();prev()};nx.onclick=e=>{e.preventDefault();e.stopPropagation();next()};b.onclick=e=>{if(Date.now()<sup)return;const x=b.getBoundingClientRect();e.clientX<x.left+x.width/2?prev():next()};b.onkeydown=e=>{if(e.key==='ArrowLeft'){e.preventDefault();prev()}if(e.key==='ArrowRight'){e.preventDefault();next()}};b.onpointerdown=e=>start=e.clientX;b.onpointerup=e=>{if(start===null)return;const d=e.clientX-start;start=null;if(Math.abs(d)<45)return;d<0?next():prev();sup=Date.now()+250};b.onpointercancel=()=>start=null;render();return r}
function mount(){if(document.querySelector('[data-td-nguyen-handbook="true"]'))return true;const h=host();if(!h)return false;make(h);return true}let q=false;const sch=()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;mount()})};new MutationObserver(()=>{if(!document.querySelector('[data-td-nguyen-handbook="true"]'))sch()}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});mount();document.addEventListener('DOMContentLoaded',sch,{once:true});addEventListener('load',sch,{once:true});addEventListener('resize',sch,{passive:true});[50,120,250,500,900,1500,2500,4000,7000].forEach(d=>setTimeout(sch,d));
})();
</script>`

export async function GET() {
  const optimizedResponse = await getOptimized()
  if (!optimizedResponse.ok) return optimizedResponse
  let html = await optimizedResponse.text()
  html = html.replace("</body>", `${PROJECT_IMAGE_RUNTIME}${HANDBOOK_RUNTIME}</body>`)
  const headers = new Headers(optimizedResponse.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")
  headers.delete("Content-Encoding")
  headers.delete("Content-Length")
  return new Response(html, { status: optimizedResponse.status, headers })
}
