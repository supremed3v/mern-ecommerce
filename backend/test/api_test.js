const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:3333";

chai.use(chaiHttp);
describe("API TEST", () => {
  it("POST /api/v1/register", (done) => {
    chai
      .request(baseUrl)
      .post("/api/v1/register")
      .send({
        name: "test",
        email: "test2@mail.com",
        password: "test",
        address: "test address",
        mobile: "1234567890",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("newUser");
        expect(res.body).to.have.property("token");
        done();
        if (err) return done(err.message);
      });
  });
}, 10000);

describe("API TEST", () => {
  it("POST /api/v1/login", (done) => {
    chai
      .request(baseUrl)
      .post("/api/v1/login")
      .send({
        email: "testing@mail.com",
        password: "test",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("newUser");
        expect(res.body).to.have.property("token");
        done();
        if (err) return done(err.message);
      });
  });
}, 10000);
