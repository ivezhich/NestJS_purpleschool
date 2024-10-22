import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomModel, RoomModelDocument } from './models/room.model';
import { RoomCreateDto, RoomUpdateDto } from './dto/room.dto';

@Injectable()
export class RoomService {
	constructor(@InjectModel(RoomModel.name) private roomModel: Model<RoomModelDocument>) {}

	async createRoom(dto: RoomCreateDto): Promise<RoomModelDocument> {
		return this.roomModel.create(dto);
	}

	async getRoom(id: string): Promise<RoomModelDocument | null> {
		return this.roomModel.findById(id).exec();
	}

	async getAll(): Promise<RoomModelDocument[]> {
		return this.roomModel.find().exec();
	}

	async updateRoom(id: string, dto: RoomUpdateDto): Promise<RoomModelDocument | null> {
		return this.roomModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async deleteRoom(id: string): Promise<RoomModelDocument | null> {
		return this.roomModel.findByIdAndDelete(id).exec();
	}
}
