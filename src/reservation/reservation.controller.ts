import {
	Controller,
	Param,
	Body,
	Get,
	Post,
	Patch,
	Delete,
	NotFoundException,
} from '@nestjs/common';

import { ReservationService } from './reservation.service';
import { CreateReservationDto, UpdateReservationDto } from './dto/resrvation.dto';

@Controller('reservations')
export class ReservationController {
	constructor(private readonly ReservationService: ReservationService) {}

	@Post()
	create(@Body() createReservationDto: CreateReservationDto) {
		return this.ReservationService.create(createReservationDto);
	}

	@Get('room/:roomId')
	async findForRoom(@Param('roomId') roomId: string) {
		return this.ReservationService.findForRoom(roomId);
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		const result = await this.ReservationService.getById(id);
		if (!result) {
			throw new NotFoundException();
		}

		return result;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
		const result = await this.ReservationService.update(id, dto);
		if (!result) {
			throw new NotFoundException();
		}

		return result;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const result = await this.ReservationService.delete(id);
		if (!result) {
			throw new NotFoundException();
		}

		return result;
	}
}
