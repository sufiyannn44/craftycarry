import os
import re

filepath = 'pages/allproducts.html'

replacements = [
    (r'"name": "jute bags (\d+)"', r'"name": "Jute bag \1"'),
    (r'"name": "cotton canvas (\d+)"', r'"name": "Cotton canvas bag \1"'),
    (r'"name": "hamper window (\d+)"', r'"name": "Hamper window bag \1"'),
    (r'"name": "bottle bags (\d+)"', r'"name": "Bottle bag \1"'),
    (r'"name": "kids bags (\d+)"', r'"name": "Kids bag \1"'),
    (r'"name": "plain bags (\d+)"', r'"name": "Plain jute & Cotton bag \1"'),
    (r'"name": "wedding gifting (\d+)"', r'"name": "Wedding gifting bag \1"'),
    (r'"name": "birthday gifting (\d+)"', r'"name": "Fancy gifting bag \1"'),
    (r'"name": "potli and drawstring (\d+)"', r'"name": "Drawstring bag \1"'),
]

if os.path.exists(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for old_patt, new_repl in replacements:
        content = re.sub(old_patt, new_repl, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print('Done!')
