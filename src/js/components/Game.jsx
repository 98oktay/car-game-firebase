import React from "react";
import Player from "./Player.jsx";
import Fire from "./Fire.jsx";

export default class Game extends React.Component {

    state = {

        cars: [
            {
                model: 1,
                position: {x: 3, y: 6},
                direction: 90
            },
            {
                model: 2,
                position: {x: 9, y: 3},
                direction: 0
            }

        ],
        fires: []
    };

    addFire = (position, direction) => {
        this.setState(({fires}) => {
            fires.push({
                position,
                direction
            });
            return {
                fires
            }
        });

    };

    render() {
        const {cars, fires} = this.state;

        return <><h4>Listing</h4>
            <div className="card border-success game-area">

                {cars.map((item, key) => {
                    return <Player me={key===0} key={key} {...item} onFire={this.addFire}/>
                })}

                {fires.map((item, key) => {
                    return <Fire key={key} {...item}/>
                })}

            </div>
        </>
    }
}
