import React, { useState } from 'react';

export default function DialogWrapper({ children }) {
  return (
    <dialog open>
      {children}
    </dialog>
  );
}
