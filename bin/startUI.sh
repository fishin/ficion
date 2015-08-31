#!/bin/bash

if [ ! -e cfg/gills_confidence.json ];
then
   echo "cfg/gills_confidence.json does not exist.  Please copy from gills_confidence_example.json"
   exit 2
fi
## generate a gills.json file
node_modules/.bin/confidence -c cfg/gills_confidence.json --filter.env=dev > cfg/gills.json
echo "Starting up UI"
node_modules/.bin/rejoice -c cfg/gills.json > gills_console.log &
