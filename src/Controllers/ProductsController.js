const { Product } = require('../models');

const index = async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, price, quantity, categoryId, sizes } = req.body;
   const product = await Product.create({
     name,
     price,
     quantity,
     categoryId,
     sizes,
   });
   return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, price, quantity, categoryId } = req.body;
    const { id } = req.params;
    const updatedProduct = await Product.update(
      { name, price, quantity, categoryId },
      { where: { id } },
    );

    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const deleteProd = async (req, res) => {
  try{
    const { id } = req.params;
    await Product.destroy(
      { where: { id } },
    );
    return res.status(200).json({ success: 'Product deleted successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { create, index, show, update, deleteProd };
