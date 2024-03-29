import Restaurant from '../models/Restaurant';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

//@DESC POST /api/restaurant/:id
// Private
export const createRestaurant = async (req, res) => {
  const { restaurantName, image, phoneNumber, address, openHours } = req.body;

  try {
    if (!restaurantName.length) {
      return res.status(400).json({
        error: 'Restaurant name is required'
      });
    }

    const restaurant = await Restaurant.create({
      restaurantName,
      phoneNumber,
      address,
      openHours,
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

//@DESC GET /get-restaurants
//Private
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).populate('restaurantOwner', '_id name lastName');
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurantler Getirilemedi'
    });
  }
};

//@DESC PUT /api/restaurant/:id
// Private
export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({ restaurantOwner: { _id: req.params.id } }).populate(
      'restaurantOwner',
      '_id name lastName'
    );
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

//@DESC PUT /update-restaurant
//Private
export const updateRestaurant = async (req, res) => {
  console.log(req.body.restaurantName);
  const { restaurantName, phoneNumber, address, openHours, isOpen } = req.body;
  try {
    const data = {};

    if (restaurantName) data.restaurantName = restaurantName;
    if (openHours) data.openHours = openHours;
    if (phoneNumber) data.phoneNumber = phoneNumber;
    if (address) data.address = address;
    if (isOpen) data.isOpen = isOpen;

    const restaurant = await Restaurant.findOneAndUpdate(
      { restaurantOwner: { _id: req.user._id } },
      data,
      { new: true }
    );

    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Güncellenemedi'
    });
  }
};

//@DESC DELETE /api/delete-restaurant/:id
// Private
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(400).json({
        error: 'Restaurant Bulunamadı'
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Restaurant Silindi'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Silinemedi'
    });
  }
};
