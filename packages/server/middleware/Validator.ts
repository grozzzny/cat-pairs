import { Joi, celebrate } from 'celebrate';

export const userNameValidator = celebrate({
  body: Joi.object().keys({
    userName: Joi.string().required().min(2).max(50),
  }),
});

export const topicValidator = celebrate({
  body: Joi.object().keys({
    topicName: Joi.string().required().min(2).max(100),
    description: Joi.string().required().min(2).max(300),
    userId: Joi.number().required(),
  }),
});

export const commentValidator = celebrate({
  body: Joi.object().keys({
    topicId: Joi.number().required(),
    text: Joi.string().required().min(2).max(500),
    userId: Joi.number().required(),
  }),
});

export const replyValidator = celebrate({
  body: Joi.object().keys({
    commentId: Joi.number().required(),
    text: Joi.string().required().min(2).max(500),
    userId: Joi.number().required(),
  }),
});

export const themeValidator = celebrate({
  body: Joi.object().keys({
    theme: Joi.string().required().min(2).max(255),
    description: Joi.string().required().min(2).max(1000),
  }),
});
