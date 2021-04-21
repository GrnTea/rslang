# RSLang - приложение для изучения слов английского языка
Для запуска приложения запустите
1. npm run dev = build project in develop mode
2. npm run prod = build project in production mode
3. npm run start = start project.

ESLint 
1. npm run lint = start eslint for js and jsx files
2. npm run lintf = start eslint --fix for js and jsx files

## Технологический стек
Приложение сделано на React - JavaScript-библиотека для создания пользовательских интерфейсов, в качестве основного языка был использован **Typescript**, строго типизированный язык который позволяет избежать некоторых ошибок еще на этапе написания кода. В качестве backend API использоволась связка **NodeJS (Express), MongoDB**.В качестве транспайлера использвался **Babel** для поддержки кода под стандарт ES5. Для стилизации приложения использовалась библиотека **Material UI** которая пердостовляет готовые инкапсулированные React компоненты.

Для обработки ошибок единообразия кода использовался **ESLint** с конфигурацией *airbnb-typescript/base* для работы с Typescript.

Клиентская часть игры реализована с помощью сборщика **Webpack** для удобного использования модульности проекта.
