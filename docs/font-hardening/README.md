# Font hardening evidence

Local production build (`next start` on this branch) vs live `www.winecountryrootcanal.com`.

## Font requests

Local home, root-canal, and about at 390 and 1440: **7/7** `.woff2` files returned **200**. **0** font 404s or failed font requests.

The seven faces are Playfair 400/700 and Source Sans 3 400 / 400 italic / 500 / 600 / 700.

## CLS (layout-shift, no recent input)

| Source | Path | 390 | 1440 |
| --- | --- | --- | --- |
| Local (this PR) | `/` | 0.000 | 0.000 |
| Live | `/` | 0.000 | 0.000 |
| Local | `/endodontic-procedures/root-canal-therapy` | 0.000 | 0.000 |
| Live | `/endodontic-procedures/root-canal-therapy` | 0.000 | 0.000 |
| Local | `/about` | 0.000 | 0.000 |
| Live | `/about` | 0.000 | 0.000 |

No CLS regression at either viewport.

## Review wording

- Local home: `4.9 from 200+ Google reviews` (hero) and `Google rating from 200+ reviews` (statement). About still uses the imported `166` total.
- Live home still says `166`.
