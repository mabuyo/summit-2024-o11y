#!/bin/bash

source .env.dev

cd subgraphs/experiences
npm i
npm start
cd ../..