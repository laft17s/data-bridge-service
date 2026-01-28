import { Field, ObjectType, InputType, registerEnumType } from '@nestjs/graphql';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import { TransportType } from '../../../domain/constants/transport-type.enum';
import { GraphQLJSON } from 'graphql-type-json';

registerEnumType(DataFormat, {
  name: 'DataFormat',
});

registerEnumType(TransportType, {
  name: 'TransportType',
});

@ObjectType()
export class TransformationResponse {
  @Field()
  success: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  data?: any;

  @Field({ nullable: true })
  error?: string;
}
