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

  async createAccounts(accountsDTO: AccountsDTO): Promise<Account> {
    // return: account promise after creation of the account.
    return this.accountModel.create(accountsDTO).catch((error) => {
      // customError: for mentioning what went wrong.
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Account already exists');
      }
      throw error;
    });
  }
}
