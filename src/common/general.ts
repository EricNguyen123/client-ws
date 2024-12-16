export enum RoleEnum {
  User = 'user',
  Admin = 'admin',
  Editor = 'editor',
  Default = 'default',
}

export enum Status {
  Active = 1,
  Inactive = 0,
}

export const StatusEnum = {
  "1" : "active",
  "0" : "inactive",
}

export enum Sort {
  ASC = "asc",
  DESC = "desc",
}

export enum ErrorNumber {
  ErrorCode = 400,
  Success = 200,
  Information = 201,
  Warning = 300,
  Unauthorized = 401,
  Expired = 402,
  Forbidden = 403,
  NotFound = 404,
  InvalidValue = 405,
  ServerError = 500,
}
