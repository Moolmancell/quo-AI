import { Button } from '../ui/Button'
import { Plus } from 'lucide-react'
import { Input } from '../ui/Input';
import { useState } from 'react';

export function InputInterest({ onEnter }: { onEnter: (value: string) => void }) {

    const [inputValue, setInputValue] = useState('');

    return (
        <div className="mb-4 relative w-full">
            <Input
                className="h-12 pl-4 pr-14"
                type="text"
                placeholder="Add interesting topics"
                value={inputValue}
                onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            onEnter(inputValue);
                            setInputValue('');
                        }
                    }
                }
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
                variant="secondary"
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                size="icon"
                onClick={() => {
                    onEnter(inputValue)
                    setInputValue('');
                }}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}
