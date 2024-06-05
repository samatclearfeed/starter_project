import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './accounts/accounts.model';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '_',
      database: 'starterApp',
      models: [Account],
      autoLoadModels: true,
      synchronize: true,
    }),
    AccountsModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
