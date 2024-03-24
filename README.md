## Documentación del Proyecto: Formulario Médico

### Resumen del proyecto
Aplicación web que permite el registro de datos personales y datos antropométricos de un paciente, y basado en estos datos, filtra los diagnósticos aplicables al paciente. Al finalizar, se imprime un pdf con la información de la consulta médica.

### Tecnologías y Dependencias
- HTML
- CSS
- JavaScript 
- Day.js (librería de manejo de fechas y horas en JavaScript, debido a su facilidad de uso, su tamaño reducido y su gran cantidad de funcionalidades para manipular fechas.)

### Instrucciones para Ejecutar la Aplicación

1. Descargar los archivos del proyecto desde el repositorio de GitHub.

2. Abrir el archivo `index.html` en el navegador web.

3. Asegurar tener una conexión a internet activa, ya que la aplicación carga la librería Day.js desde una URL externa.

### Estructura del Proyecto
El proyecto está compuesto por tres archivos principales:
- **index.html**: Contiene la estructura del formulario médico y la referencia al archivo de estilo y JavaScript.
- **app.js**: Maneja la lógica del formulario, incluyendo la recolección de datos, el consumo de la API de diagnósticos, y el filtrado de diagnósticos aplicables.
- **style.css**: Define el estilo visual del formulario médico y la aplicación web en general.

### Funcionalidades Principales
1. **Registro de Datos del Paciente**: Permite al usuario ingresar los datos personales y antropométricos del paciente, así como el motivo de consulta.
2. **Autocompletado de Diagnósticos**: Muestra sugerencias de diagnósticos mientras el usuario escribe en el campo de búsqueda, basado en los criterios de filtrado.
3. **Filtrado de Diagnósticos**: Utiliza los datos del paciente para filtrar los diagnósticos aplicables, considerando la edad y sexo del paciente.
4. **Generación de PDF**: Al dar click en imprimir, se genera un documento PDF de los datos de la consulta médica.




