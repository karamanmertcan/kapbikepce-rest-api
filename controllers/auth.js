import User from '../models/User';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/auth';
import RestaurantUsers from '../models/RestaurantUsers';

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

//@Desc Restaurant kullanıcı girişi yapmak için kullanılır.
//@Route PUBLIC POST /api/login-restaurant
export const restaurantLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const restaurantUser = await RestaurantUsers.findOne({ email });
    if (!restaurantUser) {
      res.json({
        message: 'Kullanici Bulunamadi'
      });
    }

    //check password
    const isMatch = await comparePassword(password, restaurantUser.password);

    if (!isMatch) {
      res.json({
        message: 'Sifre Hatalidir'
      });
    }

    //token olusturma
    const token = jwt.sign({ _id: restaurantUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    restaurantUser.password = undefined;
    return res.status(200).json({ token, restaurantUser, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json('Bilgiler Hatali');
  }
};

//@Desc Kullanıcı üye olma
//@Route PUBLIC POST /api/register
export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, lastName, password, address, phoneNumber } = req.body;

  if (!name) return res.status(400).json({ error: 'İsim Zorunlu Alandır !!!' });
  if (!email) return res.status(400).json({ error: 'Email Zorunlu Alandır !!!' });
  if (!lastName) return res.status(400).json({ error: 'Soyisim Zorunlu Alandır !!!' });
  if (!password || password.length < 6)
    return res
      .status(400)
      .json({ error: 'Şifre Zorunlu Alandır ve 6 Karakterden Uzun Olmalıdır !!!' });

  if (!address) return res.status(400).json({ error: 'Adres Zorunlu Alandır !!!' });
  if (!phoneNumber) return res.status(400).json({ error: 'Telefon numarası zorunlu alandır !!!' });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ error: 'Bu Email Kullanılıyor !!!' });

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    lastName,
    password: hashedPassword,
    address,
    phoneNumber
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

//@Desc Restuarant üye olma
//@Route PUBLIC POST /api/register-restaurant
export const registerRestaurant = async (req, res) => {
  // console.log(req.body);
  const { name, email, lastName, password, address, phoneNumber, vergiNo, restaurantName } =
    req.body;

  if (!name) return res.status(400).json({ error: 'İsim Zorunlu Alandır !!!' });
  if (!email) return res.status(400).json({ error: 'Email Zorunlu Alandır !!!' });
  if (!restaurantName)
    return res.status(400).json({ error: 'Restaurant İsmi Zorunlu Alandır !!!' });
  if (!vergiNo) return res.status(400).json({ error: 'Vergi Numarası Zorunlu Alandır !!!' });
  if (!lastName) return res.status(400).json({ error: 'Soyisim Zorunlu Alandır !!!' });
  if (!password || password.length < 6)
    return res
      .status(400)
      .json({ error: 'Şifre Zorunlu Alandır ve 6 Karakterden Uzun Olmalıdır !!!' });

  if (!address) return res.status(400).json({ error: 'Adres Zorunlu Alandır !!!' });
  if (!phoneNumber) return res.status(400).json({ error: 'Telefon numarası zorunlu alandır !!!' });

  const restaurantUser = await RestaurantUsers.findOne({ email });

  if (restaurantUser) return res.status(400).json({ error: 'Bu Email Kullanılıyor !!!' });

  const hashedPassword = await hashPassword(password);

  const newUser = new RestaurantUsers({
    name,
    email,
    lastName,
    password: hashedPassword,
    address,
    phoneNumber,
    restaurantName,
    vergiNo
  });

  try {
    await newUser.save();
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

//@Desc Restaurant Kullanıcı bilgilerini güncelleme
//@Route PRIVATE PUT /api/restaurant-user-update
export const restaurantUserUpdate = async (req, res) => {
  try {
    const data = {};

    if (req.body.name) data.name = req.body.name;
    if (req.body.lastName) data.lastName = req.body.lastName;
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({ error: 'Şifre 6 Karakterden Uzun Olmalıdır' });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.vergiNo) data.vergiNo = req.body.vergiNo;
    if (req.body.address) data.address = req.body.address;
    if (req.body.phoneNumber) data.phoneNumber = req.body.phoneNumber;

    const restaurantUser = await RestaurantUsers.findOneAndUpdate({ _id: req.user._id }, data, {
      new: true
    });

    if (!restaurantUser) {
      return res.status(400).json({ error: 'Kullanici Bulunamadi' });
    }

    restaurantUser.password = undefined;
    return res.status(200).json({ restaurantUser, ok: true });
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

//@Desc Restaurant Kullanıcı bilgilerini almak için kullanılır.
//@Route PRIVATE GET /api/get-user
export const getRestaurantUser = async (req, res) => {
  try {
    const restaurantUser = await RestaurantUsers.findById(req.user._id);

    if (!restaurantUser) return res.status(400).json({ error: 'Kullanici Bulunamadi' });

    res.status(200).json({ restaurantUser, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Kullanici Bulunamadi' });
  }
};
