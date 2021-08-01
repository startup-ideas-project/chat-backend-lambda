const {pool} = require('../db-configs/user-db')

const getUser = async (email) => {
    const text =  `SELECT * FROM users WHERE email IN ($1)`
    const values = [email] 
    return executeRequest(pool, text, values)
}

const createUser = async (User) => {
    const text = 'INSERT INTO users(Id, name, password, email, created) VALUES ($1, $2, $3, $4, $5)'
    const values = [User.Id, User.name, User.password, User.email, User.created] 
    return executeRequest(pool, text, values)
}

const matchUser = (email, password) => {
    const text = 'SELECT * FROM users WHERE email IN ($1) AND password IN ($2)'
    const values = [email, password] 
    return executeRequest(pool, text, values)
}

const executeRequest = async (pool, text, values) => {
    return pool.query(text, values).then(data => data)
}

module.exports = {
    getUser,
    createUser,
    matchUser
}