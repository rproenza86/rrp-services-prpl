const chai = require("chai");
const expect = require("chai").expect;
const request = require("supertest");
const server = require("./../index");

process.env["NODE_ENV"] = "test";

const serverParams = {
  newPort: 8787,
  newBuildsPath: "./src/public/",
  buildsConfig: [
      {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
      {name: "es6-bundled"}
  ]
};

let appServer = server.startServer(serverParams.newPort, serverParams.newBuildsPath, serverParams.buildsConfig);

describe("Library app test", function(done) {

    describe("The server behavior with diff configs", function(done) {

      describe("No newPort in the params", function(done) {
        it("Mandatory params missing : port", function(done) {
          const result = server.startServer(null, serverParams.newBuildsPath, serverParams.buildsConfig);
          expect(result).to.equal("Invalid configuration"); 
          done();
        });
      });
      
      describe("No newBuildsPath in the params", function(done) {
        it("Mandatory params missing : newBuildsPath", function(done) {
          const result = server.startServer(serverParams.newPort, null, serverParams.buildsConfig);
          expect(result).to.equal("Invalid configuration"); 
          done();
        });
      });
    });

    describe("Server full params configuration", function() {
        it("The server name is app", function() {
          expect( appServer.name ).to.equal("app");
        });

        it("The server port is 3000", function() {
          expect( appServer.get("port") ).to.equal(8787);
        });
      
        it("The server has 0 connections open", function() {
          expect( appServer.listen().connections ).to.equal(0);
        });
    });

    describe("#GET /api/heartbeat route", function(done) { 
      it("api controller should respond status 200", function(done) { 
        request(appServer).get("/api/heartbeat")
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            done(); 
          }); 
      });
    });

 });