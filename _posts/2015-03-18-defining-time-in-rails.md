---
layout: post
title: Time in Rails Applications
description: Defining time and date in Rails applications
tags: [rails api logic, ror controllers logic]
---

# Time in Rails Applications
-

If your Application targets on region(s) with more than one time-zone, you should use server time zone.

So, instead:

    Time.now # 2015-03-18 16:18:00 +0200
  
use

    Time.zone.new # Wed, 18 Mar 2015 14:18:00 UTC +00:00

or

    Time.current # Wed, 18 Mar 2015 14:18:00 UTC +00:00
  
More detail you can read in article [The Exhaustive Guide to Rails Time Zones](http://danilenko.org/2012/7/6/rails_timezones/)

P.S.

Same with `Date` and `DateTime`.



` @olegsobchuk`
