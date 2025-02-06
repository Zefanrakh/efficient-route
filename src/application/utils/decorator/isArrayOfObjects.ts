import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsArrayOfObjects(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isArrayOfObjects',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
          return value.every(
            (item) => typeof item === 'object' && item !== null,
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of objects`;
        },
      },
    });
  };
}
