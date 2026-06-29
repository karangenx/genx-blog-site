const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function makeRoundFavicon() {
  const inputPath = path.join(__dirname, '..', 'public', 'logo.png');
  const outputPath = path.join(__dirname, '..', 'src', 'app', 'icon.png'); // Next.js standard for favicon

  if (!fs.existsSync(inputPath)) {
    console.error('Error: public/logo.png not found! Please save your image there first.');
    return;
  }

  try {
    const size = 512;
    // Create a circular SVG mask
    const roundedCorners = Buffer.from(
      `<svg><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`
    );

    console.log('Processing image to make it perfectly round...');

    await sharp(inputPath)
      .resize(size, size, { fit: 'cover' })
      .composite([{
        input: roundedCorners,
        blend: 'dest-in'
      }])
      .png()
      .toFile(outputPath);

    console.log('Success! Round favicon created at src/app/icon.png');
    console.log('Next.js will automatically use this as your site favicon.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

makeRoundFavicon();
