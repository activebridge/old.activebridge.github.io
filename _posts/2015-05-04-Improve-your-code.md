---
layout: post
title: Improve your code
description: Make your code clear
tags: [clear code, gems for ruby on rails, rubygems, useful ruby gems, bullet game rails]
---

Do you think your code clean, useful and readable?
-

Do you think your code clean, useful and readable?
I'm sure you wrong!

Rails community invented many gems what analyzing your code and give you know about stuff what you should improve.

Let me introduce some of them:

* [rails_best_practices](https://github.com/railsbp/rails_best_practices)

’sudo gem install rails_best_practices’

and run `rails_best_practices .`

but it has many configurations, so you have read documentation.

BTW, many Rails Best Prractices advices you can find on [site](http://rails-bestpractices.com/)


* [rubocop](https://github.com/bbatsov/rubocop)

`sudo gem install rubocop`

and run `rubocop`

many tweaks in documentation


* [Flay from Ruby Sadist](http://ruby.sadi.st/Flay.html)

just install `sudo gem install flay`

and run in command line `flay app/models/*.rb`


* [Imrove your SQL queries with Bullet](https://github.com/flyerhzm/bullet)

The Bullet gem is designed to help you increase your application's performance by reducing the number
of queries it makes. It will watch your queries while you develop your application and notify
you when you should add eager loading (N+1 queries), when you're using eager loading that isn't
necessary and when you should use counter cache.

add it into a Gemfile

`gem 'bullet', group: 'development'`

Append to `config/environments/development.rb` initializer with the following code:

    config.after_initialize do
      Bullet.enable = true
      Bullet.alert = true
      Bullet.bullet_logger = true
      Bullet.console = true
      Bullet.growl = true
    end

more detail on official GitHub page

* [Brakeman](https://github.com/presidentbeef/brakeman)

just install gem `gem install brakeman`

and run from app directory `brakeman`

and after analyzing it provide information in next categories:

- SUMMARY

- SECURITY WARNINGS

- Controller Warnings

- Model Warnings


P.S.

you have to know [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide), [Rails Style Guide](https://github.com/bbatsov/rails-style-guide) and [Better Specs](http://betterspecs.org/) or [Rspec Best Practices](https://github.com/abinoda/rspec-best-practices). And gems described above should just help you fix missed!

Have clean code!
