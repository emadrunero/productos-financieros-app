# Productos Financieros App

Aplicación frontend desarrollada en **Angular** para la gestión de productos financieros de un banco.
Permite listar, buscar, crear, editar y eliminar productos mediante el consumo de una API REST local.

---

## Tecnologías utilizadas

* Angular (v17)
* TypeScript
* RxJS
* Angular Router
* Jest (pruebas unitarias)

---

##  Arquitectura

El proyecto sigue una estructura basada en **Clean Architecture** y separación por responsabilidades:
src/app/
├── core/          # Servicios globales, guards, interceptors
├── shared/        # Componentes reutilizables
├── features/      # Módulos por funcionalidad (products)

## Funcionalidades

* ✅ Listado de productos financieros
* ✅ Búsqueda de productos
* ✅ Paginación (5, 10, 20 registros)
* ✅ Crear producto con validaciones
* ✅ Editar producto
* ✅ Eliminar producto con confirmación
* ✅ Validación de ID único (API)
* ✅ Manejo de errores visuales

## Buenas prácticas implementadas

* Lazy Loading de módulos
* Guards para protección de rutas
* Interceptor HTTP
* Manejo de observables con RxJS
* Separación de capas (core, shared, features)
* Uso de servicios desacoplados
* Logging centralizado (`LoggerService`)

## Backend (API local)

Este proyecto requiere un backend local en Node.js.

### Pasos para ejecutar el backend:

1. Descomprimir el archivo `repo-interview-main.zip`
2. Abrir una terminal en la carpeta
3. Instalar dependencias:
bash
npm install

4. Ejecutar el servidor:

bash
npm run start:dev


5. La API estará disponible en:

http://localhost:3002

## Ejecución del proyecto frontend

1. Clonar el repositorio:
bash
git clone https://github.com/emadrunero/productos-financieros-app.git


2. Instalar dependencias:
bash
npm install


3. Ejecutar la aplicación:
bash
ng serve

4. Abrir en el navegador:
http://localhost:4200

##  Pruebas unitarias
Ejecutar pruebas con:

bash
npm run test
#Cobertura mínima requerida: **70%**

## Consideraciones

* La aplicación consume una API local (no funciona sin backend)
* Se implementaron validaciones en formularios según requerimientos
* Se manejan errores visuales para mejorar la experiencia de usuario

## Autor

Desarrollado por **Edwin Madruñero**
