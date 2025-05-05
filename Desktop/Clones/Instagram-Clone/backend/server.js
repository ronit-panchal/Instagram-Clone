const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Path to your users.json file
const dataPath = path.join(__dirname, 'users.json');

// Helper: Read users from file
const readUsers = () => {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data || '[]');
};

// Helper: Write users to file
const writeUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// ✅ GET - Get all users
app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error reading users' });
  }
});

// ✅ POST - Register new user
app.post('/api/users/register', (req, res) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const users = readUsers();

    const userExists = users.some(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
      password,
      avatar: avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${name}`
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// ✅ POST - Login user
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// ✅ PUT - Update a user by ID
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  try {
    let users = readUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users[index] = { ...users[index], ...updatedData };
    writeUsers(users);
    res.json({ message: 'User updated', user: users[index] });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// ✅ DELETE - Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let users = readUsers();
    const updatedUsers = users.filter(u => u.id !== id);
    writeUsers(updatedUsers);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
