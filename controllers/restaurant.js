import Restaurant from '../models/Restaurant';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const createRestaurant = async (req, res) => {
  const { restaurantName, image } = req.body;

  try {
    if (!restaurantName.length) {
      return res.status(400).json({
        error: 'Restaurant name is required'
      });
    }

    const restaurant = await Restaurant.create({
      restaurantName,
      image,
      restaurantOwner: req.user._id
    });

    await restaurant.save();

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Oluşturulamadı'
    });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurantler Getirilemedi'
    });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).json({
        error: 'Restaurant Bulunamadı'
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Bulunamadı'
    });
  }
};
