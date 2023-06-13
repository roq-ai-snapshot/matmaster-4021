import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  attended: yup.boolean().required(),
  class_schedule_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
