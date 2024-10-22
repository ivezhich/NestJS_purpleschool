import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomModel, RoomModelSchema } from './models/room.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: RoomModel.name,
				schema: RoomModelSchema,
			},
		]),
	],
	controllers: [RoomController],
	providers: [RoomService],
	exports: [RoomService],
})
export class RoomModule {}
