import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomModule } from '../room/room.module';

import { ReservationController } from './reservation.controller';
import { ReservationModel, ReservationModelSchema } from './models/reservation.model';
import { ReservationService } from './reservation.service';

@Module({
	imports: [
		RoomModule,
		MongooseModule.forFeature([
			{
				name: ReservationModel.name,
				schema: ReservationModelSchema,
			},
		]),
	],
	controllers: [ReservationController],
	providers: [ReservationService],
})
export class ReservationModule {}
