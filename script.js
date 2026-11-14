// Set these when the final trailer and official social link arrive.
const CONFIG={videoUrl:'assets/hero.mp4',socialUrl:'https://x.com/grandtheftapu'};
const shots=[['hood','HOOD WALK'],['bank','THE BANK JOB'],['cruise','SUNSET CRUISE'],['rain','MAKE IT RAIN'],['crew','THE CREW'],['club','CLUB NIGHT']];
const grid=document.querySelector('#gallery-grid');
shots.forEach(([file,title],i)=>{const b=document.createElement('button');b.className='gallery-item';b.setAttribute('aria-label','Open '+title);b.innerHTML=`<img src="assets/${file}.png" alt="${title} — Grand Theft Apu" loading="lazy"><span>${title}</span>`;b.onclick=()=>openShot(i);grid.append(b)});
const lightbox=document.querySelector('#lightbox');let current=0;
function showShot(){const [file,title]=shots[current];lightbox.querySelector('img').src=`assets/${file}.png`;lightbox.querySelector('img').alt=title;lightbox.querySelector('figcaption').textContent=title}
function openShot(i){current=i;showShot();lightbox.showModal();document.body.style.overflow='hidden'}
function closeShot(){lightbox.close()}
lightbox.querySelector('.close').onclick=closeShot;lightbox.addEventListener('close',()=>document.body.style.overflow='');
function step(n){current=(current+n+shots.length)%shots.length;showShot()}
lightbox.querySelector('.prev').onclick=()=>step(-1);lightbox.querySelector('.next').onclick=()=>step(1);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeShot()});document.addEventListener('keydown',e=>{if(lightbox.open){if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)}});
let toastTimer;function toast(message){const t=document.querySelector('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3500)}
document.querySelectorAll('[data-social]').forEach(b=>b.onclick=()=>{if(CONFIG.socialUrl)window.open(CONFIG.socialUrl,'_blank','noopener,noreferrer');else toast('Official X link — coming soon.');});
const video=document.querySelector('#hero-video'),sound=document.querySelector('#sound');if(CONFIG.videoUrl){video.src=CONFIG.videoUrl;video.hidden=false;video.autoplay=true;document.querySelector('.hero-art').style.display='none';sound.textContent='▥ TAP FOR SOUND';video.play().catch(()=>sound.textContent='▶ PLAY TRAILER')}
sound.onclick=()=>{if(!CONFIG.videoUrl)return toast('Trailer coming soon. Stay wanted.');video.muted=!video.muted;video.play().catch(()=>toast('Tap again to play the trailer.'));sound.textContent=video.muted?'▥ TAP FOR SOUND':'▥ SOUND ON'};
let scheduled=false;function updateHUD(){const range=document.documentElement.scrollHeight-innerHeight;const progress=range>0?Math.min(1,Math.max(0,scrollY/range)):0;document.querySelector('#cash').textContent='$'+Math.round(progress*99999999).toString().padStart(8,'0');document.querySelectorAll('.stars span').forEach((s,i)=>s.classList.toggle('active',i<Math.ceil(progress*5)));scheduled=false}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateHUD)}},{passive:true});addEventListener('resize',updateHUD);updateHUD();
