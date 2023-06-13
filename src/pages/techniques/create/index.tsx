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
import { createTechnique } from 'apiSdk/techniques';
import { Error } from 'components/error';
import { techniqueValidationSchema } from 'validationSchema/techniques';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { DojoInterface } from 'interfaces/dojo';
import { getDojos } from 'apiSdk/dojos';
import { TechniqueInterface } from 'interfaces/technique';

function TechniqueCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TechniqueInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTechnique(values);
      resetForm();
      router.push('/techniques');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TechniqueInterface>({
    initialValues: {
      name: '',
      description: '',
      video_url: '',
      dojo_id: (router.query.dojo_id as string) ?? null,
    },
    validationSchema: techniqueValidationSchema,
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
            Create Technique
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <FormControl id="video_url" mb="4" isInvalid={!!formik.errors?.video_url}>
            <FormLabel>Video Url</FormLabel>
            <Input type="text" name="video_url" value={formik.values?.video_url} onChange={formik.handleChange} />
            {formik.errors.video_url && <FormErrorMessage>{formik.errors?.video_url}</FormErrorMessage>}
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
  entity: 'technique',
  operation: AccessOperationEnum.CREATE,
})(TechniqueCreatePage);
