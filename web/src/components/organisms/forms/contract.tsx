import { useForm } from 'react-hook-form';
import { Button } from '../../atoms/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../atoms/form';
import { Input } from '../../atoms/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contractSchema } from '../../../types';

export const ContractForm = () => {
    const form = useForm<z.infer<typeof contractSchema>>({
        resolver: zodResolver(contractSchema),
        defaultValues: {
            id: 5241,
            type: 'Sales',
            signedDate: '2024-12-01T00:00:00.000',
            onboardedOn: '2024-02-20T00:00:00.000',
            validTill: 2,
            expiryDate: '2026-12-01T00:00:00.000',
            customer: 'Gizmo Electronics',
            seller: 'Battery Manufacturing Inc.',
            materials: [
                {
                    id: 807912,
                    totalQuantity: 500,
                    perOrderQuantity: 10,
                    minOrderQuantity: 5,
                    frequency: 'Weekly'
                },
                {
                    id: 805234,
                    totalQuantity: 400,
                    perOrderQuantity: 15,
                    minOrderQuantity: 10,
                    frequency: 'Weekly'
                }
            ],
            penaltyThreshold: 100,
            shipmentAddress: '100 Consumer Rd, Retail City, Shoppington, 23456, USA',
            invoiceAddress: '100 Consumer Rd, Retail City, Shoppington, 23456, USA'
        }
    });

    const onSubmit = async (values: z.infer<typeof contractSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='id'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contract ID</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='signedDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Signed Date</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='onboardedOn'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Onboarded On</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='validTill'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valid Till (in years)</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='expiryDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='customer'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='seller'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Seller</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* {form.watch('materials')?.map((material: any, index: number) => (
                    <div key={index}>
                        <FormField
                            control={form.control}
                            name={`materials[${index}].totalQuantity`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Total Quantity</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`materials[${index}].perOrderQuantity`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Per Order Quantity</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`materials[${index}].minOrderQuantity`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Min Order Quantity</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`materials[${index}].frequency`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frequency</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))} */}
                <FormField
                    control={form.control}
                    name='penaltyThreshold'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Penalty Threshold</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='shipmentAddress'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipment Address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='invoiceAddress'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Invoice Address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};
