import Order from '../models/Order';

export const createOrder = async (req, res) => {
  console.log(req.user);
  const { orderOwnerName, restaurantOwner, totalPrice, address, isPaid, items } = req.body;
  const myTotalPrice = items.reduce((acc, item) => acc + item.price, 0);

  if (totalPrice !== myTotalPrice) {
    return res.status(400).json({
      error: 'Fiyatlar eşleşmiyor !!!'
    });
  }

  try {
    const order = await Order.create({
      orderOwnerName,
      orderOwnerId: req.user._id,
      restaurantOwner,
      totalPrice: myTotalPrice,
      address,
      isPaid: false,
      items
    });

    console.log(items);

    //await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Sipariş Oluşturulamadı '
    });
  }
};

export const getOrderByRestaurantId = async (req, res) => {
  try {
    const order = await Order.find({ restaurantOwner: req.params.id });
    if (!order) {
      return res.status(400).json({
        message: 'Sipariş Bulunamadı'
      });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrderById = async (req, res) => {
  try {
    const order = await Order.find({ orderOwnerId: req.params.id });

    if (!order) {
      return res.status(400).json({
        message: 'Sipariş Bulunamadı'
      });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Kullanıcıya Ait Sipariş Bulunamadı'
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: 'Ürün Güncellenemedi'
    });
  }
};
