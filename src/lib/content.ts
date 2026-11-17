/**
 * Every fact on the site lives here. Sources: degree certificate, IELTS TRF, Oracle and McKinsey
 * certificates, design registration certificate, published papers, dataset pages, the two product
 * repositories and the user's own statements. Nothing is estimated.
 */

export const PERSON = {
  name: "Pranay Agarwal",
  initials: "PA",
  role: "AI/ML Engineer",
  company: "MaxBrain Technologies",
  location: "Jaipur, India",
  timezone: "Asia/Kolkata",
  email: "pranayagarwal2511@gmail.com",
  summary:
    "I build computer vision and on-device machine learning systems, from field datasets collected on farms to models that run in a phone's browser.",
  status: "Open to ML engineering and software engineering roles",
  links: {
    linkedin: "https://www.linkedin.com/in/pranay-agarwal-83b177295/",
    scholar: "https://scholar.google.com/citations?hl=en&user=L2xx3fgAAAAJ",
    orcid: "https://orcid.org/0009-0009-6879-4074",
  },
  orcidId: "0009-0009-6879-4074",
} as const;

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pranay-agarwal.vercel.app",
  title: "Pranay Agarwal · AI/ML Engineer",
  description:
    "Pranay Agarwal builds computer vision and on-device ML systems: two shipped AI products, Springer publications, public datasets and a registered design.",
};

export type Metric = { value: string; label: string };
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  url: string;
  image: string;
  imageAlt: string;
  summary: string;
  metrics: Metric[];
  stack: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "leafcheckup",
    name: "LeafCheckup",
    tagline: "Crop disease diagnosis from one leaf photo, on the phone",
    url: "https://leafcheckup.vercel.app",
    image: "/img/leafcheckup.webp",
    imageAlt: "LeafCheckup home page",
    summary:
      "A free, installable web app that diagnoses ridge gourd and brinjal leaf diseases. An EfficientNet-B0 model runs in the browser through ONNX Runtime Web, explains itself with a heatmap and rejects photos that are not leaves.",
    metrics: [
      { value: "94.9%", label: "accuracy on 217 unseen leaves" },
      { value: "~120 ms", label: "per photo in the browser, laptop CPU" },
      { value: "0.993", label: "AUROC for rejecting non-leaves" },
    ],
    stack: ["PyTorch", "timm", "ONNX Runtime Web", "WebAssembly", "Next.js", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    slug: "tinymotion",
    name: "TinyMotion",
    tagline: "Human activity recognition from phone motion sensors",
    url: "https://tinymotion.vercel.app",
    image: "/img/tinymotion.webp",
    imageAlt: "TinyMotion home page",
    summary:
      "Recognises walking, stairs, sitting, standing and lying down from the accelerometer and gyroscope, live in the browser. The same 35,558-parameter network ships as TensorFlow Lite INT8, a TFLite Micro array and a dependency-free C99 header for microcontrollers.",
    metrics: [
      { value: "93.4%", label: "mean accuracy, 9 unseen people, 5 runs" },
      { value: "92.8%", label: "with the phone at a random angle" },
      { value: "85.7 KB", label: "INT8 TensorFlow Lite model" },
    ],
    stack: ["TensorFlow", "TFLite Micro", "C99", "TypeScript", "Next.js", "PostgreSQL", "Playwright"],
  },
];

export type Role = {
  company: string;
  title: string;
  place: string;
  period: string;
  current?: boolean;
  note?: string;
  points: string[];
  tags: string[];
};

export const EXPERIENCE: Role[] = [
  {
    company: "MaxBrain Technologies",
    title: "AI/ML Engineer",
    place: "Jaipur",
    period: "Jul 2025 – Present",
    current: true,
    note: "Joined as an AI/ML research intern.",
    points: [
      "Built two field datasets of leaf images with farmers near Jaipur: ridge gourd (9,000 images, IEEE DataPort) and brinjal (13,600 images, Mendeley Data).",
      "Designed a DenseNet121 + XGBoost hybrid that reached 92.0% on ridge gourd disease; first author of the resulting Springer paper (MIND 2025).",
      "Co-designed an IoT device for real-time collection and augmentation of plant samples, registered with the Government of India (Design No. 476293-001).",
      "Built Fasal Saathi with a teammate, an Android app that tells farmers whether a leaf is healthy from one photo, published on Google Play by MaxBrain.",
    ],
    tags: ["Computer vision", "Dataset engineering", "PyTorch", "TensorFlow", "XGBoost", "IoT"],
  },
  {
    company: "Starlight Data Solutions",
    title: "Software Engineering Intern",
    place: "Noida",
    period: "May 2025 – Jul 2025",
    points: [
      "Contributed to an automated firmware management system that tracks firmware releases across OEM websites, so administrators no longer check each vendor's site by hand.",
      "Worked with the Python scraping engine that collects release data, the Flask backend, MongoDB storage and Elasticsearch for fast search over versions.",
    ],
    tags: ["Python", "Web scraping", "Flask", "MongoDB", "Elasticsearch"],
  },
];

export type Paper = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  status: "published" | "to appear";
  doi?: string;
  url?: string;
  note?: string;
  /** one plain-English sentence on what the paper found */
  summary: string;
  /** the shipped product this paper led to */
  product?: "leafcheckup" | "tinymotion";
};

export const PAPERS: Paper[] = [
  {
    title: "A Hybrid Deep Learning Approach for Automated Plant Disease Diagnosis in Indian Ridge Gourd: Dataset Creation and Real-World Application",
    authors: "P. Agarwal, P. Sharma, V. Sharma",
    venue: "MIND 2025, MNIT Jaipur · Springer, Communications in Computer and Information Science, vol. 2980, pp. 83–94",
    year: "2026",
    status: "published",
    doi: "10.1007/978-3-032-31233-4_7",
    url: "https://link.springer.com/chapter/10.1007/978-3-032-31233-4_7",
    note: "First author",
    product: "leafcheckup",
    summary:
      "Built a new field dataset for ridge gourd leaf disease, an underexplored crop (600 photos from farms in Vidhani, Jaipur, expanded to 9,000) and showed a DenseNet121 feature extractor with an XGBoost classifier reaches 92% accuracy, deployed as a web app for farmers.",
  },
  {
    title: "A comprehensive review and bibliometric analysis of deep learning applications in plant disease detection",
    authors: "P. Sharma, P. Agarwal, A. K. Bairwa, V. Sharma",
    venue: "Discover Artificial Intelligence 6, 1459 · Springer Nature, open access",
    year: "2026",
    status: "published",
    doi: "10.1007/s44163-026-02310-z",
    note: "Equal contribution",
    summary:
      "Reviews 1,081 publications from 2014 to 2024 on deep learning for plant disease detection, mapping which CNN approaches work, how they are evaluated and where the research community is collaborating.",
  },
  {
    title: "TinyML-Based Lightweight Deep Learning Model for Human Activity Recognition on Edge Devices",
    authors: "P. Sharma, P. Agarwal, J. Goyal",
    venue: "WCAIAA 2026, NFSU Goa · Springer, Lecture Notes in Networks and Systems",
    year: "2026",
    status: "to appear",
    url: "https://www.scrs.in/conference/wcaiaa2026",
    note: "Presented at the conference, 30–31 January 2026",
    product: "tinymotion",
    summary:
      "Compares three compact 1D networks for recognising six daily activities from smartphone sensors; MobileNet1D reaches 92.77% and keeps nearly identical accuracy after pruning and quantisation to under 1.5 MB.",
  },
];

export const DESIGN_REGISTRATION = {
  title: "IoT-based device for real-time data collection and augmentation for plant and agricultural samples",
  number: "476293-001",
  office: "Patent Office, Government of India",
  law: "Designs Act, 2000 · class 14-02",
  date: "9 October 2025",
  people: "P. Agarwal, P. Sharma, V. Sharma, A. Pancholi",
  certificate: "https://drive.google.com/file/d/1fnbNIrKeal7NGtuPIZunkuAs7jU-0VHw/view?usp=sharing",
};

export const DATASETS = [
  {
    title: "Preprocessed Indian Ridge Gourd Leaf Image Dataset (healthy, leaf miner, mosaic virus)",
    short: "Ridge gourd leaves (9,000 images)",
    host: "IEEE DataPort",
    detail: "9,000 images from 600 field photos, 3 classes, 15 preprocessing techniques per image",
    doi: "10.21227/469z-vm04",
    url: "https://ieee-dataport.org/documents/preprocessed-indian-ridge-gourd-leaf-image-dataset-healthy-and-diseased-leaf-minor",
  },
  {
    title: "Preprocessed Brinjal Leaf Image Dataset (healthy, Phomopsis blight, little leaf)",
    short: "Brinjal leaves (13,600 images)",
    host: "Mendeley Data",
    detail: "13,600 images from 850 field photos at 512 × 512, with leak-free split metadata",
    doi: "10.17632/c39p3k87g2.2",
    url: "https://data.mendeley.com/datasets/c39p3k87g2",
  },
];

export const EDUCATION = {
  school: "Birla Institute of Technology, Mesra",
  degree: "B.Tech, Computer Science",
  period: "2022 – 2026",
  grade: "CGPA 8.37 / 10 · First Class with Distinction",
  extra: { name: "IELTS Academic", score: "7.5 overall (C1)", detail: "Listening 8.0 · Reading 8.5 · Writing 7.0 · Speaking 7.0 · May 2026" },
};

export type Credential = { name: string; issuer: string; date: string; image?: string; url: string };

export const CERTIFICATIONS: Credential[] = [
  {
    name: "OCI 2025 Certified Data Science Professional",
    issuer: "Oracle",
    date: "Oct 2025",
    image: "/img/oci-data-science-professional.webp",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=ABC611AAFEF61B68E0FCF8D6FD7C7B144E8724C12DEBADA42EA189D0885B18D0",
  },
  {
    name: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    date: "Oct 2025",
    image: "/img/oci-genai-professional.webp",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4761F59297BD1B7ABAF2C51BDBBE4ACD91C92FB866EDA09431077AA62C9374B0",
  },
  {
    name: "Oracle AI Vector Search Certified Professional",
    issuer: "Oracle",
    date: "Oct 2025",
    image: "/img/oracle-ai-vector-search.webp",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D980D33A9706BAB0A5599AFDB46721A4C09D8305F76946E5C8C40AEF6B9B8B97",
  },
  {
    name: "OCI 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "Aug 2025",
    image: "/img/oci-ai-foundations.webp",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D855EE5755FA5A54CC5E51096249F84309373E41C15ED6A597C90CC21FDFC1A3",
  },
  {
    name: "McKinsey.org Forward Program",
    issuer: "McKinsey.org",
    date: "Dec 2025",
    url: "https://www.credly.com/badges/f877741b-df80-436b-886a-d376993a889e/public_url",
  },
];

export const RECOGNITION = [
  {
    title: "Featured researcher, Springer Nature India Research Tour 2025",
    detail: "Springer Nature in India spotlighted my work in its Researcher Stories series, “Empowering Farmers Through AI”, run with ICSSR and the Ministry of Education. I also received a certificate of appreciation.",
    image: "/img/springer-researcher-stories.webp",
    imageAlt: "Springer Nature Researcher Stories slide featuring Pranay Agarwal",
  },
  {
    title: "Featured in Punjab Kesari, Jaipur",
    detail: "10 October 2025. Report on the ridge gourd research, the registered design and the Fasal Saathi app.",
    image: "/img/punjab-kesari-2025-10-10.webp",
    imageAlt: "Punjab Kesari newspaper clipping, 10 October 2025",
    url: "https://drive.google.com/file/d/18E9B6SJ9ubYkws0eT9Z8jRuzZ3ren0bo/view?usp=sharing",
  },
  {
    title: "Ridge gourd dataset featured in the IEEE DataPort newsletter",
    detail: "August 2025 edition.",
  },
  {
    title: "Paper presenter, WCAIAA 2026",
    detail: "7th World Conference on Artificial Intelligence: Advances and Applications, National Forensic Sciences University, Goa, 30–31 January 2026.",
    url: "https://www.scrs.in/conference/wcaiaa2026",
  },
];

export const BEYOND = [
  { title: "Coordinator, Sports Committee, BIT Mesra (Jaipur campus)", detail: "Senior coordinator for Cavorts 2023, the annual sports tournament held on 1–2 November 2023: planning, scheduling and running the events." },
  { title: "Volunteer, Ginor Devi Trust with BMVSS", detail: "Prosthetic limb distribution and fitting camps; recognised for outstanding service to the community, January 2026." },
  { title: "Volunteer caretaker, Ashirvad Old Age Home, Jaipur", detail: "December 2024 to August 2025." },
];

/* ---------------------------------------------------------------- case studies (/work) */

export type Stage = { where: string; title: string; detail: string };
export type Decision = { title: string; detail: string };
export type CaseStudy = {
  slug: "leafcheckup" | "tinymotion";
  problem: string;
  approach: string;
  results: { label: string; value: string; note?: string }[];
  resultsNote: string;
  pipeline: Stage[];
  decisions: Decision[];
  shots: { src: string; alt: string; w: number; h: number; caption: string }[];
  stack: { area: string; items: string }[];
  quality: string[];
  research: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "leafcheckup",
    problem:
      "Farmers near Jaipur lose ridge gourd and brinjal crops to diseases that are easy to treat when caught early, but an agronomist is rarely nearby and mobile data in the fields is patchy. A diagnosis tool has to work on a cheap phone, offline, and must not guess when it is shown something it was never trained on.",
    approach:
      "I trained an EfficientNet-B0 on the two field datasets we collected and run it inside the browser with ONNX Runtime Web, so photos never leave the phone. Around the model sit the pieces that make it trustworthy in a field: calibrated confidence, a heatmap of where it looked, an out-of-distribution detector and a photo-quality check.",
    results: [
      { label: "Test accuracy, 217 unseen leaves, 6 classes", value: "94.9%", note: "95% bootstrap CI 91.7–97.7%" },
      { label: "Macro-F1", value: "0.942" },
      { label: "Calibration error after temperature scaling", value: "1.8%" },
      { label: "Rejecting photos that are not a supported leaf", value: "0.993 AUROC", note: "rejects 89.5% of 172 non-leaf images, keeps 98.6% of real leaves" },
      { label: "Browser model against PyTorch", value: "identical accuracy", note: "max output difference 4.5 × 10⁻⁵" },
      { label: "Same 88 ridge gourd leaves as the paper baseline", value: "98.9% vs 92.0%" },
      { label: "Inference in the browser", value: "~120 ms", note: "per photo, laptop CPU" },
    ],
    resultsNote:
      "Every number is on leaves the model never saw during training. Each leaf sits in exactly one split, near-duplicates are merged by perceptual hash, and photos filed under two labels are dropped.",
    pipeline: [
      { where: "Phone", title: "Capture", detail: "Photo, gallery share or live camera frame, centre-cropped" },
      { where: "Web Worker", title: "EfficientNet-B0", detail: "ONNX Runtime Web, multi-threaded WebAssembly or WebGPU" },
      { where: "Page", title: "Trust checks", detail: "Calibrated softmax, class activation map, Mahalanobis OOD, blur and exposure" },
      { where: "Page", title: "Answer", detail: "Condition, confidence, runner-ups and a field guide with next steps" },
      { where: "Server", title: "Developer API", detail: "Next.js gateway with keys and quotas, FastAPI running the same ONNX model" },
    ],
    decisions: [
      {
        title: "Found and removed leakage in our own benchmark",
        detail:
          "Under the original protocol of our MIND 2025 paper, all 545 test leaves also appeared in training as augmented copies. I rebuilt the split so every physical leaf lives in one place and re-ran the published DenseNet121 + XGBoost pipeline: it holds at 92.0%, and the new model reaches 98.9% on the same 88 leaves.",
      },
      {
        title: "Refused to guess on unknown inputs",
        detail:
          "A Mahalanobis detector on PCA-128 pooled features flags anything that is not a supported leaf, from a hand to a tomato leaf. In a farming tool, a confident wrong answer is worse than no answer.",
      },
      {
        title: "Kept the model in fp32 after measuring INT8",
        detail:
          "Full INT8 quantisation dropped accuracy to 42.9%, so the shipped model stays fp32 and gets its speed from multi-threaded WebAssembly instead, with cross-origin isolation (COOP/COEP) to unlock SharedArrayBuffer.",
      },
      {
        title: "One model behind the website and the API",
        detail:
          "The FastAPI service loads the same ONNX file the browser runs, and an export check compares it with PyTorch on the whole test set, so a developer calling the API and a farmer using the site always get the same answer.",
      },
    ],
    shots: [
      { src: "/img/leafcheckup-result.webp", alt: "LeafCheckup result with a heatmap, confidence and alternative conditions", w: 900, h: 562, caption: "A diagnosis: heatmap, calibrated confidence and the runner-up conditions." },
      { src: "/img/leafcheckup-architecture.webp", alt: "LeafCheckup architecture diagram", w: 1400, h: 875, caption: "Inference runs on the device; the server handles pages, sign-in and the API." },
    ],
    stack: [
      { area: "Machine learning", items: "PyTorch, timm EfficientNet-B0, AdamW with label smoothing, group-aware stratified splits, dHash de-duplication, temperature scaling, bootstrap CIs, Mahalanobis OOD, class activation maps, scikit-learn and XGBoost for the baseline" },
      { area: "On-device AI", items: "ONNX Runtime Web in a module Web Worker, multi-threaded WebAssembly, WebGPU for batch scans, OffscreenCanvas" },
      { area: "Web", items: "Next.js 16, React 19, TypeScript, Tailwind CSS 4, installable PWA with offline support, Web Share Target, live camera with torch control" },
      { area: "Backend", items: "Next.js route handlers, better-auth (Google, email links), Drizzle ORM, PostgreSQL on Neon, Zod, Resend, FastAPI and Uvicorn" },
      { area: "Operations", items: "Vercel, Neon, Render, OpenTelemetry, Prometheus, Docker Compose and Caddy for self-hosting" },
    ],
    quality: [
      "Playwright end-to-end tests on desktop and phone, including the live camera with a fake media device",
      "Vitest unit tests, pytest for the inference service, and a crawler that checks every page at five widths",
      "Strict nonce-based CSP, hashed and peppered API keys, CSRF guard, rate limits and monthly quotas",
      "CI on GitHub Actions with CodeQL, gitleaks, npm audit, pip-audit and Trivy image scans",
    ],
    research:
      "Built on our MIND 2025 paper (Springer CCIS vol. 2980) and the two public datasets on IEEE DataPort and Mendeley Data.",
  },
  {
    slug: "tinymotion",
    problem:
      "Activity recognition usually means streaming sensor data to a server. I wanted a model small enough for a microcontroller that still works when a real person carries a phone at whatever angle it happens to sit in their pocket.",
    approach:
      "A residual 1D CNN built from depthwise-separable convolutions reads 2.56-second windows of accelerometer and gyroscope data. Batch norm is folded into the convolutions at export and the network is written as a short op program, which a TypeScript engine in the browser, the API and a generated C header all execute.",
    results: [
      { label: "Accuracy across 5 seeds, 9 people never seen in training", value: "93.4 ± 1.1%" },
      { label: "Same test, every window rotated to a random phone angle", value: "92.8 ± 1.2%", note: "the paper's model falls to 80.3% here" },
      { label: "Parameters", value: "35,558" },
      { label: "Full-INT8 TensorFlow Lite model", value: "85.7 KB", note: "93.5% accuracy" },
      { label: "Live browser pipeline against dataset preprocessing", value: "92.81% vs 93.08%" },
    ],
    resultsNote:
      "All numbers are on the official UCI HAR test set: 2,947 windows from 9 people the model never saw. Model selection used only training subjects; four were held out to pick the epoch, then the model was retrained on all 21 and tested once.",
    pipeline: [
      { where: "Phone", title: "Motion sensors", detail: "Accelerometer and gyroscope through the browser's DeviceMotion API" },
      { where: "Page", title: "Signal pipeline", detail: "Resampled to 50 Hz and gravity-filtered the same way as the training data" },
      { where: "Page", title: "1D CNN", detail: "Plain TypeScript engine, no WebAssembly, twice a second" },
      { where: "Exports", title: "Edge formats", detail: "Keras, TFLite fp32, full-INT8 TFLite, TFLite Micro array, C99 header" },
      { where: "Server", title: "Classify API", detail: "Up to 64 windows per request, hashed keys, quotas" },
    ],
    decisions: [
      {
        title: "Trained for the pocket, not the lab",
        detail:
          "The standard benchmark assumes the phone is strapped on at a fixed angle. I added random rotation about gravity as both augmentation and a test, and made that model the default: 92.8% with the phone at any angle, where the paper's model drops to 80.3%.",
      },
      {
        title: "One op program, three runtimes",
        detail:
          "Rather than ship a WebAssembly runtime, the folded network runs as a short op program. The TypeScript engine, the API and the C header all execute the same program, and the C header is compiled with gcc -Wall -Wextra -Werror in CI and compared with Keras on the full test set.",
      },
      {
        title: "Measured the pipeline a real phone uses",
        detail:
          "Benchmarks usually reuse the dataset's own preprocessing. I ran the test set through the in-browser resampler and gravity filter instead and got 92.81% against 93.08%, so the live site performs like the reported number.",
      },
      {
        title: "Honest model selection",
        detail:
          "Test subjects were never used for tuning. Results are reported as a mean over five seeds with spread, alongside the single shipped model.",
      },
    ],
    shots: [
      { src: "/img/tinymotion-live.webp", alt: "TinyMotion recognising activity live on a phone", w: 600, h: 1298, caption: "Live mode on a phone: the activity updates twice a second." },
      { src: "/img/tinymotion-studio.webp", alt: "TinyMotion model studio with downloads and an in-browser benchmark", w: 1280, h: 800, caption: "Model studio: every export format and an in-browser benchmark." },
    ],
    stack: [
      { area: "Machine learning", items: "TensorFlow and Keras, NumPy, SciPy, depthwise-separable residual 1D CNN, rotation augmentation, multi-seed evaluation" },
      { area: "Edge deployment", items: "TensorFlow Lite fp32 and full INT8, TFLite Micro C array, dependency-free C99 header verified with gcc" },
      { area: "Web", items: "Next.js 16, React 19, TypeScript inference engine, Tailwind CSS 4, installable PWA, DeviceMotion sensors, CSV analysis and recording" },
      { area: "Backend", items: "Next.js route handlers, Google sign-in, PostgreSQL on Neon, Zod, hashed API keys with rate limits and quotas" },
    ],
    quality: [
      "Playwright tests on desktop and phone, unit tests and a production build in CI",
      "A C parity check that compiles the generated headers and compares them with Keras",
      "Strict nonce-based CSP, HSTS and a Permissions-Policy limited to the motion sensors",
      "Dependabot, CodeQL and dependency audits",
    ],
    research:
      "Built on our WCAIAA 2026 paper on TinyML activity recognition, to appear in Springer Lecture Notes in Networks and Systems.",
  },
];
