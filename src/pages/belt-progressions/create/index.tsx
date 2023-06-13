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
import { createBeltProgression } from 'apiSdk/belt-progressions';
import { Error } from 'components/error';
import { beltProgressionValidationSchema } from 'validationSchema/belt-progressions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { BeltProgressionInterface } from 'interfaces/belt-progression';

function BeltProgressionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BeltProgressionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBeltProgression(values);
      resetForm();
      router.push('/belt-progressions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BeltProgressionInterface>({
    initialValues: {
      belt_color: '',
      promotion_date: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: beltProgressionValidationSchema,
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
            Create Belt Progression
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="belt_color" mb="4" isInvalid={!!formik.errors?.belt_color}>
            <FormLabel>Belt Color</FormLabel>
            <Input type="text" name="belt_color" value={formik.values?.belt_color} onChange={formik.handleChange} />
            {formik.errors.belt_color && <FormErrorMessage>{formik.errors?.belt_color}</FormErrorMessage>}
          </FormControl>
          <FormControl id="promotion_date" mb="4">
            <FormLabel>Promotion Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.promotion_date ? new Date(formik.values?.promotion_date) : null}
                onChange={(value: Date) => formik.setFieldValue('promotion_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
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
  entity: 'belt_progression',
  operation: AccessOperationEnum.CREATE,
})(BeltProgressionCreatePage);
