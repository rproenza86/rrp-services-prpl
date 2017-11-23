/**
 * Module dependencies.
 */
const server = require("./library");

const serverParams = {
  newPort: 3000,
  newBuildsPath: "./src/public/",
  buildsConfig: [
      {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
      {name: "es6-bundled"}
  ]
};

server(serverParams);

// Test purposes
export const app = () => server(serverParams);