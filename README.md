<h2> Entrega final – Comisión 75270 – Backend II: DISEÑO Y ARQUITECTURA BACKEND - Coderhouse </h2>

<h3>Consigna del entrega:</h3>

<p>
  Mejorar la arquitectura del servidor desarrollado durante el curso, enfocándose en la implementación de patrones de diseño, manejo de roles y autorización, así como en la mejora de la lógica de negocio del ecommerce.
</p>

<h3> Aspectos a incluir </h3>

<p>
  
1. Patrón Repository:

Implementar el patrón Repository para trabajar con el DAO (Data Access Object) dentro de la lógica de negocio.

2. Modificación de la Ruta /current:
   
Evitar enviar información sensible del usuario. Enviar un DTO (Data Transfer Object) que contenga solo la información necesaria y no sensible.

3. Sistema de Recuperación de Contraseña:

- Implementar un sistema de recuperación de contraseña que envíe un correo con un botón para restablecer la contraseña.

- El enlace del correo debe expirar después de una hora de ser enviado.

- Evitar que el usuario pueda restablecer la contraseña a la misma que tenía anteriormente.

4. Middleware de Autorización:

- Crear un middleware que trabaje junto con la estrategia “current” para limitar el acceso a ciertos endpoints:

  - Solo el administrador puede crear, actualizar y eliminar productos.
  - Solo el usuario puede agregar productos a su carrito.

5. Arquitectura Profesional:

Aplicar una arquitectura más profesional en el servidor, utilizando patrones de diseño, manejo de variables de entorno y técnicas avanzadas como mailing.

6. Mejora en la Lógica de Compra:

Profundizar en los roles de los usuarios y las autorizaciones aplicables a cada rol en el contexto de las compras dentro del ecommerce.
  
<br/>

A continuación, se procederá a detallar cómo se implementó cada lógica para cumplir con la consigna solicitada: </p>

<h3> 1. Patrón Repository </h3>

<p> 
  Se implementó los archivos repository para users, product, ticket y carts los cuales interactúan con los DAO's que tienen conexión con los métodos de la BD.
</p>

<h3> 2. Modificación de la Ruta /current </h3>

<p>
  Al crear un usuario, en la respuesta del endpoint se llama al DTO (Data Transfer Object) el cuál contiene solo la información necesaria y no sensible del usuario.
  
  El mismo devuelve la siguiente información: first_name,last_name, email,age,password,role.

  <img width="1289" height="732" alt="image" src="https://github.com/user-attachments/assets/471aaec5-b67e-425e-bf82-e9c713dc0b8a" />

</p> <br/>

<h3> 3. Sistema de Recuperación de Contraseña </h3>

<p>
  Se implementò la ruta /api/users/forgot-password para cumplir con este punto, el mismo implementa JWT con un token ùnico que expira despuès de una hora generado.

  Si queremos ver la funcionalidad de la misma en acción debemos realizar los siguientes pasos:

  1. Hacer una petición POST a la URL /api/users/forgot-password pasándole como parámetro el email del usuario.

<img width="1317" height="637" alt="image" src="https://github.com/user-attachments/assets/b44726ee-28d3-451b-a320-54aaa7bf8e5f" />

  Si vamos al email enviado en el body recibiremos un correo de la siguiente manera:

  <img width="1401" height="257" alt="image" src="https://github.com/user-attachments/assets/fd2ab4d8-502b-4c95-afdd-8b1e2bca3ef0" />
  
  2. Para poder restablecer la contraseña debemos hacer una petición POST a la URL /api/users/reset-password enviándole por el body el token recibido y la nueva password de la siguiente manera:

<img width="1318" height="640" alt="image" src="https://github.com/user-attachments/assets/3321e228-e693-467c-b992-447101a2306c" />

De esta manera queda restablecida la contraseña del usuario.

Si probamos el ingreso desde la aplicación con la nueva contraseña podremos acceder sin problema:

<img width="518" height="504" alt="image" src="https://github.com/user-attachments/assets/8d519759-53d1-4ed3-b6a3-30fd98bd97d7" /> <br/>

<img width="511" height="427" alt="image" src="https://github.com/user-attachments/assets/26b6326b-6515-4861-9045-29e1494f9b0e" />

</p>


<h3> 4. Middleware de Autorización </h3>

<p>
  Se creó un middleware que verifica el rol del usuario logueado y en base a dicho rol permite acceder o no a los recursos protegidos del rol.

  <h4> Solo el administrador puede crear, actualizar y eliminar productos. </h4>

  Verificamos el rol del usuario previamente logueado:
  
  <img width="1302" height="733" alt="image" src="https://github.com/user-attachments/assets/a982ee10-7fed-4c7e-93c1-9aa7a44300b6" />

  Si nos logueamos con un usuario que tiene rol user y queremos acceder a dicho recurso nos saldrá el siguiente mensaje de error:

  <img width="1306" height="607" alt="image" src="https://github.com/user-attachments/assets/b4f910bc-c747-4362-8ed6-a8e88a78e722" />

  Aquí no se permitió el acceso porque el usuario tiene rol usuario y no administrador.

  Veamos si nos logueamos con un usuario que tiene rol administrador:

  <img width="1313" height="711" alt="image" src="https://github.com/user-attachments/assets/ad824517-6760-4fe2-aa2f-5e106ded3954" />

  <img width="1304" height="838" alt="image" src="https://github.com/user-attachments/assets/1d2eccee-1ddb-4b19-8a4e-073d6dd43705" />

  De esta forma comprobamos que el middleware creado está funcionando de manera correcta.

  Lo mismo si queremos realizar la acción de "Solo el usuario puede agregar productos a su carrito".
</p>

<h3> 6. Modelo de Ticket y Lógica de Compra: </h3>

<p>
  En este aspecto se creó la lógica necesaria para poder generar un ticket a partir de que un usuario ya tiene un carrito asingado y al endpoint /api/ticket/:userId se le pasa el Id del usuario.

  Veamos este ejemplo:

  1. Agrego un producto a un carrito existente o creo un carrito desde el endpoint /api/carts y luego con ese id lo utilizo en el endpoint /api/carts/:cid/product/:pid

<img width="1288" height="730" alt="image" src="https://github.com/user-attachments/assets/ad916959-383b-42c3-a143-02da26ddedee" />

  2. Debo vincular el carrito al usuario haciendo una petición PUT al endpoint /api/users/:id enviándole en el body lo siguiente:

     <img width="1302" height="810" alt="image" src="https://github.com/user-attachments/assets/1db583fa-e646-4013-86cc-53eaa15aaed7" />

  3. Ahora estoy en condiciones para poder generar el ticket para el usuario Federico Rodriguez haciendo una petición POST al endpoint /api/tickets/:userId :

     <img width="1314" height="877" alt="image" src="https://github.com/user-attachments/assets/04069767-1546-4f12-bee4-fbcaa04dc9d9" />

Aquí vemos como se cumple todo el ciclo completo de poder generar un ticket para un usuario elegido y posterior a eso borra los productos del carrito que tenía asignado:

<img width="486" height="105" alt="image" src="https://github.com/user-attachments/assets/01561e15-a8f9-4d90-860a-352969bb1ce2" />

</p>

<h3> Instrucciones de instalación del proyecto: </h3>

1. Clonar el repositorio:
```bash
git clone https://github.com/GitRepoFabi/coderhouse-backendII.git
```
2. Instalar las dependencias:
```bash
npm install
```
3. Configurar un archivo .env con las siguientes variables de entorno:

```bash
PORT=
MONGO_URI=
SECRET=
PRIVATE_KEY=
EMAIL=
PASS=
```

4. Iniciar proyecto:
```bash
npm start
```
