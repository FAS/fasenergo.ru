# Fasenergo

Sources of [Fasenergo website](fasenergo.ru)

## How to use

* `npm start` to launch development version with watch
* `npm run start-hmr` to launch development version with hot reloading
* `npm run build` to build minified version
* `npm run build --production` to build production version
* `npm run serve` to launch current built version with watch
* `npm run serve-hmr` to launch current built version with hot reloading

### Linting and testing

* `npm test` to lint and run tests
* `npm run test:watch` to watch tests

## Note

* Static content (kotsu build) is stored inside of nginx docker container thus impossible to edit during runtime
