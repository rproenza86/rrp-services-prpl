# @rproenza/rrp-services-prpl

> Serve different versions of your prpl app application to different browsers by detecting browser capabilities using the user-agent header.

> Special focus in Progressive Web Apps and Polymer Web Apps.

> Serve [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) apps in production.

# ExpressJS + TypeScript Node Server

[![Build Status](https://travis-ci.org/rproenza86/rrp-services-prpl.svg?branch=feature%2Fnpm-deploy)](https://travis-ci.org/rproenza86/rrp-services-prpl)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a7f6c9d884f04182a0d620ba6881bdb2)](https://www.codacy.com/app/raul.r.proenza/rrp-services-prpl?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rproenza86/rrp-services-prpl&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/a7f6c9d884f04182a0d620ba6881bdb2)](https://www.codacy.com/app/raul.r.proenza/rrp-services-prpl?utm_source=github.com&utm_medium=referral&utm_content=rproenza86/rrp-services-prpl&utm_campaign=Badge_Coverage)
[![Dependency Status](https://www.versioneye.com/user/projects/5a14ca6e0fb24f2a6d408d11/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/5a14ca6e0fb24f2a6d408d11)
[![Greenkeeper badge](https://badges.greenkeeper.io/rproenza86/rrp-services-prpl.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm (scoped)](https://img.shields.io/npm/v/@rproenza/rrp-services-prpl.svg)](https://www.npmjs.com/package/@rproenza/rrp-services-prpl)
[![npm](https://img.shields.io/npm/dt/@rproenza/rrp-services-prpl.svg)](https://www.npmjs.com/package/@rproenza/rrp-services-prpl)
[![license](https://img.shields.io/github/license/rproenza86/rrp-services-prpl.svg)](https://github.com/rproenza86/rrp-services-prpl/blob/master/LICENSE)

## Usage as a library

```js
const server = require('@rproenza/rrp-services-prpl')

const port = 8787;
const builsPath = "./src/public/";
const buildsConfig = [
        {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
        {name: "es6-bundled"},
    ];

server.startServer(port, builsPath, buildsConfig);

// output : App is running at http://localhost:8787 in development mode
```
## Usage as a server

### Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/rproenza86/rrp-services-prpl.git <project_name>
```
- Install dependencies 
```
cd <project_name>
npm install
```
- Copy your builds directory to `src/public/`
```
cp -R /build/source src/public/ 
```
- Update the directory names and others options in the `builds` array param of the function `prpl.makeHandler`:
```
server.ts file
```
```
line 89
```
- Build and run the project
```
npm start
```
Navigate to `http://localhost:3000`

## Environment variables
 - For the user session you can setup the environment variable `SESSION_SECRET`

## Project Structure
Check the `README_EXPANDED.md` file .
