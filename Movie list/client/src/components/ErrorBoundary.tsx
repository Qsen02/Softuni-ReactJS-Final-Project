import { Component, ReactNode } from "react";

import styles from "./status404/Status404.module.css"

type ErrorBoundaryProps={
    children:ReactNode
}

type ErrorBoundaryState={
    hasError:boolean,
    message?:string
}

export default class ErrorBoundry extends Component<ErrorBoundaryProps,ErrorBoundaryState> {
    constructor(props:ErrorBoundaryProps) {
        super(props);

        this.state={
            hasError: false,
        }
    }

    static getDerivedStateFromError(err:{message:string}) {
        return { hasError: true, message: err.message };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.wrapper}>
                    <h1>Something went wrong!</h1>
                    <p>Please return to <a href="/">HOME</a></p>
                </div>
            )
        }

        return this.props.children;
    }
}