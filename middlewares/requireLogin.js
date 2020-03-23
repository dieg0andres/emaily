module.exports = function(req, res, next) { // next is a function we call when our function is done running, and it ran well without any issues.
  if(!req.user) {
    return res.status(401).send({error: 'You must log in!'}); // this terminates the request
  }

  next();
}

// wire up to routes we need to apply this middleware
