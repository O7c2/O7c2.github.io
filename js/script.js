const canvas = document.getElementById('minesweeper');
const ctx = canvas.getContext('2d');
const gridSize = 10;
const cellSize = 30;
const mineCount = 10;
let grid = [];
let revealed = [];
let mines = [];
let gameWon = false;
let timer = 0;
let timerInterval;

function initGame() {
  grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
  revealed = Array(gridSize).fill().map(() => Array(gridSize).fill(false));
  mines = [];
  gameWon = false;
  timer = 0;
  document.getElementById('timer').textContent = `时间: ${timer}`;
  document.getElementById('mine-count').textContent = `剩余雷数: ${mineCount}`;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').textContent = `时间: ${timer}`;
  }, 1000);

  // Place mines
  let placed = 0;
  while (placed < mineCount) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    if (!mines.some(m => m.x === x && m.y === y)) {
      mines.push({ x, y });
      grid[x][y] = -1;
      placed++;
    }
  }

  // Calculate numbers
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === -1) continue;
      let count = 0;
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          const ni = i + di;
          const nj = j + dj;
          if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize && grid[ni][nj] === -1) {
            count++;
          }
        }
      }
      grid[i][j] = count;
    }
  }
  drawBoard();
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      ctx.strokeStyle = '#333';
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
      if (revealed[i][j]) {
        if (grid[i][j] === -1) {
          ctx.fillStyle = 'red';
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          ctx.fillStyle = 'black';
          ctx.font = '20px Arial';
          ctx.fillText('💣', i * cellSize + 8, j * cellSize + 22);
        } else {
          ctx.fillStyle = '#e0e0e0';
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          if (grid[i][j] > 0) {
            ctx.fillStyle = ['#000', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080'][grid[i][j]];
            ctx.font = '20px Arial';
            ctx.fillText(grid[i][j], i * cellSize + 10, j * cellSize + 22);
          }
        }
      } else {
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }
}

function revealCell(x, y) {
  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize || revealed[x][y] || gameWon) return;
  revealed[x][y] = true;
  if (grid[x][y] === -1) {
    alert('游戏结束！你踩到雷了！');
    initGame();
    return;
  }
  if (grid[x][y] === 0) {
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        revealCell(x + di, y + dj);
      }
    }
  }
  drawBoard();
  checkWin();
}

function checkWin() {
  let revealedCount = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (revealed[i][j]) revealedCount++;
    }
  }
  if (revealedCount === gridSize * gridSize - mineCount) {
    gameWon = true;
    clearInterval(timerInterval);
    alert(`恭喜！你赢了！用时 ${timer} 秒`);
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('homepage').style.display = 'block';
  }
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);
  revealCell(x, y);
});

window.resetGame = function() {
  initGame();
};

initGame();
