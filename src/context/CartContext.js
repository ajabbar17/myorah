"use client"
// context/CartContext.js
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item._id === action.payload._id && 
        // For rings, check both id and size
        (item.category === 'ring' ? item.selectedSize === action.payload.selectedSize : true)
      );

      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + action.payload.quantity
        };
        return {
          ...state,
          items: newItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + (action.payload.discountedPrice * action.payload.quantity)
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + action.payload.quantity,
        totalAmount: state.totalAmount + (action.payload.discountedPrice * action.payload.quantity)
      };

    case 'REMOVE_FROM_CART':
      const { itemId, size } = action.payload;
      const updatedItems = state.items.filter(item => {
        if (item.category === 'ring') {
          return !(item._id === itemId && item.selectedSize === size);
        }
        return item._id !== itemId;
      });
      
      const removedItem = state.items.find(item => {
        if (item.category === 'ring') {
          return item._id === itemId && item.selectedSize === size;
        }
        return item._id === itemId;
      });
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - removedItem.quantity,
        totalAmount: state.totalAmount - (removedItem.discountedPrice * removedItem.quantity)
      };

    case 'UPDATE_QUANTITY':
      const itemToUpdateIndex = state.items.findIndex(item => {
        if (item.category === 'ring') {
          return item._id === action.payload.id && item.selectedSize === action.payload.size;
        }
        return item._id === action.payload.id;
      });
      
      if (itemToUpdateIndex >= 0) {
        const item = state.items[itemToUpdateIndex];
        const quantityDiff = action.payload.quantity - item.quantity;
        const newItems = [...state.items];
        newItems[itemToUpdateIndex] = {
          ...item,
          quantity: action.payload.quantity
        };

        return {
          ...state,
          items: newItems,
          totalItems: state.totalItems + quantityDiff,
          totalAmount: state.totalAmount + (item.discountedPrice * quantityDiff)
        };
      }
      return state;

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { 
        ...product, 
        quantity,
        selectedSize: product.category === 'ring' ? selectedSize : null 
      }
    });
  };

  const removeFromCart = (productId, size = null) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { itemId: productId, size }
    });
  };

  const updateQuantity = (productId, quantity, size = null) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity, size }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalAmount: state.totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};