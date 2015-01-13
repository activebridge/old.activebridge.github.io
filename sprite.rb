require 'sprite_factory'
SpriteFactory.run!('images/funny', style: :scss, output_style: '_sass/funny.scss', nocomments: true, cssurl: '../images/') do |images|
  rules = []
  rules << ".member-img  { background: url(../images/funny.png); background-size: cover; }"
  images.each_with_index do |i, index|
    rules << ".#{i.first} { background-position: -#{100 * index}%; }"
  end
  rules.join("\n")
end
SpriteFactory.run!('images/members', style: :scss, output_style: '_sass/member.scss', nocomments: true, cssurl: '../images/') do |images|
  rules = []
  rules << ".member-img img  { background: url(../images/members.png); background-size: cover; }"
  images.each_with_index do |i, index|
    rules << ".#{i.first} img { background-position: -#{100 * index}%; }"
  end
  rules.join("\n")
end
