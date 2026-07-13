import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import "./App.css";

const images = {
  hero: "/lamarmorata.jpg",
  exterior: "/home-1.jpg",
  libeccio: "/room-home.jpg",
  libeccioHover: "/room-hover.jpg",
  grecale: "/room2-home.jpg",
  grecaleHover: "/room2-hover.jpg",
  detail: "/home-2.jpg",
  galleryOne: "/home-3.jpg",
  galleryTwo: "/villa-antonio.jpg",
  galleryThree: "/villa-antonio.jpg",
};

const airbnbLinks = {
  Libeccio: "https://www.airbnb.it/",
  Grecale: "https://www.airbnb.it/",
};

const apartments = [
  {
    name: "Appartamenti Comfort",
    subtitle: "Spazi pratici per coppie e famiglie",
    guests: "1 o 2 camere",
    rooms: "Angolo cottura",
    beds: "Spazio esterno",
    baths: "Bagno privato",
    image: images.libeccio,
hoverImage: images.libeccioHover,
description:
      "Appartamenti con angolo cottura, bagno privato e spazi esterni, ideali per chi desidera una vacanza semplice, comoda e indipendente a pochi passi dal mare.",
    link: airbnbLinks.Libeccio,
  },
  {
    name: "Appartamenti Vista Mare",
    subtitle: "Terrazze e panorami sulla costa",
    guests: "Fino a 3 camere",
    rooms: "Terrazza",
    beds: "Possibile vista mare",
    baths: "Ideale per famiglie",
    image: images.grecale,
hoverImage: images.grecaleHover,
description:
      "Soluzioni pensate per chi cerca più spazio e una posizione panoramica, con terrazze dove rilassarsi e godere dei colori del mare e della natura circostante.",
    link: airbnbLinks.Grecale,
  },
];

const services = [
  "Spiaggia attrezzata",
  "Ristorante pizzeria",
  "Bar",
  "Market",
  "Angolo cottura",
  "Terrazze esterne",
  "Vista mare",
  "Biglietteria marittima",
];

function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <main className="page">
      <header className={`nav ${isScrolled || menuOpen ? "isScrolled" : ""}`}>
        <a href="#" className="brand" onClick={() => setMenuOpen(false)}>
          <strong>La Marmorata Village</strong>
          <span>Santa Teresa Gallura</span>
        </a>

        <nav className="navLinks">
          <a href="#villa">Il Residence</a>
          <a href="#appartamenti">Appartamenti</a>
          <a href="#servizi">Servizi</a>
          <a href="#posizione">Posizione</a>
        </nav>

        <a href="#prenota" className="navCta">
          Prenota
        </a>

        <button
  className={`menuButton ${menuOpen ? "isOpen" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
>
  <span />
  <span />
</button>
      </header>

      {menuOpen && (
  <motion.div
    className="mobileMenuOverlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    <motion.nav
      className="mobileMenu"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mobileMenuTop">
        <span>Menu</span>
        <small>La Marmorata Village</small>
      </div>

      <a href="#villa" onClick={() => setMenuOpen(false)}>
        <span>01</span>
        Il Residence
      </a>

      <a href="#appartamenti" onClick={() => setMenuOpen(false)}>
        <span>02</span>
        Appartamenti
      </a>

      <a href="#servizi" onClick={() => setMenuOpen(false)}>
        <span>03</span>
        Servizi
      </a>

      <a href="#posizione" onClick={() => setMenuOpen(false)}>
        <span>04</span>
        Posizione
      </a>

      <a href="#prenota" onClick={() => setMenuOpen(false)} className="mobileMenuCta">
        Prenota ora
      </a>
    </motion.nav>
  </motion.div>
)}

      <Hero />

      <div className="contentShell">
        <VillaIntro />
        <ApartmentsSection />
        <VillaExperience />
        <TerritorySection />
        <BookingSection />

        <footer className="footer">
          <div className="footerInner">
            <div>
              <h3>La Marmorata Village</h3>
              <p>Residence sul mare a pochi minuti da Santa Teresa Gallura, nel nord Sardegna.</p>
            </div>

            <div className="footerLinks">
              <a href="#villa">Il Residence</a>
              <a href="#appartamenti">Appartamenti</a>
              <a href="#servizi">Servizi</a>
              <a href="#posizione">Posizione</a>
              <a href="#prenota">Prenota</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Hero() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.75], ["0%", "-28%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={heroRef} className="hero">
      <motion.img
        src={images.hero}
        alt="La Marmorata Village sul mare della Marmorata"
        className="heroImage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="heroShade" />

      <motion.div
        className="heroTitleWrap"
        initial={{ opacity: 0, y: 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 style={{ y: titleY, opacity: titleOpacity }}>
          La Marmorata Village
        </motion.h1>
      </motion.div>
    </section>
  );
}

function VillaIntro() {
  return (
    <section className="section villaIntro" id="villa">
      <div className="container introLayout">
        <FadeIn>
          <div className="introCopy">
            <p className="kicker">Il residence</p>
            <h2 className="title">
              Un residence immerso nella natura della Gallura, a pochi passi dal mare smeraldo della Marmorata.
            </h2>
            <p className="lead">
              La Marmorata Village si trova a pochi minuti da Santa Teresa Gallura,
              in una posizione riservata e panoramica, a circa 300 metri dalla
              Spiaggia Marmoratina.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="introPanel">
            <p>
              Affacciato su uno dei tratti più suggestivi del nord Sardegna, il residence
              accoglie gli ospiti in piccoli edifici integrati nel verde e nei colori
              della Gallura, con appartamenti indipendenti, terrazze esterne e,
              in molti casi, una splendida vista sul mare.
            </p>

            <div className="introStats">
              <div>
                <strong>300 m</strong>
                <span>Dalla Spiaggia Marmoratina</span>
              </div>
              <div>
                <strong>10 min</strong>
                <span>Da Santa Teresa Gallura</span>
              </div>
              <div>
                <strong>1-3</strong>
                <span>Camere disponibili</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="container introImageGrid">
        <FadeIn delay={0.08} className="introImage large">
          <img src={images.exterior} alt="Esterni de La Marmorata Village" />
        </FadeIn>

        <FadeIn delay={0.2} className="introImage small">
          <img src={images.detail} alt="Dettaglio del residence" />
        </FadeIn>
      </div>
    </section>
  );
}

function ApartmentsSection() {
  const [activeApartment, setActiveApartment] = useState(null);

  const activateApartment = (name) => {
    setActiveApartment(name);
  };

  const deactivateApartment = () => {
    setActiveApartment(null);
  };

  return (
    <section className="section apartmentsSection" id="appartamenti">
      <div className="container">
        <FadeIn>
          <div className="sectionHeader">
            <p className="kicker">Gli appartamenti</p>
            <h2 className="title">
              Soluzioni indipendenti, luminose e pensate per vivere il mare con libertà.
            </h2>
          </div>
        </FadeIn>

        <div className="apartmentsGrid">
          {apartments.map((apartment, index) => (
            <FadeIn key={apartment.name} delay={index * 0.12}>
              <article
                className={`apartmentCard ${
                  activeApartment === apartment.name ? "isTouchActive" : ""
                }`}
                onTouchStart={() => activateApartment(apartment.name)}
                onTouchMove={() => activateApartment(apartment.name)}
                onTouchEnd={deactivateApartment}
                onTouchCancel={deactivateApartment}
              >
                <div className="apartmentImage">
                  <img
                    src={apartment.image}
                    alt={`La Marmorata Village ${apartment.name}`}
                    className="apartmentPhoto apartmentPhotoMain"
                  />

                  {apartment.hoverImage && (
                    <img
                      src={apartment.hoverImage}
                      alt={`Seconda foto ${apartment.name}`}
                      className="apartmentPhoto apartmentPhotoHover"
                    />
                  )}

                  <span>{apartment.number}</span>
                </div>

                <div className="apartmentBody">
                  <p className="apartmentLabel">La Marmorata Village</p>
                  <h3>{apartment.name}</h3>
                  <p>{apartment.description}</p>

                  <div className="apartmentSpecs">
                    <span>{apartment.guests}</span>
                    <span>{apartment.rooms}</span>
                    <span>{apartment.beds}</span>
                    <span>{apartment.baths}</span>
                  </div>

                  <a
                    href={apartment.link}
                    target="_blank"
                    rel="noreferrer"
                    className="simpleLink"
                  >
                    Verifica disponibilità
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function VillaExperience() {
  return (
    <section className="section experienceSection" id="servizi">
      <div className="container experienceLayout">
        <FadeIn>
          <div>
            <p className="kicker light">Servizi & comfort</p>
            <h2 className="title lightTitle">
              Tutto il necessario per una vacanza comoda, rilassata e vicina al mare.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="experienceText">
            <p>
              La Marmorata Village offre servizi pensati per rendere il soggiorno semplice
              e piacevole: ristorante, bar, market, spiagge attrezzate e soluzioni
              pratiche per vivere ogni giornata senza rinunciare alla libertà di
              un appartamento indipendente.
            </p>

            <div className="serviceList">
              {services.map((service) => (
                <div key={service} className="serviceItem">
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TerritorySection() {
  return (
    <section className="section territorySection" id="posizione">
      <div className="container territoryLayout">
        <FadeIn>
          <div className="territoryImage">
            <img src={images.galleryOne} alt="La Marmorata Village Santa Teresa Gallura" />
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="territoryContent">
            <p className="kicker">La posizione</p>
            <h2 className="title">
              Tra Santa Teresa Gallura, spiagge dorate e acque color smeraldo.
            </h2>
            <p className="lead">
              Il residence si trova in una zona ideale per scoprire il nord Sardegna:
              Santa Teresa Gallura è raggiungibile in pochi minuti d’auto, mentre
              le spiagge della Marmorata e della Marmoratina permettono di vivere
              il mare ogni giorno con estrema comodità.
            </p>

            <div className="territoryList">
              <div>
                <strong>Spiaggia Marmoratina</strong>
                <span>Una piccola spiaggia di sabbia dorata, raggiungibile direttamente dall’interno del residence.</span>
              </div>
              <div>
                <strong>Spiaggia La Marmorata</strong>
                <span>Più ampia e attrezzata, ideale per famiglie, relax e giornate di mare.</span>
              </div>
              <div>
                <strong>Santa Teresa Gallura</strong>
                <span>Uno dei centri più amati del nord Sardegna, con porto, ristoranti, servizi e collegamenti.</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section className="bookingSection" id="prenota">
      <div className="container bookingPanel">
        <FadeIn>
          <p className="kicker light">Prenota il tuo soggiorno</p>
          <h2 className="title lightTitle">
            Vivi La Marmorata Village, tra mare, natura e comfort.
          </h2>
          <p>
            Scegli la soluzione più adatta alla tua vacanza e scopri disponibilità,
            servizi e tariffe aggiornate per il tuo soggiorno nel nord Sardegna.
          </p>
        </FadeIn>

        <div className="bookingCards">
          {apartments.map((apartment, index) => (
            <FadeIn key={apartment.name} delay={index * 0.12}>
              <a
                href={apartment.link}
                target="_blank"
                rel="noreferrer"
                className="bookingCard"
              >
                <span>{apartment.guests}</span>
                <strong>{apartment.name}</strong>
                <small>Scopri disponibilità →</small>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
