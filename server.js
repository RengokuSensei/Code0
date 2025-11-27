const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcrypt');

app.use(express.static('.'));
app.use(express.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Load user data
let users = JSON.parse(fs.readFileSync('users.json'));
let notes = JSON.parse(fs.readFileSync('notes.json'));

// Data store
const postsData = {
    research: {
        posts: JSON.parse(fs.readFileSync('research.json')),
        file: 'research.json'
    },
    reading: {
        posts: JSON.parse(fs.readFileSync('reading.json')),
        file: 'reading.json'
    }
};

// Function to create post routes
function createPostRoutes(type) {
    const router = express.Router();
    const data = postsData[type];

    router.get('/', (req, res) => {
        res.json(data.posts);
    });

    router.post('/', (req, res) => {
        const post = req.body;
        data.posts.push(post);
        fs.writeFileSync(data.file, JSON.stringify(data.posts, null, 2));
        res.status(201).json(post);
    });

    return router;
}

// User authentication endpoints
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'User registered successfully.' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.json({ message: 'Logged in successfully.' });
    } else {
        res.status(401).json({ error: 'Invalid username or password.' });
    }
});

app.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully.' });
});

// API endpoints
app.use('/api/research', createPostRoutes('research'));
app.use('/api/reading', createPostRoutes('reading'));

// Note-making endpoints
app.get('/api/notes', (req, res) => {
    if (req.session.user) {
        res.json(notes[req.session.user.username] || []);
    } else {
        res.status(401).json({ error: 'Not logged in.' });
    }
});

app.post('/api/notes', (req, res) => {
    if (req.session.user) {
        if (!notes[req.session.user.username]) {
            notes[req.session.user.username] = [];
        }
        notes[req.session.user.username].push(req.body.note);
        fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
        res.status(201).json({ message: 'Note created successfully.' });
    } else {
        res.status(401).json({ error: 'Not logged in.' });
    }
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});