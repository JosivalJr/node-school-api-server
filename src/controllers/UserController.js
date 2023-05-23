import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const {
        id, first_name, last_name, email,
      } = newUser;

      return res.json({
        id, first_name, last_name, email,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(400).json({
          errors: ['Missing id.'],
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Invalid id, user not found.'],
        });
      }

      const updateData = await user.update(req.body);
      const {
        id, first_name, last_name, email,
      } = updateData;

      return res.json({
        id, first_name, last_name, email,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(400).json({
          errors: ['Missing id.'],
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Invalid id, user not found.'],
        });
      }

      await user.destroy();
      return res.json({
        message: 'User deleted.',
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

// Deprecated Controllers

// async index(req, res) {
//   try {
//     const users = await User.findAll({ attributes: ['id', 'first_name', 'second_name', 'email'] });
//     return res.json(users);
//   } catch (err) {
//     return res.status(400).json(null);
//   }
// }

// async show(req, res) {
//   try {
//     const user = await User.findByPk(req.params.id);
//     const {
//       id, first_name, last_name, email,
//     } = user;

//     return res.json({
//       id, first_name, last_name, email,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       errors: err.errors.map((e) => e.message),
//     });
//   }
// }

export default new UserController();
