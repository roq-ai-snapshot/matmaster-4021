import * as yup from 'yup';
import { classScheduleValidationSchema } from 'validationSchema/class-schedules';
import { membershipPlanValidationSchema } from 'validationSchema/membership-plans';
import { techniqueValidationSchema } from 'validationSchema/techniques';

export const dojoValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  class_schedule: yup.array().of(classScheduleValidationSchema),
  membership_plan: yup.array().of(membershipPlanValidationSchema),
  technique: yup.array().of(techniqueValidationSchema),
});
