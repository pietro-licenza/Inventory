docker stop $(docker ps | grep -E 'inventory-mysql' | awk '{print $1}')
