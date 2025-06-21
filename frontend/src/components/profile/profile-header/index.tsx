'use client';
import Image from 'next/image';
import { useState } from 'react';
import { UserProfile } from '@/types';

interface ProfileHeaderProps {
  profile: UserProfile;
  customAvatar: string | null;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onAvatarClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  customAvatar,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onAvatarClick
}) => {
  const displayAvatar = customAvatar || profile.avatar;
  const [imageError, setImageError] = useState(false);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'flex-start', 
      gap: 32, 
      marginBottom: 48,
      padding: '32px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: 20,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      {/* Avatar Section */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            border: '4px solid white',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}
        >
          {!imageError ? (
            <Image
              src={displayAvatar}
              alt={profile.name}
              width={120}
              height={120}
              style={{
                objectFit: 'cover'
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <img
              src={displayAvatar}
              alt={profile.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ 
            fontSize: 36, 
            fontWeight: 700, 
            color: '#212529',
            margin: '0 0 8px 0',
            lineHeight: 1.2
          }}>
            {profile.name}
          </h1>
          {profile.bio && (
            <p style={{ 
              fontSize: 18, 
              color: '#6c757d', 
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 600
            }}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          {!isEditing ? (
            <button
              onClick={onEdit}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                border: '2px solid #007bff',
                background: 'linear-gradient(135deg, #007bff, #0056b3)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0,123,255,0.3)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={onSave}
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  border: '2px solid #28a745',
                  background: 'linear-gradient(135deg, #28a745, #1e7e34)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(40,167,69,0.3)';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.target as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                Save Changes
              </button>
              <button
                onClick={onCancel}
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
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.background = '#6c757d';
                  (e.target as HTMLButtonElement).style.color = 'white';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.target as HTMLButtonElement).style.background = 'white';
                  (e.target as HTMLButtonElement).style.color = '#6c757d';
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 