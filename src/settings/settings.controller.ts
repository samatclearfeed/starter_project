import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { isStringNumber } from './setting.helper';
import { SettingsDTO } from './settings.dto';
import { SettingsService } from './settings.service';

@Controller('accounts/:accountid/settings')
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Param('accountid') accountid: number) {
    return await this.settingsService
      .getSettings(accountid)
      .then((settings) => {
        return { message: 'settings fetched successfully!', settings };
      });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async postSettings(
    @Param('accountid') accountid: number,
    @Body() settingsDTO: SettingsDTO,
  ) {
    return this.settingsService
      .createSettings(settingsDTO, accountid)
      .then(() => {
        return { message: 'successfully created settings!' };
      });
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async patchSettings(
    @Param('accountid') accountid: number,
    @Param('id') settingid: number,
    @Body() settingsDTO: SettingsDTO,
  ) {
    return await this.settingsService
      .patchSettings(settingsDTO, accountid, settingid)
      .then(() => {
        return { message: 'settings updated successfully!' };
      });
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteSettings(
    @Param('accountid') accountid: number,
    @Param('id') settingid: number,
  ) {
    return await this.settingsService
      .deleteSettings(accountid, settingid)
      .then(() => {
        return { message: 'settings deleted successfully!' };
      });
  }
}
