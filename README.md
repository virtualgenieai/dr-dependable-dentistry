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


## Final gallery and motion update
- Added treatment-labelled horizontal clinical case cards: Biomimetic Dentistry, Smile Designing, Orthodontic Treatment, Prosthodontic Treatment, and two Cosmetic Dentistry examples.
- Clinical images are cropped from the clinic-supplied poster uploads to remove poster typography/logos where possible; they are displayed with `object-fit: contain` to avoid stretching. Since the original photos were supplied embedded in composite posters rather than as separate original files, some crops retain the source resolution and may include a small amount of edge content. For the cleanest clinical quality, replace these with original uncropped photographs when available.
- Added dedicated `carousel.css` and `carousel.js` for horizontal touch navigation.
- Added a full-screen mobile navigation reveal, staggered link transitions, body scroll lock, Escape handling and reduced-motion support.
- Doctor name uses non-wrapping styling on small screens.

### Test
Open `index.html` locally or publish the folder to GitHub Pages. Test menu open/close, Escape, selecting a link, horizontal swipe/arrow controls in Clinical Work, and reduced-motion settings. This package was statically reviewed; it was not browser-tested on physical devices in this environment.


## Correction in this archive
- The Smile Designing card now uses the newly supplied Smile Designing case, not the earlier mismatched composite.
- Its before/after mouth photographs are cropped from the poster and shown side by side; the poster background, logo, appointment text, and decorative typography are excluded.
- `smile-design-before.webp` and `smile-design-after.webp` are included as separate source crops for future use.
- The website published on GitHub Pages will not change when you download this ZIP. Replace the corresponding files in the GitHub repository and commit/push them, then refresh the published site after deployment.


## Copyright-risk reduction — treatment imagery
- Replaced the nine decorative treatment art placeholders with original AI-generated dental visuals created for this site.
- The hero visual now uses the generated cosmetic dentistry artwork instead of the previous unverified hero asset.
- New assets are stored in `assets/images/treatments/` as optimised WebP files.
- These visuals are illustrative, not real patient cases or a promise of treatment outcomes.
- This reduces reliance on images found through Google Images/Pinterest, but does not constitute a legal guarantee; retain generation records and review the image provider's applicable terms.
- The existing doctor portrait and clinical case gallery were preserved. Confirm clinic ownership/permission and patient consent for clinical photographs before publishing.
