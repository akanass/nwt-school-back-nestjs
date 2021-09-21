import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';

@Module({
  controllers: [PeopleController]
})
export class PeopleModule {}
