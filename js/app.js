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

 var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-50401698-2']);
  _gaq.push(['_trackPageview']);
  setTimeout("_gaq.push(['_trackEvent', '15_seconds', 'read'])",15000);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

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
