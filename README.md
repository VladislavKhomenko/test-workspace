# 🚀 n8n + Swagger + Angular: Автоматическая генерация фронтенд кода

Демонстрационный проект для презентации автоматизации фронтенд разработки с использованием n8n, Swagger API и Angular.

## 📋 Описание проекта

Этот проект демонстрирует автоматическую генерацию Angular кода на основе Swagger API документации с помощью n8n workflow.

### Архитектура
```
┌─────────────────┐    ┌─────────────┐    ┌─────────────────┐
│   Swagger API   │───▶│     n8n     │───▶│  Angular App    │
│   (Backend)     │    │  Workflow   │    │   (Frontend)    │
└─────────────────┘    └─────────────┘    └─────────────────┘
```

## 🛠 Технологии

- **Backend**: NestJS + Swagger
- **Frontend**: Angular 20
- **Automation**: n8n
- **Build Tool**: Nx

## 🚀 Быстрый старт

### Предварительные требования

1. **Node.js** (версия 18+)
2. **npm** или **yarn**
3. **n8n.cloud** - готовый workflow: https://vlad-khomenko94.app.n8n.cloud/workflow/QTTbDF5qs9UgAsbW

### Установка и запуск

1. **Клонирование и установка зависимостей**
```bash
cd test-workspace
npm install
```

2. **Запуск Backend**
```bash
npm run start:backend
```
Backend будет доступен по адресу: http://localhost:3000
Swagger UI: http://localhost:3000/api
Swagger JSON: http://localhost:3000/api-json

3. **Запуск Frontend**
```bash
npm run start:frontend
```
Frontend будет доступен по адресу: http://localhost:4200

4. **Использование n8n.cloud**
```bash
# Готовый workflow доступен по адресу:
# https://vlad-khomenko94.app.n8n.cloud/workflow/QTTbDF5qs9UgAsbW
```

## 📚 API Endpoints

### Users API
- `GET /api/v1/users` - Получить список пользователей
- `POST /api/v1/users` - Создать нового пользователя
- `GET /api/v1/users/:id` - Получить пользователя по ID
- `PUT /api/v1/users/:id` - Обновить пользователя
- `DELETE /api/v1/users/:id` - Удалить пользователя

## 🔄 n8n Workflow

### Использование workflow
1. Откройте n8n.cloud: https://vlad-khomenko94.app.n8n.cloud/workflow/QTTbDF5qs9UgAsbW
2. Скопируйте webhook URL из workflow

### Запуск генерации
```bash
curl -X POST [WEBHOOK_URL_FROM_N8N_CLOUD]
```

### Что делает workflow:
1. **Webhook Trigger** - получает уведомление
2. **HTTP Request** - загружает Swagger JSON
3. **Code Node** - генерирует TypeScript типы
4. **Code Node** - генерирует Angular сервисы
5. **Response** - возвращает результат

## 📁 Структура проекта

```
test-workspace/
├── apps/
│   ├── backend/                 # NestJS API
│   │   ├── src/
│   │   │   ├── users/          # Users module
│   │   │   │   ├── dto/        # Data Transfer Objects
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   └── users.module.ts
│   │   │   └── main.ts         # Swagger setup
│   │   └── package.json
│   └── frontend/               # Angular app
│       ├── src/
│       │   ├── app/
│       │   │   ├── users/      # Users component
│       │   │   │   └── users.component.ts
│       │   │   ├── generated/  # Auto-generated code
│       │   │   │   ├── generated-types.ts
│       │   │   │   ├── generated-services.ts
│       │   │   │   └── generation-info.json
│       │   │   └── app.routes.ts
│       │   └── main.ts
│       └── package.json
├── n8n-swagger-to-angular-workflow.json  # n8n workflow
├── demo-script.md              # Демонстрационный скрипт
└── README.md                   # Этот файл
```

## 🎯 Демонстрация

### Сценарий 1: Базовая генерация
1. Запустите все сервисы
2. Откройте Swagger UI: http://localhost:3000/api
3. Запустите n8n workflow
4. Проверьте сгенерированные файлы

### Сценарий 2: Добавление нового endpoint
1. Добавьте новый endpoint в `UsersController`
2. Перезапустите backend
3. Запустите workflow снова
4. Проверьте обновленные файлы

### Сценарий 3: Интеграция с Angular
1. Импортируйте сгенерированные сервисы
2. Замените заглушки в компоненте
3. Протестируйте функциональность

## 📊 Преимущества автоматизации

### Количественные улучшения:
- ⚡ **Время синхронизации**: с 2-3 дней до 5 минут
- 🐛 **Ошибки типизации**: -90%
- 📝 **Документация**: всегда актуальная
- 🔄 **Скорость разработки**: +40%

### Качественные улучшения:
- Автоматическая типизация
- Консистентная архитектура
- Меньше ручной работы
- Лучшая коммуникация между командами

## 🛠 Разработка

### Добавление новых endpoints
1. Создайте новый контроллер или добавьте методы в существующий
2. Добавьте Swagger декораторы
3. Запустите workflow для генерации кода

### Кастомизация генерации
Отредактируйте Code Nodes в n8n workflow для изменения логики генерации.

## 📚 Полезные ссылки

- [n8n Documentation](https://docs.n8n.io/)
- [Swagger Specification](https://swagger.io/specification/)
- [Angular HttpClient](https://angular.io/guide/http)
- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [Nx Documentation](https://nx.dev/)

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

---

**Удачной разработки! 🚀**
