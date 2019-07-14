
import Compositor from './Compositor.js';
import { createBackgroundLayer } from './Layers.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites, loadMarioSprite } from './sprites.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpritesLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y)

    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
    .then(([marioSprite, sprites, level]) => {
        const comp = new Compositor();

        const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
        comp.layers.push(backgroundLayer);

        const pos = {
            x: 64,
            y: 64
        };

        const spriteLayer = createSpritesLayer(marioSprite, pos);
        comp.layers.push(spriteLayer)

        function update() {
            comp.draw(context);
            pos.x += 2;
            pos.y += 2;
            requestAnimationFrame(update);
        }

        update()
    });

