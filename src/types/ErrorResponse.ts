/**
 * @swagger
 * components:
 *  schemas:
 *   ErrorResponse:
 *     type: object
 *     required:
 *     - message
 *     properties:
 *      message:
 *       type: string
 *       example: Item not found
 */
export type ErrorResponse = {
    message: string;
};