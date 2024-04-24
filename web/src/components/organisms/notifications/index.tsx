import { Bell } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../../atoms/card';
import { Button } from '../../atoms/button';
import { Input } from '../../atoms/input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPrompt, selectPrompts } from '../../../redux/features/notificationSlice';
import { v4 as uuid } from 'uuid';

export const Notifications = () => {
    const dispatch = useDispatch();
    const prompts = useSelector(selectPrompts);
    const [prompt, setPrompt] = useState<string>('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;
        setPrompt(inputValue);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(
                addPrompt({
                    id: uuid(),
                    title: null,
                    content: prompt,
                    role: 'user',
                    actions: null,
                    description: null
                })
            );
            setPrompt('');
        }
    };

    return (
        <div className='flex flex-col gap-2 max-w-96 bg-background text-foreground p-4 border-l-2 border-foreground'>
            <div className='flex items-center gap-2'>
                <Bell />
                <span className='sr-only'>Notifications</span>
                <p>Notifications</p>
            </div>
            <div className='flex flex-col grow overflow-y-auto'>
                <Card>
                    <CardHeader>
                        <CardTitle> New Contract Added!</CardTitle>
                        <CardDescription>
                            Contract ID : 1 has been added and awaits your approval
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
                            sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius
                            a, semper congue, euismod non, mi.
                        </p>
                    </CardContent>
                    <CardFooter className='gap-4'>
                        <Button className='bg-primary text-primary-foreground'>Approve</Button>
                        <Button className='bg-red-500 text-white'>Reject</Button>
                    </CardFooter>
                </Card>
                {prompts.map((prompt) => (
                    <Card key={prompt.id}>
                        {(prompt.title || prompt.role || prompt.description) && (
                            <CardHeader>
                                {(prompt.title || prompt.role) && (
                                    <CardTitle className='capitalize'>
                                        {prompt.title || prompt.role}
                                    </CardTitle>
                                )}
                                {prompt.description && (
                                    <CardDescription>{prompt.description}</CardDescription>
                                )}
                            </CardHeader>
                        )}
                        <CardContent>
                            <p>{prompt.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Input
                placeholder='Chat with the bot'
                onChange={onChange}
                value={prompt}
                onKeyDown={onKeyDown}
            />
        </div>
    );
};
