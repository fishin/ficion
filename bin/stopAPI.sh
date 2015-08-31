#!/bin/bash

echo "Stopping API"
ps auxww | grep rejoice | grep tacklebox | grep -v grep | awk '{print $2}' | xargs kill
