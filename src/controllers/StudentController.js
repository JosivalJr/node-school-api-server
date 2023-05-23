import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'weight', 'height', 'age'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });
    res.status(200).json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['missing identifier'],
        });
      }

      const student = await Student.findByPk(
        id,
        {
          attributes: ['id', 'first_name', 'last_name', 'email', 'weight', 'height', 'age'],
          include: {
            model: Photo,
            attributes: ['url', 'filename'],
          },
        },
      );

      if (!student) {
        return res.status(400).json({
          errors: ['invalid student'],
        });
      }

      const {
        first_name, last_name, email, age, weight, height,
      } = student;
      const photos = student.Photos;

      return res.status(200).json({
        first_name, last_name, email, age, weight, height, photos,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body);

      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['missing identifier'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['invalid student'],
        });
      }

      const updateDatas = await student.update(req.body);
      const {
        first_name, last_name, email, age, weight, height,
      } = updateDatas;

      return res.status(202).json({
        first_name, last_name, email, age, weight, height,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['missing identifier'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['invalid student'],
        });
      }

      await student.destroy();

      return res.status(200).json('Student deleted.');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new StudentController();
