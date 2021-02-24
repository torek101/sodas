const express = require('express');
const argon2 = require('argon2');
const { user } = require('osenv');

const PORT = 3000;

//immutable
const server = express();


//.use allows us to import and apply middlewares
//middlewares just "sit" in the middle in the middle of requrests
server.use(express.json());

//GET, POST
//GET -> carries over request parameters FROM the server to the client
//POST -> carries over reqest parameters TO the server from the client

//global variable to store user accounts
const users = [];

//4 major list functions
/* 
push() - add an element to the list
pop() - remove an element from the list
length - returns the length of the list
*/

//LOGINS
server.post('/login', async (req,res) => {
    const { email, username, password} = req.body

    let success;
    if (email){
        success = await loginWithEmail(email, password);
    }else if (username) {
        success = await loginWithUsername(username, password);
    }

    if(success === undefined){
        res.json({
            success: false,
            message: `Could not find account with ${email ? `email: ${email}` : `username: ${username}`} .`
        });
    } else {
    res.json({
        success,
        message: `Authentication ${success ? 'succeeded' : 'failed'}`
    })
    }
;
})

//helper function to login and verify users
const loginWithEmail = async (email, password) => {
    for (const user of users){
        if (user.email === email) {
            //check if the passwords match
            return await argon2.verify(user.password, password);
        };
    }
    return;

   
};

const loginWithUsername = async (username, password) => {
   const user = users.find((user) => {
        return user.username === username;
    });
    if (user){
        return await argon2.verify(user.password, password);
    };
    return;
};

//CREATING AN ACCOUNT
server.post('/register', async (req, res) => {
    //unpack operator
    const { email, username, password, firstName, lastName} = req.body
    
    const newUser = await createAccount(email, username, password, firstName, lastName);

    res.json(newUser);
});

//helper function to create the account
const createAccount = async (email, username, password, firstName, lastName) => {

    for(const user of users){
        if(user.email === email){
            return false
        }
        else if(user.username === username){
            return false  
        }
    };


    //encrypt the password
    password = await argon2.hash(password);
    
    const user = {
        email,
        username,
        password,
        firstName,
        lastName
    };

    users.push(user);

    return user;
};

server.post('/search', (req,res) => {
    const {username, email} = req.body;
    
    if(username) {
        for(const user of users) {
            if(user.username === username) {
                const { firstName, lastName} = user;
                res.json ({
                    username,
                    email: user.email,
                    firstName,
                    lastName,
                })
            }
        }
    } else if (email){
        const founduser = users.find((user) => user.email === email);
    
    delete foundUser.password;

    res.json(foundUser);
    }
});

server.post('/changePassword', async (req,res) => {
    const {username, email, oldPassword, newPassword} = req.body;

    for(const user of users){
        if(user.username === username){
            if (await argon2.verify(user.password, password)){
                user.password = await argon2.hash(password);
                res.json(user)
            }
        }
    }

    for(const user of users){
        if(user.email === email){
            if (await argon2.verify(user.password, password)){
                user.password = await argon2.hash(password);
                res.json(user)
            }
        }
    }
    
});

const searchEmail = async (login) => {
    for (const user of users){
        if (user.email === login) {
            return true;
        };
    }
    return;

   
};

const searchUsername = async (login) => {
   const user = users.find((user) => {
        return user.username === login;
    });
    return;
};

server.listen(PORT, () => {
    //TEMPLATE STRINGS: backtick
    //allows to escape the string and include javaString "literals"
    console.log(`Listening on Port: ${PORT}`);
    createAccount('a','a','a','a','a')
})
