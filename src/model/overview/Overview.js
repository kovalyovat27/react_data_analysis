import React, {Component} from "react";

export default class Overview extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props !== nextProps;
    }

    render() {
        const {filesInfo} = this.props;
        console.warn();
        return (
            <div>
                {filesInfo.map(data => data.fileName)}
            </div>
        );
    }
}