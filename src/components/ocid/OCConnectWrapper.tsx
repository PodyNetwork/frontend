'use client'
import { OCConnect } from '@opencampus/ocid-connect-js';
import { ReactNode } from 'react';


export default function OCConnectWrapper({ children, opts, sandboxMode }: { children: ReactNode, opts: any, sandboxMode: boolean }) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}