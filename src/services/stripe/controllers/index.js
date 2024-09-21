import Stripe from "stripe";
class StripeController {
  constructor() {
    this.secretKey = process.env.STRIPE_SECRET;
    this.stripeClient = new Stripe(this.secretKey);
  }

  createCustomer = async (req, res) => {
    const body = req.body;
    const newCustomer = await this.stripeClient.customers.create({
      ...body,
    });

    res.json(newCustomer);
  };

  createProduct = async (req, res) => {
    const body = req.body;
    const newProduct = await this.stripeClient.products.create({
      ...body,
    });

    res.json(newProduct);
  };

  createPrice = async (req, res) => {
    const price = await this.stripeClient.prices.create({
      currency: "usd",
      unit_amount: 1000,
      product_data: {
        name: "laptop ",
      },
    });
    res.json(price);
  };

  createSessionPayment = async (req, res) => {
    const body = req.body;
    console.log(body)
    const result = await this.stripeClient.checkout.sessions.create({...body});
    res.json(result);
  };
}

export default StripeController;
