import * as yup from 'yup';

export const beltProgressionValidationSchema = yup.object().shape({
  belt_color: yup.string().required(),
  promotion_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
});
