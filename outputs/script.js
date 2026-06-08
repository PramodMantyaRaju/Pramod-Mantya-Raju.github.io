const botAnswers = {
  hire: {
    label: "Why hire Pramod Mantya Raju?",
    keywords: ["hire", "why", "value", "choose", "candidate", "sell", "brand"],
    body:
      "Hire Pramod Mantya Raju when you need a versatile Data Scientist, Data Engineer, AI Engineer, or Machine Learning Engineer who can move from raw data to models, systems, and business decisions. He combines Python, SQL, ETL/ELT, data warehousing, BI, statistical analysis, predictive modeling, ML evaluation, NLP, and stakeholder communication. His brand is practical impact: build the data foundation, validate the signal, and turn it into decisions teams can trust."
  },
  technical: {
    label: "Technical strengths",
    keywords: ["technical", "skills", "stack", "tools", "python", "sql", "etl", "pipeline", "warehouse", "ml", "machine", "nlp", "ai"],
    body:
      "Pramod Mantya Raju's technical strengths include Python, advanced SQL, ETL and ELT pipelines, data warehousing, schema design, data aggregation, BigQuery, AWS Redshift, SAP HANA, Presto, Hive, GA4, Tableau, Power BI, Qlik Sense, Excel, Pandas, NumPy, Scikit-learn, SciPy, Statsmodels, predictive modeling, LLM evaluation, NLP pipelines, classification, summarization, feature engineering, statistical validation, forecasting, and KPI automation."
  },
  education: {
    label: "Education",
    keywords: ["education", "degree", "school", "university", "masters", "master", "ms", "mtech", "be", "college"],
    body:
      "Pramod Mantya Raju has an MS in Business Analytics from San Francisco State University, an M.Tech in Computer Science and Engineering from Visvesvaraya Technological University, and a B.E. in Computer Science and Engineering from Visvesvaraya Technological University. This gives him both analytics/business context and a computer science engineering foundation."
  },
  experience: {
    label: "YOE + experience",
    keywords: ["experience", "yoe", "years", "roles", "work", "meta", "cgi", "philips", "versuni", "intern"],
    body:
      "Pramod Mantya Raju has 6+ years of combined experience across data engineering, analytics, software engineering, platform analytics, and internships, starting from his Software Engineer Intern role at Royal Philips in August 2019 through his current Data Engineer, Analytics work at Meta. His roles include Meta Data Engineer, Analytics; CGI Data Analyst Intern; Versuni Platform Analyst; Royal Philips Software Engineer; and Royal Philips Software Engineer Intern."
  },
  projects: {
    label: "Projects",
    keywords: ["project", "portfolio", "credit", "default", "brand", "audience", "retail", "transaction", "dashboard"],
    body:
      "Key projects include AI-Driven Credit Default Prediction with 87% accuracy and 15% fewer false positives, AI-Driven Brand and Audience Engagement Analytics using RoBERTa, BART, and OpenAI GPT API for NLP insight generation, and a SQL-Driven Retail Transaction System that improved forecasting accuracy by 20% and reduced reporting delays by 60%."
  },
  behavioral: {
    label: "Behavioral strengths",
    keywords: ["behavior", "team", "soft", "communication", "leadership", "stakeholder", "collaboration", "strength"],
    body:
      "Pramod Mantya Raju works well in ambiguous, cross-functional environments. He partners with product, security, compliance, marketing, and leadership teams; translates complex technical findings into business recommendations; and builds trust through measurable outcomes. His working style is structured: understand the question, build reliable data, validate the signal, and communicate the decision."
  },
  fit: {
    label: "Best role fit",
    keywords: ["fit", "role", "position", "job", "relocate", "usa", "location", "available"],
    body:
      "Best-fit roles for Pramod Mantya Raju include Data Scientist, Data Engineer, AI Engineer, Machine Learning Engineer, Analytics Engineer, Data Platform Engineer, BI Engineer, and AI/Data Systems Engineer. He is strongest where data pipelines, analytics, statistical modeling, ML systems, NLP/LLM evaluation, dashboards, and business decision support meet. He is based in San Francisco, CA and open to relocate anywhere in the United States."
  },
  contact: {
    label: "Contact",
    keywords: ["contact", "email", "phone", "linkedin", "github", "reach"],
    body:
      "You can contact Pramod Mantya Raju at pramodrspd@gmail.com or +1 628 226 5528. His LinkedIn is linkedin.com/in/pramod-mantya-raju and his GitHub is github.com/PramodMantyaRaju."
  },
  analytics: {
    label: "Visitor analytics",
    keywords: ["visitor", "visit", "count", "analytics", "who", "identity", "visited"],
    body:
      "This static preview shows a public portfolio view count using browser storage. Real visitor identity should be private for Pramod Mantya Raju and requires deployment analytics or a backend. A public website cannot securely identify who visited without consent, login, or an analytics service."
  }
};

const botWindow = document.querySelector("#bot-window");
const promptButtons = document.querySelectorAll("[data-answer]");
const botForm = document.querySelector("#bot-form");
const botQuestion = document.querySelector("#bot-question");
const visitorCount = document.querySelector("#visitor-count");

function addBotMessage(kind, label, body) {
  const message = document.createElement("div");
  message.className = `bot-message bot-message-${kind}`;

  const name = document.createElement("span");
  name.className = "bot-name";
  name.textContent = label;

  const text = document.createElement("p");
  text.textContent = body;

  message.append(name, text);
  botWindow.append(message);
  botWindow.scrollTop = botWindow.scrollHeight;
}

function findAnswer(question) {
  const normalized = question.toLowerCase();
  let bestKey = "hire";
  let bestScore = 0;

  for (const [key, answer] of Object.entries(botAnswers)) {
    const score = answer.keywords.reduce((total, keyword) => {
      return total + (normalized.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  if (bestScore === 0) {
    return {
      label: "Portfolio answer",
      body:
        "I can answer recruiter questions about Pramod Mantya Raju's education, skills, years of experience, projects, role fit, behavioral strengths, contact details, relocation, and why he is a strong Data Scientist, Data Engineer, AI Engineer, or Machine Learning Engineer candidate. Try asking: What are Pramod's strongest technical skills?"
    };
  }

  return botAnswers[bestKey];
}

function updateVisitorCount() {
  if (!visitorCount) return;
  const key = "pmr_portfolio_view_count";
  const current = Number.parseInt(localStorage.getItem(key) || "0", 10) + 1;
  localStorage.setItem(key, String(current));
  visitorCount.textContent = current.toLocaleString();
}

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = botAnswers[button.dataset.answer];
    addBotMessage("user", "Recruiter", answer.label);
    addBotMessage("assistant", "PM Bot", answer.body);
  });
});

botForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = botQuestion.value.trim();
  if (!question) return;

  const answer = findAnswer(question);
  addBotMessage("user", "Recruiter", question);
  addBotMessage("assistant", "PM Bot", answer.body);
  botQuestion.value = "";
});

updateVisitorCount();
