---
layout: post
title: Sticky Header Bar
description: How easily implement sticky header with vanilla JavaScript
tags: [sticky header, position sticky, css for nav, css for nav element]
---

How easily implement sticky header with vanilla JavaScript
-

Let me show you the easiest way to implement sticky header:

We have next html:

{% highlight html %}
<body>
  <main id='main'>
    <section>
      ...
    </section>
    <nav id='navigation'>
      ...
    </nav>
    <section>
      ...
    </section>
  </main>
</body>
{% endhighlight %}

Let's write some css for `nav` element

{% highlight css %}
nav {
  position: absolute;
  width: 100%;
}
{% endhighlight %}

Now will add styles for fixed positioning:

{% highlight css %}
nav.fixed {
  position: fixed;
  top: 0;
}

{% endhighlight %}

Now is javascript part:

{% highlight javascript %}
var fixed = false,
nav       = document.getElementById('navigation'),
position  = nav.offsetTop;

function stick(){
  var scrollY = window.scrollY || window.pageYOffset
  if (scrollY > position && !fixed) {
    fixed = true;
    nav.className = nav.className + ' fixed';
  } else if (scrollY <= position && fixed) {
    fixed = false;
    nav.classList.remove('fixed');
  }
}

window.onscroll = stick;

{% endhighlight %}

You can check the working example [here](/#home)
