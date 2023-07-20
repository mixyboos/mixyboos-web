#!/usr/bin/env bash
PROJECT_ROOT=/srv/dev/mixyboos/mixyboos
export PGPASSWORD='hackme'

echo Dropping exiting db
dropdb -f --if-exists -h localhost -U postgres mixyboos
echo Creating new db
createdb -h localhost -U postgres mixyboos

rm -rf $PROJECT_ROOT/src/db/migrations/*

npx drizzle-kit generate:pg


curl --location 'http://localhost:3000/api/trpc/auth.signUp?batch=1' \
--header 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-GB,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://mixyboos.dev.fergl.ie:3000/auth/register' \
--header 'content-type: application/json' \
--header 'Origin: https://mixyboos.dev.fergl.ie:3000' \
--header 'DNT: 1' \
--header 'Connection: keep-alive' \
--header 'Cookie: next-auth.csrf-token=b868ea55f205fbbfb1ff84e3fce9b46a62f5341f87e215b30745426a8240b7f2%7Cc7f23dceb444713353a7354b35377467ed0267c5fc7512b73784810d77b1ce91; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2Flive%2Fcreate' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-origin' \
--data-raw '{"0":{"json":{"email":"fergal.moran+mixyboos@gmail.com","username":"fergalmoran","password":"secret"}}}'
