const joiErrorMap = {
  'any.required': 400,
  'any.empty': 400,
  'number.min': 422,
  'array.min': 400,
  'any.invalid': 400,
  'number.integer': 422,
  'string.min': 422,
};

const joiErrorStatus = (joiErrorType) => joiErrorMap[joiErrorType] || 500;

module.exports = joiErrorStatus