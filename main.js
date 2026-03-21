"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AIChatClipPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/api.ts
var import_obsidian = require("obsidian");
async function apiGet(settings, path) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "GET",
    headers: { Authorization: `Bearer ${settings.token}` }
  });
  return res;
}
async function apiPost(settings, path, body) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      "Content-Type": "application/json"
    },
    body: body != null ? JSON.stringify(body) : void 0
  });
  return res;
}
async function apiPut(settings, path, body) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return res;
}
async function apiPatch(settings, path, body) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      "Content-Type": "application/json"
    },
    body: body != null ? JSON.stringify(body) : void 0
  });
  return res;
}
async function registerDevice(settings) {
  if (!settings.token || !settings.deviceId) return;
  try {
    await apiPost(settings, "/api/devices", {
      deviceId: settings.deviceId,
      deviceName: import_obsidian.Platform.isDesktop ? "Obsidian Desktop" : "Obsidian Mobile"
    });
  } catch (e) {
    console.warn("AIChatClip: device registration failed", e);
  }
}

// src/i18n.ts
var translations = {
  // Basic tab
  "tab.basic": { en: "Basic", ja: "\u57FA\u672C", zh: "\u57FA\u672C", ko: "\uAE30\uBCF8" },
  "tab.pro": { en: "Pro", ja: "Pro", zh: "Pro", ko: "Pro" },
  "tab.guide": { en: "Guide", ja: "\u30AC\u30A4\u30C9", zh: "\u6307\u5357", ko: "\uAC00\uC774\uB4DC" },
  // Authentication
  "auth.name": { en: "Authentication", ja: "\u8A8D\u8A3C", zh: "\u8BA4\u8BC1", ko: "\uC778\uC99D" },
  "auth.connected": { en: "Connected", ja: "\u63A5\u7D9A\u6E08\u307F", zh: "\u5DF2\u8FDE\u63A5", ko: "\uC5F0\uACB0\uB428" },
  "auth.notConnected": {
    en: "Not connected. Sign in to sync your clips.",
    ja: "\u672A\u63A5\u7D9A\u3002\u30B5\u30A4\u30F3\u30A4\u30F3\u3057\u3066\u30AF\u30EA\u30C3\u30D7\u3092\u540C\u671F\u3057\u307E\u3057\u3087\u3046\u3002",
    zh: "\u672A\u8FDE\u63A5\u3002\u8BF7\u767B\u5F55\u4EE5\u540C\u6B65\u60A8\u7684\u526A\u8F91\u3002",
    ko: "\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC74C. \uB85C\uADF8\uC778\uD558\uC5EC \uD074\uB9BD\uC744 \uB3D9\uAE30\uD654\uD558\uC138\uC694."
  },
  "auth.signIn": { en: "Sign in", ja: "\u30B5\u30A4\u30F3\u30A4\u30F3", zh: "\u767B\u5F55", ko: "\uB85C\uADF8\uC778" },
  "auth.signOut": { en: "Sign out", ja: "\u30B5\u30A4\u30F3\u30A2\u30A6\u30C8", zh: "\u9000\u51FA", ko: "\uB85C\uADF8\uC544\uC6C3" },
  // Real-time sync
  "ws.name": { en: "Real-time sync", ja: "\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u540C\u671F", zh: "\u5B9E\u65F6\u540C\u6B65", ko: "\uC2E4\uC2DC\uAC04 \uB3D9\uAE30\uD654" },
  "ws.connected": { en: "Status: Connected", ja: "\u72B6\u614B: \u63A5\u7D9A\u4E2D", zh: "\u72B6\u6001: \u5DF2\u8FDE\u63A5", ko: "\uC0C1\uD0DC: \uC5F0\uACB0\uB428" },
  "ws.disconnected": { en: "Status: Disconnected", ja: "\u72B6\u614B: \u5207\u65AD", zh: "\u72B6\u6001: \u5DF2\u65AD\u5F00", ko: "\uC0C1\uD0DC: \uC5F0\uACB0 \uB04A\uAE40" },
  // Device
  "device.name": { en: "Set as primary device", ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u30C7\u30D0\u30A4\u30B9\u306B\u8A2D\u5B9A", zh: "\u8BBE\u4E3A\u4E3B\u8BBE\u5907", ko: "\uAE30\uBCF8 \uAE30\uAE30\uB85C \uC124\uC815" },
  "device.desc": {
    en: "The primary device has highest priority for real-time push notifications",
    ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u30C7\u30D0\u30A4\u30B9\u306F\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u30D7\u30C3\u30B7\u30E5\u901A\u77E5\u306E\u512A\u5148\u5EA6\u304C\u6700\u3082\u9AD8\u304F\u306A\u308A\u307E\u3059",
    zh: "\u4E3B\u8BBE\u5907\u5728\u5B9E\u65F6\u63A8\u9001\u901A\u77E5\u4E2D\u5177\u6709\u6700\u9AD8\u4F18\u5148\u7EA7",
    ko: "\uAE30\uBCF8 \uAE30\uAE30\uB294 \uC2E4\uC2DC\uAC04 \uD478\uC2DC \uC54C\uB9BC\uC5D0\uC11C \uAC00\uC7A5 \uB192\uC740 \uC6B0\uC120\uC21C\uC704\uB97C \uAC16\uC2B5\uB2C8\uB2E4"
  },
  "device.makePrimary": { en: "Make primary", ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u306B\u8A2D\u5B9A", zh: "\u8BBE\u4E3A\u4E3B\u8BBE\u5907", ko: "\uAE30\uBCF8\uC73C\uB85C \uC124\uC815" },
  // Inbox folder
  "inbox.name": { en: "Inbox folder", ja: "\u53D7\u4FE1\u30D5\u30A9\u30EB\u30C0", zh: "\u6536\u4EF6\u7BB1\u6587\u4EF6\u5939", ko: "\uBC1B\uC740 \uD3B8\uC9C0\uD568 \uD3F4\uB354" },
  "inbox.desc": {
    en: "Vault folder where clipped notes are saved",
    ja: "\u30AF\u30EA\u30C3\u30D7\u3057\u305F\u30CE\u30FC\u30C8\u306E\u4FDD\u5B58\u5148\u30D5\u30A9\u30EB\u30C0",
    zh: "\u4FDD\u5B58\u526A\u8F91\u7B14\u8BB0\u7684\u5E93\u6587\u4EF6\u5939",
    ko: "\uD074\uB9BD\uB41C \uB178\uD2B8\uAC00 \uC800\uC7A5\uB418\uB294 \uBCFC\uD2B8 \uD3F4\uB354"
  },
  // Auto-sync
  "autoSync.name": { en: "Auto-sync on load", ja: "\u8D77\u52D5\u6642\u306B\u81EA\u52D5\u540C\u671F", zh: "\u542F\u52A8\u65F6\u81EA\u52A8\u540C\u6B65", ko: "\uC2DC\uC791 \uC2DC \uC790\uB3D9 \uB3D9\uAE30\uD654" },
  "autoSync.desc": {
    en: "Automatically sync clips when Obsidian starts",
    ja: "Obsidian \u8D77\u52D5\u6642\u306B\u30AF\u30EA\u30C3\u30D7\u3092\u81EA\u52D5\u540C\u671F",
    zh: "Obsidian \u542F\u52A8\u65F6\u81EA\u52A8\u540C\u6B65\u526A\u8F91",
    ko: "Obsidian \uC2DC\uC791 \uC2DC \uC790\uB3D9\uC73C\uB85C \uD074\uB9BD \uB3D9\uAE30\uD654"
  },
  // Timezone
  "timezone.name": { en: "Timezone", ja: "\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3", zh: "\u65F6\u533A", ko: "\uC2DC\uAC04\uB300" },
  "timezone.desc": {
    en: "Timezone for clipped_at in frontmatter (auto-detected)",
    ja: "frontmatter \u306E clipped_at \u306B\u4F7F\u7528\u3059\u308B\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3\uFF08\u81EA\u52D5\u691C\u51FA\uFF09",
    zh: "frontmatter \u4E2D clipped_at \u7684\u65F6\u533A\uFF08\u81EA\u52A8\u68C0\u6D4B\uFF09",
    ko: "frontmatter\uC758 clipped_at\uC5D0 \uC0AC\uC6A9\uD560 \uC2DC\uAC04\uB300 (\uC790\uB3D9 \uAC10\uC9C0)"
  },
  // File name template
  "fileName.name": { en: "File name template", ja: "\u30D5\u30A1\u30A4\u30EB\u540D\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", zh: "\u6587\u4EF6\u540D\u6A21\u677F", ko: "\uD30C\uC77C\uBA85 \uD15C\uD50C\uB9BF" },
  "fileName.desc": {
    en: "Variables: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\nExample: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-Understanding-Rust-Lifetimes",
    ja: "\u5909\u6570: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n\u4F8B: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-Rust\u306E\u30E9\u30A4\u30D5\u30BF\u30A4\u30E0\u89E3\u8AAC",
    zh: "\u53D8\u91CF: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n\u793A\u4F8B: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-\u7406\u89E3Rust\u751F\u547D\u5468\u671F",
    ko: "\uBCC0\uC218: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n\uC608\uC2DC: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-Rust-\uB77C\uC774\uD504\uD0C0\uC784-\uC774\uD574"
  },
  // Sync on foreground
  "syncOnForeground.name": { en: "Sync on foreground", ja: "\u30D5\u30A9\u30A2\u30B0\u30E9\u30A6\u30F3\u30C9\u5FA9\u5E30\u6642\u306B\u540C\u671F", zh: "\u524D\u53F0\u6062\u590D\u65F6\u540C\u6B65", ko: "\uD3EC\uADF8\uB77C\uC6B4\uB4DC \uBCF5\uADC0 \uC2DC \uB3D9\uAE30\uD654" },
  "syncOnForeground.desc": {
    en: "Automatically sync clips when returning to the app",
    ja: "\u30A2\u30D7\u30EA\u306B\u623B\u3063\u305F\u6642\u306B\u30AF\u30EA\u30C3\u30D7\u3092\u81EA\u52D5\u540C\u671F",
    zh: "\u8FD4\u56DE\u5E94\u7528\u65F6\u81EA\u52A8\u540C\u6B65\u526A\u8F91",
    ko: "\uC571\uC73C\uB85C \uB3CC\uC544\uC62C \uB54C \uC790\uB3D9\uC73C\uB85C \uD074\uB9BD \uB3D9\uAE30\uD654"
  },
  // Language setting
  "lang.name": { en: "Plugin language", ja: "\u30D7\u30E9\u30B0\u30A4\u30F3\u8A00\u8A9E", zh: "\u63D2\u4EF6\u8BED\u8A00", ko: "\uD50C\uB7EC\uADF8\uC778 \uC5B8\uC5B4" },
  "lang.desc": {
    en: "Language for plugin UI",
    ja: "\u30D7\u30E9\u30B0\u30A4\u30F3UI\u306E\u8868\u793A\u8A00\u8A9E",
    zh: "\u63D2\u4EF6\u754C\u9762\u8BED\u8A00",
    ko: "\uD50C\uB7EC\uADF8\uC778 UI \uC5B8\uC5B4"
  },
  "lang.auto": { en: "Auto", ja: "\u81EA\u52D5", zh: "\u81EA\u52A8", ko: "\uC790\uB3D9" },
  // Pro tab - comparison table
  "pro.feature.clipToObsidian": {
    en: "Clip AI responses to Obsidian",
    ja: "AI\u56DE\u7B54\u3092Obsidian\u306B\u30AF\u30EA\u30C3\u30D7",
    zh: "\u5C06AI\u56DE\u7B54\u526A\u8F91\u5230Obsidian",
    ko: "AI \uC751\uB2F5\uC744 Obsidian\uC5D0 \uD074\uB9BD"
  },
  "pro.feature.unlimitedClips": { en: "Unlimited clips", ja: "\u7121\u5236\u9650\u30AF\u30EA\u30C3\u30D7", zh: "\u65E0\u9650\u526A\u8F91", ko: "\uBB34\uC81C\uD55C \uD074\uB9BD" },
  "pro.feature.autoTags": {
    en: "Auto tags & title generation",
    ja: "\u30BF\u30B0\u30FB\u30BF\u30A4\u30C8\u30EB\u81EA\u52D5\u751F\u6210",
    zh: "\u81EA\u52A8\u6807\u7B7E\u548C\u6807\u9898\u751F\u6210",
    ko: "\uC790\uB3D9 \uD0DC\uADF8 \uBC0F \uC81C\uBAA9 \uC0DD\uC131"
  },
  "pro.feature.summary": {
    en: "Summary in frontmatter",
    ja: "frontmatter\u306B\u30B5\u30DE\u30EA\u30FC",
    zh: "frontmatter\u4E2D\u7684\u6458\u8981",
    ko: "frontmatter\uC5D0 \uC694\uC57D"
  },
  "pro.feature.smartFolder": {
    en: "Smart folder placement",
    ja: "\u30B9\u30DE\u30FC\u30C8\u30D5\u30A9\u30EB\u30C0\u632F\u308A\u5206\u3051",
    zh: "\u667A\u80FD\u6587\u4EF6\u5939\u5206\u914D",
    ko: "\uC2A4\uB9C8\uD2B8 \uD3F4\uB354 \uBC30\uCE58"
  },
  "pro.feature.weeklyDigest": { en: "Weekly digest", ja: "\u9031\u9593\u30C0\u30A4\u30B8\u30A7\u30B9\u30C8", zh: "\u6BCF\u5468\u6458\u8981", ko: "\uC8FC\uAC04 \uB2E4\uC774\uC81C\uC2A4\uD2B8" },
  "pro.cta.upgrade": {
    en: "Upgrade to Pro \u2192",
    ja: "Pro\u30D7\u30E9\u30F3\u306B\u30A2\u30C3\u30D7\u30B0\u30EC\u30FC\u30C9 \u2192",
    zh: "\u5347\u7EA7\u5230Pro \u2192",
    ko: "Pro\uB85C \uC5C5\uADF8\uB808\uC774\uB4DC \u2192"
  },
  // Pro tab - folder settings
  "pro.folderDesc": {
    en: "AIChatClip detects marker files in your folders and uses them for auto-classification. Only folders with a marker file are eligible \u2014 folders without one are never used. You can choose any filename (default: README), but it must be the same across your entire vault. The content is freeform \u2014 describing the folder's purpose improves accuracy.",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u691C\u77E5\u3057\u3066\u81EA\u52D5\u5206\u985E\u306B\u4F7F\u3044\u307E\u3059\u3002\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u304C\u3042\u308B\u30D5\u30A9\u30EB\u30C0\u3060\u3051\u304C\u632F\u308A\u5206\u3051\u5148\u306B\u306A\u308A\u3001\u306A\u3044\u30D5\u30A9\u30EB\u30C0\u306B\u306F\u632F\u308A\u5206\u3051\u3089\u308C\u307E\u305B\u3093\u3002\u30D5\u30A1\u30A4\u30EB\u540D\u306F\u81EA\u7531\u306B\u6C7A\u3081\u3089\u308C\u307E\u3059\u304C\uFF08\u30C7\u30D5\u30A9\u30EB\u30C8: README\uFF09\u3001Vault\u5168\u4F53\u3067\u7D71\u4E00\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002\u5185\u5BB9\u306F\u81EA\u7531\u3067\u3059\u304C\u3001\u30D5\u30A9\u30EB\u30C0\u306E\u7528\u9014\u3092\u66F8\u304F\u3068\u5206\u985E\u7CBE\u5EA6\u304C\u4E0A\u304C\u308A\u307E\u3059\u3002",
    zh: "AIChatClip \u68C0\u6D4B\u6587\u4EF6\u5939\u4E2D\u7684\u6807\u8BB0\u6587\u4EF6\u5E76\u7528\u4E8E\u81EA\u52A8\u5206\u7C7B\u3002\u53EA\u6709\u5305\u542B\u6807\u8BB0\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u624D\u4F1A\u88AB\u4F7F\u7528\u2014\u2014\u6CA1\u6709\u6807\u8BB0\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u4E0D\u4F1A\u88AB\u5206\u914D\u3002\u6587\u4EF6\u540D\u53EF\u4EE5\u81EA\u7531\u9009\u62E9\uFF08\u9ED8\u8BA4: README\uFF09\uFF0C\u4F46\u5FC5\u987B\u5728\u6574\u4E2A\u5E93\u4E2D\u7EDF\u4E00\u3002\u5185\u5BB9\u53EF\u4EE5\u662F\u4EFB\u610F\u6587\u672C\u2014\u2014\u63CF\u8FF0\u6587\u4EF6\u5939\u7528\u9014\u53EF\u4EE5\u63D0\u9AD8\u51C6\u786E\u5EA6\u3002",
    ko: "AIChatClip\uC740 \uD3F4\uB354\uC758 \uB9C8\uCEE4 \uD30C\uC77C\uC744 \uAC10\uC9C0\uD558\uC5EC \uC790\uB3D9 \uBD84\uB958\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uB9C8\uCEE4 \uD30C\uC77C\uC774 \uC788\uB294 \uD3F4\uB354\uB9CC \uB300\uC0C1\uC774 \uB418\uBA70, \uC5C6\uB294 \uD3F4\uB354\uC5D0\uB294 \uBC30\uCE58\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD30C\uC77C\uBA85\uC740 \uC790\uC720\uB86D\uAC8C \uC815\uD560 \uC218 \uC788\uC9C0\uB9CC(\uAE30\uBCF8: README), \uBCFC\uD2B8 \uC804\uCCB4\uC5D0\uC11C \uD1B5\uC77C\uD574\uC57C \uD569\uB2C8\uB2E4. \uB0B4\uC6A9\uC740 \uC790\uC720\uB86D\uC9C0\uB9CC, \uD3F4\uB354\uC758 \uC6A9\uB3C4\uB97C \uC801\uC73C\uBA74 \uBD84\uB958 \uC815\uD655\uB3C4\uAC00 \uD5A5\uC0C1\uB429\uB2C8\uB2E4."
  },
  "pro.folderDocsLink": {
    en: "Learn more about marker files \u2192",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u306B\u3064\u3044\u3066\u8A73\u3057\u304F \u2192",
    zh: "\u4E86\u89E3\u66F4\u591A\u5173\u4E8E\u6807\u8BB0\u6587\u4EF6 \u2192",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC5D0 \uB300\uD574 \uC790\uC138\uD788 \u2192"
  },
  "pro.autoScan.name": {
    en: "Auto-scan folders on sync",
    ja: "\u540C\u671F\u6642\u306B\u30D5\u30A9\u30EB\u30C0\u3092\u81EA\u52D5\u30B9\u30AD\u30E3\u30F3",
    zh: "\u540C\u6B65\u65F6\u81EA\u52A8\u626B\u63CF\u6587\u4EF6\u5939",
    ko: "\uB3D9\uAE30\uD654 \uC2DC \uD3F4\uB354 \uC790\uB3D9 \uC2A4\uCE94"
  },
  "pro.autoScan.desc": {
    en: "Automatically scan and upload folder structure when syncing clips",
    ja: "\u30AF\u30EA\u30C3\u30D7\u540C\u671F\u6642\u306B\u30D5\u30A9\u30EB\u30C0\u69CB\u9020\u3092\u81EA\u52D5\u30B9\u30AD\u30E3\u30F3\uFF06\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
    zh: "\u540C\u6B65\u526A\u8F91\u65F6\u81EA\u52A8\u626B\u63CF\u5E76\u4E0A\u4F20\u6587\u4EF6\u5939\u7ED3\u6784",
    ko: "\uD074\uB9BD \uB3D9\uAE30\uD654 \uC2DC \uD3F4\uB354 \uAD6C\uC870 \uC790\uB3D9 \uC2A4\uCE94 \uBC0F \uC5C5\uB85C\uB4DC"
  },
  "pro.scanRoot.name": { en: "Folder scan root", ja: "\u30B9\u30AD\u30E3\u30F3\u30EB\u30FC\u30C8", zh: "\u626B\u63CF\u6839\u76EE\u5F55", ko: "\uC2A4\uCE94 \uB8E8\uD2B8" },
  "pro.scanRoot.desc": {
    en: "Root folder to scan for marker files. Leave empty to scan the entire vault.",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u30B9\u30AD\u30E3\u30F3\u3059\u308B\u30EB\u30FC\u30C8\u30D5\u30A9\u30EB\u30C0\u3002\u7A7A\u6B04\u3067Vault\u5168\u4F53\u3092\u30B9\u30AD\u30E3\u30F3\u3002",
    zh: "\u626B\u63CF\u6807\u8BB0\u6587\u4EF6\u7684\u6839\u6587\u4EF6\u5939\u3002\u7559\u7A7A\u4EE5\u626B\u63CF\u6574\u4E2A\u5E93\u3002",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC744 \uC2A4\uCE94\uD560 \uB8E8\uD2B8 \uD3F4\uB354. \uBE44\uC6CC\uB450\uBA74 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uC2A4\uCE94\uD569\uB2C8\uB2E4."
  },
  "pro.scanRoot.placeholder": { en: "(entire vault)", ja: "\uFF08Vault\u5168\u4F53\uFF09", zh: "\uFF08\u6574\u4E2A\u5E93\uFF09", ko: "(\uC804\uCCB4 \uBCFC\uD2B8)" },
  "pro.marker.name": { en: "Marker filename", ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u540D", zh: "\u6807\u8BB0\u6587\u4EF6\u540D", ko: "\uB9C8\uCEE4 \uD30C\uC77C\uBA85" },
  "pro.marker.desc": {
    en: "Filename stem to detect as folder description (e.g. README \u2192 README.md)",
    ja: "\u30D5\u30A9\u30EB\u30C0\u8AAC\u660E\u3068\u3057\u3066\u691C\u51FA\u3059\u308B\u30D5\u30A1\u30A4\u30EB\u540D\uFF08\u4F8B: README \u2192 README.md\uFF09",
    zh: "\u4F5C\u4E3A\u6587\u4EF6\u5939\u63CF\u8FF0\u68C0\u6D4B\u7684\u6587\u4EF6\u540D\uFF08\u5982 README \u2192 README.md\uFF09",
    ko: "\uD3F4\uB354 \uC124\uBA85\uC73C\uB85C \uAC10\uC9C0\uD560 \uD30C\uC77C\uBA85 (\uC608: README \u2192 README.md)"
  },
  "pro.scanNow.name": { en: "Scan folders now", ja: "\u4ECA\u3059\u3050\u30B9\u30AD\u30E3\u30F3", zh: "\u7ACB\u5373\u626B\u63CF", ko: "\uC9C0\uAE08 \uC2A4\uCE94" },
  "pro.scanNow.desc": {
    en: "Scan marker files and upload folder structure to the server",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u30B9\u30AD\u30E3\u30F3\u3057\u3066\u30D5\u30A9\u30EB\u30C0\u69CB\u9020\u3092\u30B5\u30FC\u30D0\u30FC\u306B\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
    zh: "\u626B\u63CF\u6807\u8BB0\u6587\u4EF6\u5E76\u5C06\u6587\u4EF6\u5939\u7ED3\u6784\u4E0A\u4F20\u5230\u670D\u52A1\u5668",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC744 \uC2A4\uCE94\uD558\uACE0 \uD3F4\uB354 \uAD6C\uC870\uB97C \uC11C\uBC84\uC5D0 \uC5C5\uB85C\uB4DC"
  },
  "pro.scanNow.button": { en: "Scan & upload", ja: "\u30B9\u30AD\u30E3\u30F3\uFF06\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9", zh: "\u626B\u63CF\u5E76\u4E0A\u4F20", ko: "\uC2A4\uCE94 \uBC0F \uC5C5\uB85C\uB4DC" },
  "pro.readme.name": { en: "Marker file template", ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", zh: "\u6807\u8BB0\u6587\u4EF6\u6A21\u677F", ko: "\uB9C8\uCEE4 \uD30C\uC77C \uD15C\uD50C\uB9BF" },
  "pro.readme.desc": {
    en: "Copy a starter template for folder marker files",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30B3\u30D4\u30FC",
    zh: "\u590D\u5236\u6587\u4EF6\u5939\u6807\u8BB0\u6587\u4EF6\u7684\u6A21\u677F",
    ko: "\uD3F4\uB354 \uB9C8\uCEE4 \uD30C\uC77C\uC6A9 \uD15C\uD50C\uB9BF \uBCF5\uC0AC"
  },
  "pro.readme.button": { en: "Copy to clipboard", ja: "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC", zh: "\u590D\u5236\u5230\u526A\u8D34\u677F", ko: "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC" },
  // AI Customization
  "pro.aiCustomization": { en: "AI customization", ja: "AI\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA", zh: "AI\u81EA\u5B9A\u4E49", ko: "AI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5" },
  "pro.titleLang.name": { en: "Title language", ja: "\u30BF\u30A4\u30C8\u30EB\u8A00\u8A9E", zh: "\u6807\u9898\u8BED\u8A00", ko: "\uC81C\uBAA9 \uC5B8\uC5B4" },
  "pro.titleLang.desc": {
    en: "Language for AI-generated titles (saved to server)",
    ja: "AI\u751F\u6210\u30BF\u30A4\u30C8\u30EB\u306E\u8A00\u8A9E\uFF08\u30B5\u30FC\u30D0\u30FC\u306B\u4FDD\u5B58\uFF09",
    zh: "AI\u751F\u6210\u6807\u9898\u7684\u8BED\u8A00\uFF08\u4FDD\u5B58\u5230\u670D\u52A1\u5668\uFF09",
    ko: "AI \uC0DD\uC131 \uC81C\uBAA9\uC758 \uC5B8\uC5B4 (\uC11C\uBC84\uC5D0 \uC800\uC7A5)"
  },
  "pro.tagRule.name": { en: "Tag rule file", ja: "\u30BF\u30B0\u30EB\u30FC\u30EB\u30D5\u30A1\u30A4\u30EB", zh: "\u6807\u7B7E\u89C4\u5219\u6587\u4EF6", ko: "\uD0DC\uADF8 \uADDC\uCE59 \uD30C\uC77C" },
  "pro.tagRule.desc": {
    en: "Path to a markdown file with custom tag rules (without .md extension)",
    ja: "\u30AB\u30B9\u30BF\u30E0\u30BF\u30B0\u30EB\u30FC\u30EB\u306EMarkdown\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\uFF08.md\u62E1\u5F35\u5B50\u306A\u3057\uFF09",
    zh: "\u81EA\u5B9A\u4E49\u6807\u7B7E\u89C4\u5219\u7684Markdown\u6587\u4EF6\u8DEF\u5F84\uFF08\u4E0D\u542B.md\u6269\u5C55\u540D\uFF09",
    ko: "\uCEE4\uC2A4\uD140 \uD0DC\uADF8 \uADDC\uCE59 Markdown \uD30C\uC77C \uACBD\uB85C (.md \uD655\uC7A5\uC790 \uC81C\uC678)"
  },
  "pro.tagRule.create": { en: "Create template", ja: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u4F5C\u6210", zh: "\u521B\u5EFA\u6A21\u677F", ko: "\uD15C\uD50C\uB9BF \uC0DD\uC131" },
  "pro.tagRule.created": { en: "Tag rule file created", ja: "\u30BF\u30B0\u30EB\u30FC\u30EB\u30D5\u30A1\u30A4\u30EB\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F", zh: "\u6807\u7B7E\u89C4\u5219\u6587\u4EF6\u5DF2\u521B\u5EFA", ko: "\uD0DC\uADF8 \uADDC\uCE59 \uD30C\uC77C\uC774 \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4" },
  // Notices
  "notice.connected": { en: "Connected successfully!", ja: "\u63A5\u7D9A\u3057\u307E\u3057\u305F\uFF01", zh: "\u8FDE\u63A5\u6210\u529F\uFF01", ko: "\uC5F0\uACB0 \uC131\uACF5!" },
  "notice.syncInProgress": { en: "Sync already in progress", ja: "\u540C\u671F\u4E2D\u3067\u3059", zh: "\u6B63\u5728\u540C\u6B65\u4E2D", ko: "\uB3D9\uAE30\uD654 \uC9C4\uD589 \uC911" },
  "notice.noToken": {
    en: "Please set your session token in settings",
    ja: "\u8A2D\u5B9A\u3067\u30BB\u30C3\u30B7\u30E7\u30F3\u30C8\u30FC\u30AF\u30F3\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044",
    zh: "\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u8BBE\u7F6E\u4F1A\u8BDD\u4EE4\u724C",
    ko: "\uC124\uC815\uC5D0\uC11C \uC138\uC158 \uD1A0\uD070\uC744 \uC124\uC815\uD558\uC138\uC694"
  },
  "notice.noNewClips": { en: "No new clips to sync", ja: "\u65B0\u3057\u3044\u30AF\u30EA\u30C3\u30D7\u306F\u3042\u308A\u307E\u305B\u3093", zh: "\u6CA1\u6709\u65B0\u7684\u526A\u8F91", ko: "\uC0C8 \uD074\uB9BD \uC5C6\uC74C" },
  "notice.synced": { en: "Synced {count} clip(s)", ja: "{count}\u4EF6\u306E\u30AF\u30EA\u30C3\u30D7\u3092\u540C\u671F\u3057\u307E\u3057\u305F", zh: "\u5DF2\u540C\u6B65{count}\u4E2A\u526A\u8F91", ko: "{count}\uAC1C \uD074\uB9BD \uB3D9\uAE30\uD654 \uC644\uB8CC" },
  "notice.syncPartial": {
    en: "Synced {synced}, failed {failed}. Check console for details.",
    ja: "\u540C\u671F {synced}\u4EF6\u3001\u5931\u6557 {failed}\u4EF6\u3002\u8A73\u7D30\u306F\u30B3\u30F3\u30BD\u30FC\u30EB\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    zh: "\u5DF2\u540C\u6B65{synced}\u4E2A\uFF0C\u5931\u8D25{failed}\u4E2A\u3002\u8BE6\u60C5\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002",
    ko: "\uB3D9\uAE30\uD654 {synced}\uAC1C, \uC2E4\uD328 {failed}\uAC1C. \uC790\uC138\uD55C \uB0B4\uC6A9\uC740 \uCF58\uC194\uC744 \uD655\uC778\uD558\uC138\uC694."
  },
  "notice.syncFailed": { en: "Sync failed - {msg}", ja: "\u540C\u671F\u5931\u6557 - {msg}", zh: "\u540C\u6B65\u5931\u8D25 - {msg}", ko: "\uB3D9\uAE30\uD654 \uC2E4\uD328 - {msg}" },
  "notice.newClipSynced": { en: "New clip synced", ja: "\u65B0\u3057\u3044\u30AF\u30EA\u30C3\u30D7\u3092\u540C\u671F\u3057\u307E\u3057\u305F", zh: "\u65B0\u526A\u8F91\u5DF2\u540C\u6B65", ko: "\uC0C8 \uD074\uB9BD \uB3D9\uAE30\uD654\uB428" },
  "notice.primarySet": {
    en: "This device is now primary",
    ja: "\u3053\u306E\u30C7\u30D0\u30A4\u30B9\u3092\u30D7\u30E9\u30A4\u30DE\u30EA\u306B\u8A2D\u5B9A\u3057\u307E\u3057\u305F",
    zh: "\u6B64\u8BBE\u5907\u5DF2\u8BBE\u4E3A\u4E3B\u8BBE\u5907",
    ko: "\uC774 \uAE30\uAE30\uAC00 \uAE30\uBCF8 \uAE30\uAE30\uB85C \uC124\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4"
  },
  "notice.primaryFailed": {
    en: "Failed to set primary device",
    ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u30C7\u30D0\u30A4\u30B9\u306E\u8A2D\u5B9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u8BBE\u7F6E\u4E3B\u8BBE\u5907\u5931\u8D25",
    ko: "\uAE30\uBCF8 \uAE30\uAE30 \uC124\uC815 \uC2E4\uD328"
  },
  "notice.signInFirst": { en: "Please sign in first", ja: "\u5148\u306B\u30B5\u30A4\u30F3\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044", zh: "\u8BF7\u5148\u767B\u5F55", ko: "\uBA3C\uC800 \uB85C\uADF8\uC778\uD558\uC138\uC694" },
  "notice.foldersSynced": {
    en: "{count} folder(s) synced",
    ja: "{count}\u500B\u306E\u30D5\u30A9\u30EB\u30C0\u3092\u540C\u671F\u3057\u307E\u3057\u305F",
    zh: "\u5DF2\u540C\u6B65{count}\u4E2A\u6587\u4EF6\u5939",
    ko: "{count}\uAC1C \uD3F4\uB354 \uB3D9\uAE30\uD654 \uC644\uB8CC"
  },
  "notice.folderScanFailed": {
    en: "Folder scan failed - {msg}",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30B9\u30AD\u30E3\u30F3\u5931\u6557 - {msg}",
    zh: "\u6587\u4EF6\u5939\u626B\u63CF\u5931\u8D25 - {msg}",
    ko: "\uD3F4\uB354 \uC2A4\uCE94 \uC2E4\uD328 - {msg}"
  },
  "notice.readmeCopied": {
    en: "README template copied to clipboard",
    ja: "README\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F",
    zh: "README\u6A21\u677F\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
    ko: "README \uD15C\uD50C\uB9BF\uC774 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB428"
  },
  "notice.prefFailed": {
    en: "Failed to save preference",
    ja: "\u8A2D\u5B9A\u306E\u4FDD\u5B58\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25",
    ko: "\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328"
  },
  // Guide tab
  "guide.title": { en: "Getting started", ja: "\u306F\u3058\u3081\u306B", zh: "\u5165\u95E8\u6307\u5357", ko: "\uC2DC\uC791\uD558\uAE30" },
  "guide.step1.title": { en: "Install browser extension", ja: "\u30D6\u30E9\u30A6\u30B6\u62E1\u5F35\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB", zh: "\u5B89\u88C5\u6D4F\u89C8\u5668\u6269\u5C55", ko: "\uBE0C\uB77C\uC6B0\uC800 \uD655\uC7A5 \uC124\uCE58" },
  "guide.step1.desc": {
    en: "Install the AIChatClip extension for Chrome or Firefox.",
    ja: "Chrome\u307E\u305F\u306FFirefox\u7528\u306EAIChatClip\u62E1\u5F35\u6A5F\u80FD\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u307E\u3059\u3002",
    zh: "\u4E3AChrome\u6216Firefox\u5B89\u88C5AIChatClip\u6269\u5C55\u3002",
    ko: "Chrome \uB610\uB294 Firefox\uC6A9 AIChatClip \uD655\uC7A5\uC744 \uC124\uCE58\uD569\uB2C8\uB2E4."
  },
  "guide.step2.title": { en: "Clip AI responses", ja: "AI\u56DE\u7B54\u3092\u30AF\u30EA\u30C3\u30D7", zh: "\u526A\u8F91AI\u56DE\u7B54", ko: "AI \uC751\uB2F5 \uD074\uB9BD" },
  "guide.step2.desc": {
    en: "Click the clip button on any AI chat response to save it.",
    ja: "AI\u30C1\u30E3\u30C3\u30C8\u306E\u56DE\u7B54\u306B\u3042\u308B\u30AF\u30EA\u30C3\u30D7\u30DC\u30BF\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002",
    zh: "\u70B9\u51FBAI\u804A\u5929\u56DE\u7B54\u4E0A\u7684\u526A\u8F91\u6309\u94AE\u8FDB\u884C\u4FDD\u5B58\u3002",
    ko: "AI \uCC44\uD305 \uC751\uB2F5\uC758 \uD074\uB9BD \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC \uC800\uC7A5\uD569\uB2C8\uB2E4."
  },
  "guide.step3.title": { en: "Auto-sync to Obsidian", ja: "Obsidian\u306B\u81EA\u52D5\u540C\u671F", zh: "\u81EA\u52A8\u540C\u6B65\u5230Obsidian", ko: "Obsidian\uC5D0 \uC790\uB3D9 \uB3D9\uAE30\uD654" },
  "guide.step3.desc": {
    en: "Clipped notes sync automatically to your Obsidian vault.",
    ja: "\u30AF\u30EA\u30C3\u30D7\u3057\u305F\u30CE\u30FC\u30C8\u306FObsidian Vault\u306B\u81EA\u52D5\u3067\u540C\u671F\u3055\u308C\u307E\u3059\u3002",
    zh: "\u526A\u8F91\u7684\u7B14\u8BB0\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u4F60\u7684Obsidian\u5E93\u3002",
    ko: "\uD074\uB9BD\uB41C \uB178\uD2B8\uB294 Obsidian \uBCFC\uD2B8\uC5D0 \uC790\uB3D9\uC73C\uB85C \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4."
  },
  "guide.docsLink": { en: "View full documentation \u2192", ja: "\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u898B\u308B \u2192", zh: "\u67E5\u770B\u5B8C\u6574\u6587\u6863 \u2192", ko: "\uC804\uCCB4 \uBB38\uC11C \uBCF4\uAE30 \u2192" },
  // Title lang options
  "titleLang.auto": { en: "Auto (same as content)", ja: "\u81EA\u52D5\uFF08\u30B3\u30F3\u30C6\u30F3\u30C4\u3068\u540C\u3058\uFF09", zh: "\u81EA\u52A8\uFF08\u4E0E\u5185\u5BB9\u76F8\u540C\uFF09", ko: "\uC790\uB3D9 (\uCF58\uD150\uCE20\uC640 \uB3D9\uC77C)" },
  // Folder Manager (settings button)
  "pro.folderManager.name": {
    en: "Folder manager",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC",
    zh: "\u6587\u4EF6\u5939\u7BA1\u7406\u5668",
    ko: "\uD3F4\uB354 \uAD00\uB9AC\uC790"
  },
  "pro.folderManager.desc": {
    en: "Create or delete marker files in bulk with AI-generated descriptions",
    ja: "AI\u306B\u3088\u308B\u8AAC\u660E\u6587\u751F\u6210\u3067\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u4E00\u62EC\u4F5C\u6210\u30FB\u524A\u9664",
    zh: "\u4F7F\u7528AI\u751F\u6210\u63CF\u8FF0\u6279\u91CF\u521B\u5EFA\u6216\u5220\u9664\u6807\u8BB0\u6587\u4EF6",
    ko: "AI \uC0DD\uC131 \uC124\uBA85\uC73C\uB85C \uB9C8\uCEE4 \uD30C\uC77C \uC77C\uAD04 \uC0DD\uC131/\uC0AD\uC81C"
  },
  "pro.folderManager.button": {
    en: "Open folder manager",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC\u3092\u958B\u304F",
    zh: "\u6253\u5F00\u6587\u4EF6\u5939\u7BA1\u7406\u5668",
    ko: "\uD3F4\uB354 \uAD00\uB9AC\uC790 \uC5F4\uAE30"
  },
  // Modal
  "modal.title": { en: "Folder Manager", ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC", zh: "\u6587\u4EF6\u5939\u7BA1\u7406\u5668", ko: "\uD3F4\uB354 \uAD00\uB9AC\uC790" },
  "modal.tabCreate": { en: "Create", ja: "\u4F5C\u6210", zh: "\u521B\u5EFA", ko: "\uC0DD\uC131" },
  "modal.tabDelete": { en: "Delete", ja: "\u524A\u9664", zh: "\u5220\u9664", ko: "\uC0AD\uC81C" },
  "modal.selectAll": { en: "Select all", ja: "\u5168\u9078\u629E", zh: "\u5168\u9009", ko: "\uC804\uCCB4 \uC120\uD0DD" },
  "modal.deselectAll": { en: "Deselect all", ja: "\u5168\u89E3\u9664", zh: "\u53D6\u6D88\u5168\u9009", ko: "\uC804\uCCB4 \uD574\uC81C" },
  "modal.descLanguage": { en: "Description language: ", ja: "\u8AAC\u660E\u6587\u306E\u8A00\u8A9E: ", zh: "\u63CF\u8FF0\u8BED\u8A00: ", ko: "\uC124\uBA85 \uC5B8\uC5B4: " },
  "modal.descPlaceholder": {
    en: "Describe what kind of notes belong in this folder...",
    ja: "\u3053\u306E\u30D5\u30A9\u30EB\u30C0\u306B\u3069\u3093\u306A\u30CE\u30FC\u30C8\u304C\u5165\u308B\u304B\u8AAC\u660E...",
    zh: "\u63CF\u8FF0\u6B64\u6587\u4EF6\u5939\u4E2D\u5C5E\u4E8E\u54EA\u79CD\u7B14\u8BB0...",
    ko: "\uC774 \uD3F4\uB354\uC5D0 \uC5B4\uB5A4 \uB178\uD2B8\uAC00 \uB4E4\uC5B4\uAC00\uB294\uC9C0 \uC124\uBA85..."
  },
  "modal.createAndSync": { en: "Create markers & sync", ja: "\u30DE\u30FC\u30AB\u30FC\u4F5C\u6210 & \u540C\u671F", zh: "\u521B\u5EFA\u6807\u8BB0\u5E76\u540C\u6B65", ko: "\uB9C8\uCEE4 \uC0DD\uC131 \uBC0F \uB3D9\uAE30\uD654" },
  "modal.deleteAndSync": { en: "Delete selected & sync", ja: "\u9078\u629E\u3057\u305F\u30DE\u30FC\u30AB\u30FC\u3092\u524A\u9664 & \u540C\u671F", zh: "\u5220\u9664\u9009\u4E2D\u7684\u5E76\u540C\u6B65", ko: "\uC120\uD0DD \uD56D\uBAA9 \uC0AD\uC81C \uBC0F \uB3D9\uAE30\uD654" },
  "modal.generate": { en: "AI Generate", ja: "AI\u751F\u6210", zh: "AI\u751F\u6210", ko: "AI \uC0DD\uC131" },
  "modal.generating": { en: "Generating...", ja: "\u751F\u6210\u4E2D...", zh: "\u751F\u6210\u4E2D...", ko: "\uC0DD\uC131 \uC911..." },
  "modal.refine": { en: "Refine with AI", ja: "AI\u3067\u6821\u6B63", zh: "AI\u6821\u6B63", ko: "AI \uAD50\uC815" },
  "modal.refining": { en: "Refining...", ja: "\u6821\u6B63\u4E2D...", zh: "\u6821\u6B63\u4E2D...", ko: "\uAD50\uC815 \uC911..." },
  "modal.existingMarker": { en: " (existing)", ja: "\uFF08\u65E2\u5B58\uFF09", zh: "\uFF08\u5DF2\u6709\uFF09", ko: " (\uAE30\uC874)" },
  "modal.noFolders": {
    en: "No folders found in vault",
    ja: "Vault\u5185\u306B\u30D5\u30A9\u30EB\u30C0\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",
    zh: "\u5E93\u4E2D\u672A\u627E\u5230\u6587\u4EF6\u5939",
    ko: "\uBCFC\uD2B8\uC5D0\uC11C \uD3F4\uB354\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"
  },
  "modal.noMarkers": {
    en: "No marker files found",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u306F\u3042\u308A\u307E\u305B\u3093",
    zh: "\u672A\u627E\u5230\u6807\u8BB0\u6587\u4EF6",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"
  },
  "modal.markersFound": {
    en: "Folders with marker files:",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u304C\u3042\u308B\u30D5\u30A9\u30EB\u30C0:",
    zh: "\u5305\u542B\u6807\u8BB0\u6587\u4EF6\u7684\u6587\u4EF6\u5939:",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC774 \uC788\uB294 \uD3F4\uB354:"
  },
  "modal.confirmOverwrite": {
    en: "{count} marker(s) will be overwritten. Continue?",
    ja: "{count}\u500B\u306E\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u304C\u4E0A\u66F8\u304D\u3055\u308C\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F",
    zh: "{count}\u4E2A\u6807\u8BB0\u6587\u4EF6\u5C06\u88AB\u8986\u76D6\u3002\u7EE7\u7EED\u5417\uFF1F",
    ko: "{count}\uAC1C\uC758 \uB9C8\uCEE4 \uD30C\uC77C\uC774 \uB36E\uC5B4\uC4F0\uC5EC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"
  },
  // Notices (folder manager)
  "notice.markersCreated": {
    en: "{count} marker(s) created",
    ja: "{count}\u500B\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F",
    zh: "\u5DF2\u521B\u5EFA{count}\u4E2A\u6807\u8BB0",
    ko: "{count}\uAC1C \uB9C8\uCEE4 \uC0DD\uC131 \uC644\uB8CC"
  },
  "notice.markersDeleted": {
    en: "{count} marker(s) deleted",
    ja: "{count}\u500B\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u524A\u9664\u3057\u307E\u3057\u305F",
    zh: "\u5DF2\u5220\u9664{count}\u4E2A\u6807\u8BB0",
    ko: "{count}\uAC1C \uB9C8\uCEE4 \uC0AD\uC81C \uC644\uB8CC"
  },
  "notice.generateFailed": {
    en: "Failed to generate description",
    ja: "\u8AAC\u660E\u6587\u306E\u751F\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u751F\u6210\u63CF\u8FF0\u5931\u8D25",
    ko: "\uC124\uBA85 \uC0DD\uC131 \uC2E4\uD328"
  },
  "notice.quotaExceeded": {
    en: "AI quota exceeded for this billing period",
    ja: "\u4ECA\u6708\u306EAI\u4F7F\u7528\u91CF\u4E0A\u9650\u306B\u9054\u3057\u307E\u3057\u305F",
    zh: "\u672C\u6708AI\u4F7F\u7528\u91CF\u5DF2\u8FBE\u4E0A\u9650",
    ko: "\uC774\uBC88 \uCCAD\uAD6C \uAE30\uAC04\uC758 AI \uD560\uB2F9\uB7C9 \uCD08\uACFC"
  },
  "notice.syncAfterCreateFailed": {
    en: "Markers created but sync failed",
    ja: "\u30DE\u30FC\u30AB\u30FC\u4F5C\u6210\u5F8C\u306E\u540C\u671F\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u6807\u8BB0\u5DF2\u521B\u5EFA\u4F46\u540C\u6B65\u5931\u8D25",
    ko: "\uB9C8\uCEE4 \uC0DD\uC131 \uD6C4 \uB3D9\uAE30\uD654 \uC2E4\uD328"
  },
  "notice.syncAfterDeleteFailed": {
    en: "Markers deleted but sync failed",
    ja: "\u30DE\u30FC\u30AB\u30FC\u524A\u9664\u5F8C\u306E\u540C\u671F\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u6807\u8BB0\u5DF2\u5220\u9664\u4F46\u540C\u6B65\u5931\u8D25",
    ko: "\uB9C8\uCEE4 \uC0AD\uC81C \uD6C4 \uB3D9\uAE30\uD654 \uC2E4\uD328"
  }
};
function t(key, lang) {
  var _a, _b, _c, _d;
  return (_d = (_c = (_a = translations[key]) == null ? void 0 : _a[lang]) != null ? _c : (_b = translations[key]) == null ? void 0 : _b.en) != null ? _d : key;
}
function tReplace(key, lang, replacements) {
  let result = t(key, lang);
  for (const [k, v] of Object.entries(replacements)) {
    result = result.replace(`{${k}}`, String(v));
  }
  return result;
}
function detectLang() {
  var _a, _b, _c;
  const locale = (_c = (_b = (_a = moment == null ? void 0 : moment.locale) == null ? void 0 : _a.call(moment)) != null ? _b : navigator.language) != null ? _c : "en";
  const code = locale.split("-")[0].toLowerCase();
  if (["en", "ja", "zh", "ko"].includes(code)) return code;
  return "en";
}

// src/settings.ts
var import_obsidian4 = require("obsidian");

// src/folders.ts
var import_obsidian2 = require("obsidian");
var EXCLUDED_FOLDER_PREFIXES = ["node_modules"];
function isExcludedFolder(app, path) {
  const first = path.split("/")[0];
  if (first === app.vault.configDir) return true;
  return first.startsWith(".") || EXCLUDED_FOLDER_PREFIXES.includes(first);
}
function getVaultFolders(app, scanRoot) {
  const root = scanRoot ? app.vault.getFolderByPath(scanRoot) : app.vault.getRoot();
  if (!root) return [];
  const result = [];
  const collect = (folder) => {
    for (const child of folder.children) {
      if (!(child instanceof import_obsidian2.TFolder)) continue;
      if (!isExcludedFolder(app, child.path)) {
        result.push(child);
        collect(child);
      }
    }
  };
  collect(root);
  return result;
}
async function getExistingMarkerContent(app, folderPath, markerFilename) {
  const stem = markerFilename || "README";
  const ext = stem.includes(".") ? "" : ".md";
  const filePath = `${folderPath}/${stem}${ext}`;
  const file = app.vault.getFileByPath(filePath);
  if (!file) return null;
  return app.vault.read(file);
}
function getFoldersWithMarker(app, scanRoot, markerFilename) {
  const marker = markerFilename || "README";
  const markerFiles = app.vault.getFiles().filter((f) => {
    if (f.basename !== marker) return false;
    if (scanRoot === "") return true;
    return f.path.startsWith(`${scanRoot}/`);
  });
  return markerFiles.filter((f) => f.parent).map((f) => ({ folderPath: f.parent.path, markerPath: f.path }));
}
var lastFoldersMtime = 0;
async function scanFolders(app, scanRoot, markerFilename) {
  var _a;
  const marker = markerFilename || "README";
  const markerFiles = app.vault.getFiles().filter((f) => {
    if (f.basename !== marker) return false;
    if (scanRoot === "") return true;
    return f.path.startsWith(`${scanRoot}/`);
  });
  const maxMtime = markerFiles.reduce((max, f) => Math.max(max, f.stat.mtime), 0);
  if (maxMtime > 0 && maxMtime === lastFoldersMtime) return null;
  const entries = [];
  for (const file of markerFiles) {
    const content = await app.vault.read(file);
    const dir = (_a = file.parent) == null ? void 0 : _a.path;
    if (!dir) continue;
    const relativePath = scanRoot === "" ? dir : dir.startsWith(`${scanRoot}/`) ? dir.slice(scanRoot.length + 1) : dir;
    if (relativePath) {
      entries.push({ path: relativePath, description: content.slice(0, 3e3) });
    }
  }
  lastFoldersMtime = maxMtime;
  return entries;
}
async function syncFoldersToApi(settings, folders) {
  const res = await apiPut(settings, "/api/folders", { folders });
  if (res.status !== 200) {
    throw new Error(`Failed to sync folders: ${res.status}`);
  }
}

// src/modal.ts
var import_obsidian3 = require("obsidian");
var FolderManagerModal = class extends import_obsidian3.Modal {
  constructor(app, settings, lang, onComplete) {
    super(app);
    this.mode = "create";
    this.folderStates = /* @__PURE__ */ new Map();
    this.deleteItems = [];
    this.descriptionLanguage = "auto";
    this.settings = settings;
    this.lang = lang;
    this.onComplete = onComplete;
  }
  async onOpen() {
    this.modalEl.addClass("aichatclip-folder-modal");
    await this.render();
  }
  onClose() {
    this.contentEl.empty();
  }
  async render() {
    const { contentEl } = this;
    const l = this.lang;
    contentEl.empty();
    contentEl.createEl("h2", { text: t("modal.title", l) });
    const tabBar = contentEl.createDiv({ cls: "aichatclip-modal-tabs" });
    const createTab = tabBar.createEl("button", {
      text: t("modal.tabCreate", l),
      cls: `aichatclip-modal-tab${this.mode === "create" ? " is-active" : ""}`
    });
    const deleteTab = tabBar.createEl("button", {
      text: t("modal.tabDelete", l),
      cls: `aichatclip-modal-tab${this.mode === "delete" ? " is-active" : ""}`
    });
    createTab.addEventListener("click", () => {
      this.mode = "create";
      void this.render();
    });
    deleteTab.addEventListener("click", () => {
      this.mode = "delete";
      void this.render();
    });
    if (this.mode === "create") {
      await this.renderCreateMode(contentEl);
    } else {
      await this.renderDeleteMode(contentEl);
    }
  }
  async renderCreateMode(container) {
    var _a;
    const l = this.lang;
    const { scanRoot, markerFilename } = this.settings;
    const marker = markerFilename || "README";
    const langRow = container.createDiv({ cls: "aichatclip-modal-actions" });
    const langLabel = langRow.createEl("label", { text: t("modal.descLanguage", l) });
    const langSelect = langLabel.createEl("select");
    for (const [val, label] of [
      ["auto", t("lang.auto", l)],
      ["en", "English"],
      ["ja", "\u65E5\u672C\u8A9E"],
      ["zh", "\u4E2D\u6587"],
      ["ko", "\uD55C\uAD6D\uC5B4"],
      ["es", "Espa\xF1ol"],
      ["fr", "Fran\xE7ais"],
      ["de", "Deutsch"]
    ]) {
      const opt = langSelect.createEl("option", { text: label, value: val });
      if (val === this.descriptionLanguage) opt.selected = true;
    }
    langSelect.addEventListener("change", () => {
      this.descriptionLanguage = langSelect.value;
    });
    const toolbar = container.createDiv({ cls: "aichatclip-modal-actions" });
    const selectAllBtn = toolbar.createEl("button", { text: t("modal.selectAll", l) });
    const deselectAllBtn = toolbar.createEl("button", { text: t("modal.deselectAll", l) });
    const folders = getVaultFolders(this.app, scanRoot);
    if (folders.length === 0) {
      container.createEl("p", {
        text: t("modal.noFolders", l),
        cls: "aichatclip-modal-empty"
      });
      return;
    }
    for (const folder of folders) {
      if (!this.folderStates.has(folder.path)) {
        const existing = await getExistingMarkerContent(this.app, folder.path, marker);
        const folderTitle = (_a = folder.path.split("/").pop()) != null ? _a : folder.path;
        const defaultDesc = `# ${folderTitle}

`;
        this.folderStates.set(folder.path, {
          selected: existing !== null,
          description: existing != null ? existing : defaultDesc,
          hasExisting: existing !== null
        });
      }
    }
    const listEl = container.createDiv({ cls: "aichatclip-folder-list" });
    for (const folder of folders) {
      const state = this.folderStates.get(folder.path);
      const item = listEl.createDiv({ cls: "aichatclip-folder-item" });
      const header = item.createDiv({ cls: "aichatclip-folder-item-header" });
      const checkbox = header.createEl("input", { type: "checkbox" });
      checkbox.checked = state.selected;
      checkbox.addEventListener("change", () => {
        state.selected = checkbox.checked;
      });
      const label = header.createEl("span", { text: folder.path, cls: "aichatclip-folder-name" });
      if (state.hasExisting) {
        label.createEl("span", {
          text: t("modal.existingMarker", l),
          cls: "aichatclip-existing-badge"
        });
      }
      const textarea = item.createEl("textarea", {
        cls: "aichatclip-folder-desc",
        placeholder: t("modal.descPlaceholder", l)
      });
      textarea.value = state.description;
      textarea.rows = 5;
      textarea.addEventListener("input", () => {
        state.description = textarea.value;
        updateRefineBtn();
      });
      const btnRow = item.createDiv({ cls: "aichatclip-folder-btn-row" });
      const genBtn = btnRow.createEl("button", {
        text: t("modal.generate", l),
        cls: "aichatclip-generate-btn"
      });
      const refineBtn = btnRow.createEl("button", {
        text: t("modal.refine", l),
        cls: "aichatclip-refine-btn"
      });
      const getDescriptionBody = () => {
        const text = textarea.value.trim();
        const match = text.match(/^#[^\n]+\n*([\s\S]*)$/);
        return match ? match[1].trim() : text;
      };
      const updateRefineBtn = () => {
        refineBtn.disabled = getDescriptionBody().length === 0;
      };
      updateRefineBtn();
      genBtn.addEventListener("click", () => {
        void (async () => {
          var _a2;
          genBtn.disabled = true;
          genBtn.textContent = t("modal.generating", l);
          try {
            const excerpts = await this.getNoteExcerpts(folder.path, marker);
            const res = await apiPost(this.settings, "/api/folders/generate-description", {
              folderName: folder.path,
              noteExcerpts: excerpts.length > 0 ? excerpts : void 0,
              language: this.descriptionLanguage !== "auto" ? this.descriptionLanguage : void 0
            });
            if (res.status === 429) {
              new import_obsidian3.Notice(`AIChatClip: ${t("notice.quotaExceeded", l)}`);
            } else if (res.status === 200) {
              const data = res.json;
              const folderTitle = (_a2 = folder.path.split("/").pop()) != null ? _a2 : folder.path;
              const content = `# ${folderTitle}

${data.description}`;
              textarea.value = content;
              state.description = content;
              state.selected = true;
              checkbox.checked = true;
              updateRefineBtn();
            } else {
              new import_obsidian3.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
            }
          } catch (e) {
            new import_obsidian3.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
          } finally {
            genBtn.disabled = false;
            genBtn.textContent = t("modal.generate", l);
          }
        })();
      });
      refineBtn.addEventListener("click", () => {
        void (async () => {
          var _a2;
          const body = getDescriptionBody();
          if (body.length === 0) return;
          refineBtn.disabled = true;
          refineBtn.textContent = t("modal.refining", l);
          try {
            const res = await apiPost(this.settings, "/api/folders/generate-description", {
              folderName: folder.path,
              draftText: body,
              language: this.descriptionLanguage !== "auto" ? this.descriptionLanguage : void 0
            });
            if (res.status === 429) {
              new import_obsidian3.Notice(`AIChatClip: ${t("notice.quotaExceeded", l)}`);
            } else if (res.status === 200) {
              const data = res.json;
              const folderTitle = (_a2 = folder.path.split("/").pop()) != null ? _a2 : folder.path;
              const content = `# ${folderTitle}

${data.description}`;
              textarea.value = content;
              state.description = content;
              state.selected = true;
              checkbox.checked = true;
              updateRefineBtn();
            } else {
              new import_obsidian3.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
            }
          } catch (e) {
            new import_obsidian3.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
          } finally {
            refineBtn.disabled = false;
            refineBtn.textContent = t("modal.refine", l);
            updateRefineBtn();
          }
        })();
      });
    }
    selectAllBtn.addEventListener("click", () => {
      for (const state of this.folderStates.values()) state.selected = true;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = true;
      });
    });
    deselectAllBtn.addEventListener("click", () => {
      for (const state of this.folderStates.values()) state.selected = false;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = false;
      });
    });
    const footer = container.createDiv({ cls: "aichatclip-modal-footer" });
    const createBtn = footer.createEl("button", {
      text: t("modal.createAndSync", l),
      cls: "mod-cta"
    });
    createBtn.addEventListener("click", () => {
      void this.handleCreate(marker);
    });
  }
  async handleCreate(marker) {
    const l = this.lang;
    const selected = [...this.folderStates.entries()].filter(
      ([, s]) => s.selected && s.description.trim() !== ""
    );
    if (selected.length === 0) return;
    const overwrites = selected.filter(([, s]) => s.hasExisting);
    if (overwrites.length > 0) {
      const confirmed = await showConfirmModal(
        this.app,
        tReplace("modal.confirmOverwrite", l, { count: overwrites.length })
      );
      if (!confirmed) return;
    }
    const ext = marker.includes(".") ? "" : ".md";
    for (const [folderPath, state] of selected) {
      const filePath = `${folderPath}/${marker}${ext}`;
      const existing = this.app.vault.getFileByPath(filePath);
      if (existing) {
        await this.app.vault.modify(existing, state.description);
      } else {
        const folder = this.app.vault.getFolderByPath(folderPath);
        if (!folder) {
          await this.app.vault.createFolder(folderPath);
        }
        await this.app.vault.create(filePath, state.description);
      }
    }
    try {
      const folders = await scanFolders(
        this.app,
        this.settings.scanRoot,
        this.settings.markerFilename
      );
      if (folders) {
        await syncFoldersToApi(this.settings, folders);
      }
      new import_obsidian3.Notice(
        `AIChatClip: ${tReplace("notice.markersCreated", l, { count: selected.length })}`
      );
    } catch (e) {
      new import_obsidian3.Notice(`AIChatClip: ${t("notice.syncAfterCreateFailed", l)}`);
    }
    await this.onComplete();
    this.close();
  }
  async renderDeleteMode(container) {
    const l = this.lang;
    const { scanRoot, markerFilename } = this.settings;
    const markers = await getFoldersWithMarker(this.app, scanRoot, markerFilename);
    if (markers.length === 0) {
      container.createEl("p", {
        text: t("modal.noMarkers", l),
        cls: "aichatclip-modal-empty"
      });
      return;
    }
    const toolbar = container.createDiv({ cls: "aichatclip-modal-actions" });
    toolbar.createEl("p", { text: t("modal.markersFound", l) });
    const selectAllBtn = toolbar.createEl("button", { text: t("modal.selectAll", l) });
    const deselectAllBtn = toolbar.createEl("button", { text: t("modal.deselectAll", l) });
    this.deleteItems = markers.map((m) => ({ ...m, selected: true }));
    const listEl = container.createDiv({ cls: "aichatclip-folder-list" });
    for (const item of this.deleteItems) {
      const row = listEl.createDiv({ cls: "aichatclip-delete-item" });
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.checked = item.selected;
      checkbox.addEventListener("change", () => {
        item.selected = checkbox.checked;
      });
      row.createEl("span", { text: item.markerPath });
    }
    selectAllBtn.addEventListener("click", () => {
      for (const item of this.deleteItems) item.selected = true;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = true;
      });
    });
    deselectAllBtn.addEventListener("click", () => {
      for (const item of this.deleteItems) item.selected = false;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = false;
      });
    });
    const footer = container.createDiv({ cls: "aichatclip-modal-footer" });
    const deleteBtn = footer.createEl("button", {
      text: t("modal.deleteAndSync", l),
      cls: "mod-warning"
    });
    deleteBtn.addEventListener("click", () => {
      void this.handleDelete();
    });
  }
  async handleDelete() {
    const l = this.lang;
    const toDelete = this.deleteItems.filter((i) => i.selected);
    if (toDelete.length === 0) return;
    for (const item of toDelete) {
      const file = this.app.vault.getFileByPath(item.markerPath);
      if (file) {
        await this.app.fileManager.trashFile(file);
      }
    }
    try {
      const folders = await scanFolders(
        this.app,
        this.settings.scanRoot,
        this.settings.markerFilename
      );
      if (folders) {
        await syncFoldersToApi(this.settings, folders);
      }
      new import_obsidian3.Notice(
        `AIChatClip: ${tReplace("notice.markersDeleted", l, { count: toDelete.length })}`
      );
    } catch (e) {
      new import_obsidian3.Notice(`AIChatClip: ${t("notice.syncAfterDeleteFailed", l)}`);
    }
    await this.onComplete();
    this.close();
  }
  async getNoteExcerpts(folderPath, markerBasename) {
    const files = this.app.vault.getFiles().filter(
      (f) => {
        var _a;
        return ((_a = f.parent) == null ? void 0 : _a.path) === folderPath && f.extension === "md" && f.basename !== markerBasename;
      }
    ).slice(0, 5);
    const excerpts = [];
    for (const file of files) {
      const content = await this.app.vault.read(file);
      excerpts.push(content.slice(0, 500));
    }
    return excerpts;
  }
};
var ConfirmModal = class extends import_obsidian3.Modal {
  constructor(app, message, resolvePromise) {
    super(app);
    this.resolved = false;
    this.message = message;
    this.resolvePromise = resolvePromise;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("p", { text: this.message });
    new import_obsidian3.Setting(contentEl).addButton(
      (btn) => btn.setButtonText("OK").setCta().onClick(() => {
        this.resolved = true;
        this.resolvePromise(true);
        this.close();
      })
    ).addButton(
      (btn) => btn.setButtonText("Cancel").onClick(() => {
        this.resolved = true;
        this.resolvePromise(false);
        this.close();
      })
    );
  }
  onClose() {
    if (!this.resolved) {
      this.resolvePromise(false);
    }
  }
};
function showConfirmModal(app, message) {
  return new Promise((resolve) => {
    new ConfirmModal(app, message, resolve).open();
  });
}

// src/types.ts
var API_BASE_URL = "https://api.aichatclip.com";
var WEB_URL = "https://aichatclip.com";
var SYNCED_CLIP_IDS_MAX = 1e3;
var DEFAULT_SETTINGS = {
  apiBaseUrl: API_BASE_URL,
  token: "",
  inboxFolder: "AIChatClip/Inbox",
  autoSyncOnLoad: true,
  syncOnForeground: true,
  scanRoot: "",
  markerFilename: "README",
  autoScanFolders: true,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  fileNameTemplate: "{yyyy}-{MM}-{dd}-{title}",
  tagRulePath: "TagRule",
  deviceId: "",
  syncedClipIds: [],
  pluginLanguage: "auto",
  cachedUserPlan: "free"
};

// src/settings.ts
var DEFAULT_TAG_RULE_TEMPLATE = `Tag Design and Naming Rules:

1. Consistent naming
- All lowercase: Tag names must be entirely lowercase. Example: #meeting, #project-alpha
- No spaces: Use hyphens (-) or underscores (_) to separate words. Example: #to-do, #research_notes

2. Content tags only
- ALLOWED: Content tags representing the subject or topic. Example: #python, #data-analysis
- FORBIDDEN: Status tags (#unorganized, #needs-review, #done), time tags (#2023, #Q1), location tags (#tokyo, #office)

3. Use singular form
- Always use singular. Example: #note (not #notes), #task (not #tasks)

4. Allowed characters
- Only hyphens (-), underscores (_), and slashes (/) are permitted. No spaces, special symbols, or emoji.

5. Be specific and concise
- Tag names should accurately and concisely represent the content.
- Example: #marketing-strategy (good), #strategy (too vague)
- Abbreviations: Only use widely recognized abbreviations. Example: ai, ui

6. Proper nouns
- Use the official/formal name for people, organizations, and places.

7. Maximum 5 tags per note

8. Forbidden tags
- Do not use tags related to: TODO, ROUTINE (e.g. daily-routine), JOURNAL, STUDY, EXERCISE
`;
var README_TEMPLATE = `# Folder Name

This folder contains notes about [topic].

## Purpose
Describe what kind of content belongs in this folder so AI can categorize clips automatically.

## Tags
- tag1
- tag2
`;
var AIChatClipSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  get lang() {
    return this.plugin.lang;
  }
  display() {
    const { containerEl } = this;
    const l = this.lang;
    containerEl.empty();
    const linkEl = containerEl.createDiv({ cls: "aichatclip-header-link" });
    linkEl.createEl("a", { text: "aichatclip.com", href: WEB_URL });
    const tabHeader = containerEl.createDiv({ cls: "aichatclip-tab-header" });
    const basicBtn = tabHeader.createEl("button", {
      text: t("tab.basic", l),
      cls: "aichatclip-tab-button is-active"
    });
    const proBtn = tabHeader.createEl("button", {
      cls: "aichatclip-tab-button"
    });
    proBtn.appendText(`${t("tab.pro", l)} `);
    proBtn.createSpan({ text: "Pro", cls: "aichatclip-pro-badge" });
    const guideBtn = tabHeader.createEl("button", {
      text: t("tab.guide", l),
      cls: "aichatclip-tab-button"
    });
    const basicTab = containerEl.createDiv({ cls: "aichatclip-tab-content is-active" });
    const proTab = containerEl.createDiv({ cls: "aichatclip-tab-content" });
    const guideTab = containerEl.createDiv({ cls: "aichatclip-tab-content" });
    const tabs = {
      basic: { btn: basicBtn, content: basicTab },
      pro: { btn: proBtn, content: proTab },
      guide: { btn: guideBtn, content: guideTab }
    };
    const switchTab = (active) => {
      for (const [name, { btn, content }] of Object.entries(tabs)) {
        const isActive = name === active;
        btn.toggleClass("is-active", isActive);
        content.toggleClass("is-active", isActive);
      }
    };
    basicBtn.addEventListener("click", () => switchTab("basic"));
    proBtn.addEventListener("click", () => switchTab("pro"));
    guideBtn.addEventListener("click", () => switchTab("guide"));
    this.renderBasicTab(basicTab);
    this.renderProTab(proTab);
    this.renderGuideTab(guideTab);
    const footer = containerEl.createDiv({ cls: "aichatclip-footer" });
    footer.createEl("a", { text: "aichatclip.com", href: WEB_URL });
  }
  renderBasicTab(el) {
    const l = this.lang;
    new import_obsidian4.Setting(el).setName(t("lang.name", l)).setDesc(t("lang.desc", l)).addDropdown((dropdown) => {
      dropdown.addOptions({
        auto: `${t("lang.auto", l)} (${detectLang()})`,
        en: "English",
        ja: "\u65E5\u672C\u8A9E",
        zh: "\u4E2D\u6587",
        ko: "\uD55C\uAD6D\uC5B4"
      });
      dropdown.setValue(this.plugin.settings.pluginLanguage);
      dropdown.onChange(async (value) => {
        this.plugin.settings.pluginLanguage = value;
        await this.plugin.saveSettings();
        this.display();
      });
    });
    const authSetting = new import_obsidian4.Setting(el).setName(t("auth.name", l));
    if (this.plugin.settings.token) {
      authSetting.setDesc(t("auth.connected", l));
      authSetting.addButton(
        (button) => button.setButtonText(t("auth.signOut", l)).onClick(async () => {
          var _a;
          (_a = this.plugin.syncWs) == null ? void 0 : _a.disconnect();
          this.plugin.settings.token = "";
          await this.plugin.saveSettings();
          this.display();
        })
      );
    } else {
      authSetting.setDesc(t("auth.notConnected", l));
      authSetting.addButton(
        (button) => button.setButtonText(t("auth.signIn", l)).setCta().onClick(() => {
          window.open(`${WEB_URL}/auth/obsidian`);
        })
      );
    }
    if (this.plugin.settings.token && import_obsidian4.Platform.isDesktop) {
      const wsKey = this.plugin.wsConnected ? "ws.connected" : "ws.disconnected";
      new import_obsidian4.Setting(el).setName(t("ws.name", l)).setDesc(t(wsKey, l));
    }
    if (this.plugin.settings.token) {
      new import_obsidian4.Setting(el).setName(t("device.name", l)).setDesc(t("device.desc", l)).addButton(
        (button) => button.setButtonText(t("device.makePrimary", l)).onClick(async () => {
          try {
            await apiPatch(this.plugin.settings, `/api/devices/${this.plugin.settings.deviceId}/primary`);
            new import_obsidian4.Notice(`AIChatClip: ${t("notice.primarySet", l)}`);
            if (import_obsidian4.Platform.isDesktop) {
              this.plugin.connectWebSocket();
            }
          } catch (e) {
            new import_obsidian4.Notice(`AIChatClip: ${t("notice.primaryFailed", l)}`);
          }
        })
      );
    }
    new import_obsidian4.Setting(el).setName(t("autoSync.name", l)).setDesc(t("autoSync.desc", l)).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoSyncOnLoad).onChange(async (value) => {
        this.plugin.settings.autoSyncOnLoad = value;
        await this.plugin.saveSettings();
      })
    );
    if (import_obsidian4.Platform.isMobile) {
      new import_obsidian4.Setting(el).setName(t("syncOnForeground.name", l)).setDesc(t("syncOnForeground.desc", l)).addToggle(
        (toggle) => toggle.setValue(this.plugin.settings.syncOnForeground).onChange(async (value) => {
          this.plugin.settings.syncOnForeground = value;
          await this.plugin.saveSettings();
          this.plugin.setupForegroundSync();
        })
      );
    }
    new import_obsidian4.Setting(el).setName(t("inbox.name", l)).setDesc(t("inbox.desc", l)).addText(
      (text) => text.setPlaceholder("AIChatClip/inbox").setValue(this.plugin.settings.inboxFolder).onChange(async (value) => {
        this.plugin.settings.inboxFolder = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian4.Setting(el).setName(t("fileName.name", l)).setDesc(t("fileName.desc", l)).addText(
      (text) => text.setPlaceholder("{yyyy}-{MM}-{dd}-{title}").setValue(this.plugin.settings.fileNameTemplate).onChange(async (value) => {
        this.plugin.settings.fileNameTemplate = value || "{yyyy}-{MM}-{dd}-{title}";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian4.Setting(el).setName(t("timezone.name", l)).setDesc(t("timezone.desc", l)).addText(
      (text) => text.setPlaceholder(Intl.DateTimeFormat().resolvedOptions().timeZone).setValue(this.plugin.settings.timezone).onChange(async (value) => {
        this.plugin.settings.timezone = value || Intl.DateTimeFormat().resolvedOptions().timeZone;
        await this.plugin.saveSettings();
      })
    );
  }
  renderProTab(el) {
    const l = this.lang;
    const isPro = this.plugin.settings.cachedUserPlan === "pro";
    if (!isPro) {
      const planBox = el.createDiv({ cls: "aichatclip-plan-box" });
      const table = planBox.createEl("table", { cls: "aichatclip-plan-table" });
      const thead = table.createEl("thead");
      const headRow = thead.createEl("tr");
      headRow.createEl("th", { text: "" });
      headRow.createEl("th", { text: "Free" });
      headRow.createEl("th", { text: "Pro" });
      const tbody = table.createEl("tbody");
      const features = [
        [t("pro.feature.clipToObsidian", l), true, true],
        [t("pro.feature.unlimitedClips", l), true, true],
        [t("pro.feature.autoTags", l), false, true],
        [t("pro.feature.summary", l), false, true],
        [t("pro.feature.smartFolder", l), false, true],
        [t("pro.feature.weeklyDigest", l), false, true]
      ];
      for (const [name, free, pro] of features) {
        const row = tbody.createEl("tr");
        row.createEl("td", { text: name });
        row.createEl("td", { text: free ? "\u2713" : "\u2014", cls: free ? "aichatclip-check" : "aichatclip-dash" });
        row.createEl("td", { text: pro ? "\u2713" : "\u2014", cls: pro ? "aichatclip-check" : "aichatclip-dash" });
      }
      const cta = planBox.createDiv({ cls: "aichatclip-plan-cta" });
      cta.createEl("a", {
        text: t("pro.cta.upgrade", l),
        href: `${WEB_URL}/pricing`,
        cls: "aichatclip-plan-link"
      });
      el.createEl("hr", { cls: "aichatclip-separator" });
    }
    if (!isPro) return;
    el.createEl("p", {
      text: t("pro.folderDesc", l),
      cls: "setting-item-description"
    });
    const docsLinkEl = el.createEl("p", { cls: "setting-item-description" });
    docsLinkEl.createEl("a", {
      text: t("pro.folderDocsLink", l),
      href: `${WEB_URL}/docs/marker-files`
    });
    new import_obsidian4.Setting(el).setName(t("pro.autoScan.name", l)).setDesc(t("pro.autoScan.desc", l)).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoScanFolders).onChange(async (value) => {
        this.plugin.settings.autoScanFolders = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian4.Setting(el).setName(t("pro.scanRoot.name", l)).setDesc(t("pro.scanRoot.desc", l)).addText(
      (text) => text.setPlaceholder(t("pro.scanRoot.placeholder", l)).setValue(this.plugin.settings.scanRoot).onChange(async (value) => {
        this.plugin.settings.scanRoot = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian4.Setting(el).setName(t("pro.marker.name", l)).setDesc(t("pro.marker.desc", l)).addText(
      (text) => text.setPlaceholder("README").setValue(this.plugin.settings.markerFilename).onChange(async (value) => {
        this.plugin.settings.markerFilename = value || "README";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian4.Setting(el).setName(t("pro.scanNow.name", l)).setDesc(t("pro.scanNow.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.scanNow.button", l)).setCta().onClick(async () => {
        if (!this.plugin.settings.token) {
          new import_obsidian4.Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
          return;
        }
        try {
          const folders = await scanFolders(
            this.app,
            this.plugin.settings.scanRoot,
            this.plugin.settings.markerFilename
          );
          if (folders) {
            await syncFoldersToApi(this.plugin.settings, folders);
            new import_obsidian4.Notice(`AIChatClip: ${tReplace("notice.foldersSynced", l, { count: folders.length })}`);
          } else {
            new import_obsidian4.Notice(`AIChatClip: ${t("notice.foldersSynced", l)}`);
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          new import_obsidian4.Notice(`AIChatClip: ${tReplace("notice.folderScanFailed", l, { msg })}`);
        }
      })
    );
    new import_obsidian4.Setting(el).setName(t("pro.readme.name", l)).setDesc(t("pro.readme.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.readme.button", l)).onClick(async () => {
        await navigator.clipboard.writeText(README_TEMPLATE);
        new import_obsidian4.Notice(`AIChatClip: ${t("notice.readmeCopied", l)}`);
      })
    );
    new import_obsidian4.Setting(el).setName(t("pro.folderManager.name", l)).setDesc(t("pro.folderManager.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.folderManager.button", l)).setCta().onClick(() => {
        new FolderManagerModal(this.app, this.plugin.settings, l, async () => {
        }).open();
      })
    );
    el.createEl("hr", { cls: "aichatclip-separator" });
    new import_obsidian4.Setting(el).setName(t("pro.aiCustomization", l)).setHeading();
    new import_obsidian4.Setting(el).setName(t("pro.titleLang.name", l)).setDesc(t("pro.titleLang.desc", l)).addDropdown((dropdown) => {
      dropdown.addOptions({
        auto: t("titleLang.auto", l),
        en: "English",
        ja: "\u65E5\u672C\u8A9E",
        zh: "\u4E2D\u6587",
        ko: "\uD55C\uAD6D\uC5B4",
        es: "Espa\xF1ol",
        fr: "Fran\xE7ais",
        de: "Deutsch"
      });
      void this.loadLanguageSetting(dropdown);
      dropdown.onChange(async (value) => {
        await this.savePreference({ fileNameLanguage: value });
      });
    });
    let updateCreateBtn;
    new import_obsidian4.Setting(el).setName(t("pro.tagRule.name", l)).setDesc(t("pro.tagRule.desc", l)).addText(
      (text) => text.setPlaceholder("Tag rule").setValue(this.plugin.settings.tagRulePath).onChange(async (value) => {
        this.plugin.settings.tagRulePath = value || "TagRule";
        await this.plugin.saveSettings();
        updateCreateBtn();
      })
    ).addButton((btn) => {
      updateCreateBtn = () => {
        const path = `${this.plugin.settings.tagRulePath}.md`;
        const exists = !!this.app.vault.getFileByPath(path);
        btn.setDisabled(exists);
      };
      btn.setButtonText(t("pro.tagRule.create", l)).onClick(async () => {
        const path = `${this.plugin.settings.tagRulePath}.md`;
        if (this.app.vault.getFileByPath(path)) return;
        await this.app.vault.create(path, DEFAULT_TAG_RULE_TEMPLATE);
        new import_obsidian4.Notice(t("pro.tagRule.created", l));
        btn.setDisabled(true);
      });
      updateCreateBtn();
    });
  }
  renderGuideTab(el) {
    const l = this.lang;
    new import_obsidian4.Setting(el).setName(t("guide.title", l)).setHeading();
    const steps = el.createDiv({ cls: "aichatclip-guide-steps" });
    for (const i of [1, 2, 3]) {
      const step = steps.createDiv({ cls: "aichatclip-guide-step" });
      const num = step.createDiv({ cls: "aichatclip-guide-step-num" });
      num.setText(String(i));
      const content = step.createDiv({ cls: "aichatclip-guide-step-content" });
      new import_obsidian4.Setting(content).setName(t(`guide.step${i}.title`, l)).setHeading();
      content.createEl("p", { text: t(`guide.step${i}.desc`, l) });
    }
    const docsLink = el.createDiv({ cls: "aichatclip-guide-docs" });
    docsLink.createEl("a", {
      text: t("guide.docsLink", l),
      href: `${WEB_URL}/docs`,
      cls: "aichatclip-guide-docs-link"
    });
  }
  async loadLanguageSetting(dropdown) {
    if (!this.plugin.settings.token) return;
    try {
      const res = await apiGet(this.plugin.settings, "/api/preferences");
      if (res.status === 200) {
        const data = res.json;
        if (data.fileNameLanguage) {
          dropdown.setValue(data.fileNameLanguage);
        }
      }
    } catch (e) {
    }
  }
  async savePreference(body) {
    const l = this.lang;
    if (!this.plugin.settings.token) {
      new import_obsidian4.Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
      return;
    }
    try {
      await apiPut(this.plugin.settings, "/api/preferences", body);
    } catch (e) {
      new import_obsidian4.Notice(`AIChatClip: ${t("notice.prefFailed", l)}`);
    }
  }
};

// src/formatter.ts
function escapeYaml(value) {
  if (/[:#[{}&*!|>'"%@`,?\]]/.test(value) || value.trim() !== value) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}
function formatLocalDate(isoString, timezone) {
  const d = new Date(isoString);
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(d).map((p) => [p.type, p.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
}
function formatClipToMarkdown(clip, settings) {
  const lines = ["---"];
  lines.push(`source: ${clip.source}`);
  if (clip.url) {
    lines.push(`url: ${escapeYaml(clip.url)}`);
  }
  if (clip.chatTitle) {
    lines.push(`chat_title: ${escapeYaml(clip.chatTitle)}`);
  }
  lines.push(`clipped_at: ${formatLocalDate(clip.createdAt, settings.timezone)}`);
  if (clip.summary) {
    lines.push(`summary: ${escapeYaml(clip.summary)}`);
  }
  if (clip.tags) {
    const tagList = clip.tags.split(",").map((t2) => t2.trim().replace(/^#/, "")).filter(Boolean);
    if (tagList.length > 0) {
      lines.push(`tags: [${tagList.map((t2) => escapeYaml(t2)).join(", ")}]`);
    }
  }
  lines.push("---");
  lines.push("");
  if (clip.prompt) {
    lines.push("## Prompt");
    lines.push("");
    lines.push(clip.prompt);
    lines.push("");
  }
  lines.push("## Response");
  lines.push("");
  lines.push(clip.content);
  lines.push("");
  return lines.join("\n");
}

// src/sync.ts
async function fetchPendingClips(settings) {
  const res = await apiGet(settings, "/api/clips/pending");
  if (res.status !== 200) {
    throw new Error(`Failed to fetch pending clips: ${res.status}`);
  }
  return res.json;
}
async function fetchUserPlan(settings) {
  var _a;
  try {
    const res = await apiGet(settings, "/api/me");
    if (res.status === 200) {
      const data = res.json;
      return ((_a = data.user) == null ? void 0 : _a.plan) === "pro" ? "pro" : "free";
    }
  } catch (e) {
  }
  return "free";
}
async function markClipSynced(settings, clipId) {
  const res = await apiPatch(settings, `/api/clips/${clipId}/sync`, {
    syncedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  if (res.status !== 200) {
    throw new Error(`Failed to mark clip ${clipId} as synced: ${res.status}`);
  }
}
async function ensureFolder(app, folderPath) {
  const parts = folderPath.split("/");
  let current = "";
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    if (!app.vault.getAbstractFileByPath(current)) {
      await app.vault.createFolder(current);
    }
  }
}
function getExistingSyncedClipIds(app, folderPath) {
  var _a;
  const ids = /* @__PURE__ */ new Set();
  const folder = app.vault.getAbstractFileByPath(folderPath);
  if (!folder) return ids;
  const files = app.vault.getMarkdownFiles().filter((f) => f.path.startsWith(`${folderPath}/`));
  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const clipId = (_a = cache == null ? void 0 : cache.frontmatter) == null ? void 0 : _a.clip_id;
    if (typeof clipId === "string") {
      ids.add(clipId);
    }
  }
  return ids;
}
function sanitizeFileName(name) {
  return name.replace(/[/\\:*?"<>|]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim();
}
function applyFileNameTemplate(template, clip, timezone, userPlan) {
  const localDate = formatLocalDate(clip.createdAt, timezone);
  const [datePart, timePart] = localDate.split("T");
  const [yyyy, MM, dd] = datePart.split("-");
  const [hh, mm, ss] = timePart.split(":");
  let result = template.replace(/\{yyyy\}/g, yyyy).replace(/\{MM\}/g, MM).replace(/\{dd\}/g, dd).replace(/\{hh\}/g, hh).replace(/\{mm\}/g, mm).replace(/\{ss\}/g, ss).replace(/\{source\}/g, clip.source).replace(/\{chat_title\}/g, sanitizeFileName(clip.chatTitle || "Untitled"));
  if (userPlan === "pro") {
    result = result.replace(/\{title\}/g, sanitizeFileName(clip.title || "Untitled"));
  } else {
    result = result.replace(/\{title\}/g, "title-only-pro-plan");
  }
  return result;
}
function resolveFilePath(app, targetFolder, baseName) {
  let candidate = `${targetFolder}/${baseName}.md`;
  let counter = 2;
  while (app.vault.getAbstractFileByPath(candidate)) {
    candidate = `${targetFolder}/${baseName}-${counter}.md`;
    counter++;
  }
  return candidate;
}
async function writeClipToVault(app, settings, clip, userPlan) {
  const targetFolder = userPlan === "pro" && clip.folderPath ? clip.folderPath : settings.inboxFolder;
  await ensureFolder(app, targetFolder);
  const markdown = formatClipToMarkdown(clip, settings);
  const baseName = applyFileNameTemplate(settings.fileNameTemplate, clip, settings.timezone, userPlan);
  const filePath = resolveFilePath(app, targetFolder, baseName);
  await app.vault.create(filePath, markdown);
}
var lastTagRuleMtime = 0;
async function syncTagRule(app, settings) {
  if (!settings.tagRulePath || !settings.token) return;
  try {
    const filePath = `${settings.tagRulePath}.md`;
    const mdFile = app.vault.getMarkdownFiles().find((f) => f.path === filePath);
    if (!mdFile) return;
    const mtime = mdFile.stat.mtime;
    if (mtime === lastTagRuleMtime) return;
    const content = await app.vault.read(mdFile);
    await apiPut(settings, "/api/preferences", { tagRule: content });
    lastTagRuleMtime = mtime;
  } catch (e) {
    console.warn("AIChatClip: TagRule sync failed");
  }
}
async function syncClips(app, settings) {
  const result = { synced: 0, failed: 0, errors: [], userPlan: "free" };
  const [clips, userPlan] = await Promise.all([
    fetchPendingClips(settings),
    fetchUserPlan(settings)
  ]);
  result.userPlan = userPlan;
  if (userPlan === "pro") {
    if (settings.autoScanFolders) {
      try {
        const folders = await scanFolders(app, settings.scanRoot, settings.markerFilename);
        if (folders) {
          await syncFoldersToApi(settings, folders);
        }
      } catch (e) {
        console.warn("AIChatClip: folder sync failed, continuing with clip sync", e);
      }
    }
    await syncTagRule(app, settings);
  }
  if (clips.length === 0) return result;
  await ensureFolder(app, settings.inboxFolder);
  const existingIds = getExistingSyncedClipIds(app, settings.inboxFolder);
  const syncedSet = new Set(settings.syncedClipIds);
  for (const clip of clips) {
    try {
      if (existingIds.has(clip.id) || syncedSet.has(clip.id)) {
        await markClipSynced(settings, clip.id);
        result.synced++;
        continue;
      }
      await writeClipToVault(app, settings, clip, userPlan);
      await markClipSynced(settings, clip.id);
      result.synced++;
    } catch (e) {
      result.failed++;
      result.errors.push(`Clip ${clip.id}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  return result;
}
async function fetchClipById(settings, clipId) {
  const res = await apiGet(settings, `/api/clips/${clipId}`);
  if (res.status !== 200) {
    throw new Error(`Failed to fetch clip ${clipId}: ${res.status}`);
  }
  return res.json;
}
function addSyncedClipId(settings, clipId) {
  if (settings.syncedClipIds.includes(clipId)) return;
  settings.syncedClipIds.push(clipId);
  if (settings.syncedClipIds.length > SYNCED_CLIP_IDS_MAX) {
    settings.syncedClipIds = settings.syncedClipIds.slice(-SYNCED_CLIP_IDS_MAX);
  }
}
async function syncSingleClip(app, settings, clipId, saveSettings) {
  if (settings.syncedClipIds.includes(clipId)) return false;
  const existingIds = getExistingSyncedClipIds(app, settings.inboxFolder);
  if (existingIds.has(clipId)) {
    addSyncedClipId(settings, clipId);
    await saveSettings();
    return false;
  }
  const clip = await fetchClipById(settings, clipId);
  const userPlan = await fetchUserPlan(settings);
  settings.cachedUserPlan = userPlan;
  await ensureFolder(app, settings.inboxFolder);
  await writeClipToVault(app, settings, clip, userPlan);
  await markClipSynced(settings, clip.id);
  addSyncedClipId(settings, clipId);
  await saveSettings();
  return true;
}

// src/websocket.ts
var SyncWebSocket = class {
  constructor(opts) {
    this.ws = null;
    this.reconnectAttempt = 0;
    this.reconnectTimer = null;
    this.pingTimer = null;
    this.shouldReconnect = true;
    this.opts = opts;
  }
  connect() {
    this.shouldReconnect = true;
    this.doConnect();
  }
  doConnect() {
    try {
      const wsUrl = this.opts.apiBaseUrl.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
      const url = `${wsUrl}/api/ws?token=${encodeURIComponent(this.opts.token)}&deviceId=${encodeURIComponent(this.opts.deviceId)}`;
      this.ws = new WebSocket(url);
      this.ws.onopen = () => {
        var _a, _b;
        this.reconnectAttempt = 0;
        this.startPing();
        (_b = (_a = this.opts).onStatusChange) == null ? void 0 : _b.call(_a, true);
      };
      this.ws.onmessage = (event) => {
        if (event.data === "pong") return;
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "new_clip" && msg.clipId) {
            this.opts.onNewClip(msg.clipId);
          }
        } catch (e) {
        }
      };
      this.ws.onclose = () => {
        var _a, _b;
        this.stopPing();
        (_b = (_a = this.opts).onStatusChange) == null ? void 0 : _b.call(_a, false);
        this.scheduleReconnect();
      };
      this.ws.onerror = () => {
        var _a;
        (_a = this.ws) == null ? void 0 : _a.close();
      };
    } catch (e) {
      this.scheduleReconnect();
    }
  }
  scheduleReconnect() {
    if (!this.shouldReconnect) return;
    const delay = Math.min(1e3 * 2 ** this.reconnectAttempt, 6e4);
    this.reconnectAttempt++;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.doConnect();
    }, delay);
  }
  startPing() {
    this.stopPing();
    this.pingTimer = setInterval(() => {
      var _a;
      if (((_a = this.ws) == null ? void 0 : _a.readyState) === WebSocket.OPEN) {
        this.ws.send("ping");
      }
    }, 3e4);
  }
  stopPing() {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }
  disconnect() {
    var _a, _b;
    this.shouldReconnect = false;
    this.stopPing();
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    (_b = (_a = this.opts).onStatusChange) == null ? void 0 : _b.call(_a, false);
  }
  get isConnected() {
    var _a;
    return ((_a = this.ws) == null ? void 0 : _a.readyState) === WebSocket.OPEN;
  }
  updateOpts(opts) {
    Object.assign(this.opts, opts);
  }
};

// src/main.ts
var LOGO_ICON = `<g transform="scale(4.1667)" fill="currentColor">
  <circle cx="13" cy="10.27" r="2"/>
  <path d="M20.2,9.8l-3.5,6.06c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l3.5-6.06c1.11-1.91.45-4.36-1.46-5.46s-4.36-.45-5.46,1.46l-.5.87c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l.5-.87C11.46.94,15.13-.05,18,1.61s3.85,5.33,2.2,8.2Z"/>
  <path d="M14.7,19.33l-.5.87c-1.66,2.87-5.33,3.85-8.2,2.2s-3.85-5.33-2.2-8.2l3.5-6.06c.27-.48.89-.64,1.37-.37s.64.89.37,1.37l-3.5,6.06c-1.1,1.91-.45,4.36,1.46,5.46s4.36.45,5.46-1.46l.5-.87c.27-.48.89-.64,1.37-.37s.64.89.37,1.37Z"/>
</g>`;
var AIChatClipPlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.isSyncing = false;
    this.settingTab = null;
    this.syncWs = null;
    this.wsConnected = false;
    this.onVisibilityChange = () => {
      if (document.visibilityState === "visible" && this.settings.syncOnForeground) {
        void this.performSync();
      }
    };
  }
  get lang() {
    return this.settings.pluginLanguage === "auto" ? detectLang() : this.settings.pluginLanguage;
  }
  async onload() {
    await this.loadSettings();
    if (!this.settings.deviceId) {
      this.settings.deviceId = crypto.randomUUID();
      await this.saveSettings();
    }
    (0, import_obsidian5.addIcon)("aichatclip-logo", LOGO_ICON);
    this.addRibbonIcon("aichatclip-logo", "Sync aichatclip", () => {
      void this.performSync();
    });
    this.addCommand({
      id: "sync",
      name: "Sync clips",
      callback: () => {
        void this.performSync();
      }
    });
    this.settingTab = new AIChatClipSettingTab(this.app, this);
    this.addSettingTab(this.settingTab);
    this.registerObsidianProtocolHandler("aichatclip", (params) => {
      if (params.token) {
        void this.handleAuthCallback(params.token);
      }
    });
    this.app.workspace.onLayoutReady(async () => {
      if (this.settings.token) {
        await registerDevice(this.settings);
        if (this.settings.autoSyncOnLoad) {
          void this.performSync();
        }
        if (import_obsidian5.Platform.isDesktop) {
          this.connectWebSocket();
        }
      }
      this.setupForegroundSync();
    });
  }
  onunload() {
    var _a;
    (_a = this.syncWs) == null ? void 0 : _a.disconnect();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async performSync() {
    const l = this.lang;
    if (this.isSyncing) {
      new import_obsidian5.Notice(`AIChatClip: ${t("notice.syncInProgress", l)}`);
      return;
    }
    if (!this.settings.token) {
      new import_obsidian5.Notice(`AIChatClip: ${t("notice.noToken", l)}`);
      return;
    }
    this.isSyncing = true;
    try {
      const result = await syncClips(this.app, this.settings);
      this.settings.cachedUserPlan = result.userPlan;
      await this.saveSettings();
      if (result.synced === 0 && result.failed === 0) {
        new import_obsidian5.Notice(`AIChatClip: ${t("notice.noNewClips", l)}`);
      } else if (result.failed === 0) {
        new import_obsidian5.Notice(`AIChatClip: ${tReplace("notice.synced", l, { count: result.synced })}`);
      } else {
        new import_obsidian5.Notice(
          `AIChatClip: ${tReplace("notice.syncPartial", l, { synced: result.synced, failed: result.failed })}`
        );
        for (const err of result.errors) {
          console.error("AIChatClip sync error:", err);
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      new import_obsidian5.Notice(`AIChatClip: ${tReplace("notice.syncFailed", l, { msg })}`);
      console.error("AIChatClip sync error:", e);
    } finally {
      this.isSyncing = false;
    }
  }
  async handleAuthCallback(token) {
    this.settings.token = token;
    await this.saveSettings();
    setTimeout(() => {
      void (async () => {
        var _a;
        await registerDevice(this.settings);
        (_a = this.settingTab) == null ? void 0 : _a.display();
        new import_obsidian5.Notice(`AIChatClip: ${t("notice.connected", this.lang)}`);
        void this.performSync();
        if (import_obsidian5.Platform.isDesktop) {
          this.connectWebSocket();
        }
      })();
    }, 500);
  }
  connectWebSocket() {
    var _a;
    (_a = this.syncWs) == null ? void 0 : _a.disconnect();
    if (!this.settings.token || !this.settings.deviceId) return;
    this.syncWs = new SyncWebSocket({
      apiBaseUrl: this.settings.apiBaseUrl,
      token: this.settings.token,
      deviceId: this.settings.deviceId,
      onNewClip: (clipId) => {
        void this.handlePushNotification(clipId);
      },
      onStatusChange: (connected) => {
        var _a2;
        this.wsConnected = connected;
        (_a2 = this.settingTab) == null ? void 0 : _a2.display();
      }
    });
    this.syncWs.connect();
  }
  async handlePushNotification(clipId) {
    if (this.settings.syncedClipIds.includes(clipId)) return;
    try {
      const synced = await syncSingleClip(
        this.app,
        this.settings,
        clipId,
        () => this.saveSettings()
      );
      if (synced) {
        new import_obsidian5.Notice(`AIChatClip: ${t("notice.newClipSynced", this.lang)}`);
      }
    } catch (e) {
      console.error("AIChatClip: push sync failed", e);
    }
  }
  setupForegroundSync() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    if (!import_obsidian5.Platform.isMobile || !this.settings.syncOnForeground) return;
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.register(
      () => document.removeEventListener("visibilitychange", this.onVisibilityChange)
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2FwaS50cyIsICJzcmMvaTE4bi50cyIsICJzcmMvc2V0dGluZ3MudHMiLCAic3JjL2ZvbGRlcnMudHMiLCAic3JjL21vZGFsLnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvZm9ybWF0dGVyLnRzIiwgInNyYy9zeW5jLnRzIiwgInNyYy93ZWJzb2NrZXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKiBQbHVnaW4gZW50cnkgcG9pbnQgXHUyMDE0IHJlZ2lzdGVycyBjb21tYW5kcywgcmliYm9uIGljb24sIGFuZCBsaWZlY3ljbGUgaG9va3MgKi9cbmltcG9ydCB7IGFkZEljb24sIE5vdGljZSwgUGxhdGZvcm0sIFBsdWdpbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJEZXZpY2UgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IHR5cGUgUGx1Z2luTGFuZywgZGV0ZWN0TGFuZywgdCwgdFJlcGxhY2UgfSBmcm9tIFwiLi9pMThuXCI7XG5pbXBvcnQgeyBBSUNoYXRDbGlwU2V0dGluZ1RhYiB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBzeW5jQ2xpcHMsIHN5bmNTaW5nbGVDbGlwIH0gZnJvbSBcIi4vc3luY1wiO1xuaW1wb3J0IHsgdHlwZSBBSUNoYXRDbGlwU2V0dGluZ3MsIERFRkFVTFRfU0VUVElOR1MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgU3luY1dlYlNvY2tldCB9IGZyb20gXCIuL3dlYnNvY2tldFwiO1xuXG5jb25zdCBMT0dPX0lDT04gPSBgPGcgdHJhbnNmb3JtPVwic2NhbGUoNC4xNjY3KVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj5cbiAgPGNpcmNsZSBjeD1cIjEzXCIgY3k9XCIxMC4yN1wiIHI9XCIyXCIvPlxuICA8cGF0aCBkPVwiTTIwLjIsOS44bC0zLjUsNi4wNmMtLjI3LjQ4LS44OS42NC0xLjM3LjM3cy0uNjQtLjg5LS4zNy0xLjM3bDMuNS02LjA2YzEuMTEtMS45MS40NS00LjM2LTEuNDYtNS40NnMtNC4zNi0uNDUtNS40NiwxLjQ2bC0uNS44N2MtLjI3LjQ4LS44OS42NC0xLjM3LjM3cy0uNjQtLjg5LS4zNy0xLjM3bC41LS44N0MxMS40Ni45NCwxNS4xMy0uMDUsMTgsMS42MXMzLjg1LDUuMzMsMi4yLDguMlpcIi8+XG4gIDxwYXRoIGQ9XCJNMTQuNywxOS4zM2wtLjUuODdjLTEuNjYsMi44Ny01LjMzLDMuODUtOC4yLDIuMnMtMy44NS01LjMzLTIuMi04LjJsMy41LTYuMDZjLjI3LS40OC44OS0uNjQsMS4zNy0uMzdzLjY0Ljg5LjM3LDEuMzdsLTMuNSw2LjA2Yy0xLjEsMS45MS0uNDUsNC4zNiwxLjQ2LDUuNDZzNC4zNi40NSw1LjQ2LTEuNDZsLjUtLjg3Yy4yNy0uNDguODktLjY0LDEuMzctLjM3cy42NC44OS4zNywxLjM3WlwiLz5cbjwvZz5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBSUNoYXRDbGlwUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblx0c2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncyA9IERFRkFVTFRfU0VUVElOR1M7XG5cdHByaXZhdGUgaXNTeW5jaW5nID0gZmFsc2U7XG5cdHByaXZhdGUgc2V0dGluZ1RhYjogQUlDaGF0Q2xpcFNldHRpbmdUYWIgfCBudWxsID0gbnVsbDtcblx0c3luY1dzOiBTeW5jV2ViU29ja2V0IHwgbnVsbCA9IG51bGw7XG5cdHdzQ29ubmVjdGVkID0gZmFsc2U7XG5cblx0Z2V0IGxhbmcoKTogUGx1Z2luTGFuZyB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0dGluZ3MucGx1Z2luTGFuZ3VhZ2UgPT09IFwiYXV0b1wiXG5cdFx0XHQ/IGRldGVjdExhbmcoKVxuXHRcdFx0OiB0aGlzLnNldHRpbmdzLnBsdWdpbkxhbmd1YWdlO1xuXHR9XG5cblx0YXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cblx0XHQvLyBHZW5lcmF0ZSBkZXZpY2VJZCBvbiBmaXJzdCBsb2FkXG5cdFx0aWYgKCF0aGlzLnNldHRpbmdzLmRldmljZUlkKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmRldmljZUlkID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0XHRcdGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG5cdFx0fVxuXG5cdFx0YWRkSWNvbihcImFpY2hhdGNsaXAtbG9nb1wiLCBMT0dPX0lDT04pO1xuXHRcdHRoaXMuYWRkUmliYm9uSWNvbihcImFpY2hhdGNsaXAtbG9nb1wiLCBcIlN5bmMgYWljaGF0Y2xpcFwiLCAoKSA9PiB7IHZvaWQgdGhpcy5wZXJmb3JtU3luYygpOyB9KTtcblxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogXCJzeW5jXCIsXG5cdFx0XHRuYW1lOiBcIlN5bmMgY2xpcHNcIixcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7IHZvaWQgdGhpcy5wZXJmb3JtU3luYygpOyB9LFxuXHRcdH0pO1xuXG5cdFx0dGhpcy5zZXR0aW5nVGFiID0gbmV3IEFJQ2hhdENsaXBTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKTtcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIodGhpcy5zZXR0aW5nVGFiKTtcblxuXHRcdHRoaXMucmVnaXN0ZXJPYnNpZGlhblByb3RvY29sSGFuZGxlcihcImFpY2hhdGNsaXBcIiwgKHBhcmFtcykgPT4ge1xuXHRcdFx0aWYgKHBhcmFtcy50b2tlbikge1xuXHRcdFx0XHR2b2lkIHRoaXMuaGFuZGxlQXV0aENhbGxiYWNrKHBhcmFtcy50b2tlbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeShhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy50b2tlbikge1xuXHRcdFx0XHRhd2FpdCByZWdpc3RlckRldmljZSh0aGlzLnNldHRpbmdzKTtcblxuXHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdXRvU3luY09uTG9hZCkge1xuXHRcdFx0XHRcdHZvaWQgdGhpcy5wZXJmb3JtU3luYygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFBsYXRmb3JtLmlzRGVza3RvcCkge1xuXHRcdFx0XHRcdHRoaXMuY29ubmVjdFdlYlNvY2tldCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldHVwRm9yZWdyb3VuZFN5bmMoKTtcblx0XHR9KTtcblx0fVxuXG5cdG9udW5sb2FkKCk6IHZvaWQge1xuXHRcdHRoaXMuc3luY1dzPy5kaXNjb25uZWN0KCk7XG5cdH1cblxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG5cdH1cblxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0fVxuXG5cdGFzeW5jIHBlcmZvcm1TeW5jKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGwgPSB0aGlzLmxhbmc7XG5cdFx0aWYgKHRoaXMuaXNTeW5jaW5nKSB7XG5cdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2Uuc3luY0luUHJvZ3Jlc3NcIiwgbCl9YCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLnNldHRpbmdzLnRva2VuKSB7XG5cdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2Uubm9Ub2tlblwiLCBsKX1gKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmlzU3luY2luZyA9IHRydWU7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN5bmNDbGlwcyh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncyk7XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuY2FjaGVkVXNlclBsYW4gPSByZXN1bHQudXNlclBsYW47XG5cdFx0XHRhd2FpdCB0aGlzLnNhdmVTZXR0aW5ncygpO1xuXG5cdFx0XHRpZiAocmVzdWx0LnN5bmNlZCA9PT0gMCAmJiByZXN1bHQuZmFpbGVkID09PSAwKSB7XG5cdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5ub05ld0NsaXBzXCIsIGwpfWApO1xuXHRcdFx0fSBlbHNlIGlmIChyZXN1bHQuZmFpbGVkID09PSAwKSB7XG5cdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dFJlcGxhY2UoXCJub3RpY2Uuc3luY2VkXCIsIGwsIHsgY291bnQ6IHJlc3VsdC5zeW5jZWQgfSl9YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXcgTm90aWNlKFxuXHRcdFx0XHRcdGBBSUNoYXRDbGlwOiAke3RSZXBsYWNlKFwibm90aWNlLnN5bmNQYXJ0aWFsXCIsIGwsIHsgc3luY2VkOiByZXN1bHQuc3luY2VkLCBmYWlsZWQ6IHJlc3VsdC5mYWlsZWQgfSl9YCxcblx0XHRcdFx0KTtcblx0XHRcdFx0Zm9yIChjb25zdCBlcnIgb2YgcmVzdWx0LmVycm9ycykge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJBSUNoYXRDbGlwIHN5bmMgZXJyb3I6XCIsIGVycik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zdCBtc2cgPSBlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSk7XG5cdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3RSZXBsYWNlKFwibm90aWNlLnN5bmNGYWlsZWRcIiwgbCwgeyBtc2cgfSl9YCk7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiQUlDaGF0Q2xpcCBzeW5jIGVycm9yOlwiLCBlKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0dGhpcy5pc1N5bmNpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGhhbmRsZUF1dGhDYWxsYmFjayh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5zZXR0aW5ncy50b2tlbiA9IHRva2VuO1xuXHRcdGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG5cdFx0Ly8gRGVsYXkgdG8gZW5zdXJlIE9ic2lkaWFuIGhhcyByZWdhaW5lZCBmb2N1cyBiZWZvcmUgc2hvd2luZyBVSSB1cGRhdGVzXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR2b2lkIChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGF3YWl0IHJlZ2lzdGVyRGV2aWNlKHRoaXMuc2V0dGluZ3MpO1xuXHRcdFx0XHR0aGlzLnNldHRpbmdUYWI/LmRpc3BsYXkoKTtcblx0XHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0KFwibm90aWNlLmNvbm5lY3RlZFwiLCB0aGlzLmxhbmcpfWApO1xuXHRcdFx0XHR2b2lkIHRoaXMucGVyZm9ybVN5bmMoKTtcblxuXHRcdFx0XHRpZiAoUGxhdGZvcm0uaXNEZXNrdG9wKSB7XG5cdFx0XHRcdFx0dGhpcy5jb25uZWN0V2ViU29ja2V0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pKCk7XG5cdFx0fSwgNTAwKTtcblx0fVxuXG5cdGNvbm5lY3RXZWJTb2NrZXQoKTogdm9pZCB7XG5cdFx0dGhpcy5zeW5jV3M/LmRpc2Nvbm5lY3QoKTtcblxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy50b2tlbiB8fCAhdGhpcy5zZXR0aW5ncy5kZXZpY2VJZCkgcmV0dXJuO1xuXG5cdFx0dGhpcy5zeW5jV3MgPSBuZXcgU3luY1dlYlNvY2tldCh7XG5cdFx0XHRhcGlCYXNlVXJsOiB0aGlzLnNldHRpbmdzLmFwaUJhc2VVcmwsXG5cdFx0XHR0b2tlbjogdGhpcy5zZXR0aW5ncy50b2tlbixcblx0XHRcdGRldmljZUlkOiB0aGlzLnNldHRpbmdzLmRldmljZUlkLFxuXHRcdFx0b25OZXdDbGlwOiAoY2xpcElkKSA9PiB7IHZvaWQgdGhpcy5oYW5kbGVQdXNoTm90aWZpY2F0aW9uKGNsaXBJZCk7IH0sXG5cdFx0XHRvblN0YXR1c0NoYW5nZTogKGNvbm5lY3RlZCkgPT4ge1xuXHRcdFx0XHR0aGlzLndzQ29ubmVjdGVkID0gY29ubmVjdGVkO1xuXHRcdFx0XHR0aGlzLnNldHRpbmdUYWI/LmRpc3BsYXkoKTtcblx0XHRcdH0sXG5cdFx0fSk7XG5cdFx0dGhpcy5zeW5jV3MuY29ubmVjdCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBoYW5kbGVQdXNoTm90aWZpY2F0aW9uKGNsaXBJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Muc3luY2VkQ2xpcElkcy5pbmNsdWRlcyhjbGlwSWQpKSByZXR1cm47XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qgc3luY2VkID0gYXdhaXQgc3luY1NpbmdsZUNsaXAoXG5cdFx0XHRcdHRoaXMuYXBwLFxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLFxuXHRcdFx0XHRjbGlwSWQsXG5cdFx0XHRcdCgpID0+IHRoaXMuc2F2ZVNldHRpbmdzKCksXG5cdFx0XHQpO1xuXHRcdFx0aWYgKHN5bmNlZCkge1xuXHRcdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2UubmV3Q2xpcFN5bmNlZFwiLCB0aGlzLmxhbmcpfWApO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJBSUNoYXRDbGlwOiBwdXNoIHN5bmMgZmFpbGVkXCIsIGUpO1xuXHRcdH1cblx0fVxuXG5cdHNldHVwRm9yZWdyb3VuZFN5bmMoKTogdm9pZCB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UpO1xuXG5cdFx0aWYgKCFQbGF0Zm9ybS5pc01vYmlsZSB8fCAhdGhpcy5zZXR0aW5ncy5zeW5jT25Gb3JlZ3JvdW5kKSByZXR1cm47XG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSk7XG5cdFx0dGhpcy5yZWdpc3RlcigoKSA9PlxuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UpLFxuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIG9uVmlzaWJpbGl0eUNoYW5nZSA9ICgpOiB2b2lkID0+IHtcblx0XHRpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcInZpc2libGVcIiAmJiB0aGlzLnNldHRpbmdzLnN5bmNPbkZvcmVncm91bmQpIHtcblx0XHRcdHZvaWQgdGhpcy5wZXJmb3JtU3luYygpO1xuXHRcdH1cblx0fTtcbn1cbiIsICIvKiogQ2VudHJhbGl6ZWQgQVBJIGNsaWVudCBcdTIwMTQgYWxsIHNlcnZlciBjb21tdW5pY2F0aW9uIGdvZXMgdGhyb3VnaCBoZXJlICovXG5pbXBvcnQgeyBQbGF0Zm9ybSwgcmVxdWVzdFVybCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBBSUNoYXRDbGlwU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBpR2V0KHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsIHBhdGg6IHN0cmluZykge1xuXHRjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0VXJsKHtcblx0XHR1cmw6IGAke3NldHRpbmdzLmFwaUJhc2VVcmx9JHtwYXRofWAsXG5cdFx0bWV0aG9kOiBcIkdFVFwiLFxuXHRcdGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3NldHRpbmdzLnRva2VufWAgfSxcblx0fSk7XG5cdHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhcGlQb3N0KHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsIHBhdGg6IHN0cmluZywgYm9keT86IHVua25vd24pIHtcblx0Y29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdFVybCh7XG5cdFx0dXJsOiBgJHtzZXR0aW5ncy5hcGlCYXNlVXJsfSR7cGF0aH1gLFxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0QXV0aG9yaXphdGlvbjogYEJlYXJlciAke3NldHRpbmdzLnRva2VufWAsXG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHR9LFxuXHRcdGJvZHk6IGJvZHkgIT0gbnVsbCA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuXHR9KTtcblx0cmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwaVB1dChzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzLCBwYXRoOiBzdHJpbmcsIGJvZHk6IHVua25vd24pIHtcblx0Y29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdFVybCh7XG5cdFx0dXJsOiBgJHtzZXR0aW5ncy5hcGlCYXNlVXJsfSR7cGF0aH1gLFxuXHRcdG1ldGhvZDogXCJQVVRcIixcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHRBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7c2V0dGluZ3MudG9rZW59YCxcblx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdH0sXG5cdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG5cdH0pO1xuXHRyZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBpUGF0Y2goc2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncywgcGF0aDogc3RyaW5nLCBib2R5PzogdW5rbm93bikge1xuXHRjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0VXJsKHtcblx0XHR1cmw6IGAke3NldHRpbmdzLmFwaUJhc2VVcmx9JHtwYXRofWAsXG5cdFx0bWV0aG9kOiBcIlBBVENIXCIsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0QXV0aG9yaXphdGlvbjogYEJlYXJlciAke3NldHRpbmdzLnRva2VufWAsXG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHR9LFxuXHRcdGJvZHk6IGJvZHkgIT0gbnVsbCA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuXHR9KTtcblx0cmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyRGV2aWNlKHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKCFzZXR0aW5ncy50b2tlbiB8fCAhc2V0dGluZ3MuZGV2aWNlSWQpIHJldHVybjtcblx0dHJ5IHtcblx0XHRhd2FpdCBhcGlQb3N0KHNldHRpbmdzLCBcIi9hcGkvZGV2aWNlc1wiLCB7XG5cdFx0XHRkZXZpY2VJZDogc2V0dGluZ3MuZGV2aWNlSWQsXG5cdFx0XHRkZXZpY2VOYW1lOiBQbGF0Zm9ybS5pc0Rlc2t0b3AgPyBcIk9ic2lkaWFuIERlc2t0b3BcIiA6IFwiT2JzaWRpYW4gTW9iaWxlXCIsXG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRjb25zb2xlLndhcm4oXCJBSUNoYXRDbGlwOiBkZXZpY2UgcmVnaXN0cmF0aW9uIGZhaWxlZFwiLCBlKTtcblx0fVxufVxuIiwgIi8qKiBJbnRlcm5hdGlvbmFsaXphdGlvbiBcdTIwMTQgVUkgc3RyaW5nIHRyYW5zbGF0aW9ucyBmb3IgZW4sIGphLCB6aCwga28gKi9cbmV4cG9ydCB0eXBlIFBsdWdpbkxhbmcgPSBcImVuXCIgfCBcImphXCIgfCBcInpoXCIgfCBcImtvXCI7XG5cbmNvbnN0IHRyYW5zbGF0aW9uczogUmVjb3JkPHN0cmluZywgUmVjb3JkPFBsdWdpbkxhbmcsIHN0cmluZz4+ID0ge1xuXHQvLyBCYXNpYyB0YWJcblx0XCJ0YWIuYmFzaWNcIjogeyBlbjogXCJCYXNpY1wiLCBqYTogXCJcdTU3RkFcdTY3MkNcIiwgemg6IFwiXHU1N0ZBXHU2NzJDXCIsIGtvOiBcIlx1QUUzMFx1QkNGOFwiIH0sXG5cdFwidGFiLnByb1wiOiB7IGVuOiBcIlByb1wiLCBqYTogXCJQcm9cIiwgemg6IFwiUHJvXCIsIGtvOiBcIlByb1wiIH0sXG5cdFwidGFiLmd1aWRlXCI6IHsgZW46IFwiR3VpZGVcIiwgamE6IFwiXHUzMEFDXHUzMEE0XHUzMEM5XCIsIHpoOiBcIlx1NjMwN1x1NTM1N1wiLCBrbzogXCJcdUFDMDBcdUM3NzRcdUI0RENcIiB9LFxuXG5cdC8vIEF1dGhlbnRpY2F0aW9uXG5cdFwiYXV0aC5uYW1lXCI6IHsgZW46IFwiQXV0aGVudGljYXRpb25cIiwgamE6IFwiXHU4QThEXHU4QTNDXCIsIHpoOiBcIlx1OEJBNFx1OEJDMVwiLCBrbzogXCJcdUM3NzhcdUM5OURcIiB9LFxuXHRcImF1dGguY29ubmVjdGVkXCI6IHsgZW46IFwiQ29ubmVjdGVkXCIsIGphOiBcIlx1NjNBNVx1N0Q5QVx1NkUwOFx1MzA3RlwiLCB6aDogXCJcdTVERjJcdThGREVcdTYzQTVcIiwga286IFwiXHVDNUYwXHVBQ0IwXHVCNDI4XCIgfSxcblx0XCJhdXRoLm5vdENvbm5lY3RlZFwiOiB7XG5cdFx0ZW46IFwiTm90IGNvbm5lY3RlZC4gU2lnbiBpbiB0byBzeW5jIHlvdXIgY2xpcHMuXCIsXG5cdFx0amE6IFwiXHU2NzJBXHU2M0E1XHU3RDlBXHUzMDAyXHUzMEI1XHUzMEE0XHUzMEYzXHUzMEE0XHUzMEYzXHUzMDU3XHUzMDY2XHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDkyXHU1NDBDXHU2NzFGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDg3XHUzMDQ2XHUzMDAyXCIsXG5cdFx0emg6IFwiXHU2NzJBXHU4RkRFXHU2M0E1XHUzMDAyXHU4QkY3XHU3NjdCXHU1RjU1XHU0RUU1XHU1NDBDXHU2QjY1XHU2MEE4XHU3Njg0XHU1MjZBXHU4RjkxXHUzMDAyXCIsXG5cdFx0a286IFwiXHVDNUYwXHVBQ0IwXHVCNDE4XHVDOUMwIFx1QzU0QVx1Qzc0Qy4gXHVCODVDXHVBREY4XHVDNzc4XHVENTU4XHVDNUVDIFx1RDA3NFx1QjlCRFx1Qzc0NCBcdUIzRDlcdUFFMzBcdUQ2NTRcdUQ1NThcdUMxMzhcdUM2OTQuXCIsXG5cdH0sXG5cdFwiYXV0aC5zaWduSW5cIjogeyBlbjogXCJTaWduIGluXCIsIGphOiBcIlx1MzBCNVx1MzBBNFx1MzBGM1x1MzBBNFx1MzBGM1wiLCB6aDogXCJcdTc2N0JcdTVGNTVcIiwga286IFwiXHVCODVDXHVBREY4XHVDNzc4XCIgfSxcblx0XCJhdXRoLnNpZ25PdXRcIjogeyBlbjogXCJTaWduIG91dFwiLCBqYTogXCJcdTMwQjVcdTMwQTRcdTMwRjNcdTMwQTJcdTMwQTZcdTMwQzhcIiwgemg6IFwiXHU5MDAwXHU1MUZBXCIsIGtvOiBcIlx1Qjg1Q1x1QURGOFx1QzU0NFx1QzZDM1wiIH0sXG5cblx0Ly8gUmVhbC10aW1lIHN5bmNcblx0XCJ3cy5uYW1lXCI6IHsgZW46IFwiUmVhbC10aW1lIHN5bmNcIiwgamE6IFwiXHUzMEVBXHUzMEEyXHUzMEVCXHUzMEJGXHUzMEE0XHUzMEUwXHU1NDBDXHU2NzFGXCIsIHpoOiBcIlx1NUI5RVx1NjVGNlx1NTQwQ1x1NkI2NVwiLCBrbzogXCJcdUMyRTRcdUMyRENcdUFDMDQgXHVCM0Q5XHVBRTMwXHVENjU0XCIgfSxcblx0XCJ3cy5jb25uZWN0ZWRcIjogeyBlbjogXCJTdGF0dXM6IENvbm5lY3RlZFwiLCBqYTogXCJcdTcyQjZcdTYxNEI6IFx1NjNBNVx1N0Q5QVx1NEUyRFwiLCB6aDogXCJcdTcyQjZcdTYwMDE6IFx1NURGMlx1OEZERVx1NjNBNVwiLCBrbzogXCJcdUMwQzFcdUQwREM6IFx1QzVGMFx1QUNCMFx1QjQyOFwiIH0sXG5cdFwid3MuZGlzY29ubmVjdGVkXCI6IHsgZW46IFwiU3RhdHVzOiBEaXNjb25uZWN0ZWRcIiwgamE6IFwiXHU3MkI2XHU2MTRCOiBcdTUyMDdcdTY1QURcIiwgemg6IFwiXHU3MkI2XHU2MDAxOiBcdTVERjJcdTY1QURcdTVGMDBcIiwga286IFwiXHVDMEMxXHVEMERDOiBcdUM1RjBcdUFDQjAgXHVCMDRBXHVBRTQwXCIgfSxcblxuXHQvLyBEZXZpY2Vcblx0XCJkZXZpY2UubmFtZVwiOiB7IGVuOiBcIlNldCBhcyBwcmltYXJ5IGRldmljZVwiLCBqYTogXCJcdTMwRDdcdTMwRTlcdTMwQTRcdTMwREVcdTMwRUFcdTMwQzdcdTMwRDBcdTMwQTRcdTMwQjlcdTMwNkJcdThBMkRcdTVCOUFcIiwgemg6IFwiXHU4QkJFXHU0RTNBXHU0RTNCXHU4QkJFXHU1OTA3XCIsIGtvOiBcIlx1QUUzMFx1QkNGOCBcdUFFMzBcdUFFMzBcdUI4NUMgXHVDMTI0XHVDODE1XCIgfSxcblx0XCJkZXZpY2UuZGVzY1wiOiB7XG5cdFx0ZW46IFwiVGhlIHByaW1hcnkgZGV2aWNlIGhhcyBoaWdoZXN0IHByaW9yaXR5IGZvciByZWFsLXRpbWUgcHVzaCBub3RpZmljYXRpb25zXCIsXG5cdFx0amE6IFwiXHUzMEQ3XHUzMEU5XHUzMEE0XHUzMERFXHUzMEVBXHUzMEM3XHUzMEQwXHUzMEE0XHUzMEI5XHUzMDZGXHUzMEVBXHUzMEEyXHUzMEVCXHUzMEJGXHUzMEE0XHUzMEUwXHUzMEQ3XHUzMEMzXHUzMEI3XHUzMEU1XHU5MDFBXHU3N0U1XHUzMDZFXHU1MTJBXHU1MTQ4XHU1RUE2XHUzMDRDXHU2NzAwXHUzMDgyXHU5QUQ4XHUzMDRGXHUzMDZBXHUzMDhBXHUzMDdFXHUzMDU5XCIsXG5cdFx0emg6IFwiXHU0RTNCXHU4QkJFXHU1OTA3XHU1NzI4XHU1QjlFXHU2NUY2XHU2M0E4XHU5MDAxXHU5MDFBXHU3N0U1XHU0RTJEXHU1MTc3XHU2NzA5XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XCIsXG5cdFx0a286IFwiXHVBRTMwXHVCQ0Y4IFx1QUUzMFx1QUUzMFx1QjI5NCBcdUMyRTRcdUMyRENcdUFDMDQgXHVENDc4XHVDMkRDIFx1QzU0Q1x1QjlCQ1x1QzVEMFx1QzExQyBcdUFDMDBcdUM3QTUgXHVCMTkyXHVDNzQwIFx1QzZCMFx1QzEyMFx1QzIxQ1x1QzcwNFx1Qjk3QyBcdUFDMTZcdUMyQjVcdUIyQzhcdUIyRTRcIixcblx0fSxcblx0XCJkZXZpY2UubWFrZVByaW1hcnlcIjogeyBlbjogXCJNYWtlIHByaW1hcnlcIiwgamE6IFwiXHUzMEQ3XHUzMEU5XHUzMEE0XHUzMERFXHUzMEVBXHUzMDZCXHU4QTJEXHU1QjlBXCIsIHpoOiBcIlx1OEJCRVx1NEUzQVx1NEUzQlx1OEJCRVx1NTkwN1wiLCBrbzogXCJcdUFFMzBcdUJDRjhcdUM3M0NcdUI4NUMgXHVDMTI0XHVDODE1XCIgfSxcblxuXHQvLyBJbmJveCBmb2xkZXJcblx0XCJpbmJveC5uYW1lXCI6IHsgZW46IFwiSW5ib3ggZm9sZGVyXCIsIGphOiBcIlx1NTNEN1x1NEZFMVx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFwiLCB6aDogXCJcdTY1MzZcdTRFRjZcdTdCQjFcdTY1ODdcdTRFRjZcdTU5MzlcIiwga286IFwiXHVCQzFCXHVDNzQwIFx1RDNCOFx1QzlDMFx1RDU2OCBcdUQzRjRcdUIzNTRcIiB9LFxuXHRcImluYm94LmRlc2NcIjoge1xuXHRcdGVuOiBcIlZhdWx0IGZvbGRlciB3aGVyZSBjbGlwcGVkIG5vdGVzIGFyZSBzYXZlZFwiLFxuXHRcdGphOiBcIlx1MzBBRlx1MzBFQVx1MzBDM1x1MzBEN1x1MzA1N1x1MzA1Rlx1MzBDRVx1MzBGQ1x1MzBDOFx1MzA2RVx1NEZERFx1NUI1OFx1NTE0OFx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFwiLFxuXHRcdHpoOiBcIlx1NEZERFx1NUI1OFx1NTI2QVx1OEY5MVx1N0IxNFx1OEJCMFx1NzY4NFx1NUU5M1x1NjU4N1x1NEVGNlx1NTkzOVwiLFxuXHRcdGtvOiBcIlx1RDA3NFx1QjlCRFx1QjQxQyBcdUIxNzhcdUQyQjhcdUFDMDAgXHVDODAwXHVDN0E1XHVCNDE4XHVCMjk0IFx1QkNGQ1x1RDJCOCBcdUQzRjRcdUIzNTRcIixcblx0fSxcblxuXHQvLyBBdXRvLXN5bmNcblx0XCJhdXRvU3luYy5uYW1lXCI6IHsgZW46IFwiQXV0by1zeW5jIG9uIGxvYWRcIiwgamE6IFwiXHU4RDc3XHU1MkQ1XHU2NjQyXHUzMDZCXHU4MUVBXHU1MkQ1XHU1NDBDXHU2NzFGXCIsIHpoOiBcIlx1NTQyRlx1NTJBOFx1NjVGNlx1ODFFQVx1NTJBOFx1NTQwQ1x1NkI2NVwiLCBrbzogXCJcdUMyRENcdUM3OTEgXHVDMkRDIFx1Qzc5MFx1QjNEOSBcdUIzRDlcdUFFMzBcdUQ2NTRcIiB9LFxuXHRcImF1dG9TeW5jLmRlc2NcIjoge1xuXHRcdGVuOiBcIkF1dG9tYXRpY2FsbHkgc3luYyBjbGlwcyB3aGVuIE9ic2lkaWFuIHN0YXJ0c1wiLFxuXHRcdGphOiBcIk9ic2lkaWFuIFx1OEQ3N1x1NTJENVx1NjY0Mlx1MzA2Qlx1MzBBRlx1MzBFQVx1MzBDM1x1MzBEN1x1MzA5Mlx1ODFFQVx1NTJENVx1NTQwQ1x1NjcxRlwiLFxuXHRcdHpoOiBcIk9ic2lkaWFuIFx1NTQyRlx1NTJBOFx1NjVGNlx1ODFFQVx1NTJBOFx1NTQwQ1x1NkI2NVx1NTI2QVx1OEY5MVwiLFxuXHRcdGtvOiBcIk9ic2lkaWFuIFx1QzJEQ1x1Qzc5MSBcdUMyREMgXHVDNzkwXHVCM0Q5XHVDNzNDXHVCODVDIFx1RDA3NFx1QjlCRCBcdUIzRDlcdUFFMzBcdUQ2NTRcIixcblx0fSxcblxuXHQvLyBUaW1lem9uZVxuXHRcInRpbWV6b25lLm5hbWVcIjogeyBlbjogXCJUaW1lem9uZVwiLCBqYTogXCJcdTMwQkZcdTMwQTRcdTMwRTBcdTMwQkVcdTMwRkNcdTMwRjNcIiwgemg6IFwiXHU2NUY2XHU1MzNBXCIsIGtvOiBcIlx1QzJEQ1x1QUMwNFx1QjMwMFwiIH0sXG5cdFwidGltZXpvbmUuZGVzY1wiOiB7XG5cdFx0ZW46IFwiVGltZXpvbmUgZm9yIGNsaXBwZWRfYXQgaW4gZnJvbnRtYXR0ZXIgKGF1dG8tZGV0ZWN0ZWQpXCIsXG5cdFx0amE6IFwiZnJvbnRtYXR0ZXIgXHUzMDZFIGNsaXBwZWRfYXQgXHUzMDZCXHU0RjdGXHU3NTI4XHUzMDU5XHUzMDhCXHUzMEJGXHUzMEE0XHUzMEUwXHUzMEJFXHUzMEZDXHUzMEYzXHVGRjA4XHU4MUVBXHU1MkQ1XHU2OTFDXHU1MUZBXHVGRjA5XCIsXG5cdFx0emg6IFwiZnJvbnRtYXR0ZXIgXHU0RTJEIGNsaXBwZWRfYXQgXHU3Njg0XHU2NUY2XHU1MzNBXHVGRjA4XHU4MUVBXHU1MkE4XHU2OEMwXHU2RDRCXHVGRjA5XCIsXG5cdFx0a286IFwiZnJvbnRtYXR0ZXJcdUM3NTggY2xpcHBlZF9hdFx1QzVEMCBcdUMwQUNcdUM2QTlcdUQ1NjAgXHVDMkRDXHVBQzA0XHVCMzAwIChcdUM3OTBcdUIzRDkgXHVBQzEwXHVDOUMwKVwiLFxuXHR9LFxuXG5cdC8vIEZpbGUgbmFtZSB0ZW1wbGF0ZVxuXHRcImZpbGVOYW1lLm5hbWVcIjogeyBlbjogXCJGaWxlIG5hbWUgdGVtcGxhdGVcIiwgamE6IFwiXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHU1NDBEXHUzMEM2XHUzMEYzXHUzMEQ3XHUzMEVDXHUzMEZDXHUzMEM4XCIsIHpoOiBcIlx1NjU4N1x1NEVGNlx1NTQwRFx1NkEyMVx1Njc3RlwiLCBrbzogXCJcdUQzMENcdUM3N0NcdUJBODUgXHVEMTVDXHVENTBDXHVCOUJGXCIgfSxcblx0XCJmaWxlTmFtZS5kZXNjXCI6IHtcblx0XHRlbjogXCJWYXJpYWJsZXM6IHt5eXl5fSB7TU19IHtkZH0ge2hofSB7bW19IHtzc30ge3NvdXJjZX0ge2NoYXRfdGl0bGV9IHt0aXRsZX0gKFBybylcXG5FeGFtcGxlOiB7eXl5eX0te01NfS17ZGR9LXt0aXRsZX0gXHUyMTkyIDIwMjYtMDMtMDgtVW5kZXJzdGFuZGluZy1SdXN0LUxpZmV0aW1lc1wiLFxuXHRcdGphOiBcIlx1NTkwOVx1NjU3MDoge3l5eXl9IHtNTX0ge2RkfSB7aGh9IHttbX0ge3NzfSB7c291cmNlfSB7Y2hhdF90aXRsZX0ge3RpdGxlfSAoUHJvKVxcblx1NEY4Qjoge3l5eXl9LXtNTX0te2RkfS17dGl0bGV9IFx1MjE5MiAyMDI2LTAzLTA4LVJ1c3RcdTMwNkVcdTMwRTlcdTMwQTRcdTMwRDVcdTMwQkZcdTMwQTRcdTMwRTBcdTg5RTNcdThBQUNcIixcblx0XHR6aDogXCJcdTUzRDhcdTkxQ0Y6IHt5eXl5fSB7TU19IHtkZH0ge2hofSB7bW19IHtzc30ge3NvdXJjZX0ge2NoYXRfdGl0bGV9IHt0aXRsZX0gKFBybylcXG5cdTc5M0FcdTRGOEI6IHt5eXl5fS17TU19LXtkZH0te3RpdGxlfSBcdTIxOTIgMjAyNi0wMy0wOC1cdTc0MDZcdTg5RTNSdXN0XHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXCIsXG5cdFx0a286IFwiXHVCQ0MwXHVDMjE4OiB7eXl5eX0ge01NfSB7ZGR9IHtoaH0ge21tfSB7c3N9IHtzb3VyY2V9IHtjaGF0X3RpdGxlfSB7dGl0bGV9IChQcm8pXFxuXHVDNjA4XHVDMkRDOiB7eXl5eX0te01NfS17ZGR9LXt0aXRsZX0gXHUyMTkyIDIwMjYtMDMtMDgtUnVzdC1cdUI3N0NcdUM3NzRcdUQ1MDRcdUQwQzBcdUM3ODQtXHVDNzc0XHVENTc0XCIsXG5cdH0sXG5cblx0Ly8gU3luYyBvbiBmb3JlZ3JvdW5kXG5cdFwic3luY09uRm9yZWdyb3VuZC5uYW1lXCI6IHsgZW46IFwiU3luYyBvbiBmb3JlZ3JvdW5kXCIsIGphOiBcIlx1MzBENVx1MzBBOVx1MzBBMlx1MzBCMFx1MzBFOVx1MzBBNlx1MzBGM1x1MzBDOVx1NUZBOVx1NUUzMFx1NjY0Mlx1MzA2Qlx1NTQwQ1x1NjcxRlwiLCB6aDogXCJcdTUyNERcdTUzRjBcdTYwNjJcdTU5MERcdTY1RjZcdTU0MENcdTZCNjVcIiwga286IFwiXHVEM0VDXHVBREY4XHVCNzdDXHVDNkI0XHVCNERDIFx1QkNGNVx1QURDMCBcdUMyREMgXHVCM0Q5XHVBRTMwXHVENjU0XCIgfSxcblx0XCJzeW5jT25Gb3JlZ3JvdW5kLmRlc2NcIjoge1xuXHRcdGVuOiBcIkF1dG9tYXRpY2FsbHkgc3luYyBjbGlwcyB3aGVuIHJldHVybmluZyB0byB0aGUgYXBwXCIsXG5cdFx0amE6IFwiXHUzMEEyXHUzMEQ3XHUzMEVBXHUzMDZCXHU2MjNCXHUzMDYzXHUzMDVGXHU2NjQyXHUzMDZCXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDkyXHU4MUVBXHU1MkQ1XHU1NDBDXHU2NzFGXCIsXG5cdFx0emg6IFwiXHU4RkQ0XHU1NkRFXHU1RTk0XHU3NTI4XHU2NUY2XHU4MUVBXHU1MkE4XHU1NDBDXHU2QjY1XHU1MjZBXHU4RjkxXCIsXG5cdFx0a286IFwiXHVDNTcxXHVDNzNDXHVCODVDIFx1QjNDQ1x1QzU0NFx1QzYyQyBcdUI1NEMgXHVDNzkwXHVCM0Q5XHVDNzNDXHVCODVDIFx1RDA3NFx1QjlCRCBcdUIzRDlcdUFFMzBcdUQ2NTRcIixcblx0fSxcblxuXHQvLyBMYW5ndWFnZSBzZXR0aW5nXG5cdFwibGFuZy5uYW1lXCI6IHsgZW46IFwiUGx1Z2luIGxhbmd1YWdlXCIsIGphOiBcIlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1OEEwMFx1OEE5RVwiLCB6aDogXCJcdTYzRDJcdTRFRjZcdThCRURcdThBMDBcIiwga286IFwiXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QzVCOFx1QzVCNFwiIH0sXG5cdFwibGFuZy5kZXNjXCI6IHtcblx0XHRlbjogXCJMYW5ndWFnZSBmb3IgcGx1Z2luIFVJXCIsXG5cdFx0amE6IFwiXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzVUlcdTMwNkVcdTg4NjhcdTc5M0FcdThBMDBcdThBOUVcIixcblx0XHR6aDogXCJcdTYzRDJcdTRFRjZcdTc1NENcdTk3NjJcdThCRURcdThBMDBcIixcblx0XHRrbzogXCJcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggVUkgXHVDNUI4XHVDNUI0XCIsXG5cdH0sXG5cdFwibGFuZy5hdXRvXCI6IHsgZW46IFwiQXV0b1wiLCBqYTogXCJcdTgxRUFcdTUyRDVcIiwgemg6IFwiXHU4MUVBXHU1MkE4XCIsIGtvOiBcIlx1Qzc5MFx1QjNEOVwiIH0sXG5cblx0Ly8gUHJvIHRhYiAtIGNvbXBhcmlzb24gdGFibGVcblx0XCJwcm8uZmVhdHVyZS5jbGlwVG9PYnNpZGlhblwiOiB7XG5cdFx0ZW46IFwiQ2xpcCBBSSByZXNwb25zZXMgdG8gT2JzaWRpYW5cIixcblx0XHRqYTogXCJBSVx1NTZERVx1N0I1NFx1MzA5Mk9ic2lkaWFuXHUzMDZCXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XCIsXG5cdFx0emg6IFwiXHU1QzA2QUlcdTU2REVcdTdCNTRcdTUyNkFcdThGOTFcdTUyMzBPYnNpZGlhblwiLFxuXHRcdGtvOiBcIkFJIFx1Qzc1MVx1QjJGNVx1Qzc0NCBPYnNpZGlhblx1QzVEMCBcdUQwNzRcdUI5QkRcIixcblx0fSxcblx0XCJwcm8uZmVhdHVyZS51bmxpbWl0ZWRDbGlwc1wiOiB7IGVuOiBcIlVubGltaXRlZCBjbGlwc1wiLCBqYTogXCJcdTcxMjFcdTUyMzZcdTk2NTBcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcIiwgemg6IFwiXHU2NUUwXHU5NjUwXHU1MjZBXHU4RjkxXCIsIGtvOiBcIlx1QkIzNFx1QzgxQ1x1RDU1QyBcdUQwNzRcdUI5QkRcIiB9LFxuXHRcInByby5mZWF0dXJlLmF1dG9UYWdzXCI6IHtcblx0XHRlbjogXCJBdXRvIHRhZ3MgJiB0aXRsZSBnZW5lcmF0aW9uXCIsXG5cdFx0amE6IFwiXHUzMEJGXHUzMEIwXHUzMEZCXHUzMEJGXHUzMEE0XHUzMEM4XHUzMEVCXHU4MUVBXHU1MkQ1XHU3NTFGXHU2MjEwXCIsXG5cdFx0emg6IFwiXHU4MUVBXHU1MkE4XHU2ODA3XHU3QjdFXHU1NDhDXHU2ODA3XHU5ODk4XHU3NTFGXHU2MjEwXCIsXG5cdFx0a286IFwiXHVDNzkwXHVCM0Q5IFx1RDBEQ1x1QURGOCBcdUJDMEYgXHVDODFDXHVCQUE5IFx1QzBERFx1QzEzMVwiLFxuXHR9LFxuXHRcInByby5mZWF0dXJlLnN1bW1hcnlcIjoge1xuXHRcdGVuOiBcIlN1bW1hcnkgaW4gZnJvbnRtYXR0ZXJcIixcblx0XHRqYTogXCJmcm9udG1hdHRlclx1MzA2Qlx1MzBCNVx1MzBERVx1MzBFQVx1MzBGQ1wiLFxuXHRcdHpoOiBcImZyb250bWF0dGVyXHU0RTJEXHU3Njg0XHU2NDU4XHU4OTgxXCIsXG5cdFx0a286IFwiZnJvbnRtYXR0ZXJcdUM1RDAgXHVDNjk0XHVDNTdEXCIsXG5cdH0sXG5cdFwicHJvLmZlYXR1cmUuc21hcnRGb2xkZXJcIjoge1xuXHRcdGVuOiBcIlNtYXJ0IGZvbGRlciBwbGFjZW1lbnRcIixcblx0XHRqYTogXCJcdTMwQjlcdTMwREVcdTMwRkNcdTMwQzhcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTYzMkZcdTMwOEFcdTUyMDZcdTMwNTFcIixcblx0XHR6aDogXCJcdTY2N0FcdTgwRkRcdTY1ODdcdTRFRjZcdTU5MzlcdTUyMDZcdTkxNERcIixcblx0XHRrbzogXCJcdUMyQTRcdUI5QzhcdUQyQjggXHVEM0Y0XHVCMzU0IFx1QkMzMFx1Q0U1OFwiLFxuXHR9LFxuXHRcInByby5mZWF0dXJlLndlZWtseURpZ2VzdFwiOiB7IGVuOiBcIldlZWtseSBkaWdlc3RcIiwgamE6IFwiXHU5MDMxXHU5NTkzXHUzMEMwXHUzMEE0XHUzMEI4XHUzMEE3XHUzMEI5XHUzMEM4XCIsIHpoOiBcIlx1NkJDRlx1NTQ2OFx1NjQ1OFx1ODk4MVwiLCBrbzogXCJcdUM4RkNcdUFDMDQgXHVCMkU0XHVDNzc0XHVDODFDXHVDMkE0XHVEMkI4XCIgfSxcblx0XCJwcm8uY3RhLnVwZ3JhZGVcIjoge1xuXHRcdGVuOiBcIlVwZ3JhZGUgdG8gUHJvIFx1MjE5MlwiLFxuXHRcdGphOiBcIlByb1x1MzBEN1x1MzBFOVx1MzBGM1x1MzA2Qlx1MzBBMlx1MzBDM1x1MzBEN1x1MzBCMFx1MzBFQ1x1MzBGQ1x1MzBDOSBcdTIxOTJcIixcblx0XHR6aDogXCJcdTUzNDdcdTdFQTdcdTUyMzBQcm8gXHUyMTkyXCIsXG5cdFx0a286IFwiUHJvXHVCODVDIFx1QzVDNVx1QURGOFx1QjgwOFx1Qzc3NFx1QjREQyBcdTIxOTJcIixcblx0fSxcblxuXHQvLyBQcm8gdGFiIC0gZm9sZGVyIHNldHRpbmdzXG5cdFwicHJvLmZvbGRlckRlc2NcIjoge1xuXHRcdGVuOiBcIkFJQ2hhdENsaXAgZGV0ZWN0cyBtYXJrZXIgZmlsZXMgaW4geW91ciBmb2xkZXJzIGFuZCB1c2VzIHRoZW0gZm9yIGF1dG8tY2xhc3NpZmljYXRpb24uIE9ubHkgZm9sZGVycyB3aXRoIGEgbWFya2VyIGZpbGUgYXJlIGVsaWdpYmxlIFx1MjAxNCBmb2xkZXJzIHdpdGhvdXQgb25lIGFyZSBuZXZlciB1c2VkLiBZb3UgY2FuIGNob29zZSBhbnkgZmlsZW5hbWUgKGRlZmF1bHQ6IFJFQURNRSksIGJ1dCBpdCBtdXN0IGJlIHRoZSBzYW1lIGFjcm9zcyB5b3VyIGVudGlyZSB2YXVsdC4gVGhlIGNvbnRlbnQgaXMgZnJlZWZvcm0gXHUyMDE0IGRlc2NyaWJpbmcgdGhlIGZvbGRlcidzIHB1cnBvc2UgaW1wcm92ZXMgYWNjdXJhY3kuXCIsXG5cdFx0amE6IFwiXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDkyXHU2OTFDXHU3N0U1XHUzMDU3XHUzMDY2XHU4MUVBXHU1MkQ1XHU1MjA2XHU5ODVFXHUzMDZCXHU0RjdGXHUzMDQ0XHUzMDdFXHUzMDU5XHUzMDAyXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDRDXHUzMDQyXHUzMDhCXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDYwXHUzMDUxXHUzMDRDXHU2MzJGXHUzMDhBXHU1MjA2XHUzMDUxXHU1MTQ4XHUzMDZCXHUzMDZBXHUzMDhBXHUzMDAxXHUzMDZBXHUzMDQ0XHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDZCXHUzMDZGXHU2MzJGXHUzMDhBXHU1MjA2XHUzMDUxXHUzMDg5XHUzMDhDXHUzMDdFXHUzMDVCXHUzMDkzXHUzMDAyXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHU1NDBEXHUzMDZGXHU4MUVBXHU3NTMxXHUzMDZCXHU2QzdBXHUzMDgxXHUzMDg5XHUzMDhDXHUzMDdFXHUzMDU5XHUzMDRDXHVGRjA4XHUzMEM3XHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEM4OiBSRUFETUVcdUZGMDlcdTMwMDFWYXVsdFx1NTE2OFx1NEY1M1x1MzA2N1x1N0Q3MVx1NEUwMFx1MzA1OVx1MzA4Qlx1NUZDNVx1ODk4MVx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMlx1NTE4NVx1NUJCOVx1MzA2Rlx1ODFFQVx1NzUzMVx1MzA2N1x1MzA1OVx1MzA0Q1x1MzAwMVx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzA2RVx1NzUyOFx1OTAxNFx1MzA5Mlx1NjZGOFx1MzA0Rlx1MzA2OFx1NTIwNlx1OTg1RVx1N0NCRVx1NUVBNlx1MzA0Q1x1NEUwQVx1MzA0Q1x1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMlwiLFxuXHRcdHpoOiBcIkFJQ2hhdENsaXAgXHU2OEMwXHU2RDRCXHU2NTg3XHU0RUY2XHU1OTM5XHU0RTJEXHU3Njg0XHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2XHU1RTc2XHU3NTI4XHU0RThFXHU4MUVBXHU1MkE4XHU1MjA2XHU3QzdCXHUzMDAyXHU1M0VBXHU2NzA5XHU1MzA1XHU1NDJCXHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU2MjREXHU0RjFBXHU4OEFCXHU0RjdGXHU3NTI4XHUyMDE0XHUyMDE0XHU2Q0ExXHU2NzA5XHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU0RTBEXHU0RjFBXHU4OEFCXHU1MjA2XHU5MTREXHUzMDAyXHU2NTg3XHU0RUY2XHU1NDBEXHU1M0VGXHU0RUU1XHU4MUVBXHU3NTMxXHU5MDA5XHU2MkU5XHVGRjA4XHU5RUQ4XHU4QkE0OiBSRUFETUVcdUZGMDlcdUZGMENcdTRGNDZcdTVGQzVcdTk4N0JcdTU3MjhcdTY1NzRcdTRFMkFcdTVFOTNcdTRFMkRcdTdFREZcdTRFMDBcdTMwMDJcdTUxODVcdTVCQjlcdTUzRUZcdTRFRTVcdTY2MkZcdTRFRkJcdTYxMEZcdTY1ODdcdTY3MkNcdTIwMTRcdTIwMTRcdTYzQ0ZcdThGRjBcdTY1ODdcdTRFRjZcdTU5MzlcdTc1MjhcdTkwMTRcdTUzRUZcdTRFRTVcdTYzRDBcdTlBRDhcdTUxQzZcdTc4NkVcdTVFQTZcdTMwMDJcIixcblx0XHRrbzogXCJBSUNoYXRDbGlwXHVDNzQwIFx1RDNGNFx1QjM1NFx1Qzc1OCBcdUI5QzhcdUNFRTQgXHVEMzBDXHVDNzdDXHVDNzQ0IFx1QUMxMFx1QzlDMFx1RDU1OFx1QzVFQyBcdUM3OTBcdUIzRDkgXHVCRDg0XHVCOTU4XHVDNUQwIFx1QzBBQ1x1QzZBOVx1RDU2OVx1QjJDOFx1QjJFNC4gXHVCOUM4XHVDRUU0IFx1RDMwQ1x1Qzc3Q1x1Qzc3NCBcdUM3ODhcdUIyOTQgXHVEM0Y0XHVCMzU0XHVCOUNDIFx1QjMwMFx1QzBDMVx1Qzc3NCBcdUI0MThcdUJBNzAsIFx1QzVDNlx1QjI5NCBcdUQzRjRcdUIzNTRcdUM1RDBcdUIyOTQgXHVCQzMwXHVDRTU4XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNC4gXHVEMzBDXHVDNzdDXHVCQTg1XHVDNzQwIFx1Qzc5MFx1QzcyMFx1Qjg2RFx1QUM4QyBcdUM4MTVcdUQ1NjAgXHVDMjE4IFx1Qzc4OFx1QzlDMFx1QjlDQyhcdUFFMzBcdUJDRjg6IFJFQURNRSksIFx1QkNGQ1x1RDJCOCBcdUM4MDRcdUNDQjRcdUM1RDBcdUMxMUMgXHVEMUI1XHVDNzdDXHVENTc0XHVDNTdDIFx1RDU2OVx1QjJDOFx1QjJFNC4gXHVCMEI0XHVDNkE5XHVDNzQwIFx1Qzc5MFx1QzcyMFx1Qjg2RFx1QzlDMFx1QjlDQywgXHVEM0Y0XHVCMzU0XHVDNzU4IFx1QzZBOVx1QjNDNFx1Qjk3QyBcdUM4MDFcdUM3M0NcdUJBNzQgXHVCRDg0XHVCOTU4IFx1QzgxNVx1RDY1NVx1QjNDNFx1QUMwMCBcdUQ1QTVcdUMwQzFcdUI0MjlcdUIyQzhcdUIyRTQuXCIsXG5cdH0sXG5cdFwicHJvLmZvbGRlckRvY3NMaW5rXCI6IHtcblx0XHRlbjogXCJMZWFybiBtb3JlIGFib3V0IG1hcmtlciBmaWxlcyBcdTIxOTJcIixcblx0XHRqYTogXCJcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNkJcdTMwNjRcdTMwNDRcdTMwNjZcdThBNzNcdTMwNTdcdTMwNEYgXHUyMTkyXCIsXG5cdFx0emg6IFwiXHU0RTg2XHU4OUUzXHU2NkY0XHU1OTFBXHU1MTczXHU0RThFXHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2IFx1MjE5MlwiLFxuXHRcdGtvOiBcIlx1QjlDOFx1Q0VFNCBcdUQzMENcdUM3N0NcdUM1RDAgXHVCMzAwXHVENTc0IFx1Qzc5MFx1QzEzOFx1RDc4OCBcdTIxOTJcIixcblx0fSxcblx0XCJwcm8uYXV0b1NjYW4ubmFtZVwiOiB7XG5cdFx0ZW46IFwiQXV0by1zY2FuIGZvbGRlcnMgb24gc3luY1wiLFxuXHRcdGphOiBcIlx1NTQwQ1x1NjcxRlx1NjY0Mlx1MzA2Qlx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzA5Mlx1ODFFQVx1NTJENVx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1wiLFxuXHRcdHpoOiBcIlx1NTQwQ1x1NkI2NVx1NjVGNlx1ODFFQVx1NTJBOFx1NjI2Qlx1NjNDRlx1NjU4N1x1NEVGNlx1NTkzOVwiLFxuXHRcdGtvOiBcIlx1QjNEOVx1QUUzMFx1RDY1NCBcdUMyREMgXHVEM0Y0XHVCMzU0IFx1Qzc5MFx1QjNEOSBcdUMyQTRcdUNFOTRcIixcblx0fSxcblx0XCJwcm8uYXV0b1NjYW4uZGVzY1wiOiB7XG5cdFx0ZW46IFwiQXV0b21hdGljYWxseSBzY2FuIGFuZCB1cGxvYWQgZm9sZGVyIHN0cnVjdHVyZSB3aGVuIHN5bmNpbmcgY2xpcHNcIixcblx0XHRqYTogXCJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTU0MENcdTY3MUZcdTY2NDJcdTMwNkJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTY5Q0JcdTkwMjBcdTMwOTJcdTgxRUFcdTUyRDVcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdUZGMDZcdTMwQTJcdTMwQzNcdTMwRDdcdTMwRURcdTMwRkNcdTMwQzlcIixcblx0XHR6aDogXCJcdTU0MENcdTZCNjVcdTUyNkFcdThGOTFcdTY1RjZcdTgxRUFcdTUyQThcdTYyNkJcdTYzQ0ZcdTVFNzZcdTRFMEFcdTRGMjBcdTY1ODdcdTRFRjZcdTU5MzlcdTdFRDNcdTY3ODRcIixcblx0XHRrbzogXCJcdUQwNzRcdUI5QkQgXHVCM0Q5XHVBRTMwXHVENjU0IFx1QzJEQyBcdUQzRjRcdUIzNTQgXHVBRDZDXHVDODcwIFx1Qzc5MFx1QjNEOSBcdUMyQTRcdUNFOTQgXHVCQzBGIFx1QzVDNVx1Qjg1Q1x1QjREQ1wiLFxuXHR9LFxuXHRcInByby5zY2FuUm9vdC5uYW1lXCI6IHsgZW46IFwiRm9sZGVyIHNjYW4gcm9vdFwiLCBqYTogXCJcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTMwRUJcdTMwRkNcdTMwQzhcIiwgemg6IFwiXHU2MjZCXHU2M0NGXHU2ODM5XHU3NkVFXHU1RjU1XCIsIGtvOiBcIlx1QzJBNFx1Q0U5NCBcdUI4RThcdUQyQjhcIiB9LFxuXHRcInByby5zY2FuUm9vdC5kZXNjXCI6IHtcblx0XHRlbjogXCJSb290IGZvbGRlciB0byBzY2FuIGZvciBtYXJrZXIgZmlsZXMuIExlYXZlIGVtcHR5IHRvIHNjYW4gdGhlIGVudGlyZSB2YXVsdC5cIixcblx0XHRqYTogXCJcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwOTJcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTMwNTlcdTMwOEJcdTMwRUJcdTMwRkNcdTMwQzhcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwMDJcdTdBN0FcdTZCMDRcdTMwNjdWYXVsdFx1NTE2OFx1NEY1M1x1MzA5Mlx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1x1MzAwMlwiLFxuXHRcdHpoOiBcIlx1NjI2Qlx1NjNDRlx1NjgwN1x1OEJCMFx1NjU4N1x1NEVGNlx1NzY4NFx1NjgzOVx1NjU4N1x1NEVGNlx1NTkzOVx1MzAwMlx1NzU1OVx1N0E3QVx1NEVFNVx1NjI2Qlx1NjNDRlx1NjU3NFx1NEUyQVx1NUU5M1x1MzAwMlwiLFxuXHRcdGtvOiBcIlx1QjlDOFx1Q0VFNCBcdUQzMENcdUM3N0NcdUM3NDQgXHVDMkE0XHVDRTk0XHVENTYwIFx1QjhFOFx1RDJCOCBcdUQzRjRcdUIzNTQuIFx1QkU0NFx1QzZDQ1x1QjQ1MFx1QkE3NCBcdUM4MDRcdUNDQjQgXHVCQ0ZDXHVEMkI4XHVCOTdDIFx1QzJBNFx1Q0U5NFx1RDU2OVx1QjJDOFx1QjJFNC5cIixcblx0fSxcblx0XCJwcm8uc2NhblJvb3QucGxhY2Vob2xkZXJcIjogeyBlbjogXCIoZW50aXJlIHZhdWx0KVwiLCBqYTogXCJcdUZGMDhWYXVsdFx1NTE2OFx1NEY1M1x1RkYwOVwiLCB6aDogXCJcdUZGMDhcdTY1NzRcdTRFMkFcdTVFOTNcdUZGMDlcIiwga286IFwiKFx1QzgwNFx1Q0NCNCBcdUJDRkNcdUQyQjgpXCIgfSxcblx0XCJwcm8ubWFya2VyLm5hbWVcIjogeyBlbjogXCJNYXJrZXIgZmlsZW5hbWVcIiwgamE6IFwiXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHU1NDBEXCIsIHpoOiBcIlx1NjgwN1x1OEJCMFx1NjU4N1x1NEVGNlx1NTQwRFwiLCBrbzogXCJcdUI5QzhcdUNFRTQgXHVEMzBDXHVDNzdDXHVCQTg1XCIgfSxcblx0XCJwcm8ubWFya2VyLmRlc2NcIjoge1xuXHRcdGVuOiBcIkZpbGVuYW1lIHN0ZW0gdG8gZGV0ZWN0IGFzIGZvbGRlciBkZXNjcmlwdGlvbiAoZS5nLiBSRUFETUUgXHUyMTkyIFJFQURNRS5tZClcIixcblx0XHRqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdThBQUNcdTY2MEVcdTMwNjhcdTMwNTdcdTMwNjZcdTY5MUNcdTUxRkFcdTMwNTlcdTMwOEJcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTU0MERcdUZGMDhcdTRGOEI6IFJFQURNRSBcdTIxOTIgUkVBRE1FLm1kXHVGRjA5XCIsXG5cdFx0emg6IFwiXHU0RjVDXHU0RTNBXHU2NTg3XHU0RUY2XHU1OTM5XHU2M0NGXHU4RkYwXHU2OEMwXHU2RDRCXHU3Njg0XHU2NTg3XHU0RUY2XHU1NDBEXHVGRjA4XHU1OTgyIFJFQURNRSBcdTIxOTIgUkVBRE1FLm1kXHVGRjA5XCIsXG5cdFx0a286IFwiXHVEM0Y0XHVCMzU0IFx1QzEyNFx1QkE4NVx1QzczQ1x1Qjg1QyBcdUFDMTBcdUM5QzBcdUQ1NjAgXHVEMzBDXHVDNzdDXHVCQTg1IChcdUM2MDg6IFJFQURNRSBcdTIxOTIgUkVBRE1FLm1kKVwiLFxuXHR9LFxuXHRcInByby5zY2FuTm93Lm5hbWVcIjogeyBlbjogXCJTY2FuIGZvbGRlcnMgbm93XCIsIGphOiBcIlx1NEVDQVx1MzA1OVx1MzA1MFx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1wiLCB6aDogXCJcdTdBQ0JcdTUzNzNcdTYyNkJcdTYzQ0ZcIiwga286IFwiXHVDOUMwXHVBRTA4IFx1QzJBNFx1Q0U5NFwiIH0sXG5cdFwicHJvLnNjYW5Ob3cuZGVzY1wiOiB7XG5cdFx0ZW46IFwiU2NhbiBtYXJrZXIgZmlsZXMgYW5kIHVwbG9hZCBmb2xkZXIgc3RydWN0dXJlIHRvIHRoZSBzZXJ2ZXJcIixcblx0XHRqYTogXCJcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwOTJcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTMwNTdcdTMwNjZcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTY5Q0JcdTkwMjBcdTMwOTJcdTMwQjVcdTMwRkNcdTMwRDBcdTMwRkNcdTMwNkJcdTMwQTJcdTMwQzNcdTMwRDdcdTMwRURcdTMwRkNcdTMwQzlcIixcblx0XHR6aDogXCJcdTYyNkJcdTYzQ0ZcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcdTVFNzZcdTVDMDZcdTY1ODdcdTRFRjZcdTU5MzlcdTdFRDNcdTY3ODRcdTRFMEFcdTRGMjBcdTUyMzBcdTY3MERcdTUyQTFcdTU2NjhcIixcblx0XHRrbzogXCJcdUI5QzhcdUNFRTQgXHVEMzBDXHVDNzdDXHVDNzQ0IFx1QzJBNFx1Q0U5NFx1RDU1OFx1QUNFMCBcdUQzRjRcdUIzNTQgXHVBRDZDXHVDODcwXHVCOTdDIFx1QzExQ1x1QkM4NFx1QzVEMCBcdUM1QzVcdUI4NUNcdUI0RENcIixcblx0fSxcblx0XCJwcm8uc2Nhbk5vdy5idXR0b25cIjogeyBlbjogXCJTY2FuICYgdXBsb2FkXCIsIGphOiBcIlx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1x1RkYwNlx1MzBBMlx1MzBDM1x1MzBEN1x1MzBFRFx1MzBGQ1x1MzBDOVwiLCB6aDogXCJcdTYyNkJcdTYzQ0ZcdTVFNzZcdTRFMEFcdTRGMjBcIiwga286IFwiXHVDMkE0XHVDRTk0IFx1QkMwRiBcdUM1QzVcdUI4NUNcdUI0RENcIiB9LFxuXHRcInByby5yZWFkbWUubmFtZVwiOiB7IGVuOiBcIk1hcmtlciBmaWxlIHRlbXBsYXRlXCIsIGphOiBcIlx1MzBERVx1MzBGQ1x1MzBBQlx1MzBGQ1x1MzBENVx1MzBBMVx1MzBBNFx1MzBFQlx1MzBDNlx1MzBGM1x1MzBEN1x1MzBFQ1x1MzBGQ1x1MzBDOFwiLCB6aDogXCJcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcdTZBMjFcdTY3N0ZcIiwga286IFwiXHVCOUM4XHVDRUU0IFx1RDMwQ1x1Qzc3QyBcdUQxNUNcdUQ1MENcdUI5QkZcIiB9LFxuXHRcInByby5yZWFkbWUuZGVzY1wiOiB7XG5cdFx0ZW46IFwiQ29weSBhIHN0YXJ0ZXIgdGVtcGxhdGUgZm9yIGZvbGRlciBtYXJrZXIgZmlsZXNcIixcblx0XHRqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNkVcdTMwQzZcdTMwRjNcdTMwRDdcdTMwRUNcdTMwRkNcdTMwQzhcdTMwOTJcdTMwQjNcdTMwRDRcdTMwRkNcIixcblx0XHR6aDogXCJcdTU5MERcdTUyMzZcdTY1ODdcdTRFRjZcdTU5MzlcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcdTc2ODRcdTZBMjFcdTY3N0ZcIixcblx0XHRrbzogXCJcdUQzRjRcdUIzNTQgXHVCOUM4XHVDRUU0IFx1RDMwQ1x1Qzc3Q1x1QzZBOSBcdUQxNUNcdUQ1MENcdUI5QkYgXHVCQ0Y1XHVDMEFDXCIsXG5cdH0sXG5cdFwicHJvLnJlYWRtZS5idXR0b25cIjogeyBlbjogXCJDb3B5IHRvIGNsaXBib2FyZFwiLCBqYTogXCJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwRENcdTMwRkNcdTMwQzlcdTMwNkJcdTMwQjNcdTMwRDRcdTMwRkNcIiwgemg6IFwiXHU1OTBEXHU1MjM2XHU1MjMwXHU1MjZBXHU4RDM0XHU2NzdGXCIsIGtvOiBcIlx1RDA3NFx1QjlCRFx1QkNGNFx1QjREQ1x1QzVEMCBcdUJDRjVcdUMwQUNcIiB9LFxuXG5cdC8vIEFJIEN1c3RvbWl6YXRpb25cblx0XCJwcm8uYWlDdXN0b21pemF0aW9uXCI6IHsgZW46IFwiQUkgY3VzdG9taXphdGlvblwiLCBqYTogXCJBSVx1MzBBQlx1MzBCOVx1MzBCRlx1MzBERVx1MzBBNFx1MzBCQVwiLCB6aDogXCJBSVx1ODFFQVx1NUI5QVx1NEU0OVwiLCBrbzogXCJBSSBcdUNFRTRcdUMyQTRcdUQxMzBcdUI5QzhcdUM3NzRcdUM5RDVcIiB9LFxuXHRcInByby50aXRsZUxhbmcubmFtZVwiOiB7IGVuOiBcIlRpdGxlIGxhbmd1YWdlXCIsIGphOiBcIlx1MzBCRlx1MzBBNFx1MzBDOFx1MzBFQlx1OEEwMFx1OEE5RVwiLCB6aDogXCJcdTY4MDdcdTk4OThcdThCRURcdThBMDBcIiwga286IFwiXHVDODFDXHVCQUE5IFx1QzVCOFx1QzVCNFwiIH0sXG5cdFwicHJvLnRpdGxlTGFuZy5kZXNjXCI6IHtcblx0XHRlbjogXCJMYW5ndWFnZSBmb3IgQUktZ2VuZXJhdGVkIHRpdGxlcyAoc2F2ZWQgdG8gc2VydmVyKVwiLFxuXHRcdGphOiBcIkFJXHU3NTFGXHU2MjEwXHUzMEJGXHUzMEE0XHUzMEM4XHUzMEVCXHUzMDZFXHU4QTAwXHU4QTlFXHVGRjA4XHUzMEI1XHUzMEZDXHUzMEQwXHUzMEZDXHUzMDZCXHU0RkREXHU1QjU4XHVGRjA5XCIsXG5cdFx0emg6IFwiQUlcdTc1MUZcdTYyMTBcdTY4MDdcdTk4OThcdTc2ODRcdThCRURcdThBMDBcdUZGMDhcdTRGRERcdTVCNThcdTUyMzBcdTY3MERcdTUyQTFcdTU2NjhcdUZGMDlcIixcblx0XHRrbzogXCJBSSBcdUMwRERcdUMxMzEgXHVDODFDXHVCQUE5XHVDNzU4IFx1QzVCOFx1QzVCNCAoXHVDMTFDXHVCQzg0XHVDNUQwIFx1QzgwMFx1QzdBNSlcIixcblx0fSxcblx0XCJwcm8udGFnUnVsZS5uYW1lXCI6IHsgZW46IFwiVGFnIHJ1bGUgZmlsZVwiLCBqYTogXCJcdTMwQkZcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRUJcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcIiwgemg6IFwiXHU2ODA3XHU3QjdFXHU4OUM0XHU1MjE5XHU2NTg3XHU0RUY2XCIsIGtvOiBcIlx1RDBEQ1x1QURGOCBcdUFERENcdUNFNTkgXHVEMzBDXHVDNzdDXCIgfSxcblx0XCJwcm8udGFnUnVsZS5kZXNjXCI6IHtcblx0XHRlbjogXCJQYXRoIHRvIGEgbWFya2Rvd24gZmlsZSB3aXRoIGN1c3RvbSB0YWcgcnVsZXMgKHdpdGhvdXQgLm1kIGV4dGVuc2lvbilcIixcblx0XHRqYTogXCJcdTMwQUJcdTMwQjlcdTMwQkZcdTMwRTBcdTMwQkZcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRUJcdTMwNkVNYXJrZG93blx1MzBENVx1MzBBMVx1MzBBNFx1MzBFQlx1MzBEMVx1MzBCOVx1RkYwOC5tZFx1NjJFMVx1NUYzNVx1NUI1MFx1MzA2QVx1MzA1N1x1RkYwOVwiLFxuXHRcdHpoOiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1NjgwN1x1N0I3RVx1ODlDNFx1NTIxOVx1NzY4NE1hcmtkb3duXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU0RTBEXHU1NDJCLm1kXHU2MjY5XHU1QzU1XHU1NDBEXHVGRjA5XCIsXG5cdFx0a286IFwiXHVDRUU0XHVDMkE0XHVEMTQwIFx1RDBEQ1x1QURGOCBcdUFERENcdUNFNTkgTWFya2Rvd24gXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1QyAoLm1kIFx1RDY1NVx1QzdBNVx1Qzc5MCBcdUM4MUNcdUM2NzgpXCIsXG5cdH0sXG5cdFwicHJvLnRhZ1J1bGUuY3JlYXRlXCI6IHsgZW46IFwiQ3JlYXRlIHRlbXBsYXRlXCIsIGphOiBcIlx1MzBDNlx1MzBGM1x1MzBEN1x1MzBFQ1x1MzBGQ1x1MzBDOFx1NEY1Q1x1NjIxMFwiLCB6aDogXCJcdTUyMUJcdTVFRkFcdTZBMjFcdTY3N0ZcIiwga286IFwiXHVEMTVDXHVENTBDXHVCOUJGIFx1QzBERFx1QzEzMVwiIH0sXG5cdFwicHJvLnRhZ1J1bGUuY3JlYXRlZFwiOiB7IGVuOiBcIlRhZyBydWxlIGZpbGUgY3JlYXRlZFwiLCBqYTogXCJcdTMwQkZcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRUJcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwOTJcdTRGNUNcdTYyMTBcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIiwgemg6IFwiXHU2ODA3XHU3QjdFXHU4OUM0XHU1MjE5XHU2NTg3XHU0RUY2XHU1REYyXHU1MjFCXHU1RUZBXCIsIGtvOiBcIlx1RDBEQ1x1QURGOCBcdUFERENcdUNFNTkgXHVEMzBDXHVDNzdDXHVDNzc0IFx1QzBERFx1QzEzMVx1QjQxOFx1QzVDOFx1QzJCNVx1QjJDOFx1QjJFNFwiIH0sXG5cblx0Ly8gTm90aWNlc1xuXHRcIm5vdGljZS5jb25uZWN0ZWRcIjogeyBlbjogXCJDb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5IVwiLCBqYTogXCJcdTYzQTVcdTdEOUFcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdUZGMDFcIiwgemg6IFwiXHU4RkRFXHU2M0E1XHU2MjEwXHU1MjlGXHVGRjAxXCIsIGtvOiBcIlx1QzVGMFx1QUNCMCBcdUMxMzFcdUFDRjUhXCIgfSxcblx0XCJub3RpY2Uuc3luY0luUHJvZ3Jlc3NcIjogeyBlbjogXCJTeW5jIGFscmVhZHkgaW4gcHJvZ3Jlc3NcIiwgamE6IFwiXHU1NDBDXHU2NzFGXHU0RTJEXHUzMDY3XHUzMDU5XCIsIHpoOiBcIlx1NkI2M1x1NTcyOFx1NTQwQ1x1NkI2NVx1NEUyRFwiLCBrbzogXCJcdUIzRDlcdUFFMzBcdUQ2NTQgXHVDOUM0XHVENTg5IFx1QzkxMVwiIH0sXG5cdFwibm90aWNlLm5vVG9rZW5cIjoge1xuXHRcdGVuOiBcIlBsZWFzZSBzZXQgeW91ciBzZXNzaW9uIHRva2VuIGluIHNldHRpbmdzXCIsXG5cdFx0amE6IFwiXHU4QTJEXHU1QjlBXHUzMDY3XHUzMEJCXHUzMEMzXHUzMEI3XHUzMEU3XHUzMEYzXHUzMEM4XHUzMEZDXHUzMEFGXHUzMEYzXHUzMDkyXHU4QTJEXHU1QjlBXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XCIsXG5cdFx0emg6IFwiXHU4QkY3XHU1NzI4XHU4QkJFXHU3RjZFXHU0RTJEXHU4QkJFXHU3RjZFXHU0RjFBXHU4QkREXHU0RUU0XHU3MjRDXCIsXG5cdFx0a286IFwiXHVDMTI0XHVDODE1XHVDNUQwXHVDMTFDIFx1QzEzOFx1QzE1OCBcdUQxQTBcdUQwNzBcdUM3NDQgXHVDMTI0XHVDODE1XHVENTU4XHVDMTM4XHVDNjk0XCIsXG5cdH0sXG5cdFwibm90aWNlLm5vTmV3Q2xpcHNcIjogeyBlbjogXCJObyBuZXcgY2xpcHMgdG8gc3luY1wiLCBqYTogXCJcdTY1QjBcdTMwNTdcdTMwNDRcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwNkZcdTMwNDJcdTMwOEFcdTMwN0VcdTMwNUJcdTMwOTNcIiwgemg6IFwiXHU2Q0ExXHU2NzA5XHU2NUIwXHU3Njg0XHU1MjZBXHU4RjkxXCIsIGtvOiBcIlx1QzBDOCBcdUQwNzRcdUI5QkQgXHVDNUM2XHVDNzRDXCIgfSxcblx0XCJub3RpY2Uuc3luY2VkXCI6IHsgZW46IFwiU3luY2VkIHtjb3VudH0gY2xpcChzKVwiLCBqYTogXCJ7Y291bnR9XHU0RUY2XHUzMDZFXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDkyXHU1NDBDXHU2NzFGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsIHpoOiBcIlx1NURGMlx1NTQwQ1x1NkI2NXtjb3VudH1cdTRFMkFcdTUyNkFcdThGOTFcIiwga286IFwie2NvdW50fVx1QUMxQyBcdUQwNzRcdUI5QkQgXHVCM0Q5XHVBRTMwXHVENjU0IFx1QzY0NFx1QjhDQ1wiIH0sXG5cdFwibm90aWNlLnN5bmNQYXJ0aWFsXCI6IHtcblx0XHRlbjogXCJTeW5jZWQge3N5bmNlZH0sIGZhaWxlZCB7ZmFpbGVkfS4gQ2hlY2sgY29uc29sZSBmb3IgZGV0YWlscy5cIixcblx0XHRqYTogXCJcdTU0MENcdTY3MUYge3N5bmNlZH1cdTRFRjZcdTMwMDFcdTU5MzFcdTY1NTcge2ZhaWxlZH1cdTRFRjZcdTMwMDJcdThBNzNcdTdEMzBcdTMwNkZcdTMwQjNcdTMwRjNcdTMwQkRcdTMwRkNcdTMwRUJcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcIixcblx0XHR6aDogXCJcdTVERjJcdTU0MENcdTZCNjV7c3luY2VkfVx1NEUyQVx1RkYwQ1x1NTkzMVx1OEQyNXtmYWlsZWR9XHU0RTJBXHUzMDAyXHU4QkU2XHU2MEM1XHU4QkY3XHU2N0U1XHU3NzBCXHU2M0E3XHU1MjM2XHU1M0YwXHUzMDAyXCIsXG5cdFx0a286IFwiXHVCM0Q5XHVBRTMwXHVENjU0IHtzeW5jZWR9XHVBQzFDLCBcdUMyRTRcdUQzMjgge2ZhaWxlZH1cdUFDMUMuIFx1Qzc5MFx1QzEzOFx1RDU1QyBcdUIwQjRcdUM2QTlcdUM3NDAgXHVDRjU4XHVDMTk0XHVDNzQ0IFx1RDY1NVx1Qzc3OFx1RDU1OFx1QzEzOFx1QzY5NC5cIixcblx0fSxcblx0XCJub3RpY2Uuc3luY0ZhaWxlZFwiOiB7IGVuOiBcIlN5bmMgZmFpbGVkIC0ge21zZ31cIiwgamE6IFwiXHU1NDBDXHU2NzFGXHU1OTMxXHU2NTU3IC0ge21zZ31cIiwgemg6IFwiXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1IC0ge21zZ31cIiwga286IFwiXHVCM0Q5XHVBRTMwXHVENjU0IFx1QzJFNFx1RDMyOCAtIHttc2d9XCIgfSxcblx0XCJub3RpY2UubmV3Q2xpcFN5bmNlZFwiOiB7IGVuOiBcIk5ldyBjbGlwIHN5bmNlZFwiLCBqYTogXCJcdTY1QjBcdTMwNTdcdTMwNDRcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwOTJcdTU0MENcdTY3MUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIiwgemg6IFwiXHU2NUIwXHU1MjZBXHU4RjkxXHU1REYyXHU1NDBDXHU2QjY1XCIsIGtvOiBcIlx1QzBDOCBcdUQwNzRcdUI5QkQgXHVCM0Q5XHVBRTMwXHVENjU0XHVCNDI4XCIgfSxcblx0XCJub3RpY2UucHJpbWFyeVNldFwiOiB7XG5cdFx0ZW46IFwiVGhpcyBkZXZpY2UgaXMgbm93IHByaW1hcnlcIixcblx0XHRqYTogXCJcdTMwNTNcdTMwNkVcdTMwQzdcdTMwRDBcdTMwQTRcdTMwQjlcdTMwOTJcdTMwRDdcdTMwRTlcdTMwQTRcdTMwREVcdTMwRUFcdTMwNkJcdThBMkRcdTVCOUFcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIixcblx0XHR6aDogXCJcdTZCNjRcdThCQkVcdTU5MDdcdTVERjJcdThCQkVcdTRFM0FcdTRFM0JcdThCQkVcdTU5MDdcIixcblx0XHRrbzogXCJcdUM3NzQgXHVBRTMwXHVBRTMwXHVBQzAwIFx1QUUzMFx1QkNGOCBcdUFFMzBcdUFFMzBcdUI4NUMgXHVDMTI0XHVDODE1XHVCNDE4XHVDNUM4XHVDMkI1XHVCMkM4XHVCMkU0XCIsXG5cdH0sXG5cdFwibm90aWNlLnByaW1hcnlGYWlsZWRcIjoge1xuXHRcdGVuOiBcIkZhaWxlZCB0byBzZXQgcHJpbWFyeSBkZXZpY2VcIixcblx0XHRqYTogXCJcdTMwRDdcdTMwRTlcdTMwQTRcdTMwREVcdTMwRUFcdTMwQzdcdTMwRDBcdTMwQTRcdTMwQjlcdTMwNkVcdThBMkRcdTVCOUFcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIixcblx0XHR6aDogXCJcdThCQkVcdTdGNkVcdTRFM0JcdThCQkVcdTU5MDdcdTU5MzFcdThEMjVcIixcblx0XHRrbzogXCJcdUFFMzBcdUJDRjggXHVBRTMwXHVBRTMwIFx1QzEyNFx1QzgxNSBcdUMyRTRcdUQzMjhcIixcblx0fSxcblx0XCJub3RpY2Uuc2lnbkluRmlyc3RcIjogeyBlbjogXCJQbGVhc2Ugc2lnbiBpbiBmaXJzdFwiLCBqYTogXCJcdTUxNDhcdTMwNkJcdTMwQjVcdTMwQTRcdTMwRjNcdTMwQTRcdTMwRjNcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcIiwgemg6IFwiXHU4QkY3XHU1MTQ4XHU3NjdCXHU1RjU1XCIsIGtvOiBcIlx1QkEzQ1x1QzgwMCBcdUI4NUNcdUFERjhcdUM3NzhcdUQ1NThcdUMxMzhcdUM2OTRcIiB9LFxuXHRcIm5vdGljZS5mb2xkZXJzU3luY2VkXCI6IHtcblx0XHRlbjogXCJ7Y291bnR9IGZvbGRlcihzKSBzeW5jZWRcIixcblx0XHRqYTogXCJ7Y291bnR9XHU1MDBCXHUzMDZFXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDkyXHU1NDBDXHU2NzFGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsXG5cdFx0emg6IFwiXHU1REYyXHU1NDBDXHU2QjY1e2NvdW50fVx1NEUyQVx1NjU4N1x1NEVGNlx1NTkzOVwiLFxuXHRcdGtvOiBcIntjb3VudH1cdUFDMUMgXHVEM0Y0XHVCMzU0IFx1QjNEOVx1QUUzMFx1RDY1NCBcdUM2NDRcdUI4Q0NcIixcblx0fSxcblx0XCJub3RpY2UuZm9sZGVyU2NhbkZhaWxlZFwiOiB7XG5cdFx0ZW46IFwiRm9sZGVyIHNjYW4gZmFpbGVkIC0ge21zZ31cIixcblx0XHRqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTU5MzFcdTY1NTcgLSB7bXNnfVwiLFxuXHRcdHpoOiBcIlx1NjU4N1x1NEVGNlx1NTkzOVx1NjI2Qlx1NjNDRlx1NTkzMVx1OEQyNSAtIHttc2d9XCIsXG5cdFx0a286IFwiXHVEM0Y0XHVCMzU0IFx1QzJBNFx1Q0U5NCBcdUMyRTRcdUQzMjggLSB7bXNnfVwiLFxuXHR9LFxuXHRcIm5vdGljZS5yZWFkbWVDb3BpZWRcIjoge1xuXHRcdGVuOiBcIlJFQURNRSB0ZW1wbGF0ZSBjb3BpZWQgdG8gY2xpcGJvYXJkXCIsXG5cdFx0amE6IFwiUkVBRE1FXHUzMEM2XHUzMEYzXHUzMEQ3XHUzMEVDXHUzMEZDXHUzMEM4XHUzMDkyXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMERDXHUzMEZDXHUzMEM5XHUzMDZCXHUzMEIzXHUzMEQ0XHUzMEZDXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsXG5cdFx0emg6IFwiUkVBRE1FXHU2QTIxXHU2NzdGXHU1REYyXHU1OTBEXHU1MjM2XHU1MjMwXHU1MjZBXHU4RDM0XHU2NzdGXCIsXG5cdFx0a286IFwiUkVBRE1FIFx1RDE1Q1x1RDUwQ1x1QjlCRlx1Qzc3NCBcdUQwNzRcdUI5QkRcdUJDRjRcdUI0RENcdUM1RDAgXHVCQ0Y1XHVDMEFDXHVCNDI4XCIsXG5cdH0sXG5cdFwibm90aWNlLnByZWZGYWlsZWRcIjoge1xuXHRcdGVuOiBcIkZhaWxlZCB0byBzYXZlIHByZWZlcmVuY2VcIixcblx0XHRqYTogXCJcdThBMkRcdTVCOUFcdTMwNkVcdTRGRERcdTVCNThcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIixcblx0XHR6aDogXCJcdTRGRERcdTVCNThcdThCQkVcdTdGNkVcdTU5MzFcdThEMjVcIixcblx0XHRrbzogXCJcdUMxMjRcdUM4MTUgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyOFwiLFxuXHR9LFxuXG5cdC8vIEd1aWRlIHRhYlxuXHRcImd1aWRlLnRpdGxlXCI6IHsgZW46IFwiR2V0dGluZyBzdGFydGVkXCIsIGphOiBcIlx1MzA2Rlx1MzA1OFx1MzA4MVx1MzA2QlwiLCB6aDogXCJcdTUxNjVcdTk1RThcdTYzMDdcdTUzNTdcIiwga286IFwiXHVDMkRDXHVDNzkxXHVENTU4XHVBRTMwXCIgfSxcblx0XCJndWlkZS5zdGVwMS50aXRsZVwiOiB7IGVuOiBcIkluc3RhbGwgYnJvd3NlciBleHRlbnNpb25cIiwgamE6IFwiXHUzMEQ2XHUzMEU5XHUzMEE2XHUzMEI2XHU2MkUxXHU1RjM1XHUzMDkyXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCXCIsIHpoOiBcIlx1NUI4OVx1ODhDNVx1NkQ0Rlx1ODlDOFx1NTY2OFx1NjI2OVx1NUM1NVwiLCBrbzogXCJcdUJFMENcdUI3N0NcdUM2QjBcdUM4MDAgXHVENjU1XHVDN0E1IFx1QzEyNFx1Q0U1OFwiIH0sXG5cdFwiZ3VpZGUuc3RlcDEuZGVzY1wiOiB7XG5cdFx0ZW46IFwiSW5zdGFsbCB0aGUgQUlDaGF0Q2xpcCBleHRlbnNpb24gZm9yIENocm9tZSBvciBGaXJlZm94LlwiLFxuXHRcdGphOiBcIkNocm9tZVx1MzA3RVx1MzA1Rlx1MzA2RkZpcmVmb3hcdTc1MjhcdTMwNkVBSUNoYXRDbGlwXHU2MkUxXHU1RjM1XHU2QTVGXHU4MEZEXHUzMDkyXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDAyXCIsXG5cdFx0emg6IFwiXHU0RTNBQ2hyb21lXHU2MjE2RmlyZWZveFx1NUI4OVx1ODhDNUFJQ2hhdENsaXBcdTYyNjlcdTVDNTVcdTMwMDJcIixcblx0XHRrbzogXCJDaHJvbWUgXHVCNjEwXHVCMjk0IEZpcmVmb3hcdUM2QTkgQUlDaGF0Q2xpcCBcdUQ2NTVcdUM3QTVcdUM3NDQgXHVDMTI0XHVDRTU4XHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuXHR9LFxuXHRcImd1aWRlLnN0ZXAyLnRpdGxlXCI6IHsgZW46IFwiQ2xpcCBBSSByZXNwb25zZXNcIiwgamE6IFwiQUlcdTU2REVcdTdCNTRcdTMwOTJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcIiwgemg6IFwiXHU1MjZBXHU4RjkxQUlcdTU2REVcdTdCNTRcIiwga286IFwiQUkgXHVDNzUxXHVCMkY1IFx1RDA3NFx1QjlCRFwiIH0sXG5cdFwiZ3VpZGUuc3RlcDIuZGVzY1wiOiB7XG5cdFx0ZW46IFwiQ2xpY2sgdGhlIGNsaXAgYnV0dG9uIG9uIGFueSBBSSBjaGF0IHJlc3BvbnNlIHRvIHNhdmUgaXQuXCIsXG5cdFx0amE6IFwiQUlcdTMwQzFcdTMwRTNcdTMwQzNcdTMwQzhcdTMwNkVcdTU2REVcdTdCNTRcdTMwNkJcdTMwNDJcdTMwOEJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwRENcdTMwQkZcdTMwRjNcdTMwOTJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwQUZcdTMwNTdcdTMwNjZcdTRGRERcdTVCNThcdTMwNTdcdTMwN0VcdTMwNTlcdTMwMDJcIixcblx0XHR6aDogXCJcdTcwQjlcdTUxRkJBSVx1ODA0QVx1NTkyOVx1NTZERVx1N0I1NFx1NEUwQVx1NzY4NFx1NTI2QVx1OEY5MVx1NjMwOVx1OTRBRVx1OEZEQlx1ODg0Q1x1NEZERFx1NUI1OFx1MzAwMlwiLFxuXHRcdGtvOiBcIkFJIFx1Q0M0NFx1RDMwNSBcdUM3NTFcdUIyRjVcdUM3NTggXHVEMDc0XHVCOUJEIFx1QkM4NFx1RDJCQ1x1Qzc0NCBcdUQwNzRcdUI5QURcdUQ1NThcdUM1RUMgXHVDODAwXHVDN0E1XHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuXHR9LFxuXHRcImd1aWRlLnN0ZXAzLnRpdGxlXCI6IHsgZW46IFwiQXV0by1zeW5jIHRvIE9ic2lkaWFuXCIsIGphOiBcIk9ic2lkaWFuXHUzMDZCXHU4MUVBXHU1MkQ1XHU1NDBDXHU2NzFGXCIsIHpoOiBcIlx1ODFFQVx1NTJBOFx1NTQwQ1x1NkI2NVx1NTIzME9ic2lkaWFuXCIsIGtvOiBcIk9ic2lkaWFuXHVDNUQwIFx1Qzc5MFx1QjNEOSBcdUIzRDlcdUFFMzBcdUQ2NTRcIiB9LFxuXHRcImd1aWRlLnN0ZXAzLmRlc2NcIjoge1xuXHRcdGVuOiBcIkNsaXBwZWQgbm90ZXMgc3luYyBhdXRvbWF0aWNhbGx5IHRvIHlvdXIgT2JzaWRpYW4gdmF1bHQuXCIsXG5cdFx0amE6IFwiXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDU3XHUzMDVGXHUzMENFXHUzMEZDXHUzMEM4XHUzMDZGT2JzaWRpYW4gVmF1bHRcdTMwNkJcdTgxRUFcdTUyRDVcdTMwNjdcdTU0MENcdTY3MUZcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTlcdTMwMDJcIixcblx0XHR6aDogXCJcdTUyNkFcdThGOTFcdTc2ODRcdTdCMTRcdThCQjBcdTRGMUFcdTgxRUFcdTUyQThcdTU0MENcdTZCNjVcdTUyMzBcdTRGNjBcdTc2ODRPYnNpZGlhblx1NUU5M1x1MzAwMlwiLFxuXHRcdGtvOiBcIlx1RDA3NFx1QjlCRFx1QjQxQyBcdUIxNzhcdUQyQjhcdUIyOTQgT2JzaWRpYW4gXHVCQ0ZDXHVEMkI4XHVDNUQwIFx1Qzc5MFx1QjNEOVx1QzczQ1x1Qjg1QyBcdUIzRDlcdUFFMzBcdUQ2NTRcdUI0MjlcdUIyQzhcdUIyRTQuXCIsXG5cdH0sXG5cdFwiZ3VpZGUuZG9jc0xpbmtcIjogeyBlbjogXCJWaWV3IGZ1bGwgZG9jdW1lbnRhdGlvbiBcdTIxOTJcIiwgamE6IFwiXHUzMEM5XHUzMEFEXHUzMEU1XHUzMEUxXHUzMEYzXHUzMEM4XHUzMDkyXHU4OThCXHUzMDhCIFx1MjE5MlwiLCB6aDogXCJcdTY3RTVcdTc3MEJcdTVCOENcdTY1NzRcdTY1ODdcdTY4NjMgXHUyMTkyXCIsIGtvOiBcIlx1QzgwNFx1Q0NCNCBcdUJCMzhcdUMxMUMgXHVCQ0Y0XHVBRTMwIFx1MjE5MlwiIH0sXG5cblx0Ly8gVGl0bGUgbGFuZyBvcHRpb25zXG5cdFwidGl0bGVMYW5nLmF1dG9cIjogeyBlbjogXCJBdXRvIChzYW1lIGFzIGNvbnRlbnQpXCIsIGphOiBcIlx1ODFFQVx1NTJENVx1RkYwOFx1MzBCM1x1MzBGM1x1MzBDNlx1MzBGM1x1MzBDNFx1MzA2OFx1NTQwQ1x1MzA1OFx1RkYwOVwiLCB6aDogXCJcdTgxRUFcdTUyQThcdUZGMDhcdTRFMEVcdTUxODVcdTVCQjlcdTc2RjhcdTU0MENcdUZGMDlcIiwga286IFwiXHVDNzkwXHVCM0Q5IChcdUNGNThcdUQxNTBcdUNFMjBcdUM2NDAgXHVCM0Q5XHVDNzdDKVwiIH0sXG5cblx0Ly8gRm9sZGVyIE1hbmFnZXIgKHNldHRpbmdzIGJ1dHRvbilcblx0XCJwcm8uZm9sZGVyTWFuYWdlci5uYW1lXCI6IHtcblx0XHRlbjogXCJGb2xkZXIgbWFuYWdlclwiLFxuXHRcdGphOiBcIlx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzBERVx1MzBDRFx1MzBGQ1x1MzBCOFx1MzBFM1x1MzBGQ1wiLFxuXHRcdHpoOiBcIlx1NjU4N1x1NEVGNlx1NTkzOVx1N0JBMVx1NzQwNlx1NTY2OFwiLFxuXHRcdGtvOiBcIlx1RDNGNFx1QjM1NCBcdUFEMDBcdUI5QUNcdUM3OTBcIixcblx0fSxcblx0XCJwcm8uZm9sZGVyTWFuYWdlci5kZXNjXCI6IHtcblx0XHRlbjogXCJDcmVhdGUgb3IgZGVsZXRlIG1hcmtlciBmaWxlcyBpbiBidWxrIHdpdGggQUktZ2VuZXJhdGVkIGRlc2NyaXB0aW9uc1wiLFxuXHRcdGphOiBcIkFJXHUzMDZCXHUzMDg4XHUzMDhCXHU4QUFDXHU2NjBFXHU2NTg3XHU3NTFGXHU2MjEwXHUzMDY3XHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDkyXHU0RTAwXHU2MkVDXHU0RjVDXHU2MjEwXHUzMEZCXHU1MjRBXHU5NjY0XCIsXG5cdFx0emg6IFwiXHU0RjdGXHU3NTI4QUlcdTc1MUZcdTYyMTBcdTYzQ0ZcdThGRjBcdTYyNzlcdTkxQ0ZcdTUyMUJcdTVFRkFcdTYyMTZcdTUyMjBcdTk2NjRcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcIixcblx0XHRrbzogXCJBSSBcdUMwRERcdUMxMzEgXHVDMTI0XHVCQTg1XHVDNzNDXHVCODVDIFx1QjlDOFx1Q0VFNCBcdUQzMENcdUM3N0MgXHVDNzdDXHVBRDA0IFx1QzBERFx1QzEzMS9cdUMwQURcdUM4MUNcIixcblx0fSxcblx0XCJwcm8uZm9sZGVyTWFuYWdlci5idXR0b25cIjoge1xuXHRcdGVuOiBcIk9wZW4gZm9sZGVyIG1hbmFnZXJcIixcblx0XHRqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwREVcdTMwQ0RcdTMwRkNcdTMwQjhcdTMwRTNcdTMwRkNcdTMwOTJcdTk1OEJcdTMwNEZcIixcblx0XHR6aDogXCJcdTYyNTNcdTVGMDBcdTY1ODdcdTRFRjZcdTU5MzlcdTdCQTFcdTc0MDZcdTU2NjhcIixcblx0XHRrbzogXCJcdUQzRjRcdUIzNTQgXHVBRDAwXHVCOUFDXHVDNzkwIFx1QzVGNFx1QUUzMFwiLFxuXHR9LFxuXG5cdC8vIE1vZGFsXG5cdFwibW9kYWwudGl0bGVcIjogeyBlbjogXCJGb2xkZXIgTWFuYWdlclwiLCBqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwREVcdTMwQ0RcdTMwRkNcdTMwQjhcdTMwRTNcdTMwRkNcIiwgemg6IFwiXHU2NTg3XHU0RUY2XHU1OTM5XHU3QkExXHU3NDA2XHU1NjY4XCIsIGtvOiBcIlx1RDNGNFx1QjM1NCBcdUFEMDBcdUI5QUNcdUM3OTBcIiB9LFxuXHRcIm1vZGFsLnRhYkNyZWF0ZVwiOiB7IGVuOiBcIkNyZWF0ZVwiLCBqYTogXCJcdTRGNUNcdTYyMTBcIiwgemg6IFwiXHU1MjFCXHU1RUZBXCIsIGtvOiBcIlx1QzBERFx1QzEzMVwiIH0sXG5cdFwibW9kYWwudGFiRGVsZXRlXCI6IHsgZW46IFwiRGVsZXRlXCIsIGphOiBcIlx1NTI0QVx1OTY2NFwiLCB6aDogXCJcdTUyMjBcdTk2NjRcIiwga286IFwiXHVDMEFEXHVDODFDXCIgfSxcblx0XCJtb2RhbC5zZWxlY3RBbGxcIjogeyBlbjogXCJTZWxlY3QgYWxsXCIsIGphOiBcIlx1NTE2OFx1OTA3OFx1NjI5RVwiLCB6aDogXCJcdTUxNjhcdTkwMDlcIiwga286IFwiXHVDODA0XHVDQ0I0IFx1QzEyMFx1RDBERFwiIH0sXG5cdFwibW9kYWwuZGVzZWxlY3RBbGxcIjogeyBlbjogXCJEZXNlbGVjdCBhbGxcIiwgamE6IFwiXHU1MTY4XHU4OUUzXHU5NjY0XCIsIHpoOiBcIlx1NTNENlx1NkQ4OFx1NTE2OFx1OTAwOVwiLCBrbzogXCJcdUM4MDRcdUNDQjQgXHVENTc0XHVDODFDXCIgfSxcblx0XCJtb2RhbC5kZXNjTGFuZ3VhZ2VcIjogeyBlbjogXCJEZXNjcmlwdGlvbiBsYW5ndWFnZTogXCIsIGphOiBcIlx1OEFBQ1x1NjYwRVx1NjU4N1x1MzA2RVx1OEEwMFx1OEE5RTogXCIsIHpoOiBcIlx1NjNDRlx1OEZGMFx1OEJFRFx1OEEwMDogXCIsIGtvOiBcIlx1QzEyNFx1QkE4NSBcdUM1QjhcdUM1QjQ6IFwiIH0sXG5cdFwibW9kYWwuZGVzY1BsYWNlaG9sZGVyXCI6IHtcblx0XHRlbjogXCJEZXNjcmliZSB3aGF0IGtpbmQgb2Ygbm90ZXMgYmVsb25nIGluIHRoaXMgZm9sZGVyLi4uXCIsXG5cdFx0amE6IFwiXHUzMDUzXHUzMDZFXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDZCXHUzMDY5XHUzMDkzXHUzMDZBXHUzMENFXHUzMEZDXHUzMEM4XHUzMDRDXHU1MTY1XHUzMDhCXHUzMDRCXHU4QUFDXHU2NjBFLi4uXCIsXG5cdFx0emg6IFwiXHU2M0NGXHU4RkYwXHU2QjY0XHU2NTg3XHU0RUY2XHU1OTM5XHU0RTJEXHU1QzVFXHU0RThFXHU1NEVBXHU3OUNEXHU3QjE0XHU4QkIwLi4uXCIsXG5cdFx0a286IFwiXHVDNzc0IFx1RDNGNFx1QjM1NFx1QzVEMCBcdUM1QjRcdUI1QTQgXHVCMTc4XHVEMkI4XHVBQzAwIFx1QjRFNFx1QzVCNFx1QUMwMFx1QjI5NFx1QzlDMCBcdUMxMjRcdUJBODUuLi5cIixcblx0fSxcblx0XCJtb2RhbC5jcmVhdGVBbmRTeW5jXCI6IHsgZW46IFwiQ3JlYXRlIG1hcmtlcnMgJiBzeW5jXCIsIGphOiBcIlx1MzBERVx1MzBGQ1x1MzBBQlx1MzBGQ1x1NEY1Q1x1NjIxMCAmIFx1NTQwQ1x1NjcxRlwiLCB6aDogXCJcdTUyMUJcdTVFRkFcdTY4MDdcdThCQjBcdTVFNzZcdTU0MENcdTZCNjVcIiwga286IFwiXHVCOUM4XHVDRUU0IFx1QzBERFx1QzEzMSBcdUJDMEYgXHVCM0Q5XHVBRTMwXHVENjU0XCIgfSxcblx0XCJtb2RhbC5kZWxldGVBbmRTeW5jXCI6IHsgZW46IFwiRGVsZXRlIHNlbGVjdGVkICYgc3luY1wiLCBqYTogXCJcdTkwNzhcdTYyOUVcdTMwNTdcdTMwNUZcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwOTJcdTUyNEFcdTk2NjQgJiBcdTU0MENcdTY3MUZcIiwgemg6IFwiXHU1MjIwXHU5NjY0XHU5MDA5XHU0RTJEXHU3Njg0XHU1RTc2XHU1NDBDXHU2QjY1XCIsIGtvOiBcIlx1QzEyMFx1RDBERCBcdUQ1NkRcdUJBQTkgXHVDMEFEXHVDODFDIFx1QkMwRiBcdUIzRDlcdUFFMzBcdUQ2NTRcIiB9LFxuXHRcIm1vZGFsLmdlbmVyYXRlXCI6IHsgZW46IFwiQUkgR2VuZXJhdGVcIiwgamE6IFwiQUlcdTc1MUZcdTYyMTBcIiwgemg6IFwiQUlcdTc1MUZcdTYyMTBcIiwga286IFwiQUkgXHVDMEREXHVDMTMxXCIgfSxcblx0XCJtb2RhbC5nZW5lcmF0aW5nXCI6IHsgZW46IFwiR2VuZXJhdGluZy4uLlwiLCBqYTogXCJcdTc1MUZcdTYyMTBcdTRFMkQuLi5cIiwgemg6IFwiXHU3NTFGXHU2MjEwXHU0RTJELi4uXCIsIGtvOiBcIlx1QzBERFx1QzEzMSBcdUM5MTEuLi5cIiB9LFxuXHRcIm1vZGFsLnJlZmluZVwiOiB7IGVuOiBcIlJlZmluZSB3aXRoIEFJXCIsIGphOiBcIkFJXHUzMDY3XHU2ODIxXHU2QjYzXCIsIHpoOiBcIkFJXHU2ODIxXHU2QjYzXCIsIGtvOiBcIkFJIFx1QUQ1MFx1QzgxNVwiIH0sXG5cdFwibW9kYWwucmVmaW5pbmdcIjogeyBlbjogXCJSZWZpbmluZy4uLlwiLCBqYTogXCJcdTY4MjFcdTZCNjNcdTRFMkQuLi5cIiwgemg6IFwiXHU2ODIxXHU2QjYzXHU0RTJELi4uXCIsIGtvOiBcIlx1QUQ1MFx1QzgxNSBcdUM5MTEuLi5cIiB9LFxuXHRcIm1vZGFsLmV4aXN0aW5nTWFya2VyXCI6IHsgZW46IFwiIChleGlzdGluZylcIiwgamE6IFwiXHVGRjA4XHU2NUUyXHU1QjU4XHVGRjA5XCIsIHpoOiBcIlx1RkYwOFx1NURGMlx1NjcwOVx1RkYwOVwiLCBrbzogXCIgKFx1QUUzMFx1Qzg3NClcIiB9LFxuXHRcIm1vZGFsLm5vRm9sZGVyc1wiOiB7XG5cdFx0ZW46IFwiTm8gZm9sZGVycyBmb3VuZCBpbiB2YXVsdFwiLFxuXHRcdGphOiBcIlZhdWx0XHU1MTg1XHUzMDZCXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDRDXHU4OThCXHUzMDY0XHUzMDRCXHUzMDhBXHUzMDdFXHUzMDVCXHUzMDkzXCIsXG5cdFx0emg6IFwiXHU1RTkzXHU0RTJEXHU2NzJBXHU2MjdFXHU1MjMwXHU2NTg3XHU0RUY2XHU1OTM5XCIsXG5cdFx0a286IFwiXHVCQ0ZDXHVEMkI4XHVDNUQwXHVDMTFDIFx1RDNGNFx1QjM1NFx1Qjk3QyBcdUNDM0VcdUM3NDQgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNFwiLFxuXHR9LFxuXHRcIm1vZGFsLm5vTWFya2Vyc1wiOiB7XG5cdFx0ZW46IFwiTm8gbWFya2VyIGZpbGVzIGZvdW5kXCIsXG5cdFx0amE6IFwiXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDZGXHUzMDQyXHUzMDhBXHUzMDdFXHUzMDVCXHUzMDkzXCIsXG5cdFx0emg6IFwiXHU2NzJBXHU2MjdFXHU1MjMwXHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2XCIsXG5cdFx0a286IFwiXHVCOUM4XHVDRUU0IFx1RDMwQ1x1Qzc3Q1x1Qzc3NCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTRcIixcblx0fSxcblx0XCJtb2RhbC5tYXJrZXJzRm91bmRcIjoge1xuXHRcdGVuOiBcIkZvbGRlcnMgd2l0aCBtYXJrZXIgZmlsZXM6XCIsXG5cdFx0amE6IFwiXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDRDXHUzMDQyXHUzMDhCXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwOlwiLFxuXHRcdHpoOiBcIlx1NTMwNVx1NTQyQlx1NjgwN1x1OEJCMFx1NjU4N1x1NEVGNlx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOTpcIixcblx0XHRrbzogXCJcdUI5QzhcdUNFRTQgXHVEMzBDXHVDNzdDXHVDNzc0IFx1Qzc4OFx1QjI5NCBcdUQzRjRcdUIzNTQ6XCIsXG5cdH0sXG5cdFwibW9kYWwuY29uZmlybU92ZXJ3cml0ZVwiOiB7XG5cdFx0ZW46IFwie2NvdW50fSBtYXJrZXIocykgd2lsbCBiZSBvdmVyd3JpdHRlbi4gQ29udGludWU/XCIsXG5cdFx0amE6IFwie2NvdW50fVx1NTAwQlx1MzA2RVx1MzBERVx1MzBGQ1x1MzBBQlx1MzBGQ1x1MzBENVx1MzBBMVx1MzBBNFx1MzBFQlx1MzA0Q1x1NEUwQVx1NjZGOFx1MzA0RFx1MzA1NVx1MzA4Q1x1MzA3RVx1MzA1OVx1MzAwMlx1N0Q5QVx1ODg0Q1x1MzA1N1x1MzA3RVx1MzA1OVx1MzA0Qlx1RkYxRlwiLFxuXHRcdHpoOiBcIntjb3VudH1cdTRFMkFcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcdTVDMDZcdTg4QUJcdTg5ODZcdTc2RDZcdTMwMDJcdTdFRTdcdTdFRURcdTU0MTdcdUZGMUZcIixcblx0XHRrbzogXCJ7Y291bnR9XHVBQzFDXHVDNzU4IFx1QjlDOFx1Q0VFNCBcdUQzMENcdUM3N0NcdUM3NzQgXHVCMzZFXHVDNUI0XHVDNEYwXHVDNUVDXHVDOUQxXHVCMkM4XHVCMkU0LiBcdUFDQzRcdUMxOERcdUQ1NThcdUMyRENcdUFDQTBcdUMyQjVcdUIyQzhcdUFFNEM/XCIsXG5cdH0sXG5cblx0Ly8gTm90aWNlcyAoZm9sZGVyIG1hbmFnZXIpXG5cdFwibm90aWNlLm1hcmtlcnNDcmVhdGVkXCI6IHtcblx0XHRlbjogXCJ7Y291bnR9IG1hcmtlcihzKSBjcmVhdGVkXCIsXG5cdFx0amE6IFwie2NvdW50fVx1NTAwQlx1MzA2RVx1MzBERVx1MzBGQ1x1MzBBQlx1MzBGQ1x1MzA5Mlx1NEY1Q1x1NjIxMFx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RlwiLFxuXHRcdHpoOiBcIlx1NURGMlx1NTIxQlx1NUVGQXtjb3VudH1cdTRFMkFcdTY4MDdcdThCQjBcIixcblx0XHRrbzogXCJ7Y291bnR9XHVBQzFDIFx1QjlDOFx1Q0VFNCBcdUMwRERcdUMxMzEgXHVDNjQ0XHVCOENDXCIsXG5cdH0sXG5cdFwibm90aWNlLm1hcmtlcnNEZWxldGVkXCI6IHtcblx0XHRlbjogXCJ7Y291bnR9IG1hcmtlcihzKSBkZWxldGVkXCIsXG5cdFx0amE6IFwie2NvdW50fVx1NTAwQlx1MzA2RVx1MzBERVx1MzBGQ1x1MzBBQlx1MzBGQ1x1MzA5Mlx1NTI0QVx1OTY2NFx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RlwiLFxuXHRcdHpoOiBcIlx1NURGMlx1NTIyMFx1OTY2NHtjb3VudH1cdTRFMkFcdTY4MDdcdThCQjBcIixcblx0XHRrbzogXCJ7Y291bnR9XHVBQzFDIFx1QjlDOFx1Q0VFNCBcdUMwQURcdUM4MUMgXHVDNjQ0XHVCOENDXCIsXG5cdH0sXG5cdFwibm90aWNlLmdlbmVyYXRlRmFpbGVkXCI6IHtcblx0XHRlbjogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgZGVzY3JpcHRpb25cIixcblx0XHRqYTogXCJcdThBQUNcdTY2MEVcdTY1ODdcdTMwNkVcdTc1MUZcdTYyMTBcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIixcblx0XHR6aDogXCJcdTc1MUZcdTYyMTBcdTYzQ0ZcdThGRjBcdTU5MzFcdThEMjVcIixcblx0XHRrbzogXCJcdUMxMjRcdUJBODUgXHVDMEREXHVDMTMxIFx1QzJFNFx1RDMyOFwiLFxuXHR9LFxuXHRcIm5vdGljZS5xdW90YUV4Y2VlZGVkXCI6IHtcblx0XHRlbjogXCJBSSBxdW90YSBleGNlZWRlZCBmb3IgdGhpcyBiaWxsaW5nIHBlcmlvZFwiLFxuXHRcdGphOiBcIlx1NEVDQVx1NjcwOFx1MzA2RUFJXHU0RjdGXHU3NTI4XHU5MUNGXHU0RTBBXHU5NjUwXHUzMDZCXHU5MDU0XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsXG5cdFx0emg6IFwiXHU2NzJDXHU2NzA4QUlcdTRGN0ZcdTc1MjhcdTkxQ0ZcdTVERjJcdThGQkVcdTRFMEFcdTk2NTBcIixcblx0XHRrbzogXCJcdUM3NzRcdUJDODggXHVDQ0FEXHVBRDZDIFx1QUUzMFx1QUMwNFx1Qzc1OCBBSSBcdUQ1NjBcdUIyRjlcdUI3QzkgXHVDRDA4XHVBQ0ZDXCIsXG5cdH0sXG5cdFwibm90aWNlLnN5bmNBZnRlckNyZWF0ZUZhaWxlZFwiOiB7XG5cdFx0ZW46IFwiTWFya2VycyBjcmVhdGVkIGJ1dCBzeW5jIGZhaWxlZFwiLFxuXHRcdGphOiBcIlx1MzBERVx1MzBGQ1x1MzBBQlx1MzBGQ1x1NEY1Q1x1NjIxMFx1NUY4Q1x1MzA2RVx1NTQwQ1x1NjcxRlx1MzA2Qlx1NTkzMVx1NjU1N1x1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RlwiLFxuXHRcdHpoOiBcIlx1NjgwN1x1OEJCMFx1NURGMlx1NTIxQlx1NUVGQVx1NEY0Nlx1NTQwQ1x1NkI2NVx1NTkzMVx1OEQyNVwiLFxuXHRcdGtvOiBcIlx1QjlDOFx1Q0VFNCBcdUMwRERcdUMxMzEgXHVENkM0IFx1QjNEOVx1QUUzMFx1RDY1NCBcdUMyRTRcdUQzMjhcIixcblx0fSxcblx0XCJub3RpY2Uuc3luY0FmdGVyRGVsZXRlRmFpbGVkXCI6IHtcblx0XHRlbjogXCJNYXJrZXJzIGRlbGV0ZWQgYnV0IHN5bmMgZmFpbGVkXCIsXG5cdFx0amE6IFwiXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHU1MjRBXHU5NjY0XHU1RjhDXHUzMDZFXHU1NDBDXHU2NzFGXHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsXG5cdFx0emg6IFwiXHU2ODA3XHU4QkIwXHU1REYyXHU1MjIwXHU5NjY0XHU0RjQ2XHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1XCIsXG5cdFx0a286IFwiXHVCOUM4XHVDRUU0IFx1QzBBRFx1QzgxQyBcdUQ2QzQgXHVCM0Q5XHVBRTMwXHVENjU0IFx1QzJFNFx1RDMyOFwiLFxuXHR9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHQoa2V5OiBzdHJpbmcsIGxhbmc6IFBsdWdpbkxhbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gdHJhbnNsYXRpb25zW2tleV0/LltsYW5nXSA/PyB0cmFuc2xhdGlvbnNba2V5XT8uZW4gPz8ga2V5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdFJlcGxhY2Uoa2V5OiBzdHJpbmcsIGxhbmc6IFBsdWdpbkxhbmcsIHJlcGxhY2VtZW50czogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPik6IHN0cmluZyB7XG5cdGxldCByZXN1bHQgPSB0KGtleSwgbGFuZyk7XG5cdGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHJlcGxhY2VtZW50cykpIHtcblx0XHRyZXN1bHQgPSByZXN1bHQucmVwbGFjZShgeyR7a319YCwgU3RyaW5nKHYpKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5kZWNsYXJlIGNvbnN0IG1vbWVudDogeyBsb2NhbGU6ICgpID0+IHN0cmluZyB9IHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0TGFuZygpOiBQbHVnaW5MYW5nIHtcblx0Y29uc3QgbG9jYWxlID0gbW9tZW50Py5sb2NhbGU/LigpID8/IG5hdmlnYXRvci5sYW5ndWFnZSA/PyBcImVuXCI7XG5cdGNvbnN0IGNvZGUgPSBsb2NhbGUuc3BsaXQoXCItXCIpWzBdLnRvTG93ZXJDYXNlKCk7XG5cdGlmIChbXCJlblwiLCBcImphXCIsIFwiemhcIiwgXCJrb1wiXS5pbmNsdWRlcyhjb2RlKSkgcmV0dXJuIGNvZGUgYXMgUGx1Z2luTGFuZztcblx0cmV0dXJuIFwiZW5cIjtcbn1cbiIsICIvKiogU2V0dGluZ3MgVUkgXHUyMDE0IHJlbmRlcnMgdGhlIHBsdWdpbiBzZXR0aW5ncyBwYW5lbCB3aXRoIEJhc2ljIC8gUHJvIC8gR3VpZGUgdGFicyAqL1xuaW1wb3J0IHsgdHlwZSBBcHAsIE5vdGljZSwgUGxhdGZvcm0sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGFwaUdldCwgYXBpUGF0Y2gsIGFwaVB1dCB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHsgc2NhbkZvbGRlcnMsIHN5bmNGb2xkZXJzVG9BcGkgfSBmcm9tIFwiLi9mb2xkZXJzXCI7XG5pbXBvcnQgeyB0eXBlIFBsdWdpbkxhbmcsIGRldGVjdExhbmcsIHQsIHRSZXBsYWNlIH0gZnJvbSBcIi4vaTE4blwiO1xuaW1wb3J0IHR5cGUgQUlDaGF0Q2xpcFBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBGb2xkZXJNYW5hZ2VyTW9kYWwgfSBmcm9tIFwiLi9tb2RhbFwiO1xuaW1wb3J0IHsgV0VCX1VSTCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IERFRkFVTFRfVEFHX1JVTEVfVEVNUExBVEUgPSBgVGFnIERlc2lnbiBhbmQgTmFtaW5nIFJ1bGVzOlxuXG4xLiBDb25zaXN0ZW50IG5hbWluZ1xuLSBBbGwgbG93ZXJjYXNlOiBUYWcgbmFtZXMgbXVzdCBiZSBlbnRpcmVseSBsb3dlcmNhc2UuIEV4YW1wbGU6ICNtZWV0aW5nLCAjcHJvamVjdC1hbHBoYVxuLSBObyBzcGFjZXM6IFVzZSBoeXBoZW5zICgtKSBvciB1bmRlcnNjb3JlcyAoXykgdG8gc2VwYXJhdGUgd29yZHMuIEV4YW1wbGU6ICN0by1kbywgI3Jlc2VhcmNoX25vdGVzXG5cbjIuIENvbnRlbnQgdGFncyBvbmx5XG4tIEFMTE9XRUQ6IENvbnRlbnQgdGFncyByZXByZXNlbnRpbmcgdGhlIHN1YmplY3Qgb3IgdG9waWMuIEV4YW1wbGU6ICNweXRob24sICNkYXRhLWFuYWx5c2lzXG4tIEZPUkJJRERFTjogU3RhdHVzIHRhZ3MgKCN1bm9yZ2FuaXplZCwgI25lZWRzLXJldmlldywgI2RvbmUpLCB0aW1lIHRhZ3MgKCMyMDIzLCAjUTEpLCBsb2NhdGlvbiB0YWdzICgjdG9reW8sICNvZmZpY2UpXG5cbjMuIFVzZSBzaW5ndWxhciBmb3JtXG4tIEFsd2F5cyB1c2Ugc2luZ3VsYXIuIEV4YW1wbGU6ICNub3RlIChub3QgI25vdGVzKSwgI3Rhc2sgKG5vdCAjdGFza3MpXG5cbjQuIEFsbG93ZWQgY2hhcmFjdGVyc1xuLSBPbmx5IGh5cGhlbnMgKC0pLCB1bmRlcnNjb3JlcyAoXyksIGFuZCBzbGFzaGVzICgvKSBhcmUgcGVybWl0dGVkLiBObyBzcGFjZXMsIHNwZWNpYWwgc3ltYm9scywgb3IgZW1vamkuXG5cbjUuIEJlIHNwZWNpZmljIGFuZCBjb25jaXNlXG4tIFRhZyBuYW1lcyBzaG91bGQgYWNjdXJhdGVseSBhbmQgY29uY2lzZWx5IHJlcHJlc2VudCB0aGUgY29udGVudC5cbi0gRXhhbXBsZTogI21hcmtldGluZy1zdHJhdGVneSAoZ29vZCksICNzdHJhdGVneSAodG9vIHZhZ3VlKVxuLSBBYmJyZXZpYXRpb25zOiBPbmx5IHVzZSB3aWRlbHkgcmVjb2duaXplZCBhYmJyZXZpYXRpb25zLiBFeGFtcGxlOiBhaSwgdWlcblxuNi4gUHJvcGVyIG5vdW5zXG4tIFVzZSB0aGUgb2ZmaWNpYWwvZm9ybWFsIG5hbWUgZm9yIHBlb3BsZSwgb3JnYW5pemF0aW9ucywgYW5kIHBsYWNlcy5cblxuNy4gTWF4aW11bSA1IHRhZ3MgcGVyIG5vdGVcblxuOC4gRm9yYmlkZGVuIHRhZ3Ncbi0gRG8gbm90IHVzZSB0YWdzIHJlbGF0ZWQgdG86IFRPRE8sIFJPVVRJTkUgKGUuZy4gZGFpbHktcm91dGluZSksIEpPVVJOQUwsIFNUVURZLCBFWEVSQ0lTRVxuYDtcblxuY29uc3QgUkVBRE1FX1RFTVBMQVRFID0gYCMgRm9sZGVyIE5hbWVcblxuVGhpcyBmb2xkZXIgY29udGFpbnMgbm90ZXMgYWJvdXQgW3RvcGljXS5cblxuIyMgUHVycG9zZVxuRGVzY3JpYmUgd2hhdCBraW5kIG9mIGNvbnRlbnQgYmVsb25ncyBpbiB0aGlzIGZvbGRlciBzbyBBSSBjYW4gY2F0ZWdvcml6ZSBjbGlwcyBhdXRvbWF0aWNhbGx5LlxuXG4jIyBUYWdzXG4tIHRhZzFcbi0gdGFnMlxuYDtcblxudHlwZSBUYWJOYW1lID0gXCJiYXNpY1wiIHwgXCJwcm9cIiB8IFwiZ3VpZGVcIjtcblxuZXhwb3J0IGNsYXNzIEFJQ2hhdENsaXBTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogQUlDaGF0Q2xpcFBsdWdpbjtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBBSUNoYXRDbGlwUGx1Z2luKSB7XG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXQgbGFuZygpOiBQbHVnaW5MYW5nIHtcblx0XHRyZXR1cm4gdGhpcy5wbHVnaW4ubGFuZztcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblx0XHRjb25zdCBsID0gdGhpcy5sYW5nO1xuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cblx0XHQvLyBTaXRlIGxpbmsgKHRvcClcblx0XHRjb25zdCBsaW5rRWwgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1oZWFkZXItbGlua1wiIH0pO1xuXHRcdGxpbmtFbC5jcmVhdGVFbChcImFcIiwgeyB0ZXh0OiBcImFpY2hhdGNsaXAuY29tXCIsIGhyZWY6IFdFQl9VUkwgfSk7XG5cblx0XHQvLyBUYWIgaGVhZGVyXG5cdFx0Y29uc3QgdGFiSGVhZGVyID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtdGFiLWhlYWRlclwiIH0pO1xuXG5cdFx0Y29uc3QgYmFzaWNCdG4gPSB0YWJIZWFkZXIuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuXHRcdFx0dGV4dDogdChcInRhYi5iYXNpY1wiLCBsKSxcblx0XHRcdGNsczogXCJhaWNoYXRjbGlwLXRhYi1idXR0b24gaXMtYWN0aXZlXCIsXG5cdFx0fSk7XG5cblx0XHRjb25zdCBwcm9CdG4gPSB0YWJIZWFkZXIuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuXHRcdFx0Y2xzOiBcImFpY2hhdGNsaXAtdGFiLWJ1dHRvblwiLFxuXHRcdH0pO1xuXHRcdHByb0J0bi5hcHBlbmRUZXh0KGAke3QoXCJ0YWIucHJvXCIsIGwpfSBgKTtcblx0XHRwcm9CdG4uY3JlYXRlU3Bhbih7IHRleHQ6IFwiUHJvXCIsIGNsczogXCJhaWNoYXRjbGlwLXByby1iYWRnZVwiIH0pO1xuXG5cdFx0Y29uc3QgZ3VpZGVCdG4gPSB0YWJIZWFkZXIuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuXHRcdFx0dGV4dDogdChcInRhYi5ndWlkZVwiLCBsKSxcblx0XHRcdGNsczogXCJhaWNoYXRjbGlwLXRhYi1idXR0b25cIixcblx0XHR9KTtcblxuXHRcdC8vIFRhYiBjb250ZW50IGNvbnRhaW5lcnNcblx0XHRjb25zdCBiYXNpY1RhYiA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLXRhYi1jb250ZW50IGlzLWFjdGl2ZVwiIH0pO1xuXHRcdGNvbnN0IHByb1RhYiA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLXRhYi1jb250ZW50XCIgfSk7XG5cdFx0Y29uc3QgZ3VpZGVUYWIgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC10YWItY29udGVudFwiIH0pO1xuXG5cdFx0Y29uc3QgdGFiczogUmVjb3JkPFRhYk5hbWUsIHsgYnRuOiBIVE1MRWxlbWVudDsgY29udGVudDogSFRNTEVsZW1lbnQgfT4gPSB7XG5cdFx0XHRiYXNpYzogeyBidG46IGJhc2ljQnRuLCBjb250ZW50OiBiYXNpY1RhYiB9LFxuXHRcdFx0cHJvOiB7IGJ0bjogcHJvQnRuLCBjb250ZW50OiBwcm9UYWIgfSxcblx0XHRcdGd1aWRlOiB7IGJ0bjogZ3VpZGVCdG4sIGNvbnRlbnQ6IGd1aWRlVGFiIH0sXG5cdFx0fTtcblxuXHRcdGNvbnN0IHN3aXRjaFRhYiA9IChhY3RpdmU6IFRhYk5hbWUpID0+IHtcblx0XHRcdGZvciAoY29uc3QgW25hbWUsIHsgYnRuLCBjb250ZW50IH1dIG9mIE9iamVjdC5lbnRyaWVzKHRhYnMpKSB7XG5cdFx0XHRcdGNvbnN0IGlzQWN0aXZlID0gbmFtZSA9PT0gYWN0aXZlO1xuXHRcdFx0XHRidG4udG9nZ2xlQ2xhc3MoXCJpcy1hY3RpdmVcIiwgaXNBY3RpdmUpO1xuXHRcdFx0XHRjb250ZW50LnRvZ2dsZUNsYXNzKFwiaXMtYWN0aXZlXCIsIGlzQWN0aXZlKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YmFzaWNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHN3aXRjaFRhYihcImJhc2ljXCIpKTtcblx0XHRwcm9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHN3aXRjaFRhYihcInByb1wiKSk7XG5cdFx0Z3VpZGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHN3aXRjaFRhYihcImd1aWRlXCIpKTtcblxuXHRcdC8vID09PSBCYXNpYyBUYWIgPT09XG5cdFx0dGhpcy5yZW5kZXJCYXNpY1RhYihiYXNpY1RhYik7XG5cblx0XHQvLyA9PT0gUHJvIFRhYiA9PT1cblx0XHR0aGlzLnJlbmRlclByb1RhYihwcm9UYWIpO1xuXG5cdFx0Ly8gPT09IEd1aWRlIFRhYiA9PT1cblx0XHR0aGlzLnJlbmRlckd1aWRlVGFiKGd1aWRlVGFiKTtcblxuXHRcdC8vIEZvb3RlclxuXHRcdGNvbnN0IGZvb3RlciA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLWZvb3RlclwiIH0pO1xuXHRcdGZvb3Rlci5jcmVhdGVFbChcImFcIiwgeyB0ZXh0OiBcImFpY2hhdGNsaXAuY29tXCIsIGhyZWY6IFdFQl9VUkwgfSk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlckJhc2ljVGFiKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXHRcdGNvbnN0IGwgPSB0aGlzLmxhbmc7XG5cblx0XHQvLyBMYW5ndWFnZSBzZXR0aW5nICh0b3A6IHNvIHVzZXJzIGNhbiByZWFkIG90aGVyIGl0ZW1zIGluIHRoZWlyIGxhbmd1YWdlKVxuXHRcdG5ldyBTZXR0aW5nKGVsKVxuXHRcdFx0LnNldE5hbWUodChcImxhbmcubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJsYW5nLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG5cdFx0XHRcdGRyb3Bkb3duLmFkZE9wdGlvbnMoe1xuXHRcdFx0XHRcdGF1dG86IGAke3QoXCJsYW5nLmF1dG9cIiwgbCl9ICgke2RldGVjdExhbmcoKX0pYCxcblx0XHRcdFx0XHRlbjogXCJFbmdsaXNoXCIsXG5cdFx0XHRcdFx0amE6IFwiXHU2NUU1XHU2NzJDXHU4QTlFXCIsXG5cdFx0XHRcdFx0emg6IFwiXHU0RTJEXHU2NTg3XCIsXG5cdFx0XHRcdFx0a286IFwiXHVENTVDXHVBRDZEXHVDNUI0XCIsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRkcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5MYW5ndWFnZSk7XG5cdFx0XHRcdGRyb3Bkb3duLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpbkxhbmd1YWdlID0gdmFsdWUgYXMgXCJhdXRvXCIgfCBcImVuXCIgfCBcImphXCIgfCBcInpoXCIgfCBcImtvXCI7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHQvLyBBdXRoZW50aWNhdGlvblxuXHRcdGNvbnN0IGF1dGhTZXR0aW5nID0gbmV3IFNldHRpbmcoZWwpLnNldE5hbWUodChcImF1dGgubmFtZVwiLCBsKSk7XG5cdFx0aWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnRva2VuKSB7XG5cdFx0XHRhdXRoU2V0dGluZy5zZXREZXNjKHQoXCJhdXRoLmNvbm5lY3RlZFwiLCBsKSk7XG5cdFx0XHRhdXRoU2V0dGluZy5hZGRCdXR0b24oKGJ1dHRvbikgPT5cblx0XHRcdFx0YnV0dG9uLnNldEJ1dHRvblRleHQodChcImF1dGguc2lnbk91dFwiLCBsKSkub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc3luY1dzPy5kaXNjb25uZWN0KCk7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudG9rZW4gPSBcIlwiO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGF1dGhTZXR0aW5nLnNldERlc2ModChcImF1dGgubm90Q29ubmVjdGVkXCIsIGwpKTtcblx0XHRcdGF1dGhTZXR0aW5nLmFkZEJ1dHRvbigoYnV0dG9uKSA9PlxuXHRcdFx0XHRidXR0b24uc2V0QnV0dG9uVGV4dCh0KFwiYXV0aC5zaWduSW5cIiwgbCkpLnNldEN0YSgpLm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdHdpbmRvdy5vcGVuKGAke1dFQl9VUkx9L2F1dGgvb2JzaWRpYW5gKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8vIFdlYlNvY2tldCBzdGF0dXMgKGRlc2t0b3Agb25seSlcblx0XHRpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MudG9rZW4gJiYgUGxhdGZvcm0uaXNEZXNrdG9wKSB7XG5cdFx0XHRjb25zdCB3c0tleSA9IHRoaXMucGx1Z2luLndzQ29ubmVjdGVkID8gXCJ3cy5jb25uZWN0ZWRcIiA6IFwid3MuZGlzY29ubmVjdGVkXCI7XG5cdFx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdFx0LnNldE5hbWUodChcIndzLm5hbWVcIiwgbCkpXG5cdFx0XHRcdC5zZXREZXNjKHQod3NLZXksIGwpKTtcblx0XHR9XG5cblx0XHQvLyBEZXZpY2Ugc2V0dGluZ3Ncblx0XHRpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MudG9rZW4pIHtcblx0XHRcdG5ldyBTZXR0aW5nKGVsKVxuXHRcdFx0XHQuc2V0TmFtZSh0KFwiZGV2aWNlLm5hbWVcIiwgbCkpXG5cdFx0XHRcdC5zZXREZXNjKHQoXCJkZXZpY2UuZGVzY1wiLCBsKSlcblx0XHRcdFx0LmFkZEJ1dHRvbigoYnV0dG9uKSA9PlxuXHRcdFx0XHRcdGJ1dHRvbi5zZXRCdXR0b25UZXh0KHQoXCJkZXZpY2UubWFrZVByaW1hcnlcIiwgbCkpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgYXBpUGF0Y2godGhpcy5wbHVnaW4uc2V0dGluZ3MsIGAvYXBpL2RldmljZXMvJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZXZpY2VJZH0vcHJpbWFyeWApO1xuXHRcdFx0XHRcdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2UucHJpbWFyeVNldFwiLCBsKX1gKTtcblx0XHRcdFx0XHRcdFx0aWYgKFBsYXRmb3JtLmlzRGVza3RvcCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLmNvbm5lY3RXZWJTb2NrZXQoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5wcmltYXJ5RmFpbGVkXCIsIGwpfWApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHQpO1xuXHRcdH1cblxuXHRcdG5ldyBTZXR0aW5nKGVsKVxuXHRcdFx0LnNldE5hbWUodChcImF1dG9TeW5jLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwiYXV0b1N5bmMuZGVzY1wiLCBsKSlcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9TeW5jT25Mb2FkKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvU3luY09uTG9hZCA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHQvLyBTaG93IGZvcmVncm91bmQgc3luYyB0b2dnbGUgb25seSBvbiBtb2JpbGUgKGRlc2t0b3AgdXNlcyBXZWJTb2NrZXQpXG5cdFx0aWYgKFBsYXRmb3JtLmlzTW9iaWxlKSB7XG5cdFx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdFx0LnNldE5hbWUodChcInN5bmNPbkZvcmVncm91bmQubmFtZVwiLCBsKSlcblx0XHRcdFx0LnNldERlc2ModChcInN5bmNPbkZvcmVncm91bmQuZGVzY1wiLCBsKSlcblx0XHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuXHRcdFx0XHRcdHRvZ2dsZVxuXHRcdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN5bmNPbkZvcmVncm91bmQpXG5cdFx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnN5bmNPbkZvcmVncm91bmQgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHVwRm9yZWdyb3VuZFN5bmMoKTtcblx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHQpO1xuXHRcdH1cblxuXHRcdG5ldyBTZXR0aW5nKGVsKVxuXHRcdFx0LnNldE5hbWUodChcImluYm94Lm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwiaW5ib3guZGVzY1wiLCBsKSlcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKFwiQUlDaGF0Q2xpcC9pbmJveFwiKVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbmJveEZvbGRlcilcblx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbmJveEZvbGRlciA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwiZmlsZU5hbWUubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJmaWxlTmFtZS5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoXCJ7eXl5eX0te01NfS17ZGR9LXt0aXRsZX1cIilcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZU5hbWVUZW1wbGF0ZSlcblx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5maWxlTmFtZVRlbXBsYXRlID0gdmFsdWUgfHwgXCJ7eXl5eX0te01NfS17ZGR9LXt0aXRsZX1cIjtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGVsKVxuXHRcdFx0LnNldE5hbWUodChcInRpbWV6b25lLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwidGltZXpvbmUuZGVzY1wiLCBsKSlcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZSlcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGltZXpvbmUpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudGltZXpvbmUgPVxuXHRcdFx0XHRcdFx0XHR2YWx1ZSB8fCBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmU7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlclByb1RhYihlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblx0XHRjb25zdCBsID0gdGhpcy5sYW5nO1xuXHRcdGNvbnN0IGlzUHJvID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2FjaGVkVXNlclBsYW4gPT09IFwicHJvXCI7XG5cblx0XHQvLyBTaG93IGNvbXBhcmlzb24gdGFibGUgYW5kIENUQSBvbmx5IGZvciBmcmVlIHVzZXJzXG5cdFx0aWYgKCFpc1Bybykge1xuXHRcdFx0Y29uc3QgcGxhbkJveCA9IGVsLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLXBsYW4tYm94XCIgfSk7XG5cblx0XHRcdGNvbnN0IHRhYmxlID0gcGxhbkJveC5jcmVhdGVFbChcInRhYmxlXCIsIHsgY2xzOiBcImFpY2hhdGNsaXAtcGxhbi10YWJsZVwiIH0pO1xuXHRcdFx0Y29uc3QgdGhlYWQgPSB0YWJsZS5jcmVhdGVFbChcInRoZWFkXCIpO1xuXHRcdFx0Y29uc3QgaGVhZFJvdyA9IHRoZWFkLmNyZWF0ZUVsKFwidHJcIik7XG5cdFx0XHRoZWFkUm93LmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBcIlwiIH0pO1xuXHRcdFx0aGVhZFJvdy5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJGcmVlXCIgfSk7XG5cdFx0XHRoZWFkUm93LmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBcIlByb1wiIH0pO1xuXG5cdFx0XHRjb25zdCB0Ym9keSA9IHRhYmxlLmNyZWF0ZUVsKFwidGJvZHlcIik7XG5cdFx0XHRjb25zdCBmZWF0dXJlczogW3N0cmluZywgYm9vbGVhbiwgYm9vbGVhbl1bXSA9IFtcblx0XHRcdFx0W3QoXCJwcm8uZmVhdHVyZS5jbGlwVG9PYnNpZGlhblwiLCBsKSwgdHJ1ZSwgdHJ1ZV0sXG5cdFx0XHRcdFt0KFwicHJvLmZlYXR1cmUudW5saW1pdGVkQ2xpcHNcIiwgbCksIHRydWUsIHRydWVdLFxuXHRcdFx0XHRbdChcInByby5mZWF0dXJlLmF1dG9UYWdzXCIsIGwpLCBmYWxzZSwgdHJ1ZV0sXG5cdFx0XHRcdFt0KFwicHJvLmZlYXR1cmUuc3VtbWFyeVwiLCBsKSwgZmFsc2UsIHRydWVdLFxuXHRcdFx0XHRbdChcInByby5mZWF0dXJlLnNtYXJ0Rm9sZGVyXCIsIGwpLCBmYWxzZSwgdHJ1ZV0sXG5cdFx0XHRcdFt0KFwicHJvLmZlYXR1cmUud2Vla2x5RGlnZXN0XCIsIGwpLCBmYWxzZSwgdHJ1ZV0sXG5cdFx0XHRdO1xuXHRcdFx0Zm9yIChjb25zdCBbbmFtZSwgZnJlZSwgcHJvXSBvZiBmZWF0dXJlcykge1xuXHRcdFx0XHRjb25zdCByb3cgPSB0Ym9keS5jcmVhdGVFbChcInRyXCIpO1xuXHRcdFx0XHRyb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IG5hbWUgfSk7XG5cdFx0XHRcdHJvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogZnJlZSA/IFwiXFx1MjcxM1wiIDogXCJcXHUyMDE0XCIsIGNsczogZnJlZSA/IFwiYWljaGF0Y2xpcC1jaGVja1wiIDogXCJhaWNoYXRjbGlwLWRhc2hcIiB9KTtcblx0XHRcdFx0cm93LmNyZWF0ZUVsKFwidGRcIiwgeyB0ZXh0OiBwcm8gPyBcIlxcdTI3MTNcIiA6IFwiXFx1MjAxNFwiLCBjbHM6IHBybyA/IFwiYWljaGF0Y2xpcC1jaGVja1wiIDogXCJhaWNoYXRjbGlwLWRhc2hcIiB9KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY3RhID0gcGxhbkJveC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1wbGFuLWN0YVwiIH0pO1xuXHRcdFx0Y3RhLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHRcdHRleHQ6IHQoXCJwcm8uY3RhLnVwZ3JhZGVcIiwgbCksXG5cdFx0XHRcdGhyZWY6IGAke1dFQl9VUkx9L3ByaWNpbmdgLFxuXHRcdFx0XHRjbHM6IFwiYWljaGF0Y2xpcC1wbGFuLWxpbmtcIixcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBTZXBhcmF0b3Jcblx0XHRcdGVsLmNyZWF0ZUVsKFwiaHJcIiwgeyBjbHM6IFwiYWljaGF0Y2xpcC1zZXBhcmF0b3JcIiB9KTtcblx0XHR9XG5cblx0XHQvLyBIaWRlIFBybyBzZXR0aW5ncyBmb3IgZnJlZSB1c2VycyBcdTIwMTQgc2hvdyBvbmx5IGNvbXBhcmlzb24gdGFibGUgKyBDVEFcblx0XHRpZiAoIWlzUHJvKSByZXR1cm47XG5cblx0XHRlbC5jcmVhdGVFbChcInBcIiwge1xuXHRcdFx0dGV4dDogdChcInByby5mb2xkZXJEZXNjXCIsIGwpLFxuXHRcdFx0Y2xzOiBcInNldHRpbmctaXRlbS1kZXNjcmlwdGlvblwiLFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZG9jc0xpbmtFbCA9IGVsLmNyZWF0ZUVsKFwicFwiLCB7IGNsczogXCJzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb25cIiB9KTtcblx0XHRkb2NzTGlua0VsLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHR0ZXh0OiB0KFwicHJvLmZvbGRlckRvY3NMaW5rXCIsIGwpLFxuXHRcdFx0aHJlZjogYCR7V0VCX1VSTH0vZG9jcy9tYXJrZXItZmlsZXNgLFxuXHRcdH0pO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwicHJvLmF1dG9TY2FuLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwicHJvLmF1dG9TY2FuLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvU2NhbkZvbGRlcnMpLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9TY2FuRm9sZGVycyA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJwcm8uc2NhblJvb3QubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJwcm8uc2NhblJvb3QuZGVzY1wiLCBsKSlcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKHQoXCJwcm8uc2NhblJvb3QucGxhY2Vob2xkZXJcIiwgbCkpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNjYW5Sb290KVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNjYW5Sb290ID0gdmFsdWU7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJwcm8ubWFya2VyLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwicHJvLm1hcmtlci5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoXCJSRUFETUVcIilcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubWFya2VyRmlsZW5hbWUpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFya2VyRmlsZW5hbWUgPSB2YWx1ZSB8fCBcIlJFQURNRVwiO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwicHJvLnNjYW5Ob3cubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJwcm8uc2Nhbk5vdy5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZEJ1dHRvbigoYnV0dG9uKSA9PlxuXHRcdFx0XHRidXR0b24uc2V0QnV0dG9uVGV4dCh0KFwicHJvLnNjYW5Ob3cuYnV0dG9uXCIsIGwpKS5zZXRDdGEoKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAoIXRoaXMucGx1Z2luLnNldHRpbmdzLnRva2VuKSB7XG5cdFx0XHRcdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2Uuc2lnbkluRmlyc3RcIiwgbCl9YCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBmb2xkZXJzID0gYXdhaXQgc2NhbkZvbGRlcnMoXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXBwLFxuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY2FuUm9vdCxcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFya2VyRmlsZW5hbWUsXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKGZvbGRlcnMpIHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgc3luY0ZvbGRlcnNUb0FwaSh0aGlzLnBsdWdpbi5zZXR0aW5ncywgZm9sZGVycyk7XG5cdFx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dFJlcGxhY2UoXCJub3RpY2UuZm9sZGVyc1N5bmNlZFwiLCBsLCB7IGNvdW50OiBmb2xkZXJzLmxlbmd0aCB9KX1gKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5mb2xkZXJzU3luY2VkXCIsIGwpfWApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1zZyA9IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IFN0cmluZyhlKTtcblx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dFJlcGxhY2UoXCJub3RpY2UuZm9sZGVyU2NhbkZhaWxlZFwiLCBsLCB7IG1zZyB9KX1gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGVsKVxuXHRcdFx0LnNldE5hbWUodChcInByby5yZWFkbWUubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJwcm8ucmVhZG1lLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkQnV0dG9uKChidXR0b24pID0+XG5cdFx0XHRcdGJ1dHRvbi5zZXRCdXR0b25UZXh0KHQoXCJwcm8ucmVhZG1lLmJ1dHRvblwiLCBsKSkub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoUkVBRE1FX1RFTVBMQVRFKTtcblx0XHRcdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2UucmVhZG1lQ29waWVkXCIsIGwpfWApO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJwcm8uZm9sZGVyTWFuYWdlci5uYW1lXCIsIGwpKVxuXHRcdFx0LnNldERlc2ModChcInByby5mb2xkZXJNYW5hZ2VyLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkQnV0dG9uKChidXR0b24pID0+XG5cdFx0XHRcdGJ1dHRvblxuXHRcdFx0XHRcdC5zZXRCdXR0b25UZXh0KHQoXCJwcm8uZm9sZGVyTWFuYWdlci5idXR0b25cIiwgbCkpXG5cdFx0XHRcdFx0LnNldEN0YSgpXG5cdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdFx0bmV3IEZvbGRlck1hbmFnZXJNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4uc2V0dGluZ3MsIGwsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0Ly8gUmVmcmVzaCBhZnRlciBtb2RhbCBjb21wbGV0ZXNcblx0XHRcdFx0XHRcdH0pLm9wZW4oKTtcblx0XHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHQvLyBTZXBhcmF0b3Jcblx0XHRlbC5jcmVhdGVFbChcImhyXCIsIHsgY2xzOiBcImFpY2hhdGNsaXAtc2VwYXJhdG9yXCIgfSk7XG5cblx0XHRuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSh0KFwicHJvLmFpQ3VzdG9taXphdGlvblwiLCBsKSkuc2V0SGVhZGluZygpO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwicHJvLnRpdGxlTGFuZy5uYW1lXCIsIGwpKVxuXHRcdFx0LnNldERlc2ModChcInByby50aXRsZUxhbmcuZGVzY1wiLCBsKSlcblx0XHRcdC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcblx0XHRcdFx0ZHJvcGRvd24uYWRkT3B0aW9ucyh7XG5cdFx0XHRcdFx0YXV0bzogdChcInRpdGxlTGFuZy5hdXRvXCIsIGwpLFxuXHRcdFx0XHRcdGVuOiBcIkVuZ2xpc2hcIixcblx0XHRcdFx0XHRqYTogXCJcdTY1RTVcdTY3MkNcdThBOUVcIixcblx0XHRcdFx0XHR6aDogXCJcdTRFMkRcdTY1ODdcIixcblx0XHRcdFx0XHRrbzogXCJcdUQ1NUNcdUFENkRcdUM1QjRcIixcblx0XHRcdFx0XHRlczogXCJFc3BhXHUwMEYxb2xcIixcblx0XHRcdFx0XHRmcjogXCJGcmFuXHUwMEU3YWlzXCIsXG5cdFx0XHRcdFx0ZGU6IFwiRGV1dHNjaFwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0Ly8gTG9hZCBjdXJyZW50IHZhbHVlIGZyb20gQVBJXG5cdFx0XHRcdHZvaWQgdGhpcy5sb2FkTGFuZ3VhZ2VTZXR0aW5nKGRyb3Bkb3duKTtcblx0XHRcdFx0ZHJvcGRvd24ub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5zYXZlUHJlZmVyZW5jZSh7IGZpbGVOYW1lTGFuZ3VhZ2U6IHZhbHVlIH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0bGV0IHVwZGF0ZUNyZWF0ZUJ0bjogKCkgPT4gdm9pZDtcblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJwcm8udGFnUnVsZS5uYW1lXCIsIGwpKVxuXHRcdFx0LnNldERlc2ModChcInByby50YWdSdWxlLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkVGV4dCgodGV4dCkgPT5cblx0XHRcdFx0dGV4dFxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcihcIlRhZyBydWxlXCIpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRhZ1J1bGVQYXRoKVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRhZ1J1bGVQYXRoID0gdmFsdWUgfHwgXCJUYWdSdWxlXCI7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHRcdHVwZGF0ZUNyZWF0ZUJ0bigpO1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0KVxuXHRcdFx0LmFkZEJ1dHRvbigoYnRuKSA9PiB7XG5cdFx0XHRcdHVwZGF0ZUNyZWF0ZUJ0biA9ICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBwYXRoID0gYCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MudGFnUnVsZVBhdGh9Lm1kYDtcblx0XHRcdFx0XHRjb25zdCBleGlzdHMgPSAhIXRoaXMuYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgocGF0aCk7XG5cdFx0XHRcdFx0YnRuLnNldERpc2FibGVkKGV4aXN0cyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGJ0bi5zZXRCdXR0b25UZXh0KHQoXCJwcm8udGFnUnVsZS5jcmVhdGVcIiwgbCkpXG5cdFx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGF0aCA9IGAke3RoaXMucGx1Z2luLnNldHRpbmdzLnRhZ1J1bGVQYXRofS5tZGA7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hcHAudmF1bHQuZ2V0RmlsZUJ5UGF0aChwYXRoKSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlKHBhdGgsIERFRkFVTFRfVEFHX1JVTEVfVEVNUExBVEUpO1xuXHRcdFx0XHRcdFx0bmV3IE5vdGljZSh0KFwicHJvLnRhZ1J1bGUuY3JlYXRlZFwiLCBsKSk7XG5cdFx0XHRcdFx0XHRidG4uc2V0RGlzYWJsZWQodHJ1ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdHVwZGF0ZUNyZWF0ZUJ0bigpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlckd1aWRlVGFiKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXHRcdGNvbnN0IGwgPSB0aGlzLmxhbmc7XG5cblx0XHRuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSh0KFwiZ3VpZGUudGl0bGVcIiwgbCkpLnNldEhlYWRpbmcoKTtcblxuXHRcdGNvbnN0IHN0ZXBzID0gZWwuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtZ3VpZGUtc3RlcHNcIiB9KTtcblxuXHRcdGZvciAoY29uc3QgaSBvZiBbMSwgMiwgM10gYXMgY29uc3QpIHtcblx0XHRcdGNvbnN0IHN0ZXAgPSBzdGVwcy5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1ndWlkZS1zdGVwXCIgfSk7XG5cdFx0XHRjb25zdCBudW0gPSBzdGVwLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLWd1aWRlLXN0ZXAtbnVtXCIgfSk7XG5cdFx0XHRudW0uc2V0VGV4dChTdHJpbmcoaSkpO1xuXHRcdFx0Y29uc3QgY29udGVudCA9IHN0ZXAuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtZ3VpZGUtc3RlcC1jb250ZW50XCIgfSk7XG5cdFx0XHRuZXcgU2V0dGluZyhjb250ZW50KS5zZXROYW1lKHQoYGd1aWRlLnN0ZXAke2l9LnRpdGxlYCwgbCkpLnNldEhlYWRpbmcoKTtcblx0XHRcdGNvbnRlbnQuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdChgZ3VpZGUuc3RlcCR7aX0uZGVzY2AsIGwpIH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRvY3NMaW5rID0gZWwuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtZ3VpZGUtZG9jc1wiIH0pO1xuXHRcdGRvY3NMaW5rLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHR0ZXh0OiB0KFwiZ3VpZGUuZG9jc0xpbmtcIiwgbCksXG5cdFx0XHRocmVmOiBgJHtXRUJfVVJMfS9kb2NzYCxcblx0XHRcdGNsczogXCJhaWNoYXRjbGlwLWd1aWRlLWRvY3MtbGlua1wiLFxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBsb2FkTGFuZ3VhZ2VTZXR0aW5nKGRyb3Bkb3duOiBpbXBvcnQoXCJvYnNpZGlhblwiKS5Ecm9wZG93bkNvbXBvbmVudCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICghdGhpcy5wbHVnaW4uc2V0dGluZ3MudG9rZW4pIHJldHVybjtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgYXBpR2V0KHRoaXMucGx1Z2luLnNldHRpbmdzLCBcIi9hcGkvcHJlZmVyZW5jZXNcIik7XG5cdFx0XHRpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSByZXMuanNvbiBhcyB7IGZpbGVOYW1lTGFuZ3VhZ2U/OiBzdHJpbmcgfTtcblx0XHRcdFx0aWYgKGRhdGEuZmlsZU5hbWVMYW5ndWFnZSkge1xuXHRcdFx0XHRcdGRyb3Bkb3duLnNldFZhbHVlKGRhdGEuZmlsZU5hbWVMYW5ndWFnZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGNhdGNoIHtcblx0XHRcdC8vIGlnbm9yZVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgc2F2ZVByZWZlcmVuY2UoYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBsID0gdGhpcy5sYW5nO1xuXHRcdGlmICghdGhpcy5wbHVnaW4uc2V0dGluZ3MudG9rZW4pIHtcblx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5zaWduSW5GaXJzdFwiLCBsKX1gKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IGFwaVB1dCh0aGlzLnBsdWdpbi5zZXR0aW5ncywgXCIvYXBpL3ByZWZlcmVuY2VzXCIsIGJvZHkpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0KFwibm90aWNlLnByZWZGYWlsZWRcIiwgbCl9YCk7XG5cdFx0fVxuXHR9XG59XG4iLCAiLyoqIFZhdWx0IGZvbGRlciBzY2FubmluZyBhbmQgc2VydmVyIHN5bmNocm9uaXphdGlvbiBmb3Igc21hcnQgZm9sZGVyIHBsYWNlbWVudCAqL1xuaW1wb3J0IHsgdHlwZSBBcHAsIFRGb2xkZXIgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGFwaVB1dCB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHR5cGUgeyBBSUNoYXRDbGlwU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvbGRlckVudHJ5IHtcblx0cGF0aDogc3RyaW5nO1xuXHRkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5jb25zdCBFWENMVURFRF9GT0xERVJfUFJFRklYRVMgPSBbXCJub2RlX21vZHVsZXNcIl07XG5cbmZ1bmN0aW9uIGlzRXhjbHVkZWRGb2xkZXIoYXBwOiBBcHAsIHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRjb25zdCBmaXJzdCA9IHBhdGguc3BsaXQoXCIvXCIpWzBdO1xuXHRpZiAoZmlyc3QgPT09IGFwcC52YXVsdC5jb25maWdEaXIpIHJldHVybiB0cnVlO1xuXHRyZXR1cm4gZmlyc3Quc3RhcnRzV2l0aChcIi5cIikgfHwgRVhDTFVERURfRk9MREVSX1BSRUZJWEVTLmluY2x1ZGVzKGZpcnN0KTtcbn1cblxuLyoqIEdldCBhbGwgdmF1bHQgZm9sZGVycyB1bmRlciBzY2FuUm9vdCwgZXhjbHVkaW5nIGhpZGRlbi9zeXN0ZW0gZm9sZGVycyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFZhdWx0Rm9sZGVycyhhcHA6IEFwcCwgc2NhblJvb3Q6IHN0cmluZyk6IFRGb2xkZXJbXSB7XG5cdGNvbnN0IHJvb3QgPSBzY2FuUm9vdFxuXHRcdD8gYXBwLnZhdWx0LmdldEZvbGRlckJ5UGF0aChzY2FuUm9vdClcblx0XHQ6IGFwcC52YXVsdC5nZXRSb290KCk7XG5cdGlmICghcm9vdCkgcmV0dXJuIFtdO1xuXG5cdGNvbnN0IHJlc3VsdDogVEZvbGRlcltdID0gW107XG5cdGNvbnN0IGNvbGxlY3QgPSAoZm9sZGVyOiBURm9sZGVyKSA9PiB7XG5cdFx0Zm9yIChjb25zdCBjaGlsZCBvZiBmb2xkZXIuY2hpbGRyZW4pIHtcblx0XHRcdGlmICghKGNoaWxkIGluc3RhbmNlb2YgVEZvbGRlcikpIGNvbnRpbnVlO1xuXHRcdFx0aWYgKCFpc0V4Y2x1ZGVkRm9sZGVyKGFwcCwgY2hpbGQucGF0aCkpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHRjb2xsZWN0KGNoaWxkKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdGNvbGxlY3Qocm9vdCk7XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBSZWFkIGV4aXN0aW5nIG1hcmtlciBmaWxlIGNvbnRlbnQsIG9yIG51bGwgaWYgbm90IGZvdW5kICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RXhpc3RpbmdNYXJrZXJDb250ZW50KFxuXHRhcHA6IEFwcCxcblx0Zm9sZGVyUGF0aDogc3RyaW5nLFxuXHRtYXJrZXJGaWxlbmFtZTogc3RyaW5nLFxuKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG5cdGNvbnN0IHN0ZW0gPSBtYXJrZXJGaWxlbmFtZSB8fCBcIlJFQURNRVwiO1xuXHRjb25zdCBleHQgPSBzdGVtLmluY2x1ZGVzKFwiLlwiKSA/IFwiXCIgOiBcIi5tZFwiO1xuXHRjb25zdCBmaWxlUGF0aCA9IGAke2ZvbGRlclBhdGh9LyR7c3RlbX0ke2V4dH1gO1xuXHRjb25zdCBmaWxlID0gYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuXHRpZiAoIWZpbGUpIHJldHVybiBudWxsO1xuXHRyZXR1cm4gYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG59XG5cbi8qKiBHZXQgZm9sZGVyIHBhdGhzIHRoYXQgaGF2ZSBhIG1hcmtlciBmaWxlIChmb3IgZGVsZXRlIG1vZGUpICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9sZGVyc1dpdGhNYXJrZXIoXG5cdGFwcDogQXBwLFxuXHRzY2FuUm9vdDogc3RyaW5nLFxuXHRtYXJrZXJGaWxlbmFtZTogc3RyaW5nLFxuKTogeyBmb2xkZXJQYXRoOiBzdHJpbmc7IG1hcmtlclBhdGg6IHN0cmluZyB9W10ge1xuXHRjb25zdCBtYXJrZXIgPSBtYXJrZXJGaWxlbmFtZSB8fCBcIlJFQURNRVwiO1xuXHRjb25zdCBtYXJrZXJGaWxlcyA9IGFwcC52YXVsdC5nZXRGaWxlcygpLmZpbHRlcigoZikgPT4ge1xuXHRcdGlmIChmLmJhc2VuYW1lICE9PSBtYXJrZXIpIHJldHVybiBmYWxzZTtcblx0XHRpZiAoc2NhblJvb3QgPT09IFwiXCIpIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBmLnBhdGguc3RhcnRzV2l0aChgJHtzY2FuUm9vdH0vYCk7XG5cdH0pO1xuXHRyZXR1cm4gbWFya2VyRmlsZXNcblx0XHQuZmlsdGVyKChmKSA9PiBmLnBhcmVudClcblx0XHQubWFwKChmKSA9PiAoeyBmb2xkZXJQYXRoOiBmLnBhcmVudCEucGF0aCwgbWFya2VyUGF0aDogZi5wYXRoIH0pKTtcbn1cblxubGV0IGxhc3RGb2xkZXJzTXRpbWUgPSAwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2NhbkZvbGRlcnMoXG5cdGFwcDogQXBwLFxuXHRzY2FuUm9vdDogc3RyaW5nLFxuXHRtYXJrZXJGaWxlbmFtZTogc3RyaW5nLFxuKTogUHJvbWlzZTxGb2xkZXJFbnRyeVtdIHwgbnVsbD4ge1xuXHRjb25zdCBtYXJrZXIgPSBtYXJrZXJGaWxlbmFtZSB8fCBcIlJFQURNRVwiO1xuXG5cdGNvbnN0IG1hcmtlckZpbGVzID0gYXBwLnZhdWx0XG5cdFx0LmdldEZpbGVzKClcblx0XHQuZmlsdGVyKChmKSA9PiB7XG5cdFx0XHRpZiAoZi5iYXNlbmFtZSAhPT0gbWFya2VyKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRpZiAoc2NhblJvb3QgPT09IFwiXCIpIHJldHVybiB0cnVlO1xuXHRcdFx0cmV0dXJuIGYucGF0aC5zdGFydHNXaXRoKGAke3NjYW5Sb290fS9gKTtcblx0XHR9KTtcblxuXHRjb25zdCBtYXhNdGltZSA9IG1hcmtlckZpbGVzLnJlZHVjZSgobWF4LCBmKSA9PiBNYXRoLm1heChtYXgsIGYuc3RhdC5tdGltZSksIDApO1xuXHRpZiAobWF4TXRpbWUgPiAwICYmIG1heE10aW1lID09PSBsYXN0Rm9sZGVyc010aW1lKSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCBlbnRyaWVzOiBGb2xkZXJFbnRyeVtdID0gW107XG5cdGZvciAoY29uc3QgZmlsZSBvZiBtYXJrZXJGaWxlcykge1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTtcblx0XHRjb25zdCBkaXIgPSBmaWxlLnBhcmVudD8ucGF0aDtcblx0XHRpZiAoIWRpcikgY29udGludWU7XG5cblx0XHRjb25zdCByZWxhdGl2ZVBhdGggPVxuXHRcdFx0c2NhblJvb3QgPT09IFwiXCJcblx0XHRcdFx0PyBkaXJcblx0XHRcdFx0OiBkaXIuc3RhcnRzV2l0aChgJHtzY2FuUm9vdH0vYClcblx0XHRcdFx0XHQ/IGRpci5zbGljZShzY2FuUm9vdC5sZW5ndGggKyAxKVxuXHRcdFx0XHRcdDogZGlyO1xuXG5cdFx0aWYgKHJlbGF0aXZlUGF0aCkge1xuXHRcdFx0ZW50cmllcy5wdXNoKHsgcGF0aDogcmVsYXRpdmVQYXRoLCBkZXNjcmlwdGlvbjogY29udGVudC5zbGljZSgwLCAzMDAwKSB9KTtcblx0XHR9XG5cdH1cblxuXHRsYXN0Rm9sZGVyc010aW1lID0gbWF4TXRpbWU7XG5cdHJldHVybiBlbnRyaWVzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY0ZvbGRlcnNUb0FwaShcblx0c2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncyxcblx0Zm9sZGVyczogRm9sZGVyRW50cnlbXSxcbik6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCByZXMgPSBhd2FpdCBhcGlQdXQoc2V0dGluZ3MsIFwiL2FwaS9mb2xkZXJzXCIsIHsgZm9sZGVycyB9KTtcblx0aWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHN5bmMgZm9sZGVyczogJHtyZXMuc3RhdHVzfWApO1xuXHR9XG59XG4iLCAiLyoqIEZvbGRlciBNYW5hZ2VyIE1vZGFsIFx1MjAxNCBidWxrIGNyZWF0ZS9kZWxldGUgbWFya2VyIGZpbGVzIHdpdGggQUkgZGVzY3JpcHRpb24gZ2VuZXJhdGlvbiAqL1xuaW1wb3J0IHsgdHlwZSBBcHAsIHR5cGUgQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBhcGlQb3N0IH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQge1xuXHRnZXRFeGlzdGluZ01hcmtlckNvbnRlbnQsXG5cdGdldEZvbGRlcnNXaXRoTWFya2VyLFxuXHRnZXRWYXVsdEZvbGRlcnMsXG5cdHNjYW5Gb2xkZXJzLFxuXHRzeW5jRm9sZGVyc1RvQXBpLFxufSBmcm9tIFwiLi9mb2xkZXJzXCI7XG5pbXBvcnQgeyB0eXBlIFBsdWdpbkxhbmcsIHQsIHRSZXBsYWNlIH0gZnJvbSBcIi4vaTE4blwiO1xuaW1wb3J0IHR5cGUgeyBBSUNoYXRDbGlwU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG50eXBlIFRhYk1vZGUgPSBcImNyZWF0ZVwiIHwgXCJkZWxldGVcIjtcblxuaW50ZXJmYWNlIEZvbGRlclN0YXRlIHtcblx0c2VsZWN0ZWQ6IGJvb2xlYW47XG5cdGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cdGhhc0V4aXN0aW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRm9sZGVyTWFuYWdlck1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXHRwcml2YXRlIHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3M7XG5cdHByaXZhdGUgbGFuZzogUGx1Z2luTGFuZztcblx0cHJpdmF0ZSBvbkNvbXBsZXRlOiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuXHRwcml2YXRlIG1vZGU6IFRhYk1vZGUgPSBcImNyZWF0ZVwiO1xuXHRwcml2YXRlIGZvbGRlclN0YXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBGb2xkZXJTdGF0ZT4oKTtcblx0cHJpdmF0ZSBkZWxldGVJdGVtczogeyBmb2xkZXJQYXRoOiBzdHJpbmc7IG1hcmtlclBhdGg6IHN0cmluZzsgc2VsZWN0ZWQ6IGJvb2xlYW4gfVtdID0gW107XG5cdHByaXZhdGUgZGVzY3JpcHRpb25MYW5ndWFnZSA9IFwiYXV0b1wiO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGFwcDogQXBwLFxuXHRcdHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsXG5cdFx0bGFuZzogUGx1Z2luTGFuZyxcblx0XHRvbkNvbXBsZXRlOiAoKSA9PiBQcm9taXNlPHZvaWQ+LFxuXHQpIHtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHR0aGlzLmxhbmcgPSBsYW5nO1xuXHRcdHRoaXMub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XG5cdH1cblxuXHRhc3luYyBvbk9wZW4oKSB7XG5cdFx0dGhpcy5tb2RhbEVsLmFkZENsYXNzKFwiYWljaGF0Y2xpcC1mb2xkZXItbW9kYWxcIik7XG5cdFx0YXdhaXQgdGhpcy5yZW5kZXIoKTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0dGhpcy5jb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgcmVuZGVyKCkge1xuXHRcdGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuXHRcdGNvbnN0IGwgPSB0aGlzLmxhbmc7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cblx0XHQvLyBUaXRsZVxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogdChcIm1vZGFsLnRpdGxlXCIsIGwpIH0pO1xuXG5cdFx0Ly8gVGFiIGhlYWRlclxuXHRcdGNvbnN0IHRhYkJhciA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1tb2RhbC10YWJzXCIgfSk7XG5cdFx0Y29uc3QgY3JlYXRlVGFiID0gdGFiQmFyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcblx0XHRcdHRleHQ6IHQoXCJtb2RhbC50YWJDcmVhdGVcIiwgbCksXG5cdFx0XHRjbHM6IGBhaWNoYXRjbGlwLW1vZGFsLXRhYiR7dGhpcy5tb2RlID09PSBcImNyZWF0ZVwiID8gXCIgaXMtYWN0aXZlXCIgOiBcIlwifWAsXG5cdFx0fSk7XG5cdFx0Y29uc3QgZGVsZXRlVGFiID0gdGFiQmFyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcblx0XHRcdHRleHQ6IHQoXCJtb2RhbC50YWJEZWxldGVcIiwgbCksXG5cdFx0XHRjbHM6IGBhaWNoYXRjbGlwLW1vZGFsLXRhYiR7dGhpcy5tb2RlID09PSBcImRlbGV0ZVwiID8gXCIgaXMtYWN0aXZlXCIgOiBcIlwifWAsXG5cdFx0fSk7XG5cblx0XHRjcmVhdGVUYWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRoaXMubW9kZSA9IFwiY3JlYXRlXCI7XG5cdFx0XHR2b2lkIHRoaXMucmVuZGVyKCk7XG5cdFx0fSk7XG5cdFx0ZGVsZXRlVGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHR0aGlzLm1vZGUgPSBcImRlbGV0ZVwiO1xuXHRcdFx0dm9pZCB0aGlzLnJlbmRlcigpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMubW9kZSA9PT0gXCJjcmVhdGVcIikge1xuXHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJDcmVhdGVNb2RlKGNvbnRlbnRFbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGF3YWl0IHRoaXMucmVuZGVyRGVsZXRlTW9kZShjb250ZW50RWwpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgcmVuZGVyQ3JlYXRlTW9kZShjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG5cdFx0Y29uc3QgbCA9IHRoaXMubGFuZztcblx0XHRjb25zdCB7IHNjYW5Sb290LCBtYXJrZXJGaWxlbmFtZSB9ID0gdGhpcy5zZXR0aW5ncztcblx0XHRjb25zdCBtYXJrZXIgPSBtYXJrZXJGaWxlbmFtZSB8fCBcIlJFQURNRVwiO1xuXG5cdFx0Ly8gTGFuZ3VhZ2UgZHJvcGRvd25cblx0XHRjb25zdCBsYW5nUm93ID0gY29udGFpbmVyLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLW1vZGFsLWFjdGlvbnNcIiB9KTtcblx0XHRjb25zdCBsYW5nTGFiZWwgPSBsYW5nUm93LmNyZWF0ZUVsKFwibGFiZWxcIiwgeyB0ZXh0OiB0KFwibW9kYWwuZGVzY0xhbmd1YWdlXCIsIGwpIH0pO1xuXHRcdGNvbnN0IGxhbmdTZWxlY3QgPSBsYW5nTGFiZWwuY3JlYXRlRWwoXCJzZWxlY3RcIik7XG5cdFx0Zm9yIChjb25zdCBbdmFsLCBsYWJlbF0gb2YgW1xuXHRcdFx0W1wiYXV0b1wiLCB0KFwibGFuZy5hdXRvXCIsIGwpXSxcblx0XHRcdFtcImVuXCIsIFwiRW5nbGlzaFwiXSxcblx0XHRcdFtcImphXCIsIFwiXHU2NUU1XHU2NzJDXHU4QTlFXCJdLFxuXHRcdFx0W1wiemhcIiwgXCJcdTRFMkRcdTY1ODdcIl0sXG5cdFx0XHRbXCJrb1wiLCBcIlx1RDU1Q1x1QUQ2RFx1QzVCNFwiXSxcblx0XHRcdFtcImVzXCIsIFwiRXNwYVx1MDBGMW9sXCJdLFxuXHRcdFx0W1wiZnJcIiwgXCJGcmFuXHUwMEU3YWlzXCJdLFxuXHRcdFx0W1wiZGVcIiwgXCJEZXV0c2NoXCJdLFxuXHRcdF0pIHtcblx0XHRcdGNvbnN0IG9wdCA9IGxhbmdTZWxlY3QuY3JlYXRlRWwoXCJvcHRpb25cIiwgeyB0ZXh0OiBsYWJlbCwgdmFsdWU6IHZhbCB9KTtcblx0XHRcdGlmICh2YWwgPT09IHRoaXMuZGVzY3JpcHRpb25MYW5ndWFnZSkgb3B0LnNlbGVjdGVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0bGFuZ1NlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25MYW5ndWFnZSA9IGxhbmdTZWxlY3QudmFsdWU7XG5cdFx0fSk7XG5cblx0XHQvLyBTZWxlY3QgYWxsIC8gZGVzZWxlY3QgYWxsXG5cdFx0Y29uc3QgdG9vbGJhciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1tb2RhbC1hY3Rpb25zXCIgfSk7XG5cdFx0Y29uc3Qgc2VsZWN0QWxsQnRuID0gdG9vbGJhci5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IHQoXCJtb2RhbC5zZWxlY3RBbGxcIiwgbCkgfSk7XG5cdFx0Y29uc3QgZGVzZWxlY3RBbGxCdG4gPSB0b29sYmFyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogdChcIm1vZGFsLmRlc2VsZWN0QWxsXCIsIGwpIH0pO1xuXG5cdFx0Ly8gQnVpbGQgZm9sZGVyIGxpc3Rcblx0XHRjb25zdCBmb2xkZXJzID0gZ2V0VmF1bHRGb2xkZXJzKHRoaXMuYXBwLCBzY2FuUm9vdCk7XG5cdFx0aWYgKGZvbGRlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRjb250YWluZXIuY3JlYXRlRWwoXCJwXCIsIHtcblx0XHRcdFx0dGV4dDogdChcIm1vZGFsLm5vRm9sZGVyc1wiLCBsKSxcblx0XHRcdFx0Y2xzOiBcImFpY2hhdGNsaXAtbW9kYWwtZW1wdHlcIixcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEluaXRpYWxpemUgc3RhdGVzIGZvciBmb2xkZXJzIG5vdCB5ZXQgdHJhY2tlZFxuXHRcdGZvciAoY29uc3QgZm9sZGVyIG9mIGZvbGRlcnMpIHtcblx0XHRcdGlmICghdGhpcy5mb2xkZXJTdGF0ZXMuaGFzKGZvbGRlci5wYXRoKSkge1xuXHRcdFx0XHRjb25zdCBleGlzdGluZyA9IGF3YWl0IGdldEV4aXN0aW5nTWFya2VyQ29udGVudCh0aGlzLmFwcCwgZm9sZGVyLnBhdGgsIG1hcmtlcik7XG5cdFx0XHRcdGNvbnN0IGZvbGRlclRpdGxlID0gZm9sZGVyLnBhdGguc3BsaXQoXCIvXCIpLnBvcCgpID8/IGZvbGRlci5wYXRoO1xuXHRcdFx0XHRjb25zdCBkZWZhdWx0RGVzYyA9IGAjICR7Zm9sZGVyVGl0bGV9XFxuXFxuYDtcblx0XHRcdFx0dGhpcy5mb2xkZXJTdGF0ZXMuc2V0KGZvbGRlci5wYXRoLCB7XG5cdFx0XHRcdFx0c2VsZWN0ZWQ6IGV4aXN0aW5nICE9PSBudWxsLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBleGlzdGluZyA/PyBkZWZhdWx0RGVzYyxcblx0XHRcdFx0XHRoYXNFeGlzdGluZzogZXhpc3RpbmcgIT09IG51bGwsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGxpc3RFbCA9IGNvbnRhaW5lci5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1mb2xkZXItbGlzdFwiIH0pO1xuXG5cdFx0Zm9yIChjb25zdCBmb2xkZXIgb2YgZm9sZGVycykge1xuXHRcdFx0Y29uc3Qgc3RhdGUgPSB0aGlzLmZvbGRlclN0YXRlcy5nZXQoZm9sZGVyLnBhdGgpITtcblx0XHRcdGNvbnN0IGl0ZW0gPSBsaXN0RWwuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtZm9sZGVyLWl0ZW1cIiB9KTtcblxuXHRcdFx0Ly8gQ2hlY2tib3ggKyBmb2xkZXIgbmFtZVxuXHRcdFx0Y29uc3QgaGVhZGVyID0gaXRlbS5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1mb2xkZXItaXRlbS1oZWFkZXJcIiB9KTtcblx0XHRcdGNvbnN0IGNoZWNrYm94ID0gaGVhZGVyLmNyZWF0ZUVsKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIgfSk7XG5cdFx0XHRjaGVja2JveC5jaGVja2VkID0gc3RhdGUuc2VsZWN0ZWQ7XG5cdFx0XHRjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcblx0XHRcdFx0c3RhdGUuc2VsZWN0ZWQgPSBjaGVja2JveC5jaGVja2VkO1xuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IGxhYmVsID0gaGVhZGVyLmNyZWF0ZUVsKFwic3BhblwiLCB7IHRleHQ6IGZvbGRlci5wYXRoLCBjbHM6IFwiYWljaGF0Y2xpcC1mb2xkZXItbmFtZVwiIH0pO1xuXHRcdFx0aWYgKHN0YXRlLmhhc0V4aXN0aW5nKSB7XG5cdFx0XHRcdGxhYmVsLmNyZWF0ZUVsKFwic3BhblwiLCB7XG5cdFx0XHRcdFx0dGV4dDogdChcIm1vZGFsLmV4aXN0aW5nTWFya2VyXCIsIGwpLFxuXHRcdFx0XHRcdGNsczogXCJhaWNoYXRjbGlwLWV4aXN0aW5nLWJhZGdlXCIsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZXNjcmlwdGlvbiB0ZXh0YXJlYVxuXHRcdFx0Y29uc3QgdGV4dGFyZWEgPSBpdGVtLmNyZWF0ZUVsKFwidGV4dGFyZWFcIiwge1xuXHRcdFx0XHRjbHM6IFwiYWljaGF0Y2xpcC1mb2xkZXItZGVzY1wiLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogdChcIm1vZGFsLmRlc2NQbGFjZWhvbGRlclwiLCBsKSxcblx0XHRcdH0pO1xuXHRcdFx0dGV4dGFyZWEudmFsdWUgPSBzdGF0ZS5kZXNjcmlwdGlvbjtcblx0XHRcdHRleHRhcmVhLnJvd3MgPSA1O1xuXHRcdFx0dGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcblx0XHRcdFx0c3RhdGUuZGVzY3JpcHRpb24gPSB0ZXh0YXJlYS52YWx1ZTtcblx0XHRcdFx0dXBkYXRlUmVmaW5lQnRuKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQnV0dG9uIHJvdyAoQUlcdTc1MUZcdTYyMTAgKyBBSVx1NjgyMVx1NkI2Mylcblx0XHRcdGNvbnN0IGJ0blJvdyA9IGl0ZW0uY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtZm9sZGVyLWJ0bi1yb3dcIiB9KTtcblx0XHRcdGNvbnN0IGdlbkJ0biA9IGJ0blJvdy5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG5cdFx0XHRcdHRleHQ6IHQoXCJtb2RhbC5nZW5lcmF0ZVwiLCBsKSxcblx0XHRcdFx0Y2xzOiBcImFpY2hhdGNsaXAtZ2VuZXJhdGUtYnRuXCIsXG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IHJlZmluZUJ0biA9IGJ0blJvdy5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG5cdFx0XHRcdHRleHQ6IHQoXCJtb2RhbC5yZWZpbmVcIiwgbCksXG5cdFx0XHRcdGNsczogXCJhaWNoYXRjbGlwLXJlZmluZS1idG5cIixcblx0XHRcdH0pO1xuXG5cdFx0XHRjb25zdCBnZXREZXNjcmlwdGlvbkJvZHkgPSAoKTogc3RyaW5nID0+IHtcblx0XHRcdFx0Y29uc3QgdGV4dCA9IHRleHRhcmVhLnZhbHVlLnRyaW0oKTtcblx0XHRcdFx0Ly8gU3RyaXAgbGVhZGluZyBcIiMgVGl0bGVcIiBsaW5lIGlmIHByZXNlbnRcblx0XHRcdFx0Y29uc3QgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eI1teXFxuXStcXG4qKFtcXHNcXFNdKikkLyk7XG5cdFx0XHRcdHJldHVybiBtYXRjaCA/IG1hdGNoWzFdLnRyaW0oKSA6IHRleHQ7XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCB1cGRhdGVSZWZpbmVCdG4gPSAoKSA9PiB7XG5cdFx0XHRcdHJlZmluZUJ0bi5kaXNhYmxlZCA9IGdldERlc2NyaXB0aW9uQm9keSgpLmxlbmd0aCA9PT0gMDtcblx0XHRcdH07XG5cdFx0XHR1cGRhdGVSZWZpbmVCdG4oKTtcblxuXHRcdFx0Z2VuQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRcdHZvaWQgKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRnZW5CdG4uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGdlbkJ0bi50ZXh0Q29udGVudCA9IHQoXCJtb2RhbC5nZW5lcmF0aW5nXCIsIGwpO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBleGNlcnB0cyA9IGF3YWl0IHRoaXMuZ2V0Tm90ZUV4Y2VycHRzKGZvbGRlci5wYXRoLCBtYXJrZXIpO1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgYXBpUG9zdCh0aGlzLnNldHRpbmdzLCBcIi9hcGkvZm9sZGVycy9nZW5lcmF0ZS1kZXNjcmlwdGlvblwiLCB7XG5cdFx0XHRcdFx0XHRcdGZvbGRlck5hbWU6IGZvbGRlci5wYXRoLFxuXHRcdFx0XHRcdFx0XHRub3RlRXhjZXJwdHM6IGV4Y2VycHRzLmxlbmd0aCA+IDAgPyBleGNlcnB0cyA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U6IHRoaXMuZGVzY3JpcHRpb25MYW5ndWFnZSAhPT0gXCJhdXRvXCIgPyB0aGlzLmRlc2NyaXB0aW9uTGFuZ3VhZ2UgOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChyZXMuc3RhdHVzID09PSA0MjkpIHtcblx0XHRcdFx0XHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0KFwibm90aWNlLnF1b3RhRXhjZWVkZWRcIiwgbCl9YCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gcmVzLmpzb24gYXMgeyBkZXNjcmlwdGlvbjogc3RyaW5nOyByZW1haW5pbmc6IG51bWJlciB9O1xuXHRcdFx0XHRcdFx0XHRjb25zdCBmb2xkZXJUaXRsZSA9IGZvbGRlci5wYXRoLnNwbGl0KFwiL1wiKS5wb3AoKSA/PyBmb2xkZXIucGF0aDtcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29udGVudCA9IGAjICR7Zm9sZGVyVGl0bGV9XFxuXFxuJHtkYXRhLmRlc2NyaXB0aW9ufWA7XG5cdFx0XHRcdFx0XHRcdHRleHRhcmVhLnZhbHVlID0gY29udGVudDtcblx0XHRcdFx0XHRcdFx0c3RhdGUuZGVzY3JpcHRpb24gPSBjb250ZW50O1xuXHRcdFx0XHRcdFx0XHRzdGF0ZS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVSZWZpbmVCdG4oKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5nZW5lcmF0ZUZhaWxlZFwiLCBsKX1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIHtcblx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5nZW5lcmF0ZUZhaWxlZFwiLCBsKX1gKTtcblx0XHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdFx0Z2VuQnRuLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRnZW5CdG4udGV4dENvbnRlbnQgPSB0KFwibW9kYWwuZ2VuZXJhdGVcIiwgbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlZmluZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHR2b2lkIChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgYm9keSA9IGdldERlc2NyaXB0aW9uQm9keSgpO1xuXHRcdFx0XHRcdGlmIChib2R5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXHRcdFx0XHRcdHJlZmluZUJ0bi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdFx0cmVmaW5lQnRuLnRleHRDb250ZW50ID0gdChcIm1vZGFsLnJlZmluaW5nXCIsIGwpO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBhcGlQb3N0KHRoaXMuc2V0dGluZ3MsIFwiL2FwaS9mb2xkZXJzL2dlbmVyYXRlLWRlc2NyaXB0aW9uXCIsIHtcblx0XHRcdFx0XHRcdFx0Zm9sZGVyTmFtZTogZm9sZGVyLnBhdGgsXG5cdFx0XHRcdFx0XHRcdGRyYWZ0VGV4dDogYm9keSxcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U6IHRoaXMuZGVzY3JpcHRpb25MYW5ndWFnZSAhPT0gXCJhdXRvXCIgPyB0aGlzLmRlc2NyaXB0aW9uTGFuZ3VhZ2UgOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChyZXMuc3RhdHVzID09PSA0MjkpIHtcblx0XHRcdFx0XHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0KFwibm90aWNlLnF1b3RhRXhjZWVkZWRcIiwgbCl9YCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gcmVzLmpzb24gYXMgeyBkZXNjcmlwdGlvbjogc3RyaW5nOyByZW1haW5pbmc6IG51bWJlciB9O1xuXHRcdFx0XHRcdFx0XHRjb25zdCBmb2xkZXJUaXRsZSA9IGZvbGRlci5wYXRoLnNwbGl0KFwiL1wiKS5wb3AoKSA/PyBmb2xkZXIucGF0aDtcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29udGVudCA9IGAjICR7Zm9sZGVyVGl0bGV9XFxuXFxuJHtkYXRhLmRlc2NyaXB0aW9ufWA7XG5cdFx0XHRcdFx0XHRcdHRleHRhcmVhLnZhbHVlID0gY29udGVudDtcblx0XHRcdFx0XHRcdFx0c3RhdGUuZGVzY3JpcHRpb24gPSBjb250ZW50O1xuXHRcdFx0XHRcdFx0XHRzdGF0ZS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVSZWZpbmVCdG4oKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5nZW5lcmF0ZUZhaWxlZFwiLCBsKX1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIHtcblx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5nZW5lcmF0ZUZhaWxlZFwiLCBsKX1gKTtcblx0XHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdFx0cmVmaW5lQnRuLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRyZWZpbmVCdG4udGV4dENvbnRlbnQgPSB0KFwibW9kYWwucmVmaW5lXCIsIGwpO1xuXHRcdFx0XHRcdFx0dXBkYXRlUmVmaW5lQnRuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2VsZWN0QWxsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRmb3IgKGNvbnN0IHN0YXRlIG9mIHRoaXMuZm9sZGVyU3RhdGVzLnZhbHVlcygpKSBzdGF0ZS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRsaXN0RWwucXVlcnlTZWxlY3RvckFsbDxIVE1MSW5wdXRFbGVtZW50PihcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpLmZvckVhY2goKGNiKSA9PiB7XG5cdFx0XHRcdGNiLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0ZGVzZWxlY3RBbGxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGZvciAoY29uc3Qgc3RhdGUgb2YgdGhpcy5mb2xkZXJTdGF0ZXMudmFsdWVzKCkpIHN0YXRlLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRsaXN0RWwucXVlcnlTZWxlY3RvckFsbDxIVE1MSW5wdXRFbGVtZW50PihcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpLmZvckVhY2goKGNiKSA9PiB7XG5cdFx0XHRcdGNiLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRm9vdGVyOiBjcmVhdGUgJiBzeW5jIGJ1dHRvblxuXHRcdGNvbnN0IGZvb3RlciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1tb2RhbC1mb290ZXJcIiB9KTtcblx0XHRjb25zdCBjcmVhdGVCdG4gPSBmb290ZXIuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuXHRcdFx0dGV4dDogdChcIm1vZGFsLmNyZWF0ZUFuZFN5bmNcIiwgbCksXG5cdFx0XHRjbHM6IFwibW9kLWN0YVwiLFxuXHRcdH0pO1xuXHRcdGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0dm9pZCB0aGlzLmhhbmRsZUNyZWF0ZShtYXJrZXIpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBoYW5kbGVDcmVhdGUobWFya2VyOiBzdHJpbmcpIHtcblx0XHRjb25zdCBsID0gdGhpcy5sYW5nO1xuXHRcdGNvbnN0IHNlbGVjdGVkID0gWy4uLnRoaXMuZm9sZGVyU3RhdGVzLmVudHJpZXMoKV0uZmlsdGVyKFxuXHRcdFx0KFssIHNdKSA9PiBzLnNlbGVjdGVkICYmIHMuZGVzY3JpcHRpb24udHJpbSgpICE9PSBcIlwiLFxuXHRcdCk7XG5cdFx0aWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIG92ZXJ3cml0ZXNcblx0XHRjb25zdCBvdmVyd3JpdGVzID0gc2VsZWN0ZWQuZmlsdGVyKChbLCBzXSkgPT4gcy5oYXNFeGlzdGluZyk7XG5cdFx0aWYgKG92ZXJ3cml0ZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgY29uZmlybWVkID0gYXdhaXQgc2hvd0NvbmZpcm1Nb2RhbChcblx0XHRcdFx0dGhpcy5hcHAsXG5cdFx0XHRcdHRSZXBsYWNlKFwibW9kYWwuY29uZmlybU92ZXJ3cml0ZVwiLCBsLCB7IGNvdW50OiBvdmVyd3JpdGVzLmxlbmd0aCB9KSxcblx0XHRcdCk7XG5cdFx0XHRpZiAoIWNvbmZpcm1lZCkgcmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGV4dCA9IG1hcmtlci5pbmNsdWRlcyhcIi5cIikgPyBcIlwiIDogXCIubWRcIjtcblxuXHRcdGZvciAoY29uc3QgW2ZvbGRlclBhdGgsIHN0YXRlXSBvZiBzZWxlY3RlZCkge1xuXHRcdFx0Y29uc3QgZmlsZVBhdGggPSBgJHtmb2xkZXJQYXRofS8ke21hcmtlcn0ke2V4dH1gO1xuXHRcdFx0Y29uc3QgZXhpc3RpbmcgPSB0aGlzLmFwcC52YXVsdC5nZXRGaWxlQnlQYXRoKGZpbGVQYXRoKTtcblx0XHRcdGlmIChleGlzdGluZykge1xuXHRcdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZXhpc3RpbmcsIHN0YXRlLmRlc2NyaXB0aW9uKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEVuc3VyZSBwYXJlbnQgZm9sZGVyIGV4aXN0c1xuXHRcdFx0XHRjb25zdCBmb2xkZXIgPSB0aGlzLmFwcC52YXVsdC5nZXRGb2xkZXJCeVBhdGgoZm9sZGVyUGF0aCk7XG5cdFx0XHRcdGlmICghZm9sZGVyKSB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlRm9sZGVyKGZvbGRlclBhdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZShmaWxlUGF0aCwgc3RhdGUuZGVzY3JpcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFN5bmMgdG8gQVBJXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGZvbGRlcnMgPSBhd2FpdCBzY2FuRm9sZGVycyhcblx0XHRcdFx0dGhpcy5hcHAsXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3Muc2NhblJvb3QsXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MubWFya2VyRmlsZW5hbWUsXG5cdFx0XHQpO1xuXHRcdFx0aWYgKGZvbGRlcnMpIHtcblx0XHRcdFx0YXdhaXQgc3luY0ZvbGRlcnNUb0FwaSh0aGlzLnNldHRpbmdzLCBmb2xkZXJzKTtcblx0XHRcdH1cblx0XHRcdG5ldyBOb3RpY2UoXG5cdFx0XHRcdGBBSUNoYXRDbGlwOiAke3RSZXBsYWNlKFwibm90aWNlLm1hcmtlcnNDcmVhdGVkXCIsIGwsIHsgY291bnQ6IHNlbGVjdGVkLmxlbmd0aCB9KX1gLFxuXHRcdFx0KTtcblx0XHR9IGNhdGNoIHtcblx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5zeW5jQWZ0ZXJDcmVhdGVGYWlsZWRcIiwgbCl9YCk7XG5cdFx0fVxuXG5cdFx0YXdhaXQgdGhpcy5vbkNvbXBsZXRlKCk7XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyByZW5kZXJEZWxldGVNb2RlKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcblx0XHRjb25zdCBsID0gdGhpcy5sYW5nO1xuXHRcdGNvbnN0IHsgc2NhblJvb3QsIG1hcmtlckZpbGVuYW1lIH0gPSB0aGlzLnNldHRpbmdzO1xuXG5cdFx0Y29uc3QgbWFya2VycyA9IGF3YWl0IGdldEZvbGRlcnNXaXRoTWFya2VyKHRoaXMuYXBwLCBzY2FuUm9vdCwgbWFya2VyRmlsZW5hbWUpO1xuXG5cdFx0aWYgKG1hcmtlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRjb250YWluZXIuY3JlYXRlRWwoXCJwXCIsIHtcblx0XHRcdFx0dGV4dDogdChcIm1vZGFsLm5vTWFya2Vyc1wiLCBsKSxcblx0XHRcdFx0Y2xzOiBcImFpY2hhdGNsaXAtbW9kYWwtZW1wdHlcIixcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFRvb2xiYXJcblx0XHRjb25zdCB0b29sYmFyID0gY29udGFpbmVyLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLW1vZGFsLWFjdGlvbnNcIiB9KTtcblx0XHR0b29sYmFyLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IHQoXCJtb2RhbC5tYXJrZXJzRm91bmRcIiwgbCkgfSk7XG5cdFx0Y29uc3Qgc2VsZWN0QWxsQnRuID0gdG9vbGJhci5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IHQoXCJtb2RhbC5zZWxlY3RBbGxcIiwgbCkgfSk7XG5cdFx0Y29uc3QgZGVzZWxlY3RBbGxCdG4gPSB0b29sYmFyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogdChcIm1vZGFsLmRlc2VsZWN0QWxsXCIsIGwpIH0pO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBkZWxldGUgaXRlbXNcblx0XHR0aGlzLmRlbGV0ZUl0ZW1zID0gbWFya2Vycy5tYXAoKG0pID0+ICh7IC4uLm0sIHNlbGVjdGVkOiB0cnVlIH0pKTtcblxuXHRcdGNvbnN0IGxpc3RFbCA9IGNvbnRhaW5lci5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1mb2xkZXItbGlzdFwiIH0pO1xuXG5cdFx0Zm9yIChjb25zdCBpdGVtIG9mIHRoaXMuZGVsZXRlSXRlbXMpIHtcblx0XHRcdGNvbnN0IHJvdyA9IGxpc3RFbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1kZWxldGUtaXRlbVwiIH0pO1xuXHRcdFx0Y29uc3QgY2hlY2tib3ggPSByb3cuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiB9KTtcblx0XHRcdGNoZWNrYm94LmNoZWNrZWQgPSBpdGVtLnNlbGVjdGVkO1xuXHRcdFx0Y2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHRcdGl0ZW0uc2VsZWN0ZWQgPSBjaGVja2JveC5jaGVja2VkO1xuXHRcdFx0fSk7XG5cdFx0XHRyb3cuY3JlYXRlRWwoXCJzcGFuXCIsIHsgdGV4dDogaXRlbS5tYXJrZXJQYXRoIH0pO1xuXHRcdH1cblxuXHRcdHNlbGVjdEFsbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0Zm9yIChjb25zdCBpdGVtIG9mIHRoaXMuZGVsZXRlSXRlbXMpIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0bGlzdEVsLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5mb3JFYWNoKChjYikgPT4ge1xuXHRcdFx0XHRjYi5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGRlc2VsZWN0QWxsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5kZWxldGVJdGVtcykgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0bGlzdEVsLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5mb3JFYWNoKChjYikgPT4ge1xuXHRcdFx0XHRjYi5jaGVja2VkID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIEZvb3RlclxuXHRcdGNvbnN0IGZvb3RlciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1tb2RhbC1mb290ZXJcIiB9KTtcblx0XHRjb25zdCBkZWxldGVCdG4gPSBmb290ZXIuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuXHRcdFx0dGV4dDogdChcIm1vZGFsLmRlbGV0ZUFuZFN5bmNcIiwgbCksXG5cdFx0XHRjbHM6IFwibW9kLXdhcm5pbmdcIixcblx0XHR9KTtcblx0XHRkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHZvaWQgdGhpcy5oYW5kbGVEZWxldGUoKTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgaGFuZGxlRGVsZXRlKCkge1xuXHRcdGNvbnN0IGwgPSB0aGlzLmxhbmc7XG5cdFx0Y29uc3QgdG9EZWxldGUgPSB0aGlzLmRlbGV0ZUl0ZW1zLmZpbHRlcigoaSkgPT4gaS5zZWxlY3RlZCk7XG5cdFx0aWYgKHRvRGVsZXRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG5cdFx0Zm9yIChjb25zdCBpdGVtIG9mIHRvRGVsZXRlKSB7XG5cdFx0XHRjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZUJ5UGF0aChpdGVtLm1hcmtlclBhdGgpO1xuXHRcdFx0aWYgKGZpbGUpIHtcblx0XHRcdFx0YXdhaXQgdGhpcy5hcHAuZmlsZU1hbmFnZXIudHJhc2hGaWxlKGZpbGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFN5bmMgdG8gQVBJXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGZvbGRlcnMgPSBhd2FpdCBzY2FuRm9sZGVycyhcblx0XHRcdFx0dGhpcy5hcHAsXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3Muc2NhblJvb3QsXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MubWFya2VyRmlsZW5hbWUsXG5cdFx0XHQpO1xuXHRcdFx0aWYgKGZvbGRlcnMpIHtcblx0XHRcdFx0YXdhaXQgc3luY0ZvbGRlcnNUb0FwaSh0aGlzLnNldHRpbmdzLCBmb2xkZXJzKTtcblx0XHRcdH1cblx0XHRcdG5ldyBOb3RpY2UoXG5cdFx0XHRcdGBBSUNoYXRDbGlwOiAke3RSZXBsYWNlKFwibm90aWNlLm1hcmtlcnNEZWxldGVkXCIsIGwsIHsgY291bnQ6IHRvRGVsZXRlLmxlbmd0aCB9KX1gLFxuXHRcdFx0KTtcblx0XHR9IGNhdGNoIHtcblx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5zeW5jQWZ0ZXJEZWxldGVGYWlsZWRcIiwgbCl9YCk7XG5cdFx0fVxuXG5cdFx0YXdhaXQgdGhpcy5vbkNvbXBsZXRlKCk7XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBnZXROb3RlRXhjZXJwdHMoZm9sZGVyUGF0aDogc3RyaW5nLCBtYXJrZXJCYXNlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuXHRcdGNvbnN0IGZpbGVzID0gdGhpcy5hcHAudmF1bHRcblx0XHRcdC5nZXRGaWxlcygpXG5cdFx0XHQuZmlsdGVyKFxuXHRcdFx0XHQoZikgPT5cblx0XHRcdFx0XHRmLnBhcmVudD8ucGF0aCA9PT0gZm9sZGVyUGF0aCAmJlxuXHRcdFx0XHRcdGYuZXh0ZW5zaW9uID09PSBcIm1kXCIgJiZcblx0XHRcdFx0XHRmLmJhc2VuYW1lICE9PSBtYXJrZXJCYXNlbmFtZSxcblx0XHRcdClcblx0XHRcdC5zbGljZSgwLCA1KTtcblxuXHRcdGNvbnN0IGV4Y2VycHRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuXHRcdFx0Y29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG5cdFx0XHRleGNlcnB0cy5wdXNoKGNvbnRlbnQuc2xpY2UoMCwgNTAwKSk7XG5cdFx0fVxuXHRcdHJldHVybiBleGNlcnB0cztcblx0fVxufVxuXG5jbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cdHByaXZhdGUgbWVzc2FnZTogc3RyaW5nO1xuXHRwcml2YXRlIHJlc29sdmVkID0gZmFsc2U7XG5cdHByaXZhdGUgcmVzb2x2ZVByb21pc2U6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgbWVzc2FnZTogc3RyaW5nLCByZXNvbHZlUHJvbWlzZTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRcdHRoaXMucmVzb2x2ZVByb21pc2UgPSByZXNvbHZlUHJvbWlzZTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdGhpcy5tZXNzYWdlIH0pO1xuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHRcdC5hZGRCdXR0b24oKGJ0bjogQnV0dG9uQ29tcG9uZW50KSA9PlxuXHRcdFx0XHRidG4uc2V0QnV0dG9uVGV4dChcIk9LXCIpLnNldEN0YSgpLm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVzb2x2ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMucmVzb2x2ZVByb21pc2UodHJ1ZSk7XG5cdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHR9KSxcblx0XHRcdClcblx0XHRcdC5hZGRCdXR0b24oKGJ0bjogQnV0dG9uQ29tcG9uZW50KSA9PlxuXHRcdFx0XHRidG4uc2V0QnV0dG9uVGV4dChcIkNhbmNlbFwiKS5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJlc29sdmVkID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLnJlc29sdmVQcm9taXNlKGZhbHNlKTtcblx0XHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0aWYgKCF0aGlzLnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLnJlc29sdmVQcm9taXNlKGZhbHNlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2hvd0NvbmZpcm1Nb2RhbChhcHA6IEFwcCwgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdG5ldyBDb25maXJtTW9kYWwoYXBwLCBtZXNzYWdlLCByZXNvbHZlKS5vcGVuKCk7XG5cdH0pO1xufVxuIiwgIi8qKiBTaGFyZWQgdHlwZXMsIGNvbnN0YW50cywgYW5kIGRlZmF1bHQgc2V0dGluZ3MgKi9cblxuZXhwb3J0IGNvbnN0IEFQSV9CQVNFX1VSTCA9IFwiaHR0cHM6Ly9hcGkuYWljaGF0Y2xpcC5jb21cIjtcbmV4cG9ydCBjb25zdCBXRUJfVVJMID0gXCJodHRwczovL2FpY2hhdGNsaXAuY29tXCI7XG5cbmV4cG9ydCBjb25zdCBDTElQX1NPVVJDRVMgPSBbXCJjaGF0Z3B0XCIsIFwiZ2VtaW5pXCIsIFwiY2xhdWRlXCIsIFwiZ3Jva1wiXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIENsaXBTb3VyY2UgPSAodHlwZW9mIENMSVBfU09VUkNFUylbbnVtYmVyXTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGlwIHtcblx0aWQ6IHN0cmluZztcblx0dXNlcklkOiBzdHJpbmc7XG5cdHNvdXJjZTogQ2xpcFNvdXJjZTtcblx0cHJvbXB0OiBzdHJpbmcgfCBudWxsO1xuXHRjb250ZW50OiBzdHJpbmc7XG5cdHRpdGxlOiBzdHJpbmcgfCBudWxsO1xuXHRzdW1tYXJ5OiBzdHJpbmcgfCBudWxsO1xuXHR0YWdzOiBzdHJpbmcgfCBudWxsO1xuXHRmb2xkZXJQYXRoOiBzdHJpbmcgfCBudWxsO1xuXHRmaWxlTmFtZTogc3RyaW5nIHwgbnVsbDtcblx0dXJsOiBzdHJpbmcgfCBudWxsO1xuXHRjaGF0VGl0bGU6IHN0cmluZyB8IG51bGw7XG5cdGNyZWF0ZWRBdDogc3RyaW5nO1xuXHRzeW5jZWRBdDogc3RyaW5nIHwgbnVsbDtcbn1cblxuZXhwb3J0IHR5cGUgVXNlclBsYW4gPSBcImZyZWVcIiB8IFwicHJvXCI7XG5cbmV4cG9ydCBjb25zdCBTWU5DRURfQ0xJUF9JRFNfTUFYID0gMTAwMDtcblxuZXhwb3J0IGludGVyZmFjZSBBSUNoYXRDbGlwU2V0dGluZ3Mge1xuXHRhcGlCYXNlVXJsOiBzdHJpbmc7XG5cdHRva2VuOiBzdHJpbmc7XG5cdGluYm94Rm9sZGVyOiBzdHJpbmc7XG5cdGF1dG9TeW5jT25Mb2FkOiBib29sZWFuO1xuXHRzeW5jT25Gb3JlZ3JvdW5kOiBib29sZWFuO1xuXHRzY2FuUm9vdDogc3RyaW5nO1xuXHRtYXJrZXJGaWxlbmFtZTogc3RyaW5nO1xuXHRhdXRvU2NhbkZvbGRlcnM6IGJvb2xlYW47XG5cdHRpbWV6b25lOiBzdHJpbmc7XG5cdGZpbGVOYW1lVGVtcGxhdGU6IHN0cmluZztcblx0dGFnUnVsZVBhdGg6IHN0cmluZztcblx0ZGV2aWNlSWQ6IHN0cmluZztcblx0c3luY2VkQ2xpcElkczogc3RyaW5nW107XG5cdHBsdWdpbkxhbmd1YWdlOiBcImF1dG9cIiB8IFwiZW5cIiB8IFwiamFcIiB8IFwiemhcIiB8IFwia29cIjtcblx0Y2FjaGVkVXNlclBsYW46IFVzZXJQbGFuO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogQUlDaGF0Q2xpcFNldHRpbmdzID0ge1xuXHRhcGlCYXNlVXJsOiBBUElfQkFTRV9VUkwsXG5cdHRva2VuOiBcIlwiLFxuXHRpbmJveEZvbGRlcjogXCJBSUNoYXRDbGlwL0luYm94XCIsXG5cdGF1dG9TeW5jT25Mb2FkOiB0cnVlLFxuXHRzeW5jT25Gb3JlZ3JvdW5kOiB0cnVlLFxuXHRzY2FuUm9vdDogXCJcIixcblx0bWFya2VyRmlsZW5hbWU6IFwiUkVBRE1FXCIsXG5cdGF1dG9TY2FuRm9sZGVyczogdHJ1ZSxcblx0dGltZXpvbmU6IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZSxcblx0ZmlsZU5hbWVUZW1wbGF0ZTogXCJ7eXl5eX0te01NfS17ZGR9LXt0aXRsZX1cIixcblx0dGFnUnVsZVBhdGg6IFwiVGFnUnVsZVwiLFxuXHRkZXZpY2VJZDogXCJcIixcblx0c3luY2VkQ2xpcElkczogW10sXG5cdHBsdWdpbkxhbmd1YWdlOiBcImF1dG9cIixcblx0Y2FjaGVkVXNlclBsYW46IFwiZnJlZVwiLFxufTtcbiIsICIvKiogTWFya2Rvd24gZm9ybWF0dGluZyBcdTIwMTQgY29udmVydHMgQ2xpcCBkYXRhIGludG8gT2JzaWRpYW4tcmVhZHkgbWFya2Rvd24gd2l0aCBZQU1MIGZyb250bWF0dGVyICovXG5pbXBvcnQgdHlwZSB7IEFJQ2hhdENsaXBTZXR0aW5ncywgQ2xpcCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmZ1bmN0aW9uIGVzY2FwZVlhbWwodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmICgvWzojW3t9JiohfD4nXCIlQGAsP1xcXV0vLnRlc3QodmFsdWUpIHx8IHZhbHVlLnRyaW0oKSAhPT0gdmFsdWUpIHtcblx0XHRyZXR1cm4gYFwiJHt2YWx1ZS5yZXBsYWNlKC9cXFxcL2csIFwiXFxcXFxcXFxcIikucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpfVwiYDtcblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRMb2NhbERhdGUoaXNvU3RyaW5nOiBzdHJpbmcsIHRpbWV6b25lOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRjb25zdCBkID0gbmV3IERhdGUoaXNvU3RyaW5nKTtcblx0Y29uc3QgZm10ID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1DQVwiLCB7XG5cdFx0dGltZVpvbmU6IHRpbWV6b25lLFxuXHRcdHllYXI6IFwibnVtZXJpY1wiLFxuXHRcdG1vbnRoOiBcIjItZGlnaXRcIixcblx0XHRkYXk6IFwiMi1kaWdpdFwiLFxuXHRcdGhvdXI6IFwiMi1kaWdpdFwiLFxuXHRcdG1pbnV0ZTogXCIyLWRpZ2l0XCIsXG5cdFx0c2Vjb25kOiBcIjItZGlnaXRcIixcblx0XHRob3VyMTI6IGZhbHNlLFxuXHR9KTtcblx0Y29uc3QgcGFydHMgPSBPYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0Zm10LmZvcm1hdFRvUGFydHMoZCkubWFwKChwKSA9PiBbcC50eXBlLCBwLnZhbHVlXSksXG5cdCk7XG5cdHJldHVybiBgJHtwYXJ0cy55ZWFyfS0ke3BhcnRzLm1vbnRofS0ke3BhcnRzLmRheX1UJHtwYXJ0cy5ob3VyfToke3BhcnRzLm1pbnV0ZX06JHtwYXJ0cy5zZWNvbmR9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdENsaXBUb01hcmtkb3duKGNsaXA6IENsaXAsIHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MpOiBzdHJpbmcge1xuXHRjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXCItLS1cIl07XG5cblx0bGluZXMucHVzaChgc291cmNlOiAke2NsaXAuc291cmNlfWApO1xuXHRpZiAoY2xpcC51cmwpIHtcblx0XHRsaW5lcy5wdXNoKGB1cmw6ICR7ZXNjYXBlWWFtbChjbGlwLnVybCl9YCk7XG5cdH1cblx0aWYgKGNsaXAuY2hhdFRpdGxlKSB7XG5cdFx0bGluZXMucHVzaChgY2hhdF90aXRsZTogJHtlc2NhcGVZYW1sKGNsaXAuY2hhdFRpdGxlKX1gKTtcblx0fVxuXHRsaW5lcy5wdXNoKGBjbGlwcGVkX2F0OiAke2Zvcm1hdExvY2FsRGF0ZShjbGlwLmNyZWF0ZWRBdCwgc2V0dGluZ3MudGltZXpvbmUpfWApO1xuXG5cdGlmIChjbGlwLnN1bW1hcnkpIHtcblx0XHRsaW5lcy5wdXNoKGBzdW1tYXJ5OiAke2VzY2FwZVlhbWwoY2xpcC5zdW1tYXJ5KX1gKTtcblx0fVxuXHRpZiAoY2xpcC50YWdzKSB7XG5cdFx0Y29uc3QgdGFnTGlzdCA9IGNsaXAudGFnc1xuXHRcdFx0LnNwbGl0KFwiLFwiKVxuXHRcdFx0Lm1hcCgodCkgPT4gdC50cmltKCkucmVwbGFjZSgvXiMvLCBcIlwiKSlcblx0XHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cdFx0aWYgKHRhZ0xpc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0bGluZXMucHVzaChgdGFnczogWyR7dGFnTGlzdC5tYXAoKHQpID0+IGVzY2FwZVlhbWwodCkpLmpvaW4oXCIsIFwiKX1dYCk7XG5cdFx0fVxuXHR9XG5cblx0bGluZXMucHVzaChcIi0tLVwiKTtcblx0bGluZXMucHVzaChcIlwiKTtcblxuXHRpZiAoY2xpcC5wcm9tcHQpIHtcblx0XHRsaW5lcy5wdXNoKFwiIyMgUHJvbXB0XCIpO1xuXHRcdGxpbmVzLnB1c2goXCJcIik7XG5cdFx0bGluZXMucHVzaChjbGlwLnByb21wdCk7XG5cdFx0bGluZXMucHVzaChcIlwiKTtcblx0fVxuXG5cdGxpbmVzLnB1c2goXCIjIyBSZXNwb25zZVwiKTtcblx0bGluZXMucHVzaChcIlwiKTtcblx0bGluZXMucHVzaChjbGlwLmNvbnRlbnQpO1xuXHRsaW5lcy5wdXNoKFwiXCIpO1xuXG5cdHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xufVxuIiwgIi8qKiBDbGlwIHN5bmNocm9uaXphdGlvbiBcdTIwMTQgZmV0Y2hlcyBwZW5kaW5nIGNsaXBzIGZyb20gdGhlIEFQSSBhbmQgd3JpdGVzIHRoZW0gdG8gdGhlIHZhdWx0ICovXG5pbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgYXBpR2V0LCBhcGlQYXRjaCwgYXBpUHV0IH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyBzY2FuRm9sZGVycywgc3luY0ZvbGRlcnNUb0FwaSB9IGZyb20gXCIuL2ZvbGRlcnNcIjtcbmltcG9ydCB7IGZvcm1hdENsaXBUb01hcmtkb3duLCBmb3JtYXRMb2NhbERhdGUgfSBmcm9tIFwiLi9mb3JtYXR0ZXJcIjtcbmltcG9ydCB0eXBlIHsgQUlDaGF0Q2xpcFNldHRpbmdzLCBDbGlwLCBVc2VyUGxhbiB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBTWU5DRURfQ0xJUF9JRFNfTUFYIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTeW5jUmVzdWx0IHtcblx0c3luY2VkOiBudW1iZXI7XG5cdGZhaWxlZDogbnVtYmVyO1xuXHRlcnJvcnM6IHN0cmluZ1tdO1xuXHR1c2VyUGxhbjogXCJmcmVlXCIgfCBcInByb1wiO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFBlbmRpbmdDbGlwcyhzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzKTogUHJvbWlzZTxDbGlwW10+IHtcblx0Y29uc3QgcmVzID0gYXdhaXQgYXBpR2V0KHNldHRpbmdzLCBcIi9hcGkvY2xpcHMvcGVuZGluZ1wiKTtcblx0aWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIHBlbmRpbmcgY2xpcHM6ICR7cmVzLnN0YXR1c31gKTtcblx0fVxuXHRyZXR1cm4gcmVzLmpzb24gYXMgQ2xpcFtdO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFVzZXJQbGFuKHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MpOiBQcm9taXNlPFVzZXJQbGFuPiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzID0gYXdhaXQgYXBpR2V0KHNldHRpbmdzLCBcIi9hcGkvbWVcIik7XG5cdFx0aWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0Y29uc3QgZGF0YSA9IHJlcy5qc29uIGFzIHsgdXNlcj86IHsgcGxhbj86IHN0cmluZyB9IH07XG5cdFx0XHRyZXR1cm4gKGRhdGEudXNlcj8ucGxhbiA9PT0gXCJwcm9cIiA/IFwicHJvXCIgOiBcImZyZWVcIikgYXMgVXNlclBsYW47XG5cdFx0fVxuXHR9IGNhdGNoIHtcblx0XHQvLyBmYWxsIHRocm91Z2hcblx0fVxuXHRyZXR1cm4gXCJmcmVlXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1hcmtDbGlwU3luY2VkKHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsIGNsaXBJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNvbnN0IHJlcyA9IGF3YWl0IGFwaVBhdGNoKHNldHRpbmdzLCBgL2FwaS9jbGlwcy8ke2NsaXBJZH0vc3luY2AsIHtcblx0XHRzeW5jZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuXHR9KTtcblx0aWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIG1hcmsgY2xpcCAke2NsaXBJZH0gYXMgc3luY2VkOiAke3Jlcy5zdGF0dXN9YCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRm9sZGVyKGFwcDogQXBwLCBmb2xkZXJQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3QgcGFydHMgPSBmb2xkZXJQYXRoLnNwbGl0KFwiL1wiKTtcblx0bGV0IGN1cnJlbnQgPSBcIlwiO1xuXG5cdGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuXHRcdGN1cnJlbnQgPSBjdXJyZW50ID8gYCR7Y3VycmVudH0vJHtwYXJ0fWAgOiBwYXJ0O1xuXHRcdGlmICghYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChjdXJyZW50KSkge1xuXHRcdFx0YXdhaXQgYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihjdXJyZW50KTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0RXhpc3RpbmdTeW5jZWRDbGlwSWRzKGFwcDogQXBwLCBmb2xkZXJQYXRoOiBzdHJpbmcpOiBTZXQ8c3RyaW5nPiB7XG5cdGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXHRjb25zdCBmb2xkZXIgPSBhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZvbGRlclBhdGgpO1xuXHRpZiAoIWZvbGRlcikgcmV0dXJuIGlkcztcblxuXHRjb25zdCBmaWxlcyA9IGFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCkuZmlsdGVyKChmKSA9PiBmLnBhdGguc3RhcnRzV2l0aChgJHtmb2xkZXJQYXRofS9gKSk7XG5cblx0Zm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG5cdFx0Y29uc3QgY2FjaGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk7XG5cdFx0Y29uc3QgY2xpcElkID0gY2FjaGU/LmZyb250bWF0dGVyPy5jbGlwX2lkO1xuXHRcdGlmICh0eXBlb2YgY2xpcElkID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRpZHMuYWRkKGNsaXBJZCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGlkcztcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVGaWxlTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gbmFtZVxuXHRcdC5yZXBsYWNlKC9bL1xcXFw6Kj9cIjw+fF0vZywgXCItXCIpXG5cdFx0LnJlcGxhY2UoLy0rL2csIFwiLVwiKVxuXHRcdC5yZXBsYWNlKC9eLXwtJC9nLCBcIlwiKVxuXHRcdC50cmltKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUZpbGVOYW1lVGVtcGxhdGUoXG5cdHRlbXBsYXRlOiBzdHJpbmcsXG5cdGNsaXA6IENsaXAsXG5cdHRpbWV6b25lOiBzdHJpbmcsXG5cdHVzZXJQbGFuOiBVc2VyUGxhbixcbik6IHN0cmluZyB7XG5cdGNvbnN0IGxvY2FsRGF0ZSA9IGZvcm1hdExvY2FsRGF0ZShjbGlwLmNyZWF0ZWRBdCwgdGltZXpvbmUpO1xuXHQvLyBQYXJzZTogMjAyNi0wMy0wOFQxNDowODowNlxuXHRjb25zdCBbZGF0ZVBhcnQsIHRpbWVQYXJ0XSA9IGxvY2FsRGF0ZS5zcGxpdChcIlRcIik7XG5cdGNvbnN0IFt5eXl5LCBNTSwgZGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpO1xuXHRjb25zdCBbaGgsIG1tLCBzc10gPSB0aW1lUGFydC5zcGxpdChcIjpcIik7XG5cblx0bGV0IHJlc3VsdCA9IHRlbXBsYXRlXG5cdFx0LnJlcGxhY2UoL1xce3l5eXlcXH0vZywgeXl5eSlcblx0XHQucmVwbGFjZSgvXFx7TU1cXH0vZywgTU0pXG5cdFx0LnJlcGxhY2UoL1xce2RkXFx9L2csIGRkKVxuXHRcdC5yZXBsYWNlKC9cXHtoaFxcfS9nLCBoaClcblx0XHQucmVwbGFjZSgvXFx7bW1cXH0vZywgbW0pXG5cdFx0LnJlcGxhY2UoL1xce3NzXFx9L2csIHNzKVxuXHRcdC5yZXBsYWNlKC9cXHtzb3VyY2VcXH0vZywgY2xpcC5zb3VyY2UpXG5cdFx0LnJlcGxhY2UoL1xce2NoYXRfdGl0bGVcXH0vZywgc2FuaXRpemVGaWxlTmFtZShjbGlwLmNoYXRUaXRsZSB8fCBcIlVudGl0bGVkXCIpKTtcblxuXHRpZiAodXNlclBsYW4gPT09IFwicHJvXCIpIHtcblx0XHRyZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFx7dGl0bGVcXH0vZywgc2FuaXRpemVGaWxlTmFtZShjbGlwLnRpdGxlIHx8IFwiVW50aXRsZWRcIikpO1xuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9cXHt0aXRsZVxcfS9nLCBcInRpdGxlLW9ubHktcHJvLXBsYW5cIik7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRmlsZVBhdGgoXG5cdGFwcDogQXBwLFxuXHR0YXJnZXRGb2xkZXI6IHN0cmluZyxcblx0YmFzZU5hbWU6IHN0cmluZyxcbik6IHN0cmluZyB7XG5cdGxldCBjYW5kaWRhdGUgPSBgJHt0YXJnZXRGb2xkZXJ9LyR7YmFzZU5hbWV9Lm1kYDtcblx0bGV0IGNvdW50ZXIgPSAyO1xuXG5cdHdoaWxlIChhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGNhbmRpZGF0ZSkpIHtcblx0XHRjYW5kaWRhdGUgPSBgJHt0YXJnZXRGb2xkZXJ9LyR7YmFzZU5hbWV9LSR7Y291bnRlcn0ubWRgO1xuXHRcdGNvdW50ZXIrKztcblx0fVxuXG5cdHJldHVybiBjYW5kaWRhdGU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHdyaXRlQ2xpcFRvVmF1bHQoXG5cdGFwcDogQXBwLFxuXHRzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzLFxuXHRjbGlwOiBDbGlwLFxuXHR1c2VyUGxhbjogVXNlclBsYW4sXG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3QgdGFyZ2V0Rm9sZGVyID0gdXNlclBsYW4gPT09IFwicHJvXCIgJiYgY2xpcC5mb2xkZXJQYXRoXG5cdFx0PyBjbGlwLmZvbGRlclBhdGhcblx0XHQ6IHNldHRpbmdzLmluYm94Rm9sZGVyO1xuXHRhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCB0YXJnZXRGb2xkZXIpO1xuXHRjb25zdCBtYXJrZG93biA9IGZvcm1hdENsaXBUb01hcmtkb3duKGNsaXAsIHNldHRpbmdzKTtcblx0Y29uc3QgYmFzZU5hbWUgPSBhcHBseUZpbGVOYW1lVGVtcGxhdGUoc2V0dGluZ3MuZmlsZU5hbWVUZW1wbGF0ZSwgY2xpcCwgc2V0dGluZ3MudGltZXpvbmUsIHVzZXJQbGFuKTtcblx0Y29uc3QgZmlsZVBhdGggPSByZXNvbHZlRmlsZVBhdGgoYXBwLCB0YXJnZXRGb2xkZXIsIGJhc2VOYW1lKTtcblx0YXdhaXQgYXBwLnZhdWx0LmNyZWF0ZShmaWxlUGF0aCwgbWFya2Rvd24pO1xufVxuXG5sZXQgbGFzdFRhZ1J1bGVNdGltZSA9IDA7XG5cbmFzeW5jIGZ1bmN0aW9uIHN5bmNUYWdSdWxlKGFwcDogQXBwLCBzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmICghc2V0dGluZ3MudGFnUnVsZVBhdGggfHwgIXNldHRpbmdzLnRva2VuKSByZXR1cm47XG5cdHRyeSB7XG5cdFx0Y29uc3QgZmlsZVBhdGggPSBgJHtzZXR0aW5ncy50YWdSdWxlUGF0aH0ubWRgO1xuXHRcdGNvbnN0IG1kRmlsZSA9IGFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCkuZmluZCgoZikgPT4gZi5wYXRoID09PSBmaWxlUGF0aCk7XG5cdFx0aWYgKCFtZEZpbGUpIHJldHVybjtcblxuXHRcdGNvbnN0IG10aW1lID0gbWRGaWxlLnN0YXQubXRpbWU7XG5cdFx0aWYgKG10aW1lID09PSBsYXN0VGFnUnVsZU10aW1lKSByZXR1cm47XG5cblx0XHRjb25zdCBjb250ZW50ID0gYXdhaXQgYXBwLnZhdWx0LnJlYWQobWRGaWxlKTtcblx0XHRhd2FpdCBhcGlQdXQoc2V0dGluZ3MsIFwiL2FwaS9wcmVmZXJlbmNlc1wiLCB7IHRhZ1J1bGU6IGNvbnRlbnQgfSk7XG5cdFx0bGFzdFRhZ1J1bGVNdGltZSA9IG10aW1lO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLndhcm4oXCJBSUNoYXRDbGlwOiBUYWdSdWxlIHN5bmMgZmFpbGVkXCIpO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jQ2xpcHMoYXBwOiBBcHAsIHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MpOiBQcm9taXNlPFN5bmNSZXN1bHQ+IHtcblx0Y29uc3QgcmVzdWx0OiBTeW5jUmVzdWx0ID0geyBzeW5jZWQ6IDAsIGZhaWxlZDogMCwgZXJyb3JzOiBbXSwgdXNlclBsYW46IFwiZnJlZVwiIH07XG5cblx0Y29uc3QgW2NsaXBzLCB1c2VyUGxhbl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG5cdFx0ZmV0Y2hQZW5kaW5nQ2xpcHMoc2V0dGluZ3MpLFxuXHRcdGZldGNoVXNlclBsYW4oc2V0dGluZ3MpLFxuXHRdKTtcblx0cmVzdWx0LnVzZXJQbGFuID0gdXNlclBsYW47XG5cblx0Ly8gUHJvLW9ubHk6IHN5bmMgdmF1bHQgZm9sZGVyIHN0cnVjdHVyZSBhbmQgdGFnIHJ1bGVzIHRvIEFQSVxuXHRpZiAodXNlclBsYW4gPT09IFwicHJvXCIpIHtcblx0XHRpZiAoc2V0dGluZ3MuYXV0b1NjYW5Gb2xkZXJzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBmb2xkZXJzID0gYXdhaXQgc2NhbkZvbGRlcnMoYXBwLCBzZXR0aW5ncy5zY2FuUm9vdCwgc2V0dGluZ3MubWFya2VyRmlsZW5hbWUpO1xuXHRcdFx0XHRpZiAoZm9sZGVycykge1xuXHRcdFx0XHRcdGF3YWl0IHN5bmNGb2xkZXJzVG9BcGkoc2V0dGluZ3MsIGZvbGRlcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkFJQ2hhdENsaXA6IGZvbGRlciBzeW5jIGZhaWxlZCwgY29udGludWluZyB3aXRoIGNsaXAgc3luY1wiLCBlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YXdhaXQgc3luY1RhZ1J1bGUoYXBwLCBzZXR0aW5ncyk7XG5cdH1cblx0aWYgKGNsaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc3VsdDtcblxuXHRhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cblx0Y29uc3QgZXhpc3RpbmdJZHMgPSBnZXRFeGlzdGluZ1N5bmNlZENsaXBJZHMoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cblx0Y29uc3Qgc3luY2VkU2V0ID0gbmV3IFNldChzZXR0aW5ncy5zeW5jZWRDbGlwSWRzKTtcblxuXHRmb3IgKGNvbnN0IGNsaXAgb2YgY2xpcHMpIHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKGV4aXN0aW5nSWRzLmhhcyhjbGlwLmlkKSB8fCBzeW5jZWRTZXQuaGFzKGNsaXAuaWQpKSB7XG5cdFx0XHRcdGF3YWl0IG1hcmtDbGlwU3luY2VkKHNldHRpbmdzLCBjbGlwLmlkKTtcblx0XHRcdFx0cmVzdWx0LnN5bmNlZCsrO1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgd3JpdGVDbGlwVG9WYXVsdChhcHAsIHNldHRpbmdzLCBjbGlwLCB1c2VyUGxhbik7XG5cblx0XHRcdGF3YWl0IG1hcmtDbGlwU3luY2VkKHNldHRpbmdzLCBjbGlwLmlkKTtcblx0XHRcdHJlc3VsdC5zeW5jZWQrKztcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXN1bHQuZmFpbGVkKys7XG5cdFx0XHRyZXN1bHQuZXJyb3JzLnB1c2goYENsaXAgJHtjbGlwLmlkfTogJHtlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSl9YCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hDbGlwQnlJZChzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzLCBjbGlwSWQ6IHN0cmluZyk6IFByb21pc2U8Q2xpcD4ge1xuXHRjb25zdCByZXMgPSBhd2FpdCBhcGlHZXQoc2V0dGluZ3MsIGAvYXBpL2NsaXBzLyR7Y2xpcElkfWApO1xuXHRpZiAocmVzLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggY2xpcCAke2NsaXBJZH06ICR7cmVzLnN0YXR1c31gKTtcblx0fVxuXHRyZXR1cm4gcmVzLmpzb24gYXMgQ2xpcDtcbn1cblxuZnVuY3Rpb24gYWRkU3luY2VkQ2xpcElkKHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsIGNsaXBJZDogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChzZXR0aW5ncy5zeW5jZWRDbGlwSWRzLmluY2x1ZGVzKGNsaXBJZCkpIHJldHVybjtcblx0c2V0dGluZ3Muc3luY2VkQ2xpcElkcy5wdXNoKGNsaXBJZCk7XG5cdGlmIChzZXR0aW5ncy5zeW5jZWRDbGlwSWRzLmxlbmd0aCA+IFNZTkNFRF9DTElQX0lEU19NQVgpIHtcblx0XHRzZXR0aW5ncy5zeW5jZWRDbGlwSWRzID0gc2V0dGluZ3Muc3luY2VkQ2xpcElkcy5zbGljZSgtU1lOQ0VEX0NMSVBfSURTX01BWCk7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNTaW5nbGVDbGlwKFxuXHRhcHA6IEFwcCxcblx0c2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncyxcblx0Y2xpcElkOiBzdHJpbmcsXG5cdHNhdmVTZXR0aW5nczogKCkgPT4gUHJvbWlzZTx2b2lkPixcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHQvLyBJZGVtcG90ZW5jeTogc2tpcCBpZiBhbHJlYWR5IHN5bmNlZFxuXHRpZiAoc2V0dGluZ3Muc3luY2VkQ2xpcElkcy5pbmNsdWRlcyhjbGlwSWQpKSByZXR1cm4gZmFsc2U7XG5cblx0Y29uc3QgZXhpc3RpbmdJZHMgPSBnZXRFeGlzdGluZ1N5bmNlZENsaXBJZHMoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cdGlmIChleGlzdGluZ0lkcy5oYXMoY2xpcElkKSkge1xuXHRcdGFkZFN5bmNlZENsaXBJZChzZXR0aW5ncywgY2xpcElkKTtcblx0XHRhd2FpdCBzYXZlU2V0dGluZ3MoKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCBjbGlwID0gYXdhaXQgZmV0Y2hDbGlwQnlJZChzZXR0aW5ncywgY2xpcElkKTtcblx0Y29uc3QgdXNlclBsYW4gPSBhd2FpdCBmZXRjaFVzZXJQbGFuKHNldHRpbmdzKTtcblx0c2V0dGluZ3MuY2FjaGVkVXNlclBsYW4gPSB1c2VyUGxhbjtcblxuXHRhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cdGF3YWl0IHdyaXRlQ2xpcFRvVmF1bHQoYXBwLCBzZXR0aW5ncywgY2xpcCwgdXNlclBsYW4pO1xuXHRhd2FpdCBtYXJrQ2xpcFN5bmNlZChzZXR0aW5ncywgY2xpcC5pZCk7XG5cblx0YWRkU3luY2VkQ2xpcElkKHNldHRpbmdzLCBjbGlwSWQpO1xuXHRhd2FpdCBzYXZlU2V0dGluZ3MoKTtcblxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsICIvKiogV2ViU29ja2V0IGNsaWVudCBmb3IgcmVhbC10aW1lIGNsaXAgcHVzaCBub3RpZmljYXRpb25zIChkZXNrdG9wIG9ubHkpICovXG5leHBvcnQgaW50ZXJmYWNlIFN5bmNXZWJTb2NrZXRPcHRpb25zIHtcblx0YXBpQmFzZVVybDogc3RyaW5nO1xuXHR0b2tlbjogc3RyaW5nO1xuXHRkZXZpY2VJZDogc3RyaW5nO1xuXHRvbk5ld0NsaXA6IChjbGlwSWQ6IHN0cmluZykgPT4gdm9pZDtcblx0b25TdGF0dXNDaGFuZ2U/OiAoY29ubmVjdGVkOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgU3luY1dlYlNvY2tldCB7XG5cdHByaXZhdGUgd3M6IFdlYlNvY2tldCB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIHJlY29ubmVjdEF0dGVtcHQgPSAwO1xuXHRwcml2YXRlIHJlY29ubmVjdFRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIHBpbmdUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0SW50ZXJ2YWw+IHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgc2hvdWxkUmVjb25uZWN0ID0gdHJ1ZTtcblx0cHJpdmF0ZSBvcHRzOiBTeW5jV2ViU29ja2V0T3B0aW9ucztcblxuXHRjb25zdHJ1Y3RvcihvcHRzOiBTeW5jV2ViU29ja2V0T3B0aW9ucykge1xuXHRcdHRoaXMub3B0cyA9IG9wdHM7XG5cdH1cblxuXHRjb25uZWN0KCk6IHZvaWQge1xuXHRcdHRoaXMuc2hvdWxkUmVjb25uZWN0ID0gdHJ1ZTtcblx0XHR0aGlzLmRvQ29ubmVjdCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBkb0Nvbm5lY3QoKTogdm9pZCB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIENvbnZlcnQgaHR0cChzKTovLyB0byB3cyhzKTovL1xuXHRcdFx0Y29uc3Qgd3NVcmwgPSB0aGlzLm9wdHMuYXBpQmFzZVVybFxuXHRcdFx0XHQucmVwbGFjZSgvXmh0dHBzOlxcL1xcLy8sIFwid3NzOi8vXCIpXG5cdFx0XHRcdC5yZXBsYWNlKC9eaHR0cDpcXC9cXC8vLCBcIndzOi8vXCIpO1xuXHRcdFx0Y29uc3QgdXJsID0gYCR7d3NVcmx9L2FwaS93cz90b2tlbj0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLm9wdHMudG9rZW4pfSZkZXZpY2VJZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLm9wdHMuZGV2aWNlSWQpfWA7XG5cblx0XHRcdHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cblx0XHRcdHRoaXMud3Mub25vcGVuID0gKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlY29ubmVjdEF0dGVtcHQgPSAwO1xuXHRcdFx0XHR0aGlzLnN0YXJ0UGluZygpO1xuXHRcdFx0XHR0aGlzLm9wdHMub25TdGF0dXNDaGFuZ2U/Lih0cnVlKTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMud3Mub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGlmIChldmVudC5kYXRhID09PSBcInBvbmdcIikgcmV0dXJuO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSBhcyBzdHJpbmcpIGFzIHsgdHlwZTogc3RyaW5nOyBjbGlwSWQ/OiBzdHJpbmcgfTtcblx0XHRcdFx0XHRpZiAobXNnLnR5cGUgPT09IFwibmV3X2NsaXBcIiAmJiBtc2cuY2xpcElkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wdHMub25OZXdDbGlwKG1zZy5jbGlwSWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0Ly8gaWdub3JlIHVucGFyc2VhYmxlIG1lc3NhZ2VzXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHRoaXMud3Mub25jbG9zZSA9ICgpID0+IHtcblx0XHRcdFx0dGhpcy5zdG9wUGluZygpO1xuXHRcdFx0XHR0aGlzLm9wdHMub25TdGF0dXNDaGFuZ2U/LihmYWxzZSk7XG5cdFx0XHRcdHRoaXMuc2NoZWR1bGVSZWNvbm5lY3QoKTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMud3Mub25lcnJvciA9ICgpID0+IHtcblx0XHRcdFx0dGhpcy53cz8uY2xvc2UoKTtcblx0XHRcdH07XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHR0aGlzLnNjaGVkdWxlUmVjb25uZWN0KCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBzY2hlZHVsZVJlY29ubmVjdCgpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVjb25uZWN0KSByZXR1cm47XG5cblx0XHRjb25zdCBkZWxheSA9IE1hdGgubWluKDEwMDAgKiAyICoqIHRoaXMucmVjb25uZWN0QXR0ZW1wdCwgNjAwMDApO1xuXHRcdHRoaXMucmVjb25uZWN0QXR0ZW1wdCsrO1xuXG5cdFx0dGhpcy5yZWNvbm5lY3RUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5yZWNvbm5lY3RUaW1lciA9IG51bGw7XG5cdFx0XHR0aGlzLmRvQ29ubmVjdCgpO1xuXHRcdH0sIGRlbGF5KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhcnRQaW5nKCk6IHZvaWQge1xuXHRcdHRoaXMuc3RvcFBpbmcoKTtcblx0XHR0aGlzLnBpbmdUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLndzPy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuXHRcdFx0XHR0aGlzLndzLnNlbmQoXCJwaW5nXCIpO1xuXHRcdFx0fVxuXHRcdH0sIDMwMDAwKTtcblx0fVxuXG5cdHByaXZhdGUgc3RvcFBpbmcoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMucGluZ1RpbWVyICE9PSBudWxsKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMucGluZ1RpbWVyKTtcblx0XHRcdHRoaXMucGluZ1RpbWVyID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRkaXNjb25uZWN0KCk6IHZvaWQge1xuXHRcdHRoaXMuc2hvdWxkUmVjb25uZWN0ID0gZmFsc2U7XG5cdFx0dGhpcy5zdG9wUGluZygpO1xuXHRcdGlmICh0aGlzLnJlY29ubmVjdFRpbWVyICE9PSBudWxsKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5yZWNvbm5lY3RUaW1lcik7XG5cdFx0XHR0aGlzLnJlY29ubmVjdFRpbWVyID0gbnVsbDtcblx0XHR9XG5cdFx0aWYgKHRoaXMud3MpIHtcblx0XHRcdHRoaXMud3MuY2xvc2UoKTtcblx0XHRcdHRoaXMud3MgPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLm9wdHMub25TdGF0dXNDaGFuZ2U/LihmYWxzZSk7XG5cdH1cblxuXHRnZXQgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMud3M/LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOO1xuXHR9XG5cblx0dXBkYXRlT3B0cyhvcHRzOiBQYXJ0aWFsPFN5bmNXZWJTb2NrZXRPcHRpb25zPik6IHZvaWQge1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBvcHRzKTtcblx0fVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsSUFBQUEsbUJBQWtEOzs7QUNBbEQsc0JBQXFDO0FBR3JDLGVBQXNCLE9BQU8sVUFBOEIsTUFBYztBQUN4RSxRQUFNLE1BQU0sVUFBTSw0QkFBVztBQUFBLElBQzVCLEtBQUssR0FBRyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBQUEsSUFDbEMsUUFBUTtBQUFBLElBQ1IsU0FBUyxFQUFFLGVBQWUsVUFBVSxTQUFTLEtBQUssR0FBRztBQUFBLEVBQ3RELENBQUM7QUFDRCxTQUFPO0FBQ1I7QUFFQSxlQUFzQixRQUFRLFVBQThCLE1BQWMsTUFBZ0I7QUFDekYsUUFBTSxNQUFNLFVBQU0sNEJBQVc7QUFBQSxJQUM1QixLQUFLLEdBQUcsU0FBUyxVQUFVLEdBQUcsSUFBSTtBQUFBLElBQ2xDLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxNQUNSLGVBQWUsVUFBVSxTQUFTLEtBQUs7QUFBQSxNQUN2QyxnQkFBZ0I7QUFBQSxJQUNqQjtBQUFBLElBQ0EsTUFBTSxRQUFRLE9BQU8sS0FBSyxVQUFVLElBQUksSUFBSTtBQUFBLEVBQzdDLENBQUM7QUFDRCxTQUFPO0FBQ1I7QUFFQSxlQUFzQixPQUFPLFVBQThCLE1BQWMsTUFBZTtBQUN2RixRQUFNLE1BQU0sVUFBTSw0QkFBVztB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QUFBQSxJQUNELENBQUM7QUFDRCxTQUFLLE9BQU8sUUFBUTtBQUFBLEVBQ3JCO0FBQUEsRUFFQSxNQUFjLHVCQUF1QixRQUErQjtBQUNuRSxRQUFJLEtBQUssU0FBUyxjQUFjLFNBQVMsTUFBTSxFQUFHO0FBRWxELFFBQUk7QUFDSCxZQUFNLFNBQVMsTUFBTTtBQUFBLFFBQ3BCLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMO0FBQUEsUUFDQSxNQUFNLEtBQUssYUFBYTtBQUFBLE1BQ3pCO0FBQ0EsVUFBSSxRQUFRO0FBQ1gsWUFBSSx3QkFBTyxlQUFlLEVBQUUsd0JBQXdCLEtBQUssSUFBSSxDQUFDLEVBQUU7QUFBQSxNQUNqRTtBQUFBLElBQ0QsU0FBUyxHQUFHO0FBQ1gsY0FBUSxNQUFNLGdDQUFnQyxDQUFDO0FBQUEsSUFDaEQ7QUFBQSxFQUNEO0FBQUEsRUFFQSxzQkFBNEI7QUFDM0IsYUFBUyxvQkFBb0Isb0JBQW9CLEtBQUssa0JBQWtCO0FBRXhFLFFBQUksQ0FBQywwQkFBUyxZQUFZLENBQUMsS0FBSyxTQUFTLGlCQUFrQjtBQUUzRCxhQUFTLGlCQUFpQixvQkFBb0IsS0FBSyxrQkFBa0I7QUFDckUsU0FBSztBQUFBLE1BQVMsTUFDYixTQUFTLG9CQUFvQixvQkFBb0IsS0FBSyxrQkFBa0I7QUFBQSxJQUN6RTtBQUFBLEVBQ0Q7QUFPRDsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIl9hIiwgInQiLCAiX2EiXQp9Cg==
