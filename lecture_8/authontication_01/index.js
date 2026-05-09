import express from "express";
import multer from 'multer';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(multer().none());


const DIARY = {};
const EMAILS = new Set();

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    if (EMAILS.has(email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const token = `${email}-${Date.now()}`;
    DIARY[token] = { email, password, name };
    EMAILS.add(email);
    return res.status(201).json({ token });
});

app.post('/me', (req, res) => {
    const { token } = req.body;
    if(!token){
        return res.status(400).json({ message: 'Token is required' });
    }
    if(!DIARY[token]){
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user: DIARY[token] });
});


app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));