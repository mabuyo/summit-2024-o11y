#!/bin/bash

set -a && source ".env.dev" && set +a

rover subgraph publish O11Y-Workshop-0@dev \
  --schema ./subgraphs/destinations/schema.graphql \
  --name destinations \
  --routing-url 	http://localhost:4003/graphql
