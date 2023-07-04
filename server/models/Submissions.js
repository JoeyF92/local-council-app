const db = require('../database/connect')

class Submissions{

    static async getAllSubmissions(){
        const query = 'SELECT * FROM voting_submissions'
        const {rows} = await db.query(query)
        return rows
    }

    static async getSubmissionById(id){
        const query = 'SELECT * FROM voting_submissions WHERE submission_id = $1'
        const {rows} = await db.query(query,[id])
        return rows[0]
    }

    static async getSubmissionsByStatus(submission_status){
        const query = 'SELECT * FROM voting_submissions WHERE submission_status= $1'
        const {rows} = await db.query(query,[submission_status])
        return rows[0]
    }

    static async createSubmission(submission){
        const {title, category, proposal , photo} = submission
        const query = 'INSERT INTO voting_submissions (title, category, proposal, photo) VALUES ($1, $2, $3, $4) RETURNING *'
        const values = [title, category, proposal, photo]
        const {rows} = await db.query(query, values)
        return rows[0]
    }

    static async updateSubmission(id, submission){
        const {title, category, proposal , photo} = submission
        const query = 'UPDATE voting_submissions SET title = $1, category = $2, proposal = $3, photo = $4 WHERE submission_id = $5 RETURNING *'
        const values = [title, category, proposal , photo, id]
        const {rows} = await db.query(query, values)
        return rows[0]
    }

    static async updateSubmissionStatus(id, submission){
        const {submission_status} = submission
        const query = 'UPDATE voting_submissions SET submission_status = $1 WHERE submission_id = $2 RETURNING *'
        const values = [submission_status, id]
        const {rows} = await db.query(query, values)
        return rows[0]
    }

    static async vote(count, id){
        const query = `UPDATE voting_submissions SET votes = votes + $1 WHERE submission_id = $2`;
        const values = [count, id];
        const {rows} = await db.query(query, values)
        return rows[0]
    }

}

module.exports = Submissions