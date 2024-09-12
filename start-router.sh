#!/bin/bash

set -a && source .env && set +a

router/bin/router -c router/router.yaml --hr