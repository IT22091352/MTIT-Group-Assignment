const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Course Service API",
    version: "1.0.0",
    description: "CRUD API for managing courses"
  },
  servers: [
    {
      url: "http://localhost:3002"
    }
  ],
  components: {
    schemas: {
      Course: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Node.js Basics" },
          description: { type: "string", example: "Intro to Node.js" }
        }
      },
      CourseInput: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string", example: "Node.js Basics" },
          description: { type: "string", example: "Intro to Node.js" }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "course not found" }
        }
      }
    }
  },
  paths: {
    "/courses": {
      post: {
        summary: "Create course",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CourseInput"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Course created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course"
                }
              }
            }
          },
          "400": {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      get: {
        summary: "Get all courses",
        responses: {
          "200": {
            description: "List of courses",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Course"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/courses/{id}": {
      get: {
        summary: "Get course by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": {
            description: "Course found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course"
                }
              }
            }
          },
          "400": {
            description: "Invalid ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            description: "Course not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      put: {
        summary: "Update course by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CourseInput"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Course updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course"
                }
              }
            }
          },
          "400": {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            description: "Course not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      delete: {
        summary: "Delete course by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": {
            description: "Course deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "course deleted successfully" },
                    course: { $ref: "#/components/schemas/Course" }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            description: "Course not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
