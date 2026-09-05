# Index font

The compact World Clock index uses a locally hosted Latin subset of **Manrope**, with variable weights 400–700. No font service or build step is required. Keep this directory alongside `index.html` when browsing offline.

| File | Size | License |
| --- | ---: | --- |
| `manrope-latin-variable-400-700.woff2` | 24,576 bytes | [SIL OFL 1.1](Manrope-OFL.txt) |

Downloaded on 2026-09-05 from the official Google Fonts CSS API and `fonts.gstatic.com`. The WOFF2 is unmodified. Copyright 2018 The Manrope Project Authors; the adjacent license preserves the original notice. This font is not relicensed under the repository’s MIT License.

## Provenance

- [Official CSS request](https://fonts.googleapis.com/css2?family=Manrope:wght@400..700&display=swap)
- [Google Fonts WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2)
- [Original license in google/fonts](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt)

SHA-256: `e310b55a7fd9677f5e3555e6c6c4d064fa1f1d24393f0ddbe217cea12a8c432f`.

```css
@font-face {
  font-family: Manrope;
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url("assets/fonts/manrope-latin-variable-400-700.woff2") format("woff2");
}
```

Use a system sans-serif fallback for characters outside the Latin subset. The former index’s Bodoni Moda font has been removed because the redesigned page no longer uses it.
