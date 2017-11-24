const chai = require("chai");
const expect = require("chai").expect;
const request = require("supertest");
const server = require("./../dist/library");

process.env['NODE_ENV'] = 'test';

const serverParams = {
  newPort: 3000,
  newBuildsPath: "./src/public/",
  buildsConfig: [
      {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
      {name: "es6-bundled"}
  ]
};

let appServer = server(serverParams);

describe("Library app test", function() {
    describe("Server full params configuration", function() {
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

    describe('#GET /api/heartbeat route', function() { 
      it('api controller should respond status 200', function(done) { 
        request(appServer).get('/api/heartbeat')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            done(); 
          }); 
      });
    });
    
    describe('The server behavior with diff configs', function(done) { 
      const sParams = {
          newPort: 7979,
          newBuildsPath: "./src/public/",
          buildsConfig: [
              {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
              {name: "es6-bundled"}
          ]
      };

      describe('No buildsConfig in the params', function(done) { 
        const params = Object.assign({}, sParams);
        delete params.buildsConfig;
        const app = server(params);
        it("The server name is app", function() {
          expect( app.name ).to.equal('app');
        });

        it("The server port is 3000", function() {
          expect( app.get("port") ).to.equal(7979);
        });
      
        it("The server has 0 connections open", function(done) {
          expect( app.listen().connections ).to.equal(0);
          done();
        })
      });

      describe('No newPort in the params', function(done) {
        it('Mandatory params missing : port', function(done) { 
          const params = Object.assign({}, sParams);
          delete params.newPort;
          const result = server(params);
          expect(result).to.equal("Invalid configuration"); 
          done();
        });
      });
      
      describe('No newBuildsPath in the params', function(done) {
        it('Mandatory params missing : newBuildsPath', function(done) { 
          const params = Object.assign({}, sParams);
          delete params.newBuildsPath;
          const result = server(params);
          expect(result).to.equal("Invalid configuration"); 
          done();
        });
      });
    });
 });