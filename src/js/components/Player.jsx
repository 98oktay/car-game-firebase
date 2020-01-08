import React from "react";

export default class Player extends React.Component {

    state = {
        direction: this.props.direction || 0,
        rotation: this.props.direction || 0,
        position: this.props.position || {x: 0, y: 0},
    };

    componentDidMount() {
        if (this.props.me) {
            document.body.onkeydown = this.keyDownHandler
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!this.props.me) {
            if (JSON.stringify(this.state.position) !== JSON.stringify(nextProps.position) || JSON.stringify(this.state.rotation) !== JSON.stringify(nextProps.rotation)) {
                this.setState({
                    position: {...nextProps.position},
                    rotation: nextProps.rotation
                })

            }
        }
        return true;
    }

    keyDownHandler = (event) => {

        switch (event.keyCode) {
            case 37:
                this.setState(({rotation: prevRotation}) => {
                    const {rotation, direction} = this.rotateCar(prevRotation, -1);
                    return {
                        direction,
                        rotation
                    }
                });
                break;
            case 39:
                this.setState(({rotation: prevRotation}) => {
                    const {rotation, direction} = this.rotateCar(prevRotation, 1);
                    return {
                        direction,
                        rotation
                    }
                });
                break;
            case 38:
                this.setState(({position, direction}) => {
                    position = this.moveCar(position, direction, -1);
                    return {
                        position: {...position}
                    }
                });
                break;
            case 40:
                this.setState(({position, direction}) => {
                    position = this.moveCar(position, direction, 1);
                    return {
                        position: {...position}
                    }
                });
                break;
            case 32:
                const {direction, position} = this.state;

                this.props.onFire(position, direction);

        }
    };

    rotateCar = (rotation, direction) => {
        rotation = rotation + 90 * direction;
        if (this.props.playerRef) {
            this.props.playerRef.update({
                rotation
            })
        }
        return {
            direction: (720 + rotation % 360) % 360,
            rotation
        }
    };
    moveCar = (position, direction, amount) => {
        let {x, y} = position;

        if (direction === 0) {
            y += amount;
        }
        if (direction === 90) {
            x -= amount;
        }

        if (direction === 180) {
            y -= amount;
        }

        if (direction === 270) {
            x += amount;
        }

        x = Math.max(0, Math.min(x, 900));
        y = Math.max(0, Math.min(y, 900));

        if (this.props.playerRef) {
            this.props.playerRef.update({
                position: {x, y}
            })
        }
        return {x, y}
    };


    render() {
        const {direction, rotation, position} = this.state;
        return <div className={`car car-direction-${direction}`}
                    style={{transform: `translateY(${position.y * 100}px) translateX(${position.x * 100}px)`}}>
            <div className={`car-body car-body-model-${this.props.model || 1}`}
                 style={{transform: `rotate(${rotation}deg)`}}/>
        </div>
    }
}
