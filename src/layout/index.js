import React, { useContext } from 'react';
import { userContext } from '../context/authContext';
import NavBar from './navbar';
import Forms from './forms';
import FloatingActionButtonSize from '../components/FloatButton';

export default function Layout({ children }) {
  const { user } = useContext(userContext);
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {user ? <NavBar user={user} /> : null}
      {user ? (
        <div
          style={{
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            paddingTop: 64,
          }}
        >
          <div
            style={{ display: 'flex', flex: '1 1 auto', overflow: 'hidden' }}
          >
            <div style={{ flex: '1 1 auto', height: '100%', overflow: 'auto' }}>
              {children}
              <FloatingActionButtonSize />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <Forms />
          {children}
          <FloatingActionButtonSize />
        </div>
      )}
    </div>
  );
}
