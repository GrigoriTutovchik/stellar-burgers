import {
  addConstructorItem,
  removeConstructorItem,
  updateConstructorIngredients,
  clearConstructor,
  burgerConstructorReducer,
  initialState
} from '../slices/constructor';
import { TConstructorIngredient } from '@utils-types';

describe('Тест редьюсера constructorSlice', () => {
  const mockBun: TConstructorIngredient = {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: '1'
  };

  const mockIngredient: TConstructorIngredient = {
    _id: '2',
    id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const mockIngredient2: TConstructorIngredient = {
    ...mockIngredient,
    _id: '3',
    id: '3',
    name: 'Соус Spicy-X'
  };

  it('Должен корректно обрабатывать начальное состояние', () => {
    const state = burgerConstructorReducer(initialState, {
      type: 'unknown'
    });
    expect(state).toEqual({
      items: {
        bun: null,
        ingredients: []
      },
      loading: false,
      order: null,
      error: undefined
    });
  });

  describe('Добавление ингредиентов', () => {
    it('Должен добавлять булку', () => {
      const action = addConstructorItem(mockBun);
      const result = burgerConstructorReducer(initialState, action);

      expect(result.items.bun).toEqual({
        ...mockBun,
        id: expect.any(String)
      });
      expect(result.items.ingredients).toEqual([]);
    });

    it('Должен добавлять начинку', () => {
      const action = addConstructorItem(mockIngredient);
      const result = burgerConstructorReducer(initialState, action);

      expect(result.items.bun).toBeNull();
      expect(result.items.ingredients).toHaveLength(1);
      expect(result.items.ingredients[0]).toEqual({
        ...mockIngredient,
        id: expect.any(String)
      });
    });

    it('Должен заменять булку при добавлении новой', () => {
      const firstAdd = burgerConstructorReducer(
        initialState,
        addConstructorItem(mockBun)
      );
      const newBun = { ...mockBun, _id: '4', name: 'Новая булка' };
      const result = burgerConstructorReducer(
        firstAdd,
        addConstructorItem(newBun)
      );

      expect(result.items.bun).toEqual({
        ...newBun,
        id: expect.any(String)
      });
      expect(result.items.ingredients).toEqual([]);
    });
  });

  describe('Удаление ингредиентов', () => {
    it('Должен удалять начинку', () => {
      const stateWithIngredients = {
        items: {
          bun: mockBun,
          ingredients: [mockIngredient, mockIngredient2]
        },
        loading: false,
        order: null,
        error: undefined
      };

      const action = removeConstructorItem(mockIngredient);
      const result = burgerConstructorReducer(stateWithIngredients, action);

      expect(result.items.ingredients).toHaveLength(1);
      expect(result.items.ingredients[0]).toEqual(mockIngredient2);
    });

    it('Не должен изменять состояние при удалении несуществующего ингредиента', () => {
      const initialState = {
        items: {
          bun: mockBun,
          ingredients: [mockIngredient]
        },
        loading: false,
        order: null,
        error: undefined
      };

      const nonExistingIngredient = { ...mockIngredient2, id: '999' };
      const result = burgerConstructorReducer(
        initialState,
        removeConstructorItem(nonExistingIngredient)
      );

      expect(result).toEqual(initialState);
    });
  });

  describe('Изменение порядка ингредиентов', () => {
    it('Должен корректно менять порядок ингредиентов', () => {
      const initialState = {
        items: {
          bun: mockBun,
          ingredients: [mockIngredient, mockIngredient2]
        },
        loading: false,
        order: null,
        error: undefined
      };

      const newOrder = [mockIngredient2, mockIngredient];
      const action = updateConstructorIngredients(newOrder);
      const result = burgerConstructorReducer(initialState, action);

      expect(result.items.ingredients).toEqual(newOrder);
      expect(result.items.bun).toEqual(mockBun);
    });

    it('Должен корректно обрабатывать пустой массив', () => {
      const initialState = {
        items: {
          bun: mockBun,
          ingredients: [mockIngredient]
        },
        loading: false,
        order: null,
        error: undefined
      };

      const action = updateConstructorIngredients([]);
      const result = burgerConstructorReducer(initialState, action);

      expect(result.items.ingredients).toEqual([]);
    });
  });

  describe('Очистка конструктора', () => {
    it('Должен полностью очищать конструктор', () => {
      const initialState = {
        items: {
          bun: mockBun,
          ingredients: [mockIngredient, mockIngredient2]
        },
        loading: false,
        order: null,
        error: undefined
      };

      const result = burgerConstructorReducer(initialState, clearConstructor());

      expect(result.items.bun).toBeNull();
      expect(result.items.ingredients).toEqual([]);
      expect(result.order).toBeNull();
      expect(result.error).toBeUndefined();
    });
  });
});
