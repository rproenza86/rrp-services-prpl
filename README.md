[![Build Status](https://travis-ci.org/rproenza86/rrp-services-prpl.svg?branch=feature%2Fnpm-deploy)](https://travis-ci.org/rproenza86/rrp-services-prpl)

# ExpressJS + TypeScript Node Server

An HTTP server designed to serve [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) apps in production.

# Getting started
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

## Project Structure
Check the `README_EXPANDED.md` file.
