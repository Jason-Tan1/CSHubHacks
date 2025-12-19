<h1 align="center">🛡️ TenantShield</h1>
<h3 align="center">AI-Powered Tenant Rights & Advocacy Platform</h3>
<p align="center">
  <a href="#live-demo">Live Demo</a> •
  <a href="#report-bug">Report Bug</a> •
  <a href="#request-feature">Request Feature</a>
</p>

<div align="center">

![Static Badge](https://img.shields.io/badge/Award-1st_Place-blue)
![Static Badge](https://img.shields.io/badge/Award-Best_Use_of_Gemini-blue)

</div>

## 📖 About The Project

TenantShield is an award-winning web application that empowers tenants to identify potential lease violations, understand their rights, and take informed action. Take a photo. Know your rights. Get justice.

Housing disputes can be overwhelming. TenantShield bridges the gap by using AI to analyze evidence and provide instant legal context. Users can upload photos of issues like mold, pests, or damage, and our platform generates a detailed report including applicable local laws, recommended actions, and even a draft message to their landlord.

Built for the CSHub Hack Day, TenantShield won **🥇 1st Place ($400)** and the **🏆 Best Use of Gemini AI** award.

## ✨ Key Features

- **📸 AI-Powered Analysis** – Uses Gemini Multimodal capabilities to analyze images and text descriptions of housing issues
- **📍 Location-Aware Justice** – Leverages user location to cite specific, relevant local housing laws and ordinances
- **📑 Comprehensive Reporting** – Generates detailed reports covering tenant rights, legal citations, and next steps
- **✉️ Automated Drafts** – Creates pre-written, professional messages for users to send to their landlords
- **⚖️ Legal Aid Locator** – Identifies and displays nearby legal aid clinics on a map
- **📱 Streamlined Interface** – Intuitive, step-by-step form for uploading evidence and describing problems

## 🛠️ Built With

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend & Services
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### APIs
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white) – Multimodal analysis and report generation  
![Google Maps](https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white) – Location services and legal aid discovery

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/TenantShield.git
   cd TenantShield

2. **Install dependencies**
   Backend:
   ```bash
   cd server
   npm install
   ```
   
   Frontend:
   ```bash
   cd ../client
   npm install
   ```
  
3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   PORT=5001
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-2.0-flash
   GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
   ```

   Create a `.env` file in the /client directory:
   ```bash
   VITE_API_URL=http://localhost:5001
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

   > **Note:** You'll need to obtain API keys from:
   > - [Google AI Studio](https://aistudio.google.com/) (for Gemini)
   > - [Google Cloud Console](https://console.cloud.google.com/) (for Google Maps & Places APIs)

4. **Start the development server**
   ```bash
   cd server
   node index.js
   ```
   ```bash
   cd client
   npm run dev
   ```
  
5. **Open your browser**
   
   Navigate to: [http://localhost:3000](http://localhost:5173)

---

## 💡 Usage

1. **Upload Evidence** – Take or upload photos of the housing issue (mold, leaks, damage)
2. **Add Details** – Provide a brief written description of the problem history
3. **Set Location** – Input your address or auto-detect location to find relevant laws
4. **Run Scan** – TenantShield sends the data to Gemini AI for analysis
5. **View Report** – Review your rights, cited laws, and recommended next steps
6. **Take Action** – Use the auto-generated email draft or find a local legal clinic

## 👨‍💻 Team

Built with ❤️ at CSHub Hack Day by:

- **Jason Tan** – [@Jason-Tan1](https://github.com/YourUsername)
- **Kurt Jallo** – [@kurtjallo](https://github.com/kurtjallo)
- **Harit Oza** – [@harito-git](https://github.com/harito-git)
- **Ryan Reddy** 

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- CSHub Hack Day for hosting an amazing hackathon
- Google AI Studio for the Gemini API
- Google Maps Platform for location services

<div align="center">

Made at York University CSHub Hackathon

[⬆ Back to Top](#)

</div>
