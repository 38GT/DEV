import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
}
