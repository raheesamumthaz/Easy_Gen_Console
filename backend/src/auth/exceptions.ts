
import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateException extends HttpException {
  constructor(message: string) {
    super({ message }, HttpStatus.CONFLICT);
  }
}


export class CustomException extends HttpException {
    constructor(message: string) {
      super({ message }, HttpStatus.BAD_REQUEST);
    }
  }