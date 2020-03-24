const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('Survey');



module.exports = function(app) {

  app.post('/api/surveys', requireLogin, requireCredits, function(req, res) {

    const { title, subject, body, recipients} = req.body

    const survey = new Survey({
      title: title,
      body: body,
      subject: subject,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // recipients: recipients.split(',').map(email => { return { email: email.trim() } }),
      _user: req.user.id,
      dateSent: Date.now()
    });


  });
}
