import { ArgumentMetadata, Injectable, ParseArrayPipe, ParseIntPipe, PipeTransform } from '@nestjs/common';
import BadParamInRequest from 'src/utils/BadParamInRequest';

@Injectable()
export class IdValidationPipe extends ParseIntPipe {

  constructor() {
    super( {exceptionFactory: BadParamInRequest})
  }

}
