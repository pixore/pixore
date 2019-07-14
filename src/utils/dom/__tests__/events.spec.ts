import { fireEvent } from '@testing-library/dom';
import { manageEvents as $ } from '../events';

describe('$.on', () => {
  it('should attach an event handler', () => {
    const button = document.createElement('button');
    const handler = jest.fn();
    $(button).on('click', handler);

    fireEvent.click(button);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  describe('when a name space is provided', () => {
    it('should attach an event handler', () => {
      const button = document.createElement('button');
      const firstHandler = jest.fn();
      const secondHandler = jest.fn();
      $(button).on('click', firstHandler, 'test');
      $(button).on('click', secondHandler);

      fireEvent.click(button);

      expect(firstHandler).toHaveBeenCalledTimes(1);
      expect(secondHandler).toHaveBeenCalledTimes(1);
    });
  });
});

describe('$.off', () => {
  it('should remove an attached handler', () => {
    const button = document.createElement('button');
    const handler = jest.fn();
    const handlerInNameSpace = jest.fn();
    $(button).on('click', handler);
    $(button).on('click', handlerInNameSpace, 'test');
    $(button).off('click', { handler });
    $(button).off('click', { handler: handlerInNameSpace, nameSpace: 'test' });

    fireEvent.click(button);

    expect(handler).toHaveBeenCalledTimes(0);
  });

  describe('when no option is provided', () => {
    it('should remove all the handlers', () => {
      const button = document.createElement('button');
      const firstHandler = jest.fn();
      const secondHandler = jest.fn();
      $(button)
        .on('click', firstHandler)
        .on('click', secondHandler)
        .on('click', firstHandler, 'test')
        .on('click', secondHandler, 'test')
        .off('click');

      fireEvent.click(button);

      expect(firstHandler).toHaveBeenCalledTimes(0);
      expect(secondHandler).toHaveBeenCalledTimes(0);
    });
  });

  describe('when a name space is provided', () => {
    it('should remove only the handlers in the given name space', () => {
      const button = document.createElement('button');
      const firstHandler = jest.fn();
      const secondHandler = jest.fn();
      const handlerInFirstNameSpace = jest.fn();
      const handlerInSecondNameSpace = jest.fn();
      $(button)
        .on('click', firstHandler)
        .on('click', secondHandler)
        .on('click', handlerInFirstNameSpace, 'fist')
        .on('click', handlerInSecondNameSpace, 'second')
        .off('click', { nameSpace: 'fist' });

      fireEvent.click(button);

      expect(firstHandler).toHaveBeenCalledTimes(1);
      expect(secondHandler).toHaveBeenCalledTimes(1);
      expect(handlerInFirstNameSpace).toHaveBeenCalledTimes(0);
      expect(handlerInSecondNameSpace).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the handler is not attached', () => {
    it('should do nothing', () => {
      const button = document.createElement('button');
      const handler = jest.fn();
      $(button).off('click', { handler });

      fireEvent.click(button);

      expect(handler).toHaveBeenCalledTimes(0);
    });
  });
  describe('$.offOn', () => {
    it('should remove all the handler before attaching the new one', () => {
      const button = document.createElement('button');
      const fistHandler = jest.fn();
      const handlerInFirstNameSpace = jest.fn();
      const newHandler = jest.fn();
      $(button)
        .on('click', fistHandler)
        .on('click', handlerInFirstNameSpace, 'test')
        .offOn('click', newHandler);

      fireEvent.click(button);

      expect(fistHandler).toHaveBeenCalledTimes(0);
      expect(handlerInFirstNameSpace).toHaveBeenCalledTimes(0);
      expect(newHandler).toHaveBeenCalledTimes(1);
    });

    describe('when a name space is provided', () => {
      it('should remove only the handlers in the given name space', () => {
        const button = document.createElement('button');
        const fistHandler = jest.fn();
        const handlerInFirstNameSpace = jest.fn();
        const newHandler = jest.fn();
        $(button)
          .on('click', fistHandler)
          .on('click', handlerInFirstNameSpace, 'test')
          .offOn('click', newHandler, 'test');

        fireEvent.click(button);

        expect(fistHandler).toHaveBeenCalledTimes(1);
        expect(handlerInFirstNameSpace).toHaveBeenCalledTimes(0);
        expect(newHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
