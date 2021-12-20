import Product from '../models/Product';

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({ restaurantOwner: { _id: req.params.id } });

    if (!product) {
      return res.status(404).json({
        error: 'Ürün Bulunamadı'
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Ürünler Bulunurken Hata Oluştu'
    });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, price, image, category } = req.body;
  try {
    if (!title)
      return res.status(404).json({
        error: 'Ürün Adı Boş Olamaz'
      });

    if (!description)
      return res.status(404).json({
        error: 'Açıklama Boş Olamaz'
      });
    if (!price)
      return res.status(404).json({
        error: 'Fiyat Boş Olamaz'
      });
    if (!category)
      return res.status(404).json({
        error: 'Kategori Boş Olamaz'
      });

    const product = await Product.create({
      title,
      description,
      price,
      category,
      restaurant: req.user._id
    });

    await product.save();

    res.status(200).json({
      product,
      ok: true
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Ürün Oluşturularken Hata Oluştu'
    });
  }
};
