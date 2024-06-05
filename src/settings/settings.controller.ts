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
import { settingsDto } from './settings.dto';
import { SettingsService } from './settings.service';

@Controller('accounts/:accountId/settings')
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Param('accountId') accountId: number) {
    const settings = await this.settingsService.getSettings(accountId);

    return { message: 'settings fetched successfully!', settings };
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async postSettings(
    @Param('accountId') accountId: number,
    @Body() settingsDTO: settingsDto,
  ) {
    await this.settingsService.createSettings(settingsDTO, accountId);

    return { message: 'successfully created settings!' };
  }

  @Patch(':settingId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async patchSettings(
    @Param('accountId') accountId: number,
    @Param('settingId') settingId: number,
    @Body() settingsDTO: settingsDto,
  ) {
    await this.settingsService.patchSettings(settingsDTO, accountId, settingId);

    return { message: 'settings updated successfully!' };
  }

  @Delete(':settingId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteSettings(
    @Param('accountId') accountId: number,
    @Param('settingId') settingId: number,
  ) {
    await this.settingsService.deleteSettings(accountId, settingId);

    return { message: 'settings deleted successfully!' };
  }
}
