import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createClassSchedule } from 'apiSdk/class-schedules';
import { Error } from 'components/error';
import { classScheduleValidationSchema } from 'validationSchema/class-schedules';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { DojoInterface } from 'interfaces/dojo';
import { getDojos } from 'apiSdk/dojos';
import { ClassScheduleInterface } from 'interfaces/class-schedule';

function ClassScheduleCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ClassScheduleInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createClassSchedule(values);
      resetForm();
      router.push('/class-schedules');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ClassScheduleInterface>({
    initialValues: {
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      dojo_id: (router.query.dojo_id as string) ?? null,
    },
    validationSchema: classScheduleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Class Schedule
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="start_time" mb="4">
            <FormLabel>Start Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
                onChange={(value: Date) => formik.setFieldValue('start_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel>End Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
                onChange={(value: Date) => formik.setFieldValue('end_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<DojoInterface>
            formik={formik}
            name={'dojo_id'}
            label={'Select Dojo'}
            placeholder={'Select Dojo'}
            fetcher={getDojos}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'class_schedule',
  operation: AccessOperationEnum.CREATE,
})(ClassScheduleCreatePage);
