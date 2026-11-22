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
    github: "https://github.com/agarwalpranay02",
  },
  orcidId: "0009-0009-6879-4074",
} as const;

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pranay-agarwal.vercel.app",
  title: "Pranay Agarwal · AI/ML Engineer",
  description:
    "Pranay Agarwal builds computer vision and on-device ML systems: four shipped products, Springer publications, public datasets and a registered design.",
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
    slug: "augleak",
    name: "AugLeak",
    tagline: "Finds the test images an image model has already seen in training",
    url: "https://augleak.vercel.app",
    image: "/img/augleak.webp",
    imageAlt: "AugLeak home page replaying an audit of the Fruits-360 split",
    summary:
      "Many image datasets ship every photo with flipped, rotated and filtered copies, so a random split puts copies of test images into training and the test score measures memory. AugLeak finds those copies from the pixels alone, at a false-link rate the user chooses, entirely in the browser. It comes with a pair inspector, a registry of audited public datasets and a developer API.",
    metrics: [
      { value: "98.2% → 73.6%", label: "reported vs fresh-photo accuracy" },
      { value: "51%", label: "of a public brain-MRI test set found in training" },
      { value: "29 / 75", label: "same images flagged as the Python reference" },
    ],
    stack: ["Python", "NumPy", "SciPy", "PyTorch", "TypeScript", "Web Workers", "Next.js", "PostgreSQL"],
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
  {
    slug: "formfino",
    name: "FormFino",
    tagline: "Application photos, signatures and PDFs sized to a form's exact rules",
    url: "https://formfino.vercel.app",
    image: "/img/formfino.webp",
    imageAlt: "FormFino home page",
    summary:
      "Reads a screenshot of a portal's upload instructions, confirms the limits with you, and turns your originals into files that meet them: exact pixel sizes, KB ranges and PDF size caps. Everything runs in the browser, so identity documents are never uploaded. It also fills PDF forms and has 69 file tools.",
    metrics: [
      { value: "2.1 MB → 46 KB", label: "photo at exactly 200 × 230 px" },
      { value: "11.6 MB → 484 KB", label: "3-page scan under a 500 KB cap" },
      { value: "69", label: "file tools, none upload your files" },
    ],
    stack: ["Next.js", "React", "TypeScript", "pdf-lib", "PDF.js", "Tesseract.js", "fflate", "Vercel"],
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

/** Class X and XII results, from the CBSE marksheets (best five subjects). */
export const SCHOOLING = [
  { level: "Class XII, CBSE", school: "Blue Heaven Vidyalaya, Jaipur", score: "92.4%", year: "2022" },
  { level: "Class X, CBSE", school: "Ryan International School, Jaipur", score: "91.4%", year: "2020" },
];

export const EDUCATION = {
  school: "Birla Institute of Technology, Mesra",
  degree: "B.Tech, Computer Science",
  period: "2022 – 2026",
  grade: "CGPA 8.37 / 10",
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
  { title: "Coordinator, Sports Committee, BIT Mesra", detail: "Senior coordinator for Cavorts 2023, the annual sports tournament held on 1–2 November 2023: planning, scheduling and running the events." },
  { title: "Volunteer, Ginor Devi Trust with BMVSS", detail: "Prosthetic limb distribution and fitting camps; recognised for outstanding service to the community, January 2026." },
  { title: "Volunteer caretaker, Ashirvad Old Age Home, Jaipur", detail: "December 2024 to August 2025." },
];

/* ---------------------------------------------------------------- case studies (/work) */

export type Stage = { where: string; title: string; detail: string };
export type Decision = { title: string; detail: string };
export type CaseStudy = {
  slug: "leafcheckup" | "tinymotion" | "formfino" | "augleak";
  problem: string;
  approach: string;
  results: { label: string; value: string; note?: string }[];
  resultsNote: string;
  pipeline: Stage[];
  decisions: Decision[];
  shots: { src: string; alt: string; w: number; h: number; caption: string }[];
  stack: { area: string; items: string }[];
  quality: string[];
  /** the paper a product grew out of, if any */
  research?: string;
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
    slug: "augleak",
    problem:
      "Many public image datasets are released already augmented: each photo comes with rotated, flipped, recoloured and filtered copies, and nothing in the file list says which files belong together. Split such a release at random and almost every test image has a copy in training, so the reported accuracy measures memory. On a dataset built this way, a fine-tuned MobileNetV3 reported 98.2% and scored 73.6% on fresh photographs.",
    approach:
      "AugLeak finds the copies without the creator's metadata. It compares every pair of images under 28 transforms in two pixel views, then turns the scores into p-values with a null model calibrated on matches between classes. The browser version runs in Web Workers on the user's device and reproduces the Python research code exactly.",
    results: [
      { label: "MobileNetV3 fine-tuned on a random split, 16 copies per photo", value: "98.2% reported", note: "73.6% on fresh photographs; EfficientNet-B0 98.8% vs 75.0%" },
      { label: "Finding copies, average precision on a leaf dataset with known groups", value: "0.76", note: "against 0.20 for an ImageNet-embedding baseline" },
      { label: "Accuracy overstatement left after evaluation", value: "+1.1 points", note: "against +7.7 with a naive random split" },
      { label: "Brain Tumor MRI (Kaggle), official test set", value: "51% leaked", note: "88 of 394 test images byte-identical to training images" },
      { label: "PlantDoc, official test set", value: "8.9% compromised", note: "including test images filed in training under another label" },
      { label: "Browser engine against the Python reference", value: "identical", note: "same 29 of 75 test images flagged on the demo split, in 8 s" },
    ],
    resultsNote:
      "Every number comes from the experiments in the open research code, and one script regenerates every figure, table and number from the saved results.",
    pipeline: [
      { where: "Browser", title: "Read", detail: "Folders or ZIP files read in the tab; nothing is uploaded" },
      { where: "Workers", title: "Two views", detail: "A blurred grey thumbnail in a centred disc and a 64-bit DCT hash, one worker per core" },
      { where: "Workers", title: "Transform search", detail: "Each test image tried in 28 versions against every training image of its class" },
      { where: "Workers", title: "Calibrate", detail: "Hubness correction, then a Gumbel null fitted on matches to other classes gives a p-value per pair" },
      { where: "Page", title: "Report", detail: "Flagged pairs, per-class rates, a clean test list and a group-aware split, as CSV, JSON or Markdown" },
    ],
    decisions: [
      {
        title: "Calibrate on other classes, not on a threshold",
        detail:
          "An edited copy never changes class, so an image's best match in another class is a match to an unrelated image. Fitting those maxima gives a false-link rate the user can set, instead of a similarity cut-off that means something different on every dataset.",
      },
      {
        title: "Port the reference exactly",
        detail:
          "The browser engine reproduces Pillow's bilinear resampling, SciPy's filters and rotation, Python's round-half-even crops and float16 rounding. The website and the research code flag the same images, and a parity test checks it on every push.",
      },
      {
        title: "Always link exact copies",
        detail:
          "The brain-MRI audit showed that hubness correction can hide verbatim copies inside a class of near-identical scans. Byte-identical files of the same class are now linked unconditionally.",
      },
      {
        title: "Keep datasets on the device",
        detail:
          "Datasets are often unreleased or medical, so the audit runs in Web Workers in the user's own browser. There is no upload API, no file storage and no cost per audit.",
      },
    ],
    shots: [
      { src: "/img/augleak-result.webp", alt: "AugLeak audit result: 29 of 75 test images have a copy in training, by class", w: 900, h: 562, caption: "An audit of the Fruits-360 split: every flagged pair, with its p-value and the transform that matched." },
      { src: "/img/augleak-phone.webp", alt: "AugLeak audit result on a phone", w: 600, h: 1298, caption: "The same audit on a phone." },
    ],
    stack: [
      { area: "Detection", items: "Structure and perceptual-hash views, a 28-transform search, hubness correction, a label-calibrated Gumbel null and Bonferroni combination" },
      { area: "Research code", items: "Python, NumPy, SciPy, Pillow, PyTorch and timm baselines, scikit-learn, Matplotlib" },
      { area: "In the browser", items: "TypeScript engine in module Web Workers, createImageBitmap and OffscreenCanvas decoding, JSZip, IndexedDB, an offline service worker" },
      { area: "Web and API", items: "Next.js 16, React 19, Tailwind CSS 4, sharp, better-auth, Drizzle ORM and PostgreSQL, hashed API keys with quotas" },
    ],
    quality: [
      "Parity tests compare features, scores, p-values and flagged images with fixtures made by the Python code",
      "Playwright end-to-end tests on desktop and mobile cover every page, the demo audit and the API",
      "Per-request CSP nonces, security headers, hashed and peppered API keys",
      "GitHub Actions runs lint, type-checks, tests, a production build, CodeQL, gitleaks and dependency audits",
    ],
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
  {
    slug: "formfino",
    problem:
      "Every exam, job and visa portal sets its own upload rules: a JPG photo of exactly 200 × 230 px between 20 and 50 KB, a signature under 20 KB, a marksheet PDF under 500 KB. Applicants bounce between converter sites, uploading identity documents to each one, and still see \"file size not within limit\" an hour before the deadline.",
    approach:
      "FormFino reads the rules from a screenshot with OCR that runs in the browser, shows each detected limit beside the text it came from for the applicant to confirm, and then prepares every file on the device. Nothing is uploaded, so the app needs no upload API, database or paid OCR service.",
    results: [
      { label: "Photo, 2.1 MB original, rule: JPG, 200 × 230 px, 20–50 KB", value: "46.0 KB", note: "exactly 200 × 230 px" },
      { label: "Signature, 58.4 KB PNG, rule: JPG, 300 × 100 px, up to 20 KB", value: "13.7 KB", note: "exactly 300 × 100 px" },
      { label: "Scanned PDF, 3 pages, 11.6 MB, rule: up to 500 KB", value: "483.8 KB", note: "rebuilt at 144 DPI, the highest resolution that fits" },
      { label: "File tools", value: "69", note: "26 PDF, 20 image, 16 text and 7 data tools" },
      { label: "Automated checks", value: "145 passing", note: "91 in-browser checks covering every tool, and 54 unit tests" },
      { label: "Files sent to a server", value: "none" },
    ],
    resultsNote:
      "The three file results were measured on the live site, using the built-in sample form and generated test files. The checks were run on the release build.",
    pipeline: [
      { where: "Page", title: "Read the rules", detail: "Tesseract.js OCR in a worker, with a self-hosted English model whose checksum is pinned" },
      { where: "Page", title: "Parse", detail: "Lines grouped by subject; format, pixel size and decimal KB limits extracted, units never guessed" },
      { where: "Applicant", title: "Confirm", detail: "Every value shown beside its source text, editable before anything runs" },
      { where: "Page", title: "Prepare", detail: "Canvas resize and a JPEG quality search for images; pdf-lib and PDF.js for documents" },
      { where: "Page", title: "Verify and download", detail: "Size, format and dimensions measured again; ZIP and a check report" },
    ],
    decisions: [
      {
        title: "Never upload a document",
        detail:
          "Portals ask for identity cards, marksheets and signatures, so even the OCR runs in the browser. With no server-side processing the app costs nothing to host and has no store of personal files to leak.",
      },
      {
        title: "Ask, don't guess",
        detail:
          "OCR misreads small print, and a wrong limit means a rejected application. The parser leaves a field blank when it is unsure, and the applicant confirms every value against the text it was read from.",
      },
      {
        title: "Change a PDF as little as possible",
        detail:
          "A PDF that already fits is passed through untouched. Otherwise it is re-saved losslessly first. Only then are up to 20 pages rebuilt as images, with a warning that text is no longer selectable. Digitally signed PDFs are refused, since compressing them would break the signature.",
      },
      {
        title: "Hit the byte range from both sides",
        detail:
          "A 12-step binary search finds the highest JPEG quality under the maximum. When a portal also sets a minimum, the JPEG file is padded to reach it, so the image itself does not change.",
      },
    ],
    shots: [
      { src: "/img/formfino-result.webp", alt: "FormFino review step listing the three prepared files with their sizes", w: 900, h: 871, caption: "Review and download: every file re-measured against the confirmed rules." },
      { src: "/img/formfino-phone.webp", alt: "FormFino on a phone", w: 600, h: 1298, caption: "On a phone, where most applicants fill these forms." },
    ],
    stack: [
      { area: "Documents", items: "pdf-lib to build, merge, compress and fill PDFs; PDF.js to render pages; AcroForm field editing; JPEG padding for minimum sizes" },
      { area: "OCR", items: "Tesseract.js in a Web Worker with a self-hosted English model, worker code and fonts" },
      { area: "Web", items: "Next.js 16, React 19, TypeScript, Tailwind CSS 4, installable web app with a service worker, light and dark themes" },
      { area: "Data and files", items: "fflate for ZIP files, Papa Parse for CSV, bounded file, page, pixel and text limits" },
    ],
    quality: [
      "91 in-browser checks run all 69 tools, regression cases and the full prepare-files workflow",
      "54 unit tests for requirement parsing, limits, file validation, PDF form round trips and analytics privacy",
      "Per-request CSP nonces, security headers and rejection of unsupported write methods",
      "GitHub Actions runs the tests, a production build and a dependency audit on every push",
    ],
  },
];
