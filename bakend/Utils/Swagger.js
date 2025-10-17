import swaggerJSDoc from "swagger-jsdoc";

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "سامانه LMS",
      version: "1.0.0",
      description: "مستندات API برای برنامه سامانه LMS",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "سرور محلی",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "توکن JWT را در قالب `Bearer <token>` ارسال کنید",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(option);
export default swaggerDocs;
