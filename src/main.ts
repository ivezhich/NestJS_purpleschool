import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getMongoConfig } from './config/mongo.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	await app.listen(3000);
	console.log(getMongoConfig);
}
bootstrap();
