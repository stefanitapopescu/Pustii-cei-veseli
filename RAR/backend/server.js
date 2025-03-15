const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

//app.use(cors());
app.use(express.json());

const dummyUser = {
    username: 'user',
    password: 'password', 
    points: 0,
};

// Endpoint-ul pentru login. Cineva trimite o cerere POST catre server
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === dummyUser.username && password === dummyUser.password) {
        return res.json({ success: true, message: 'Login successful', user: dummyUser });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});
app.get('/', (req, res) => {
    res.send('Salut, acesta este backend-ul pentru platforma ta de voluntariat și propuneri!');
});

app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});
