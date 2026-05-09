# Client (face)

Клиент находится в папке `face/`. Сделано с помощью NextJS, GraphQL, SCSS.

Так как по умолчанию на компьютере работает Node.js v18, то нужно в каждом новом Терминале переключиться на версию 24:

```bash
nvm use 24
```

Адреса страниц находятся в переменной pageUrls в файле face/сonsts/pageUrls.ts. Не нужно писать адрес обычной строкой.

В основном взаимодействие с сервером идёт через GraphQL. Поэтому после изменения маршрутов на сервере нужно удалить, обновить или добавить новые файлы .graphql в папке `face/graphql`, затем сгенерировать функции взаимодействия с сервером командой
```npm run codegen```

Try to avoid putting business logic into component. Use 'fn' folder for business logic. For example: `Button/fn/useFetchData`, `Button/fn/useValidateForm`.

Prefer ordinary functions rather than arrow functions. Use arrow functions only if this way gives better readability or scoping.

Put reusable UI elements in the 'face/ui' directory.

Данные пользователя можно взять из `face/stores/userStore.ts`.

Чтобы показать уведомление нужно подключить
```import { NotificationContext } from '@/ui/Notification/context'```
Затем получить функцию
```const { notify } = useContext(NotificationContext)```
и вызвать её
```notify({
    type: 'error',
    message:
        'Не удалось удалить книгу. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
})```