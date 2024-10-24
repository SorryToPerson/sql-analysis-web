#!/bin/bash

# inject current env
sed -i 's,<env>,'"$DEPLOY_ENV"',' dist/index.html

# start
npm start
