ficion
======

Fast Intelligent Continous Integration For Node

[![NPM version](https://badge.fury.io/js/ficion.svg)](http://badge.fury.io/js/ficion)
[![devDependency Status](https://david-dm.org/fishin/ficion/dev-status.svg)](https://david-dm.org/fishin/ficion#info=devDependencies)
[![Join the chat at https://gitter.im/fishin/ficion](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fishin/ficion?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## getting started

1.  bin/initialize.sh which will setup nvm and iojs for you.
2.  git clone https://github.com/fishin/ficion or npm install ficion
3.  on a github account (generate a clientId and clientSecret to be used for github integration) - see https://auth0.com/docs/github-clientid.
Additional pieces of info I used are:
application name: ficion
homepage url: https://github.com/fishin/ficion
application description: ficion
authorization callback url: http://localhost:8080/
4.  with the same user on github or a different user, you also need to generate a personal token so that it can do github api stuff.  This should be some sort of system account.  The other one is strictly for user specific information. 
4.  cp cfg/gills_confidence_example.json cfg/gills_confidence.json (note you will have to make your config dirs for logging) (maybe have an init here to prompt for a few things?) - this is the UI config
5.  cp cfg/tacklebox_confidence_example.json cfg/tacklebox_confidence.json - this is the API config
6.  npm start (npm stop will stop)
7.  go to http://localhost:8080 for UI http://localhost:8081/docs will show you your api server
8.  login as admin and put in your new password and click the login button
9.  To create a github user go to create User-> and you just need to put in your github account and select type of github.  You can logout and click on the github login link from then on to use your github creds.
Note: This will ask for permissions for oauth for this application

For more higher level discussion take a look at:
https://github.com/fishin/discuss
