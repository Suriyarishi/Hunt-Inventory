# Hunt Inventory Mobile Design System
**Stripe Identity & Brex Inspired Minimal Enterprise SaaS**

A clean, compliance-driven, task-oriented design system focusing on minimal components, soft mint green highlights, and premium white space.

---

## 1. Color System

All values are structured for Figma design tokens and Tailwind CSS integration.

| Token | Hex | HSL Component | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#24C97B` | `152 70% 47%` | Mint Green brand color, active states, key actions |
| **Primary Light** | `#DFF7EA` | `148 60% 92%` | Light green highlights, selection overlays, badge backdrops |
| **Primary Dark** | `#0F2E2A` | `172 51% 12%` | Dark slate green background, high-contrast indicators, sold states |
| **Background** | `#F6FBF8` | `144 29% 97%` | Global screen background (Soft Mint tint) |
| **Card Surface** | `#FFFFFF` | `0 0% 100%` | Primary content cards, modals, sheets |
| **Secondary Surface** | `#F6FBF8` | `144 29% 97%` | Subtle container background, input fields background |
| **Border** | `#E5EDE9` | `147 11% 91%` | Very thin mint-gray outlines and separators |
| **Text Primary** | `#1B2A24` | `156 22% 14%` | High-emphasis headers, titles, primary copy |
| **Text Secondary** | `#6B7A74` | `156 7% 45%` | Low-emphasis copy, description fields, placeholder text |

### Feedback Colors
* **Success**: `#24C97B` (`HSL 152 70% 47%`)
* **Warning**: `#FFB547` (`HSL 36 100% 64%`)
* **Error**: `#FF5A5F` (`HSL 358 100% 68%`)

---

## 2. Typography

* **Headings**: Poppins (weights: `500` Medium, `600` SemiBold, `700` Bold)
* **Body / UI Interface**: Inter (weights: `400` Regular, `500` Medium, `600` SemiBold)

### Typography Scale (Mobile First)

| Class | Font Size | Line Height | Weight | Font Family | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **text-display-xl** | `40px` (`2.5rem`) | `48px` | `700` | Poppins | KPI metrics, hero numbers |
| **text-display-l** | `32px` (`2rem`) | `40px` | `700` | Poppins | Statistics headers |
| **text-heading-1** | `28px` (`1.75rem`) | `36px` | `600` / `700` | Poppins | Main page titles |
| **text-heading-2** | `24px` (`1.5rem`) | `32px` | `600` | Poppins | Module sections |
| **text-heading-3** | `20px` (`1.25rem`) | `28px` | `600` | Poppins | Card headings |
| **text-body-large** | `16px` (`1rem`) | `24px` | `400` / `500` | Inter | Form actions, buttons |
| **text-body-medium**| `14px` (`0.875rem`) | `20px` | `400` / `500` | Inter | Core text copy, text inputs |
| **text-caption** | `12px` (`0.75rem`) | `16px` | `400` / `500` | Inter | Helper labels, captions, metadata |

---

## 3. Spacing System (8pt Grid)

| Spacing Token | Pixels | Rem Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| **4** | 4px | `0.25rem` | Micro spacing, label to field gap |
| **8** | 8px | `0.5rem` | Badge padding, internal card spacing |
| **12** | 12px | `0.75rem` | Metatags, icon gaps |
| **16** | 16px | `1.0rem` | Default padding, list margins |
| **20** | 20px | `1.25rem` | Section breaks, button lists |
| **24** | 24px | `1.5rem` | Card padding, sheet margins |
| **32** | 32px | `2.0rem` | Modals, empty state blocks |
| **40** | 40px | `2.5rem` | Hero banners padding |
| **48** | 48px | `3.0rem` | Dashboard section gaps |
| **64** | 64px | `4.0rem` | Floating elements clearance |

---

## 4. Radius System

| Target | Radius (px) | Radius (rem) | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Buttons** | 16px | `1.0rem` | `rounded-button` |
| **Inputs** | 16px | `1.0rem` | `rounded-input` |
| **Cards** | 24px | `1.5rem` | `rounded-card` |
| **Project Cards** | 28px | `1.75rem` | `rounded-project-card` |
| **Hero Cards** | 32px | `2.0rem` | `rounded-hero-card` |
| **Bottom Sheet** | 32px (top only) | `2.0rem` | `rounded-t-bottom-sheet` |
| **Modal** | 32px | `2.0rem` | `rounded-modal` |

---

## 5. Design Principles
- **Clean Enterprise Layout**: Minimal borders, relying on color block separations (`#FFFFFF` vs `#F6FBF8`) and extremely light shadows.
- **Compliance Driven**: Crisp fonts, strong alignment, and task-oriented micro-actions to make onboarding, holds, and bookings feel highly secure and structured.
- **Minimalist Iconography**: Light icons, minimal visual noise.
