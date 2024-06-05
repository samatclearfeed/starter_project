import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from 'src/accounts/accounts.model';
import { isStringNumber } from './setting.helper';
import { dataType, settingsDto } from './settings.dto';
import { Settings } from './settings.model';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings)
    private settingsModel: typeof Settings,

    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}

  async getSettings(accountID: number) {
    // check: is account present?
    const account = await this.accountModel.findOne({
      where: { id: accountID },
    });
    if (!account) {
      throw new NotFoundException('account not found!');
    }

    // return: get settings for that account.
    return this.settingsModel.findAll({
      where: { account_id: accountID },
    });
  }

  async createSettings(settingsDTO: settingsDto, accountID: number) {
    // check: is account present?
    const account = await this.accountModel.findOne({
      where: { id: accountID },
    });
    if (!account) {
      throw new NotFoundException('account not found!');
    }

    // validation: settings `value` with `data_type`.
    switch (settingsDTO.data_type) {
      case dataType.number:
        if (!isStringNumber(settingsDTO.value)) {
          throw new BadRequestException('invalid type of value!');
        }
        break;
      case dataType.boolean:
        if (settingsDTO.value !== 'true' && settingsDTO.value !== 'false') {
          throw new BadRequestException('invalid type of value!');
        }
    }

    // return: settings promise after creation of the settings.
    return this.settingsModel.create({
      ...settingsDTO,
      account_id: accountID,
    });
  }

  async patchSettings(
    settingsDTO: settingsDto,
    accountID: number,
    settingsID: number,
  ) {
    // check: is settings present?
    const settings = await this.settingsModel.findOne({
      where: { id: settingsID, account_id: accountID },
    });
    if (!settings) {
      throw new NotFoundException('setting not found!');
    }

    // validation: settings `value` with `data_type`.
    switch (settingsDTO.data_type) {
      case dataType.number:
        if (!isStringNumber(settingsDTO.value)) {
          throw new BadRequestException('invalid type of value!');
        }
        break;
      case dataType.boolean:
        if (settingsDTO.value !== 'true' && settingsDTO.value !== 'false') {
          throw new BadRequestException('invalid type of value!');
        }
    }

    // return: settings promise after updation of the settings.
    return this.settingsModel.update(settingsDTO, {
      where: { id: settingsID, account_id: accountID },
    });
  }

  async deleteSettings(accountID: number, settingsID: number) {
    // settingsDeleted: stores the number of items deleted.
    const settingsDeleted = await this.settingsModel.destroy({
      where: { id: settingsID, account_id: accountID },
    });

    // check: is the settings deleted?
    if (settingsDeleted == 0) {
      throw new NotFoundException('setting not found!');
    }

    // return: empty returning inorder to end the function after successful deletion.
    return;
  }
}
