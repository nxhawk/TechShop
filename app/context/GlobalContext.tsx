'use client';

import React, { createContext, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MyCart } from '@/models/product';
import { User } from 'next-auth';
import { usePathname } from 'next/navigation';
import { Loading } from 'notiflix';

interface ContextProps {
  user?: User;
  myCart?: MyCart;
  setMyCart?: React.Dispatch<React.SetStateAction<MyCart | undefined>>;
  updateMyCart?: () => Promise<void>;
  removeAllCart?: () => Promise<void>;
  isOutOfStock?: boolean;
}

const GlobalContext = createContext<ContextProps>({});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [myCart, setMyCart] = useState<MyCart>();
  const [user, setUser] = useState<User>();
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.includes('/cart')) {
      Loading.dots();
    }
    if (session.status == 'authenticated') {
        setUser(session?.data?.user);
        updateMyCart();
    }
    if (pathname.includes('/cart')) {
        Loading.remove();
    }
  },[session.data?.user, session.status, pathname])

  async function updateMyCart() {
    try {
      const res = await fetch('/api/user/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      setMyCart(data?.data);
      checkOutOfStock();
    } catch (error) {
      console.log(error);
    }
  }

  function checkOutOfStock() {
    const products = myCart?.CartItem ?? [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].quantity > products[i].Product.quantity) {
            setIsOutOfStock(true);
            return;
        }
    }
    setIsOutOfStock(false);
  }

  async function removeAllCart() {
    try {
      const listItem = myCart?.CartItem ?? [];
      for (let i = 0; i < listItem.length; i++) {
          await fetch(`/api/user/cart/${listItem[i].id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
      }
      await updateMyCart();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <GlobalContext.Provider
        value={{
            user: user,
            myCart: myCart,
            setMyCart: setMyCart,
            updateMyCart: updateMyCart,
            removeAllCart: removeAllCart,
            isOutOfStock: isOutOfStock,
        }}
    >
        {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);