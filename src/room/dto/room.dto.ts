import { RoomType } from '../models/room.model';

export class RoomCreateDto {
	roomNo: number;
	type: RoomType;
	description: string;
	photos: string[];
	price: number;
}
export class RoomUpdateDto {
	roomNo: number;
	type: RoomType;
	description: string;
	photos: string[];
	price: number;
}
