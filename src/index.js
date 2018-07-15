// @flow

import React from 'react';

function renderPropsHOC<
    ContextProps: any,
    InjectedProps: {},
    Com: React$ComponentType<*>,
>(
    Consumer: React$ComponentType<{ children: ContextProps => React$Node }>,
    getPropsFromState: ContextProps => InjectedProps,
): Com => React$ComponentType<$Diff<React$ElementConfig<Com>, InjectedProps>> {
    // eslint-disable-next-line func-names
    return function(Component) {
        // eslint-disable-next-line react/display-name, func-names
        return function(rest) {
            return (
                <Consumer>
                    {context => (
                        <Component {...getPropsFromState(context)} {...rest} />
                    )}
                </Consumer>
            );
        };
    };
}

export default renderPropsHOC;
