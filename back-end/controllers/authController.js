exports.login = (req, res) => {
    const { email, password, role } = req.body;
  
    // Basic static auth for demo
    if (role === 'admin' && email === 'admin@example.com' && password === 'admin123') {
      return res.json({ success: true, role: 'admin' });
    }
    if (role === 'user' && email && password) {
      return res.json({ success: true, role: 'user' });
    }
  
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  };
  