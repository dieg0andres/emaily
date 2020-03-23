const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');



module.exports = function(app) {

  // the requireLogin is a middleware I wrote
  app.post('/api/stripe', requireLogin, async function(req, res) {

    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        source: req.body.id,
        description: '$5 for 5 credits'
    });

    req.user.credits += 5;

    // the above line is asynchronous
    const user = await req.user.save();

    res.send(user);
  });
}

// BEFORE REFACTORING
// module.exports = function(app) {
//
//   app.post('/api/stripe', function(req, res) {
//
//     stripe.charges.create({
//         amount: 2000,
//         currency: 'usd',
//         source: req.body.id,
//         description: 'My First Test Charge (created for API docs)',
//       },
//       function(err, charge) {
//         console.log(charge);
//       }
//     );
//   });
// }
