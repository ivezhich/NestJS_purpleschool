import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type RoomModelDocument = HydratedDocument<RoomModel>;

export enum RoomType {
	ECONOM = 'econom',
	COMFORT = 'comfort',
	LUX = 'luxe',
}

@Schema({ timestamps: true })
export class RoomModel extends Document {
	@Prop({ required: true })
	roomNo: number;

	@Prop({ enum: RoomType, default: RoomType.COMFORT })
	type: RoomType;

	@Prop({ required: true })
	description: string;

	@Prop()
	photos: string[];

	@Prop({ required: true })
	price: number;
}

export const RoomModelSchema = SchemaFactory.createForClass(RoomModel);
