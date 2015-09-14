#!/bin/bash

NODEJS_VERSION="4.0.0"

if [ ! -e ~/.nvm/nvm.sh ];
then
    echo "Installing nvm"
    curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
else
   echo "nvm installed"
fi

source ~/.nvm/nvm.sh

NODE_VERSION=$(node --version)

if [ "${NODE_VERSION}" != "v${NODEJS_VERSION}" ]
then
   echo "Installing node ${NODEJS_VERSION}"
   nvm install ${NODEJS_VERSION}
else
   echo "node ${NODEJS_VERSION} installed"
fi 
