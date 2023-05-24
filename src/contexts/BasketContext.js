import { createContext, useState } from 'react';

export const BasketContext = createContext(null);

export const BasketContextProvider = ({children}) =>{
    let initialBasketData = JSON.parse(localStorage.getItem("Basket"));

    const [basket, setbasket] = useState(initialBasketData??[])
    {if(basket.length>0){
        localStorage.setItem("Basket",JSON.stringify(basket))
    }else{
        localStorage.removeItem("Basket")
    }}

    const isInBasket = (id) => {
        return basket.some(product => product.id == id)
      };

    const handleAddRemove = (product) =>{
        if(isInBasket(product.id)){
            const removedBasket = basket.filter(item => item.id != product.id)
            setbasket(removedBasket)
        }else{
            setbasket([...basket,product])
        }
    }
    const values = {
        basket,
        setbasket,
        isInBasket,
        handleAddRemove
    }

    
    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    

}
