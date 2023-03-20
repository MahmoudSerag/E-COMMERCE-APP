export const apiHeader = {
  name: 'x-authorization',
  description: 'JWT',
  required: true,
};

export const apiUnauthorizedResponse = {
  status: 401,
  description: 'User not loggedIn.',
  schema: {
    example: {
      success: false,
      statusCode: 401,
      message: 'Unauthorized.',
    },
  },
};

export const apiBadRequestResponse = {
  status: 403,
  description: 'Bad request.',
  schema: {
    example: {
      success: false,
      statusCode: 403,
      message: 'Bad request.',
    },
  },
};

export const apiNotFoundResponse = {
  status: 404,
  description: 'User not found.',
  schema: {
    example: {
      success: false,
      statusCode: 404,
      message: 'Not found.',
    },
  },
};

export const apiForbiddenResponse = {
  status: 403,
  description: 'User not allowed to see this content.',
  schema: {
    example: {
      success: false,
      statusCode: 403,
      message: 'Forbidden.',
    },
  },
};

export const apiInternalServerErrorResponse = {
  status: 500,
  description: 'Server error.',
  schema: {
    example: {
      success: false,
      statusCode: 500,
      message: 'Server error.',
    },
  },
};
