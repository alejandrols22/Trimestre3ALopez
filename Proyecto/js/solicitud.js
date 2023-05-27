// lambda_function.js
const aws = require('amazon-product-api');

const client = aws.createClient({
  awsId: 'tu_amazon_access_key',
  awsSecret: 'tu_amazon_secret_key',
  awsTag: 'tu_amazon_assoc_tag'
});

exports.handler = async (event) => {
  const result = await client.itemSearch({
    keywords: 'proteinas',
    searchIndex: 'Grocery',
    sort: 'salesrank',
    availability: 'Available',
    condition: 'New',
    minPercentageOff: 10
  });

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Asegúrate de cambiar esto a tu dominio real en producción
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  };

  return response;
};