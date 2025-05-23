import { BadRequestException, Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }

        const object = plainToInstance(metatype, value)
        const errors = await validate(object)

        if (errors.length > 0) {
            console.log(errors);
            throw new BadRequestException(`Validation failed!`)
        }

        return value
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}

