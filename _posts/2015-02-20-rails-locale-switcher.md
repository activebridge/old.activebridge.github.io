---
layout: post
title: Rails locales switcher
description: Simple and clean rails locales switcher.
tags: [rails locale switch, switch locale in rails, rails locales, ror locales, ror locales switch]
---

Simple Rails locales switcher
-

We are going to build simple functionality for switching locale in this blog post

Lets go to `config/application.rb` and specify some additional locales configs

{% highlight ruby %}
config.i18n.available_locales = [:en, :ua]
config.i18n.default_locale = :en
{% endhighlight %}

Now let us create controller and route for switching the locale. We will use session to store the locale.

routes:
{% highlight ruby %}
Rails.application.routes.draw do

  resources :locales, only: :update, constraints: { id: /(en|ua)/ }

end
{% endhighlight %}

controller:
{% highlight ruby %}
class LocalesController < ApplicationController

  def update
    session[:locale] = params[:id]
    redirect_to :back
  end

end
{% endhighlight %}

Now we have to add `before_action` to our `application_controller.rb` to set the locale
{% highlight ruby %}
class ApplicationController < ActionController::Base
  before_action :set_locale

  private

  def set_locale
    I18n.locale = session[:locale] || I18n.default_locale
  end
end
{% endhighlight %}

Also will be helpful to create a helper method to check the locale
{% highlight ruby %}
module ApplicationHelper

  def current_locale?(locale)
    I18n.locale == locale
  end

end
{% endhighlight %}

Add this to view. I am using slim here.
{% highlight slim %}
=> link_to_unless current_locale?(:en), :EN, language_path(:en), method: :patch
' |
= link_to_unless current_locale?(:ua), :UA, language_path(:fr), method: :patch
{% endhighlight %}

In case adding new locale you have to update the constraints in routes.rb and add new link to view and the locales for new language.
