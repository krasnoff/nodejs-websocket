## how to handle deploy app on docker?:

1. create a docker file with all the neccessary configuration: named Dockerfile
2. build a docker image by command line: `docker build .`
3. wait and see if you get the following message: `Successfully built <image id>`
4. optional: give your new image a name by the following command line: `docker tag <image id> <repository name>:<tag name>`
5. now create a new container: `docker run -d -it -p <optional url to look from out size>:<inner port>:<outer port> <image id>`
6. see the log of the container if you want to check errors: `docker logs <container id>`