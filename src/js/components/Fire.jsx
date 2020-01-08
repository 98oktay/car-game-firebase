import React from "react";

export default class Fire extends React.Component {

    render() {
        const {direction, position} = this.props;
        return <div className={`bullet`}
                    style={{transform: `translateY(${position.y*100}px) translateX(${position.x*100}px)`}}>
            <div className={`bullet-direction bullet-direction-${direction}`}>
                <div className={"bullet-fire"}/>
            </div>
        </div>
    }
}
