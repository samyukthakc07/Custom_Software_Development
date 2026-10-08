const { Jimp, rgbaToInt, intToRGBA } = require('jimp');
const fs = require('fs');
const path = require('path');

async function processLogos() {
    try {
        const whiteLogo = await Jimp.read('public/brand/hackers-infotech-mark.png');
        const width = whiteLogo.bitmap.width;
        const height = whiteLogo.bitmap.height;
        
        // Save white version
        await whiteLogo.write('public/brand/hackers-infotech-logo-white.png');
        
        // Create blue version (#2563EB = rgb(37, 99, 235))
        const blueLogo = await Jimp.read('public/brand/hackers-infotech-mark.png');
        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const color = intToRGBA(blueLogo.getPixelColor(x, y));
                if (color.a > 0) {
                    // Multiply color by blue
                    const r = (color.r / 255) * 37;
                    const g = (color.g / 255) * 99;
                    const b = (color.b / 255) * 235;
                    blueLogo.setPixelColor(rgbaToInt(Math.round(r), Math.round(g), Math.round(b), color.a), x, y);
                }
            }
        }
        await blueLogo.write('public/brand/hackers-infotech-logo-blue.png');
        
        // Also save favicon
        const favicon = await Jimp.read('public/brand/hackers-infotech-logo-blue.png');
        favicon.resize({ w: 32, h: 32 });
        await favicon.write('public/favicon.png');
        
        console.log('Blue and White logos generated.');
    } catch(err) {
        console.error(err);
    }
}
processLogos();
