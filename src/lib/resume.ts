/**
 * The one-page résumé, in the layout of Jake Gutierrez's widely used LaTeX template.
 * This file feeds both the /resume page and scripts/build-resume.ts, which writes the
 * LaTeX source (resume/pranay-agarwal-resume.tex) and compiles the PDF, so the two can never drift.
 *
 * Inline markup: **bold**, *italic* and [label](url). Facts here come from the same sources as content.ts.
 */
import { PERSON, SITE } from "./content";

export type Link = { label: string; url: string };
export type Entry = { title: string; right: string; sub: string; subRight: string; bullets?: string[] };
export type Project = { name: string; tech: string; link: Link; bullets: string[] };

const site = SITE.url.replace(/^https?:\/\//, "");

export const RESUME = {
  name: PERSON.name,
  contacts: [
    { label: PERSON.email, url: `mailto:${PERSON.email}` },
    { label: site, url: SITE.url },
    { label: "LinkedIn", url: PERSON.links.linkedin },
    { label: "Google Scholar", url: PERSON.links.scholar },
    { label: `ORCID ${PERSON.orcidId}`, url: PERSON.links.orcid },
  ] as Link[],

  education: [
    {
      title: "Birla Institute of Technology, Mesra",
      right: "Jaipur Campus, India",
      sub: "Bachelor of Technology in Computer Science; CGPA: 8.37/10, First Class with Distinction",
      subRight: "2022 – 2026",
    },
    {
      title: "Blue Heaven Vidyalaya",
      right: "Jaipur, India",
      sub: "Senior Secondary (Class XII), CBSE; Physics, Chemistry, Mathematics: 92.4%",
      subRight: "2022",
    },
    {
      title: "Ryan International School",
      right: "Jaipur, India",
      sub: "Secondary (Class X), CBSE: 91.4%",
      subRight: "2020",
    },
  ] as Entry[],

  experience: [
    {
      title: "AI/ML Engineer",
      right: "Jul 2025 – Present",
      sub: "MaxBrain Technologies (joined as AI/ML Research Intern)",
      subRight: "Jaipur, India",
      bullets: [
        "Built two public field datasets of leaf images with farmers near Jaipur: **ridge gourd (9,000 images, IEEE DataPort)** and **brinjal (13,600, Mendeley Data)**.",
        "Designed a **DenseNet121 + XGBoost** hybrid reaching **92.0%** on ridge gourd disease; **first-author** Springer paper (MIND 2025).",
        "Co-designed an **IoT device** for plant-sample collection; **design registered with Govt. of India** (476293-001).",
        "Built **Fasal Saathi** with a teammate, a one-photo leaf diagnosis app **published on Google Play** by MaxBrain.",
      ],
    },
    {
      title: "Software Engineering Intern",
      right: "May 2025 – Jul 2025",
      sub: "Starlight Data Solutions",
      subRight: "Noida, India",
      bullets: [
        "Contributed to an **automated firmware management system** tracking releases across OEM vendor websites.",
        "Worked with its **Python scraping engine**, **Flask** backend, **MongoDB** storage and **Elasticsearch** search.",
      ],
    },
  ] as Entry[],

  projects: [
    {
      name: "LeafCheckup",
      tech: "PyTorch, ONNX Runtime Web, WebAssembly, Next.js, FastAPI",
      link: { label: "leafcheckup.vercel.app", url: "https://leafcheckup.vercel.app" },
      bullets: [
        "Trained **EfficientNet-B0**: **94.9% on 217 unseen leaves** (leak-free split); **98.9% vs 92.0%** over the paper baseline.",
        "Runs **fully in the browser** (ONNX Runtime Web, WebAssembly, WebGPU) at **~120 ms/photo**; offline-ready PWA.",
        "**Out-of-distribution detector (0.993 AUROC)**, calibrated confidence (**ECE 1.8%**), heatmaps, developer **API**.",
      ],
    },
    {
      name: "TinyMotion",
      tech: "TensorFlow, TFLite Micro, C99, TypeScript, Next.js",
      link: { label: "tinymotion.vercel.app", url: "https://tinymotion.vercel.app" },
      bullets: [
        "**35,558-parameter** residual 1D CNN: **93.4 ± 1.1%** on 9 unseen people (UCI HAR, 5 seeds), live in the browser.",
        "**Rotation augmentation** keeps **92.8%** with the phone at any angle, where the paper's model falls to 80.3%.",
        "Exported to **INT8 TFLite (85.7 KB)**, TFLite Micro and a dependency-free **C99 header**, all verified against Keras.",
      ],
    },
  ] as Project[],

  publications: [
    {
      text: "**P. Agarwal**, P. Sharma, V. Sharma. *A Hybrid Deep Learning Approach for Automated Plant Disease Diagnosis in Indian Ridge Gourd: Dataset Creation and Real-World Application.* MIND 2025, Springer CCIS, 2026. (First author)",
      url: "https://link.springer.com/chapter/10.1007/978-3-032-31233-4_7",
    },
    {
      text: "P. Sharma, **P. Agarwal**, A. K. Bairwa, V. Sharma. *A comprehensive review and bibliometric analysis of deep learning applications in plant disease detection.* Discover Artificial Intelligence, 2026. (Equal contribution)",
      url: "https://doi.org/10.1007/s44163-026-02310-z",
    },
    {
      text: "P. Sharma, **P. Agarwal**, J. Goyal. *TinyML-Based Lightweight Deep Learning Model for Human Activity Recognition on Edge Devices.* WCAIAA 2026, Springer LNNS, to appear.",
      url: "https://www.scrs.in/conference/wcaiaa2026",
    },
    {
      text: "**Registered Design No. 476293-001**, Government of India (Oct 2025): IoT-based device for real-time data collection and augmentation of plant samples. [Certificate](https://drive.google.com/file/d/1fnbNIrKeal7NGtuPIZunkuAs7jU-0VHw/view?usp=sharing)",
    },
    {
      text: "**Public datasets:** [Ridge gourd leaf images (9,000), IEEE DataPort](https://doi.org/10.21227/469z-vm04); [Brinjal leaf images (13,600), Mendeley Data](https://doi.org/10.17632/c39p3k87g2.2).",
    },
  ] as { text: string; url?: string }[],


  skills: [
    { label: "Languages", items: "Python, TypeScript, JavaScript, C, C++, Java, SQL, Bash" },
    { label: "Machine Learning", items: "PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, timm, OpenCV, NumPy, pandas" },
    { label: "Edge & On-Device AI", items: "ONNX Runtime Web, TensorFlow Lite (INT8), TFLite Micro, WebAssembly, WebGPU" },
    { label: "Generative AI", items: "LangChain, RAG, Vector Search, OpenAI API" },
    { label: "Web & Data", items: "Next.js, React, Node.js, FastAPI, Flask, PostgreSQL, MongoDB, Elasticsearch" },
    { label: "DevOps & Testing", items: "Docker, GitHub Actions, Vercel, Linux, Git, Playwright, pytest" },
  ],

  achievements: [
    "**Featured Researcher**, Springer Nature India Research Tour 2025; covered by **Punjab Kesari** and **IEEE DataPort**.",
    "**Paper presenter**, WCAIAA 2026 (7th World Conference on Artificial Intelligence), NFSU Goa.",
    "**Oracle Certified Professional**: OCI Data Science, OCI Generative AI, AI Vector Search; OCI AI Foundations Associate.",
    "**IELTS Academic**: overall band 7.5 (CEFR C1), May 2026.",
    "**Coordinator, Sports Committee**, BIT Mesra; senior coordinator of the Cavorts 2023 annual sports tournament.",
  ],

};
