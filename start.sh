case $1 in
  "build")
    echo "build Images and Containers"
    docker-compose build
    ;;

  "up")
    echo "Up Images and Containers"
    docker-compose up
    ;;

  "all")
    echo "Build and Up Images and Containers"
    docker-compose stop
    docker rm -f docker_api
    docker rmi $(docker images -f "dangling=true" -q)
    docker-compose up --build --remove-orphans
    ;;

  "stop")
    echo "Stop Images and Containers"
    docker-compose stop
    ;;

  "mongo")
    echo "Initializing Mongo Container"
    docker-compose up -d mongo
    ;;
  *)
    echo 'Please enter a valid instruction'
    ;;
esac