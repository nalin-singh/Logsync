import { z } from 'zod';

export const contractsSchema = z.object({
    id: z.string().uuid(),
    type: z.string(),
    signedDate: z.date(),
    onboardedOn: z.date(),
    validTill: z.number(), // in years
    expiryDate: z.date(),
    customer: z.string(),
    materials: z.array(
        z.object({
            id: z.string().uuid(),
            totalQuantity: z.number(),
            perOrderQuantity: z.number(),
            minOrderQuantity: z.number(),
            frequency: z.number()
        })
    ),
    shipmentAddress: z.string(),
    invoiceAddress: z.string()
});

export const invoiceSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().uuid(),
    dueDate: z.date(),
    dateOfPayment: z.date(),
    paymentMode: z.string(),
    paymentStatus: z.string(),
    customer: z.string()
});

export const orderScheam = z.object({
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

export type TContract = z.infer<typeof contractsSchema>;
export type TInvoice = z.infer<typeof invoiceSchema>;
export type TOrder = z.infer<typeof orderScheam>;
