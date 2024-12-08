let gameBoard = document.getElementById('game-board');
let boardSize = 20; // 游戏区域大小
let snake = [{ x: 10, y: 10 }]; // 蛇的初始位置
let food = { x: 5, y: 5 }; // 食物的初始位置
let direction = 'right'; // 初始方向
let isGamePaused = false; // 游戏是否暂停
let gameInterval; // 游戏定时器
 
// 在游戏区域创建单元格
for (let i = 0; i < boardSize * boardSize; i++) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    gameBoard.appendChild(cell);
}
 
// 开始游戏
function startGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    isGamePaused = false;
    gameInterval = setInterval(updateGame, 200); // 更新游戏状态的时间间隔
}
 
// 暂停游戏
function pauseGame() {
    isGamePaused = true;
}
 
// 重置游戏
function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    direction = 'right';
    updateGame();
}
 
// 更新游戏状态
function updateGame() {
    if (isGamePaused) {
        return;
    }
    
    // 移动蛇
    let newHead = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'up':
            newHead.y--;
            break;
        case 'down':
            newHead.y++;
            break;
        case 'left':
            newHead.x--;
            break;
        case 'right':
            newHead.x++;
            break;
    }
    
    // 检查是否吃到食物
    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    } else {
        snake.pop();
    }
    
    // 检查游戏是否结束
    if (isCollision(newHead) || newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize) {
        clearInterval(gameInterval);
        alert('Game Over!');
        return;
    }
    
    // 添加新头部
    snake.unshift(newHead);
    
    // 更新游戏界面
    renderGame();
}
 
// 检查是否碰撞
function isCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}
 
// 渲染游戏界面
function renderGame() {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('snake', 'food');
    }
    
    snake.forEach(segment => {
        let cellIndex = segment.y * boardSize + segment.x;
        cells[cellIndex].classList.add('snake');
    });
    
    let foodIndex = food.y * boardSize + food.x;
    cells[foodIndex].classList.add('food');
}
 
// 监听键盘事件改变方向
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37: // 左箭头
            if (direction!== 'right') {
                direction = 'left';
            }
            break;
        case 38: // 上箭头
            if (direction!== 'down') {
                direction = 'up';
            }
            break;
        case 39: // 右箭头
            if (direction!== 'left') {
                direction = 'right';
            }
            break;
        case 40: // 下箭头
            if (direction!== 'up') {
                direction = 'down';
            }
            break;
    }
});