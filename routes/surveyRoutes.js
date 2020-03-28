const _ = require('lodash');
const {Path} = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Survey');

module.exports = function(app) {

  app.get('/api/surveys', requireLogin, async function(req, res) {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyID/:choice', function(req, res) {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', function(req, res) {

    const p = new Path('/api/surveys/:surveyID/:choice');

    const events = _.chain(req.body)
      .map((event) => {
        const pathname = new URL(event.url).pathname;
        const match = p.test(pathname);

        if(match) {
          return {email: event.email, surveyID: match.surveyID, choice: match.choice}
        }
      })
      .compact()
      .uniqBy('email', 'surveyID')
      .each( ({ surveyID, email, choice }) => {
        Survey.updateOne({
          _id: surveyID,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    console.log('xxx', events);

    res.send({})
});

  app.post('/api/surveys', requireLogin, requireCredits, async function(req, res) {

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

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch(err) {
      res.status(422).send(err);
    }

  });
}
