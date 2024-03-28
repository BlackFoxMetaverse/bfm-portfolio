npm i
npm run build
npm run deploy
mkdir -p docs
cp -r dist/* docs
rm -rf dist
