import { Component } from "react";

import styles from "./status404/Status404.module.css"

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isError: false
        };
    }

    static getDerivedStateFromError(err) {
        return { isError: true, message: err.message };
    }

    render() {
        if (this.state.isError) {
            this.state.isError = false;
            return (
                <div className={styles.message}>
                    <h2>Something went wrong</h2>
                    <p>Please return to <a href="/">HOME</a></p>
                </div>
            )
        }
        return this.props.children;
    }

}