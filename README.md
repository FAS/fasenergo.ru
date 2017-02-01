# Fasenergo
=========

[![Greenkeeper badge](https://badges.greenkeeper.io/FAS/fasenergo.ru.svg?token=67c6e6d340cc828fb955a67773f5223f4292ab15bf8604f86b00b992da888923)](https://greenkeeper.io/)

Sources of [Fasenergo website](fasenergo.ru)

## Note

 * This project uses both static (kotsu) and dynamic (php) content
 * Static content (kotsu build) is stored inside of nginx docker container thus impossible to edit during runtime
 * Starting up local version of projects requires some environment variables to be set prior to `docker-compose up` (see [compose config](https://github.com/FAS/fasenergo.ru/blob/master/docker/compose.template) and [kotsu requirements](https://github.com/LotusTM/Kotsu/wiki/Set-up-environment-variables))