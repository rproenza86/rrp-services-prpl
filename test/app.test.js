const chai = require("chai");
const expect = require("chai").expect;
const server = require("./../dist/library");

const serverParams = {
  newPort: 3000,
  newBuildsPath: "./src/public/",
  buildsConfig: [
      {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
      {name: "es6-bundled"}
  ]
};

const appServer = server(serverParams);

describe("API endpoint /colors", function() {

   it("The server name is app", function() {
    expect( appServer.name ).to.equal('app');
   });

   it("The server port is 3000", function() {
    expect( appServer.get("port") ).to.equal(3000);
   });
   
    it("The server has 0 connections open", function() {
      expect( appServer.listen().connections ).to.equal(0);
    });

 });