import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { SuccessIntercepter } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';

@Controller('cats')
@UseInterceptors(SuccessIntercepter)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  getCurrentCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log('결과: ' + param);
    return { cats: 'get all cat api' };
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return 'signup';
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
