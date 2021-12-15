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

export const addRestaurantItem = async (req, res) => {
  console.log('add item', req.body);

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.body._id,
      {
        $push: {
          items: {
            text: req.body.text,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            createdBy: req.user._id
          }
        }
      },
      { new: true }
    );

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Item Eklenemedi'
    });
  }
};

export const removeRestaurantItem = async (req, res) => {
  console.log('remove item', req.body._id);

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.body.restaurantId,
      {
        $pull: {
          items: { _id: req.body._id }
        }
      },
      { new: true }
    );

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Item Eklenemedi'
    });
  }
};

export const updateRestaurantItem = async (req, res) => {
  try {
    const updatedRestaurantItem = await Restaurant.updateOne(
      {
        _id: req.body._id,
        'items._id': req.body.itemId
      },
      {
        $set: {
          'items.$': {
            text: req.body.text,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            createdBy: req.user._id
          }
        }
      },
      { new: true }
    );

    const restaurant = await Restaurant.findById(req.body._id);

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Item Eklenemedi'
    });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Güncellenemedi'
    });
  }
};

export const removeRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(400).json({
        error: 'Restaurant Bulunamadı'
      });
    }

    await restaurant.remove();

    return res.status(200).json({
      message: 'Restaurant Başarıyla Silindi'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Restaurant Silinemedi'
    });
  }
};
