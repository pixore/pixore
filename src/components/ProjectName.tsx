import React from 'react';
import styled from '@emotion/styled';
import VisuallyHidden from '@reach/visually-hidden';

const Input = styled.input`
  background: transparent;
  border: 0;
  font-size: 1.2rem;
  max-width: 7rem;
  padding: 0 4px;
  color: #d8dee9;
  vertical-align: text-top;
`;

const ProjectName = () => {
  return (
    <>
      <VisuallyHidden>
        <label htmlFor="project-name">project name</label>
      </VisuallyHidden>

      <Input defaultValue="New Project" id="project-name" />
    </>
  );
};

export default ProjectName;
