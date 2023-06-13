import * as yup from 'yup';

export const membershipPlanValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  duration: yup.number().integer().required(),
  dojo_id: yup.string().nullable().required(),
});
