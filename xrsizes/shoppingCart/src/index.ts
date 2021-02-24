const express = require('express');
const argon2 = require('argon2');

const PORT = 3000;

const server = express();

server.use(express.json());

const users: User[] = [];

interface User {
    email: string;
    password: string;
    cart: number[];
}

const items: Item[] = [];

interface Item {
    name: string;
    id: number;
    price: number;
    description: string;
}

server.get('/item', (req,res) => {
    res.json(items);
});

server.post('/addToCart', async (req,res) => {
    const { email, password, id } = req.body
    let success: boolean;
    let itemAdded: Item;

    const user = users.find((user) => {
        return user.email === email;
    });
    if (user){
        if(await argon2.verify(user.password, password)){
            for(const item of items){
                if(item.id === id){
                    user.cart.push(id);
                    res.json({
                        success: true, 
                        itemAdded: item
                    });
                    res.json({message:'item added.'});
                    return 'item added.';
                }
                res.json({message:'item not found.'});
                return 'item not found.';
            }
            res.json({message:'invalid password'});
            return 'invalid password';
        }
    };
    res.json({message:'user not found.'});
    return 'user not found.';

})

server.post('/remove', async (req,res) => {
    const { email, password, id, quantity } = req.body;
    let success: boolean;
    

    const user = users.find((user) => {
        return user.email === email;
    });
    if (user){
        if(await argon2.verify(user.password, password)){
            for(const item of user.cart){
                if(id === item) {
                    let i = 0;
                    while(i < quantity){
                        //if item is in cart, i++, remove 1 of that item from the user's cart,
                        //else exit the loop
                    }
                    res.json({
                        success: true,
                        message: `removed ${i} items from the cart`,
                        remainingItems: quantity-i
                    })
                }
                res.json({message:'item does not exist'});
                return 'item does not exist';
            }
        }
        res.json({message:'invalid password'});
        return 'invalid password';
    }
    res.json({message:'user not found.'});
    return 'user not found.';

})

server.post('/createUser', async (req, res) => {
    //unpack operator
    const { email, password } = req.body
    
    const newUser = await createAccount(email, password);

    res.json(newUser);
});

//helper function to create the account
const createAccount = async (email: string, password: string) => {

    for(const user of users){
        if(user.email === email){
            return false
        }
    };

    //encrypt the password
    password = await argon2.hash(password);
    
    const user: User = {
        email,
        password,
        cart: []
    };

    users.push(user);

    return user;
};

server.post('/cart', async (req, res) => {
  
    const { email, password } = req.body
    
    res.json(findCart(email, password));
});

//helper function to find the cart
const findCart = async (email: string, password: string) => {
    const user = users.find((user) => {
         return user.email === email;
     });
     if (user){
         if(await argon2.verify(user.password, password)){
             return(user.cart);
         }
     };
     return 'user not found';
 };

server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});