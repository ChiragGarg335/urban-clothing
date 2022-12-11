require("dotenv").config();
const stripe = require("stripe")('sk_test_51MDMzuSJz2RA1MqEZZS4aFqK9RAGshtG9Oku84meMFk66IkIHsgWJPQOlHTwUJPBr4Yj31vnJSphfHmeaQPADpG000vBjr3oUV');

exports.handler=async(event)=> {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
    // 4000003560000008
      payment_method: 'pm_card_in',
      confirm:true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
}