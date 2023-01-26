import { Cam16 } from "./cam16";
import * as mathUtils from "./mathUtils";
import { argbFromHex, hexFromArgb } from "./stringUtils";

const HUE_SHIFT = 27.408225137158738;

function cam16ToHCL(cam16: Cam16) {
  const { jstar, astar, bstar } = cam16;
  let chroma = Math.sqrt(astar ** 2 + bstar ** 2);
  chroma = chroma * 1;

  let h: number;
  const ε = 0.0002; // chromatic components much smaller than a,b

  if (Math.abs(astar) < ε && Math.abs(bstar) < ε) {
    h = 0;
  } else {
    h = (Math.atan2(bstar, astar) * 180) / Math.PI;
  }

  return {
    h: mathUtils.sanitizeDegreesDouble(h - HUE_SHIFT),
    c: chroma,
    l: jstar,
  };
}
function hclToCAM16(hue: number, chroma: number, lightness: number) {
  let a: number, b: number;
  hue = hue += HUE_SHIFT;
  // check for NaN hue
  if (isNaN(hue)) {
    a = 0;
    b = 0;
  } else {
    a = chroma * Math.cos((hue * Math.PI) / 180);
    b = chroma * Math.sin((hue * Math.PI) / 180);
  }
  return Cam16.fromUcs(lightness, a, b);
}

export function hcl(hue: number, chroma: number, lightness: number) {
  return hexFromArgb(hclToCAM16(hue, chroma, lightness).toInt());
}

export function hexToHCL(hex: string) {
  return cam16ToHCL(Cam16.fromInt(argbFromHex(hex)));
}

export function harmonizeHue(designColor: number, sourceColor: number) {
  const differenceDegrees = mathUtils.differenceDegrees(
    designColor,
    sourceColor
  );
  const rotationDegrees = Math.min(differenceDegrees * 0.5, 15.0);
  const outputHue = mathUtils.sanitizeDegreesDouble(
    designColor +
      rotationDegrees * mathUtils.rotationDirection(designColor, sourceColor)
  );
  return outputHue;
}
