import {Joi, Segments, celebrate} from 'celebrate';

const storeValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3)   
    })
}, {abortEarly: false});

const editValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required().min(3),
        old_password: Joi.string().required().min(3),
        password_confirmation: Joi.string().when('password', {
            is: Joi.exist(),
            then: Joi.string().required().valid(Joi.ref('password')),
            otherwise: Joi.forbidden()
        })
    }),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    })
}, {abortEarly: false});

const authValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3)
    })
}, {abortEarly: false});

export { storeValidation, editValidation, authValidation};