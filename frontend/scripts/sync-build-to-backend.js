const fs = require('fs');
const path = require('path');

const frontendBuild = path.resolve(__dirname, '..', 'build');
const backendBuild = path.resolve(__dirname, '..', '..', 'backend', 'build');

if (!fs.existsSync(frontendBuild)) {
  console.error('Missing frontend/build. Run npm run build first.');
  process.exit(1);
}

fs.rmSync(backendBuild, { recursive: true, force: true });
fs.mkdirSync(path.dirname(backendBuild), { recursive: true });
fs.cpSync(frontendBuild, backendBuild, { recursive: true });

console.log(`Copied ${frontendBuild} to ${backendBuild}`);
