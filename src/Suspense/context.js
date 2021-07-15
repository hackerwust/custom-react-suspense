import React from 'react';

const SYMBOL_CACHE = Symbol('cache');
const noop = () => {};


export const SuspenseContext = React.createContext({
    getTaskValue: noop
});

export const createFetcher = (promiseTask) => {
    let ref = SYMBOL_CACHE;
    // when first time run, it will throw the promise
    // when in the second or subsequent, it will return the corresponding value
    return () => {
        return (
            <SuspenseContext.Consumer>
                 {
                    ({getTaskValue}) => {
                        const task = promiseTask();
                        task.then(result => {
                            ref = result;
                        });
                        if (ref === SYMBOL_CACHE) {
                            getTaskValue(task);
                            return null;
                        } else {
                            return ref;
                        }

                    }
                }
            </SuspenseContext.Consumer>
        )
    }
};

export default class Suspense extends React.Component {
    _isMounted = true;

    state = {
        isLoading: false,
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    getTaskValue = (value) => {
        if (!this._isMounted) {
            return;
        }

        this.setState({
            isLoading: true
        });


        if (typeof value.then === 'function') {
            value.then(r => {
                this.setState({
                    isLoading: false
                });
            });
        }
    };


    render() {
        const { isLoading } = this.state;

        const {
            callback = <div>数据加载中</div>,
            children
        } = this.props;


        const childComponent = isLoading ? callback : children;

        console.log('rending loading', isLoading);
        return (
            <SuspenseContext.Provider value={{
                getTaskValue: this.getTaskValue,
            }}>
                {childComponent}
            </SuspenseContext.Provider>
        );
    }
}




