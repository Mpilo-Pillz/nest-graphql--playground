import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
