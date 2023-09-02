const joiErrorMap = {
  'any.required': 400,
  'any.empty': 400,
  'string.min': 422,
  'string.max': 400,
  'number.min': 400,
  'number.max': 400,
  'array.min': 400,
  'array.max': 400,
  'string.email': 400,
  'string.uri': 400,
  'string.pattern.base': 400,
  'any.invalid': 400,
  'object.allowUnknown': 400,
  'number.integer': 400,
  'date.min': 400,
  'date.max': 400,
  'array.includes': 400,
};

const mapJoiErrorToStatus = (joiErrorType) => joiErrorMap[joiErrorType] || 500;

module.exports = mapJoiErrorToStatus;