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

import logo from './assets/logo.png'
import promoVideo from './assets/pomelli_creative_video_9_16_0429.mp4'
import prod1 from '../assets/prod1.jpeg'
import prod2 from '../assets/prod2.jpeg'
import prod3 from '../assets/prod3.jpeg'
import prod4 from '../assets/prod4.jpeg'
import prod5 from '../assets/prod5.jpeg'
import prod6 from '../assets/prod6.jpeg'

import { ProductCarousel } from './components/ProductCarousel'

const instagramUrl = 'https://www.instagram.com/queenbags_mika/?hl=fr'
const whatsappUrl = 'https://wa.me/21629043226'

const products = [
  { id: 1, name: 'Queen #1', images: [prod1], price: '140 TND', instagramLink: instagramUrl },
  { id: 2, name: 'Queen #2', images: [prod2], price: '140 TND', instagramLink: instagramUrl },
  { id: 3, name: 'Queen #3', images: [prod3], price: '140 TND', instagramLink: instagramUrl },
  { id: 4, name: 'Queen #4', images: [prod4], price: '140 TND', instagramLink: instagramUrl },
  { id: 5, name: 'Queen #5', images: [prod5], price: '140 TND', instagramLink: instagramUrl },
  { id: 6, name: 'Queen #6', images: [prod6], price: '140 TND', instagramLink: instagramUrl },
]

const content = {
  en: {
    nav: ['Home', 'Video', 'Gallery', 'Marketplace', 'Contact'],
    heroTitle: 'Handmade elegance for every queen.',
    heroText:
      'QueensBags creates feminine handmade bags with premium fabrics, crafted details, and modern silhouettes inspired by your daily rhythm.',
    heroPrimary: 'Shop on Instagram',
    heroSecondary: 'Create custom order',
    storyTitle: 'Built by hand, styled with heart.',
    storyText:
      'Every piece is carefully assembled in small batches to keep quality high and each design unique. We blend soft tones, golden accents, and practical layouts for women who love both style and function.',
    videoTitle: 'Watch Our Craft',
    videoText: 'See the artistry behind every stitch — handmade with love.',
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
      sent: 'Thanks! Your request was sent. We will review shortly and answer as fast as possible!',
    },
    quickContact: 'Quick contact',
  },
  fr: {
    nav: ['Accueil', 'Vidéo', 'Galerie', 'Marche', 'Contact'],
    heroTitle: 'Des sacs faits main pour chaque reine.',
    heroText:
      'QueensBags cree des sacs feminins faits main avec des tissus premium, des finitions raffinees et un style moderne.',
    heroPrimary: 'Commander sur Instagram',
    heroSecondary: 'Commande personnalisee',
    storyTitle: 'Fait a la main, pense avec amour.',
    storyText:
      'Chaque piece est preparee en petite serie pour garder une qualite elevee et un design unique. Un melange de tons doux, de details dores et de praticite.',
    videoTitle: 'Regardez Notre Art',
    videoText: 'Découvrez l\'artisanat derrière chaque point — fait main avec amour.',
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
      sent: 'Merci! Votre demande a bien ete envoyee. Nous examinerons rapidement et repondrons au plus vite!',
    },
    quickContact: 'Contact rapide',
  },
}

function App() {
  const [lang, setLang] = useState('en')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const t = useMemo(() => content[lang], [lang])

  const handleOpenInstagram = (link = instagramUrl) => {
    toast.success(t.toast.ig)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const handleUseFormForProduct = (productName) => {
    const nextMessage =
      lang === 'fr'
        ? `Bonjour QueensBags, je veux commander le modele: ${productName}`
        : `Hello QueensBags, I want to order the model: ${productName}`

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

    const subject = encodeURIComponent(`QueensBags - Order from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:queenbags.mika@gmail.com?subject=${subject}&body=${body}`)
    toast.success(t.toast.sent)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-ink">
      <Toaster position="top-right" toastOptions={{ duration: 2200 }} />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-brand-gold/30 bg-brand-ivory/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="QueensBags logo"
              className="h-11 w-11 rounded-full border border-brand-gold/50 object-cover transition duration-300 group-hover:border-brand-berry/60 group-hover:shadow-glow"
            />
            <span className="font-display text-xl tracking-wide transition duration-200 group-hover:text-brand-berry">
              QueensBags
            </span>
          </a>

          <nav className="hidden gap-6 text-sm font-medium md:flex">
            {['#home', '#video', '#gallery', '#marketplace', '#contact'].map((href, i) => (
              <a key={href} href={href} className="nav-link">
                {t.nav[i]}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-full border border-brand-berry/30 bg-white px-3 py-2 text-sm font-semibold text-brand-berry transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-berry hover:text-white hover:shadow-glow"
            onClick={() => setLang((prev) => (prev === 'en' ? 'fr' : 'en'))}
          >
            <span className="inline-flex items-center gap-2">
              <FaLanguage /> {lang === 'en' ? 'FR' : 'EN'}
            </span>
          </button>

          {/* Mobile nav */}
          <nav className="flex w-full gap-2 overflow-x-auto pb-1 md:hidden">
            {['#home', '#video', '#gallery', '#marketplace', '#contact'].map((href, i) => (
              <a key={href} href={href} className="mobile-nav-link">
                {t.nav[i]}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
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
                <button type="button" onClick={() => handleOpenInstagram()} className="btn-primary">
                  <FaInstagram /> {t.heroPrimary}
                </button>
                <a href="#contact" className="btn-secondary">
                  <FaArrowRight /> {t.heroSecondary}
                </a>
              </div>
            </div>

            <div className="reveal-up relative mx-auto w-full max-w-md lg:max-w-none flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-brand-berry/10 blur-3xl animate-pulse" />
                <div
                  className="absolute h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-brand-gold/10 blur-2xl animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-berry/20 via-brand-gold/20 to-brand-berry/20 blur-xl group-hover:blur-2xl transition duration-500 opacity-75 group-hover:opacity-100" />
                <img
                  src={logo}
                  alt="QueensBags logo"
                  className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-brand-gold/40 object-cover shadow-soft transition duration-500 group-hover:scale-105 group-hover:border-brand-berry/50"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-wrap">
          <div className="reveal-up mx-auto w-full max-w-5xl rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-white via-brand-blush/40 to-brand-ivory p-8 shadow-soft transition-all duration-300 hover:shadow-glow hover:border-brand-berry/20">
            <h2 className="font-display text-3xl text-brand-ink">{t.storyTitle}</h2>
            <p className="mt-3 text-brand-muted">{t.storyText}</p>
          </div>
        </section>

        {/* Video */}
        <section id="video" className="section-wrap overflow-hidden">
          <div className="mx-auto w-full max-w-6xl">
            <div className="reveal-up mb-10 text-center">
              <h2 className="font-display text-3xl text-brand-ink">{t.videoTitle}</h2>
              <p className="mt-2 text-brand-muted">{t.videoText}</p>
            </div>

            <div className="flex justify-center">
              <div className="relative group w-full max-w-xs sm:max-w-sm">
                {/* Ambient glow */}
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-b from-brand-berry/25 via-brand-gold/15 to-brand-berry/25 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 scale-110" />

                {/* Decorative ring */}
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-brand-gold/50 via-brand-berry/30 to-brand-gold/50 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Video frame */}
                <div className="relative rounded-[1.75rem] overflow-hidden border-4 border-white/80 shadow-[0_20px_60px_rgba(178,67,102,0.25)] group-hover:shadow-[0_30px_80px_rgba(178,67,102,0.4)] transition-shadow duration-500 aspect-[9/16]">
                  <video
                    src={promoVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle top shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brand-gold/40 bg-brand-ivory/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-berry shadow-soft backdrop-blur">
                  QueensBags — Handmade
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="section-wrap">
          <div className="mx-auto w-full max-w-6xl">
            <div className="reveal-up mb-8">
              <h2 className="font-display text-3xl text-brand-ink">{t.galleryTitle}</h2>
              <p className="mt-2 text-brand-muted">{t.galleryText}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((item, index) => (
                <article
                  key={item.id}
                  className="gallery-card group"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="relative h-72 w-full overflow-hidden rounded-2xl">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-berry/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {/* Name label on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <span className="font-display text-lg text-white drop-shadow">{item.name}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section id="marketplace" className="section-wrap">
          <div className="mx-auto w-full max-w-6xl">
            <div className="reveal-up mb-8">
              <h2 className="font-display text-3xl text-brand-ink">{t.marketTitle}</h2>
              <p className="mt-2 max-w-3xl text-brand-muted">{t.marketText}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {products.map((item) => (
                <article key={`market-${item.id}`} className="market-card group">
                  <div className="h-56 w-full rounded-2xl overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-display text-2xl text-brand-ink">{item.name}</h3>
                    <span className="price-badge transition-all duration-300 group-hover:bg-brand-berry group-hover:text-white">
                      {item.price}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenInstagram(item.instagramLink)}
                      className="btn-primary !justify-center"
                    >
                      <FaInstagram /> {t.marketPrimary}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseFormForProduct(item.name)}
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

        {/* Contact */}
        <section id="contact" className="section-wrap pb-20">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="reveal-up rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-gold/60 hover:shadow-glow">
              <h2 className="font-display text-3xl text-brand-ink">{t.contactTitle}</h2>
              <p className="mt-2 text-brand-muted">{t.contactText}</p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-brand-rose">
                {t.quickContact}
              </h3>
              <div className="mt-4 grid gap-3 text-sm">
                <a className="quick-link group" href={instagramUrl} target="_blank" rel="noreferrer">
                  <FaInstagram className="transition-transform duration-200 group-hover:scale-110" />
                  Instagram
                </a>
                <a className="quick-link group" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <FaWhatsapp className="transition-transform duration-200 group-hover:scale-110" />
                  WhatsApp
                </a>
                <a className="quick-link group" href="mailto:queenbags.mika@gmail.com">
                  <HiOutlineMail className="transition-transform duration-200 group-hover:scale-110" />
                  queenbags.mika@gmail.com
                </a>
                <a className="quick-link group" href="tel:+216-29043226">
                  <FaPhoneAlt className="transition-transform duration-200 group-hover:scale-110" />
                  +216-29043226
                </a>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="reveal-up rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-gold/60"
            >
              <div className="grid gap-4">
                <label className="label-block">
                  <span>{t.labels.name}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Sara Queen"
                  />
                </label>

                <label className="label-block">
                  <span>{t.labels.email}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="input-field"
                    placeholder="name@email.com"
                  />
                </label>

                <label className="label-block">
                  <span>{t.labels.message}</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
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
        <span className="transition-colors duration-200 hover:text-brand-berry cursor-default">
          QueensBags — Handmade feminine bags for modern queens.
        </span>
      </footer>
    </div>
  )
}

export default App
