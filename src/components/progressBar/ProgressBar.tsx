import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import "./ProgressBar.scss"
const signal = require("../../assets/audio/signal.mp3")

function ProgressBar(props: {duration: number, color: string, onFinish: () => void}) {
    const progressLine: MutableRefObject<HTMLDivElement> = useRef({} as HTMLDivElement)
    const [time, setTime] = useState("00:00")

    useEffect(() => {
        progressLine.current.style.setProperty("--duration", props.duration + "s")
        let duration = props.duration * 1000
        setTime(getTime(duration))

        const interval = setInterval(() => {
            duration -= 1000
            setTime(getTime(duration))

            if(!duration) {
                clearInterval(interval)
                const sound = new Audio(signal)
                sound.play()
                props.onFinish()
            }
        }, 1000)
    }, [])

    function getTime(milliseconds: number): string {
        return new Date(milliseconds).getMinutes() + ":" +new Date(milliseconds).getSeconds()
    }

    return (
        <div className={"progress-bar"}>
            <div className={"progress-bar__arc-container flex flex-column"}>
                <svg className={"progress-bar__arc-container__arc"} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="clip">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0 111C0 49.6964 49.6964 0 111 0C172.304 0 222 49.6964 222 111H205C205 59.0852 162.915 17 111 17C59.0852 17 17 59.0852 17 111H0Z"
                                  fill="#2AB027"/>
                        </clipPath>
                    </defs>
                </svg>

                <div ref={progressLine} className={"progress-bar__arc-container__progress-line"} style={{background: props.color}}/>
                <div className={"progress-bar__arc-container__bg"} />
            </div>
            <div className={"progress-bar__timer"}>
                <span>{time}</span>
            </div>
        </div>
    )
}

export default ProgressBar
