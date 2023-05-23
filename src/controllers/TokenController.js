import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errors: ['Invalid credentials.'],
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        errors: ['User not found.'],
      });
    }

    if (!(await user.validPassword(password))) {
      return res.status(400).json({
        errors: ['Invalid password.'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { id, email, name: `${user.first_name} ${user.last_name}` } });
  }
}

export default new TokenController();
