import os
import re

files = [
    'index.html',
    'pages/allproducts.html',
    'pages/product.html'
]

# (Old pattern (regex), New replacement)
replacements = [
    (r'(?i)Jute tote bags?', 'Jute bag'),
    (r'(?i)Cotton canvas jute bags?', 'Cotton canvas bag'),
    (r'(?i)Plain bags?', 'Plain jute & Cotton bag'),
    (r'(?i)Birthday gifting bags?', 'Fancy bag'),
    (r'(?i)Potli and drawstring bags?', 'Drawstring bag'),
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        def replacer(match):
            text = match.group(0)
            for old_patt, new_repl in replacements:
                # If we are replacing inside a VIEW ALL button, we want all caps
                if 'VIEW ALL' in text.upper():
                    text = re.sub(old_patt, new_repl.upper(), text)
                else:
                    # preserve case if possible, or just replace
                    text = re.sub(old_patt, new_repl, text)
            return text

        # Target <h3>...</h3>
        content = re.sub(r'<h3[^>]*>.*?</h3>', replacer, content, flags=re.DOTALL)
        # Target <p>...</p>
        content = re.sub(r'<p[^>]*>.*?</p>', replacer, content, flags=re.DOTALL)
        # Target <h2>...</h2>
        content = re.sub(r'<h2[^>]*>.*?</h2>', replacer, content, flags=re.DOTALL)
        # Target <button>...</button>
        content = re.sub(r'<button[^>]*>.*?</button>', replacer, content, flags=re.DOTALL)
        # Target alt="..."
        content = re.sub(r'alt="[^"]*"', replacer, content)
        # Target openProduct('...')
        content = re.sub(r'openProduct\([^)]*\)', replacer, content)
        # Target >...< (general text nodes like Jute tote bag)
        # Be careful not to replace script contents. We'll target nav menu specifically.
        content = re.sub(r'<a href="#[^"]*">.*?</a>', replacer, content)
        content = re.sub(r'<a href="\.\./index\.html#[^"]*">.*?</a>', replacer, content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
print('Done!')
