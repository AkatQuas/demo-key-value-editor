import React, { useState } from 'react';
import { Input, Tag } from 'antd';
import { checkFormat } from './utils';

export default function OnePair(props: {
  value: string,
  index: number,
  dispatch: React.Dispatch<{ type: string, payload: { value?: string, index?: number } }>,
}) {
  const [inputVisible, setInputVisible] = useState(false);
  const [temp, setTemp] = useState(props.value);
  const [inputError, setInputError] = useState(false);
  const update = (value: string) => {
    const valid = checkFormat(value);
    if (valid) {
      props.dispatch({ type: 'update', payload: { value, index: props.index } });
      setInputVisible(false);
      setTemp(value);
      setInputError(false);
    } else {
      setInputError(true);
    }
  }

  return inputVisible ? (
    <span className={'input-length' + (inputError ? ' has-error' : '')}>
      <Input
        type="text"
        size="small"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onPressEnter={() => update(temp)}
      />
    </span>
  ) : (
      <Tag
        closable
        onClick={() => setInputVisible(true)}
        onClose={() => props.dispatch({ type: 'remove', payload: { index: props.index } })}
      >{props.value}</Tag>
    )
}

