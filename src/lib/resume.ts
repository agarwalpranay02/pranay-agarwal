/**
 * The one-page résumé, in the layout of Jake Gutierrez's widely used LaTeX template.
 * This file feeds the /resume page, the Experience section of the home page, and
 * scripts/build-resume.ts, which writes the LaTeX source (resume/pranay-agarwal-resume.tex)
 * and compiles the PDF, so they can never drift.
 *
 * Inline markup: **bold**, *italic* and [label](url).
 * Every number is taken from a published paper, dataset page, certificate or product README.
 */
import { PERSON, SITE } from "./content";

export type Link = { label: string; url: string; icon?: "phone" | "email" | "web" | "linkedin" | "github" | "orcid" };
export type Role = { title: string; dates: string };
export type Entry = {
  title: string; right: string; sub: string; subRight: string;
  /** positions held at one employer, newest first; each gets its own line with its dates */
  roles?: Role[];
  current?: boolean; compact?: boolean; bullets?: string[];
};
export type Project = { name: string; tech: string; links: Link[]; bullets: string[] };

export const RESUME = {
  name: PERSON.name,
  contacts: [
    { label: "+91 9351609343", url: "tel:+919351609343", icon: "phone" },
    { label: PERSON.email, url: `mailto:${PERSON.email}`, icon: "email" },
    { label: "Portfolio", url: SITE.url, icon: "web" },
    { label: "LinkedIn", url: PERSON.links.linkedin, icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/agarwalpranay02", icon: "github" },
    { label: "ORCID", url: PERSON.links.orcid, icon: "orcid" },
  ] as Link[],

  education: [
    {
      title: "Birla Institute of Technology, Mesra",
      right: "India",
      sub: "Bachelor of Technology in Computer Science; CGPA: 8.37/10",
      subRight: "2022 – 2026",
    },
    {
      title: "Blue Heaven Vidyalaya",
      right: "Jaipur, India",
      sub: "Senior Secondary (Class XII), CBSE: 92.4%",
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
      title: "MaxBrain Technologies",
      right: "Jul 2025 – Present",
      sub: "AI/ML Engineer (Jan 2026 – Present); AI/ML Research Intern (Jul 2025 – Dec 2025)",
      subRight: "Jaipur, India",
      current: true,
      bullets: [
        "Ran a **bibliometric review of 1,081 papers (2014–2024)** on deep learning for plant disease detection with **Lens.org, Scopus and VOSviewer**; published in [Springer Nature's Discover AI](https://doi.org/10.1007/s44163-026-02310-z).",
        "Collected **600 ridge gourd leaf photos** on farms in Jaipur and expanded them to a **9,000-image dataset** with 15 preprocessing techniques; [published on IEEE DataPort](https://ieee-dataport.org/documents/preprocessed-indian-ridge-gourd-leaf-image-dataset-healthy-and-diseased-leaf-minor), featured in its newsletter.",
        "Benchmarked **5 models** and designed a **DenseNet121 + XGBoost** hybrid with **92.0% accuracy (F1 0.92)** vs 89.6% for the best CNN; **first-author** Springer paper, MIND 2025 ([code](https://github.com/agarwalpranay02/Hybrid-Deep-Learning-for-Plant-Disease-Diagnosis)).",
        "Co-developed **Fasal Saathi**, an AI Android app for one-photo leaf diagnosis, [live on Google Play](https://play.google.com/store/apps/details?id=com.param.finddiseaseai) with **100+ downloads**; covered by **Punjab Kesari**.",
        "Extended to brinjal: a **13,600-image dataset** from 850 field photos on [Mendeley Data](https://data.mendeley.com/datasets/c39p3k87g2), adding a second crop to the app.",
        "Co-designed an **IoT device for real-time leaf image capture and augmentation** to replace one-by-one phone photos; **design registered with the Government of India** ([No. 476293-001](https://drive.google.com/file/d/1fnbNIrKeal7NGtuPIZunkuAs7jU-0VHw/view?usp=sharing)).",
      ],
    },
    {
      title: "Starlight Data Solutions",
      right: "May 2025 – Jul 2025",
      sub: "Software Engineering Intern",
      subRight: "Noida, India",
      bullets: [
        "Contributed to an **automated firmware management system** tracking releases across OEM vendor websites.",
        "Worked on its **Python scraping engine** (Selenium, BeautifulSoup), **Flask** API, **MongoDB** and **Elasticsearch**.",
      ],
    },
  ] as Entry[],

  projects: [
    {
      name: "LeafCheckup",
      tech: "PyTorch, ONNX Runtime Web, WebAssembly, Next.js, FastAPI",
      links: [
        { label: "Live", url: "https://leafcheckup.vercel.app" },
        { label: "Code", url: "https://github.com/agarwalpranay02/leafcheckup" },
      ],
      bullets: [
        "Trained **EfficientNet-B0**: **94.9% on 217 unseen leaves** (leak-free split); **98.9% vs 92.0%** over the paper baseline.",
        "Runs **fully in the browser** (ONNX Runtime Web, WebAssembly, WebGPU) at **~120 ms/photo**; offline-ready PWA.",
        "**Out-of-distribution detector (0.993 AUROC)**, calibrated confidence (**ECE 1.8%**), heatmaps, developer **API**.",
      ],
    },
    {
      name: "TinyMotion",
      tech: "TensorFlow, TFLite Micro, C99, TypeScript, Next.js",
      links: [
        { label: "Live", url: "https://tinymotion.vercel.app" },
        { label: "Code", url: "https://github.com/agarwalpranay02/tinymotion" },
      ],
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
      text: "P. Sharma, **P. Agarwal**, A. K. Bairwa, V. Sharma. *A comprehensive review and bibliometric analysis of deep learning applications in plant disease detection.* Discover Artificial Intelligence, Springer Nature, 2026.",
      url: "https://doi.org/10.1007/s44163-026-02310-z",
    },
    {
      text: "P. Sharma, **P. Agarwal**, J. Goyal. *TinyML-Based Lightweight Deep Learning Model for Human Activity Recognition on Edge Devices.* WCAIAA 2026, Springer LNNS, to appear.",
      url: "https://www.scrs.in/conference/wcaiaa2026",
    },
  ] as { text: string; url?: string }[],

  skills: [
    { label: "Languages", items: "Python, TypeScript, JavaScript, C, C++, Java, SQL, Bash" },
    { label: "ML & Computer Vision", items: "PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, timm, OpenCV, NumPy, pandas" },
    { label: "Edge & On-Device AI", items: "ONNX Runtime Web, TensorFlow Lite (INT8), TFLite Micro, WebAssembly, WebGPU" },
    { label: "Web & Data", items: "Next.js, React, Node.js, FastAPI, Flask, PostgreSQL, MongoDB, Elasticsearch, Selenium" },
    { label: "DevOps & Testing", items: "Docker, GitHub Actions, Vercel, Linux, Git, Playwright, pytest" },
  ],

  achievements: [
    "**Featured Researcher**, Springer Nature India Research Tour 2025; **paper presenter**, WCAIAA 2026, NFSU Goa.",
    "**Oracle Certified Professional**: OCI Data Science, OCI Generative AI, AI Vector Search; OCI AI Foundations Associate.",
    "**Coordinator, Sports Committee**, BIT Mesra; senior coordinator of Cavorts 2023, the annual sports tournament.",
    "**IELTS Academic**: overall band 7.5 (CEFR C1), May 2026.",
  ],
};
