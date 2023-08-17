'use client';

import { useContext } from 'react';
import { Asteroid } from '@/services/asteroid/asteroid.helper';

import { AppContext } from '../providers/context-provider';
import { Button } from '../ui/button/button';

interface AddToCartButtonProps {
  isInCart?: boolean;
  asteroid: Asteroid;
}

export function AddToCartButton({ isInCart, asteroid }: AddToCartButtonProps) {
  const { cart, setCart } = useContext(AppContext);

  const handleClick = () => {
    if (isInCart) {
      setCart(cart?.filter((cartItem) => cartItem.id !== asteroid.id));
    } else setCart([...cart, asteroid]);
  };

  return (
    <Button onClick={handleClick} variant={isInCart ? 'tertiary' : 'secondary'}>
      {isInCart ? 'В КОРЗИНЕ' : 'ЗАКАЗАТЬ'}
    </Button>
  );
}
