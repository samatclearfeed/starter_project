import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isStringNumber } from './setting.helper';
import { data_type, SettingsDTO } from './settings.dto';
import { Settings } from './settings.model';

@Injectable()
export class SettingsService {
  async getSettings(accountID: number) {
    const settings = await Settings.findAll({
      where: { account_id: accountID },
    }).catch((error) => {
      throw error;
    });

    return settings;
  }

  async createSettings(settingsDTO: SettingsDTO, accountID: number) {
    switch (settingsDTO.data_type) {
      case data_type.number:
        if (!isStringNumber(settingsDTO.value)) {
          throw new BadRequestException('invalid type of value!');
        }
        break;
      case data_type.boolean:
        if (settingsDTO.value !== 'true' && settingsDTO.value !== 'false') {
          throw new BadRequestException('invalid type of value!');
        }
    }

    const settings = new Settings();
    settings.name = settingsDTO.name;
    settings.value = settingsDTO.value;
    settings.account_id = accountID;
    settings.data_type = settingsDTO.data_type;

    return settings.save().catch((error) => {
      throw error;
    });
  }

  async patchSettings(
    settingsDTO: SettingsDTO,
    accountID: number,
    settingsID: number,
  ) {
    switch (settingsDTO.data_type) {
      case 'number':
        if (!isStringNumber(settingsDTO.value)) {
          throw new BadRequestException('invalid data!');
        }
      case 'boolean':
        if (settingsDTO.value !== 'true' && settingsDTO.value !== 'false') {
          throw new BadRequestException('invalid data!');
        }
    }

    const settings = await Settings.findOne({
      where: { id: settingsID, account_id: accountID },
    });
    try {
      settings.value = settingsDTO.value;
    } catch {
      throw new NotFoundException('setting not found!');
    }

    return settings.save().catch((error) => {
      throw error;
    });
  }

  async deleteSettings(accountID: number, settingsID: number) {
    return Settings.destroy({
      where: { id: settingsID, account_id: accountID },
    })
      .then((itemsDeleted) => {
        if (itemsDeleted == 0) {
          throw new NotFoundException('setting not found!');
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
