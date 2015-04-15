#!/bin/bash

echo "Stopping UI"
echo "Stopping API"
ps auxww | grep rejoice | grep -v grep | awk '{print $2}' | xargs kill
