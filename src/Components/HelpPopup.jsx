import xMark from "../Components/Images/x-mark.png"
import line from "../Components/Images/line.png"

export default function HelpPopop({ setShowPopup }) {
    function handleClick() {
        setShowPopup(false)
    }

    return (
        <section className="popup-container">
            <img className="close-button" onClick={handleClick} src={xMark} />

            <section className="section-container">
                <h2>hello! thanks for using this app.</h2>
                <p>
                    ever wonder what pokemon have prankster, can learn tailwind, have a speed over 80, and are grass type?
                    or maybe pokemon that are red, have intimidate, and can learn dark pulse? or maybe just pokemon that are taller than 5 feet
                    and weigh over 500 pounds? me too!
                </p>
                <img src={line} />
            </section>
            <section className="section-container">
                <h2>type any description you want into the search bar!</h2>
                <p>
                    well, I guess not any. but most! look for megas, gigantamax, pokemon from alola, height, weight, colors, moves, abilities, regions, much more, and or any combination of them!
                    just type it in, and this handy dandy app will handle the rest! (hopefully)
                </p>
                <img src={line} />

            </section>
            <section className="section-container">
                <h2>click on a pokemon card to learn more.</h2>
                <p>
                    when results are displayed, you can click on each result to learn more! you'll get a short description, typing, and a brief stats card. you can even
                    click the stat card too, to take you to another page with more details.
                </p>
                <img src={line} />

            </section>
            <section className="section-container">
                <h2>some more notes...</h2>
                <p>
                    this site does cost some money to keep running, and since I'm a broke ahh college student, I'm using a free plan on Render
                    to keep my backend running. this means the first search may take some time to boot up, around a minute. after your initial search,
                    though, it should work pretty fast!
                </p>
                <img src={line} />

            </section>
            <section className="section-container">
                <h2>thanks to:</h2>
                <p>thanks to PokeAPI of course, as well as that one github with the 3d models. and to whoever thinks that this app might be helpful!</p>
            </section>
        </section>
    )
}