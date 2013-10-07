Instalation
-

    sudo gem install slim

Compilation
-
    slimrb index.html.slim index.html

Vim
-
    :map <silent> <C-s>  : w \| r! slimrb index.html.slim index.html<cr>
