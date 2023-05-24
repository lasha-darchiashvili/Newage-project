const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();

const contactsRouter = require("./routes/contacts");

app.use(express.json());

app.use("/contacts", contactsRouter);

// swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Contacts API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /contacts:
 *    get:
 *      description: get all contacts
 *      summary: get all contacts
 *      responses:
 *         200:
 *           description: Success
 *
 */

/**
 * @swagger
 * /contacts/{id}:
 *    get:
 *      summary: get single contact
 *      description: retrieve single user by id
 *      parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: contact id
 *           type: integer
 *      responses:
 *         200:
 *           description: Success
 *         404:
 *           description: Not found
 *
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     description: Create a new contact
 *     summary: Create a new contact
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Bad request, validation errors occurred
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     description: Update a contact
 *     summary: Update a contact
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the contact
 *         required: true
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         description: Updated contact data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Bad request, validation errors occurred
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     description: Delete a contact
 *     summary: delete a contact
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of a contact
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

app.listen("3000", () => {
  console.log("server started");
});
