# Self-hosted index fonts

Downloaded on 2026-09-05 from the official Google Fonts CSS API and `fonts.gstatic.com`. The WOFF2 files are the unmodified Latin subsets supplied by Google Fonts. No font build tooling or remote font requests are required by the site.

| File | Selection | Bytes | License |
| --- | --- | ---: | --- |
| `bodoni-moda-latin-500-opsz72.woff2` | Bodoni Moda, normal style, weight 500, optical size 72 | 14,904 | [SIL OFL 1.1](Bodoni-Moda-OFL.txt) |
| `manrope-latin-variable-400-700.woff2` | Manrope, normal style, variable weights 400–700 | 24,576 | [SIL OFL 1.1](Manrope-OFL.txt) |

Total font payload: **39,480 bytes (38.6 KiB)**.

## Official provenance

The request used a current Chromium user-agent to obtain WOFF2 responses:

- [Google Fonts CSS request](https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@72,500&family=Manrope:wght@400..700&display=swap)
- [Bodoni Moda Latin WOFF2, Google Fonts v28](https://fonts.gstatic.com/s/bodonimoda/v28/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-9PvfJMShrpsGFUt8oXza8Id4tHrJcwDioQ.woff2)
- [Manrope Latin variable WOFF2, Google Fonts v20](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2)
- [Bodoni Moda license, google/fonts](https://github.com/google/fonts/blob/main/ofl/bodonimoda/OFL.txt)
- [Manrope license, google/fonts](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt)

Bodoni Moda copyright: 2020 The Bodoni Moda Project Authors. Manrope copyright: 2018 The Manrope Project Authors. Each adjacent OFL file preserves the full original copyright notice and license text. These font licenses are separate from the repository's application-code license.

SHA-256 checksums:

```text
d50d6ea5a3760e5b2fc8fc7b3f8af3edf2f531bbaac6397e5e3ff685d066cccf  bodoni-moda-latin-500-opsz72.woff2
e310b55a7fd9677f5e3555e6c6c4d064fa1f1d24393f0ddbe217cea12a8c432f  manrope-latin-variable-400-700.woff2
```

## CSS for the root index

```css
@font-face {
  font-family: "Bodoni Moda";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("./assets/fonts/bodoni-moda-latin-500-opsz72.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url("./assets/fonts/manrope-latin-variable-400-700.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Bodoni Moda's optical size is already selected in the downloaded file. Use its declared weight 500 for headings. Manrope supports any declared weight between 400 and 700. Include local serif/sans-serif fallback stacks for characters outside these Latin subsets.
