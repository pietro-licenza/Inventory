const Yup = require('yup');
const { Category } = require('../models');

const index = async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) throw new Error('validations fails');

    const { name } = req.body;
    const category = await Category.create({
      name,
    });
    return res.status(201).json(category);
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updatedCategory = await Category.update(
      { name },
      { where: { id } },
    );

    if (!updatedCategory) {
      throw new Error('Category not found');
    }
    return res.status(200).json({ success: 'Category updated successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try{
    const { id } = req.params;
    await Category.destroy(
      { where: { id } },
    );
    return res.status(200).json({ success: 'Category deleted successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { index, create, show, update, deleteCategory };
