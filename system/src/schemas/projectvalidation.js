import * as Yup from 'yup';

export const projectValidation = Yup.object().shape({
  projectName: Yup.string().required('Project name is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.date().required('Start date is required').min(new Date(), 'Start date must be today or later'),
  endDate: Yup.date().required('End date is required').min(Yup.ref('startDate'), 'End date must be after start date'),
  budget: Yup.number().required('Budget is required').min(0, 'Budget must be a positive number'),
  status: Yup.string().required('Status is required'),
});

