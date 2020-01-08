import React from "react";
import Player from "./Player.jsx";
import Fire from "./Fire.jsx";
import firebase from 'firebase/app';
import {FIREBASE_CONFIG} from "./config";
import 'firebase/database';


const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
const database = firebaseApp.database();
export default class Game extends React.Component {

    state = {
        cars: [],
        fires: []
    };


    componentDidMount() {

        this.carsRef = database.ref("/cars");
        this.firesRef = database.ref("/fires");
        this.firesRef.remove();

        if (localStorage.getItem("playerId")) {
            this.playerId = localStorage.getItem("playerId");
            this.playerRef = this.carsRef.child(this.playerId)
        } else {
            this.initNewPlayer()
        }


        this.firesRef.on("value", (snapshot) => {
            const fires = [];
            snapshot.forEach(function (item) {
                fires.push({
                    ...item.val(),
                    id: item.key
                });
            });
            this.setState({
                fires: [...fires]
            })
        });
        this.carsRef.on("value", (snapshot) => {
            const cars = [];
            snapshot.forEach(function (item) {
                cars.push({
                    ...item.val(),
                    id: item.key
                });
            });
            this.setState({
                cars: [...cars]
            })
        });

    }

    initNewPlayer = () => {

        this.carsRef.once("value", (snapshot) => {
            let cars = snapshot.val();

            if (!cars) {
                cars = []
            }
            this.playerId = this.carsRef.push({
                model: Math.floor(Math.random() * 6),
                position: {x: 3, y: 6},
                rotation: 90
            }).getKey();
            this.playerRef = this.carsRef.child(this.playerId);
            localStorage.setItem("playerId", this.playerId);
            this.playerRef.update({
                direction: 90
            });
            this.forceUpdate();
        })


    };
    addFire = (position, direction) => {
        const fireKey = this.firesRef.push({
            position,
            direction,
            playerId: this.playerId
        }).getKey();
        /*
        setTimeout(()=>{
            this.firesRef.child(fireKey).remove();
        },2000) */
    };

    render() {
        const {cars, fires} = this.state;

        return <><h4>Listing</h4>
            <div className="card border-success game-area">

                {cars.map((item, key) => {
                    const isMe = item.id === this.playerId;
                    return <Player me={isMe} playerRef={isMe ? this.playerRef : null} key={key} {...item}
                                   onFire={this.addFire}/>
                })}

                {fires.map((item, key) => {
                    return <Fire key={key} {...item}/>
                })}

            </div>
        </>
    }
}
