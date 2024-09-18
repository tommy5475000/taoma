import { PartialType } from '@nestjs/mapped-types';
import { CreateLv2Dto } from './create-lv2.dto';

export class UpdateLv2Dto extends PartialType(CreateLv2Dto) {}
