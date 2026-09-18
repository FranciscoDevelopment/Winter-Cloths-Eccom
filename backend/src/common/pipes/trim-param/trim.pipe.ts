import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class TrimPipe implements PipeTransform {

    transform(value : unknown) {
        
        return typeof value === 'string'
                            ? value.trim()
                            : value

    }

}