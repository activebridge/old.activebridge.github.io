---
layout: post
title: Fighting duplication in AngularJS controllers
description: Very often we face duplication in angular controllers, here we describe one of the approaches to solve the problem
tags: [angularjs, AngularJS controller, AngularJS controllers, coffeescript]
---

Very often we face duplication in angular controllers, here we describe one of the approaches to solve the problem
-

There are not so many challenges you face when working with AngularJS framework. In this article I would like to discuss code duplication in AngularJS controllers. Duplication is not something new but with AngularJS I saw some approaches that I didn't like but those are widely used.

So let's say we have a simple forum app. The home page displays the list of all posts and user is able to like or dislike particular post.
In AngularJS controller we would have someting like:
below I'm going to use coffeescript

{% highlight javascript %}
forumApp.controller 'PostsController', [
  '$scope', 'Post'
  ($scope, Post) ->

    $scope.posts = Post.query()

    markAsVoted = (post, vote) ->
      Post.update
        id: post.id
        vote: vote
        , (response) ->
          post.votes = response.votes

    $scope.voteUp = (post) ->
      markAsVoted(post, true)

    $scope.voteDown = (post) ->
      markAsVoted(post, false)

]
{% endhighlight %}

So far nothing special. We have two functions that get executed once user liked or disliked a post.

Let's move further.

Then we need to implement a post page. When user found some post interesting he clicks on it and he is able to read the rest of the post and see other users' comments.
So we provide new AngularJS controller with appropriate template.

{% highlight javascript %}
forumApp.controller 'PostDetailsController', [
  '$scope', 'Post', '$routeParams'
  ($scope, Post, $routeParams) ->

    $scope.post = Post.get id: $routeParams.id
]
{% endhighlight %}

Then we think that user should be able to like/dislike this post within this page as well.
On the template layer we would probably use ng-include and that's it.
What about AngularJS controller?
First and easiest solution is simply copy and paste appropriate functions from PostsController.


{% highlight javascript %}
forumApp.controller 'PostDetailsController', [
  '$scope', 'Post', '$routeParams'
  ($scope, Post, $routeParams) ->

    $scope.post = Post.get id: $routeParams.id

    markAsVoted = (post, vote) ->
      Post.update
        id: post.id
        vote: vote
        , (response) ->
          post.votes = response.votes

    $scope.voteUp = (post) ->
      markAsVoted(post, true)

    $scope.voteDown = (post) ->
      markAsVoted(post, false)

]
{% endhighlight %}

And as we can see we've got the duplication.

For some reason I found that many AngularJS users use $rootScope to solve this problem. If we go this way then our controllers would look like:

{% highlight javascript %}
forumApp.controller 'PostsController', [
  '$scope', 'Post', '$rootScope'
  ($scope, Post, $rootScope) ->

    $rootScope.postController = $scope

    $scope.posts = Post.query()

    markAsVoted = (post, vote) ->
      Post.update
        id: post.id
        vote: vote
        , (response) ->
          post.votes = response.votes

    $scope.voteUp = (post) ->
      markAsVoted(post, true)

    $scope.voteDown = (post) ->
      markAsVoted(post, false)

]
{% endhighlight %}


{% highlight javascript %}
forumApp.controller 'PostDetailsController', [
  '$scope', 'Post', '$routeParams', '$rootScope'
  ($scope, Post, $routeParams, $rootScope) ->

    $scope.post = Post.get id: $routeParams.id

    $scope.voteUp = (post) ->
      $rootScope.postController.voteUp(post)

    $scope.voteDown = (post) ->
      $rootScope.postController.voteDown(post)
]
{% endhighlight %}

At first glance seems like delegating our functions to postsController solves the problem: no duplication, minimum updates in existing controllers.
But I think this is totally wrong!
In my ideal world developers just don't use $rootScope. If we continue using this approach then the whole AngularJS app would turn to spaghetti, all controllers call functions in each other ruining single responsibility principle and hence would be hard to understand what is going on here, debug and maintain.

I'm pretty sure there are many other better solutions to this problem and I would like to describe one of them.
The idea is taken from ruby mixins and applying Decorator pattern.
So we just extract duplicated code into a decorator and apply it for $scope of each controller we need.

Here is how a decorator would look like:

{% highlight javascript %}
forumApp.factory 'postDecorator', [
  'Post'
  (Post) ->
    markAsVoted = (post, vote) ->
      Post.update
        id: post.id
        vote: vote
        , (response) ->
          post.votes = response.votes

    $scope.voteUp = (post) ->
      markAsVoted(post, true)

    $scope.voteDown = (post) ->
      markAsVoted(post, false)
]
{% endhighlight %}

And then our controllers:


{% highlight javascript %}
forumApp.controller 'PostsController', [
  '$scope', 'Post', 'postDecorator'
  ($scope, Post, postDecorator) ->

    postDecorator($scope)

    $scope.posts = Post.query()
]
{% endhighlight %}


{% highlight javascript %}
forumApp.controller 'PostDetailsController', [
  '$scope', 'Post', '$routeParams', 'postDecorator'
  ($scope, Post, $routeParams, postDecorator) ->

    postDecorator($scope)

    $scope.post = Post.get id: $routeParams.id
]
{% endhighlight %}

Looks much better, doesn't it?


[@eugenekorpan](https://github.com/eugenekorpan)
