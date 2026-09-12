import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>NGUYEN Project Handbook</title>
<style>
*{box-sizing:border-box}
html,body{margin:0;width:100%;min-height:100%;background:#181715;color:#f5f1ea;font-family:Arial,Helvetica,sans-serif}
body{overflow:hidden}
.section{height:clamp(940px,76vw,1080px);min-height:940px;padding:28px 18px 36px;background:radial-gradient(circle at 50% 30%,rgba(57,53,48,.62),transparent 39%),linear-gradient(180deg,#1f1e1b 0%,#181715 100%);overflow:hidden}
.intro{text-align:center;max-width:900px;margin:0 auto 18px}
h1{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(40px,5vw,66px);letter-spacing:-.03em;line-height:1;margin:0 0 11px}
.intro p{max-width:620px;margin:auto;color:#b4afa7;font-size:14px;line-height:1.5}
.stage{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:58px minmax(0,1fr) 58px;gap:24px;align-items:center}
.nav{width:56px;height:56px;border-radius:999px;border:1px solid rgba(255,255,255,.19);background:rgba(48,45,41,.86);color:#fff;font-size:30px;line-height:1;display:grid;place-items:center;cursor:pointer;transition:.2s;box-shadow:0 10px 28px rgba(0,0,0,.24)}
.nav:hover:not(:disabled){background:#3b3732;transform:scale(1.04)}
.nav:disabled{opacity:.2;cursor:default}
.book-wrap{perspective:2400px;min-width:0;padding:6px 0}
.book{position:relative;width:min(1180px,100%);aspect-ratio:4/3;margin:0 auto;transform:rotateX(1deg);filter:drop-shadow(0 30px 40px rgba(0,0,0,.55));user-select:none;touch-action:pan-y;outline:none;cursor:pointer;transform-style:preserve-3d}
.board{position:absolute;inset:-10px;border-radius:6px;background:#2b2925;box-shadow:0 0 0 1px rgba(255,255,255,.07),0 22px 60px rgba(0,0,0,.35)}
.spread{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;z-index:2}
.page{position:relative;overflow:hidden;background:#fff;border:1px solid rgba(0,0,0,.14)}
.page.left{border-radius:3px 0 0 3px}.page.right{border-radius:0 3px 3px 0}
.page-sprite{position:absolute;left:0;width:100%;height:700%;max-width:none;display:block;object-fit:fill;object-position:left top;background:#fff;pointer-events:none;user-select:none}
.blank{position:absolute;inset:0;display:grid;place-items:center;text-align:center;background:linear-gradient(90deg,#eeeae2 0%,#faf8f3 91%,#d7d0c6 100%);font-family:Georgia,"Times New Roman",serif;color:#b9b1a5;font-size:12px;letter-spacing:.13em;text-transform:uppercase}
.gutter{position:absolute;left:50%;top:0;bottom:0;width:26px;transform:translateX(-50%);z-index:8;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.17),rgba(255,255,255,.32),rgba(0,0,0,.13));opacity:.55}
.turn{display:none;position:absolute;top:0;bottom:0;width:50%;z-index:20;transform-style:preserve-3d;pointer-events:none}
.turn.next{left:50%;transform-origin:left center}.turn.prev{left:0;transform-origin:right center}
.face{position:absolute;inset:0;overflow:hidden;background:#fff;border:1px solid rgba(0,0,0,.14);backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 15px 30px rgba(0,0,0,.16)}
.face.back{transform:rotateY(180deg)}
.turn.anim-next{display:block;animation:flipNext .72s cubic-bezier(.28,.17,.18,1) forwards}.turn.anim-prev{display:block;animation:flipPrev .72s cubic-bezier(.28,.17,.18,1) forwards}
@keyframes flipNext{from{transform:rotateY(0)}to{transform:rotateY(-180deg)}}
@keyframes flipPrev{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}
@media(max-width:760px){body{overflow:auto}.section{height:auto;min-height:720px;padding:30px 10px 34px}.stage{grid-template-columns:1fr;position:relative;gap:12px}.nav{position:absolute;top:48%;z-index:40;width:44px;height:44px;font-size:23px;background:rgba(42,39,35,.92)}#prev{left:3px}#next{right:3px}.book{width:96%;aspect-ratio:4/3}.intro{margin-bottom:18px}h1{font-size:clamp(34px,10vw,48px)}}
@media(prefers-reduced-motion:reduce){.turn.anim-next,.turn.anim-prev{animation-duration:.01ms}}
</style>
</head>
<body>
<section class="section">
  <div class="intro">
    <h1>See Our Work in Detail</h1>
    <p>Explore our project handbook to see how we approach each detail with purpose and precision.</p>
  </div>
  <div class="stage">
    <button class="nav" id="prev" aria-label="Previous pages">‹</button>
    <div class="book-wrap"><div class="book" id="book" tabindex="0" aria-label="Interactive NGUYEN project handbook"><div class="board"></div><div class="spread" id="spread"></div><div class="gutter"></div><div class="turn next" id="turnNext"><div class="face" id="nextFront"></div><div class="face back" id="nextBack"></div></div><div class="turn prev" id="turnPrev"><div class="face" id="prevFront"></div><div class="face back" id="prevBack"></div></div></div></div>
    <button class="nav" id="next" aria-label="Next pages">›</button>
  </div>
</section>
<script>
(()=>{
const sprite='/client-demos/client-8889/architectured/handbook/sprite?v=exact-96030-final';
const labels=['1 — Cover','2 — About Us','3 — Our Services','4 — Project Types','5 — Our Process','6 — Featured Projects','7 — Why Choose Us'];
const spreads=[[null,0],[1,2],[3,4],[5,6]];
const spread=document.getElementById('spread'),book=document.getElementById('book'),prevBtn=document.getElementById('prev'),nextBtn=document.getElementById('next'),turnNext=document.getElementById('turnNext'),turnPrev=document.getElementById('turnPrev'),nextFront=document.getElementById('nextFront'),nextBack=document.getElementById('nextBack'),prevFront=document.getElementById('prevFront'),prevBack=document.getElementById('prevBack');
let index=0,busy=false,startX=null,suppressUntil=0;
function imageMarkup(i){if(i===null)return '<div class="blank">NGUYEN ARCHITECTURE<br>&amp; ENGINEERING</div>';return '<img class="page-sprite" src="'+sprite+'" alt="'+labels[i]+'" draggable="false" loading="eager" style="top:-'+(i*100)+'%">'}
function pageMarkup(i,side){return '<div class="page '+side+'">'+imageMarkup(i)+'</div>'}
function render(){const pair=spreads[index];spread.innerHTML=pageMarkup(pair[0],'left')+pageMarkup(pair[1],'right');prevBtn.disabled=index===0;nextBtn.disabled=index===spreads.length-1}
function goNext(target=index+1){if(busy||index>=spreads.length-1)return;busy=true;nextFront.innerHTML=imageMarkup(spreads[index][1]);nextBack.innerHTML=imageMarkup(spreads[target][0]);turnNext.classList.remove('anim-next');void turnNext.offsetWidth;turnNext.classList.add('anim-next');setTimeout(()=>{index=target;render()},360);setTimeout(()=>{turnNext.classList.remove('anim-next');busy=false},740)}
function goPrev(target=index-1){if(busy||index<=0)return;busy=true;prevFront.innerHTML=imageMarkup(spreads[index][0]);prevBack.innerHTML=imageMarkup(spreads[target][1]);turnPrev.classList.remove('anim-prev');void turnPrev.offsetWidth;turnPrev.classList.add('anim-prev');setTimeout(()=>{index=target;render()},360);setTimeout(()=>{turnPrev.classList.remove('anim-prev');busy=false},740)}
prevBtn.addEventListener('click',e=>{e.stopPropagation();goPrev()});nextBtn.addEventListener('click',e=>{e.stopPropagation();goNext()});book.addEventListener('click',e=>{if(Date.now()<suppressUntil)return;const r=book.getBoundingClientRect();e.clientX<r.left+r.width/2?goPrev():goNext()});book.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();goNext()}if(e.key==='ArrowLeft'){e.preventDefault();goPrev()}});book.addEventListener('pointerdown',e=>{startX=e.clientX});book.addEventListener('pointerup',e=>{if(startX===null)return;const delta=e.clientX-startX;startX=null;if(Math.abs(delta)>45){delta<0?goNext():goPrev();suppressUntil=Date.now()+250}});book.addEventListener('pointercancel',()=>{startX=null});const preload=new Image();preload.src=sprite;render();
})();
</script>
</body>
</html>`

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store, max-age=0, must-revalidate" } })
}