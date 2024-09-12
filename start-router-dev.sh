#!/bin/bash

set -a && source .env.dev && set +a

router/bin/router -c router/router.yaml --hr