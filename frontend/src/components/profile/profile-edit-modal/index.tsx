'use client';
import { UserProfile } from '@/types';
import React, { useState, useRef } from 'react';

interface ProfileEditModalProps {
  profile: UserProfile;
  customName: string;
  customBio: string;
  selectedRepos: string[];
  selectedCommits: string[];
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
  onRepoSelection: (repoName: string) => void;
  onCommitSelection: (commitSha: string) => void;
  onSave: () => void;
  onCancel: () => void;
  avatarPreview: string | null;
  onAvatarFileChange: (file: File | null) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  profile,
  customName,
  customBio,
  selectedRepos,
  selectedCommits,
  onNameChange,
  onBioChange,
  onRepoSelection,
  onCommitSelection,
  onSave,
  onCancel,
  avatarPreview,
  onAvatarFileChange
}) => {
  const [showRepos, setShowRepos] = useState(false);
  const [showCommits, setShowCommits] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onAvatarFileChange(file);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      {/* File input at modal root for robust ref */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarInputChange}
        style={{ display: 'none' }}
      />
      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: 32,
        maxWidth: 800,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        {/* Avatar Edit Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <label
            htmlFor="profile-avatar-upload"
            title="Click to change profile picture"
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              border: '4px solid white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={avatarPreview || profile.avatar}
              alt={profile.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1,
                transition: 'opacity 0.2s',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            >
              <div style={{
                fontSize: 32,
                color: 'white',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                📷
              </div>
            </div>
          </label>
          <input
            id="profile-avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarInputChange}
            style={{ display: 'none' }}
          />
          <span style={{ color: '#007bff', fontSize: 14 }}>Click the avatar to change your profile picture</span>
        </div>
        <h2 style={{ 
          fontSize: 28, 
          fontWeight: 700, 
          color: '#212529',
          margin: '0 0 24px 0',
          textAlign: 'center'
        }}>
          Edit Profile
        </h2>

        {/* Name and Bio Section */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontWeight: 600, 
              color: '#495057',
              fontSize: 16
            }}>
              Name:
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => onNameChange(e.target.value)}
              style={{
                width: '100%',
                fontSize: 16,
                padding: 12,
                border: '2px solid #e9ecef',
                borderRadius: 12,
                fontFamily: 'inherit',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontWeight: 600, 
              color: '#495057',
              fontSize: 16
            }}>
              Bio:
            </label>
            <textarea
              value={customBio}
              onChange={(e) => onBioChange(e.target.value)}
              rows={3}
              placeholder="Tell us about yourself..."
              style={{
                width: '100%',
                fontSize: 16,
                padding: 12,
                border: '2px solid #e9ecef',
                borderRadius: 12,
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
        </div>

        {/* Repository Selection */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ 
            fontSize: 20, 
            fontWeight: 600, 
            color: '#212529',
            margin: '0 0 16px 0'
          }}>
            Repositories
          </h3>
          <button
            type="button"
            onClick={() => setShowRepos(v => !v)}
            style={{
              marginBottom: 12,
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #007bff',
              background: showRepos ? '#007bff' : 'white',
              color: showRepos ? 'white' : '#007bff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            {showRepos ? 'Hide' : 'Choose Repositories'}
          </button>
          {showRepos && (
            <>
              {selectedRepos.length >= 3 && (
                <p style={{ fontSize: 14, color: '#28a745', marginBottom: 8, fontWeight: 600 }}>
                  ✓ 3 repositories selected
                </p>
              )}
              <div style={{ 
                maxHeight: 200, 
                overflowY: 'auto', 
                border: '2px solid #e9ecef', 
                padding: 16, 
                borderRadius: 12,
                background: '#f8f9fa'
              }}>
                {profile.topRepos.map((repo, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: 12,
                    padding: 12,
                    borderRadius: 8,
                    background: selectedRepos.includes(repo.name) ? '#e3f2fd' : 'transparent'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedRepos.includes(repo.name)}
                      onChange={() => onRepoSelection(repo.name)}
                      disabled={!selectedRepos.includes(repo.name) && selectedRepos.length >= 3}
                      style={{ 
                        marginRight: 12,
                        transform: 'scale(1.2)',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#212529' }}>{repo.name}</div>
                      <div style={{ fontSize: 13, color: '#6c757d' }}>{repo.description}</div>
                    </div>
                    <div style={{ fontSize: 13, color: '#ffc107', fontWeight: 600, marginLeft: 12 }}>
                      ⭐ {repo.stars}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Commit Selection */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ 
            fontSize: 20, 
            fontWeight: 600, 
            color: '#212529',
            margin: '0 0 16px 0'
          }}>
            Commits
          </h3>
          <button
            type="button"
            onClick={() => setShowCommits(v => !v)}
            style={{
              marginBottom: 12,
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #007bff',
              background: showCommits ? '#007bff' : 'white',
              color: showCommits ? 'white' : '#007bff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            {showCommits ? 'Hide' : 'Choose Commits'}
          </button>
          {showCommits && (
            <>
              {selectedCommits.length >= 3 && (
                <p style={{ fontSize: 14, color: '#28a745', marginBottom: 8, fontWeight: 600 }}>
                  ✓ 3 commits selected
                </p>
              )}
              <div style={{ 
                maxHeight: 200, 
                overflowY: 'auto', 
                border: '2px solid #e9ecef', 
                padding: 16, 
                borderRadius: 12,
                background: '#f8f9fa'
              }}>
                {profile.commits.map((commit, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: 12,
                    padding: 12,
                    borderRadius: 8,
                    background: selectedCommits.includes(commit.sha) ? '#e3f2fd' : 'transparent'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedCommits.includes(commit.sha)}
                      onChange={() => onCommitSelection(commit.sha)}
                      disabled={!selectedCommits.includes(commit.sha) && selectedCommits.length >= 3}
                      style={{ 
                        marginRight: 12,
                        transform: 'scale(1.2)',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#212529' }}>{commit.message}</div>
                      <div style={{ fontSize: 13, color: '#6c757d' }}>{commit.repo}</div>
                    </div>
                    <div style={{ fontSize: 13, color: '#007bff', fontWeight: 600, marginLeft: 12 }}>
                      {commit.sha}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          justifyContent: 'center',
          marginTop: 32,
          paddingTop: 24,
          borderTop: '2px solid #e9ecef'
        }}>
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
        </div>
      </div>
    </div>
  );
}; 