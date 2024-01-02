# Коллекционер

> Интерактивное веб-приложение для отображения и фильтрации коллекции фотографий с использованием API

### [Open Demo](https://photo-collection-joyks7ihe-monstrikwho.vercel.app)

### Tech stack:

- React
- Typescript
- Next
- MUI

### Реализовано:

- [x] Аунтификация пользователя
- [x] Страницы отображения коллекции фотографий и избранных фотографий пользователя
- [x] Фильтрация фотографий по категориям
- [x] Сортировка фотографии по популярности, дате добавления
- [x] Постраничная навигация
- [x] Двойной тап для лайка фото

> Для получения фотографий использовалось [Unsplash API](https://unsplash.com/documentation)</br>
> Хранение данных в `IndexDB`

## <a name="quick-start">🤸 Quick Start</a>

Следуйте этим шагам, чтобы запустить проект локально.

**Предварительные условия**

Убедитесь, что на вашем компьютере установлено следующее:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Клонируйте репозиторий**

```bash
git clone https://github.com/monstrikwho/photo_collection.git
cd photo_collection
```

**Установка**

Установите зависимости проекта с помощью NPM:

```bash
npm install
```

**Настройка переменных среды**

Создайте новый файл с именем `.env` в корне вашего проекта и добавьте следующий контент:

```env
NEXT_PUBLIC_API_URL=https://api.unsplash.com
NEXT_PUBLIC_ACCESS_KEY=
```

Получить `Access key` можно, зарегистрировавшись на [Unsplash Developers](https://unsplash.com/developers)

**Запустите проект локально**

```bash
npm run dev
```

Перейдите по ссылке [http://localhost:3000](http://localhost:3000).
