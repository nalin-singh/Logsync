import { useState } from 'react';
import { Button } from '../atoms/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../atoms/dialog';
import { Input } from '../atoms/input';
import { Label } from '../atoms/label';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { addContract } from '../../redux/features/contractSlice';

export const Upload = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('File submitted successfully');
        console.log(file);
        dispatch(
            addContract({
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
            })
        );
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        toast.success('File uploaded successfully');
        setFile(selectedFile);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Upload</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Upload Contract</DialogTitle>
                        <DialogDescription>
                            Create a new contract by uploading a file, or drag and drop a file to
                            upload.
                        </DialogDescription>
                    </DialogHeader>
                    <Label>
                        Upload File:
                        <Input type='file' onChange={handleFileChange} />
                    </Label>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='submit'>Upload</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
