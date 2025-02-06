import { HttpException, HttpStatus } from '@nestjs/common';

export const handleError = (e) => {
  if (e instanceof HttpException) {
    throw e;
  } else {
    throw new HttpException(
      'Unexpected error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
