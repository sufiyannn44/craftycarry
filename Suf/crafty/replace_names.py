import os
import re

files = [
    'index.html',
    'pages/allproducts.html',
    'pages/product.html'
]

# (Regex Pattern, Replacement)
replacements = [
    (r'Jute tote bags?', 'Jute bag'),
    (r'Cotton canvas jute bags?', 'Cotton canvas bag'),
    (r'Plain bags?', 'Plain jute & Cotton bag'),
    (r'Birthday gifting bags?', 'Fancy gifting bag'),
    (r'Potli and drawstring bags?', 'Drawstring bag'),
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old_pattern, new_str in replacements:
            content = re.sub(f'>({old_pattern})<', f'>{new_str}<', content, flags=re.IGNORECASE)
            content = re.sub(f'>\s*({old_pattern})\s*<', f'> {new_str} <', content, flags=re.IGNORECASE)
            
            content = re.sub(f'alt="{old_pattern}"', f'alt="{new_str}"', content, flags=re.IGNORECASE)
            
            content = re.sub(f'openProduct\(\'{old_pattern}\'', f'openProduct(\'{new_str}\'', content, flags=re.IGNORECASE)
            content = re.sub(f'openProduct\(\'Basic {old_pattern}\'', f'openProduct(\'Basic {new_str}\'', content, flags=re.IGNORECASE)
            content = re.sub(f'openProduct\(\'Premium {old_pattern}\'', f'openProduct(\'Premium {new_str}\'', content, flags=re.IGNORECASE)
            content = re.sub(f'openProduct\(\'Designer {old_pattern}\'', f'openProduct(\'Designer {new_str}\'', content, flags=re.IGNORECASE)

            content = re.sub(f'<h2>{old_pattern}</h2>', f'<h2>{new_str}</h2>', content, flags=re.IGNORECASE)
            content = re.sub(f'<p>{old_pattern}</p>', f'<p>{new_str}</p>', content, flags=re.IGNORECASE)
            
            content = re.sub(f'>{old_pattern}</button>', f'>{new_str}</button>', content, flags=re.IGNORECASE)
            content = re.sub(f'>VIEW ALL {old_pattern}</button>', f'>VIEW ALL {new_str.upper()}</button>', content, flags=re.IGNORECASE)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
print('Done!')
