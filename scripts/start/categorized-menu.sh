#!/bin/sh -e

mkdir -p examples/__build__
watchify examples/categorized-menu/app.js -t babelify -p [browserify-hmr --port 1338 --url http://localhost:1338] -v -o examples/__build__/categorized-menu.js
