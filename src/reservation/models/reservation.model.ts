import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';

export type ReservationModelDocument = HydratedDocument<ReservationModel>;

@Schema({ timestamps: true })
export class ReservationModel extends Document {
	@Prop({ type: Types.ObjectId, ref: 'RoomModel', required: true })
	roomId: string;

	@Prop({ required: true })
	reserveFrom: Date;

	@Prop({ required: true })
	reserveTo: Date;
}

export const ReservationModelSchema = SchemaFactory.createForClass(ReservationModel);
