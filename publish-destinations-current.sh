#!/bin/bash

set -a && source ".env" && set +a

rover subgraph publish O11Y-Workshop-0@current \
  --schema ./subgraphs/destinations/schema.graphql \
  --name destinations \
  --routing-url https://o11y-ws-destinations-subgraph-bc58fdd49285.herokuapp.com/
