import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { CalendarModule } from './calendar/calendar.module';
import { RoomService } from './room/room.service';

@Module({
	imports: [RoomModule, CalendarModule],
	controllers: [AppController],
	providers: [AppService, RoomService],
})
export class AppModule {}
