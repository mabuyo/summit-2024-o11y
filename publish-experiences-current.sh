#!/bin/bash

set -a && source ".env" && set +a

rover subgraph publish O11Y-Workshop-0@current \
  --schema ./subgraphs/experiences/schema.graphql \
  --name experiences \
  --routing-url https://o11y-ws-experiences-subgraph-b7c7a4369650.herokuapp.com/
