# Dr Dependable Dentistry — Premium Website Update

## Included
- `index.html` — site markup, clinic sections, clinical gallery, and text-only patient reviews.
- `style.css` — existing site styling.
- `carousel.css` — dedicated gallery/review carousel styling and mobile fixes.
- `script.js` — navigation and general page enhancements.
- `carousel.js` — dedicated carousel controls and review marquee loop.
- `assets/images/` — clinic assets and case images.

## Important fixes in this update
- Clinical photos use `object-fit: contain` inside a consistent frame, preserving their original proportions instead of stretching them on mobile.
- The doctor heading `Dr. Aneesh Dev V A` is kept on a single line with responsive typography.
- Clinical work cards use a horizontal, snap-aligned carousel with dedicated previous/next controls.
- Patient review cards use two horizontal marquee rows with opposing motion. Review cards are text-only; screenshot images are not embedded.
- Reduced-motion preferences are respected.

## Deploy
Upload the contents of this folder to the root of the existing GitHub Pages repository. Keep the `assets/images/` directory structure unchanged. Commit the files, then hard-refresh the site on mobile. The HTML loads `carousel.css` and `carousel.js` separately; keep both files beside `index.html`.

## Note
The visual layout has been corrected in code, but the live rendered page should still be checked on the actual GitHub Pages URL after deployment.
