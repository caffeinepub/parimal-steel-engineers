# Specification

## Summary
**Goal:** Build a responsive public marketing website for Parimal Steel Engineers with an owner-only admin CMS for editing content, styled in a black/dark-yellow metallic industrial theme.

**Planned changes:**
- Create public sections/pages: Home (hero), Services, Materials (mild steel, stainless steel), Clients, About, Contact, and Portfolio/Projects.
- Apply site-wide brand styling: black base, dark yellow accents, metallic/industrial finish, with readable contrast.
- Implement an Admin area (/admin) with Internet Identity sign-in and allowlisted owner-only authorization for edits.
- Add a simple Motoko backend (single actor) content model + API to fetch public content and update admin-managed content, stored upgrade-safely.
- Add Admin edit forms for hero text, about/company text, services list, materials text, clients list, contact details, and portfolio project entries (title, description, optional images).
- Add basic SEO metadata (title + description) and ensure responsive, fast-loading layouts.
- Add generated static brand assets under `frontend/public/assets/generated` and wire them into the header/logo and hero.

**User-visible outcome:** Visitors can browse a complete company website with services, materials, clients, portfolio, and contact info; the owner can securely sign in to /admin and update all key content, with changes persisted and reflected on the public site after reload.
