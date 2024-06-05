import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
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
  async accounts(@Body() accountsDTO: AccountsDTO) {
    console.log(accountsDTO);

    this.accountsService.createAccounts(accountsDTO);

    return {
      message: 'successfully created accounts!',
    };
  }
}
