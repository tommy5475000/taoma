import { PartialType } from '@nestjs/mapped-types';
import { CreateLv1Dto } from './create-lv1.dto';

export class UpdateLv1Dto extends PartialType(CreateLv1Dto) {}
