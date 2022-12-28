const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:3333";

const email = "test2@mail.com";

chai.use(chaiHttp);
// describe("API TEST", () => {
//   it("POST /api/v1/register", (done) => {
//     chai
//       .request(baseUrl)
//       .post("/api/v1/register")
//       .send({
//         name: "test",
//         email: "test2@mail.com",
//         password: "test",
//         address: "test address",
//         mobile: "1234567890",
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.a("object");
//         expect(res.body).to.have.property("success");
//         expect(res.body).to.have.property("newUser");
//         expect(res.body).to.have.property("token");
//         done();
//         if (err) return done(err.message);
//       });
//   });
// }, 10000);

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
        expect(res.body).to.have.property("success").equal(true);
        expect(res.body).to.have.property("newUser");
        expect(res.body).to.have.property("token");
        done();
        if (err) return done(err.message);
      });
  });
  it("POST /api/v1/logout", (done) => {
    chai
      .request(baseUrl)
      .post("/api/v1/logout")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("success");
        expect(res.body).to.have.property("message").equal("Come back soon!");
        done();
        if (err) return done(err.message);
      });
  });
  it("POST /api/v1/password/forgot", (done) => {
    chai
      .request(baseUrl)
      .post("/api/v1/password/forgot")
      .send({
        email: email,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("success").equal(true);
        expect(res.body)
          .to.have.property("message")
          .equal(`Email sent to: ${email}`);
        done();
        if (err) return done(err.message);
      });
  });
}, 500000);
