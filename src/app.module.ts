import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [HelloModule, PeopleModule],
})
export class AppModule {}
