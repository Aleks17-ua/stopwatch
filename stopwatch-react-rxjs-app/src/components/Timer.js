import React from "react";

export default function Timer({ time }){
    const timeFormat = value => `0${Math.floor(value)}`.slice(-2);
    const h = time / 3600;
    const m = (time % 3600) / 60
    const s = time % 60;

    return (
        <div>
            {[h, m, s].map(timeFormat).join(':')}
        </div>
    )
}