export default {
  translation: {
    login: {
      header: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация'
    },
    signup: {
      signupHeader: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signup: 'Зарегистрироваться'
    },

    chat: {
      channels: 'Каналы',
      messages_zero: '{{count}} сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      messageInput: 'Введите сообщение...',
      newMessageLabel: 'Новое сообщение',
      manageChannelLabel: 'Управление каналом',
      dropdownDelete: 'Удалить',
      dropdownEdit: 'Переименовать',
    },
    notFound: {
      header: 'Страница не найдена',
      goto: 'Но вы можете перейти на ',
      mainPage: 'главную страницу',
    },
    modals: {
      add: {
        formLabel: 'Имя канала',
        title: 'Добавить канал',
        submit: 'Добавить',
        cancel: 'Отменить'
      },
      edit: {
        formLabel: 'Имя канала',
        title: 'Переименовать канал',
        submit: 'Сохранить',
        cancel: 'Отменить'
      },
      delete: {
        title: 'Удалить канал',
        confirm: 'Уверены?',
        submit: 'Удалить',
        cancel: 'Отменить'
      }
    },
    errors: {
      required: 'Обязательное поле',
      login: 'Неверные имя пользователя или пароль',
      unique: 'Должно быть уникальным',
      length: 'От 3 до 20 символов',
      passwordMatch: 'Пароли должны совпадать',
      passwordLength: 'Не менее 6 символов',
      usernameTaken: 'Такой пользователь уже существует',
      networkError: 'Ошибка соединения',
      minLength: 'Не менее 3 символов',
      maxLength: 'Не более 20 символов',
    },
    notifications: {
      channelCreated: 'Канал создан',
      connection: 'Ошибка соединения',
      channelDeleted: 'Канал удален',
      channelRenamed: 'Канал переименован',
    },
    logOutBtn: "Выйти",
  }
};