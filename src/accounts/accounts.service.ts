import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountsDTO } from './accounts.dto';
import { Account } from './accounts.model';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}

  async createAccounts(accountsDTO: AccountsDTO) {
    const account = new Account();
    account.name = accountsDTO.name;

    return account.save().catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('User already exists');
      }
      throw error;
    });
  }
}
