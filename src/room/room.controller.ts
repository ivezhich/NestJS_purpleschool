import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
//import { RoomModel } from './models/room.model';
import { RoomCreateDto, RoomUpdateDto } from './dto/room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
	constructor(private readonly roomsService: RoomService) {
		return;
	}
	@Post('create')
	async create(@Body() dto: RoomCreateDto) {
		//create room using dto
		return this.roomsService.createRoom(dto);
	}
	@Get('')
	async getAll() {
		//DBRead room by id
		return this.roomsService.getAll();
	}
	@Get(':id')
	async get(@Param('id') id: string) {
		//DBRead room by id
		return this.roomsService.getRoom(id);
	}
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: RoomUpdateDto) {
		return this.roomsService.updateRoom(id, dto);
	}
}
