export class CreateReservationDto {
	roomId: string;
	reserveFrom: Date;
	reserveTo: Date;
}

export class UpdateReservationDto {
	roomId: string;
	reserveFrom: Date;
	reserveTo: Date;
}
