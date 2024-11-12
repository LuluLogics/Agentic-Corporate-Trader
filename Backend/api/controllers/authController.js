import admin from 'firebase-admin';

// Register User
export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).json({ message: 'User registered successfully', uid: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const customToken = await admin.auth().createCustomToken(email);
    res.status(200).json({ message: 'Login successful', token: customToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Placeholder for get all users
export const get = async (req, res) => {
  res.status(200).json({ message: 'Fetched all users - Placeholder response' });
};

// Placeholder for get user by ID
export const index = async (req, res) => {
  res.status(200).json({ message: `Fetched user with ID ${req.params.id} - Placeholder response` });
};

// Placeholder for update user by ID
export const update = async (req, res) => {
  res.status(200).json({ message: `Updated user with ID ${req.params.id} - Placeholder response` });
};

// Placeholder for delete user by ID
export const remove = async (req, res) => {
  res.status(200).json({ message: `Deleted user with ID ${req.params.id} - Placeholder response` });
};
