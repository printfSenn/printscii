import { FALLBACK_CHAR_WIDTH, FONT_STACK } from '../core/constants.js';

export function measureCharWidth() {
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = `100px ${FONT_STACK}`;
    const width = ctx.measureText('M').width / 100;
    return width > 0.2 && width < 1.2 ? width : FALLBACK_CHAR_WIDTH;
  } catch (error) {
    return FALLBACK_CHAR_WIDTH;
  }
}
