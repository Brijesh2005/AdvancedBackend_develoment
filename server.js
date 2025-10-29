const express = require('express');

const app = express()

// app.get('/resume',
//      (request, response) => {
//         const resume = {
//             name: "Brijesh"
//         }
//         response.json(resume)
//     })
app.get('/login',
     (request, response) => {
        const email = request.query.emailId;
        const password = request.query.password;
        console.log(email)
        console.log(password)
        response.send(200)
    })
app.listen(3000, () => {
    console.log('I have started');
})
