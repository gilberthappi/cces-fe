<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->
# 📖 Citizen Complaints and Engagement System <a name="about-project"></a>

*CCES* is a fullstack web application that empowers citizens to submit complaints or feedback on public services. The system intelligently routes submissions to appropriate government agencies, allowing real-time interaction and status tracking.

Developed with scalability and usability in mind, the system ensures fast and accessible citizen engagement with built-in authentication, AI-assisted routing, and email notifications.

## 🛠 Built With <a name="built-with"></a>

# This project was built with

---
### Tech Stack <a name="tech-stack"></a>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.postgres.com/">POSTGRES</a></li>
  </ul>
</details>

## Tech Stack

| *Layer*     | *Technology*               |
| --------      | ---------------------------- |
| *Frontend*  | React JS (Vite)        |
| *Styling*   | SCSS                         |
| *Backend*   | Node.js + Express.js         |
| *Database*  | Supabase                     |
| *Auth*      | JWT (with role-based access) |
| *Docs*      | Swagger                      |


---

<!-- Features -->

### Key Features <a name="key-features"></a>
## Core Features

- *Complaint Submission* – Citizens can register and submit complaints easily.
- *AI-Assisted Routing* – Complaints are automatically routed to the relevant government agency using an internal model.
- *Categorization* – Complaints are categorized by type to ensure proper handling.
- *Ticket Tracking* – Citizens can track the status of their submissions.
- *Agency Dashboard* – Organizations can respond to complaints and manage their inbox.
- *Authentication* – Secure login with role-based access for:
- Citizen – Submits complaints
- Organization – Handles incoming complaints
- Admin – Manages users and settings
- *Email Notifications* – Citizens receive updates via email.
- *Mobile-Responsive* – Optimized for smartphones and tablets.

---

## UI/UX Design Philosophy

- *Minimal & Functional*: Clean interface focused on delivering function without clutter.
- *User-Centered*: Designed with accessibility and intuitiveness as top priorities.
- *Responsive*: Works seamlessly across desktop, tablet, and mobile devices.
- *Custom-Built: All UI components were designed from scratch in **Figma*, inspired by familiar patterns but uniquely tailored for this project.

---

## Authentication & Roles

Implemented with JWT:

- *Citizen*: Submits and tracks complaints.
- *Organization*: Receives and responds to routed complaints.
- *Admin*: Manages system users and configurations.

---
## AI-Assisted Routing

A simple but functional model was built to route complaints based on category and keywords. Though not deeply complex due to time limits, it shows promising scalability with future ML integration.

---

## Challenges Faced

- Limited time to balance backend, frontend, and model integration.
- Learning curve around designing an effective routing model.
- Managing state and role-based views securely and intuitively.
- Light/Dark mode support deferred due to focus on core functionality.

---

## Future Improvements

- Native Mobile App (iOS + Android)
- Chatbot Assistant for instant citizen support
- Community/Forum integration for public discussions
- Advanced analytics dashboard for agencies
- Full audit trail and complaint history

---
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

## Live Demo

- 🌐 Frontend: [https://cces.netlify.app](https://cces.netlify.app/)
- ⚙️ Backend: [https://cces-be.onrender.com](https://cces-be.onrender.com/docs)
- 📑 API Docs: [Swagger Documentation](https://cces-be.onrender.com/docs/)
- 📱 Mobile: [Download Mobile App](https://expo.dev/accounts/happigilbert/projects/cces/builds/ecf52638-14d0-4c6d-9efa-f5a890718084)
---

## Repositories

- 🌐 Frontend: [https://github.com/gilberthappi/cces-fe](https://github.com/gilberthappi/cces-fe)
- ⚙️ Backend: [https://github.com/gilberthappi/cces-be](https://github.com/gilberthappi/cces-be)
- 📱 Mobile: [https://github.com/gilberthappi/cces-mobile](https://github.com/gilberthappi/cces-mobile)
---
<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

# Screenshots from Desktop version
<div class="screenshots">
  <figure>
    <img src="./public/demo/web/Screenshot%20from%202025-05-22%2007-18-26.png" alt="Desktop Screenshot 1">
    <figcaption>Desktop Screenshot 1</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/web/Screenshot%20from%202025-05-22%2007-36-16.png" alt="Desktop Screenshot 2">
    <figcaption>Desktop Screenshot 2</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/web/Screenshot%20from%202025-05-22%2007-37-20.png" alt="Desktop Screenshot 3">
    <figcaption>Desktop Screenshot 3</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/web/Screenshot%20from%202025-05-22%2007-37-47.png" alt="Desktop Screenshot 4">
    <figcaption>Desktop Screenshot 4</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/web/Screenshot%20from%202025-05-22%2007-38-32.png" alt="Desktop Screenshot 5">
    <figcaption>Desktop Screenshot 5</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/web/Screenshot%20from%202025-05-22%2007-42-08.png" alt="Desktop Screenshot 6">
    <figcaption>Desktop Screenshot 6</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/web/Screenshot%20from%202025-05-22%2007-43-26.png" alt="Desktop Screenshot 7">
    <figcaption>Desktop Screenshot 7</figcaption>
  </figure>
</div>

# Screenshots from Mobile version
<div class="screenshots">
  <figure>
    <img src="./public/demo/mobile/WhatsApp%20Image%202025-05-22%20at%207.46.48%20AM.jpeg" alt="Mobile Screenshot 1">
    <figcaption>Mobile Screenshot 1</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/mobile/WhatsApp%20Image%202025-05-22%20at%207.46.49%20AM%20(1).jpeg" alt="Mobile Screenshot 2">
    <figcaption>Mobile Screenshot 2</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/mobile/WhatsApp%20Image%202025-05-22%20at%207.46.49%20AM%20(2).jpeg" alt="Mobile Screenshot 3">
    <figcaption>Mobile Screenshot 3</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/mobile/WhatsApp%20Image%202025-05-22%20at%207.46.49%20AM.jpeg" alt="Mobile Screenshot 4">
    <figcaption>Mobile Screenshot 4</figcaption>
  </figure>
  <figure>
    <img src="./public/demo/mobile/WhatsApp%20Image%202025-05-22%20at%207.46.50%20AM.jpeg" alt="Mobile Screenshot 5">
    <figcaption>Mobile Screenshot 5</figcaption>
  </figure>
</div>

### To launch the project locally:

#### Step 1:
_To get a local copy up and running follow these simple steps._

1. Clone the repo
   ```sh
   git clone https://github.com/gilberthappi/cces-fe/.git
   ```
2. Goto project directory
   ```sh
   cd cces-fe
   ```

3. Go TO Text editor

#### Step 2:
### Install

- If you are familiar with git, Run `npm install` to get all dependecies required to run the linters checks, otherwise use the downloaded project on your computer without testing files

#### Step 3:
### Run start

> Run thes command bellow inside your `git bash` or command line interface..
 -Run `npm run dev `

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Eng Gilbert Happi**

- GitHub: [@githubhandle](https://github.com/gilberthappi)
- Twitter: [@twitterhandle](https://twitter.com/dushimimanagil3)
- Linkedin: [@linkedin](https://www.linkedin.com/in/dushimimana-gilbert-happi/)

![happi's GitHub stats](https://github-readme-stats.vercel.app/api?username=gilberthappi&count_private=true&theme=dark&show_icons=true)



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [ ] **Add Night/Day mode**
- [ ] **Newsletter Email**

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🤝 Contributing <a name="contributing"></a>


Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/gilberthappi/cces-fe/issues/1).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

Give a ⭐️ if you like this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

- To you Reviewer and Corrector

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
