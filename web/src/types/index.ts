import { z } from 'zod';

export const contractSchema = z.object({
    id: z.number().int('ID must be an integer.'),
    type: z.string({ required_error: 'Type must be a non-empty string.' }),
    signedDate: z.string(),
    onboardedOn: z.string(),
    validTill: z
        .number()
        .int()
        .positive('Valid till must be a positive integer representing years.'),
    expiryDate: z.string(),
    customer: z.string({ required_error: 'Customer must be a non-empty string.' }),
    seller: z.string({ required_error: 'Seller must be a non-empty string.' }),
    materials: z.array(
        z.object({
            id: z.number().int('Material ID must be an integer.'),
            totalQuantity: z.number().int().positive('Total quantity must be a positive integer.'),
            perOrderQuantity: z
                .number()
                .int()
                .positive('Per order quantity must be a positive integer.'),
            minOrderQuantity: z
                .number()
                .int()
                .positive('Min order quantity must be a positive integer.'),
            frequency: z.string({ required_error: 'Frequency must be a non-empty string.' })
        })
    ),
    penaltyThreshold: z.number().int().positive('Penalty threshold must be a positive integer.'),
    shipmentAddress: z.string({ required_error: 'Shipment address must be a non-empty string.' }),
    invoiceAddress: z.string({ required_error: 'Invoice address must be a non-empty string.' })
});

export const contractsSchema = z.array(contractSchema);

export const invoiceSchema = z.object({
    id: z.string().uuid('ID must be a valid UUID string.'),
    orderId: z.string().uuid('Order ID must be a valid UUID string.'),
    dueDate: z.date().min(new Date(), 'Due date must be a date after the current date.'),
    dateOfPayment: z.date().optional(),
    paymentMode: z.string({ required_error: 'Payment mode must be a non-empty string.' }),
    paymentStatus: z.string({ required_error: 'Payment status must be a non-empty string.' }),
    customer: z.string({ required_error: 'Customer must be a non-empty string.' })
});

export const invoicesSchema = z.array(invoiceSchema);

export const orderSchema = z.object({
    id: z.string().uuid('ID must be a valid UUID string.'),
    customer: z.string({ required_error: 'Customer must be a non-empty string.' }),
    contact: z.object({
        name: z.string({ required_error: 'Contact name must be a non-empty string.' }),
        email: z.string().email('Contact email must be a valid email address.'),
        phone: z.string({ required_error: 'Contact phone must be a non-empty string.' })
    }),
    uniqueSKUCount: z.number().int().positive('Unique SKU count must be a positive integer.'),
    orderValue: z.number().positive('Order value must be a positive number.'),
    estimatedDeliveryDate: z
        .date()
        .min(new Date(), 'Estimated delivery date must be a date after the current date.'),
    deliveryPremium: z.number().optional().nullable(),
    amountManufactured: z.string({
        required_error: 'Amount manufactured must be a non-empty string.'
    })
});

export const ordersSchema = z.array(orderSchema);

export type TContract = z.infer<typeof contractSchema>;
export type TInvoice = z.infer<typeof invoiceSchema>;
export type TOrder = z.infer<typeof orderSchema>;
export type TContracts = z.infer<typeof contractsSchema>;
export type TInvoices = z.infer<typeof invoicesSchema>;
export type TOrders = z.infer<typeof ordersSchema>;
