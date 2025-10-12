import Joi from "joi";

export const signUpSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username cannot be empty.",
    "string.min": "Username should have at least 3 characters.",
    "any.required": "Username is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters.",
    "any.required": "Password is required.",
  }),
});

export const createPostSchema = Joi.object({
  content: Joi.string().min(1).max(2000).required().messages({
    "string.base": "Content must be a string.",
    "string.empty": "Content cannot be empty.",
    "string.min": "Content must have at least 1 character.",
    "string.max": "Content cannot exceed 2000 characters.",
    "any.required": "Content is required.",
  }),

  images: Joi.array().items(Joi.string().uri()).max(10).optional().messages({
    "array.max": "Cannot upload more than 10 images.",
    "string.uri": "Image must be a valid URL.",
  }),

  community: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      "string.pattern.base": "Community must be a valid ObjectId.",
    }),

  tags: Joi.array()
    .items(Joi.string().min(1).max(30).trim())
    .max(10)
    .optional()
    .messages({
      "array.max": "Cannot have more than 10 tags.",
      "string.min": "Tag must have at least 1 character.",
      "string.max": "Tag cannot exceed 30 characters.",
    }),
});

export const updatePostSchema = Joi.object({
  content: Joi.string().min(1).max(2000).optional().messages({
    "string.base": "Content must be a string.",
    "string.empty": "Content cannot be empty.",
    "string.min": "Content must have at least 1 character.",
    "string.max": "Content cannot exceed 2000 characters.",
  }),

  tags: Joi.array()
    .items(Joi.string().min(1).max(30).trim())
    .max(10)
    .optional()
    .messages({
      "array.max": "Cannot have more than 10 tags.",
      "string.min": "Tag must have at least 1 character.",
      "string.max": "Tag cannot exceed 30 characters.",
    }),
});

export const sharePostSchema = Joi.object({
  platform: Joi.string()
    .valid("internal", "facebook", "twitter", "linkedin", "whatsapp")
    .default("internal")
    .messages({
      "any.only":
        "Platform must be one of: internal, facebook, twitter, linkedin, whatsapp.",
    }),
});
