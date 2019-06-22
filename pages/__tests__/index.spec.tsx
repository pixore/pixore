import 'jest-dom/extend-expect';
import React from 'react';
import Index from '../index';
import { render } from '@testing-library/react';

describe('pages/index', () => {
  it('should render a title', () => {
    const { getByText } = render(<Index />);
    expect(getByText('Pixore')).toBeInTheDocument();
  });
});
