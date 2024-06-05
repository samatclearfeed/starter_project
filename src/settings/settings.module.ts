import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/accounts/accounts.model';
import { AccountsService } from 'src/accounts/accounts.service';
import { SettingsController } from './settings.controller';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';

@Module({
  imports: [SequelizeModule.forFeature([Settings, Account])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
