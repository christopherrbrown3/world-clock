# Reflection Beam Reference Notes

This note records how the from-scratch Reflection Beam rendition ([`versions/reflection-beam.html`](../versions/reflection-beam.html)) was researched, architected, and built.

## Reference coverage

- All 62 watch and clock faces were authored against the maintainer-supplied reference photo archive (`watchpics.zip`), which provided multiple high-resolution reference photographs per face across divers, chronographs, haute horlogerie pieces, and architectural clocks.

## Intentional approximations

- Movement cadences follow the catalog: `sweep` at 8 steps/sec, `tick` at 1 step/sec, `glide` continuous, `mondaine` 58-second sweep, `digital` LCD.
- Moonphase apertures use a continuous synodic lunar phase calculation.
- Chronographs feature working start/stop/reset controls.

## Validation

- `npm test` passes all repository checks across all 62 required watch face keys.
