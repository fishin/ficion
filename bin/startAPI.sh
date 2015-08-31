#!/bin/bash

if [ ! -e cfg/tacklebox_confidence.json ];
then
   echo "cfg/tacklebox_confidence.json does not exist.  Please copy from tacklebox_confidence_example.json"
   exit 2
fi

echo "Starting API"
node_modules/.bin/confidence -c cfg/tacklebox_confidence.json --filter.port=port1 --filter.env=dev > cfg/tacklebox_port1.json
node_modules/.bin/rejoice -c cfg/tacklebox_port1.json > tacklebox_port1_console.log  &
