const passwordRegex = /^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.#!]).{8,16})$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  'password': passwordRegex,
  'email': emailRegex
};
