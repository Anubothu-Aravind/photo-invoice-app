# InstaInvoice  
**Quick, Custom PDF Billing for Photographers**

InstaInvoice is a smart invoicing web app built specifically for photographers. It lets you create polished invoices in minutes, customize templates, and share them instantly with clients.

## Key Features
- **Customizable Templates** - add your branding, logo, and colors.  
- **Event-Based Service Catalog** - preloaded services for Engagements, Traditional Ceremonies, and Weddings.  
- **Quick Invoice Builder** - add/remove services, apply discounts, and taxes.  
- **Offline PDF Generation** - download invoices anytime without internet.  
- **Smart Sharing** - send invoices via link, email, or WhatsApp.  
- **Invoice Tracking** - status updates (Draft → Sent → Viewed → Paid).  
- **Client Management** - save contacts and event details for repeat use.  
- **Admin Dashboard** - manage users, templates, and service catalogs.  
- **Analytics & Export** - download reports in PDF, CSV, or JSON.  
- **Offline-First** - secure data sync with local caching for reliability.  

## 🛠️ Tech Stack

**Frontend**
- React.js  
- Tailwind CSS  

**Backend**
- Node.js  
- Express  
- Redis (caching)  

**Storage**
- SQLite / PostgreSQL  
- Cloudinary (for image/logo uploads)  
- Session / Local storage (for offline-first support)  

## 📂 Project Structure (Proposed)
```

instainvoice/
│── frontend/       # React + Tailwind (UI)
│── backend/        # Express + Redis + DB
│── shared/         # Reusable types, constants, utils
│── docs/           # API docs, DB schema, specs
│── .env.example    # Sample environment variables

````

## Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/Anubothu-Aravind/photo-invoice-app.git
cd photo-invoice-app
````

2. **Setup Backend**

```bash
cd backend
npm install
cp .env.example .env   # configure DB + Redis
npx prisma migrate dev
npm run dev
```

3. **Setup Frontend**

```bash
cd ../frontend
npm install
npm start
```

Frontend → `http://localhost:3000`
Backend → `http://localhost:5000`

## Contributors

* **Developer :** Aravind
* **Developer :** Charan
* Open to contributions
