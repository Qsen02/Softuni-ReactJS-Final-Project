import { Component } from "react";

import styles from "./status404/Status404.module.css"

export default class ErrorBoundry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(err) {
        return { hasError: true, message: err.message };
    }

    render() {
        if (this.state.hasError) {
            this.state.hasError=false;
            return (
                <div className={styles.errorWrapper}>
                    <h1>Something went wrong!</h1>
                    <p>Please return to <a href="/">HOME</a></p>
                </div>
            )
        }

        return this.props.children;
    }
}