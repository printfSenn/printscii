import { makeCanvas } from './canvasResize.js';

function polygon(g, points, color) {
  g.fillStyle = color;
  g.beginPath();
  g.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) g.lineTo(points[i][0], points[i][1]);
  g.closePath();
  g.fill();
}

function bird(g, x, y, span) {
  g.beginPath();
  g.moveTo(x - span, y);
  g.quadraticCurveTo(x - span / 2, y - span / 2, x, y);
  g.quadraticCurveTo(x + span / 2, y - span / 2, x + span, y);
  g.stroke();
}

export function createSample() {
  const width = 720;
  const height = 480;
  const canvas = makeCanvas(width, height);
  const g = canvas.getContext('2d');

  const sky = g.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#fff7e8');
  sky.addColorStop(0.6, '#fbd9b0');
  sky.addColorStop(1, '#f2b184');
  g.fillStyle = sky;
  g.fillRect(0, 0, width, height);

  polygon(g, [[0, 330], [90, 270], [190, 320], [300, 240], [420, 325], [540, 255], [640, 310], [720, 280], [720, 480], [0, 480]], '#9a7aa8');

  const ball = g.createRadialGradient(455, 140, 6, 490, 180, 120);
  ball.addColorStop(0, '#ffffff');
  ball.addColorStop(0.3, '#6db3ee');
  ball.addColorStop(1, '#13214d');
  g.fillStyle = ball;
  g.beginPath();
  g.arc(490, 180, 110, 0, Math.PI * 2);
  g.fill();

  polygon(g, [[0, 400], [110, 330], [230, 395], [360, 320], [480, 400], [610, 340], [720, 395], [720, 480], [0, 480]], '#3a2348');
  polygon(g, [[0, 440], [160, 410], [320, 450], [480, 420], [620, 452], [720, 430], [720, 480], [0, 480]], '#150c22');

  g.strokeStyle = '#2a1a3a';
  g.lineWidth = 3;
  g.lineCap = 'round';
  bird(g, 120, 90, 22);
  bird(g, 175, 118, 16);
  bird(g, 82, 140, 14);
  bird(g, 250, 70, 12);

  return canvas;
}
