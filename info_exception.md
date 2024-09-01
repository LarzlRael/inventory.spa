#errors expections nestjs 
[text](https://docs.nestjs.com/exception-filters)
InternalServerErrorException 

1. BadRequestException
Descripción: Se lanza cuando la solicitud del cliente tiene parámetros inválidos o faltantes.
Ejemplo:
typescript
Copy code
throw new BadRequestException('Invalid input data');
2. UnauthorizedException
Descripción: Se utiliza cuando el cliente no está autenticado y necesita hacerlo para acceder al recurso.
Ejemplo:
typescript
Copy code
throw new UnauthorizedException('Authentication required');
3. NotFoundException
Descripción: Se lanza cuando no se encuentra el recurso solicitado.
Ejemplo:
typescript
Copy code
throw new NotFoundException('Resource not found');
4. ForbiddenException
Descripción: Se utiliza cuando el cliente está autenticado pero no tiene permisos para acceder al recurso.
Ejemplo:
typescript
Copy code
throw new ForbiddenException('Access denied');
5. NotAcceptableException
Descripción: Se lanza cuando el servidor no puede generar una respuesta aceptable según los encabezados Accept del cliente.
Ejemplo:
typescript
Copy code
throw new NotAcceptableException('Content type not acceptable');
6. RequestTimeoutException
Descripción: Se utiliza cuando la solicitud del cliente tarda demasiado en completarse.
Ejemplo:
typescript
Copy code
throw new RequestTimeoutException('Request took too long to complete');
7. ConflictException
Descripción: Se lanza cuando hay un conflicto con el estado actual del recurso (por ejemplo, un registro duplicado).
Ejemplo:
typescript
Copy code
throw new ConflictException('Data conflict occurred');
8. GoneException
Descripción: Indica que el recurso solicitado estaba disponible anteriormente pero ya no lo está.
Ejemplo:
typescript
Copy code
throw new GoneException('Resource is no longer available');
9. HttpVersionNotSupportedException
- **Descripción:**: Se utiliza cuando el servidor no soporta la versión HTTP utilizada en la solicitud.
- **Ejemplo**:

    ```typescript
    throw new HttpVersionNotSupportedException('HTTP version not supported');
    ```
10. PayloadTooLargeException
markdown
Copy code
- **Descripción:** Se lanza cuando el cuerpo de la solicitud es demasiado grande para ser procesado por el servidor.
- **Ejemplo:**
  ```typescript
  throw new PayloadTooLargeException('Request payload is too large');
  ```
11. UnsupportedMediaTypeException
markdown
Copy code
- **Descripción:** Se utiliza cuando el tipo de contenido de la solicitud no es compatible con el servidor.
- **Ejemplo:**
  ```typescript
  throw new UnsupportedMediaTypeException('Unsupported media type');
  ```
12. UnprocessableEntityException
markdown
Copy code
- **Descripción:** Se lanza cuando el servidor no puede procesar la solicitud, aunque la entiende, debido a problemas de validación u otros errores.
- **Ejemplo:**
  ```typescript
  throw new UnprocessableEntityException('Validation failed');
  ```
13. InternalServerErrorException
markdown
Copy code
- **Descripción:** Se utiliza cuando ocurre un error genérico en el servidor.
- **Ejemplo:**
  ```typescript
  throw new InternalServerErrorException('An unexpected error occurred');
  ```
14. NotImplementedException
markdown
Copy code
- **Descripción:** Se lanza cuando una funcionalidad solicitada no está implementada en el servidor.
- **Ejemplo:**
  ```typescript
  throw new NotImplementedException('Feature not implemented');
  ```
15. ImATeapotException
arduino
Copy code
- **Descripción:** Es una excepción humorística que responde con el código 418 "I'm a teapot". Se utiliza raramente.
- **Ejemplo:**
  ```typescript
  throw new ImATeapotException('I am a teapot');
  ```
16. MethodNotAllowedException
markdown
Copy code
- **Descripción:** Se utiliza cuando el cliente intenta usar un método HTTP que no está permitido para el recurso.
- **Ejemplo:**
  ```typescript
  throw new MethodNotAllowedException('HTTP method not allowed');
  ```
17. BadGatewayException
markdown
Copy code
- **Descripción:** Se lanza cuando el servidor, actuando como gateway o proxy, recibe una respuesta inválida de un servidor aguas arriba.
- **Ejemplo:**
  ```typescript
  throw new BadGatewayException('Invalid response from upstream server');
  ```
18. ServiceUnavailableException
markdown
Copy code
- **Descripción:** Se utiliza cuando el servidor no puede manejar la solicitud porque está sobrecargado o en mantenimiento.
- **Ejemplo:**
  ```typescript
  throw new ServiceUnavailableException('Service temporarily unavailable');
  ```
19. GatewayTimeoutException
markdown
Copy code
- **Descripción:** Se lanza cuando el servidor, actuando como gateway o proxy, no recibe una respuesta a tiempo de un servidor aguas arriba.
- **Ejemplo:**
  ```typescript
  throw new GatewayTimeoutException('Gateway timeout');
  ```
20. PreconditionFailedException
markdown
Copy code
- **Descripción:** Se utiliza cuando una de las condiciones preestablecidas para la solicitud no se cumple.
- **Ejemplo:**
  ```typescript
  throw new PreconditionFailedException('Precondition failed');
  ```