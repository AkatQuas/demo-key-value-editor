import React, { useReducer, useState } from 'react';
import { Button, Input, Divider, Typography } from 'antd';
import './App.css';
import { checkFormat, printList } from './utils';
import PairItem from './PairItem';
import PairReducer from './PairReducer';;

function App() {
  const [state, dispatch] = useReducer(PairReducer, []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [temp, setTemp] = useState('');

  const appendOnePair = (pair: string) => {
    const valid = checkFormat(pair);
    if (valid) {
      dispatch({ type: 'append', payload: { value: pair } });
      setTemp('');
      setInputVisible(false);
      setInputError(false);
    } else {
      setInputError(true);
    }
  }

  return (
    <div className="App">
      <div>
        <label>自定义搜索项：</label>
        {
          state.map((item, idx) => (
            <PairItem
              key={item + idx}
              value={item}
              index={idx}
              dispatch={dispatch}
            />
          ))
        }
        {
          inputVisible ? (
            <span className={'input-length' + (inputError ? ' has-error' : '')}>
              <Input
                type="text"
                size="small"
                placeholder="请输入 key=value ，回车确认"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                onPressEnter={() => appendOnePair(temp)}
              />
            </span>
          ) : (
              <Button
                size="small"
                type="dashed"
                icon="plus"
                onClick={() => setInputVisible(true)}
              >添加</Button>
            )
        }
      </div>
      <div className="buttons">
        <Button type="primary" onClick={() => printList(state)}>查询</Button>
        <Button onClick={() => dispatch({ type: 'clear', payload: {} })}>清空</Button>
      </div>
      <Divider />
      <Typography.Title level={4}>Feel Free to play like the following pictures shows.</Typography.Title>
      <img src={process.env.PUBLIC_URL + '/layout.png'} alt="" />
      <img src={process.env.PUBLIC_URL + '/add_delete.gif'} alt="" />
      <img src={process.env.PUBLIC_URL + '/edit.gif'} alt="" />
    </div>
  );
}

export default App;
