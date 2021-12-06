function wait_for_container() {

  sleepTime=${2:-1}
  seconds=0
  containerID=$(docker ps | grep ${1} | awk '{print $1}')
  while [ "`docker inspect -f {{.State.Status}} inventory-mysql`" != "running" ]; do
    echo "Waiting ${1} container to be up and running: ${seconds} seconds"
    sleep $sleepTime;
    seconds=$((seconds+sleepTime))
  done

}

if [[ -z $(docker ps -q --filter "ancestor=mysql") ]]; then
    printf "%s\n" "Creating new mysql container, please be patient..." ""

    docker build . -t mysql -f ./mysql.dockerfile
    docker run --name inventory-mysql --rm -d -p 3306:3306 mysql

    wait_for_container 'inventory-mysql'

   printf "%s\n" "" "Mysql container now running."
else
    printf "%s\n" "Mysql container already running..." ""
fi