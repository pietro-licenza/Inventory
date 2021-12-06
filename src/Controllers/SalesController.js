const { Sale, Product, SalesProduct, Client } = require('../models');

const index = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    const saleProducts = await SalesProduct.findAll()
    const products = await Product.findAll();
    const clients = await Client.findAll();

    newSales = []

    sales.map(s => {
      let ns = { ...s.dataValues }
      ns['products'] = []
      ns['client'] = {}

      let client = clients.find(c => c.dataValues.id == parseInt(s.clientId))
      if(client)
      ns.client = client.dataValues

      saleProducts.map(sp => {
        if(sp.saleId == s.id) {
          let product = products.find(p => p.id == sp.productId)
          ns.products.push({
            'product': product.dataValues,
            'quantity': sp.quantity
          })

        
        }
      })

      newSales.push(ns)
    })

    return res.status(200).send(newSales);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

function checkQtd(produtosDB) {
  return new Promise(async (resolve, reject) => {
    
    var allQtdValids = true;

    for(var p = 0; p < produtosDB.length; p++) {
      let product = await Product.findByPk(produtosDB[p].id);
   
      if(!product) {
        reject("PRODUCT_NOT_FOUND" );
        break;
      }

      const newQuantityProduct = product.quantity - produtosDB[p].quantity;
      
      if (newQuantityProduct < 0) {
        allQtdValids = false;
        reject("INVALID_QUANTITY" );
        break;
      }

    }

    if(!allQtdValids) {
      reject("INVALID_QUANTITY" );
    } else {
      resolve(true)
    }
  })
}
const create = async (req, res) => {
  try {
   const { clientId, products, paymentMethod, isSaleComplete } = req.body;

    checkQtd(products)
    .then(async (isValid) => {
      console.log(isValid)
      const sale = await Sale.create({
          clientId,
          paymentMethod,
          isSaleComplete
      });
    
      products.map(async (p) => {
          let product = await Product.findByPk(p.id);
          
          const newQuantityProduct = product.quantity - p.quantity;
        
          await Product.update({ quantity: newQuantityProduct }, { where: { id: p.id } });
          
          await SalesProduct.create({productId: p.id, quantity: p.quantity, saleId: sale.id})
      })
    
    
      return res.status(201).json(sale);

    }, (err) => {
      if(err == "PRODUCT_NOT_FOUND") {
        return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
      } else if (err == "INVALID_QUANTITY") {
        return res.status(500).json({ error: "INVALID_QUANTITY" });
      } else {
        return res.status(500).json({ error: err });
      }
    })
    .catch((err) => {
      if(err == "PRODUCT_NOT_FOUND") {
        return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
      } else if (err == "INVALID_QUANTITY") {
        return res.status(500).json({ error: "INVALID_QUANTITY" });
      } else {
        return res.status(500).json({ error: err });
      }
    })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const sale = Sale.findByPk(id)

  if(!sale) {
    return res.status(404).json({ error: "SALE_NOT_FOUND" });
  }

  await Sale.update({ isSaleComplete: true }, { where: { id: id } });

  return res.status(201).json(sale);
}

module.exports = { index, create, updateSales};
