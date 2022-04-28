import React from 'react';
import styled from '@emotion/styled';
import VisuallyHidden from '@reach/visually-hidden';
import { useSprite, useSpriteActions } from '../contexts/Sprite';

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
  const { renameSprite } = useSpriteActions();
  const { name: spriteName } = useSprite();
  const [name, setName] = React.useState(spriteName);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const onFocus = () => {
    setIsEditing(true);
  };

  const onBlur = () => {
    renameSprite(name);
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  React.useEffect(() => {
    setIsDisabled(!isEditing && spriteName !== name);
  }, [spriteName, name, isEditing]);

  return (
    <>
      <VisuallyHidden>
        <label htmlFor="project-name">project name</label>
      </VisuallyHidden>

      <Input
        autoComplete="off"
        disabled={isDisabled}
        value={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        id="project-name"
      />
    </>
  );
};

export default ProjectName;
