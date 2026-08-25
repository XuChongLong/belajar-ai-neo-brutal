import type { IntensiveSource } from "./intensiveCourseFactory";

export const intensiveSources = {
  cloud: {
    aws: { label: "AWS Well-Architected", url: "https://aws.amazon.com/architecture/well-architected/", note: "Fondasi keputusan cloud: operasi, keamanan, reliabilitas, performa, biaya, dan keberlanjutan." },
    docker: { label: "Docker Get Started", url: "https://docs.docker.com/get-started/", note: "Dasar image, container, dan workflow development." },
    kubernetes: { label: "Kubernetes Concepts", url: "https://kubernetes.io/docs/concepts/overview/", note: "Referensi workload, service, konfigurasi, storage, security, dan operasi cluster." },
    terraform: { label: "Terraform Documentation", url: "https://developer.hashicorp.com/terraform/docs", note: "Rujukan Infrastructure as Code dan perubahan terkontrol." },
    githubActions: { label: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions", note: "Rujukan workflow CI/CD, environment, secret, artifact, dan deployment." },
    prometheus: { label: "Prometheus Overview", url: "https://prometheus.io/docs/introduction/overview/", note: "Rujukan metrics, alerting, dan observability berbasis time series." },
    video: { label: "Full Stack AI DevOps Course", url: "https://www.youtube.com/watch?v=Kb-sw00KJ10", note: "Peta video untuk Docker, Kubernetes, CI/CD, dan Terraform; baca bersama dokumentasi resmi." },
  },
  data: {
    pandas: { label: "pandas Documentation", url: "https://pandas.pydata.org/docs/", note: "Struktur data dan analisis tabular Python." },
    postgres: { label: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/", note: "Referensi SQL, desain relasional, dan query." },
    dbt: { label: "dbt Introduction", url: "https://docs.getdbt.com/docs/introduction", note: "Transformasi modular, lineage, test, contract, dan governance." },
    airflow: { label: "Apache Airflow Documentation", url: "https://airflow.apache.org/docs/", note: "DAG, orkestrasi, retry, log, provider, dan deployment workflow." },
    gx: { label: "Great Expectations Documentation", url: "https://docs.greatexpectations.io/docs/", note: "Pemeriksaan ekspektasi dan kualitas data yang dapat diuji." },
    looker: { label: "Looker Studio Documentation", url: "https://docs.cloud.google.com/data-studio", note: "Visualisasi, dashboard, dan pelaporan." },
    video: { label: "Data Engineering Course for Beginners", url: "https://www.youtube.com/watch?v=PHsC_t0j1dU", note: "Konteks video untuk database, Docker, dan analytical engineering." },
  },
  product: {
    pair: { label: "Google People + AI Guidebook", url: "https://pair.withgoogle.com/guidebook/", note: "Panduan kebutuhan pengguna, mental model, trust, controls, feedback, dan failure mode AI." },
    nist: { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", note: "Kerangka Govern, Map, Measure, Manage untuk mengelola risiko AI." },
    principles: { label: "Google AI Principles", url: "https://ai.google/responsibility/principles/", note: "Konteks oversight, testing, monitoring, safeguard, privacy, dan IP." },
    nistVideo: { label: "NIST AI RMF Explainer Video", url: "https://www.nist.gov/video/introduction-nist-ai-risk-management-framework-ai-rmf-10-explainer-video", note: "Pengantar video resmi tentang AI RMF." },
    video: { label: "AI Product Management Masterclass", url: "https://www.youtube.com/watch?v=KjYCEiBTHFo", note: "Konteks product AI, agent, RAG, evaluasi, dan LLM." },
  },
  automation: {
    n8n: { label: "n8n Documentation", url: "https://docs.n8n.io/welcome.md", note: "Rujukan node, execution, credentials, trigger, data, dan workflow." },
    n8nBuild: { label: "n8n: Build Your First Workflow", url: "https://docs.n8n.io/build-your-first-workflow.md", note: "Panduan workflow, test data, dan validasi dasar." },
    zapier: { label: "Zapier: Get Started", url: "https://zapier.com/blog/get-started-with-zapier/", note: "Trigger, action, mapping, testing, publish, tables, interfaces, dan agents." },
    githubActions: { label: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions", note: "Workflow as code, secret, environment, audit, dan CI/CD." },
    make: { label: "Make Platform", url: "https://www.make.com/en", note: "Konteks orkestrasi visual lintas aplikasi." },
    video: { label: "n8n Full Course", url: "https://www.youtube.com/watch?v=2GZ2SNXWK-c", note: "Peta video workflow automation end-to-end." },
    hitl: { label: "Why AI Agents Need a Human in the Loop", url: "https://www.youtube.com/watch?v=cmEJ-5zYKHA", note: "Konteks approval, accountability, dan batas agent." },
  },
  creative: {
    adobe: { label: "Adobe Content Credentials Overview", url: "https://helpx.adobe.com/creative-cloud/apps/adobe-content-authenticity/content-credentials/overview.html", note: "Attribution, transparansi, generative-AI disclosure, dan version history." },
    c2pa: { label: "C2PA Content Credentials", url: "https://c2pa.org/", note: "Standar provenance dan transparansi asal/edit media." },
    wipo: { label: "WIPO: Artificial Intelligence and IP", url: "https://www.wipo.int/en/web/frontier-technologies/artificial-intelligence/index", note: "Konteks hak, training data, attribution, consent, compensation, dan isu lintas yurisdiksi." },
    copyright: { label: "U.S. Copyright Office: Copyright and AI", url: "https://www.copyright.gov/ai/", note: "Konteks digital replicas, copyrightability, dan training data." },
    adobeVideo: { label: "Adobe Content Authenticity Playlist", url: "https://www.youtube.com/playlist?list=PL7Fkn3UclHZMVBMbjtyVH7Z3A9Itxp6yt", note: "Video praktik Content Credentials dan preference penggunaan generative AI." },
    c2paVideo: { label: "C2PA Digital Content Provenance Virtual Event", url: "https://www.youtube.com/watch?v=vrrA_UJTZHM", note: "Konteks ekosistem dan standar provenance." },
  },
} as const satisfies Record<string, Record<string, IntensiveSource>>;
