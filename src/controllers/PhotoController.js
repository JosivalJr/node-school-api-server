import multer from 'multer';
import multerConfig from '../config/multer';

import Photo from '../models/Photo';
import Student from '../models/Student';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        if (!student_id) {
          return res.status(400).json({
            errors: ['missing student identification'],
          });
        }
        const student = await Student.findByPk(student_id);
        if (!student) {
          return res.status(400).json({
            errors: ['invalid student'],
          });
        }

        const photo = await Photo.create({ originalname, filename, student_id });
        return res.json({
          id: req.id, student_id, originalname, filename, url: photo.url,
        });
      } catch (error) {
        if (error.errors) {
          return res.status(400).json({
            errors: error.errors.map((e) => e.message),
          });
        }
        return res.status(400).json({
          errors: ['Invalid student.'],
        });
      }
    });
  }
}

export default new PhotoController();
