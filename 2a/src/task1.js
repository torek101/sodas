const express = require('express');

const PORT = 3000;

const server = express();

server.use(express.json());

const strList = [];

server.post('/api/mutation', (req,res) => {
    const {str} = req.body;
    
    console.log(`added original string ${str}!`);
    let everyThird = strMutation(str)
    console.log(`added mutated string ${everyThird}!`);

    res.json({
        message: `Transformed "${str}" to "${everyThird}".`
    });
});

const strMutation = (str) => {
    let everyThird = "";
    let i = 0;
    while(str.length/3 > i){
        everyThird += str.substring(3*i+2,3*i+3);
        i++;
    };

    const object = {
        [str]: everyThird
    }


    strList.push(object);
    console.log(strList);

    return everyThird;
}


server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
