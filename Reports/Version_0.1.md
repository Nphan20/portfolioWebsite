# Version 0.1 Documentation 6/26/2023

## Assets

Assets made through Tiled and Aseprite. Need to update the sand texture and do
some touching up with how each tiles are to interact (such as making corners for
specific tiles)

## Src Files

Created main file to load up Tiled maps, in order to effectively load a map, you
must have the tileset be embeded within the map in order for it to actually
load.

## Index.html

The index html is simple and just references a `app.js` file within the script

## Package.json && Package-lock.json

These are stuff I'm still unfamiliar with. But essentially Package.json is what
helps track what packages get loaded into this project and neatly bundles it.
`Package-lock` seems to load all specific portions of the modules.

## tsconfig.Json and Webpack.config.js

`tsconfig.json` just targets what types of compilers/web browsers can use this?

`Webpack.config.js` is the glue that creates the website. It essentially parses
through each file and copies it into the webpack server and allows it to run
according to specifications. Need more research on this section in particular

## Aims for next version

1. Implement sprites and sprite animation
2. Implement walking portion
3. Improve the assets of the tiles a little more.
