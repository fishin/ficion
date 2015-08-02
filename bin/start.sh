#!/bin/bash

if [ ! -e cfg/gills_confidence.json ];
then
   echo "cfg/gills_confidence.json does not exist.  Please copy from gills_confidence_example.json"
   exit 2
fi
if [ ! -e cfg/tacklebox_confidence.json ];
then
   echo "cfg/tacklebox_confidence.json does not exist.  Please copy from tacklebox_confidence_example.json"
   exit 2
fi
## generate a gills.json file
node_modules/.bin/confidence -c cfg/gills_confidence.json --filter.env=dev > cfg/gills.json
echo "Starting up UI"
node_modules/.bin/rejoice -c cfg/gills.json > gills_console.log &
#for i in {1..2}
for i in 1
do
   echo "Starting up API instance ${i}"
   node_modules/.bin/confidence -c cfg/tacklebox_confidence.json --filter.port=port${i} --filter.env=dev > cfg/tacklebox_port${i}.json
   node_modules/.bin/rejoice -c cfg/tacklebox_port${i}.json > tacklebox_port${i}_console.log  &
done
