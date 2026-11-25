(function(){
  const ROOT = '';
  const encodePath = p => p.split('/').map(encodeURIComponent).join('/');
  function getCandidatePaths(base, extensions){
    const candidates=[];
    (base||[]).forEach(path=>{
      const clean=path.replace(/^\/+/, '');
      const extMatch=clean.match(/\.(pdf|jpg|jpeg|png|webp|docx|doc)$/i);
      if(extMatch){
        const ext=extMatch[0];
        candidates.push(clean);
        candidates.push(clean+ext);
      } else {
        (extensions||['png','jpg','jpeg','webp']).forEach(ext=>{
          candidates.push(clean+'.'+ext);
          candidates.push(clean+'.'+ext+'.'+ext);
        });
      }
    });
    return [...new Set(candidates)];
  }
  async function locateFile(paths){
    for(const p of paths){
      const url=encodePath(p);
      try{const r=await fetch(url,{method:'HEAD',cache:'no-store'});if(r.ok)return url;}catch(e){}
    }
    return paths.length?encodePath(paths[0]):'#';
  }
  function fileLink(path, label, className='view-link', extensions){
    const a=document.createElement('a');a.className=className;a.textContent=label;a.href='#';a.target='_blank';a.rel='noopener';
    const paths=getCandidatePaths(Array.isArray(path)?path:[path],extensions||['pdf','jpg','docx']);
    locateFile(paths).then(url=>{a.href=url;if(url===encodePath(paths[0]) && !paths.some((p,i)=>i>0 && url===encodePath(p)))a.dataset.pending='true';});
    return a;
  }
  function setImageFallback(img, paths){
    const candidates=getCandidatePaths(paths,['png','jpg','jpeg','webp']);
    let index=0;
    const tryNext=()=>{if(index<candidates.length){img.src=encodePath(candidates[index++]);}else{img.style.display='none';}};
    img.addEventListener('error',tryNext);tryNext();
  }
  function setFavicon(){
    const link=document.querySelector('link[rel="icon"]');if(!link)return;
    locateFile(getCandidatePaths(['assets/amit-adhikari-pp.jpg'],['jpg','png','jpeg','webp'])).then(u=>link.href=u);
  }
  const socials=`
   <a class="linkedin" href="https://www.linkedin.com/in/adhikariamit0101/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M5.2 3.2a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9h3.7v11.6H3.4V9Zm5.8 0h3.5v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.8 0 4.5 2.5 4.5 5.7v6.2h-3.7v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6H9.2V9Z"/></svg></a>
   <a class="orcid" href="https://orcid.org/0009-0005-0289-6255" target="_blank" rel="noopener" aria-label="ORCID"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-4.5 5.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM8 10.3h2v6.5H8v-6.5Zm3.4 0h2.5c2.2 0 3.6 1.3 3.6 3.2s-1.4 3.3-3.6 3.3h-2.5v-6.5Zm2 1.5v3.5h.5c1 0 1.7-.6 1.7-1.8s-.7-1.7-1.7-1.7h-.5Z"/></svg></a>
   <a class="gmail" href="mailto:adhikariamit0101@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24"><path d="M2.5 6.5A2.5 2.5 0 0 1 5 4h14a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 19 20H5a2.5 2.5 0 0 1-2.5-2.5v-11Zm2 .2v.4l7.5 5.8 7.5-5.8v-.4a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0-.5.5Zm15 2.9-6.9 5.3a1 1 0 0 1-1.2 0L4.5 9.6v7.9c0 .3.2.5.5.5h14c.3 0 .5-.2.5-.5V9.6Z"/></svg></a>
   <a class="whatsapp" href="https://wa.me/916398686772" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a9.8 9.8 0 0 0-8.4 14.9L2.3 22l5.3-1.4A9.9 9.9 0 1 0 12 2Zm0 17.8a7.9 7.9 0 0 1-4-1.1l-.3-.2-3.1.8.8-3-.2-.3A7.9 7.9 0 1 1 12 19.8Zm4.3-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4H8.7c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.3 3.9 2.1.9 2.5.7 3 .7.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z"/></svg></a>
   <a class="phone" href="tel:+916398686772" aria-label="Call India number"><svg viewBox="0 0 24 24"><path d="M6.6 2.5h3l1.4 5-2 1.7a15.4 15.4 0 0 0 5.8 5.8l1.7-2 5 1.4v3c0 1.1-.9 2-2 2C10.3 19.4 4.6 13.7 4.6 6.5c0-1.1.9-2 2-2Z"/></svg></a>
   <a class="phone" href="tel:+9779745452061" aria-label="Call Nepal number"><svg viewBox="0 0 24 24"><path d="M6.6 2.5h3l1.4 5-2 1.7a15.4 15.4 0 0 0 5.8 5.8l1.7-2 5 1.4v3c0 1.1-.9 2-2 2C10.3 19.4 4.6 13.7 4.6 6.5c0-1.1.9-2 2-2Z"/></svg></a>`;
  function buildFooter(){
    const f=document.querySelector('[data-site-footer]');if(!f)return;
    f.innerHTML=`<div class="shell footer-inner"><div><div class="footer-socials">${socials}</div><div class="footer-note">Connect through professional and academic platforms</div></div><div><div class="footer-name">Amit Adhikari.</div><div class="footer-note">Academic & Professional Portfolio · © 2026</div></div></div>`;
  }
  function buildNav(){
    const nav=document.querySelector('[data-site-nav]');if(!nav)return;
    const active=document.body.dataset.page||'';
    const cats=window.CERTIFICATE_CATEGORIES||[];
    const categoryLinks=cats.map(c=>`<a href="certificates-${c.slug}.html">${c.title}</a>`).join('');
    nav.innerHTML=`<div class="shell nav-wrap"><a class="brand" href="index.html">Amit Adhikari.</a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">☰</button><div class="nav-links"><a href="about.html" ${active==='about'?'aria-current="page"':''}>About</a><a href="education.html" ${active==='education'?'aria-current="page"':''}>Education</a><a href="research.html" ${active==='research'?'aria-current="page"':''}>Research</a><a href="experience.html" ${active==='experience'?'aria-current="page"':''}>Experience</a><div class="dropdown"><a class="drop-trigger" href="certificates.html" ${active==='certificates'?'aria-current="page"':''}>Certificates</a><div class="drop-menu"><a href="certificates.html"><strong>All certificates</strong> · browse the full collection</a>${categoryLinks}</div></div><a href="contact.html" ${active==='contact'?'aria-current="page"':''}>Contact</a></div></div>`;
    const btn=nav.querySelector('.menu-toggle'),links=nav.querySelector('.nav-links'),dropdown=nav.querySelector('.dropdown'),trigger=nav.querySelector('.drop-trigger');
    btn.addEventListener('click',()=>{const open=links.classList.toggle('show');btn.setAttribute('aria-expanded',String(open));});
    trigger.addEventListener('click',e=>{if(window.matchMedia('(max-width:850px)').matches){e.preventDefault();dropdown.classList.toggle('open');}});
  }
  function buildCertificateCard(item){
    const article=document.createElement('article');article.className='card cert-card';
    const h=document.createElement('h3');h.textContent=item.title;
    const p=document.createElement('p');p.textContent=item.description;
    const a=fileLink(item.paths,'View','view-link',['pdf','jpg','jpeg']);
    article.append(h,p,a);return article;
  }
  function renderCertificates(){
    const all=window.CERTIFICATE_CATEGORIES||[];
    const allTarget=document.getElementById('all-certificate-categories');
    if(allTarget){
      all.forEach(cat=>{
        const section=document.createElement('section');section.className='section';
        const head=document.createElement('div');head.className='section-head';
        const left=document.createElement('div');left.innerHTML=`<div class="kicker">Credential category</div><h2>${cat.title}</h2>`;
        const browse=document.createElement('a');browse.className='text-link';browse.href=`certificates-${cat.slug}.html`;browse.textContent='Open category →';
        head.append(left,browse);section.append(head);
        const grid=document.createElement('div');grid.className='grid';
        cat.items.forEach(item=>grid.appendChild(buildCertificateCard(item)));
        section.append(grid);allTarget.append(section);
      });
    }
    const categorySlug=document.body.dataset.certificateCategory;
    if(categorySlug){
      const cat=all.find(c=>c.slug===categorySlug);const target=document.getElementById('category-certificates');
      if(cat&&target){const intro=document.getElementById('category-intro');if(intro)intro.textContent=cat.intro;const grid=document.createElement('div');grid.className='grid';cat.items.forEach(item=>grid.appendChild(buildCertificateCard(item)));target.append(grid);}
    }
  }
  function makePath(folder,file){return `${folder}/${file}`;}
  function prepareData(){
    const cats=window.CERTIFICATE_CATEGORIES||[];
    cats.forEach(cat=>cat.items.forEach(item=>{
      const folders=cat.folders||[cat.folder];
      item.paths=folders.map(f=>makePath(f,item.file));
      (item.alternates||[]).forEach(file=>folders.forEach(f=>item.paths.push(makePath(f,file))));
    }));
  }
  function prepareDataLinks(){
    document.querySelectorAll('[data-file-options]').forEach(async a=>{
      let opts=[];try{opts=JSON.parse(a.dataset.fileOptions);}catch(e){}
      if(!opts.length)return;
      const paths=opts.flatMap(p=>getCandidatePaths([p],['pdf','jpg','docx']));
      const found=await locateFile(paths);a.href=found;a.target='_blank';a.rel='noopener';
    });
    document.querySelectorAll('[data-image-base]').forEach(img=>{
      const base=img.dataset.imageBase.split('|');setImageFallback(img,base);
    });
  }
  function startRotator(){
    const el=document.querySelector('[data-rotator]');if(!el)return;
    const words=['Environmental Science Undergraduate','Climate & Biodiversity Research','Remote Sensing & GIS','Climate Philosophy','Environmental Policy & Compliance'];
    let i=0;el.textContent=words[0];if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    setInterval(()=>{i=(i+1)%words.length;el.style.opacity='0';setTimeout(()=>{el.textContent=words[i];el.style.opacity='1';},230);},2600);
  }
  function renderCategoryShortcuts(){
    const target=document.getElementById('certificate-category-shortcuts');if(!target)return;
    (window.CERTIFICATE_CATEGORIES||[]).forEach(cat=>{
      const a=document.createElement('a');a.className='card';a.href=`certificates-${cat.slug}.html`;a.style.color='var(--ink)';
      const row=document.createElement('div');row.className='category-row';
      const h=document.createElement('h3');h.textContent=cat.title;const arrow=document.createElement('span');arrow.className='arrow';arrow.textContent='⌄';row.append(h,arrow);
      const p=document.createElement('p');p.textContent=cat.short||cat.intro;
      const label=document.createElement('span');label.className='text-link';label.textContent='Open category →';a.append(row,p,label);target.append(a);
    });
  }
  document.addEventListener('DOMContentLoaded',()=>{
    prepareData();buildNav();buildFooter();renderCategoryShortcuts();renderCertificates();prepareDataLinks();setFavicon();startRotator();
    document.querySelectorAll('a[data-file-path]').forEach(a=>{const p=a.dataset.filePath;const candidates=getCandidatePaths([p],['pdf','jpg','docx']);locateFile(candidates).then(u=>a.href=u);});
  });
  window.PortfolioFiles={fileLink,getCandidatePaths,locateFile,setImageFallback};
})();
