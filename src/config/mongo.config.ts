import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
	return {
		uri: getMongoString(configService),
		user: configService.get('MONGO_LOGIN'),
		pass: configService.get('MONGO_PASS'),
		dbName: configService.get('MONGO_DB'),
	};
};

export const getMongoString = (configService: ConfigService) => {
	return 'mongodb://' + configService.get('MONGO_HOST') + ':' + configService.get('MONGO_PORT');
};
