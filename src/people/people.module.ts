import { Logger, Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, Logger],
})
export class PeopleModule {}
