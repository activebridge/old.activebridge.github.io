require 'sprite_factory'
SpriteFactory.run!('images/funny', style: :scss, output_style: '_sass/funny.scss', nocomments: true, cssurl: '../images/') do |images|
  rules = []
  rules << "div.running img.button { cursor: pointer; #{images[:style]} }"
  rules.join("\n")
end
