import React from "react";
import { PhoneBook } from "./phonebook";

export const App = () => {
  return (
    <div
       style={{
         height: '100vh',
        display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
        fontSize: 40,
         color: '#010101'
    }}
    >
      <PhoneBook/>
    </div>
  );
};