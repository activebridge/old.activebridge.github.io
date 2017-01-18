// Navigation

var fixed = false,
body      = document.body,
nav       = document.getElementById('navigation'),
menu      = document.getElementById('nav'),
slides    = document.getElementsByClassName('slide');

if (menu) var links = menu.getElementsByTagName('li');
if (nav) {
  var position = nav.offsetTop;
  window.onscroll = navigate;
}

function navigate(){
  var trigered = false;
  for (i = 0; i < slides.length; i++) {
    var slide = slides[i];
    links[i].classList.remove('active');
    if (slide.offsetTop + slide.offsetHeight > window.scrollY + window.outerHeight * 0.3) {
      if (!trigered) {
        links[i].className = 'active';
        history.replaceState({}, '', '#' + slide.id);
      }
      trigered = true;
    }
  }

  var scrollY = window.scrollY || window.pageYOffset
  if (scrollY > position && !fixed) {
    fixed = true;
    nav.className = nav.className + ' fixed';
  } else if (scrollY <= position && fixed) {
    fixed = false;
    nav.classList.remove('fixed');
  }
}

function popup(event, e) {
  event.preventDefault();
  l = screen.width/2-300;
  t = screen.height/2-165;
  window.open(e.href, 'sharer','toolbar=0, status=0, left='+l+', top='+t+', width=600, height=330')
  return false
}

// Google Analytics

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-50401698-2', 'auto');
  ga('send', 'pageview');

    window.smartlook||(function(d) {
    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    c.charset='utf-8';c.src='//rec.smartlook.com/recorder.js';h.appendChild(c);
    })(document);
    smartlook('init', 'b25855cd5b85e6e4016b25845cd50e5da30b684a');

// Fonts
WebFontConfig = {
  google: { families: [ 'Roboto+Condensed:400italic,700italic,400,700:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
