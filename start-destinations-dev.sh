#!/bin/bash

source .env.dev

cd subgraphs/destinations
npm i
npm start
cd ../..