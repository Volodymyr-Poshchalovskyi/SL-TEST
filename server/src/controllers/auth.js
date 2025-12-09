const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// * Registration Controller
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // * 1. Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // * 2. Check for existing user by email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // * 3. Hash the password using bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // * 4. Create the new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    // * 5. Generate JWT token for immediate session
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // * Respond with token and user data
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// * Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // * 1. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // * 2. Compare provided password with hashed password
    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // * 3. Generate new JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // * Respond with token and user data
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { register, login };