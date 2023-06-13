import * as yup from 'yup';

export const techniqueValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  video_url: yup.string(),
  dojo_id: yup.string().nullable().required(),
});
