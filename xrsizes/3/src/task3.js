const express = require('express');
const argon2 = require('argon2');

const PORT = 3000;

const server = express();

server.use(express.json());

const users = [];
const books = [];

const newUser = async (firstName, lastName, email, password) => {
    for(const user of users){
        if(user.email === email){
            return `The email ${email} is already being used.`;
        }
    }
    password = await argon2.hash(password);
    //jason help me ^^
    const checkedBooks = [];
    const id = Math.floor(Math.random()*100000);

    let unique;

    while(!unique){
        for (const user of users){
            if (user.id === id){
                id = Math.floor(Math.random()*100000);
                break;
            }
        }
        unique = true;
    };
    
    const user = {
        id,
        email,
        password,
        firstName,
        lastName,
        checkedBooks
    };

    users.push(user);

    return user;

}


const newBook = (name, isbn13, price, author, year) => {

    const book = {
        name,
        isbn13,
        price,
        author,
        year
    }

    books.push(book);

    return book;
};

server.listen(PORT, async () => {
    console.log(`Listening on Port: ${PORT}`);
    console.log(await newUser('Henry','Feuerborn','Hfireborn@gmail.com', '123456789'));
    console.log(newBook('the banana of west coast','1234567891011', '20000.00', 'Jason Yu', '2050'));
});
