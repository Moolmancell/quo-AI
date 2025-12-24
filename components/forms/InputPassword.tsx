'use client'

import { useId, useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

const InputPassword = ({id, placeholder, ...props}: {id?: string, placeholder?: string}) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className='w-full space-y-3'>
      <div className='relative'>
        <Input id={id} type={isVisible ? 'text' : 'password'} placeholder={placeholder || 'Password'} className='pr-9' {...props} />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={() => setIsVisible(prevState => !prevState)}
          className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
    </div>
  )
}

export default InputPassword
