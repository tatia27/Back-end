export const HTTP_CODES = {
  NOT_FOUND: 404,
  NOT_AUTHORIZED: 401,
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  ACCESS_DENIED: 403,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const ERRORS = {
  USER_NOT_FOUND: {
    CODE: HTTP_CODES.NOT_FOUND,
    TITLE: "User not found",
  },
  NOT_AUTHORIZED: {
    CODE: HTTP_CODES.NOT_AUTHORIZED,
    TITLE: "Unauthorized",
  },
  COMPANY_NOT_FOUND: {
    CODE: HTTP_CODES.NOT_FOUND,
    TITLE: "Company not found",
  },
  INTERN_NOT_FOUND: {
    CODE: HTTP_CODES.NOT_FOUND,
    TITLE: "Intern not found",
  },
  INTERNSHIP_NOT_FOUND: {
    CODE: HTTP_CODES.NOT_FOUND,
    TITLE: "Internship not found",
  },
  BAD_REQUEST: {
    CODE: HTTP_CODES.BAD_REQUEST,
    TITLE: "Invalid request",
  },
  ACCESS_DENIED: {
    CODE: HTTP_CODES.ACCESS_DENIED,
    TITLE: "Not allowed to access",
  },
  CONFLICT: {
    CODE: HTTP_CODES.CONFLICT,
    TITLE: "Email already registered",
  },
  WRONG_DATA: {
    CODE: HTTP_CODES.NOT_AUTHORIZED,
    TITLE: "Email already registered",
  },
  SERVER_ERROR: {
    CODE: HTTP_CODES.SERVER_ERROR,
    TITLE: "Internal Server Error",
  },
};
