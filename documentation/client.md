# Client (face)

Клиент находится в папке `face/`. Сделано с помощью NextJS, GraphQL, SCSS.

Адреса страниц находятся в переменной pageUrls в файле face/shared/utils/pageUrls.ts. Не нужно писать адрес обычной строкой.

В основном взаимодействие с сервером идёт через REST. OpenAPI-спека автоматически генерируется сервером из декораторов. Клиентские React Query-хуки и TypeScript-типы генерируются из спеки через Orval. После изменения маршрутов на сервере нужно перезапустить сервер и выполнить команду в папке `face/`:
```npm run orval```

Подробнее: `documentation/topics/openapiCodegen.md`

Try to avoid putting business logic into component. Use 'fn' folder for business logic. For example: `Button/fn/useFetchData`, `Button/fn/useValidateForm`.

Prefer ordinary functions rather than arrow functions. Use arrow functions only if this way gives better readability or scoping.

Все стили задаются в SCSS-классах, а не через inline-атрибут `style` в JSX.

Классы, которые компонент указывает в разметке, описываются в его собственном SCSS-файле рядом с компонентом
(`Button/Button.tsx` → `Button/Button.scss`), и компонент импортирует этот файл. Имена классов — по BEM от имени
компонента (`.ai-dialogue-last-message`, `.ai-dialogue-last-message__text`). Нельзя:

- указывать классы, которые нигде не описаны: если стилей нет, класс не нужен;
- использовать классы, описанные в файле другого компонента, в том числе родительского;
- стилизовать из своего SCSS классы или теги дочернего компонента. Родитель задаёт расположение ребёнка через
  свою обёртку (`.ai-dialogue-card__scene`), а не через классы ребёнка.

Put reusable UI elements in the 'face/ui' directory.

Тексты ошибок сервера на языках интерфейса лежат в `face/messages/{locale}/serverErrors.json` (ключ — код ошибки). Новый код добавляется во все файлы локалей. Подробнее: `documentation/topics/internationalization.md`.

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
