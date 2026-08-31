
try{

  // Nav glassmorphism on scroll
  var nav=document.getElementById('mainNav');
  window.addEventListener('scroll',function(){
    nav.classList.toggle('scrolled',window.scrollY>60);
  },{passive:true});

}catch(e){/* section absent on this page */}

try{

  // Tab switching for Who We Serve section
  var serveTabIds = ['sellers','agents','jv-partners','investors'];
  function showServeTab(tabId) {
    document.querySelectorAll('.s-tab').forEach(function(t){
      t.classList.toggle('active', t.dataset.tab === tabId);
    });
    document.querySelectorAll('.s-panel').forEach(function(p){
      p.classList.toggle('active', p.id === tabId);
    });
  }
  document.querySelectorAll('.s-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ showServeTab(this.dataset.tab); });
  });

}catch(e){/* section absent on this page */}

try{
  // Activate tab from hash on page load
  (function(){
    var hash = window.location.hash.slice(1);
    if(serveTabIds.indexOf(hash) > -1) showServeTab(hash);
  })();

}catch(e){/* section absent on this page */}

try{

  // Smooth scroll (tab-aware)
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var h=this.getAttribute('href');
      if(h==='#')return;
      var targetId = h.slice(1);
      if(serveTabIds.indexOf(targetId) > -1) {
        e.preventDefault();
        showServeTab(targetId);
        var bar = document.querySelector('.s-tab-bar');
        if(bar) bar.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',h);
      } else {
        e.preventDefault();
        var t=document.querySelector(h);
        if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

}catch(e){/* section absent on this page */}

try{

  // Scroll reveal (Intersection Observer)
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el);});

}catch(e){/* section absent on this page */}

try{

  // Form tabs
  var tabs=document.querySelectorAll('.form-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.classList.remove('active');});
      document.querySelectorAll('.form-pane').forEach(function(p){p.classList.remove('active');});
      tab.classList.add('active');
      document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    });
  });

}catch(e){/* section absent on this page */}

try{

  // Form submissions
  function handleForm(formId,cardId,successId){
    var form=document.getElementById(formId);
    if(!form)return;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('.btn-submit');
      var orig=btn.textContent;
      btn.textContent='Sending...';btn.disabled=true;
      var isZoho=form.dataset.zoho==='1';
      if(form.id==='investorForm'){
        var parts=[];
        var pk=function(label,sel){var el=document.getElementById(sel);if(el&&el.value){parts.push(label+': '+el.value);}};
        pk('Company','i-company');pk('Target Markets / States','i-markets');pk('Development Focus','i-type');pk('Acquisition Approach','i-finance');pk('Land Budget / Max Site Price','i-max');
        document.getElementById('i-desc-packed').value=parts.length?('BUY BOX DETAILS\n'+parts.join('\n')):'';
      }
      var fetchOpts=isZoho
        ?{method:'POST',body:new URLSearchParams(new FormData(form)),mode:'no-cors'}
        :{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}};
      fetch(form.action,fetchOpts)
      .then(function(r){
        if(isZoho||r.ok){
          document.getElementById(cardId).style.display='none';
          document.getElementById(successId).style.display='block';
        } else {
          btn.textContent=orig;btn.disabled=false;
          alert('Something went wrong. Please call (404) 981-5935 or email admin@goldenvisionacquisitions.com');
        }
      })
      .catch(function(){
        btn.textContent=orig;btn.disabled=false;
        alert('Network error. Please call (404) 981-5935 or email admin@goldenvisionacquisitions.com');
      });
    });
  }
  handleForm('sellerForm','seller-card','seller-success');
  handleForm('partnerForm','partner-card','partner-success');
  handleForm('investorForm','investor-card','investor-success');

}catch(e){/* section absent on this page */}

try{

  // Show thank-you when returning from a form redirect (?submitted=seller|partner|investor)
  var subParam=new URLSearchParams(window.location.search).get('submitted');
  if(subParam){
    var subMap={seller:['sellers','seller-card','seller-success'],partner:['partners','partner-card','partner-success'],investor:['investors','investor-card','investor-success']};
    var m=subMap[subParam];
    if(m){
      tabs.forEach(function(t){t.classList.remove('active');if(t.dataset.tab===m[0]){t.classList.add('active');}});
      document.querySelectorAll('.form-pane').forEach(function(p){p.classList.remove('active');});
      var pane=document.getElementById('tab-'+m[0]);
      if(pane){pane.classList.add('active');}
      var c=document.getElementById(m[1]),s=document.getElementById(m[2]);
      if(c){c.style.display='none';}
      if(s){s.style.display='block';}
    }
  }

}catch(e){/* section absent on this page */}

try{

  // Mobile hamburger menu
  var ham=document.getElementById('hamburger');
  var mobMenu=document.getElementById('mobMenu');
  if(ham&&mobMenu){
    var closeMenu=function(){
      ham.classList.remove('open');
      mobMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    ham.addEventListener('click',function(){
      ham.classList.toggle('open');
      mobMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open',mobMenu.classList.contains('open'));
    });
    mobMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',closeMenu);
    });
    var mobClose=document.getElementById('mobClose');
    if(mobClose){mobClose.addEventListener('click',closeMenu);}
    mobMenu.addEventListener('click',function(e){
      if(e.target===mobMenu){closeMenu();}
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){closeMenu();}
    });
  }

}catch(e){/* section absent on this page */}

try{
  // Back to top button
  var backTop=document.getElementById('backTop');
  if(backTop){
    window.addEventListener('scroll',function(){
      backTop.classList.toggle('show',window.scrollY>600);
    },{passive:true});
    backTop.addEventListener('click',function(){
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

}catch(e){/* section absent on this page */}
