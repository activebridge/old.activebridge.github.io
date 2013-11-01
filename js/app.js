// Google Analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-50401698-1', 'active-bridge.com');
ga('send', 'pageview');

// Navigation

var fixed = false,
body = document.body,
nav = document.getElementById('navigation'),
menu = document.getElementById('nav'),
links = menu.getElementsByTagName('li');
nav.classList.remove('fixed');
slides = document.getElementsByClassName('slide')
var position = nav.offsetTop;

function navigate(){
  var trigered = false;
  for (i = 0; i < slides.length; i++) {
    var slide = slides[i];
    links[i].classList.remove('active')
    if (slide.offsetTop < window.scrollY + window.outerHeight/2 && slide.offsetTop + slide.offsetHeight > window.scrollY) {
      if (!trigered) links[i].className = 'active';
      trigered = true;
    }
  }

  if (this.scrollY > position) {
    if (!fixed) {
      fixed = true;
      nav.className = nav.className + ' fixed';
    }
  } else {
    if (fixed) {
      fixed = false;
      nav.classList.remove('fixed');
    }
  }
}

function slideTo(el){
    var to = el.offsetTop,
        from = window.scrollY,
        dy = to-from;

    body.style.marginTop = dy+'px';
    window.scrollTo(0, to);

    body.style.transition = 'margin-top 0.5s ease-in-out';
    body.style.marginTop = 0;
}

function transitionEnd() {
  this.style.transition = 'none';
  navigate();
}

body.addEventListener('webkitTransitionEnd', transitionEnd);
body.addEventListener('transitionend', transitionEnd);
body.addEventListener('msTransitionEnd', transitionEnd);
body.addEventListener('oTransitionEnd', transitionEnd);

function bindScrollTo(event) {
  event.preventDefault();
  slideTo(document.getElementById(this.hash.substr(1)));
  var hash = this.hash
  setTimeout(function(){ location.hash = hash }, 500)
}

window.onscroll = navigate;

var id, buttons = document.getElementsByClassName('button');

for(i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', bindScrollTo);
}

buttons = menu.getElementsByTagName('a');

for(i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', bindScrollTo);
}
