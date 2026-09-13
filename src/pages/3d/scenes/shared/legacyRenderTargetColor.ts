import { Color, ColorRepresentation, LinearSRGBColorSpace } from "three";

// three's ACESFilmicToneMapping (src/renderers/shaders/ShaderChunk/
// tonemapping_pars_fragment.glsl.js), unchanged since r120, at exposure 1.
const rrtAndOdtFit = (v: number) =>
  (v * (v + 0.0245786) - 0.000090537) /
  (v * (0.983729 * v + 0.432951) + 0.238081);

const acesFilmicToneMapping = ([r, g, b]: [number, number, number]) => {
  const [x, y, z] = [r / 0.6, g / 0.6, b / 0.6];
  const fit = [
    rrtAndOdtFit(0.59719 * x + 0.35458 * y + 0.04823 * z),
    rrtAndOdtFit(0.076 * x + 0.90834 * y + 0.01566 * z),
    rrtAndOdtFit(0.0284 * x + 0.13383 * y + 0.83777 * z),
  ];
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  return [
    clamp(1.60475 * fit[0] - 0.53108 * fit[1] - 0.07367 * fit[2]),
    clamp(-0.10208 * fit[0] + 1.10813 * fit[1] - 0.00605 * fit[2]),
    clamp(-0.00327 * fit[0] - 0.07276 * fit[1] + 1.07602 * fit[2]),
  ] as const;
};

/**
 * The colour three r138 wrote into the bloom composer's render target for a
 * material colour, as a linear `Color` that three r186 writes there unchanged.
 *
 * The scene was tuned on three r138 + R3F 7, which applied the renderer's
 * ACESFilmic tone mapping (R3F's default) to materials rendered into render
 * targets too. three ≥ r15x only tone-maps when rendering to the screen, so the
 * composer now sees the untouched (linear) colour, and since the render target
 * feeds UnrealBloomPass that changes the colour and strength of the glow.
 * Feeding the tone-mapped colour in instead keeps the final image the same:
 * the composer's screen output stage (tone mapping + sRGB encoding via
 * MeshBasicMaterial, then the additive bloom) is unchanged.
 *
 * The sRGB → linear decoding of hex colours is the same in both (R3F 7 did it
 * itself with `convertSRGBToLinear`; three's `ColorManagement` does it now).
 *
 * The renderer-level switches don't reproduce this: `<Canvas flat>` (no tone
 * mapping) and `gl.outputColorSpace` change the screen stage too, whereas the
 * difference is confined to what enters the render target. Without this the
 * glow comes out visibly bluer and weaker (B/R ≈ 3.0 vs 1.77 in the halo).
 */
export const legacyRenderTargetColor = (color: ColorRepresentation): Color => {
  const { r, g, b } = new Color(color);
  return new Color().setRGB(
    ...acesFilmicToneMapping([r, g, b]),
    LinearSRGBColorSpace,
  );
};
