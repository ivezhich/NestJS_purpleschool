import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomModel } from './room.model';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
	constructor(private readonly roomsService: RoomService) {
		return;
	}
	@Post('create')
	async create(@Body() dto: Omit<RoomModel, '_id'>) {
		//create room using dto
		return this.roomsService.createRoom(dto);
	}
	@Get(':id')
	async get(@Param('id') id: string) {
		//DBRead room by id
		return this.roomsService.getRoom(id);
	}
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: RoomModel) {
		if (dto._id == id) {
			return this.roomsService.updateRoom(dto);
		}
		return;
	}
}
