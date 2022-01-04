import React, { useReducer, useMemo } from 'react';
// import PropTypes from 'prop-types';

const initialState = [];

const initialContext = [[ ...initialState ], () => [ ] ];

export const DataContext = React.createContext(initialContext);

const updater = (state, update) => {
    return [ ...state, ...update ];
};

export default function DataController(props) {
    const [authState, updateAuth] = useReducer(updater, initialState);
    const value = useMemo(() => [authState, updateAuth], [authState]);

    return (
        <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
    );
}
