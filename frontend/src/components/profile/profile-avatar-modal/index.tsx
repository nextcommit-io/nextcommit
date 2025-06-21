'use client';
import { useRef } from 'react';

interface ProfileAvatarModalProps {
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export const ProfileAvatarModal: React.FC<ProfileAvatarModalProps> = ({
  onAvatarChange,
  onClose
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={(e) => {
        // Close modal if clicking outside the content area
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div style={{
        background: 'white',
        padding: 32,
        borderRadius: 16,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        minWidth: 400,
        maxWidth: 500,
        textAlign: 'center'
      }}>
        <h3 style={{ 
          margin: '0 0 24px 0', 
          fontSize: 24, 
          fontWeight: 600, 
          color: '#212529' 
        }}>
          Change Profile Picture
        </h3>
        <p style={{ 
          margin: '0 0 24px 0', 
          color: '#6c757d', 
          fontSize: 16,
          lineHeight: 1.5
        }}>
          Click below to select a new image for your profile picture
        </p>
        <label 
          style={{
            border: '2px dashed #dee2e6',
            borderRadius: 12,
            padding: 40,
            marginBottom: 24,
            background: '#f8f9fa',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'block'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLLabelElement).style.borderColor = '#007bff';
            (e.target as HTMLLabelElement).style.background = '#e3f2fd';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLLabelElement).style.borderColor = '#dee2e6';
            (e.target as HTMLLabelElement).style.background = '#f8f9fa';
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
          <p style={{ margin: 0, fontSize: 16, color: '#007bff', fontWeight: 600 }}>
            Click to select image
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#6c757d' }}>
            JPG, PNG, GIF up to 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            style={{ 
              display: 'none'
            }}
          />
        </label>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              border: '2px solid #6c757d',
              background: 'white',
              color: '#6c757d',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.background = '#6c757d';
              (e.target as HTMLButtonElement).style.color = 'white';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.background = 'white';
              (e.target as HTMLButtonElement).style.color = '#6c757d';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}; 