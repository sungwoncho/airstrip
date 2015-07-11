# Trigger mupx deploy if current branch is 'prod'
# Used in CIs

#!/bin/bash

current_branch=$(git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3)

echo "On '$current_branch'"

if [ "$current_branch" == "prod" ]; then
  echo "Triggering MupX deployment..."
  mupx deploy
else
  echo "Not deploying unless on 'prod' branch"
fi
