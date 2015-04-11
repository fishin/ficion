#!/bin/bash

ps auxww | grep rejoice | grep -v grep | awk '{print $2}' | xargs kill
