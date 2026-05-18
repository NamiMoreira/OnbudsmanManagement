import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '420px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;