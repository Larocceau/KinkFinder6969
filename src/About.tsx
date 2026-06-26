export type AboutProps = {
    continue: () => void
}


export function About(props: AboutProps) {

    return <>
        <h2>Sexual and triggering themes</h2>
        <p>This website contains sexual themes, and themes that may be triggering (for example bondage and Consentual Non-Consent). Thread with caution.</p>

        <h2>What is KinkFinder 6969?</h2>
        <p>KinkFinder 6969 is a way for couples to find out about sexual (and non-sexual) interests of their partner. After both independently giving your attitude towards a sequence of prompts, you'll get an overview of things you both are excited about or open to. The site purposefully only lists items you both are at least open to, so if you feel awkward about being into something, your partner will only know if they are also open to it.</p>
        <h2>About consent and respect</h2>
        <p>The goal of this app is to find out things that you are both interested it; the goal is <b>not</b> to replace verbal consent. I strongly encourage discussing what you expect out of using the site before filling out the questionnaires. Think about things like "What does it mean for me to be open to something?". Remember that people can change their minds, and exploration of your sexuality should always happen in a safe space, where 'no' (our a safe word you agreed on) means 'no'.</p>
        <p>Even though I encourage openness about your sexual preferences and fantasies, it can feel uncomfortable to express your interest in certain kinks and fantasies. I therefore suggest filling out the forms individually, and to not watch as your partner fills it out. Keep in mind that if something does not show up in the final overview, that does not mean that your partner was not interested; be careful in posing judgement about things discussed in the questionnaires. </p>

        <h2>
            Contributing
        </h2>
        <p>Check out the <a href="https://github.com/Larocceau/KinkFinder6969">GitHub repository</a> if you want to contribute to this website. In particular, new prompts are always welcome!</p>

        <button onClick={(_) => props.continue()}>Proceed to the website</button>
    </>

}