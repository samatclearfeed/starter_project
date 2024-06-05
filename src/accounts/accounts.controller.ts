import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AccountsDTO } from './accounts.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async postAccounts(@Body() accountsDTO: AccountsDTO) {
    await this.accountsService.createAccounts(accountsDTO);

    return {
      message: 'successfully created accounts!',
    };
  }
}
