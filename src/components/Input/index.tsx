import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import { IconBaseProps } from 'react-icons/lib';

interface InputProps {
  name: string;
  placeholder: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export function Input({ name, icon: Icon, ...rest }:InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
}
