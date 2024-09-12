import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";
import { ApolloServerPluginUsageReportingDisabled } from "@apollo/server/plugin/disabled";
import { solarPlanets, exoPlanets, moons } from "./destinations.data.js";

const schemaDocument = gql`
  ${fs.readFileSync("schema.graphql", { encoding: "utf-8" })}
`;

const destinations = [...solarPlanets, ...exoPlanets, ...moons];

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  plugins: [
    ApolloServerPluginInlineTrace({
      includeErrors: { unmodified: true },
    }),
    ApolloServerPluginUsageReportingDisabled(),
  ],
  schema: buildSubgraphSchema({
    typeDefs: schemaDocument,
    resolvers: {
      Query: {
        destinations: () => destinations,
      },
      Mutation: {
        submitFavoriteDestination() {
          return true;
        },
      },
      SolarPlanet: {
        distanceFromEarth(parent: any) {
          return parent.lightYearsFromEarth;
        },
      },
      DwarfPlanet: {
        distanceFromEarth(parent: any) {
          return parent.lightYearsFromEarth;
        },
      },
      Exoplanet: {
        distanceFromEarth(parent: any) {
          return parent.lightYearsFromEarth;
        },
        async nasaTravelGuideUrl(parent: any) {
          return new Promise((resolve) =>
            setTimeout(() => resolve(parent.nasaTravelGuideUrl), 100)
          );
        },
        __resolveReference(rep) {
          return exoPlanets.find((d) => d.id === rep.id);
        },
      },
      Moon: {
        planet(parent: any) {
          return destinations.find((d) => d.name === parent.planetName);
        },
        distanceFromEarth(parent: any) {
          return destinations.find((d) => d.name === parent.planetName)
            .lightYearsFromEarth;
        },
      },
      CelestialBody: {
        __resolveReference(parent: any) {
          return destinations.find((d) => (d.id = parent.id));
        },
      },
      InterstellarExperience: {
        destination(parent: any) {
          return destinations.find((d) => d.id === parent.destinationId);
        },
      },
    },
  }),
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4003 },
});

console.log(`🚀  Server ready at: ${url}`);
