printf "%s\n" "" "Installing dependencies."
npm i
npm i -g db-migrate
npm i -g db-migrate-mysql

printf "%s\n" "" "Creating Database."
db-migrate db:create inventoryControl

printf "%s\n" "" "Running Migrations."
db-migrate up