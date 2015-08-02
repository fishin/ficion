#!/bin/bash

IOJS_VERSION="2.5.0"

if [ ! -e ~/.nvm/nvm.sh ];
then
    echo "Installing nvm"
    curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
else
   echo "Looking like you have nvm installed"
fi

source ~/.nvm/nvm.sh

NODE_VERSION=$(node --version)

if [ "${NODE_VERSION}" != "v${IOJS_VERSION}" ]
then
   echo "Installing iojs"
   nvm install iojs-${IOJS_VERSION}
else
   echo "Looks like you have iojs ${IOJS_VERSION} installed"
fi 
