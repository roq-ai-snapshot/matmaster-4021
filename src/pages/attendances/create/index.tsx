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
import { createAttendance } from 'apiSdk/attendances';
import { Error } from 'components/error';
import { attendanceValidationSchema } from 'validationSchema/attendances';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ClassScheduleInterface } from 'interfaces/class-schedule';
import { UserInterface } from 'interfaces/user';
import { getClassSchedules } from 'apiSdk/class-schedules';
import { getUsers } from 'apiSdk/users';
import { AttendanceInterface } from 'interfaces/attendance';

function AttendanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AttendanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAttendance(values);
      resetForm();
      router.push('/attendances');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AttendanceInterface>({
    initialValues: {
      attended: false,
      class_schedule_id: (router.query.class_schedule_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: attendanceValidationSchema,
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
            Create Attendance
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="attended" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.attended}>
            <FormLabel htmlFor="switch-attended">Attended</FormLabel>
            <Switch
              id="switch-attended"
              name="attended"
              onChange={formik.handleChange}
              value={formik.values?.attended ? 1 : 0}
            />
            {formik.errors?.attended && <FormErrorMessage>{formik.errors?.attended}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ClassScheduleInterface>
            formik={formik}
            name={'class_schedule_id'}
            label={'Select Class Schedule'}
            placeholder={'Select Class Schedule'}
            fetcher={getClassSchedules}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.start_time}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'attendance',
  operation: AccessOperationEnum.CREATE,
})(AttendanceCreatePage);
