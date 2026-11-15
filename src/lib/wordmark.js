const GLYPHS = Object.freeze({
  P: [
    '██████╗ ',
    '██╔══██╗',
    '██████╔╝',
    '██╔═══╝ ',
    '██║     ',
    '╚═╝     '
  ],
  R: [
    '██████╗ ',
    '██╔══██╗',
    '██████╔╝',
    '██╔══██╗',
    '██║  ██║',
    '╚═╝  ╚═╝'
  ],
  I: [
    '██╗',
    '██║',
    '██║',
    '██║',
    '██║',
    '╚═╝'
  ],
  N: [
    '███╗   ██╗',
    '████╗  ██║',
    '██╔██╗ ██║',
    '██║╚██╗██║',
    '██║ ╚████║',
    '╚═╝  ╚═══╝'
  ],
  T: [
    '████████╗',
    '╚══██╔══╝',
    '   ██║   ',
    '   ██║   ',
    '   ██║   ',
    '   ╚═╝   '
  ],
  S: [
    '███████╗',
    '██╔════╝',
    '███████╗',
    '╚════██║',
    '███████║',
    '╚══════╝'
  ],
  C: [
    ' ██████╗',
    '██╔════╝',
    '██║     ',
    '██║     ',
    '╚██████╗',
    ' ╚═════╝'
  ]
});

export const WORD = Object.freeze(['P', 'R', 'I', 'N', 'T', 'S', 'C', 'I', 'I']);
export const ROW_COUNT = 6;

export function glyphRows(letter) {
  return GLYPHS[letter];
}

export function wordmarkRows() {
  return Array.from({ length: ROW_COUNT }, (_, row) => WORD.map((letter) => GLYPHS[letter][row]).join(''));
}
