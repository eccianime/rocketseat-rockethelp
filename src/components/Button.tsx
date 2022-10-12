import React from 'react'
import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
}

const Button = ({ title, ...props }: Props) => {
  return (
    <NativeBaseButton
        bg='green.700'
        h={14}
        size={'sm'}
        rounded={'sm'}
        _pressed={{
            bg: 'green.500'
        }}
        {...props}
    >
        <Heading color='white' fontSize='sm'>{title}</Heading>
    </NativeBaseButton>
  );
}

export default Button;