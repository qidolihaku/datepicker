import ReactDom from 'react-dom';
import React from 'react';
import DatePicker from './components/datepicker/index.jsx';
import DateInput from './components/common/date_input';




window.onload = function () {
    ReactDom.render(
        <DatePicker isRangeSelect={true} minSelectRange={5}>
                <div>
                <DateInput name="depart" type="text" placeholder="placeHolder" />
                <DateInput name="arrive" type="text" placeholder="placeHolder" />
                </div>
        </DatePicker>,
        document.getElementById('container')
    )
}


if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }
}
