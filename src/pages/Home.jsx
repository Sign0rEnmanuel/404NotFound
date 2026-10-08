import Seo from '../components/Seo.jsx'
import Contact from '../components/sections/Contact.jsx'
import Hero from '../components/sections/Hero.jsx'
import Process from '../components/sections/Process.jsx'
import Projects from '../components/sections/Projects.jsx'
import Services from '../components/sections/Services.jsx'
import Stack from '../components/sections/Stack.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'

/** Landing principal. */
export default function Home() {
    return (
        <>
            <Seo page="home" />
            <Hero />
            <Services />
            <Process />
            <Projects />
            <Stack />
            <WhyUs />
            <Contact />
        </>
    )
}
