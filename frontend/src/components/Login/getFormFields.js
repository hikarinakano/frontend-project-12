const getFormFields = (t) => [
  {
    name: 'username',
    type: 'text',
    label: t('login.username'),
    autoComplete: 'username',
  },
  {
    name: 'password',
    type: 'password',
    label: t('login.password'),
    autoComplete: 'current-password',
  },
];


export default getFormFields;
