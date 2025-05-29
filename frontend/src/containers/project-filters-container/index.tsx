'use client';
import React from 'react';
import styled from 'styled-components';

const FiltersBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 24px 0;
`;

const Select = styled.select`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

interface ProjectFiltersProps {
  language: string;
  setLanguage: (lang: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  languageOptions: string[];
}

export const ProjectFiltersContainer: React.FC<ProjectFiltersProps> = ({
  language,
  setLanguage,
  sort,
  setSort,
  languageOptions,
}) => {
  return (
    <FiltersBar>
      <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {languageOptions.map((lang) => (
          <option key={lang} value={lang}>
            Language: {lang}
          </option>
        ))}
      </Select>

      <Select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="most_stars">Sort: Most stars</option>
        <option value="fewest_stars">Sort: Fewest stars</option>
        <option value="most_forks">Sort: Most forks</option>
        <option value="fewest_forks">Sort: Fewest forks</option>
        <option value="most_trending">Sort: Trending today</option>
      </Select>
    </FiltersBar>
  );
};
