import app from "../../../app";
import request from "supertest";
import chai from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Task Creation API", () => {
  it("should create a new task for a user with no existing tasks", (done) => {
    const requestBody = { taskName: "New Task Name" };
    request(app)
      .post("/api/tasks/createTask")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )

      .send(requestBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal("Task is created");
        done();
      });
  });
  it("should add task for user with existing task", (done) => {
    const requestBody = { taskName: "Addiing Task Another Task" };
    request(app)
      .post("/api/tasks/createTask")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )

      .send(requestBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal("Task is Added");
        done();
      });
  });
  it("should return conflict  for  existing tasks", (done) => {
    const requestBody = { taskName: "New Task Name" };
    request(app)
      .post("/api/tasks/createTask")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )
      .send(requestBody)
      .expect(409)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal("The task already exists");
        done();
      });
  });
});

describe("View Task API", () => {
  it("should return All Tasks to the user", (done) => {
    const expectedTasks = ["New Task Name", "Addiing Task Another Task"];

    request(app)
      .get("/api/tasks/viewTasks")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )

      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(expectedTasks);
        done();
      });
  });
});
describe("Search One Task API", () => {
  it("should return the seached task", (done) => {
    const taskName = "Addiing Task Another Task";

    request(app)
      .get(`/api/tasks/search/${taskName}`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )

      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(taskName);
        done();
      });
  });
  it("should return not Found", (done) => {
    const taskName = "unknown Task";

    request(app)
      .get(`/api/tasks/search/${taskName}`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )

      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(`${taskName} is not found in the task`);
        done();
      });
  });
});

describe("Updating Task API", () => {
  it("should update The Task", (done) => {
    const taskName = "New Task Name";

    request(app)
      .put(`/api/tasks/update/${taskName}`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )

      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(
          `Task '${taskName}' is updated successfully`
        );
        done();
      });
  });
});

describe("Deleting Task API", () => {
  it("should delete the task", (done) => {
    const taskName = "New Task Name";

    request(app)
      .delete(`/api/tasks/delete/${taskName}`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5lQDEyMyIsImlhdCI6MTcxMzUzNzQ0NCwiZXhwIjoxNzEzNTQxMDQ0fQ.IwXXL0WWqZid6YGvCJCSNzqs-wrWIY0zEGfJRWLs7TQ"
      )

      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(
          `Task '${taskName}'is deleted successfully'`
        );
        done();
      });
  });
});
