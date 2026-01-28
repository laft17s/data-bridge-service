import * as Joi from 'joi';
import { DataFormat } from '../../domain/constants/data-format.enum';
import { TransportType } from '../../domain/constants/transport-type.enum';

export const TransformationSchema = Joi.object({
  uuid: Joi.string().uuid().required(),
  service: Joi.string().required(),
  transport: Joi.string()
    .valid(...Object.values(TransportType))
    .required(),
  from: Joi.string()
    .valid(...Object.values(DataFormat))
    .required(),
  to: Joi.string()
    .valid(...Object.values(DataFormat))
    .required(),
  content: Joi.any().required(),
});
