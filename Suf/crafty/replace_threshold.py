with open('wishlist.js', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('threshold: 0.15,', 'threshold: 0.05,')
c = c.replace('rootMargin: "0px 0px -50px 0px"', 'rootMargin: "0px 0px -20px 0px"')

with open('wishlist.js', 'w', encoding='utf-8') as f:
    f.write(c)

print('Done!')
