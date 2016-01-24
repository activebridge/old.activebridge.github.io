---
layout: post
title: Useful helpers
description: Useful unknown helpers in ROR
tags: [ror helpers, ror view helpers, form helpers ruby on rails]
---

Useful helpers in Ruby on Rails
-

All Rails developers know helpers such as `link_to`, `mail_to` or `form_for`, but few described below helpers are unknown and used very seldom.

So, let's start!

###Numbers helpers.

####`number_to_currency(number, options = {}) `

`number_to_currency(1234567890.50)                    # => $1,234,567,890.50`

`number_to_currency(1234567890.506)                   # => $1,234,567,890.51`

`number_to_currency(1234567890.506, precision: 3)     # => $1,234,567,890.506`

`number_to_currency(1234567890.50, unit: "R$", separator: ",", delimiter: "", format: "%n %u") # => 1234567890,50 R$`


####`number_to_human(number, options = {})`

`number_to_human(123)                                          # => "123"`

`number_to_human(1234)                                         # => "1.23 Thousand"`

`number_to_human(12345)                                        # => "12.3 Thousand"`

`number_to_human(1234567)                                      # => "1.23 Million"`

`number_to_human(1234567890)                                   # => "1.23 Billion"`

`number_to_human(1234567890123)                                # => "1.23 Trillion"`

`number_to_human(1234567890123456)                             # => "1.23 Quadrillion"`

`number_to_human(1234567890123456789)                          # => "1230 Quadrillion"`

`number_to_human(489939, precision: 2)                         # => "490 Thousand"`

`number_to_human(1234567, precision: 1, separator: ',', significant: false)  # => "1,2 Million"`

####`number_to_human_size(number, options = {})`

`number_to_human_size(123)                                          # => 123 Bytes`

`number_to_human_size(1234)                                         # => 1.21 KB`

`number_to_human_size(12345)                                        # => 12.1 KB`

`number_to_human_size(1234567)                                      # => 1.18 MB`

`number_to_human_size(1234567890)                                   # => 1.15 GB`

`number_to_human_size(1234567890123)                                # => 1.12 TB`

`number_to_human_size(1234567, precision: 2)                        # => 1.2 MB`

`number_to_human_size(483989, precision: 2)                         # => 470 KB`

`number_to_human_size(1234567, precision: 2, separator: ',')        # => 1,2 MB`

`number_to_human_size(1234567890123, precision: 5)                  # => "1.1228 TB"`

`number_to_human_size(524288000, precision: 5)                      # => "500 MB"`

####`number_to_percentage(number, options = {})`

`number_to_percentage(100)                                        # => 100.000%`

`number_to_percentage("98")                                       # => 98.000%`

`number_to_percentage(100, precision: 0)                          # => 100%`

`number_to_percentage(1000, delimiter: '.', separator: ',')       # => 1.000,000%`

`number_to_percentage(302.24398923423, precision: 5)              # => 302.24399%`

`number_to_percentage("98a")                                      # => 98a%`

`number_to_percentage(100, format: "%n  %")                       # => 100  %`

`number_to_percentage("98a", raise: true)                         # => InvalidNumberError`

####`number_to_phone(number, options = {})`

`number_to_phone(5551234)                                           # => 555-1234`

`number_to_phone("5551234")                                         # => 555-1234`

`number_to_phone(1235551234)                                        # => 123-555-1234`

`number_to_phone(1235551234, area_code: true)                       # => (123) 555-1234`

`number_to_phone(1235551234, delimiter: " ")                        # => 123 555 1234`

`number_to_phone(1235551234, area_code: true, extension: 555)       # => (123) 555-1234 x 555`

`number_to_phone(1235551234, country_code: 1)                       # => +1-123-555-1234`

`number_to_phone("123a456")                                         # => 123a456`

`number_to_phone("1234a567", raise: true)                           # => InvalidNumberError`

####`number_with_delimiter(number, options = {})`

`number_with_delimiter(12345678)                        # => 12,345,678`

`number_with_delimiter("123456")                        # => 123,456`

`number_with_delimiter(12345678.05)                     # => 12,345,678.05`

`number_with_delimiter(12345678, delimiter: ".")        # => 12.345.678`

`number_with_delimiter(12345678, delimiter: ",")        # => 12,345,678`

`number_with_delimiter(12345678.05, separator: " ")     # => 12,345,678 05`

`number_with_delimiter(12345678.05, locale: :fr)        # => 12 345 678,05`

`number_with_delimiter("112a")                          # => 112a`

`number_with_delimiter(98765432.98, delimiter: " ", separator: ",") # => 98 765 432,98`

####`number_with_precision(number, options = {})`

`number_with_precision(111.2345)                                         # => 111.235`

`number_with_precision(111.2345, precision: 2)                           # => 111.23`

`number_with_precision(13, precision: 5)                                 # => 13.00000`

`number_with_precision(389.32314, precision: 0)                          # => 389`

`number_with_precision(111.2345, significant: true)                      # => 111`

`number_with_precision(111.2345, precision: 1, significant: true)        # => 100`

`number_with_precision(13, precision: 5, significant: true)              # => 13.000`

### Text helpers

####`pluralize(count, singular, plural = nil)`

`pluralize(1, 'person') # => 1 person`

`pluralize(2, 'person') # => 2 people`

`pluralize(3, 'person', 'users') # => 3 users`

`pluralize(0, 'person') # => 0 people`

####`cycle(first_value, *values)`

useful for paint table rows

    <table>
  
      <% @items.each do |item| %>
    
        <tr class="<%= cycle("odd", "even") -%>">
      
          <td>item\</td>
        
        </tr>
      
      <% end %>
    
    </table>
 
####`truncate(text, options = {}, &block)`

  truncate("Once upon a time in a world far far away")
  # => "Once upon a time in a world..."

  truncate("Once upon a time in a world far far away", length: 17)
  # => "Once upon a ti..."

  truncate("Once upon a time in a world far far away", length: 17, separator: ' ')
  # => "Once upon a..."

  truncate("And they found that many people were sleeping better.", length: 25, omission: '... (continued)')
  # => "And they f... (continued)"

  truncate("\<p>Once upon a time in a world far far away\</p>")
  # => "\<p>Once upon a time in a wo..."

  truncate("\<p>Once upon a time in a world far far away\</p>", escape: false)
  # => "\<p>Once upon a time in a wo..."

  truncate("Once upon a time in a world far far away") { link_to "Continue", "#" }
  # => "Once upon a time in a wo...\<a href="#">Continue\</a>"
  
  
  P.S.
  
  maye you know some unknown and useful helpers, let me know and I'll add it to article.
  
  
  [@olegsobchuk](https://github.com/olegsobchuk)
