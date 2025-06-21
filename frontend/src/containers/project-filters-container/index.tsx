'use client';
import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';

const FiltersBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 32px 0;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(88, 166, 255, 0.05) 100%
    );
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const SearchInput = styled.input`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 14px 16px 14px 48px;
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}20;
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent}40;
    transform: translateY(-1px);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  transition: all 0.3s ease;
  z-index: 1;

  ${SearchInput}:focus ~ & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SelectContainer = styled.div`
  position: relative;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const Select = styled.select`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 14px 16px 14px 48px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}20;
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent}40;
    transform: translateY(-1px);
  }

  option {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    padding: 8px;
  }
`;

const SelectIcon = styled.div<{ icon: React.ReactNode }>`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  transition: all 0.3s ease;
  z-index: 1;
  display: flex;
  align-items: center;

  ${Select}:focus ~ & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FilterLabel = styled.div`
  position: absolute;
  top: -8px;
  left: 12px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: ${({ theme }) => theme.fonts.mono};
  z-index: 2;
`;

const ActiveFilters = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const ActiveFilter = styled.span`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}20 0%,
    rgba(255, 107, 107, 0.2) 100%
  );
  color: ${({ theme }) => theme.colors.accent};
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 20px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  font-family: ${({ theme }) => theme.fonts.mono};
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent}30 0%,
      rgba(255, 107, 107, 0.3) 100%
    );
    transform: translateY(-1px);
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 12px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.mono};

  &:hover {
    background: rgba(255, 107, 107, 0.1);
    transform: scale(1.1);
  }
`;

interface ProjectFiltersProps {
  language: string;
  setLanguage: (lang: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  languageOptions: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProjectFiltersContainer: React.FC<ProjectFiltersProps> = ({
  language,
  setLanguage,
  sort,
  setSort,
  languageOptions,
  searchQuery,
  setSearchQuery,
}) => {
  const clearFilters = () => {
    setLanguage('All');
    setSort('most_stars');
    setSearchQuery('');
  };

  const hasActiveFilters =
    language !== 'All' || sort !== 'most_stars' || searchQuery.trim() !== '';

  return (
    <FiltersBar>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, descriptions, or tags..."
        />
        <SearchIcon />
      </SearchContainer>

      <SelectContainer>
        <FilterLabel>Language</FilterLabel>
        <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Select>
        <SelectIcon icon={<FaFilter />}>
          <FaFilter />
        </SelectIcon>
      </SelectContainer>

      <SelectContainer>
        <FilterLabel>Sort By</FilterLabel>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="most_stars">Most Stars</option>
          <option value="fewest_stars">Fewest Stars</option>
          <option value="most_forks">Most Forks</option>
          <option value="fewest_forks">Fewest Forks</option>
          <option value="most_trending">Trending Today</option>
        </Select>
        <SelectIcon icon={<FaSort />}>
          <FaSort />
        </SelectIcon>
      </SelectContainer>

      {hasActiveFilters && (
        <ActiveFilters>
          {language !== 'All' && (
            <ActiveFilter>
              Language: {language}
              <ClearButton onClick={() => setLanguage('All')}>×</ClearButton>
            </ActiveFilter>
          )}
          {sort !== 'most_stars' && (
            <ActiveFilter>
              Sort: {sort.replace('_', ' ')}
              <ClearButton onClick={() => setSort('most_stars')}>×</ClearButton>
            </ActiveFilter>
          )}
          {searchQuery.trim() !== '' && (
            <ActiveFilter>
              Search: "{searchQuery}"
              <ClearButton onClick={() => setSearchQuery('')}>×</ClearButton>
            </ActiveFilter>
          )}
          <ActiveFilter>
            <ClearButton onClick={clearFilters}>Clear All</ClearButton>
          </ActiveFilter>
        </ActiveFilters>
      )}
    </FiltersBar>
  );
};
