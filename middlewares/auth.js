import Restaurant from '../models/Restaurant';
import expressJwt from 'express-jwt';

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

export const restrauntOwnerUpdateEdit = async (req, res, next) => {
  console.log(req.body._id);
  console.log(req.user._id);
  try {
    const restaurant = await Restaurant.findById(req.body._id);

    if (restaurant.restaurantOwner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: 'Restaurant Owner is not authorized'
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export const isUserAdmin = async (req, res, next) => {
  console.log(req.user.isAdmin);

  try {
    if (req.user && req.user.isAdmin) {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: 'Kullanıcı admin değil.'
    });
  }
};
