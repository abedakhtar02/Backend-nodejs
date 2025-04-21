/*middlewares are the middle points which are capable of receiving req and giving back response.
    it has 3 parts - 
    req- request and handling the incoming data.
    res- response object that allows sending data back to the client.
    next- function to pass control to the next middleware in the stack.

    Middleware functions can be used for various purposes such as logging, authentication, error handling, and more, allowing developers to modularize and reuse code in their applications.

    In Express.js, middleware functions are executed sequentially, allowing developers to define a clear flow of request handling. Each middleware can modify the request and response objects, end the request-response cycle, or call the next

    middleware function in the stack. By using the `next()` function, the middleware can pass control to the next

    middleware, enabling a flexible and scalable architecture for building web applications.
    middleware in Express.js, developers can easily handle cross-cutting concerns, such as logging requests, validating user input, and managing sessions, without cluttering the main application logic. This promotes cleaner and more maintainable code.
    
    In summary, middleware serves as a powerful tool for enhancing the functionality and organization of web applications, making them more efficient and easier to manage.


    
*/

