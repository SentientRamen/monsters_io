// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import {debounce} from 'throttle-debounce';
import {getAsset} from './assets';
import {getCurrentState} from './state';

const Constants = require('../shared/constants');

const {PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE} = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
    // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
    // 800 in-game units of width.
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
    const {me, others, bullets} = getCurrentState();
    if (!me) {
        return;
    }

    // Draw background
    renderBackground(me.x, me.y);

    // Draw boundaries
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

    // Draw all bullets
    bullets.forEach(renderBullet.bind(null, me));

    // Draw all players
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
}

function renderBackground(x, y) {
    const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
    const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
    const backgroundGradient = context.createRadialGradient(
        backgroundX,
        backgroundY,
        MAP_SIZE / 10,
        backgroundX,
        backgroundY,
        MAP_SIZE / 2,
    );
    backgroundGradient.addColorStop(0, 'black');
    backgroundGradient.addColorStop(1, 'gray');
    context.fillStyle = backgroundGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
    const {x, y, direction} = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;

    // Draw ship
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
        getAsset(player.type + '_ship.svg'),
        -PLAYER_RADIUS,
        -PLAYER_RADIUS,
        PLAYER_RADIUS * 2,
        PLAYER_RADIUS * 2,
    );
    context.restore();

    // Draw health bar
    context.fillStyle = 'red';
    context.fillRect(
        canvasX - PLAYER_RADIUS,
        canvasY + PLAYER_RADIUS + 8,
        PLAYER_RADIUS * 2,
        2,
    );
    context.fillStyle = 'black';
    context.fillRect(
        canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / player.maxHp,
        canvasY + PLAYER_RADIUS + 8,
        PLAYER_RADIUS * 2 * (1 - player.hp / player.maxHp),
        2,
    );

    // Draw experience bar
    context.fillStyle = 'white';
    context.fillRect(
        canvasX - PLAYER_RADIUS,
        canvasY + PLAYER_RADIUS + 16,
        PLAYER_RADIUS * 2,
        2,
    );

    let baseExp;
    if ( player.lvl <= 50) {
        baseExp = (player.lvl ** 3 * (100 - player.lvl)) / 50;
    } else if (player.lvl <= 68) {
        baseExp = (player.lvl ** 3 * (150 - player.lvl)) / 100;
    } else if (player.lvl <= 98) {
        baseExp = (player.lvl ** 3 * ((1911 - 10 * player.lvl) / 3)) / 500;
    } else {
        baseExp = (player.lvl ** 3 * (160 - player.lvl)) / 100;
    }



    let currExp = player.experience - baseExp;
    let maxExp = player.currMaxExp - baseExp;

    if (player.lvl === 100) {
        currExp = maxExp;
    }

    context.fillStyle = 'blue';
    context.fillRect(
        canvasX - PLAYER_RADIUS,
        canvasY + PLAYER_RADIUS + 16,
        PLAYER_RADIUS * 2 * (currExp / maxExp),
        2,
    );

    // Draw lvl
    context.fillStyle = 'white';
    context.font = "bold 15px Verdana";
    context.textAlign = "center";
    context.fillText(
        'Lvl. ' + player.lvl,
        canvasX,
        canvasY - PLAYER_RADIUS - 8,
    );
}

function renderBullet(me, bullet) {
    const {x, y} = bullet;
    context.drawImage(
        getAsset(bullet.type + '.svg'),
        canvas.width / 2 + x - me.x - BULLET_RADIUS,
        canvas.height / 2 + y - me.y - BULLET_RADIUS,
        BULLET_RADIUS * 2,
        BULLET_RADIUS * 2,
    );
}

function renderMainMenu() {
    const t = Date.now() / 7500;
    const x = MAP_SIZE / 2 + 800 * Math.cos(t);
    const y = MAP_SIZE / 2 + 800 * Math.sin(t);
    renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
    clearInterval(renderInterval);
    renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
    clearInterval(renderInterval);
    renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
