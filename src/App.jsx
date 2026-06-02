import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import "./App.css";

const images = {
  hero: "/villa-antonio.jpg",
  exterior: "/villa-home-1.jpg",
  libeccio: "/libeccio-home.jpg",
  libeccioHover: "/libeccio-hover.jpg",
  grecale: "/grecale-home.jpg",
  grecaleHover: "/grecale-hover.jpg",
  detail: "/villa-home-2.jpg",
  galleryOne: "/villa-home-3.jpg",
  galleryTwo: "/villa-antonio.jpg",
  galleryThree: "/villa-antonio.jpg",
};

const airbnbLinks = {
  Libeccio: "https://www.airbnb.it/",
  Grecale: "https://www.airbnb.it/",
};

const apartments = [
  {
    name: "Libeccio",
    subtitle: "Ampio appartamento per famiglie e gruppi",
    guests: "Fino a 9 ospiti",
    rooms: "2 camere",
    beds: "5 posti letto",
    baths: "2 bagni",
    image: images.libeccio,
hoverImage: images.libeccioHover,
description:
      "Una soluzione spaziosa e indipendente, ideale per famiglie e gruppi numerosi che desiderano vivere Villa Antonio con privacy, comfort e ambienti luminosi vicino ad Alghero.",
    link: airbnbLinks.Libeccio,
  },
  {
    name: "Grecale",
    subtitle: "Eleganza e comfort per soggiorni rilassanti",
    guests: "Fino a 5 ospiti",
    rooms: "2 camere",
    beds: "3 posti letto",
    baths: "2 bagni",
    image: images.grecale,
hoverImage: images.grecaleHover,
description:
      "Un alloggio accogliente e confortevole, perfetto per famiglie o piccoli gruppi che cercano tranquillità, cura dei dettagli e una posizione comoda per esplorare il territorio.",
    link: airbnbLinks.Grecale,
  },
];

const services = [
  "Giardino",
  "Terrazza",
  "Wi-Fi gratuito",
  "Aria condizionata",
  "Alloggi indipendenti",
  "Parcheggio privato",
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
          <strong>NURAS Villa Antonio</strong>
          <span>Santa Maria la Palma</span>
        </a>

        <nav className="navLinks">
          <a href="#villa">La Villa</a>
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
        <small>Villa Antonio</small>
      </div>

      <a href="#villa" onClick={() => setMenuOpen(false)}>
        <span>01</span>
        La Villa
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
              <h3>NURAS Villa Antonio</h3>
              <p>Appartamenti a Santa Maria la Palma, a pochi minuti da Alghero.</p>
            </div>

            <div className="footerLinks">
              <a href="#villa">La Villa</a>
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
        alt="Villa Antonio piscina e giardino"
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
          Villa Antonio
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
            <p className="kicker">La struttura</p>
            <h2 className="title">
              Un rifugio privato tra la quiete di Santa Maria la Palma e il mare di Alghero.
            </h2>
            <p className="lead">
              NURAS Villa Antonio è un complesso di appartamenti indipendenti,
              pensato per chi cerca spazio, comfort e tranquillità durante il
              soggiorno nel nord-ovest della Sardegna.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="introPanel">
            <p>
              La proprietà si trova a Santa Maria la Palma, in una posizione
              riservata e strategica: a pochi minuti da Alghero, dalle spiagge
              della Riviera del Corallo e a circa 11 km dal Nuraghe di Palmavera.
            </p>

            <div className="introStats">
              <div>
                <strong>2</strong>
                <span>Alloggi indipendenti</span>
              </div>
              <div>
                <strong>9</strong>
                <span>Ospiti max</span>
              </div>
              <div>
                <strong>11 km</strong>
                <span>Dal Nuraghe di Palmavera</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="container introImageGrid">
        <FadeIn delay={0.08} className="introImage large">
          <img src={images.exterior} alt="Esterni di Villa Antonio" />
        </FadeIn>

        <FadeIn delay={0.2} className="introImage small">
          <img src={images.detail} alt="Dettaglio degli spazi esterni" />
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
              Due soluzioni spaziose, indipendenti e pensate per sentirsi a casa.
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
                    alt={`NURAS Villa Antonio ${apartment.name}`}
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
                  <p className="apartmentLabel">NURAS Villa Antonio</p>
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
                    Verifica disponibilità su Airbnb
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
            <p className="kicker light">Comfort & servizi</p>
            <h2 className="title lightTitle">
              Tutto il necessario per un soggiorno lento, comodo e riservato.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="experienceText">
            <p>
              Ogni alloggio è progettato per offrire autonomia e comfort:
              ambienti spaziosi, aria condizionata, Wi-Fi gratuito e zone
              esterne dove vivere la giornata all’aperto.
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
            <img src={images.galleryOne} alt="Villa Antonio Santa Maria la Palma" />
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="territoryContent">
            <p className="kicker">La località</p>
            <h2 className="title">
              Santa Maria la Palma: natura, silenzio e Alghero a portata di mano.
            </h2>
            <p className="lead">
              Una base ideale per esplorare il territorio: spiagge, percorsi
              naturalistici, cantine, borghi e siti archeologici sono facilmente
              raggiungibili dalla struttura.
            </p>

            <div className="territoryList">
              <div>
                <strong>Alghero</strong>
                <span>Centro storico, porto e ristoranti a pochi minuti.</span>
              </div>
              <div>
                <strong>Riviera del Corallo</strong>
                <span>Spiagge, calette e mare cristallino nelle vicinanze.</span>
              </div>
              <div>
                <strong>Nuraghe di Palmavera</strong>
                <span>Uno dei luoghi storici più importanti della zona, a circa 11 km.</span>
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
            Scegli l’appartamento più adatto al tuo viaggio.
          </h2>
          <p>
            Le disponibilità e le tariffe aggiornate sono consultabili dagli
            annunci ufficiali Airbnb di Libeccio e Grecale.
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
                <small>Apri annuncio Airbnb →</small>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

