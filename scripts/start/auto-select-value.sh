#!/bin/sh -e

mkdir -p examples/__build__
watchify examples/auto-select-value/app.js -t babelify -p [browserify-hmr --port 1341 --url http://localhost:1340] -v -o examples/__build__/auto-select-value.js
