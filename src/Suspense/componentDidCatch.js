import React from 'react';

const SYMBOL_CACHE = Symbol('cache');

// determine whether an object is promise
// determine if an object is promsie
const isPromiseObject = (obj) => !!obj && typeof obj.then === 'function';

export const createFetcher = (promiseTask) => {
    let ref = SYMBOL_CACHE;
    // when first time run, it will throw the promise
    // when in the second or subsequent, it will return the corresponding value
    return () => {
        const task = promiseTask();
        task.then(r => {
            ref = r;
        });
        if (ref === SYMBOL_CACHE) {
            throw task;
        }
        return ref;
    }
};

export default class Suspense extends React.Component {
    _isMounted = false;

    state = {
        isLoding: false,
    };

    static getDerivedStateFromError(error) {
        return { isLoading: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        if(this._isMounted && isPromiseObject(error)) {
            this.setState({
                isLoading: true,
            });
            error.then(e => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                    });
                } else {
                    throw error('')
                }
            }).catch(e => {
                this.setState({
                    isLoading: true
                });
            });
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        const { isLoading } = this.state;

        const {
            callback = <div>数据加载中</div>,
            children
        } = this.props;

        if (isLoading) {
            return callback;
        } else {
            return children;
        }
    }
}




