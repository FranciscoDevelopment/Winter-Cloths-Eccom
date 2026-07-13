import { BadRequestException } from "@nestjs/common";

export default function BadParamInRequest () {

    return new BadRequestException('Invalid id')

}