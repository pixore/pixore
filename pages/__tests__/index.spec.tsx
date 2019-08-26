import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Index from '../index';
import { render } from '@testing-library/react';

describe.skip('pages/index', () => {
  it('should render a title', () => {
    const { getByText } = render(<Index />);
    expect(getByText('Pixore')).toBeInTheDocument();
  });
});
