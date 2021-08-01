
const USER_DAO = require('../../DAO/users/user-dao');
const { v4: uuidv4 } = require('uuid');

/**
 * User Registration
 */
 const userRegistrationHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`userRegistrationHandler only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    const body = JSON.parse(event.body)
    const user = body // encrypted body within the DB
    //password should be encrypted before sending to the wire. 
    user.Id = uuidv4();
    user.created = new Date().toISOString()
    
    const registeredUser = await USER_DAO.getUser(user.email).then(data => data.rows)
    if(registeredUser.length > 1){
        res.send('Email already existed')
        return {
            statusCode: 400,
            message: 'Email already existed'
        }
    }

    const responseBody = {}
    await USER_DAO.createUser(user).then(_ => {
        responseBody.message = 'successfully created'
    }).catch(err => {
        return {
            statusCode: 500
        }
    });
    return {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };
}

module.exports = {
    userRegistrationHandler
}
