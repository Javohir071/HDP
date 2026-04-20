const BOT_TOKEN = '_BOT_TOKEN_HERE';
const CHAT_ID   = '_CHAT_ID_HERE';

// Cursor
const cg=document.getElementById('cursorGlow');
document.addEventListener('mousemove',e=>{cg.style.left=e.clientX+'px';cg.style.top=e.clientY+'px';});

// Nav
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>40));
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open');}

// Particles
(function(){const c=document.getElementById('particles');for(let i=0;i<20;i++){const p=document.createElement('div');p.className='particle';const s=Math.random()*12+4;p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*8}s`;c.appendChild(p);}})();

// Reveal
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target);}}),{threshold:.1});
document.querySelectorAll('.reveal,.rl,.rr,.rs').forEach(el=>io.observe(el));

// Counter
function animNum(el,target){let v=0;const s=target/50;const t=setInterval(()=>{v+=s;if(v>=target){v=target;clearInterval(t);}el.textContent=Math.floor(v)+(target>=100?'+':target<=5?'+':'');},35);}
const sio=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.querySelectorAll('.stat-num').forEach(n=>animNum(n,parseInt(n.dataset.t)));sio.unobserve(x.target);}}),{threshold:.5});
const hs=document.querySelector('.hero-stats');if(hs)sio.observe(hs);

// Checkbox
function tch(label){setTimeout(()=>label.classList.toggle('checked',label.querySelector('input').checked),0);}

// Form
async function doSend(e){
  if(e)e.preventDefault();
  const f=id=>document.getElementById(id).value.trim();
  const fname=f('fname'),lname=f('lname'),age=f('age'),phone=f('phone'),comment=f('comment');
  const math=document.getElementById('ch_math').checked,eng=document.getElementById('ch_eng').checked;
  const kids=document.getElementById('ch_kids').checked,ielts=document.getElementById('ch_ielts').checked;
  if(!fname||!lname||!age||!phone){
    const w=document.querySelector('.reg-wrap');w.style.animation='shake .4s ease';setTimeout(()=>w.style.animation='',400);return;
  }
  if(!math&&!eng&&!kids&&!ielts){alert("Kamida bitta yo'nalish tanlang!");return;}
  const yn=[math&&'Matematika',eng&&'Ingliz tili',kids&&'Kichkinalar Matematikasi',ielts&&'IELTS Tayyorlov'].filter(Boolean).join(', ');
  const text=`🎓 <b>HDP — Yangi Ariza!</b>\n\n👤 <b>Ism Familiya:</b> ${fname} ${lname}\n🎂 <b>Yosh:</b> ${age}\n📞 <b>Telefon:</b> ${phone}\n📚 <b>Yo'nalish:</b> ${yn}\n💬 <b>Izoh:</b> ${comment||'—'}\n🕐 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`;
  const btn=document.getElementById('sendBtn');
  btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';btn.disabled=true;
  try{
    const r=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:CHAT_ID,text,parse_mode:'HTML'})});
    const d=await r.json();
    if(d.ok){document.getElementById('regForm').style.display='none';document.getElementById('successBox').style.display='block';}
    else{alert('Xatolik: '+d.description);btn.innerHTML='<i class="fas fa-paper-plane"></i> Yuborish';btn.disabled=false;}
  }catch{alert("Tarmoq xatosi!");btn.innerHTML='<i class="fas fa-paper-plane"></i> Yuborish';btn.disabled=false;}
}
const ss=document.createElement('style');
ss.textContent='@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}';
document.head.appendChild(ss);
