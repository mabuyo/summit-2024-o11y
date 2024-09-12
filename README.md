# Summit 2024 Observability Workshop

## Getting Started

### Install Router

[Download the Router binary](https://www.apollographql.com/docs/router/quickstart/) and place it into ./router/bin/.

### Running Locally

- Copy `.env.example` to `.env.dev`.
- Create an API key for [this Graph in Studio](https://studio.apollographql.com/graph/O11Y-Workshop-0/variant/current/settings/graph/api-keys).
- Update the `APOLLO_KEY` variable in the `.env.dev` file with your new key.

### Start Up The Services

- `./start-router-dev.sh` - Starts up the router
- `./start-destinations.sh` - Starts up the destinations subgraph
- `/.start-experiences.sh` - Starts up the experiences subgraph
