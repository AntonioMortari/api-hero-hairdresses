import { Joi, Segments, celebrate } from 'celebrate';

const indexValidation = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        date: Joi.date().iso().optional()
    })
}, {abortEarly: false});

const storeValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        date: Joi.date().iso().required()
    })
}, {abortEarly: false});

const editValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        date: Joi.date().iso().required()
    }),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    })
}, {abortEarly: false});

const destroyValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().uuid()
    })
}, {abortEarly: false});

export { indexValidation, storeValidation, editValidation, destroyValidation };