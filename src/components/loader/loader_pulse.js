import pulse from "../../assets/animation/heart_pulse.lottie";
import '@dotlottie/player-component';

export default function Loaderpulse(){
return(
    <dotlottie-player
    style={{ width: "200px" }}
    src={pulse}
    autoplay
    loop
>

</dotlottie-player>
)
}