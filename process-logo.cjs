const { Jimp, rgbaToInt, intToRGBA } = require('jimp');
const fs = require('fs');

async function processLogo() {
    try {
        const image = await Jimp.read('C:/Users/samyu/.gemini/antigravity/brain/c45d8308-edb2-4c7e-ad74-d382ef5e8495/.user_uploaded/media_1790682893930.png');
        
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const color = intToRGBA(image.getPixelColor(x, y));
                // The blue background is roughly around rgb(40, 40, 120) maybe?
                // The white shield is high rgb (e.g. > 200, 200, 200)
                // Let's just turn anything that isn't highly bright into transparent,
                // and anything bright into pure white.
                // Or better, use luminosity.
                const luminosity = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b);
                
                if (luminosity > 120) {
                    // It's part of the white shield (or anti-aliased edge)
                    // Keep it white, but adjust alpha based on luminosity to make smooth edges
                    const alpha = Math.min(255, (luminosity - 120) * 2);
                    image.setPixelColor(rgbaToInt(255, 255, 255, alpha), x, y);
                } else {
                    // Background
                    image.setPixelColor(rgbaToInt(255, 255, 255, 0), x, y);
                }
            }
        }
        
        // Save to project assets
        await image.write('public/brand/hackers-infotech-mark.png');
        console.log('Logo processed and saved!');
    } catch(err) {
        console.error(err);
    }
}
processLogo();
