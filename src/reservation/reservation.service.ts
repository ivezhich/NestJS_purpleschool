import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { RoomService } from '../room/room.service';

import { ReservationModel, ReservationModelDocument } from './models/reservation.model';
import { CreateReservationDto, UpdateReservationDto } from './dto/resrvation.dto';

export interface ReservationPeriod {
	reserveFrom: Date;
	reserveTo: Date;
}

@Injectable()
export class ReservationService {
	constructor(
		@InjectModel(ReservationModel.name) private readonly reservationModel: Model<ReservationModel>,
		private readonly roomsService: RoomService,
	) {}

	async create(dto: CreateReservationDto): Promise<ReservationModelDocument> {
		const roomId = dto.roomId;

		const room = await this.roomsService.getRoom(roomId);
		if (!room) {
			throw new NotFoundException();
		}
		const reservePeriod: ReservationPeriod = dto;
		const currentRoomReservations = await this.getRoomReservations(room.id, reservePeriod);

		if (currentRoomReservations.length) {
			throw new ConflictException();
		}
		this.reservationModel.find();
		return this.reservationModel.create({
			roomId: room._id,
			reserveFrom: reservePeriod.reserveFrom,
			reserveTo: reservePeriod.reserveTo,
		});
	}

	findForRoom(roomId: string): Promise<ReservationModelDocument[]> {
		return this.getRoomReservations(roomId);
	}

	getById(reservationId: string): Promise<ReservationModelDocument | null> {
		return this.reservationModel.findById(reservationId).exec();
	}

	async update(
		reservationId: string,
		dto: UpdateReservationDto,
	): Promise<ReservationModelDocument | null> {
		const roomId = dto.roomId;

		const room = await this.roomsService.getRoom(roomId);
		if (!room) {
			throw new NotFoundException();
		}
		const reservePeriod: ReservationPeriod = dto;
		const currentRoomReservations = await this.getRoomReservations(room.id, reservePeriod);

		if (currentRoomReservations.length) {
			throw new ConflictException();
		}
		return this.reservationModel.findByIdAndUpdate(reservationId, dto, { new: true }).exec();
	}

	delete(reservationId: string): Promise<ReservationModelDocument | null> {
		return this.reservationModel
			.findByIdAndDelete(reservationId, { returnDocument: 'after' })
			.exec();
	}

	async getRoomReservations(
		roomId: string,
		period?: ReservationPeriod,
	): Promise<ReservationModelDocument[]> {
		const query = this.reservationModel.find({
			roomId: new Types.ObjectId(roomId),
			isCanceled: false,
		});
		if (period) {
			query.where({
				$or: [
					{ reserveFrom: { $gte: period.reserveFrom, $lte: period.reserveTo } },
					{ rreserveTo: { $gte: period.reserveFrom, $lte: period.reserveTo } },
				],
			});
		}

		return query.exec();
	}
}
