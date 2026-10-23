# Site fonts

Playfair Display (400/700) and Source Sans 3 (400/600) latin `.woff2` files, served
with `next/font/local`.

These used to load through `next/font/google`. Next.js 15.5.28 still crashes the
webpack build when Google Fonts returns an extensionless `/l/font?kit=` URL
(vercel/next.js#99114). Vendoring the files keeps CI and preview builds offline
for fonts.

Both families are SIL Open Font License 1.1 (`OFL-Playfair-Display.txt`,
`OFL-Source-Sans-3.txt`).
