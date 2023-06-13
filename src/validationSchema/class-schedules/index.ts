import * as yup from 'yup';
import { attendanceValidationSchema } from 'validationSchema/attendances';

export const classScheduleValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  dojo_id: yup.string().nullable().required(),
  attendance: yup.array().of(attendanceValidationSchema),
});
