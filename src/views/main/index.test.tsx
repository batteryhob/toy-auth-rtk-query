


import { render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import Main from './';

test('입력 폼을 랜더링 한다.', () => {
  const { getByText } = render(<Provider store={store}><Router><Main/></Router></Provider>);
  expect(getByText('이름')).toBeInTheDocument();
  expect(getByText('휴대폰 번호')).toBeInTheDocument();
  expect(getByText('주민등록번호')).toBeInTheDocument();
});

test('입력 폼에 벨리데이션을 통과하면, 버튼이 활성화 된다. 이후, 버튼을 클릭하면 모달이 보여진다.', async ()=>{
    const { getByRole } = render(<Provider store={store}><Router><Main/></Router></Provider>);

    const name = getByRole('input_name');
    const phone = getByRole('input_phone');
    const birth = getByRole('input_birth');
    const backnumber = getByRole('input_backnumber');

    fireEvent.change(name, {target: {value: '김점삼'}});
    fireEvent.change(phone, {target: {value: '01087155076'}});
    fireEvent.change(birth, {target: {value: '861230'}});
    fireEvent.change(backnumber, {target: {value: '1409311'}});

    const validate = getByRole('btn_validate');
    expect(validate).not.toHaveClass('disabled');

    await fireEvent.click(validate);

    expect(screen.getByRole('modal_main')).toHaveClass('on');
});