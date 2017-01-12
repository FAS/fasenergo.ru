# Fasenergo
=========

Sources of [Fasenergo website](fasenergo.ru)

## Note

 * This project uses both static (kotsu) and dynamic (php) content
 * Static content (kotsu build) is stored inside of nginx docker container thus impossible to edit during runtime
 * Starting up local version of projects requires some environment variables to be set prior to `docker-compose up` (see [compose config](https://github.com/FAS/fasenergo.ru/blob/master/docker/compose.template) and [kotsu requirements](https://github.com/LotusTM/Kotsu/wiki/Set-up-environment-variables))