import React from 'react';
import _ from 'lodash';

export const Tabs = (props) => {
    const tabs = _.filter(props.children, function(component) {
        return component.type === Tab;
    });

    const tabBodies = _.filter(props.children, function(component) {
        return component.type === TabBody;
    });

    return (
        <div>
            <ul className='nav nav-tabs'>
                { tabs }
            </ul>
            <div className='tab-content'>
                { tabBodies }
            </div>
        </div>
    )
};

export const TabBody = (props) => {
    const navTabBodyClass = `tab-pane ${ props.active }`;
    const navTabBodyId = `${ props.name }-tab-body`;

    return(
        <div className={ navTabBodyClass } id={ navTabBodyId } tabIndex='-1'>
            { props.children }
        </div>
    );
};

export const Tab = (props) => {
    const navTabClass = `${ props.name }-tab ${ props.active }`;
    const linkId = `${ props.name }-tab-link`;
    const tabBodyId = `#${ props.name }-tab-body`;

    return (
        <li className={ navTabClass }>
            <a className='nav-link' id={ linkId } href={ tabBodyId } tabIndex='0' data-toggle='tab'>
                { props.children }
            </a>
        </li>
    );
};



