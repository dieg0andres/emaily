import _ from 'lodash';
// re=regular expression
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (emails) => {
  var invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => !re.test(email))



  const lastEmail = invalidEmails[invalidEmails.length-1];

  if(lastEmail === '') {
    invalidEmails.pop()
  }

  if(invalidEmails.length) {    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};

// returning true inside filter function keeps the values
// false gets rid of the value
