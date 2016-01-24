Instalation
-

    git clone git@github.com:activebridge/activebridge.github.io.git activebridge
    cd activebridge
    bundle install
    bundle exec jekyll serve -w

Adding images
-

After adding or updating images generate sprites with:

    ruby sprite.rb

Steps to publish
-

Just push your changes to master branch

Blogging
-

To add new post to the blog you have to create a file in `_posts` directory. File name should be in the next format: `YEAR-MONTH-DAY-title.MARKUP`

For instance: `2011-12-31-new-years-eve-is-awesome.md` or `2012-09-12-how-to-write-a-blog.textile`.

Supported template engines is [Markdown](http://daringfireball.net/projects/markdown/) and [Textile](http://redcloth.org/textile).

See existing posts and [Jekyll Docs](http://jekyllrb.com/docs/posts/) for more information.
