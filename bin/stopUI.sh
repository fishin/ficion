#!/bin/bash

echo "Stopping UI"
ps auxww | grep rejoice | grep gills | grep -v grep | awk '{print $2}' | xargs kill
