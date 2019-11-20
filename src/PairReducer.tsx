import { trimAndFormat } from './utils';

export default function reducer(state: Array<string>, action: { type: string, payload: { value?: string, index?: number } }) {
  const { type, payload } = action;
  switch (type) {
    case 'append': {
      const { value } = payload;
      if (value === undefined) {
        return state;
      }
      state.push(trimAndFormat(value));
      return state.slice(0);
    }
    case 'remove': {
      const { index } = payload;
      if (index === undefined) {
        return state;
      }
      if (index >= state.length) { return state; }
      state.splice(index, 1);
      return state.slice(0);
    }
    case 'update': {
      const { index, value } = payload;
      if (index === undefined || value === undefined) {
        return state;
      }
      state.splice(index, 1, trimAndFormat(value));
      return state.slice(0);
    }
    case 'clear':
      return state.length > 0 ? [] : state;
    default:
      return state;
  }
}