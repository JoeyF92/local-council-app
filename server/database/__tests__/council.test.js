describe("Jest Test", () => {
  it("Should work", () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});

const request = require("supertest");
const app = require("../../app");
const { Pool } = require('pg')

const pool = require('../connect');

describe("api server", () => {
  let api;

  beforeAll(() => {
    api = app.listen(5000, () => {
      console.log("Test server running on port 5000");
    });
  });

  afterAll((done) => {
    console.log("Stopping test server");
    api.close(done);
  });

  describe("Login functionality", () => {
    test("it should authenticate a user", (done) => {
      // login tests to go here
      done();
    });
    //further log in tests to follow
  });

  describe("General app functionality", () => {
    //council app tests go in here
  let submissionID

  //READ ALL

    it('should get all submissions', async () => {
      const response = await request(app)
      .get('/submissions')
      .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThan(0)

  })
  
  // CREATE SUBMISSION
  it('Should create a new submission', async () => {
    const newSubmission= {
        title : 'Test',
        category : 'Test Category',
        proposal: 'TEST',
        photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        user_id: 2
      }

    const response = await request(app)
    .post('/submissions')
    .send(newSubmission)
    .expect(201)

    const {submission_id} = response.body
    submissionID = submission_id

    expect(response.body).toMatchObject(newSubmission)
})

// GET BY ID

it('Should get the submission that has been created', async () =>{
  const response = await request(app)
  .get(`/submissions/${submissionID}`)
  .expect(200)

  expect(response.body.title).toBe('Test')
})

// UPDATE SUBMISSION

it('Should update a submission', async () =>{
  const updatedSubmission = {
    title : 'Test 1',
    category : 'Test Category 1',
    proposal: 'update test',
    photo: 'https://plus.unsplash.com/premium_photo-1673843714883-cfeb8209c6df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    user_id: 3
  }
  const response = await request(app)
  .put(`/submissions/${submissionID}`)
  .send(updatedSubmission)
  .expect(200);

  console.log(response.body);

expect(response.body).toMatchObject(updatedSubmission);
})

// it('Should update submission status', async () => {
//   // Update the submission status
//   const updatedStatus = 'approved';
//   const updateResponse = await request(app)
//     .patch(`/submissions/${submissionID}`)
//     .send({ status: updatedStatus })
//     .expect(200);

//   const updatedSubmission = updateResponse.body;

//   // Expect the submission status to be updated
//   expect(updatedSubmission.submission_status).toBe(updatedStatus);
// });



});
})
