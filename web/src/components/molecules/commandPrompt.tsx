import { FileQuestion } from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '../atoms/command';
import { FormEventHandler, useEffect, useState } from 'react';

export function CommandDialogPrompt() {
    const [open, setOpen] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>('');

    useEffect(() => {
        const down: EventListener = (e: Event) => {
            if (e instanceof KeyboardEvent) {
                if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    setOpen((open) => !open);
                }
                // if (e.key === 'Enter') {
                //     e.preventDefault();
                //     dispatch(
                //         addPrompt({
                //             id: uuid(),
                //             title: null,
                //             content: prompt,
                //             role: 'user',
                //             actions: null,
                //             description: null
                //         })
                //     );
                // }
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const onValueChange: FormEventHandler<HTMLInputElement> = (event) => {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;
        setPrompt(inputValue);
    };
    console.log(prompt);
    return (
        <>
            <p className='text-sm text-muted-foreground'>
                Press{' '}
                <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                    <span className='text-xs'>⌘</span>K
                </kbd>
            </p>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder='Type a command or search...'
                    value={prompt}
                    onChangeCapture={onValueChange}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading='Suggestions'>
                        <CommandItem>
                            <FileQuestion className='mr-2 h-4 w-4' />
                            <span>What&apos;s the contract ending date for contract ID 1?</span>
                        </CommandItem>
                        <CommandItem>
                            <FileQuestion className='mr-2 h-4 w-4' />
                            <span>What&apos;s the total order amount for order ID 1?</span>
                        </CommandItem>
                        <CommandItem>
                            <FileQuestion className='mr-2 h-4 w-4' />
                            <span>Expected delivery date for order ID 1</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
