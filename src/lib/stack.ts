import "server-only";
import * as si from "simple-icons";

type Icon = { path: string; hex: string };
export type Tool = { name: string; icon?: Icon; note?: string };
export type ToolGroup = { name: string; blurb: string; tools: Tool[] };

const ic = (key: keyof typeof si): Icon | undefined => {
  const v = si[key] as unknown as { path?: string; hex?: string } | undefined;
  return v?.path ? { path: v.path, hex: v.hex ?? "000000" } : undefined;
};

const t = (name: string, key?: keyof typeof si, note?: string): Tool => ({ name, icon: key ? ic(key) : undefined, note });

/** Only tools used in the products, papers and roles on this site. */
export const STACK: ToolGroup[] = [
  {
    name: "Machine learning",
    blurb: "Training, evaluation and the statistics that make a number trustworthy.",
    tools: [
      t("PyTorch", "siPytorch"), t("TensorFlow", "siTensorflow"), t("Keras", "siKeras"), t("scikit-learn", "siScikitlearn"),
      t("XGBoost"), t("timm", undefined, "EfficientNet"), t("NumPy", "siNumpy"), t("pandas", "siPandas"), t("SciPy", "siScipy"),
      t("OpenCV", "siOpencv"), t("Hugging Face", "siHuggingface"),
    ],
  },
  {
    name: "On-device and edge AI",
    blurb: "Getting models small and fast enough to run where the data is.",
    tools: [
      t("ONNX", "siOnnx"), t("ONNX Runtime Web"), t("WebAssembly", "siWebassembly"), t("WebGPU", "siWebgpu"),
      t("TensorFlow Lite", "siTensorflow", "INT8"), t("TFLite Micro"), t("C99 inference", "siC"), t("Arduino", "siArduino"),
    ],
  },
  {
    name: "Generative AI",
    blurb: "Retrieval and language-model tooling, with Oracle certifications in both.",
    tools: [t("LangChain", "siLangchain"), t("OpenAI API"), t("RAG"), t("Vector search"), t("Prompt engineering")],
  },
  {
    name: "Languages",
    blurb: "",
    tools: [
      t("Python", "siPython"), t("TypeScript", "siTypescript"), t("JavaScript", "siJavascript"), t("C", "siC"),
      t("C++", "siCplusplus"), t("Java", "siOpenjdk"), t("SQL", "siPostgresql"), t("Bash", "siGnubash"), t("HTML", "siHtml5"), t("CSS", "siCss"),
    ],
  },
  {
    name: "Web and APIs",
    blurb: "Products people can use, not notebooks.",
    tools: [
      t("Next.js", "siNextdotjs"), t("React", "siReact"), t("Tailwind CSS", "siTailwindcss"), t("Node.js", "siNodedotjs"),
      t("FastAPI", "siFastapi"), t("Flask", "siFlask"), t("Zod", "siZod"), t("Better Auth", "siBetterauth"), t("PWA", "siPwa"),
    ],
  },
  {
    name: "Data and infrastructure",
    blurb: "",
    tools: [
      t("PostgreSQL", "siPostgresql"), t("MongoDB", "siMongodb"), t("Elasticsearch", "siElasticsearch"), t("Neon", "siNeon"), t("Drizzle ORM", "siDrizzle"), t("Docker", "siDocker"),
      t("Vercel", "siVercel"), t("GitHub Actions", "siGithubactions"), t("Prometheus", "siPrometheus"),
      t("OpenTelemetry", "siOpentelemetry"), t("Linux", "siLinux"), t("Oracle Cloud"),
    ],
  },
  {
    name: "Testing and research tools",
    blurb: "",
    tools: [
      t("Playwright"), t("Vitest", "siVitest"), t("pytest", "siPytest"), t("Jupyter", "siJupyter"),
      t("Google Colab", "siGooglecolab"), t("LaTeX", "siLatex"), t("Git", "siGit"), t("VOSviewer"),
    ],
  },
];

export const TOOL_COUNT = STACK.reduce((n, g) => n + g.tools.length, 0);
