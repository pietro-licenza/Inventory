const { Client, Product } = require('../models');

const index = async (req, res) => {
  try {
    const clients = await Client.findAll();
    return res.status(200).send(clients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
   const { name, email, phoneNumber, clientAddress } = req.body;
  
   const client = await Client.create({
      name, 
      email, 
      phoneNumber, 
      clientAddress
   });
   return res.status(201).json(client);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const update = async (req, res) => {
  try {

    const { name, email, phoneNumber, clientAddress } = req.body;

    const { id } = req.params;
    const updatedClient = await Client.update(
      { name, email, phoneNumber, clientAddress },
      { where: { id } },
    );

    if (!updatedClient) {
      throw new Error('Client not found');
    }
    return res.status(200).json(updatedClient);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try{
    const { id } = req.params;
    await Client.destroy(
      { where: { id } },
    );
    return res.status(200).json({ success: 'Client deleted successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};


module.exports = { index, create, update, deleteClient };
