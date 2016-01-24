---
layout: post
title: Let us remove controller logic
description: Super strange way to remove logic from your controller
tags: [rails api logic, ror controllers logic, logic controller, refactor api action]
---

Want to share super strange way to remove logic from controler.
-

Let us imagine that we have an API action:

{% highlight ruby %}
def create
  user = User.new(params[:user])
  if user.authorize?
    if user.valid?
      render json: { message: :success }, status: 201
    else
      render json: { message: :fail }, status: 422
    end
  else
    render json: { message: :fail }, status: 401
  end
end
{% endhighlight %}

How can we refactor it? We can use returns and make this action more readable

{% highlight ruby %}
def create
  user = User.new(params[:user])
  render json: { message: :fail }, status: 401 and return unless user.authorize?
  render json: { message: :fail }, status: 422 and return unless user.valid?
  render json: { message: :success }, status: 201
end
{% endhighlight %}

It looks a bit better right now. But there are still a lot of conditions. And we can use `String` interpolation to remove the conditions completely

{% highlight ruby %}
user = User.new(params[:user])
res = I18n.t("users.create.response.#{user.authorize?}_#{user.valid?}")
render json: { message: res[:message] }, status: res[:status]
{% endhighlight %}

As you can see I have used `I18n` here and we need to add next code to our locales:
{% highlight yaml %}
en:
  users:
    create:
      response:
        false_false:
          message: failure
          status: 401
        true_false:
          message: failure
          status: 422
        false_true:
          message: failure
          status: 401
        true_true:
          message: success
          status: 201
{% endhighlight %}

Advantages: No logic at all

Disadvantages: Second method will be called any way

I am not sure that we should use it in real life but I hope this approach will help someone.

How would you refactor this action?
