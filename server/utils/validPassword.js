function validPassword(userPassword) {
  // 1 digit, 1 lowercase character, 1 uppercase character, 8 characters or more
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(userPassword);
}

module.exports = validPassword;
