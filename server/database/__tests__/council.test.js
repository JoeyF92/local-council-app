const Submissions = require("../../models/Submissions");
const Token = require('../../models/Token');
const authenticator = require('../../middleware/authenticator')

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
    let userID;

    it('Should create a new user', async () => {
      const newUser = {
        username: 'testuser',
        pass_word: 'testpassword',
        votes_used: 5
      };
  
      const response = await request(app)
        .post('/users/register')
        .send(newUser)
        .expect(201);
  
      const {user_id} = response.body;
      userID = user_id;
      expect(response.body).toMatchObject(newUser);
    });
  
  });
    //further log in tests to follow
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
        photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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

it('Should get submissions by status', async () => {
  const status = 'pending';

  const response = await request(app)
    .get(`/submissions/status/${status}`)
    .expect(200);

  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBeGreaterThan(0);
  // You can add further assertions on the response body if needed
});

// UPDATE SUBMISSION

it('Should update a submission', async () =>{
  const updatedSubmission = {
    title : 'Test 1',
    category : 'Test Category 1',
    proposal: 'update test',
    photo: 'https://plus.unsplash.com/premium_photo-1673843714883-cfeb8209c6df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    submission_status : "approved"
  }
  const response = await request(app)
  .put(`/submissions/${submissionID}`)
  .send(updatedSubmission)
  .expect(200);

  console.log(response.body);

expect(response.body).toMatchObject(updatedSubmission);
})

it('Should update submission status', async () => {
  const id = submissionID;
  const action = 'approved'; 

  const response = await request(app)
    .patch(`/submissions/${id}`)
    .send({ action })
    .expect(200);

  expect(response.body).toHaveProperty('submission_status', action);
});

it('Should deny all submissions', async () => {
  // Update the submission status to 'approved'
  await Submissions.updateSubmissionStatus(submissionID, 'approved');

  const response = await request(app)
    .patch('/submissions/denyAll')
    .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    // Additional assertions based on your expected response
  
    // Clean up: Update the submission status back to 'pending' or perform any necessary cleanup steps
    await Submissions.updateSubmissionStatus(submissionID, 'pending');
  });
});

it('Should vote for a submission', async () => {
  const submissionID = 1; // Replace with the ID of the submission you want to vote for
  const voteCount = 1; // Replace with the number of votes you want to add

  // Make a request to the vote endpoint with the submission ID and vote count
  const response = await request(app)
    .patch(`/submissions/vote/${submissionID}`)
    .send({ vote: voteCount })
    .expect(200);

  // Assert that the response contains the updated submission and user information
  expect(response.body).toHaveProperty('votes', voteCount);
});
});

describe('Authenticator Middleware', () => {
  it('should allow access for valid token', async () => {
    // Mock valid token
    const validToken = 'valid-token';

    // Mock Token.getOneByToken to return a valid token
    Token.getOneByToken = jest.fn().mockReturnValueOnce(validToken);

    // Create a mock request object with the necessary headers
    const req = {
      headers: {
        authorization: validToken,
      },
    };

    // Create a mock response object with necessary methods
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    // Create a mock next function
    const next = jest.fn();

    // Call the authenticator middleware
    await authenticator(req, res, next);

    // Assert the flow
    expect(Token.getOneByToken).toHaveBeenCalledWith(validToken);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle missing or invalid token', async () => {
    // Mock missing or invalid token
    const missingToken = null;
    const invalidToken = 'invalid-token';

    // Mock Token.getOneByToken to return null for missing or invalid token
    Token.getOneByToken = jest.fn().mockReturnValueOnce(null);

    // Create a mock request object with the necessary headers
    const reqMissing = {
      headers: {
        authorization: missingToken,
      },
    };

    const reqInvalid = {
      headers: {
        authorization: invalidToken,
      },
    };

    // Create a mock response object with necessary methods
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Create a mock next function
    const next = jest.fn();

    // Call the authenticator middleware with missing token
    await authenticator(reqMissing, res, next);

    // Assert the flow for missing token
    expect(Token.getOneByToken).toHaveBeenCalledWith(missingToken);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not authenticated.' });

    // Reset mocks
    Token.getOneByToken.mockReset();
    res.status.mockClear();
    res.json.mockClear();

    // Call the authenticator middleware with invalid token
    await authenticator(reqInvalid, res, next);

    // Assert the flow for invalid token
    expect(Token.getOneByToken).toHaveBeenCalledWith(invalidToken);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "User's token doesnt match server" });
  });
});