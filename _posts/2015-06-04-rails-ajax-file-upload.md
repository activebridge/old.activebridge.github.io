---
layout: post
title: Rails AJAX file upload
description: Dead simple rails file upload with remote forms.
tags: [rails ajax file upload, rails remotipart, rails jquery file upload, ajax loader, uploading files with ajax]
---

Rails AJAX file upload
-

Rails has nice [Unobtrusive scripting adapter](https://github.com/rails/jquery-ujs). It takes care about remote forms and links of your application. But there is one thing it can not handle: this is the AJAX file upload. But it is the provide the ability to handle that to other libs by adding the custom event called [`ajax:aborted:file`](https://github.com/rails/jquery-ujs/wiki/ajax#custom-events-fired-during-data-remote-requests).

After I did some research I found that there is only one lib that use this event and provide the ability to upload files with `remote` forms. This is the [remotipart](https://github.com/JangoSteve/remotipart). It uses the `iframe` workaround. But there should be the other ways to do it.

First I was thinking about the [`formData` interface](https://developer.mozilla.org/en/docs/Web/API/FormData) but it is not supported in by Internet Explorer. So there is only one alternative left - `base64`.

Let's code some coffee:

{% highlight coffee %}

$(document).on 'ajax:aborted:file', 'form', (e, inputs) ->
  j = 1
  form = $(@)
  $.map inputs, (input, i) ->
    fr = new FileReader()
    fr.readAsDataURL(input.files[0])
    fr.onload = ->
      form.append("<input type='hidden' name='#{input.name}' value='#{fr.result}' />")
      $.rails.handleRemote(form) if (inputs.length == j)
      j++
  return false

{% endhighlight %}

Now the files will be sending as `base64` strings under same names.
Next step is decode the files on the server. We were using the `carrierwave` for file uploading and I found the [carrierwave-base64](https://github.com/lebedev-yury/carrierwave-base64) gem that is doing exatly what I need.

Just add it to your `Gemfile`, and mount the uploader `mount_base64_uploader :image, ImageUploader`.

Also it is one more additional step is to add the parameter filter to keep you logs clean.

{% highlight ruby %}
config.filter_parameters += [:image]
{% endhighlight %}

All browser is supported except IE9 and lower. In case IE9 the form will be submited with regular `HTML` type.

I have extracted the javascript to separate [rails gem](https://github.com/activebridge/ufujs-rails).

Also it would be nice to have the rack middleware to encode the base64 string on middleware level.

Thanks
