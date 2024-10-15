import { Injectable } from '@nestjs/common';
import { RoomModel } from './room.model';
@Injectable()
export class RoomService {
	async createRoom(dto: Omit<RoomModel, '_id'>) {
		console.log('createRoom' + dto);
		return;
	}

	async getRoom(id: string) {
		console.log('getRoom' + id);
		return;
	}

	async updateRoom(dto: RoomModel) {
		console.log('updateRoom' + dto);
		return;
	}
}
