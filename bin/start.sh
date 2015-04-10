#!/bin/bash

if [ ! -e cfg/ficion_confidence.json ];
then
   echo "cfg/ficion_confidence.json does not exist.  Please copy from ficion_confidence_example.json"
   exit 2
else
   node_modules/.bin/rejoice -c cfg/ficion_confidence.json
fi
