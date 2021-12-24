import Product from '../models/Product';

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({ restaurant: req.params.id });

    if (!product) {
      return res.status(404).json({
        error: 'Ürün Bulunamadı'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Ürünler Bulunurken Hata Oluştu'
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product)
      return res.status(400).json({
        error: 'Ürün Bulunamadı'
      });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: 'Ürün Bulunurken Hata Oluştu'
    });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, price, category } = req.body;
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

export const updateProduct = async (req, res) => {
  const { title, description, price, category } = req.body;
  try {
    const data = {};

    if (title) data.title = title;
    if (description) data.description = description;
    if (price) data.price = price;
    if (category) data.category = category;

    const product = await Product.findOneAndUpdate({ _id: req.params.id }, data, { new: true });

    if (!product)
      return res.status(404).json({
        error: 'Ürün Bulunamadı'
      });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Ürün Güncellenirken Hata Oluştu'
    });
  }
};
