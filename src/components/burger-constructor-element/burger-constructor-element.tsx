import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructorItems,
  removeConstructorItem,
  updateConstructorIngredients
} from '../../services/slices/constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(selectConstructorItems);

    const handleMoveDown = () => {
      if (index >= totalItems - 1) return;
      const newIngredients = [...ingredients];
      [newIngredients[index], newIngredients[index + 1]] = [
        newIngredients[index + 1],
        newIngredients[index]
      ];
      dispatch(updateConstructorIngredients(newIngredients));
    };

    const handleMoveUp = () => {
      if (index <= 0) return;
      const newIngredients = [...ingredients];
      [newIngredients[index], newIngredients[index - 1]] = [
        newIngredients[index - 1],
        newIngredients[index]
      ];
      dispatch(updateConstructorIngredients(newIngredients));
    };

    const handleClose = () => {
      dispatch(removeConstructorItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
