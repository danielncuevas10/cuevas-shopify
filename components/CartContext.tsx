"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";

type CartItem = {
  variantId: string;
  title: string;
  image?: string;
  price?: string | number;
  quantity: number;
  size?: string;
};

type State = { items: CartItem[]; isOpen: boolean };
type Action =
  | {
      type: "ADD_ITEM";
      payload: { variantId: string; item: Omit<CartItem, "variantId"> };
    }
  | { type: "REMOVE_ITEM"; payload: { variantId: string } }
  | { type: "SET_QUANTITY"; payload: { variantId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_STATE"; payload: Partial<State> }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" };

const initialState: State = { items: [], isOpen: false };

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM": {
      const { variantId, item } = action.payload;
      const existing = state.items.find((i) => i.variantId === variantId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: i.quantity + item.quantity, size: item.size }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { variantId, ...item }] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => i.variantId !== action.payload.variantId
        ),
      };
    case "SET_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.variantId === action.payload.variantId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) {
        const items = JSON.parse(raw);
        dispatch({ type: "SET_STATE", payload: { items } });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useCartState() {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("useCartState must be used inside CartProvider");
  return ctx;
}
export function useCartDispatch() {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error("useCartDispatch must be used inside CartProvider");
  return ctx;
}
