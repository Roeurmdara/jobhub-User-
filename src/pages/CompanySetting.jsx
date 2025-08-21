"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Globe,
  ImageIcon,
  Plus,
  X,
  Type,
  Bold,
  Italic,
  ListOrdered,
  List,
  LinkIcon,
  UserCircle2,
  Mail,
  Shield,
  Trash2,
  Edit3,
  User,
  SettingsIcon,
  LogOut,
} from "lucide-react"

/* Small chip/tag with remove button */
function Tag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-700">
      {label}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-800"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  )
}

/* Shared labeled input with optional left icon */
function LabeledInput({ id, label, placeholder, icon, type = "text", defaultValue, value, onChange, rightIcon }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon ? (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        ) : null}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`block w-full rounded-md border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
            icon ? "pl-9" : ""
          } ${rightIcon ? "pr-9" : ""}`}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
        {rightIcon ? (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/* Social icon for input fields */
function SocialIcon({ kind }) {
  const map = {
    website: <Globe className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    github: <Github className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    dribbble: <Dribbble className="h-4 w-4" />,
    behance: <Dribbble className="h-4 w-4" />,
  }
  return map[kind] ?? <LinkIcon className="h-4 w-4" />
}

export default function CompanySetting() {
  /* Tabs */
  const [tab, setTab] = useState("overview")

  /* Company switcher/user menu */
  const [menuOpen, setMenuOpen] = useState(false)
  const menuBtnRef = useRef(null)
  const menuRef = useRef(null)
  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuOpen) return
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false)
      }
    }
    const onEsc = (e) => e.key === "Escape" && setMenuOpen(false)
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onEsc)
    }
  }, [menuOpen])

  const handleLogout = () => {
    // Replace with your real sign-out logic (e.g., API call, auth signOut())
    console.log("Logging out...")
    alert("Logged out")
    setMenuOpen(false)
  }

  /* Overview state */
  const [description, setDescription] = useState(
    "Nomad is part of the Information Technology Industry. We believe travellers want to experience real life and meet local people. Nomad has 30 total employees across all of its locations and generates $1.50 million in sales.",
  )
  const [tech, setTech] = useState(["HTML 5", "CSS 3", "Javascript"])
  const [techInput, setTechInput] = useState("")
  const [locations, setLocations] = useState(["England", "Japan", "Australia"])
  const [locationInput, setLocationInput] = useState("")
  const [charCount, setCharCount] = useState(description.length)
  const maxChars = 500
  const remaining = useMemo(() => Math.max(0, maxChars - charCount), [charCount])

  /* Logo upload preview */
  const [logoSrc, setLogoSrc] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const openFileDialog = () => fileInputRef.current?.click()

  const handleFiles = (files) => {
    if (!files || !files.length) return
    const file = files[0]
    if (!file.type?.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }
    const url = URL.createObjectURL(file)
    setLogoSrc(url)
    // If you want to persist, store `file` in state and upload on save.
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => setIsDragging(false)

  /* Social Links state */
  const [social, setSocial] = useState({
    website: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    github: "",
    dribbble: "",
    behance: "",
  })

  /* Team state */
  const [team, setTeam] = useState([
    { id: 1, name: "Maria Kelly", email: "maria.kelly@example.com", role: "Recruiter", status: "Active" },
    { id: 2, name: "Jacob Jones", email: "jacob.jones@example.com", role: "HR Manager", status: "Active" },
    { id: 3, name: "Courtney Henry", email: "courtney.henry@example.com", role: "Hiring Manager", status: "Invited" },
  ])
  const [invite, setInvite] = useState({ name: "", email: "", role: "Member" })

  const addTech = () => {
    const t = techInput.trim()
    if (!t) return
    setTech((prev) => (prev.includes(t) ? prev : [...prev, t]))
    setTechInput("")
  }
  const addLocation = () => {
    const l = locationInput.trim()
    if (!l) return
    setLocations((prev) => (prev.includes(l) ? prev : [...prev, l]))
    setLocationInput("")
  }
  const handleSocialChange = (key, value) => setSocial((s) => ({ ...s, [key]: value }))
  const removeMember = (id) => setTeam((list) => list.filter((m) => m.id !== id))
  const addInvite = () => {
    if (!invite.name.trim() || !invite.email.trim()) return
    setTeam((list) => [
      ...list,
      {
        id: Math.max(0, ...list.map((m) => m.id)) + 1,
        name: invite.name.trim(),
        email: invite.email.trim(),
        role: invite.role,
        status: "Invited",
      },
    ])
    setInvite({ name: "", email: "", role: "Member" })
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Reserve left space for your existing sidebar: adjust 16rem (64) if needed */}
      <div className="min-h-screen w-full sm:pl-64">
        {/* Main */}
        <main className="flex min-w-0 flex-col">
          {/* Top bar */}
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <img src="https://i.pinimg.com/736x/55/13/bc/5513bcf739d64e80a9273c74cee7f8a9.jpg" alt="Company logo" className="h-7 w-7 rounded" />
              <div className="text-sm text-slate-500">Company</div>

              <div className="relative">
                <button
                  ref={menuBtnRef}
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  FaceBook
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>

                {menuOpen && (
                  <div
                    ref={menuRef}
                    role="menu"
                    aria-label="Account menu"
                    className="absolute left-0 z-20 mt-2 w-56 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
                  >
                    <div className="px-3 py-2 text-xs text-slate-500">Signed in as</div>
                    <div className="px-3 pb-2 text-sm font-medium text-slate-800">maria.kelly@example.com</div>
                    <div className="h-px bg-slate-200" />
                    <button
                      role="menuitem"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User className="h-4 w-4 text-slate-500" />
                      Profile
                    </button>
                    <button
                      role="menuitem"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <SettingsIcon className="h-4 w-4 text-slate-500" />
                      Company settings
                    </button>
                    <div className="h-px bg-slate-200" />
                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
            
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Post a job
              </button>
            </div>
          </header>

          {/* Body */}
          <div className="flex-1 px-6 pb-8">
            {/* Title + Tabs */}
            <div className="border-b border-slate-200 pt-6">
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <div className="mt-4 flex gap-6 text-sm">
                <button
                  className={`pb-3 font-medium ${
                    tab === "overview"
                      ? "border-b-2 border-blue-600 text-blue-700"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`pb-3 font-medium ${
                    tab === "social"
                      ? "border-b-2 border-blue-600 text-blue-700"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setTab("social")}
                >
                  Social Links
                </button>
                <button
                  className={`pb-3 font-medium ${
                    tab === "team"
                      ? "border-b-2 border-blue-600 text-blue-700"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setTab("team")}
                >
                  Team
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {tab === "overview" && (
              <OverviewSection
                description={description}
                setDescription={(v) => {
                  setDescription(v)
                  setCharCount(v.length)
                }}
                charCount={charCount}
                maxChars={maxChars}
                remaining={remaining}
                tech={tech}
                setTech={setTech}
                techInput={techInput}
                setTechInput={setTechInput}
                addTech={addTech}
                locations={locations}
                setLocations={setLocations}
                locationInput={locationInput}
                setLocationInput={setLocationInput}
                addLocation={addLocation}
                /* upload props */
                logoSrc={logoSrc}
                isDragging={isDragging}
                fileInputRef={fileInputRef}
                openFileDialog={openFileDialog}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onFileChange={(e) => handleFiles(e.target.files)}
              />
            )}

            {tab === "social" && (
              <SocialLinksSection
                social={social}
                onChange={(k, v) => handleSocialChange(k, v)}
                onSave={() => console.log("Save social links", social)}
              />
            )}

            {tab === "team" && (
              <TeamSection
                team={team}
                onRemove={removeMember}
                invite={invite}
                setInvite={setInvite}
                onInvite={addInvite}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

/* Sections */

function OverviewSection({
  description,
  setDescription,
  charCount,
  maxChars,
  remaining,
  tech,
  setTech,
  techInput,
  setTechInput,
  addTech,
  locations,
  setLocations,
  locationInput,
  setLocationInput,
  addLocation,
  /* upload props */
  logoSrc,
  isDragging,
  fileInputRef,
  openFileDialog,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
}) {
  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold text-slate-700">Basic Information</h2>
      <p className="mt-1 text-sm text-slate-500">This is company information that you can update anytime.</p>

      {/* Logo + Upload */}
      <div className="mt-6 rounded-lg border border-slate-200">
        <div className="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-[1fr_auto_minmax(280px,1fr)]">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Company Logo</h3>
            <p className="mt-1 text-sm text-slate-500">This image will be shown publicly as company logo.</p>
          </div>

          <img
            src={logoSrc || "/placeholder.svg"}
            alt="Current logo"
            className="h-20 w-20 rounded-md border border-slate-200 bg-white object-cover"
          />

          <div
            onClick={openFileDialog}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFileDialog()}
            aria-label="Upload company logo"
            className={`rounded-md border-2 border-dashed p-4 transition ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-blue-300"
            }`}
          >
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md bg-blue-50 py-6 text-center text-sm text-blue-700 hover:bg-blue-100">
              <ImageIcon className="h-4 w-4" />
              <span className="font-medium">Click to replace</span>
              <span className="text-slate-400">or drag and drop</span>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 400 × 400px)</p>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </div>
        </div>

        <div className="h-px w-full bg-slate-200" />

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[260px_1fr]">
          {/* Left help text */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700">Company Details</h4>
            <p className="mt-1 text-sm text-slate-500">
              Introduce your company core info quickly to users by fill up company details
            </p>
          </div>

          {/* Right form */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Company Name */}
            <LabeledInput id="companyName" label="Company Name" placeholder="This is placeholder" />

            {/* Website */}
            <LabeledInput
              id="website"
              label="Website"
              placeholder="This is placeholder"
              icon={<Globe className="h-4 w-4" />}
              type="url"
            />

            {/* Location */}
            <div className="col-span-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 px-2 py-2">
                {locations.map((l, i) => (
                  <Tag
                    key={`${l}-${i}`}
                    label={l}
                    onRemove={() => setLocations((prev) => prev.filter((x, idx) => !(x === l && idx === i)))}
                  />
                ))}
                <input
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addLocation()
                    }
                  }}
                  placeholder="Add location…"
                  className="min-w-[120px] flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={addLocation}
                  className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 px-2 text-slate-600 hover:bg-slate-50"
                  aria-label="Add location"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Industry */}
            <LabeledInput
              id="industry"
              label="Industry"
              placeholder="This is placeholder"
              rightIcon={<ChevronRight className="h-4 w-4 rotate-90 text-slate-400" />}
            />

            {/* Employee */}
            <LabeledInput id="employee" label="Employee" placeholder="This is placeholder" />

            {/* Date Founded */}
            <div className="col-span-1 grid grid-cols-2 gap-3">
              <LabeledInput
                id="month"
                label="Month"
                defaultValue="July"
                rightIcon={<ChevronRight className="h-4 w-4 rotate-90 text-slate-400" />}
              />
              <LabeledInput
                id="year"
                label="Year"
                defaultValue="2021"
                rightIcon={<ChevronRight className="h-4 w-4 rotate-90 text-slate-400" />}
              />
            </div>

            {/* Tech Stack */}
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Tech Stack</label>
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 px-2 py-2">
                {tech.map((t, i) => (
                  <Tag
                    key={`${t}-${i}`}
                    label={t}
                    onRemove={() => setTech((prev) => prev.filter((x, idx) => !(x === t && idx === i)))}
                  />
                ))}
                <input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTech()
                    }
                  }}
                  placeholder="Add tech…"
                  className="min-w-[120px] flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 px-2 text-slate-600 hover:bg-slate-50"
                  aria-label="Add tech"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* About Company */}
            <div className="col-span-2 grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">About Company</h4>
                <p className="mt-1 text-sm text-slate-500">Brief description for your company. URLs are hyperlinked.</p>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <div className="rounded-md border border-slate-200">
                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full resize-y rounded-t-md border-0 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    placeholder="Write something about your company..."
                    maxLength={maxChars}
                  />
                  {/* Toolbar */}
                  <div className="flex items-center gap-2 border-t border-slate-200 px-3 py-2">
                    <Type className="h-4 w-4 text-slate-500" />
                    <button type="button" className="p-1 text-slate-600 hover:text-slate-900">
                      <Bold className="h-4 w-4" />
                    </button>
                    <button type="button" className="p-1 text-slate-600 hover:text-slate-900">
                      <Italic className="h-4 w-4" />
                    </button>
                    <button type="button" className="p-1 text-slate-600 hover:text-slate-900">
                      <List className="h-4 w-4" />
                    </button>
                    <button type="button" className="p-1 text-slate-600 hover:text-slate-900">
                      <ListOrdered className="h-4 w-4" />
                    </button>
                    <button type="button" className="p-1 text-slate-600 hover:text-slate-900">
                      <LinkIcon className="h-4 w-4" />
                    </button>

                    <div className="ml-auto text-xs text-slate-500">Maximum {maxChars} characters</div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2">
                    <div className="text-xs text-slate-400">
                      {charCount} / {maxChars}
                    </div>
                    <div className="text-xs text-slate-500">{remaining} remaining</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="col-span-2 mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLinksSection({ social, onChange, onSave }) {
  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold text-slate-700">Social Links</h2>
      <p className="mt-1 text-sm text-slate-500">Add your company’s website and social media profiles.</p>

      <div className="mt-6 rounded-lg border border-slate-200 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <LabeledInput
            id="website"
            label="Website"
            placeholder="https://example.com"
            icon={<SocialIcon kind="website" />}
            value={social.website}
            onChange={(e) => onChange("website", e.target.value)}
          />
          <LabeledInput
            id="linkedin"
            label="LinkedIn"
            placeholder="https://linkedin.com/company/yourhandle"
            icon={<SocialIcon kind="linkedin" />}
            value={social.linkedin}
            onChange={(e) => onChange("linkedin", e.target.value)}
          />
          <LabeledInput
            id="twitter"
            label="Twitter"
            placeholder="https://twitter.com/yourhandle"
            icon={<SocialIcon kind="twitter" />}
            value={social.twitter}
            onChange={(e) => onChange("twitter", e.target.value)}
          />
          <LabeledInput
            id="facebook"
            label="Facebook"
            placeholder="https://facebook.com/yourpage"
            icon={<SocialIcon kind="facebook" />}
            value={social.facebook}
            onChange={(e) => onChange("facebook", e.target.value)}
          />
          <LabeledInput
            id="instagram"
            label="Instagram"
            placeholder="https://instagram.com/yourhandle"
            icon={<SocialIcon kind="instagram" />}
            value={social.instagram}
            onChange={(e) => onChange("instagram", e.target.value)}
          />
          <LabeledInput
            id="github"
            label="GitHub"
            placeholder="https://github.com/yourorg"
            icon={<SocialIcon kind="github" />}
            value={social.github}
            onChange={(e) => onChange("github", e.target.value)}
          />
          <LabeledInput
            id="dribbble"
            label="Dribbble"
            placeholder="https://dribbble.com/yourteam"
            icon={<SocialIcon kind="dribbble" />}
            value={social.dribbble}
            onChange={(e) => onChange("dribbble", e.target.value)}
          />
          <LabeledInput
            id="behance"
            label="Behance"
            placeholder="https://behance.net/yourteam"
            icon={<SocialIcon kind="behance" />}
            value={social.behance}
            onChange={(e) => onChange("behance", e.target.value)}
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Links
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

function TeamSection({ team, onRemove, invite, setInvite, onInvite }) {
  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold text-slate-700">Team</h2>
      <p className="mt-1 text-sm text-slate-500">Manage team members who can access your company account.</p>

      {/* Invite form */}
      <div className="mt-6 rounded-lg border border-slate-200 p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Invite Member</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_200px_auto]">
          <LabeledInput
            id="invite-name"
            label="Full Name"
            placeholder="Jane Doe"
            icon={<UserCircle2 className="h-4 w-4" />}
            value={invite.name}
            onChange={(e) => setInvite((s) => ({ ...s, name: e.target.value }))}
          />
          <LabeledInput
            id="invite-email"
            label="Email"
            placeholder="jane@company.com"
            icon={<Mail className="h-4 w-4" />}
            type="email"
            value={invite.email}
            onChange={(e) => setInvite((s) => ({ ...s, email: e.target.value }))}
          />
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 pr-9 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={invite.role}
                onChange={(e) => setInvite((s) => ({ ...s, role: e.target.value }))}
              >
                <option>Member</option>
                <option>Recruiter</option>
                <option>HR Manager</option>
                <option>Hiring Manager</option>
                <option>Admin</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={onInvite}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Invite
            </button>
          </div>
        </div>
      </div>

      {/* Member list */}
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.id} className="border-t border-slate-200">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="font-medium text-slate-800">{m.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{m.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
                    <Shield className="h-3.5 w-3.5 text-slate-500" />
                    {m.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                      m.status === "Active"
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200"
                        : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 text-slate-500">
                    <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => onRemove(m.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-red-600 hover:bg-red-50 hover:border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {team.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>
                  No team members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Save row */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Save Changes
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
