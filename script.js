// Add official launch details here when announced.
const CONFIG={socialUrl:'',contractAddress:''};
const shots=[['balls-crash','THE WORLD WENT RED','A BAD DAY FOR EVERYONE ELSE'],['balls-coast','VICE STREET','SUNSET IS STILL FREE'],['balls-pool','LIQUIDITY POOL','THE ONLY POOL THAT MATTERS'],['balls-word','MY WORD','THE ONE THING YOU KEEP'],['balls-night','AFTER HOURS','SAME MAN. DIFFERENT MARKET.'],['balls-hero','STILL HERE','A MIAMI STATE OF MIND.']];
const grid=document.querySelector('#gallery-grid');
shots.forEach(([file,title,subtitle],i)=>{const b=document.createElement('button');b.className='gallery-item';b.setAttribute('aria-label','Open scene: '+title);b.innerHTML='<img src="assets/'+file+'.png" alt="Tony Montana — '+title.toLowerCase()+'" loading="lazy"><span><small>'+subtitle+'</small>'+title+'</span><b class="gallery-arrow" aria-hidden="true">↗</b>';b.addEventListener('click',()=>openShot(i));grid.append(b)});
const lightbox=document.querySelector('#lightbox');let current=0;
function showShot(){const [file,title]=shots[current];const img=lightbox.querySelector('img');img.src='assets/'+file+'.png';img.alt='Tony Montana — '+title.toLowerCase();lightbox.querySelector('figcaption').textContent=title}
function openShot(index){current=index;showShot();lightbox.showModal();document.body.style.overflow='hidden'}
function step(amount){current=(current+amount+shots.length)%shots.length;showShot()}
lightbox.querySelector('.close').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('.prev').addEventListener('click',()=>step(-1));
lightbox.querySelector('.next').addEventListener('click',()=>step(1));
lightbox.addEventListener('close',()=>document.body.style.overflow='');
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
document.addEventListener('keydown',event=>{if(!lightbox.open)return;if(event.key==='ArrowRight'){event.preventDefault();step(1)}if(event.key==='ArrowLeft'){event.preventDefault();step(-1)}});
let toastTimer;function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4000)}
document.querySelectorAll('[data-social]').forEach(button=>{if(CONFIG.socialUrl)button.textContent='X / TWITTER ↗';button.addEventListener('click',()=>{if(CONFIG.socialUrl)window.open(CONFIG.socialUrl,'_blank','noopener,noreferrer');else toast('The official $BALLS X account is coming soon.');})});
const contractButton=document.querySelector('[data-contract]');if(CONFIG.contractAddress)contractButton.textContent='COPY CONTRACT';contractButton.addEventListener('click',async()=>{if(!CONFIG.contractAddress)return toast('The $BALLS contract has not been announced yet.');try{await navigator.clipboard.writeText(CONFIG.contractAddress);toast('Contract copied.')}catch{toast(CONFIG.contractAddress)}});
const header=document.querySelector('.nav'),menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'CLOSE ×':'MENU ☰'});
header.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{header.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='MENU ☰'}));

const heroVideo=document.querySelector('#hero-video'),soundButton=document.querySelector('#sound');
function syncSound(){soundButton.textContent=heroVideo.muted?'♫ TAP FOR SOUND':'♫ SOUND ON';soundButton.setAttribute('aria-pressed',String(!heroVideo.muted));soundButton.setAttribute('aria-label',heroVideo.muted?'Turn video sound on':'Turn video sound off')}
heroVideo.addEventListener('volumechange',syncSound);
heroVideo.addEventListener('error',()=>{heroVideo.hidden=true;soundButton.hidden=true;toast('The trailer could not load. Showing the cover artwork.')});
heroVideo.play().catch(()=>{soundButton.textContent='▶ PLAY TRAILER'});
soundButton.addEventListener('click',()=>{heroVideo.muted=!heroVideo.muted;heroVideo.play().then(syncSound).catch(()=>toast('Tap again to play the trailer.'))});
