require 'sprite_factory'

def convert(name)
  img = Magick::Image.read("images/#{name}.png").first
  img.format = 'JPEG'
  img.write("images/#{name}.jpg") { self.quality = 85 }
end

SpriteFactory.run!('images/funny', style: :scss, output_style: '_sass/funny.scss', nocomments: true, cssurl: '../images/') do |images|
  rules = []
  rules << ".member-img  { background: url(../images/funny.jpg); background-size: cover; }"
  images.each_with_index do |i, index|
    rules << ".#{i.first} { background-position: -#{100 * index}%; }"
  end
  rules.join("\n")
end

convert(:funny)

SpriteFactory.run!('images/members', style: :scss, output_style: '_sass/member.scss', nocomments: true, cssurl: '../images/') do |images|
  rules = []
  rules << ".member-img:after  { background: url(../images/members.jpg); background-size: cover; }"
  images.each_with_index do |i, index|
    rules << ".#{i.first}:after { background-position: -#{100 * index}%; }"
  end
  rules.join("\n")
end

convert(:members)
