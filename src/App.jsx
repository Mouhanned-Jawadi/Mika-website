import { useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {
  FaArrowRight,
  FaHeart,
  FaInstagram,
  FaLanguage,
  FaPhoneAlt,
  FaShoppingBag,
  FaWhatsapp,
} from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

import logo from './assets/logo_mika.jpg'
import image0 from './assets/image.png'
import prod1 from '../assets/prod1.jpeg'
import prod2 from '../assets/prod2.jpeg'
import prod3 from '../assets/prod3.jpeg'
import prod4 from '../assets/prod4.jpeg'
import prod5 from '../assets/prod5.jpeg'
import prod6 from '../assets/prod6.jpeg'

const instagramUrl = 'https://www.instagram.com/queenbags_mika/?hl=fr'
const whatsappUrl = 'https://wa.me/21629043226'

const products = [
  { id: 1, image: prod1, price: '145 TND' },
  { id: 2, image: prod2, price: '125 TND' },
  { id: 3, image: prod3, price: '159 TND' },
  { id: 4, image: prod4, price: '138 TND' },
  { id: 5, image: prod5, price: '149 TND' },
  { id: 6, image: prod6, price: '132 TND' },
]

const content = {
  en: {
    nav: ['Home', 'Gallery', 'Marketplace', 'Contact'],
    heroTitle: 'Handmade elegance for every queen.',
    heroText:
      'QueensBags creates feminine handmade bags with premium fabrics, crafted details, and modern silhouettes inspired by your daily rhythm.',
    heroPrimary: 'Shop on Instagram',
    heroSecondary: 'Create custom order',
    storyTitle: 'Built by hand, styled with heart.',
    storyText:
      'Every piece is carefully assembled in small batches to keep quality high and each design unique. We blend soft tones, golden accents, and practical layouts for women who love both style and function.',
    galleryTitle: 'Gallery',
    galleryText: 'A curated look at our latest handmade drops.',
    marketTitle: 'Mini Marketplace',
    marketText:
      'Browse signature pieces. For orders, continue on Instagram or send your custom command in our contact form.',
    marketPrimary: 'Order via Instagram',
    marketSecondary: 'Use contact form',
    contactTitle: 'Contact QueensBags',
    contactText:
      'Send your custom command and we will get back with colors, availability, and delivery details.',
    labels: {
      name: 'Full name',
      email: 'Email',
      message: 'Your command',
      send: 'Send request',
    },
    toast: {
      ig: 'Opening Instagram for your order.',
      prefill: 'Product command prepared in contact form.',
      invalid: 'Please complete all contact fields.',
      sent: 'Thanks! Your request was prepared successfully.',
    },
    quickContact: 'Quick contact',
  },
  fr: {
    nav: ['Accueil', 'Galerie', 'Marche', 'Contact'],
    heroTitle: 'Des sacs faits main pour chaque reine.',
    heroText:
      'QueensBags cree des sacs feminins faits main avec des tissus premium, des finitions raffinees et un style moderne.',
    heroPrimary: 'Commander sur Instagram',
    heroSecondary: 'Commande personnalisee',
    storyTitle: 'Fait a la main, pense avec amour.',
    storyText:
      'Chaque piece est preparee en petite serie pour garder une qualite elevee et un design unique. Un melange de tons doux, de details dores et de praticite.',
    galleryTitle: 'Galerie',
    galleryText: 'Une selection de nos creations handmade recentes.',
    marketTitle: 'Mini Marche',
    marketText:
      'Parcourez nos modeles. Pour commander, passez sur Instagram ou envoyez votre commande personnalisee via le formulaire.',
    marketPrimary: 'Commander via Instagram',
    marketSecondary: 'Aller au formulaire',
    contactTitle: 'Contacter QueensBags',
    contactText:
      'Envoyez votre commande personnalisee et nous repondons avec les couleurs, la disponibilite et la livraison.',
    labels: {
      name: 'Nom complet',
      email: 'Email',
      message: 'Votre commande',
      send: 'Envoyer',
    },
    toast: {
      ig: 'Ouverture de la page Instagram.',
      prefill: 'Commande pre-remplie dans le formulaire.',
      invalid: 'Merci de remplir tous les champs.',
      sent: 'Merci! Votre demande a bien ete envoyee.',
    },
    quickContact: 'Contact rapide',
  },
}

function App() {
  const [lang, setLang] = useState('en')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const t = useMemo(() => content[lang], [lang])

  const handleOpenInstagram = () => {
    toast.success(t.toast.ig)
    window.open(instagramUrl, '_blank', 'noopener,noreferrer')
  }

  const handleUseFormForProduct = (productId) => {
    const nextMessage =
      lang === 'fr'
        ? `Bonjour QueensBags, je veux commander le modele #${productId}.`
        : `Hello QueensBags, I want to order model #${productId}.`

    setForm((prev) => ({ ...prev, message: nextMessage }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    toast.success(t.toast.prefill)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(t.toast.invalid)
      return
    }

    toast.success(t.toast.sent)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-ink">
      <Toaster position="top-right" toastOptions={{ duration: 2200 }} />

      <header className="sticky top-0 z-30 border-b border-brand-gold/30 bg-brand-ivory/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <img
              src={logo}
              alt="QueensBags logo"
              className="h-11 w-11 rounded-full border border-brand-gold/50 object-cover"
            />
            <span className="font-display text-xl tracking-wide">QueensBags</span>
          </a>

          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#home" className="nav-link">
              {t.nav[0]}
            </a>
            <a href="#gallery" className="nav-link">
              {t.nav[1]}
            </a>
            <a href="#marketplace" className="nav-link">
              {t.nav[2]}
            </a>
            <a href="#contact" className="nav-link">
              {t.nav[3]}
            </a>
          </nav>

          <button
            type="button"
            className="rounded-full border border-brand-berry/30 bg-white px-3 py-2 text-sm font-semibold text-brand-berry transition hover:-translate-y-0.5 hover:shadow-glow"
            onClick={() => setLang((prev) => (prev === 'en' ? 'fr' : 'en'))}
          >
            <span className="inline-flex items-center gap-2">
              <FaLanguage /> {lang === 'en' ? 'FR' : 'EN'}
            </span>
          </button>

          <nav className="flex w-full gap-2 overflow-x-auto pb-1 md:hidden">
            <a href="#home" className="mobile-nav-link">
              {t.nav[0]}
            </a>
            <a href="#gallery" className="mobile-nav-link">
              {t.nav[1]}
            </a>
            <a href="#marketplace" className="mobile-nav-link">
              {t.nav[2]}
            </a>
            <a href="#contact" className="mobile-nav-link">
              {t.nav[3]}
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6">
          <div className="hero-blob hero-blob-left" />
          <div className="hero-blob hero-blob-right" />

          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div className="reveal-up space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-rose">
                <FaHeart className="text-brand-berry" /> Handmade feminine bags
              </p>
              <h1 className="font-display text-4xl leading-tight text-brand-ink sm:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="max-w-xl text-brand-muted">{t.heroText}</p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleOpenInstagram}
                  className="btn-primary"
                >
                  <FaInstagram /> {t.heroPrimary}
                </button>
                <a href="#contact" className="btn-secondary">
                  <FaArrowRight /> {t.heroSecondary}
                </a>
              </div>
            </div>

            <div className="reveal-up relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-brand-gold/30 blur-2xl" />
              <img
                src={image0}
                alt="QueensBags handmade design"
                className="relative w-full rounded-[2rem] border border-brand-gold/30 object-cover shadow-soft"
              />
            </div>
          </div>
        </section>

        <section className="section-wrap">
          <div className="reveal-up mx-auto w-full max-w-5xl rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-white via-brand-blush/40 to-brand-ivory p-8 shadow-soft">
            <h2 className="font-display text-3xl text-brand-ink">{t.storyTitle}</h2>
            <p className="mt-3 text-brand-muted">{t.storyText}</p>
          </div>
        </section>

        <section id="gallery" className="section-wrap">
          <div className="mx-auto w-full max-w-6xl">
            <div className="reveal-up mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl text-brand-ink">{t.galleryTitle}</h2>
                <p className="mt-2 text-brand-muted">{t.galleryText}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((item, index) => (
                <article
                  key={item.id}
                  className="reveal-up group overflow-hidden rounded-3xl border border-brand-gold/30 bg-white"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <img
                    src={item.image}
                    alt={`QueensBags gallery item ${item.id}`}
                    loading="lazy"
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="marketplace" className="section-wrap">
          <div className="mx-auto w-full max-w-6xl">
            <div className="reveal-up mb-8">
              <h2 className="font-display text-3xl text-brand-ink">{t.marketTitle}</h2>
              <p className="mt-2 max-w-3xl text-brand-muted">{t.marketText}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {products.slice(0, 6).map((item) => (
                <article
                  key={`market-${item.id}`}
                  className="reveal-up rounded-3xl border border-brand-gold/30 bg-white p-4 shadow-soft"
                >
                  <img
                    src={item.image}
                    alt={`QueensBags product ${item.id}`}
                    loading="lazy"
                    className="h-56 w-full rounded-2xl object-cover"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-display text-2xl text-brand-ink">Queen #{item.id}</h3>
                    <span className="rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold text-brand-berry">
                      {item.price}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2">
                    <button
                      type="button"
                      onClick={handleOpenInstagram}
                      className="btn-primary !justify-center"
                    >
                      <FaInstagram /> {t.marketPrimary}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseFormForProduct(item.id)}
                      className="btn-secondary !justify-center"
                    >
                      <HiOutlineMail /> {t.marketSecondary}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-wrap pb-20">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="reveal-up rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-soft">
              <h2 className="font-display text-3xl text-brand-ink">{t.contactTitle}</h2>
              <p className="mt-2 text-brand-muted">{t.contactText}</p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-brand-rose">
                {t.quickContact}
              </h3>
              <div className="mt-4 grid gap-3 text-sm">
                <a className="quick-link" href={instagramUrl} target="_blank" rel="noreferrer">
                  <FaInstagram /> Instagram
                </a>
                <a className="quick-link" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <FaWhatsapp /> WhatsApp
                </a>
                <a className="quick-link" href="mailto:queenbags.mika@gmail.com">
                  <HiOutlineMail /> queenbags.mika@gmail.com
                </a>
                <a className="quick-link" href="tel:+216-29043226">
                  <FaPhoneAlt /> +216-29043226
                </a>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="reveal-up rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-soft"
            >
              <div className="grid gap-4">
                <label className="label-block">
                  <span>{t.labels.name}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="input-field"
                    placeholder="Sara Queen"
                  />
                </label>

                <label className="label-block">
                  <span>{t.labels.email}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="input-field"
                    placeholder="name@email.com"
                  />
                </label>

                <label className="label-block">
                  <span>{t.labels.message}</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                    className="input-field min-h-32"
                    placeholder="Queen #2 in berry with gold strap"
                  />
                </label>

                <button type="submit" className="btn-primary !justify-center">
                  <FaShoppingBag /> {t.labels.send}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-gold/30 bg-white/60 px-4 py-5 text-center text-sm text-brand-muted sm:px-6">
        QueensBags - Handmade feminine bags for modern queens.
      </footer>
    </div>
  )
}

export default App
