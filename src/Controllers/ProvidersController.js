const { Provider, Address } = require('../models');

const index = async (req, res) => {
  try {
    const providers = await Provider.findAll();
    return res.status(201).send(providers);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
   const { name, corporateName, cnpj, email, phoneNumber, address } = req.body;
   const { neighborhood, street, number, state, city, cep } = address;
   const { providerAddress } = await Address.create({ neighborhood, street, number, state, city, cep });
   const provider = await Provider.create({
     name,
     corporateName,
     cnpj,
     email,
     address,
     phoneNumber,
     providerAddress,
   });
   return res.status(201).json({ provider });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);
    return res.status(200).json(provider);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, corporateName, cnpj, contact } = req.body;
    const { id } = req.params;
    const provider = await Provider.update(
      { name, corporateName, cnpj, contact },
      { where: { id } },
    );
    if (!provider) {
      throw new Error('Provider not found');
    }
    return res.status(200).json({ success: 'Provider updated successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const deleteProv = async (req, res) => {
  try{
    const { id } = req.params;
    await Provider.destroy(
      { where: { id } },
    );
    return res.status(200).json({ success: 'Provider deleted successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};


module.exports = { create, index, show, update, deleteProv };
