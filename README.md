# Docebo Frontend Test

### Run

#### Docker
- Run `docker-compose run dfe_node npm install` to install dependancies
- Run `docker-compose run dfe_node npm run sass:compile` to compile scss files into css files
- Open index.html file

#### NPM installed
- Run `npm install` to install dependancies
- Run `npm run sass:compile` to compile scss files into css files
- Open index.html file

### NOTE:
Usually I use webpack with babel to prevent any compatibility problem in browser, in this case sadly I didn't have time to set it up so
I'll just say that I developed using Chrome v83.0.4103.116 and ran a quick test on Firefox. 
