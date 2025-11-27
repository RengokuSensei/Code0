async function fetchPosts(type) {
    const response = await fetch(`/api/${type}`);
    const posts = await response.json();
    const container = document.getElementById(`${type}-posts`);
    container.innerHTML = '';
    for (const post of posts) {
        const article = document.createElement('article');
        const title = document.createElement('h3');
        title.textContent = post.title;
        const date = document.createElement('p');
        date.textContent = `Posted on: ${post.date}`;
        const summary = document.createElement('p');
        summary.textContent = post.summary;
        article.appendChild(title);
        article.appendChild(date);
        article.appendChild(summary);
        container.appendChild(article);
    }
}

fetchPosts('research');
fetchPosts('reading');

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value })
    });
    if (response.ok) {
        loginForm.style.display = 'none';
        logoutBtn.style.display = 'block';
        document.getElementById('notes').style.display = 'block';
        document.getElementById('ebook-reader').style.display = 'block';
        fetchNotes();
    }
});

async function fetchNotes() {
    const response = await fetch('/api/notes');
    if (response.ok) {
        const notes = await response.json();
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';
        for (const note of notes) {
            const item = document.createElement('li');
            item.textContent = note;
            notesList.appendChild(item);
        }
    }
}

registerBtn.addEventListener('click', async () => {
    await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value })
    });
});

logoutBtn.addEventListener('click', async () => {
    await fetch('/api/logout');
    loginForm.style.display = 'block';
    logoutBtn.style.display = 'none';
    document.getElementById('notes').style.display = 'none';
    document.getElementById('ebook-reader').style.display = 'none';
});

const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');

noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (noteInput.value) {
        await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note: noteInput.value })
        });
        noteInput.value = '';
        fetchNotes();
    }
});

const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(postForm);
    const type = formData.get('type');
    const post = {
        title: formData.get('title'),
        date: formData.get('date'),
        summary: formData.get('summary')
    };
    await fetch(`/api/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    postForm.reset();
    fetchPosts(type);
});

const ebookUpload = document.getElementById('ebook-upload');
const viewer = document.getElementById('viewer');

ebookUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file.name.endsWith('.pdf')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const typedarray = new Uint8Array(e.target.result);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                viewer.innerHTML = '';
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    pdf.getPage(pageNum).then(page => {
                        const canvas = document.createElement('canvas');
                        viewer.appendChild(canvas);
                        const context = canvas.getContext('2d');
                        const viewport = page.getViewport({ scale: 1.5 });
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({ canvasContext: context, viewport: viewport });
                    });
                }
            });
        };
        reader.readAsArrayBuffer(file);
    } else if (file.name.endsWith('.epub')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const book = ePub(e.target.result);
            viewer.innerHTML = '';
            const rendition = book.renderTo(viewer, { width: "100%", height: "100%" });
            rendition.display();
        };
        reader.readAsArrayBuffer(file);
    }
});

const socket = io();
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const messages = document.getElementById('messages');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (chatInput.value) {
        socket.emit('chat message', chatInput.value);
        chatInput.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
