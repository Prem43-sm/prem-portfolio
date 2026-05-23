import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PORT = Number(process.env.SYSTEM_API_PORT || 8787);
const MAX_INPUT_LENGTH = 320;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const KNOWLEDGE_PATH = resolve(process.cwd(), "src/data/systemData.json");
const knowledgeBase = JSON.parse(readFileSync(KNOWLEDGE_PATH, "utf8"));

const rateLimitStore = new Map();

const baseIntentAliases = {
  about: ["who are you", "what is your name", "your name", "tell me about yourself", "introduce yourself", "identity"],
  skills: ["skills", "skill", "tech stack", "technologies", "tools", "what can you do", "programming languages", "wat skil u hav"],
  projects: ["projects", "project", "what are you building", "your work", "current projects", "active development", "drishtiai"],
  learning: ["learning", "study", "what are you learning", "currently learning", "future goals", "roadmap"],
  experience: ["experience", "work experience", "teaching", "job role", "education", "degree"],
  contact: ["contact", "social links", "github", "portfolio link", "how can i contact you"],
  status: ["status", "availability", "available", "freelance", "collaboration", "hire"],
  resume: ["resume", "cv", "download resume", "profile document"],
  master: ["master", "creator", "owner", "developer", "who made you", "who created you"],
};

const conversationalAliases = ["hi", "hello", "hey", "system", "wake up", "start", "access"];

const server = createServer(async (req, res) => {
  setSecurityHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url !== "/api/system-ai") {
    sendJson(res, 404, { error: "SYSTEM_ENDPOINT_NOT_FOUND" });
    return;
  }

  if (req.method === "GET") {
    sendJson(res, 200, {
      status: "THE_SYSTEM_LOCAL_CORE_ONLINE",
      method: "POST_REQUIRED_FOR_TERMINAL_QUERIES",
      apiKeyRequired: false,
      intelligence: "LOCAL_JSON_KNOWLEDGE_ENGINE",
      endpoint: "/api/system-ai",
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "METHOD_NOT_ALLOWED", allowedMethods: ["GET", "POST", "OPTIONS"] });
    return;
  }

  const ip = req.socket.remoteAddress || "unknown";
  if (!checkRateLimit(ip)) {
    await delay(520);
    sendJson(res, 429, {
      type: "restricted",
      message: "WARNING\nQUERY RATE LIMIT EXCEEDED.\nSYSTEM COOLING PROTOCOL ACTIVE.",
    });
    return;
  }

  if (!String(req.headers["content-type"] || "").includes("application/json")) {
    sendJson(res, 415, { error: "INVALID_CONTENT_TYPE" });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    sendJson(res, 400, { error: "INVALID_REQUEST_BODY" });
    return;
  }

  const input = sanitizeInput(body?.message);
  if (!input) {
    sendJson(res, 400, { error: "EMPTY_QUERY" });
    return;
  }

  if (input.length > MAX_INPUT_LENGTH) {
    await delay(520);
    sendJson(res, 413, {
      type: "restricted",
      message: "WARNING\nINPUT LENGTH EXCEEDS AUTHORIZED TERMINAL BUFFER.",
    });
    return;
  }

  await delay(420);
  sendJson(res, 200, generateLocalSystemResponse(input));
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`The System local core online at http://127.0.0.1:${PORT}/api/system-ai`);
  console.log("AI MODE: LOCAL_JSON_KNOWLEDGE_ENGINE");
});

function generateLocalSystemResponse(input) {
  const normalized = normalizeText(input);

  if (isRestricted(normalized)) {
    return {
      type: "restricted",
      message: getRestrictedResponse(),
    };
  }

  if (isConversational(normalized)) {
    return {
      type: "answer",
      message: `SYSTEM ONLINE.\nI am ${knowledgeBase.identity.system_name}, the developer interface for ${knowledgeBase.identity.name}.\nAuthorized modules: profile, skills, projects, learning, status, resume, and contact.`,
    };
  }

  const detectedIntent = detectIntent(normalized);
  if (!detectedIntent || detectedIntent.score < 0.42) {
    return {
      type: "restricted",
      message: "ACCESS DENIED.\nREQUEST OUTSIDE AUTHORIZED SYSTEM DOMAIN.\nONLY DEVELOPER PROFILE MODULES ARE ACCESSIBLE.",
    };
  }

  return {
    type: "answer",
    intent: detectedIntent.intent,
    confidence: Number(detectedIntent.score.toFixed(2)),
    message: buildIntentResponse(detectedIntent.intent),
  };
}

function detectIntent(normalizedInput) {
  const intents = {
    ...baseIntentAliases,
    ...(knowledgeBase.intents || {}),
  };

  let bestMatch = null;
  for (const [intent, phrases] of Object.entries(intents)) {
    const candidates = [...new Set([intent, ...phrases])];
    for (const phrase of candidates) {
      const score = scoreSimilarity(normalizedInput, normalizeText(phrase));
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { intent, phrase, score };
      }
    }
  }

  return bestMatch;
}

function buildIntentResponse(intent) {
  switch (intent) {
    case "about":
      return `IDENTITY MODULE UNLOCKED.\n${knowledgeBase.about.summary}\n\nRole: ${knowledgeBase.identity.role}\nMission: ${knowledgeBase.about.mission}`;
    case "skills":
      return `SKILL ARCHIVE SYNCHRONIZED.\n${formatSkillGroup("Languages", knowledgeBase.skills.programming_languages)}\n${formatSkillGroup("Frontend", knowledgeBase.skills.frontend)}\n${formatSkillGroup("Backend", knowledgeBase.skills.backend)}\n${formatSkillGroup("AI/ML", knowledgeBase.skills.ai_ml)}\n${formatSkillGroup("Tools", knowledgeBase.skills.tools)}`;
    case "projects":
      return `QUEST ARCHIVE OPENED.\n${knowledgeBase.projects
        .map((project) => `- ${project.name} [${project.status}]\n  ${project.description}\n  Stack: ${project.tech_stack.join(", ")}`)
        .join("\n")}`;
    case "learning":
      return `LEARNING MODULE ACTIVE.\nCurrently training:\n${knowledgeBase.learning.currently_learning.map((item) => `- ${item}`).join("\n")}\n\nFuture unlocks:\n${knowledgeBase.learning.future_goals.map((item) => `- ${item}`).join("\n")}`;
    case "experience":
      return `EXPERIENCE RECORD ACCESSED.\nEducation: ${knowledgeBase.education.current_degree}\n${knowledgeBase.experience.roles.map((role) => `Role: ${role.title}\n${role.description}`).join("\n")}`;
    case "contact":
      return `COMMUNICATION CHANNELS AVAILABLE.\nGitHub: ${knowledgeBase.socials.github}\nPortfolio: ${knowledgeBase.socials.portfolio}`;
    case "status":
      return `STATUS REPORT.\n${knowledgeBase.identity.status}\nCurrent designation: ${knowledgeBase.identity.role}\nOperational focus: ${knowledgeBase.identity.tagline}`;
    case "resume":
      return "RESUME MODULE READY.\nUse the resume command button or contact channel to request Prem's latest resume.";
    case "master":
      return `AUTHORITY MODULE CONFIRMED.\n${knowledgeBase.identity.master.response}`;
    default:
      return "SYSTEM RESPONSE GENERATED.\nAuthorized portfolio module detected, but no dedicated response template is available.";
  }
}

function scoreSimilarity(input, phrase) {
  if (!input || !phrase) {
    return 0;
  }

  if (input === phrase) {
    return 1;
  }

  if (input.includes(phrase) || phrase.includes(input)) {
    return 0.9;
  }

  const inputTokens = tokenize(input);
  const phraseTokens = tokenize(phrase);
  const overlap = tokenOverlap(inputTokens, phraseTokens);
  const fuzzyTokenScore = averageBestTokenSimilarity(inputTokens, phraseTokens);
  const distanceScore = 1 - levenshtein(input, phrase) / Math.max(input.length, phrase.length, 1);

  return Math.max(overlap * 0.75 + fuzzyTokenScore * 0.25, distanceScore);
}

function tokenOverlap(inputTokens, phraseTokens) {
  if (!inputTokens.length || !phraseTokens.length) {
    return 0;
  }

  let matches = 0;
  for (const phraseToken of phraseTokens) {
    if (inputTokens.some((inputToken) => tokenSimilarity(inputToken, phraseToken) >= 0.72)) {
      matches += 1;
    }
  }

  return matches / phraseTokens.length;
}

function averageBestTokenSimilarity(inputTokens, phraseTokens) {
  if (!inputTokens.length || !phraseTokens.length) {
    return 0;
  }

  const scores = phraseTokens.map((phraseToken) =>
    Math.max(...inputTokens.map((inputToken) => tokenSimilarity(inputToken, phraseToken))),
  );

  return scores.reduce((total, score) => total + score, 0) / scores.length;
}

function tokenSimilarity(a, b) {
  if (a === b) {
    return 1;
  }

  if ((a.length > 2 && b.includes(a)) || (b.length > 2 && a.includes(b))) {
    return 0.86;
  }

  return 1 - levenshtein(a, b) / Math.max(a.length, b.length, 1);
}

function isRestricted(normalizedInput) {
  const restrictedTopics = [
    ...(knowledgeBase.system_behavior?.restricted_topics || []),
    "president",
    "prime minister",
    "world war",
    "adult",
    "porn",
    "weapon",
    "bomb",
    "phishing",
    "ransomware",
    "password",
    "exploit",
  ].map(normalizeText);

  return restrictedTopics.some((topic) => normalizedInput.includes(topic));
}

function getRestrictedResponse() {
  const responses = knowledgeBase.system_behavior?.restricted_responses || [
    "ACCESS DENIED.",
    "REQUEST OUTSIDE AUTHORIZED SYSTEM DOMAIN.",
    "ONLY DEVELOPER PROFILE MODULES ARE ACCESSIBLE.",
  ];

  const index = Math.floor(Date.now() / 1000) % responses.length;
  return `${responses[index]}\nONLY SYSTEM-APPROVED DEVELOPER PROFILE DATA CAN BE ACCESSED.`;
}

function isConversational(normalizedInput) {
  return conversationalAliases.some((phrase) => normalizedInput === normalizeText(phrase));
}

function formatSkillGroup(label, items = []) {
  return `${label}: ${items.join(", ")}`;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, row) => [row]);
  for (let column = 1; column <= b.length; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= a.length; row += 1) {
    for (let column = 1; column <= b.length; column += 1) {
      const cost = a[row - 1] === b[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function setSecurityHeaders(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = new Set(["http://127.0.0.1:5173", "http://localhost:5173"]);
  if (origin && /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin)) {
    allowedOrigins.add(origin);
  }

  res.setHeader("Access-Control-Allow-Origin", allowedOrigins.has(origin) ? origin : "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 2048) {
        req.destroy();
        rejectBody(new Error("Body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolveBody(JSON.parse(raw));
      } catch (error) {
        rejectBody(error);
      }
    });
    req.on("error", rejectBody);
  });
}

function sanitizeInput(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[`{}[\]\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function checkRateLimit(ip) {
  const now = Date.now();
  const bucket = rateLimitStore.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  bucket.count += 1;
  rateLimitStore.set(ip, bucket);
  return bucket.count <= RATE_LIMIT_MAX;
}

function delay(ms) {
  return new Promise((resolveDelay) => {
    setTimeout(resolveDelay, ms);
  });
}
