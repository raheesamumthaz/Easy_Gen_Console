
import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateException extends HttpException {
  constructor(message: string) {
    super({ message }, HttpStatus.CONFLICT);
  }
}


export class CustomException extends HttpException {
    constructor(message: string,errorCode=0) {
      let code=HttpStatus.BAD_REQUEST
      if (errorCode!=0)
        code=errorCode
      super({ message }, code);
    }
  
   
  }