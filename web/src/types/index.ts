import { z } from 'zod';

export const contractSchema = z.object({
    id: z.number(),
    type: z.string(),
    signedDate: z.string(),
    onboardedOn: z.string(),
    validTill: z.number(), // in years
    expiryDate: z.string(),
    customer: z.string(),
    seller: z.string(),
    materials: z.array(
        z.object({
            id: z.number(),
            totalQuantity: z.number(),
            perOrderQuantity: z.number(),
            minOrderQuantity: z.number(),
            frequency: z.string()
        })
    ),
    penaltyThreshold: z.number(),
    shipmentAddress: z.string(),
    invoiceAddress: z.string()
});

export const contractsSchema = z.array(contractSchema);

export const invoiceSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().uuid(),
    dueDate: z.date(),
    dateOfPayment: z.date(),
    paymentMode: z.string(),
    paymentStatus: z.string(),
    customer: z.string()
});

export const invoicesSchema = z.array(invoiceSchema);

export const orderSchema = z.object({
    id: z.string().uuid(),
    customer: z.string(),
    contact: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string()
    }),
    uniqueSKUCount: z.number(),
    orderValue: z.number(),
    estimatedDeliveryDate: z.date(),
    deliveryPremium: z.number().optional().nullable(),
    amountManufactured: z.string()
});

export const ordersSchema = z.array(orderSchema);

export type TContract = z.infer<typeof contractSchema>;
export type TInvoice = z.infer<typeof invoiceSchema>;
export type TOrder = z.infer<typeof orderSchema>;
export type TContracts = z.infer<typeof contractsSchema>;
export type TInvoices = z.infer<typeof invoicesSchema>;
export type TOrders = z.infer<typeof ordersSchema>;
