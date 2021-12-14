import User from '../models/User';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/auth';

//@Desc Kullanıcı girişi yapmak için kullanılır.
//@Route PUBLIC POST /api/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        message: 'Kullanici Bulunamadi'
      });
    }

    //check password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.json({
        message: 'Sifre Hatalidir'
      });
    }

    //token olusturma
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    user.password = undefined;
    return res.status(200).json({ token, user, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json('Bilgiler Hatali');
  }
};

//@Desc Kullanıcı üye olma
//@Route PUBLIC POST /api/register
export const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, lastName, password, address } = req.body;

  if (!name) return res.status(400).json({ error: 'İsim Zorunlu Alandır !!!' });
  if (!email) return res.status(400).json({ error: 'Email Zorunlu Alandır !!!' });
  if (!lastName) return res.status(400).json({ error: 'Soyisim Zorunlu Alandır !!!' });
  if (!password || password.length < 6)
    return res
      .status(400)
      .json({ error: 'Şifre Zorunlu Alandır ve 6 Karakterden Uzun Olmalıdır !!!' });

  if (!address) return res.status(400).json({ error: 'Adres Zorunlu Alandır !!!' });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: 'Bu Email Kullanılıyor !!!' });

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    lastName,
    password: hashedPassword,
    address
  });

  try {
    await newUser.save();
    console.log('Kayıt Başarılı');
    res.status(200).json({
      ok: true,
      message: 'Kayıt Başarılı',
      user: newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Kayıt Başarısız !!!' });
  }
};

//@Desc Kullanıcı bilgilerini güncelleme
//@Route PRIVATE PUT /api/user-update
export const userUpdate = async (req, res) => {
  try {
    const data = {};

    if (req.body.name) data.name = req.body.name;
    if (req.body.lastName) data.lastName = req.body.lastName;
    if (req.body.address) data.address = req.body.address;

    const user = await User.findOneAndUpdate({ _id: req.user._id }, data, { new: true });

    if (!user) {
      return res.status(400).json({ error: 'Kullanici Bulunamadi' });
    }

    user.password = undefined;
    return res.status(200).json({ user, ok: true });
  } catch (error) {
    console.log(error);
  }
};

//@Desc Kullanıcı bilgilerini almak için kullanılır.
//@Route PRIVATE GET /api/get-user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(400).json({ error: 'Kullanici Bulunamadi' });

    res.status(200).json({ user, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Kullanici Bulunamadi' });
  }
};
