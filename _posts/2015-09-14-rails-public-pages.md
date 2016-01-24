---
layout: post
title: How to implement Rails Static Pages
description: Simple way to implement public pages in your rails app
tags: [rails static page,rails static pages, rails static pages routes, rails public page]
---

Rails Public Pages
-

Very often ror developer faces with a question how to implement public pages in your rails app such as About and FAQ. 
As known, there are several ways to do it. So, if your public page doesn't have nothing similar with your app layout you can put simple html page to your public folder. But sometime ago I have discovered another way:

{% highlight ruby %}

class PagesController < ApplicationController
  def about
  end

  def faq
  end
end

{% endhighlight %}

However, I guess this kind of implementation is very complicated because we need to add many actions and routes to achieve the result. 
Nevertheless, one should not forget that the main REST principle says that everything is resource. So we should look on this pages as resources.

I offer you to meet more flexible code:

`routes.rb`:
{% highlight ruby %}
  get ':page', to: 'pages#show', as: :page
{% endhighlight %}

`pages_controller.rb`:
{% highlight ruby %}
class PagesController < ApplicationController
  def show
    render params[:page]
  end
end
{% endhighlight %}

now we can use path helper to get these pages:
{% highlight ruby %}
  page_path(:about), page_path(:faq)
{% endhighlight %}

But there is possibility that user can pass invalid value as page parameter and template missing exception resises with status 500 that is not good.
To avoid that we will add constraints to our route

`routes.rb`:
{% highlight ruby %}
  get ':page', to: 'pages#show', as: :page, constraints: { page: /(howitworks|careers|about|faq)/ }
{% endhighlight %}

If you want to add new public page you just need to create a view for it in 'views/pages' folder and add additional constraint to routes.

Thanks
