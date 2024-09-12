#!/bin/bash

set -a && source ".env.dev" && set +a

rover subgraph publish O11Y-Workshop-0@dev \
  --schema ./subgraphs/experiences/schema.graphql \
  --name experiences \
  --routing-url 	http://localhost:4002/graphql
