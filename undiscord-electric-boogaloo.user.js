// ==UserScript==
// @name            Undiscord 2: Electric Boogaloo
// @description     Versatile Undiscord fork — fast bulk wipe or interactive media backup & delete.
// @version         1.2.0
// @author          Levskitron
// @homepageURL     https://github.com/Levskitron/undiscord2electricboogaloo
// @supportURL      https://github.com/Levskitron/undiscord2electricboogaloo/issues
// @match           https://*.discord.com/*
// @license         MIT
// @namespace       https://github.com/Levskitron/undiscord2electricboogaloo
// @icon            https://victornpb.github.io/undiscord/images/icon128.png
// @grant           GM_download
// @attribution     Original project (https://github.com/victornpb/undiscord)
// ==/UserScript==
(function () {
	'use strict';

	/* rollup-plugin-baked-env */
	const VERSION = '1.2.0';
	const TOOL_NAME = 'Undiscord 2: Electric Boogaloo';
	const WINDOW_WIDTH = 960;

	var themeCss = (`
/* Core layout canvas window adjustments */
#undiscord {
    background-color: #2b2d31 !important;
    color: #dbdee1 !important;
    font-family: sans-serif !important;
    border: 1px solid #1e1f22 !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
    display: flex !important;
    flex-direction: column !important;
}

#undiscord.undiscord-hidden {
    display: none !important;
}

#undiscord .header {
    background-color: #111214 !important;
    color: #f2f3f5 !important;
    height: 48px;
    align-items: center;
    padding: 0 16px;
    display: flex;
    flex-shrink: 0;
}

#undiscord .header h3 {
    color: #f2f3f5 !important;
    font-size: 14px;
    font-weight: 600;
    margin: 0 12px 0 0;
    line-height: 1.2;
    max-width: 280px;
}

/* Force layout canvas elements to align evenly at the bottom */
#undiscord .window-body {
    height: calc(100% - 48px) !important;
    min-height: 0 !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important;
    overflow: hidden !important;
}

#undiscord .sidebar {
    background-color: #1e1f22 !important;
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    padding: 0 !important;
    height: 100% !important;
    min-height: 0 !important;
    box-sizing: border-box !important;
    border-right: 1px solid #111214 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    flex-shrink: 0 !important;
}

#undiscord.hide-sidebar .sidebar {
    display: none !important;
}

#undiscord .sidebar-nav {
    flex: 1 1 0 !important;
    min-height: 0 !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    overscroll-behavior: contain;
    padding: 12px 10px 24px 12px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    align-content: flex-start !important;
}

#undiscord .sidebar-section {
    flex-shrink: 0 !important;
    flex-grow: 0 !important;
    background-color: #2b2d31 !important;
    border: 1px solid #3f4147 !important;
    border-radius: 8px !important;
    overflow: visible !important;
}

#undiscord .sidebar-section > summary {
    list-style: none !important;
    padding: 11px 14px !important;
    margin: 0 !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    letter-spacing: 0.06em !important;
    text-transform: uppercase !important;
    color: #b5bac1 !important;
    cursor: pointer !important;
    user-select: none !important;
    transition: background 0.15s ease, color 0.15s ease !important;
}

#undiscord .sidebar-section > summary::-webkit-details-marker {
    display: none !important;
}

#undiscord .sidebar-section > summary::after {
    content: "▾" !important;
    float: right !important;
    color: #949ba4 !important;
    font-weight: 400 !important;
}

#undiscord .sidebar-section:not([open]) > summary::after {
    content: "▸" !important;
}

#undiscord .sidebar-section > summary:hover {
    background-color: #35373c !important;
    color: #f2f3f5 !important;
}

#undiscord .sidebar-section-body {
    padding: 14px 14px 18px 14px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
    border-top: 1px solid #3f4147 !important;
    overflow: visible !important;
}

#undiscord .field {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
}

#undiscord .field-label {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 8px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    color: #dbdee1 !important;
    margin: 0 !important;
}

#undiscord .field-help {
    font-size: 11px !important;
    font-weight: 600 !important;
    color: #949ba4 !important;
    text-decoration: none !important;
    padding: 2px 8px !important;
    border-radius: 10px !important;
    background-color: #383a40 !important;
    flex-shrink: 0 !important;
    text-transform: none !important;
}

#undiscord .field-help:hover {
    color: #f2f3f5 !important;
    background-color: #5865f2 !important;
}

#undiscord .field-row {
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important;
    gap: 8px !important;
}

#undiscord .field-row .input-wrapper {
    flex: 1 1 auto !important;
    min-width: 0 !important;
}

#undiscord .field-btn {
    flex: 0 0 auto !important;
    min-width: 76px !important;
    width: auto !important;
    margin: 0 !important;
    padding: 0 14px !important;
    background-color: #4e5058 !important;
}

#undiscord .field-btn:hover {
    background-color: #5865f2 !important;
}

#undiscord .field-hint {
    font-size: 12px !important;
    line-height: 1.45 !important;
    font-weight: 400 !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    color: #949ba4 !important;
    margin: 0 !important;
}

#undiscord .field-hint-warn {
    color: #faa61a !important;
}

#undiscord .field-group-title {
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    color: #949ba4 !important;
    margin: 4px 0 0 0 !important;
}

#undiscord .check-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    padding: 12px !important;
    background-color: #232428 !important;
    border-radius: 6px !important;
    border: 1px solid #3f4147 !important;
}

#undiscord .check-list label {
    display: flex !important;
    align-items: flex-start !important;
    gap: 10px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    color: #dbdee1 !important;
    cursor: pointer !important;
    margin: 0 !important;
    line-height: 1.35 !important;
}

#undiscord .check-list input[type="checkbox"] {
    margin: 2px 0 0 0 !important;
    accent-color: #5865f2 !important;
    flex-shrink: 0 !important;
}

#undiscord .pattern-row .input-wrapper {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
}

#undiscord .pattern-row .info {
    color: #949ba4 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    flex-shrink: 0 !important;
}

#undiscord .delay-row .input-wrapper {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
}

#undiscord .delay-row .info {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #949ba4 !important;
    flex-shrink: 0 !important;
}

#undiscord .sidebar-footer {
    flex-shrink: 0 !important;
    padding: 12px 14px 14px !important;
    background-color: #111214 !important;
    border-top: 1px solid #3f4147 !important;
}

#undiscord .sidebar-footer .footer-title {
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #f2f3f5 !important;
    margin: 0 0 4px 0 !important;
    text-transform: none !important;
}

#undiscord .sidebar-footer .footer-meta {
    font-size: 12px !important;
    line-height: 1.5 !important;
    color: #949ba4 !important;
    margin: 0 !important;
    text-transform: none !important;
    font-weight: 400 !important;
}

#undiscord .sidebar-footer a {
    color: #00a8fc !important;
    text-decoration: none !important;
}

#undiscord .sidebar-footer a:hover {
    text-decoration: underline !important;
}

#undiscord .field-hint code {
    background-color: #111214 !important;
    padding: 2px 5px !important;
    border-radius: 4px !important;
    font-size: 11px !important;
    color: #b5bac1 !important;
}

#undiscord .main {
    background-color: #313338 !important;
    display: flex !important;
    flex-direction: column !important;
    flex: 1 1 0 !important;
    min-width: 0 !important;
    min-height: 0 !important;
    height: 100% !important;
    max-width: none !important;
    box-sizing: border-box !important;
}

#undiscord.hide-sidebar .main {
    flex: 1 1 0 !important;
    max-width: 100% !important;
    width: 100% !important;
}

#undiscord .input-wrapper {
    width: 100% !important;
}

/* Custom styled layout text boxes */
#undiscord input[type="text"],
#undiscord input[type="number"],
#undiscord input[type="datetime-local"],
#undiscord input[type="file"],
#undiscord .input {
    background-color: #111214 !important;
    border: 1px solid #3f4147 !important;
    border-radius: 4px !important;
    color: #f2f3f5 !important;
    padding: 8px 10px !important;
    height: 38px !important;
    font-size: 14px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    margin: 0 !important;
}

#undiscord input:focus {
    border-color: #5865f2 !important;
    outline: none !important;
}

/* Layout action selector buttons */
#undiscord .btn, #undiscord button {
    color: #ffffff !important;
    border-radius: 4px !important;
    padding: 6px 16px !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    height: 34px !important;
    transition: background 0.15s ease !important;
    font-size: 14px !important;
    box-sizing: border-box !important;
}


/* Top control actions toolbar block */
#undiscord .tbar {
    background-color: #2b2d31 !important;
    padding: 12px !important;
    border-bottom: 1px solid #1e1f22 !important;
    flex-shrink: 0;
}

#undiscord .tbar button {
    background-color: #4e5058 !important;
}

#undiscord .tbar button:hover {
    background-color: #6d6f78 !important;
}

#undiscord .tbar .row {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 8px !important;
}

#undiscord .tbar .row label {
    display: inline-flex !important;
    align-items: center !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
    gap: 6px !important;
    margin: 0 !important;
}

#undiscord button#start {
    background-color: #da373c !important;
}

#undiscord button#start:hover {
    background-color: #a92b2f !important;
}

/* Main execution console frame */
#undiscord #logArea {
    background-color: #1e1f22 !important;
    color: #dbdee1 !important;
    padding: 12px !important;
    font-family: monospace !important;
    flex-grow: 1 !important;
    min-width: 0 !important;
    min-height: 0 !important;
    margin: 0 !important;
    border-radius: 0 !important;
    white-space: pre-wrap !important;
    overflow-wrap: anywhere !important;
    word-break: break-word !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
}

#undiscord #logArea .log {
    white-space: pre-wrap !important;
    overflow-wrap: anywhere !important;
    word-break: break-word !important;
    max-width: 100% !important;
    line-height: 1.45 !important;
    margin-bottom: 4px !important;
}

#undiscord .footer {
    background-color: #2b2d31 !important;
    border-top: 1px solid #1e1f22 !important;
    padding: 8px 12px !important;
    flex-shrink: 0;
}

#undiscord .info {
    font-size: 12px !important;
    line-height: 1.5 !important;
    color: #949ba4 !important;
}

#undiscord .info a {
    color: #00a8fc !important;
    text-decoration: none !important;
}

#undiscord .info a:hover {
    text-decoration: underline !important;
}

/* Privacy mode — masks log secrets and dots-out sensitive fields (live + retroactive) */
#undiscord.privacy-mode [priv] {
    -webkit-text-security: disc !important;
    text-security: disc !important;
}

#undiscord.privacy-mode x {
    color: transparent !important;
    background-color: #4e5058 !important;
    border-radius: 3px;
    user-select: none;
    cursor: default;
}

#undiscord.privacy-mode x:hover {
    position: relative;
}

#undiscord.privacy-mode x:hover::after {
    content: "Redacted (Privacy mode)";
    position: absolute;
    display: inline-block;
    top: -28px;
    left: 0;
    padding: 4px 8px;
    font-size: 11px;
    white-space: nowrap;
    background-color: #111214;
    color: #dbdee1;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    z-index: 1;
}

#undiscord .log-info { color: #00b0f4 !important; }
#undiscord .log-warn { color: #faa61a !important; }
#undiscord .log-error { color: #f04747 !important; }
#undiscord .log-success { color: #43b581 !important; }

/* Media review modal */
#undiscord #undiscord-media-modal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 100001;
    background: rgba(0, 0, 0, 0.85);
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
}
#undiscord #undiscord-media-modal.open { display: flex; }
#undiscord #undiscord-media-modal .media-modal-panel {
    background: #2b2d31;
    border: 1px solid #1e1f22;
    border-radius: 8px;
    width: min(920px, 96vw);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
#undiscord #undiscord-media-modal .media-modal-header {
    padding: 16px 20px;
    border-bottom: 1px solid #1e1f22;
    flex-shrink: 0;
}
#undiscord #undiscord-media-modal .media-modal-header h4 {
    margin: 0 0 6px;
    color: #00b0f4;
    font-size: 16px;
}
#undiscord #undiscord-media-modal .media-modal-hint {
    font-size: 12px;
    color: #949ba4;
    line-height: 1.4;
}
#undiscord #undiscord-media-modal .media-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    padding: 16px;
    overflow-y: auto;
    flex: 1;
    min-height: 120px;
}
#undiscord #undiscord-media-modal .media-card {
    position: relative;
    border: 2px solid #3f4147;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    background: #111214;
    aspect-ratio: 1;
}
#undiscord #undiscord-media-modal .media-card img,
#undiscord #undiscord-media-modal .media-card video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
#undiscord #undiscord-media-modal .media-card.selected {
    border-color: #23a559;
    box-shadow: 0 0 0 2px #23a559;
}
#undiscord #undiscord-media-modal .media-card.selected::after {
    content: "✓";
    position: absolute;
    top: 4px;
    right: 4px;
    background: #23a559;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    font-weight: bold;
}
#undiscord #undiscord-media-modal .media-badge {
    position: absolute;
    top: 4px;
    left: 4px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 9px;
    padding: 2px 5px;
    border-radius: 3px;
}
#undiscord #undiscord-media-modal .media-modal-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #1e1f22;
    flex-shrink: 0;
}
#undiscord #undiscord-media-modal .media-modal-footer button {
    flex: 1 1 auto;
    min-width: 120px;
    font-size: 12px;
    padding: 8px 10px;
}
#undiscord #undiscord-media-modal .media-btn-safe {
    background: #4e5058 !important;
    color: #fff !important;
}
#undiscord #undiscord-media-modal .media-btn-danger {
    background: #da373c !important;
    color: #fff !important;
}
#undiscord .profile-hint {
    font-size: 12px;
    color: #949ba4;
    line-height: 1.45;
    margin: 0 0 12px;
}
#undiscord .profile-only-custom { display: none; }
#undiscord[data-profile="custom"] .profile-only-custom { display: block; }
`);

	var mainCss = (`
/**** Undiscord Button ****/
#undicord-btn { position: relative; display: inline-flex !important; align-items: center; justify-content: center; width: 24px; min-width: 24px; height: 24px; margin: 0 8px; padding: 0; cursor: pointer; color: var(--interactive-text-default, var(--interactive-normal)); flex: 0 0 auto; z-index: 1; transition: color var(--custom-button-transition-duration, 0.15s) ease, background-color var(--custom-button-transition-duration, 0.15s) ease; }
#undicord-btn:hover { color: var(--interactive-text-hover, var(--interactive-hover, var(--interactive-active))); }
#undicord-btn.undiscord-floating { position: fixed !important; bottom: 24px !important; right: 24px !important; z-index: 999999 !important; margin: 0 !important; padding: 8px !important; border-radius: 50% !important; background: var(--background-floating, #2b2d31) !important; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45) !important; }
#undicord-btn progress { position: absolute; top: 23px; left: -4px; width: 32px; height: 12px; display: none; }
#undicord-btn.running { color: var(--control-critical-primary-background-default, var(--button-danger-background)) !important; }
#undicord-btn.running progress { display: block; }
/**** Undiscord Interface ****/
#undiscord { position: fixed; z-index: 100; display: flex; flex-direction: column; width: 960px; min-width: 960px; max-width: 96vw; height: 80vh; min-height: 448px; max-height: 100vh; color: var(--text-default, var(--text-normal)); border-radius: 4px; background-color: var(--background-surface-high, var(--background-secondary)); box-shadow: var(--elevation-stroke), var(--elevation-high); will-change: top, left, height; }
#undiscord .header .icon { cursor: pointer; }
#undiscord .window-body { height: calc(100% - 48px); min-height: 0; }
#undiscord .main { display: flex; flex: 1; min-width: 0; min-height: 0; background-color: var(--bg-overlay-chat, var(--background-base-lower)); }
#undiscord.hide-sidebar .sidebar { display: none !important; }
#undiscord.hide-sidebar .main { max-width: 100%; width: 100%; }
#undiscord #logArea { font-family: Consolas, Liberation Mono, Menlo, Courier, monospace; font-size: 0.75rem; padding: 10px; user-select: text; flex-grow: 1; min-width: 0; min-height: 0; cursor: auto; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; overflow-x: hidden; overflow-y: auto; }
#undiscord #logArea .log { white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; max-width: 100%; line-height: 1.45; margin-bottom: 4px; }
#undiscord .tbar { padding: 8px; background-color: var(--bg-overlay-2, var(--__header-bar-background)); }
#undiscord .tbar button { margin-right: 4px; margin-bottom: 4px; }
#undiscord .footer { display: flex !important; align-items: center !important; cursor: se-resize; padding-right: 30px; flex-wrap: nowrap !important; gap: 12px !important; }
#undiscord .footer label { display: inline-flex !important; align-items: center !important; white-space: nowrap !important; flex-shrink: 0 !important; gap: 6px !important; margin: 0 !important; }
#undiscord .footer #progressPercent { padding: 0 1em; font-size: small; color: var(--interactive-muted); flex-grow: 1; min-width: 0; overflow-wrap: anywhere; word-break: break-word; white-space: normal; }
.resize-handle { position: absolute; bottom: -15px; right: -15px; width: 30px; height: 30px; transform: rotate(-45deg); background: repeating-linear-gradient(0, var(--background-modifier-accent), var(--background-modifier-accent) 1px, transparent 2px, transparent 4px); cursor: nwse-resize; }
/**** Elements ****/
#undiscord progress { height: 8px; margin-top: 4px; flex-grow: 1; }
#undiscord .importJson { display: flex; flex-direction: row; }
#undiscord .importJson button { margin-left: 5px; width: fit-content; }
`);

	var dragCss = (`
[name^="grab-"] { position: absolute; --size: 6px; --corner-size: 16px; --offset: -1px; z-index: 9; }
[name^="grab-"]:hover{ background: rgba(128,128,128,0.1); }
[name="grab-t"] { top: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-top: var(--offset); cursor: ns-resize; }
[name="grab-r"] { top: var(--corner-size); bottom: var(--corner-size); right: 0px; width: var(--size); margin-right: var(--offset);
  cursor: ew-resize; }
[name="grab-b"] { bottom: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-bottom: var(--offset); cursor: ns-resize; }
[name="grab-l"] { top: var(--corner-size); bottom: var(--corner-size); left: 0px; width: var(--size); margin-left: var(--offset); cursor: ew-resize; }
[name="grab-tl"] { top: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-left: var(--offset); cursor: nwse-resize; }
[name="grab-tr"] { top: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-right: var(--offset); cursor: nesw-resize; }
[name="grab-br"] { bottom: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-right: var(--offset); cursor: nwse-resize; }
[name="grab-bl"] { bottom: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-left: var(--offset); cursor: nesw-resize; }
`);

	var buttonHtml = (`
<div id="undicord-btn" tabindex="0" role="button" aria-label="Delete Messages" title="Delete Messages with {{TOOL_NAME}}">
    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
        <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
    </svg>
    <progress></progress>
</div>
`);

	var undiscordTemplate = (`
<div id="undiscord" class="browser container privacy-mode undiscord-hidden">
    <div class="header">
        <svg class="icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
            <path fill="currentColor"
                d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
            </path>
        </svg>
        <h3>{{TOOL_NAME}}</h3>
        <div class="spacer"></div>
    </div>
    <div class="window-body" style="display: flex; flex-direction: row;">
        <div class="sidebar">
            <div class="sidebar-nav scroll">
                <details class="sidebar-section" open>
                    <summary>Run profile</summary>
                    <div class="sidebar-section-body">
                        <div class="field">
                            <div class="field-label"><span>What are you doing?</span></div>
                            <div class="input-wrapper">
                                <select id="runProfile" class="input" style="height: 40px;">
                                    <option value="fastWipe" selected>Fast wipe (default)</option>
                                    <option value="carefulWipe">Careful wipe</option>
                                    <option value="mediaCurator">Review photos &amp; backup</option>
                                    <option value="serverWipe">Server wipe (all channels)</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <p id="runProfileHint" class="profile-hint">Unattended bulk delete. No popups each page.</p>
                        </div>
                        <div class="profile-only-custom field">
                            <div class="field-label"><span>Delete pipeline</span></div>
                            <div class="check-list">
                                <label><input type="radio" name="pipeline" value="direct" checked><span>Direct — search and delete</span></label>
                                <label><input type="radio" name="pipeline" value="mediaReview"><span>Interactive — review each batch</span></label>
                            </div>
                        </div>
                    </div>
                </details>

                <details class="sidebar-section" open>
                    <summary>Target</summary>
                    <div class="sidebar-section-body">
                        <div class="field">
                            <div class="field-label">
                                <span>Author ID</span>
                                <a class="field-help" href="{{WIKI}}/authorId" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="field-row">
                                <div class="input-wrapper">
                                    <input class="input" id="authorId" type="text" placeholder="Your user ID" priv>
                                </div>
                                <button type="button" class="field-btn" id="getAuthor">Me</button>
                            </div>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Server ID</span>
                                <a class="field-help" href="{{WIKI}}/guildId" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="field-row">
                                <div class="input-wrapper">
                                    <input class="input" id="guildId" type="text" placeholder="Guild or @me for DMs" priv>
                                </div>
                                <button type="button" class="field-btn" id="getGuild">Current</button>
                            </div>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Channel ID</span>
                                <a class="field-help" href="{{WIKI}}/channelId" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="field-row">
                                <div class="input-wrapper">
                                    <input class="input" id="channelId" type="text" placeholder="Channel, or comma-separated" priv>
                                </div>
                                <button type="button" class="field-btn" id="getChannel">Current</button>
                            </div>
                            <p class="field-hint">Use commas for multiple channels, or enable server-wide wipe below.</p>
                            <div class="check-list">
                                <label title="Discover every text channel, thread, and forum in this server via API (and sidebar fallback)">
                                    <input id="deleteAllChannels" type="checkbox">
                                    <span>All message channels in this server</span>
                                </label>
                                <label title="Required for Discord to return messages from age-restricted channels when searching a server">
                                    <input id="includeNsfw" type="checkbox">
                                    <span>Include NSFW channels (server search only)</span>
                                </label>
                                <label title="When you switch channels in Discord, refresh Server/Channel IDs in the form">
                                    <input id="autofillOnNavigate" type="checkbox" checked>
                                    <span>Auto-fill IDs when I change channel</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </details>

                <details class="sidebar-section">
                    <summary>Filters</summary>
                    <div class="sidebar-section-body">
                        <div class="field">
                            <div class="field-label">
                                <span>Text contains</span>
                                <a class="field-help" href="{{WIKI}}/filters" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="input-wrapper">
                                <input id="search" type="text" placeholder="Only delete messages matching this text" priv>
                            </div>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Quick filters</span>
                            </div>
                            <div class="check-list">
                                <label><input id="hasLink" type="checkbox"><span>Has link</span></label>
                                <label><input id="hasFile" type="checkbox"><span>Has file</span></label>
                                <label title="When enabled, pinned messages are deleted too">
                                    <input id="includePinned" type="checkbox" checked>
                                    <span>Delete pinned messages</span>
                                </label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Regex pattern</span>
                                <a class="field-help" href="{{WIKI}}/pattern" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="input-wrapper pattern-row">
                                <span class="info">/</span>
                                <input id="pattern" type="text" placeholder="regular expression" priv>
                                <span class="info">/</span>
                            </div>
                            <p class="field-hint">Case-insensitive. Leave empty to ignore.</p>
                        </div>
                        <p class="field-group-title">Keep messages (inverse)</p>
                        <p class="field-hint">Checked = do <b>not</b> delete these; remove everything else that matches your filters.</p>
                        <div class="check-list">
                            <label><input id="skipLink" type="checkbox"><span>Keep messages with links</span></label>
                            <label><input id="skipFile" type="checkbox"><span>Keep messages with files</span></label>
                            <label><input id="skipPinned" type="checkbox"><span>Keep pinned messages</span></label>
                        </div>
                    </div>
                </details>

                <details class="sidebar-section" id="mediaReviewSection" style="display: none;">
                    <summary>Media review</summary>
                    <div class="sidebar-section-body">
                        <p class="field-hint">Only used with <b>Review photos &amp; backup</b> or Custom → Interactive pipeline.</p>
                        <div class="check-list">
                            <label><input type="radio" name="mediaScanMode" value="media_only" checked><span>Media only — attachments only</span></label>
                            <label><input type="radio" name="mediaScanMode" value="all"><span>All messages — pick what to save</span></label>
                        </div>
                        <div class="field">
                            <div class="field-label"><span>Batch size</span></div>
                            <div class="input-wrapper">
                                <input id="mediaBatchSize" class="input" type="number" value="50" min="5" max="100" step="1">
                            </div>
                            <p class="field-hint">How many messages to load before the review screen (5–100).</p>
                        </div>
                    </div>
                </details>

                <details class="sidebar-section">
                    <summary>Limits</summary>
                    <div class="sidebar-section-body">
                        <p class="field-group-title">Message IDs</p>
                        <div class="field">
                            <div class="field-label">
                                <span>After message</span>
                                <a class="field-help" href="{{WIKI}}/messageId" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="field-row">
                                <div class="input-wrapper">
                                    <input id="minId" type="text" placeholder="Delete newer than this ID" priv>
                                </div>
                                <button type="button" class="field-btn" id="pickMessageAfter">Pick</button>
                            </div>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Before message</span>
                            </div>
                            <div class="field-row">
                                <div class="input-wrapper">
                                    <input id="maxId" type="text" placeholder="Delete older than this ID" priv>
                                </div>
                                <button type="button" class="field-btn" id="pickMessageBefore">Pick</button>
                            </div>
                        </div>
                        <p class="field-group-title">Date range</p>
                        <div class="field">
                            <div class="field-label">
                                <span>Posted after</span>
                                <a class="field-help" href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="input-wrapper">
                                <input id="minDate" type="datetime-local" title="Messages posted AFTER this date">
                            </div>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Posted before</span>
                            </div>
                            <div class="input-wrapper">
                                <input id="maxDate" type="datetime-local" title="Messages posted BEFORE this date">
                            </div>
                            <p class="field-hint field-hint-warn">Date filters do not work together with message ID limits.</p>
                        </div>
                    </div>
                </details>

                <details class="sidebar-section">
                    <summary>Bulk archive</summary>
                    <div class="sidebar-section-body">
                        <div class="field">
                            <div class="field-label">
                                <span>Import index.json</span>
                                <a class="field-help" href="{{WIKI}}/importJson" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="input-wrapper">
                                <input type="file" id="importJsonInput" accept="application/json,.json">
                            </div>
                            <p class="field-hint">From a Discord data export: choose <code>messages/index.json</code> to fill channel IDs for a full archive wipe.</p>
                        </div>
                    </div>
                </details>

                <details class="sidebar-section">
                    <summary>Advanced</summary>
                    <div class="sidebar-section-body">
                        <p class="field-group-title">Timing</p>
                        <div class="field">
                            <div class="field-label">
                                <span>Search delay</span>
                                <a class="field-help" href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="input-wrapper delay-row">
                                <input id="searchDelay" class="input" type="number" value="30" min="1" max="60" step="1" title="Seconds between search pages">
                                <span class="info">sec</span>
                            </div>
                            <p class="field-hint">Pause between search pages (1–60 s). Default 30.</p>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Delete delay</span>
                                <a class="field-help" href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="input-wrapper delay-row">
                                <input id="deleteDelay" class="input" type="number" value="1" min="0.1" max="10" step="0.1" title="Seconds between each delete">
                                <span class="info">sec</span>
                            </div>
                            <p class="field-hint">Pause between deletes (0.1–10 s). Raise if rate limited.</p>
                        </div>
                        <p class="field-group-title">Reliability</p>
                        <div class="check-list">
                            <label title="Only applies to Fast wipe and Custom with Direct pipeline">
                                <input id="askConfirmation" type="checkbox">
                                <span>Confirm before first delete batch</span>
                            </label>
                            <label title="When delete fails because a thread is archived, temporarily unarchive it and retry (re-archives when empty)">
                                <input id="unarchiveThreads" type="checkbox">
                                <span>Unarchive threads before delete</span>
                            </label>
                        </div>
                        <div class="field">
                            <div class="field-label">
                                <span>Empty page retries</span>
                            </div>
                            <div class="input-wrapper">
                                <input id="emptyPageRetries" class="input" type="number" value="2" min="0" max="10" step="1">
                            </div>
                            <p class="field-hint">Retries when Discord returns an empty search page before stopping.</p>
                        </div>
                        <p class="field-group-title">Authentication</p>
                        <div class="field">
                            <div class="field-label">
                                <span>Token</span>
                                <a class="field-help" href="{{WIKI}}/authToken" title="Help" target="_blank" rel="noopener noreferrer">Help</a>
                            </div>
                            <div class="field-row">
                                <div class="input-wrapper">
                                    <input class="input" id="token" type="text" autocomplete="off" placeholder="Usually auto-filled" priv>
                                </div>
                                <button type="button" class="field-btn" id="getToken">Fill</button>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
            <footer class="sidebar-footer">
                <div class="footer-title">{{TOOL_NAME}} v{{VERSION}}</div>
                <p class="footer-meta">
                    by <a href="https://github.com/Levskitron" target="_blank" rel="noopener noreferrer">Levskitron</a>
                    · fork of <a href="{{ORIGINAL}}" target="_blank" rel="noopener noreferrer" title="Original Undiscord by Victornpb">Undiscord</a>
                </p>
            </footer>
        </div>
        <div class="main col">
            <div class="tbar col">
                <div class="row">
                    <button id="toggleSidebar" class="sizeMedium icon">☰</button>
                    <button id="start" class="sizeMedium danger" style="width: 150px;" title="Start the deletion process">▶︎ Delete</button>
                    <button id="stop" class="sizeMedium" title="Stop the deletion process" disabled>🛑 Stop</button>
                    <button id="copyLog" class="sizeMedium" title="Copy log text to clipboard">Copy log</button>
                    <button id="clear" class="sizeMedium">Clear log</button>
                    <label class="row" title="Masks Author/Server/Channel IDs and auth token as dots in the form. Hides message text, usernames, and IDs in the log (including lines already written). Toggle anytime — reversible.">
                        <input id="privacyMode" type="checkbox" checked> Privacy mode
                    </label>
                </div>
                <div class="row">
                    <progress id="progressBar" style="display:none;"></progress>
                </div>
            </div>
            <div id="logArea" class="logarea scroll" role="log" aria-live="polite">
                <div class="" style="background: var(--background-mentioned); padding: .5em;">Default <b>Fast wipe</b> runs unattended. Use <b>Review photos &amp; backup</b> only when you want to save attachments before deleting. Tip: if deletion stops early, increase <b>Empty page retries</b> under Advanced.</div>
                <center>
                    <div>Star <a href="{{HOME}}" target="_blank" rel="noopener noreferrer">this project</a> on GitHub!</div>
                    <div><a href="{{HOME}}/issues" target="_blank" rel="noopener noreferrer">Issues or help</a></div>
                    <div>Based on <a href="{{ORIGINAL}}" target="_blank" rel="noopener noreferrer">Undiscord</a> by victornpb</div>
                </center>
            </div>
            <div class="tbar footer row">
                <div id="progressPercent"></div>
                <span class="spacer"></span>
                <label>
                    <input id="autoScroll" type="checkbox" checked> Auto scroll
                </label>
                <label title="Live toggle — applies from the next page/delete onward while a run is active (not retroactive)">
                    <input id="verboseLog" type="checkbox"> Verbose log
                </label>
                <label title="Live toggle — each delete logged from when enabled; past deletes are not replayed">
                    <input id="logDeletions" type="checkbox"> Log each deletion
                </label>
                <div class="resize-handle"></div>
            </div>
        </div>
    </div>
    <div id="undiscord-media-modal" aria-hidden="true">
        <div class="media-modal-panel" role="dialog" aria-labelledby="mediaModalTitle">
            <div class="media-modal-header">
                <h4 id="mediaModalTitle">Backup selection</h4>
                <p class="media-modal-hint">Click items to select (green border). Then choose an action. Double-click to open in Discord.</p>
            </div>
            <div id="mediaGallery" class="media-gallery"></div>
            <div id="mediaModalFooter" class="media-modal-footer"></div>
        </div>
    </div>
</div>

`);

	const log = {
	  debug() { return logFn ? logFn('debug', arguments) : console.debug.apply(console, arguments); },
	  info() { return logFn ? logFn('info', arguments) : console.info.apply(console, arguments); },
	  verb() { return logFn ? logFn('verb', arguments) : console.log.apply(console, arguments); },
	  warn() { return logFn ? logFn('warn', arguments) : console.warn.apply(console, arguments); },
	  error() { return logFn ? logFn('error', arguments) : console.error.apply(console, arguments); },
	  success() { return logFn ? logFn('success', arguments) : console.info.apply(console, arguments); },
	};

	var logFn; // custom console.log function
	const setLogFn = (fn) => logFn = fn;

	// Helpers
	const wait = async ms => new Promise(done => setTimeout(done, ms));
	const msToHMS = s => `${s / 3.6e6 | 0}h ${(s % 3.6e6) / 6e4 | 0}m ${(s % 6e4) / 1000 | 0}s`;

	/** UI delay fields are in seconds; core options stay in milliseconds */
	const formatDelaySeconds = (ms) => {
	  const s = ms / 1000;
	  return Number.isInteger(s) ? String(s) : s.toFixed(1);
	};
	const parseDelaySeconds = (raw, fallbackMs, minMs, maxMs) => {
	  const s = parseFloat(String(raw).trim().replace(',', '.'));
	  if (Number.isNaN(s)) return fallbackMs;
	  const ms = Math.round(s * 1000);
	  return Math.min(maxMs, Math.max(minMs, ms));
	};

	const SEARCH_DELAY_MS = { min: 1000, max: 60000, default: 30000 };
	const DELETE_DELAY_MS = { min: 100, max: 10000, default: 1000 };

	function syncDelayInput(id, ms, bounds) {
	  if (!ui.undiscordWindow) return ms;
	  const input = ui.undiscordWindow.querySelector(`#${id}`);
	  if (!input) return ms;
	  const clamped = Math.min(bounds.max, Math.max(bounds.min, ms));
	  input.value = formatDelaySeconds(clamped);
	  return clamped;
	}

	function readDelayInput(id, bounds) {
	  if (!ui.undiscordWindow) return bounds.default;
	  const input = ui.undiscordWindow.querySelector(`#${id}`);
	  const ms = parseDelaySeconds(input.value, bounds.default, bounds.min, bounds.max);
	  const clamped = syncDelayInput(id, ms, bounds);
	  undiscordCore.options[id] = clamped;
	  return clamped;
	}
	const escapeHTML = html => String(html).replace(/[&<"']/g, m => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '\'': '&#039;' })[m]);
	/** Wrap sensitive log fragments — styled by #undiscord.privacy-mode (retroactive via CSS) */
	const redact = str => `<x>${escapeHTML(String(str ?? ''))}</x>`;
	const queryString = params => params.filter(p => p[1] !== undefined).map(p => p[0] + '=' + encodeURIComponent(p[1])).join('&');
	const ask = async msg => new Promise(resolve => setTimeout(() => resolve(window.confirm(msg)), 10));
	const toSnowflake = (date) => /:/.test(date) ? ((new Date(date).getTime() - 1420070400000) * Math.pow(2, 22)) : date;
	const replaceInterpolations = (str, obj, removeMissing = false) => str.replace(/\{\{([\w_]+)\}\}/g, (m, key) => obj[key] || (removeMissing ? '' : m));

	const PREFIX$1 = '[UNDISCORD]';

	/** User-facing completion messages */
	const END_MSG = {
	  ALL_DELETED: 'Done — all matching messages were removed.',
	  PINNED_REMAINING: 'Done — but pinned messages were left. Turn on "Delete pinned messages" under Filters to remove them, then run again.',
	  NOTHING_TO_DELETE: 'Done — nothing here can be deleted. Discord search often counts system events (calls, joins) that only you can see but cannot remove.',
	  NO_MATCHES: 'Done — no messages match your search.',
	  EMPTY_EXHAUSTED: 'Stopped — search kept returning empty pages. Try increasing Empty page retries, or wait and run again.',
	  EMPTY_END: 'Done — no more search results.',
	};

	/** Presets — simple default; power features opt-in via profile or Custom */
	const RUN_PROFILES = {
	  fastWipe: {
	    hint: 'Unattended bulk delete. No popups each page.',
	    pipeline: 'direct',
	    askForConfirmation: false,
	    searchDelayMs: SEARCH_DELAY_MS.default,
	    deleteDelayMs: DELETE_DELAY_MS.default,
	    emptyPageRetries: 2,
	    showMediaSection: false,
	  },
	  carefulWipe: {
	    hint: 'Slower delays and confirm before the first delete batch.',
	    pipeline: 'direct',
	    askForConfirmation: true,
	    searchDelayMs: 45000,
	    deleteDelayMs: 1500,
	    emptyPageRetries: 4,
	    showMediaSection: false,
	  },
	  mediaCurator: {
	    hint: 'Pauses every batch so you can backup attachments and choose what to delete.',
	    pipeline: 'mediaReview',
	    mediaScanMode: 'media_only',
	    mediaBatchSize: 50,
	    askForConfirmation: false,
	    searchDelayMs: 30000,
	    deleteDelayMs: 200,
	    emptyPageRetries: 2,
	    showMediaSection: true,
	  },
	  serverWipe: {
	    hint: 'Finds all text channels and threads in the server, then deletes from each one by one. Use high delete delay.',
	    pipeline: 'direct',
	    deleteAllChannels: true,
	    askForConfirmation: true,
	    searchDelayMs: 30000,
	    deleteDelayMs: 1500,
	    emptyPageRetries: 3,
	    showMediaSection: false,
	  },
	  custom: {
	    hint: 'You control pipeline and timing. Expand Media review if using interactive mode.',
	    showMediaSection: true,
	  },
	};

	const MEDIA_BATCH_ACTIONS = [
	  { id: 'btnSelectAll', label: 'Select all', cls: 'media-btn-safe' },
	  { id: 'btnKeepSelected', label: 'Keep selected', cls: 'media-btn-safe', action: 'KEEP_SELECTED' },
	  { id: 'btnBackupKeepSelected', label: 'Backup & keep selected', cls: 'media-btn-safe', action: 'BACKUP_KEEP_SELECTED' },
	  { id: 'btnBackupSelectKeep', label: 'Backup selected & keep all', cls: 'media-btn-safe', action: 'BACKUP_SELECT_KEEP' },
	  { id: 'btnBackupAllKeepAll', label: 'Backup & keep all', cls: 'media-btn-safe', action: 'BACKUP_ALL_KEEP_ALL' },
	  { id: 'btnSkipBatch', label: 'Skip batch', cls: 'media-btn-safe', action: 'SKIP' },
	  { id: 'btnDeleteAll', label: 'Delete all', cls: 'media-btn-danger', action: 'DELETE_ALL' },
	  { id: 'btnDeleteSelected', label: 'Delete selected', cls: 'media-btn-danger', action: 'DELETE_SELECTED' },
	  { id: 'btnBackupDeleteSelected', label: 'Backup & delete selected', cls: 'media-btn-danger', action: 'BACKUP_DELETE_SELECTED' },
	  { id: 'btnBackupSelectDelete', label: 'Backup selected & delete all', cls: 'media-btn-danger', action: 'BACKUP_SELECT_DELETE_ALL' },
	  { id: 'btnBackupAllDeleteAll', label: 'Backup & delete all', cls: 'media-btn-danger', action: 'BACKUP_ALL_DELETE_ALL' },
	  { id: 'btnMediaAbort', label: 'Abort', cls: 'media-btn-danger', action: 'STOP' },
	];

	/**
	 * Delete all messages in a Discord channel or DM
	 * @author Victornpb <https://www.github.com/victornpb>
	 * @see https://github.com/victornpb/undiscord
	 */
	class UndiscordCore {

	  options = {
	    authToken: null, // Your authorization token
	    authorId: null, // Author of the messages you want to delete
	    guildId: null, // Server were the messages are located
	    channelId: null, // Channel were the messages are located
	    minId: null, // Only delete messages after this, leave blank do delete all
	    maxId: null, // Only delete messages before this, leave blank do delete all
	    content: null, // Filter messages that contains this text content
	    hasLink: null, // Filter messages that contains link
	    hasFile: null, // Filter messages that contains file
	    includeNsfw: null, // Search in NSFW channels
	    includePinned: null, // Delete messages that are pinned
	    pattern: null, // Only delete messages that match the regex (insensitive)
	    searchDelay: null, // Delay each time we fetch for more messages
	    deleteDelay: null, // Delay between each delete operation
	    emptyPageRetries: 2, // Retries when search returns an empty page before stopping
	    verboseLog: false, // Show technical per-page details in the log panel
	    logEveryDeletion: false, // Log each deleted message in the panel
	    maxAttempt: 2, // Attempts to delete a single message if it fails
	    askForConfirmation: true,
	    retryOnNetworkError: true,
	    maxNetworkRetries: 8,
	    networkRetryBaseDelay: 1000,
	    pipeline: 'direct', // 'direct' | 'mediaReview'
	    mediaScanMode: 'media_only', // 'media_only' | 'all'
	    mediaBatchSize: 50,
	    skipLink: false,
	    skipFile: false,
	    skipPinned: false,
	    serverName: 'Server',
	    channelName: 'Channel',
	    unarchiveThreads: false,
	  };

	  state = {
	    running: false,
	    delCount: 0,
	    failCount: 0,
	    skipCount: 0,
	    grandTotal: 0,
	    offset: 0,
	    iterations: 0,

	    _seachResponse: null,
	    _messagesToDelete: [],
	    _skippedMessages: [],
	    emptyPageRetryCount: 0,
	    _emptyPageStreak: 0,
	    pinnedSkipCount: 0,
	    _historyScanActive: false,
	    _historyBeforeId: null,
	    _historyExhausted: false,
	    _rawDiscoveredCount: 0,
	    _forcedChannelFilterActive: false,
	    _batchActive: false,
	    _batchIndex: 0,
	    _batchTotal: 0,
	    _avgDeletePerPage: 25,
	  };

	  stats = {
	    startTime: new Date(), // start time
	    throttledCount: 0, // how many times you have been throttled
	    throttledTotalTime: 0, // the total amount of time you spent being throttled
	    lastPing: null, // the most recent ping
	    avgPing: null, // average ping used to calculate the estimated remaining time
	    etr: 0,
	    _etrLastUpdateTs: 0,
	    pendingWaitUntilTs: 0,
	  };

	  // events
	  onStart = undefined;
	  onProgress = undefined;
	  onStop = undefined;

	  _userStopped = false;
	  _runFinished = false;
	  _activeRequestController = null;
	  _pendingWait = null;
	  _mediaModalState = null;

	  resetState() {
	    this.state = {
	      running: false,
	      delCount: 0,
	      failCount: 0,
	      skipCount: 0,
	      grandTotal: 0,
	      offset: 0,
	      iterations: 0,

	      _seachResponse: null,
	      _messagesToDelete: [],
	      _skippedMessages: [],
	      emptyPageRetryCount: 0,
	      _emptyPageStreak: 0,
	      pinnedSkipCount: 0,
	      _historyScanActive: false,
	      _historyBeforeId: null,
	      _historyExhausted: false,
	      _rawDiscoveredCount: 0,
	      _forcedChannelFilterActive: false,
	      _batchActive: false,
	      _batchIndex: 0,
	      _batchTotal: 0,
	      _avgDeletePerPage: 25,
	    };

	    this._skipHintShown = false;
	    this._pinnedHintShown = false;
	    this._activeRequestController = null;
	    this._pendingWait = null;
	    this.options.askForConfirmation = true;
	  }

	  processedCount() {
	    return this.state.delCount + this.state.failCount + this.state.skipCount;
	  }

	  cancelInFlightRequest() {
	    try { this._activeRequestController?.abort(); } catch {}
	    this._activeRequestController = null;
	  }

	  beginAbortableRequest() {
	    this.cancelInFlightRequest();
	    const controller = new AbortController();
	    this._activeRequestController = controller;
	    return controller;
	  }

	  endAbortableRequest(controller) {
	    if (this._activeRequestController === controller) this._activeRequestController = null;
	  }

	  cancelPendingWait() {
	    if (!this._pendingWait) return;
	    const { timer, resolve } = this._pendingWait;
	    this._pendingWait = null;
	    try { clearTimeout(timer); } catch {}
	    try { resolve(); } catch {}
	  }

	  networkRetryDelayMs(attempt) {
	    const base = this.options.networkRetryBaseDelay ?? 1000;
	    return Math.min(30000, base * Math.pow(1.6, attempt - 1)) + Math.floor(Math.random() * 250);
	  }

	  messageMatchesLocalHistoryFilters(message) {
	    if (!message) return false;
	    if (this.options.authorId && String(message?.author?.id || '') !== String(this.options.authorId)) return false;
	    if (this.options.minId) {
	      const minSnow = String(toSnowflake(this.options.minId));
	      if (BigInt(message.id) <= BigInt(minSnow)) return false;
	    }
	    if (this.options.maxId) {
	      const maxSnow = String(toSnowflake(this.options.maxId));
	      if (BigInt(message.id) >= BigInt(maxSnow)) return false;
	    }
	    const content = String(message.content || '');
	    if (this.options.content && !content.toLowerCase().includes(String(this.options.content).toLowerCase())) return false;
	    if (this.options.hasFile && !(Array.isArray(message.attachments) && message.attachments.length > 0)) return false;
	    if (this.options.hasLink && !/(https?:\/\/[^\s]+)/i.test(content)) return false;
	    return true;
	  }

	  async searchByHistoryScan() {
	    const channelId = String(this.options.channelId || '').trim();
	    if (!channelId) {
	      this.state._seachResponse = { messages: [], total_results: 0 };
	      return this.state._seachResponse;
	    }

	    const params = [['limit', '100']];
	    if (this.state._historyBeforeId) params.push(['before', this.state._historyBeforeId]);
	    const url = `https://discord.com/api/v9/channels/${channelId}/messages?${queryString(params)}`;

	    let resp;
	    let networkAttempt = 0;
	    while (true) {
	      try {
	        const reqCtl = this.beginAbortableRequest();
	        this.beforeRequest();
	        resp = await fetch(url, {
	          headers: { Authorization: this.options.authToken },
	          signal: reqCtl.signal,
	        });
	        this.endAbortableRequest(reqCtl);
	        this.afterRequest();
	        break;
	      } catch (err) {
	        if (err?.name === 'AbortError' && !this.state.running) throw err;
	        if (!this.state.running) throw err;
	        if (!this.options.retryOnNetworkError) {
	          this.state.running = false;
	          log.error('History scan request threw an error:', err);
	          throw err;
	        }
	        networkAttempt++;
	        if (networkAttempt > (this.options.maxNetworkRetries ?? 8)) {
	          this.state.running = false;
	          log.error(`History scan failed after ${this.options.maxNetworkRetries} network retries.`, err);
	          throw err;
	        }
	        const delay = this.networkRetryDelayMs(networkAttempt);
	        log.warn(`Network error on history scan (${networkAttempt}/${this.options.maxNetworkRetries}). Retrying in ${Math.round(delay)}ms…`, String(err?.message || err));
	        if (!await this.interruptibleWait(delay)) throw err;
	      }
	    }

	    if (!resp.ok) {
	      if (resp.status === 429) {
	        let w = (await resp.json()).retry_after * 1000;
	        w = w || this.options.searchDelay;
	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        log.warn(`History scan rate-limited for ${(w / 1000).toFixed(1)}s. Retrying…`);
	        if (!await this.interruptibleWait(w)) return;
	        return await this.searchByHistoryScan();
	      }
	      this.state.running = false;
	      log.error(`History scan failed with status ${resp.status}`, await resp.text());
	      throw resp;
	    }

	    const batch = await resp.json();
	    const list = Array.isArray(batch) ? batch : [];
	    if (list.length > 0) this.state._historyBeforeId = String(list[list.length - 1].id);
	    else this.state._historyExhausted = true;

	    const matched = list.filter(m => this.messageMatchesLocalHistoryFilters(m));
	    const groups = matched.map(m => [{ ...m, hit: true }]);
	    const data = {
	      messages: groups,
	      total_results: this.state.grandTotal + matched.length,
	      __undiscord_history_scan: true,
	    };
	    this.state._seachResponse = data;
	    if (this.options.verboseLog) {
	      log.verb(`History scan: fetched ${list.length}, matched ${matched.length}, exhausted=${this.state._historyExhausted ? 'yes' : 'no'}`);
	    }
	    return data;
	  }

	  /** Re-check after a delete batch — finish early when search index is caught up */
	  async quickCheckIfDone() {
	    const oldOffset = this.state.offset;
	    const oldHistoryBefore = this.state._historyBeforeId;
	    try {
	      this.state.offset = 0;
	      if (this.state._historyScanActive) this.state._historyBeforeId = null;
	      await this.search();
	      await this.filterResponse();
	      const hasMore = this.state._messagesToDelete.length > 0 || this.state._skippedMessages.length > 0;
	      const processed = this.processedCount();
	      const target = this.state.grandTotal || 0;
	      if (!hasMore) {
	        if (target > 0 && processed < target) {
	          log.warn(`Quick check looked empty but only processed ${processed}/${target}. Continuing…`);
	          return false;
	        }
	        if (this.options.verboseLog) log.verb('Quick check: no more messages. Finishing.');
	        this.state.running = false;
	        return true;
	      }
	      return false;
	    } catch (e) {
	      log.warn('Quick check failed, continuing normally…', e);
	      return false;
	    } finally {
	      this.state.offset = oldOffset;
	      if (this.state._historyScanActive) this.state._historyBeforeId = oldHistoryBefore;
	    }
	  }

	  /** Pick an honest completion line (e.g. pinned left when filter is off) */
	  completionMessage() {
	    if (!this.options.includePinned && this.state.pinnedSkipCount > 0) {
	      return END_MSG.PINNED_REMAINING;
	    }
	    if (this.state.delCount === 0 && this.state.skipCount > 0) {
	      return END_MSG.NOTHING_TO_DELETE;
	    }
	    return END_MSG.ALL_DELETED;
	  }

	  /** True when deletes + skips + failures cover Discord's reported total */
	  isComplete() {
	    return this.state.grandTotal > 0
	      && (this.state.delCount + this.state.failCount + this.state.skipCount) >= this.state.grandTotal;
	  }

	  logSummary(message) {
	    const { delCount, failCount, skipCount, grandTotal, pinnedSkipCount } = this.state;
	    log.info(message);
	    const pinnedNote = (!this.options.includePinned && pinnedSkipCount > 0)
	      ? `, ${pinnedSkipCount} pinned skipped`
	      : '';
	    log.info(`Summary: ${delCount} deleted, ${failCount} failed, ${skipCount} skipped${pinnedNote} (${grandTotal} reported by Discord).`);
	  }

	  logPageStatus() {
	    const page = this.state._seachResponse?.messages?.length ?? 0;
	    const del = this.state._messagesToDelete.length;
	    const skip = this.state._skippedMessages.length;
	    if (this.options.verboseLog) {
	      log.verb(
	        `Page ${this.state.iterations}: ${del} to delete, ${skip} skipped (${page} on page), offset ${this.state.offset}`,
	        `Discord reports ~${this.state.grandTotal} total matches`
	      );
	      this.printStats();
	      log.verb(`Estimated time remaining: ${msToHMS(this.stats.etr)}`);
	    } else if (del > 0) {
	      log.info(`Found ${del} message(s) to delete on this page (${this.state.delCount + del}/${this.state.grandTotal} overall).`);
	    }
	  }

	  /** Automate the deletion process of multiple channels */
	  async runBatch(queue) {
	    if (this.state.running) return log.error('Already running!');

	    log.info(`Running batch with ${queue.length} channel job(s)…`);
	    this.state._batchActive = true;
	    this.state._batchTotal = queue.length;

	    for (let i = 0; i < queue.length; i++) {
	      const job = queue[i];
	      this.state._batchIndex = i + 1;
	      const label = job.channelName ? `#${job.channelName}` : String(job.channelId || '');
	      log.info(`Channel ${i + 1}/${queue.length}${label ? ` — ${label}` : ''}`);

	      this.options = {
	        ...this.options,
	        ...job,
	        channelName: job.channelName || this.options.channelName,
	      };

	      await this.run(true);
	      if (!this.state.running) break;

	      log.info(`Channel job finished (${i + 1}/${queue.length}).`);
	      this.resetState();
	      this.options.askForConfirmation = false;
	      this.state.running = true;
	      this.state._batchActive = true;
	      this.state._batchTotal = queue.length;
	      this.state._batchIndex = i + 1;
	    }

	    this.state._batchActive = false;
	    log.info('Batch finished.');
	    this.state.running = false;
	  }

	  /** Sleep in small steps so Stop can break out without waiting the full delay */
	  async interruptibleWait(ms) {
	    const waitMs = Math.max(0, Number(ms) || 0);
	    if (waitMs === 0) return this.state.running;
	    this.stats.pendingWaitUntilTs = Date.now() + waitMs;
	    return new Promise((resolve) => {
	      const timer = setTimeout(() => {
	        if (this._pendingWait?.timer === timer) {
	          this._pendingWait = null;
	          this.stats.pendingWaitUntilTs = 0;
	        }
	        resolve(this.state.running);
	      }, waitMs);
	      this._pendingWait = {
	        timer,
	        resolve: () => resolve(this.state.running),
	      };
	    });
	  }

	  async tryUnarchiveThread(channelId) {
	    const id = String(channelId || '').trim();
	    if (!id) return false;
	    try {
	      const reqCtl = this.beginAbortableRequest();
	      this.beforeRequest();
	      const resp = await fetch(`https://discord.com/api/v9/channels/${id}`, {
	        method: 'PATCH',
	        headers: {
	          Authorization: this.options.authToken,
	          'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({ archived: false }),
	        signal: reqCtl.signal,
	      });
	      this.endAbortableRequest(reqCtl);
	      this.afterRequest();
	      if (resp.ok) {
	        log.info('Thread unarchived — retrying delete.');
	        return true;
	      }
	      log.verb(`Unarchive returned ${resp.status}.`);
	    } catch (err) {
	      if (err?.name !== 'AbortError') log.verb('Unarchive failed:', err);
	    }
	    return false;
	  }

	  /** Always run once when a job ends — natural finish or Stop */
	  completeRun() {
	    if (this._runFinished) return;
	    this._runFinished = true;
	    this.state.running = false;

	    this.stats.endTime = new Date();
	    const elapsed = msToHMS(this.stats.endTime.getTime() - this.stats.startTime.getTime());
	    const { delCount, failCount, skipCount, grandTotal } = this.state;

	    if (this._userStopped) {
	      log.warn('Stopped by you!');
	    } else if (grandTotal > 0 && !this.isComplete()) {
	      log.warn(
	        'Run ended before every search match was processed. Large jobs often need multiple runs,',
	        'higher Empty page retries (Advanced), or a lower Search delay. Discord search can also return empty pages mid-run.'
	      );
	    }

	    if (delCount + failCount + skipCount > 0 || grandTotal > 0) {
	      const pinnedNote = (!this.options.includePinned && this.state.pinnedSkipCount > 0)
	        ? `, ${this.state.pinnedSkipCount} pinned skipped`
	        : '';
	      log.info(`Summary: ${delCount} deleted, ${failCount} failed, ${skipCount} skipped${pinnedNote} (${grandTotal} reported by Discord).`);
	    }
	    if (this.stats.throttledCount > 0) {
	      log.info(`Rate limits: ${this.stats.throttledCount}×, total wait ${msToHMS(this.stats.throttledTotalTime)}.`);
	    }

	    log.success(`Finished at ${this.stats.endTime.toLocaleString()} (${elapsed})`);
	    if (this.onStop) this.onStop(this.state, this.stats);
	  }

	  /** Start the deletion process */
	  async run(isJob = false) {
	    if (this.state.running && !isJob) return log.error('Already running!');
	    if (this.options.pipeline === 'mediaReview') return this.runMediaReview(isJob);

	    this._userStopped = false;
	    this._runFinished = false;
	    this.state.running = true;
	    this.stats.startTime = new Date();
	    this.stats._etrLastUpdateTs = 0;
	    this.stats.pendingWaitUntilTs = 0;
	    this.stats.etr = 0;

	    log.success(`Started at ${this.stats.startTime.toLocaleString()}`);
	    if (this.options.verboseLog) {
	      log.debug(
	        `authorId = "${redact(this.options.authorId)}"`,
	        `guildId = "${redact(this.options.guildId)}"`,
	        `channelId = "${redact(this.options.channelId)}"`,
	        `minId = "${redact(this.options.minId)}"`,
	        `maxId = "${redact(this.options.maxId)}"`,
	        `hasLink = ${!!this.options.hasLink}`,
	        `hasFile = ${!!this.options.hasFile}`,
	      );
	    } else {
	      log.info('Searching for messages to delete…');
	    }

	    if (this.onStart) this.onStart(this.state, this.stats);

	    try {
	    do {
	      this.state.iterations++;

	      log.debug('Fetching messages...');
	      // Search messages
	      await this.search();
	      if (!this.state.running) break;

	      // Process results and find which messages should be deleted
	      await this.filterResponse();
	      if (!this.state.running) break;

	      this.calcEtr();
	      this.logPageStatus();

	      // if there are messages to delete, delete them
	      if (this.state._messagesToDelete.length > 0) {

	        if (await this.confirm() === false) {
	          this.state.running = false; // break out of a job
	          break; // immmediately stop this iteration
	        }

	        await this.deleteMessagesFromList();

	        const doneNow = await this.quickCheckIfDone();
	        if (doneNow) {
	          this.logSummary(this.completionMessage());
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          break;
	        }

	        this.state.emptyPageRetryCount = 0;
	        this.state._emptyPageStreak = 0;

	        if (this.isComplete()) {
	          this.logSummary(this.completionMessage());
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          this.state.running = false;
	        }
	      }
	      else if (this.state._skippedMessages.length > 0) {
	        // There are stuff, but nothing to delete (example a page full of system messages)
	        const skipped = this.state._skippedMessages.length;
	        const pinnedSkipped = this.state._skippedMessages.filter(m => m.pinned).length;
	        this.state.skipCount += skipped;
	        if (pinnedSkipped && !this.options.includePinned) {
	          this.state.pinnedSkipCount += pinnedSkipped;
	          if (!this._pinnedHintShown) {
	            this._pinnedHintShown = true;
	            log.info('Pinned messages are skipped while "Delete pinned messages" is off. Enable it under Filters to delete them.');
	          }
	        }
	        if (!this._skipHintShown) {
	          this._skipHintShown = true;
	          log.info('Discord matched messages that cannot be deleted (calls, joins, system events, etc.). They count toward the total but are skipped.');
	        }
	        if (this.options.verboseLog) {
	          const oldOffset = this.state.offset;
	          this.state.offset += skipped;
	          log.verb(`Skipped ${skipped} on this page (offset ${oldOffset} → ${this.state.offset})`);
	        } else {
	          log.info(`Skipped ${skipped} non-deletable message(s) on this page.`);
	          this.state.offset += skipped;
	        }
	        this.state.emptyPageRetryCount = 0;
	        this.state._emptyPageStreak = 0;

	        if (this.isComplete()) {
	          this.logSummary(this.completionMessage());
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          this.state.running = false;
	        }
	      }
	      else {
	        const processed = this.processedCount();
	        const target = this.state.grandTotal || 0;
	        const rawCount = Number(this.state._rawDiscoveredCount || 0);

	        if (this.state._historyScanActive && this.state._historyExhausted && rawCount === 0) {
	          if (target > processed) {
	            log.warn(`History scan exhausted (${processed}/${target} processed). Ending to avoid empty-page waits.`);
	          }
	          this.logSummary(target > processed ? END_MSG.EMPTY_EXHAUSTED : this.completionMessage());
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          this.state.running = false;
	          continue;
	        }

	        if (this.state._forcedChannelFilterActive && rawCount > 0) {
	          const pageCount = Number(this.state._seachResponse?.messages?.length || 0);
	          if (pageCount > 0) {
	            this.state.offset += pageCount;
	            if (this.options.verboseLog) log.verb(`No hits for target channel on this guild page; offset → ${this.state.offset}`);
	            if (this.state.running) await this.interruptibleWait(this.options.searchDelay);
	            continue;
	          }
	        }

	        const pastResults = target > 0 && this.state.offset >= target;

	        if (this.isComplete() || (pastResults && processed >= target)) {
	          this.logSummary(this.state.grandTotal === 0 ? END_MSG.NO_MATCHES : END_MSG.EMPTY_END);
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          this.state.running = false;
	        } else if (target > 0 && processed < target && this.state._emptyPageStreak < this.options.emptyPageRetries) {
	          this.state._emptyPageStreak++;
	          this.state.emptyPageRetryCount = this.state._emptyPageStreak;
	          const waitMs = Math.max(250, Number(this.options.searchDelay) || 0);
	          log.warn(`Empty page (${processed}/${target}) — retry ${this.state._emptyPageStreak}/${this.options.emptyPageRetries} in ${Math.round(waitMs / 1000)}s…`);
	          if (this.state.running) await this.interruptibleWait(waitMs);
	        } else if (target === 0 && this.state._emptyPageStreak < this.options.emptyPageRetries) {
	          this.state._emptyPageStreak++;
	          log.warn(`Empty page — retry ${this.state._emptyPageStreak}/${this.options.emptyPageRetries}…`);
	          if (this.state.running) await this.interruptibleWait(this.options.searchDelay);
	        } else {
	          this.logSummary(END_MSG.EMPTY_EXHAUSTED);
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          this.state.running = false;
	        }
	      }

	      // wait before next page (fix search page not updating fast enough)
	      if (this.state.running) {
	        if (this.options.verboseLog) {
	          log.verb(`Waiting ${(this.options.searchDelay / 1000).toFixed(2)}s before next page...`);
	        }
	        await this.interruptibleWait(this.options.searchDelay);
	      }

	    } while (this.state.running);

	    if (this.options.verboseLog && !this._userStopped) this.printStats();
	    } finally {
	      this.completeRun();
	    }
	  }

	  stop() {
	    if (!this.state.running && this._runFinished) return;
	    this._userStopped = true;
	    this.state.running = false;
	    this.cancelPendingWait();
	    this.cancelInFlightRequest();
	    this.finishMediaModal('STOP');
	    if (!this._runFinished) log.warn('Stop requested — finishing current request…');
	  }

	  finishMediaModal(action = 'STOP') {
	    const modal = document.getElementById('undiscord-media-modal');
	    if (modal) {
	      modal.classList.remove('open');
	      modal.setAttribute('aria-hidden', 'true');
	    }
	    if (this._mediaModalState) {
	      const { resolve } = this._mediaModalState;
	      this._mediaModalState = null;
	      resolve(action);
	    }
	  }

	  sanitizePathSegment(name) {
	    return String(name || 'unknown').replace(/[<>:"/\\|?*]/g, '_').slice(0, 80);
	  }

	  async downloadAttachment(attachment, username) {
	    const safeFilename = this.sanitizePathSegment(attachment.filename || 'file');
	    const safeUser = this.sanitizePathSegment(username);
	    const safeServer = this.sanitizePathSegment(this.options.serverName);
	    const safeChannel = this.sanitizePathSegment(this.options.channelName);
	    const relPath = `Undiscord_Media/${safeUser}/${safeServer}/${safeChannel}/${safeFilename}`;

	    if (typeof GM_download !== 'undefined') {
	      return new Promise((resolve, reject) => {
	        GM_download({
	          url: attachment.url,
	          name: relPath,
	          saveAs: false,
	          onload: () => resolve(),
	          onerror: (err) => reject(err),
	          timeout: 30000,
	        });
	      });
	    }

	    try {
	      const resp = await fetch(attachment.url);
	      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
	      const blob = await resp.blob();
	      const a = document.createElement('a');
	      a.href = URL.createObjectURL(blob);
	      a.download = safeFilename;
	      a.click();
	      URL.revokeObjectURL(a.href);
	    } catch (err) {
	      log.warn(`Could not download ${safeFilename}; opening in new tab.`, err);
	      window.open(attachment.url, '_blank', 'noopener');
	    }
	  }

	  askUserAction(messages) {
	    return new Promise(resolve => {
	      const modal = document.getElementById('undiscord-media-modal');
	      const gallery = document.getElementById('mediaGallery');
	      const footer = document.getElementById('mediaModalFooter');
	      if (!modal || !gallery || !footer) {
	        return resolve({ action: 'STOP', downloadIds: new Set() });
	      }

	      const downloadSet = new Set();
	      const finish = (action) => {
	        this._mediaModalState = null;
	        modal.classList.remove('open');
	        modal.setAttribute('aria-hidden', 'true');
	        resolve({ action, downloadIds: downloadSet });
	      };
	      this._mediaModalState = { resolve: finish, downloadSet };

	      footer.innerHTML = '';
	      const btnMap = {};

	      for (const spec of MEDIA_BATCH_ACTIONS) {
	        const btn = document.createElement('button');
	        btn.type = 'button';
	        btn.id = spec.id;
	        btn.className = spec.cls;
	        btn.textContent = spec.label;
	        footer.appendChild(btn);
	        btnMap[spec.id] = btn;
	      }

	      btnMap.btnSelectAll.onclick = () => {
	        const allSelected = downloadSet.size === messages.length;
	        gallery.querySelectorAll('.media-card').forEach((card, index) => {
	          const id = messages[index]?.id;
	          if (!id) return;
	          if (allSelected) {
	            downloadSet.delete(id);
	            card.classList.remove('selected');
	          } else {
	            downloadSet.add(id);
	            card.classList.add('selected');
	          }
	        });
	      };

	      for (const spec of MEDIA_BATCH_ACTIONS) {
	        if (!spec.action) continue;
	        btnMap[spec.id].onclick = () => finish(spec.action);
	      }

	      gallery.innerHTML = '';
	      const guildId = this.options.guildId || '@me';
	      const channelId = this.options.channelId || '';

	      for (const msg of messages) {
	        let src = msg.attachments?.length ? msg.attachments[0].url : (msg.embeds?.[0]?.thumbnail?.url || null);
	        let ext = 'TEXT';
	        let isVideo = false;
	        const filename = msg.attachments?.[0]?.filename || '';

	        if (msg.attachments?.length) {
	          const dot = filename.lastIndexOf('.');
	          if (dot !== -1) ext = filename.substring(dot + 1).toUpperCase();
	          if (['MP4', 'MOV', 'WEBM', 'AVI', 'MKV'].includes(ext)) isVideo = true;
	        } else if (src) {
	          if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) { ext = 'VIDEO'; isVideo = true; }
	          else ext = 'IMAGE';
	        }

	        if (!src) {
	          src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect fill="#1e1f22" width="120" height="120"/><text x="50%" y="50%" fill="#949ba4" font-size="12" text-anchor="middle" dy=".3em">No preview</text></svg>');
	        }

	        const jumpLink = `https://discord.com/channels/${guildId}/${msg.channel_id || channelId}/${msg.id}`;
	        const card = document.createElement('div');
	        card.className = 'media-card';
	        const mediaHtml = isVideo
	          ? `<video src="${escapeHTML(src)}" loop muted preload="metadata"></video>`
	          : `<img src="${escapeHTML(src)}" alt="" loading="lazy">`;
	        card.innerHTML = `<span class="media-badge">${escapeHTML(ext)}</span>${mediaHtml}`;
	        card.onclick = () => {
	          if (downloadSet.has(msg.id)) {
	            downloadSet.delete(msg.id);
	            card.classList.remove('selected');
	          } else {
	            downloadSet.add(msg.id);
	            card.classList.add('selected');
	          }
	        };
	        card.ondblclick = () => window.open(jumpLink, '_blank', 'noopener');
	        card.title = 'Click to select · double-click to open in Discord';
	        gallery.appendChild(card);
	      }

	      modal.classList.add('open');
	      modal.setAttribute('aria-hidden', 'false');
	    });
	  }

	  async applyMediaBatchAction(buffer, result) {
	    const ids = result.downloadIds || new Set();
	    const doDownload = async (list) => {
	      for (const msg of list) {
	        if (!this.state.running) return;
	        const attachments = msg.attachments || [];
	        if (!attachments.length) continue;
	        for (const att of attachments) {
	          try {
	            await this.downloadAttachment(att, msg.author?.username || 'unknown');
	            log.success(`Saved: ${att.filename}`);
	          } catch (e) {
	            log.error(`Download failed: ${att.filename}`);
	          }
	        }
	      }
	    };

	    switch (result.action) {
	      case 'SKIP':
	        log.info('Skipped batch — all messages kept.');
	        return [];
	      case 'KEEP_SELECTED':
	        log.info('Keeping selected — deleting the rest.');
	        return buffer.filter(m => !ids.has(m.id));
	      case 'BACKUP_KEEP_SELECTED': {
	        await doDownload(buffer.filter(m => ids.has(m.id)));
	        return buffer.filter(m => !ids.has(m.id));
	      }
	      case 'BACKUP_SELECT_KEEP': {
	        await doDownload(buffer.filter(m => ids.has(m.id)));
	        return [];
	      }
	      case 'BACKUP_ALL_KEEP_ALL':
	        await doDownload(buffer);
	        return [];
	      case 'DELETE_ALL':
	        return buffer;
	      case 'DELETE_SELECTED':
	        return buffer.filter(m => ids.has(m.id));
	      case 'BACKUP_DELETE_SELECTED': {
	        const sel = buffer.filter(m => ids.has(m.id));
	        await doDownload(sel);
	        return sel;
	      }
	      case 'BACKUP_SELECT_DELETE_ALL': {
	        await doDownload(buffer.filter(m => ids.has(m.id)));
	        return buffer;
	      }
	      case 'BACKUP_ALL_DELETE_ALL':
	        await doDownload(buffer);
	        return buffer;
	      case 'STOP':
	      default:
	        return [];
	    }
	  }

	  async runMediaReview(isJob = false) {
	    if (this.state.running && !isJob) return log.error('Already running!');

	    this._userStopped = false;
	    this._runFinished = false;
	    this.state.running = true;
	    this.stats.startTime = new Date();
	    this.stats._etrLastUpdateTs = 0;
	    this.stats.pendingWaitUntilTs = 0;
	    this.stats.etr = 0;

	    log.success(`Started at ${this.stats.startTime.toLocaleString()}`);
	    log.info('Interactive media review — choose what to backup or delete for each batch.');

	    if (this.onStart) this.onStart(this.state, this.stats);

	    let messageBuffer = [];
	    const batchSize = Math.max(5, Math.min(100, Number(this.options.mediaBatchSize) || 50));
	    const bufferScanDelay = 4000;

	    try {
	      do {
	        this.state.iterations++;
	        log.debug('Fetching messages...');
	        await this.search();
	        if (!this.state.running) break;

	        await this.filterResponse();
	        if (!this.state.running) break;

	        this.calcEtr();
	        if (this.onProgress) this.onProgress(this.state, this.stats);

	        const found = this.state._messagesToDelete;
	        if (found.length > 0) {
	          messageBuffer.push(...found);
	          log.info(`Buffered ${found.length} message(s) — ${messageBuffer.length}/${batchSize} in this batch.`);
	        }

	        const pageMsgs = Number(this.state._seachResponse?.messages?.length || 0);
	        const apiHasMore = pageMsgs > 0;

	        if (messageBuffer.length < batchSize && apiHasMore) {
	          log.verb(`Buffering… next scan in ${(bufferScanDelay / 1000).toFixed(0)}s.`);
	          if (!await this.interruptibleWait(bufferScanDelay)) break;
	          continue;
	        }

	        if (messageBuffer.length > 0) {
	          log.info(`Batch ready (${messageBuffer.length} items). Waiting for your choice…`);
	          const result = await this.askUserAction(messageBuffer);
	          if (result.action === 'STOP' || !this.state.running) {
	            this._userStopped = true;
	            this.state.running = false;
	            break;
	          }

	          const toDelete = await this.applyMediaBatchAction(messageBuffer, result);
	          messageBuffer = [];

	          if (toDelete.length > 0) {
	            this.state._messagesToDelete = toDelete;
	            const prevDelay = this.options.deleteDelay;
	            if (this.options.pipeline === 'mediaReview') this.options.deleteDelay = Math.max(100, Math.min(prevDelay, 500));
	            await this.deleteMessagesFromList();
	            this.options.deleteDelay = prevDelay;

	            const doneNow = await this.quickCheckIfDone();
	            if (doneNow) {
	              this.logSummary(this.completionMessage());
	              break;
	            }
	          }
	        } else if (!apiHasMore) {
	          this.logSummary(this.state.grandTotal === 0 ? END_MSG.NO_MATCHES : END_MSG.EMPTY_END);
	          this.state.running = false;
	          break;
	        }

	        if (this.state.running) await this.interruptibleWait(this.options.searchDelay);
	      } while (this.state.running);
	    } finally {
	      this.finishMediaModal('STOP');
	      this.completeRun();
	    }
	  }

	  /** Hybrid ETA — modeled delays + observed throughput + rate-limit history */
	  calcEtr() {
	    const now = Date.now();
	    const dtMs = Math.max(16, now - (this.stats._etrLastUpdateTs || now));
	    this.stats._etrLastUpdateTs = now;

	    const processed = this.processedCount();
	    const effectiveTotal = Math.max(0, this.state.grandTotal);
	    const remainingMessages = Math.max(0, effectiveTotal - processed);

	    const deleteDelay = Math.max(0, Number(this.options.deleteDelay) || 0);
	    const searchDelay = Math.max(0, Number(this.options.searchDelay) || 0);
	    const avgPing = Math.max(0, Number(this.stats.avgPing) || 0);
	    const elapsedMs = Math.max(0, now - this.stats.startTime.getTime());
	    const pendingWaitMs = Math.max(0, Number(this.stats.pendingWaitUntilTs || 0) - now);

	    const deletePhaseMs = remainingMessages * (deleteDelay + avgPing);
	    const avgDeletePerPage = Math.max(1, Math.min(25, Number(this.state._avgDeletePerPage) || 25));
	    const remainingSearchPages = remainingMessages > 0 ? Math.ceil(remainingMessages / avgDeletePerPage) : 0;
	    const searchPhaseMs = remainingSearchPages * searchDelay;
	    const throttledRatio = elapsedMs > 0
	      ? Math.max(0, Math.min(0.8, this.stats.throttledTotalTime / elapsedMs))
	      : 0;
	    const modeledMs = (deletePhaseMs + searchPhaseMs) * (1 + throttledRatio);

	    let observedMs = modeledMs;
	    if (processed > 0 && elapsedMs > 0) {
	      observedMs = (elapsedMs / processed) * remainingMessages;
	    }

	    const confidenceObserved = Math.max(0, Math.min(1, processed / 50));
	    const hybridMs = (modeledMs * (1 - confidenceObserved)) + (observedMs * confidenceObserved);

	    let targetMs = Math.max(0, Math.max(pendingWaitMs, hybridMs));
	    const currentMs = Math.max(0, Number(this.stats.etr) || 0);

	    if (currentMs > 0) {
	      const dtSec = dtMs / 1000;
	      const maxRise = Math.max(1200 * dtSec, currentMs * 0.30 * dtSec);
	      const maxDrop = Math.max(900 * dtSec, currentMs * 0.18 * dtSec);
	      if (targetMs > currentMs) targetMs = Math.min(targetMs, currentMs + maxRise);
	      else targetMs = Math.max(targetMs, currentMs - maxDrop);
	    }

	    this.stats.etr = Math.round(targetMs);
	  }

	  /** As for confirmation in the beggining process */
	  async confirm() {
	    if (this.options.pipeline === 'mediaReview') return true;
	    if (!this.options.askForConfirmation) return true;

	    log.verb('Waiting for your confirmation...');
	    const preview = this.state._messagesToDelete.map(m => `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? '[ATTACHMENTS]' : m.content}`).join('\n');

	    const answer = await ask(
	      `Do you want to delete ~${this.state.grandTotal} messages? (Estimated time: ${msToHMS(this.stats.etr)})` +
	      '(The actual number of messages may be less, depending if you\'re using filters to skip some messages)' +
	      '\n\n---- Preview ----\n' +
	      preview
	    );

	    if (!answer) {
	      log.error('Aborted by you!');
	      return false;
	    }
	    else {
	      log.verb('OK');
	      this.options.askForConfirmation = false; // do not ask for confirmation again on the next request
	      return true;
	    }
	  }

	  async search() {
	    if (this.state._historyScanActive) return await this.searchByHistoryScan();

	    const hasChannelScope = !!this.options.channelId;
	    const canFallbackToGuildScope = hasChannelScope && this.options.guildId !== '@me';
	    let scope = hasChannelScope ? 'channel' : 'guild';
	    let allowGuildChannelFilter = true;
	    let triedGuildAfterEmptyChannel = false;
	    let triedGuildWithoutChannelFilter = false;

	    let resp;
	    let networkAttempt = 0;

	    while (true) {
	      try {
	        const useGuildScope = scope === 'guild';
	        const API_SEARCH_URL = useGuildScope
	          ? `https://discord.com/api/v9/guilds/${this.options.guildId}/messages/`
	          : `https://discord.com/api/v9/channels/${this.options.channelId}/messages/`;
	        const queryChannelId = (useGuildScope && allowGuildChannelFilter) ? this.options.channelId : undefined;
	        const strictMediaOnly = this.options.pipeline === 'mediaReview' && this.options.mediaScanMode === 'media_only';
	        const searchHasFile = strictMediaOnly ? true : this.options.hasFile;
	        const searchHasLink = this.options.hasLink;
	        const searchContent = strictMediaOnly ? undefined : (this.options.content || undefined);
	        const reqCtl = this.beginAbortableRequest();
	        this.beforeRequest();
	        resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
	          ['author_id', this.options.authorId || undefined],
	          ['channel_id', queryChannelId],
	          ['min_id', this.options.minId ? toSnowflake(this.options.minId) : undefined],
	          ['max_id', this.options.maxId ? toSnowflake(this.options.maxId) : undefined],
	          ['sort_by', 'timestamp'],
	          ['sort_order', 'desc'],
	          ['offset', this.state.offset],
	          ['has', searchHasLink ? 'link' : undefined],
	          ['has', searchHasFile ? 'file' : undefined],
	          ['content', searchContent],
	          ['include_nsfw', this.options.includeNsfw ? true : undefined],
	        ]), {
	          headers: { Authorization: this.options.authToken },
	          signal: reqCtl.signal,
	        });
	        this.endAbortableRequest(reqCtl);
	        this.afterRequest();

	        if (resp.status === 400 && canFallbackToGuildScope && scope === 'channel') {
	          const body = await resp.clone().json().catch(() => null);
	          if (body?.code === 50024) {
	            log.warn('Channel search not supported here — switching to channel history scan…');
	            this.state._historyScanActive = true;
	            this.state._historyBeforeId = null;
	            this.state._historyExhausted = false;
	            return await this.searchByHistoryScan();
	          }
	        }

	        if (resp.status === 400 && canFallbackToGuildScope && scope === 'guild' && allowGuildChannelFilter) {
	          const body = await resp.clone().json().catch(() => null);
	          if (body?.code === 50024) {
	            log.warn('Guild search rejected channel filter — retrying with local channel filter…');
	            allowGuildChannelFilter = false;
	            continue;
	          }
	        }

	        if (resp.ok && canFallbackToGuildScope && scope === 'channel' && !triedGuildAfterEmptyChannel) {
	          const body = await resp.clone().json().catch(() => null);
	          if (Number(body?.total_results ?? -1) === 0) {
	            triedGuildAfterEmptyChannel = true;
	            scope = 'guild';
	            allowGuildChannelFilter = true;
	            log.warn('Channel search returned 0 — probing guild search…');
	            continue;
	          }
	        }

	        if (resp.ok && canFallbackToGuildScope && scope === 'guild' && allowGuildChannelFilter && !triedGuildWithoutChannelFilter) {
	          const body = await resp.clone().json().catch(() => null);
	          if (Number(body?.total_results ?? -1) === 0) {
	            triedGuildWithoutChannelFilter = true;
	            allowGuildChannelFilter = false;
	            log.warn('Guild search with channel filter returned 0 — probing without filter (local filter ON)…');
	            continue;
	          }
	        }

	        break;
	      } catch (err) {
	        if (err?.name === 'AbortError' && !this.state.running) throw err;
	        if (!this.state.running) throw err;
	        if (!this.options.retryOnNetworkError) {
	          this.state.running = false;
	          log.error('Search request threw an error:', err);
	          throw err;
	        }
	        networkAttempt++;
	        if (networkAttempt > (this.options.maxNetworkRetries ?? 8)) {
	          this.state.running = false;
	          log.error(`Search failed after ${this.options.maxNetworkRetries} network retries.`, err);
	          throw err;
	        }
	        const delay = this.networkRetryDelayMs(networkAttempt);
	        log.warn(`Network error on search (${networkAttempt}/${this.options.maxNetworkRetries}). Retrying in ${Math.round(delay)}ms…`, String(err?.message || err));
	        if (!await this.interruptibleWait(delay)) throw err;
	      }
	    }

	    if (resp.status === 202) {
	      let w = (await resp.json()).retry_after * 1000;
	      w = w || this.stats.searchDelay;
	      this.stats.throttledCount++;
	      this.stats.throttledTotalTime += w;
	      log.warn(`This channel isn't indexed yet. Waiting ${(w / 1000).toFixed(1)}s…`);
	      if (!await this.interruptibleWait(w)) return;
	      if (!this.state.running) return;
	      return await this.search();
	    }

	    if (!resp.ok) {
	      if (resp.status === 429) {
	        let w = (await resp.json()).retry_after * 1000;
	        w = w || this.stats.searchDelay;
	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.options.searchDelay += w;
	        w = this.options.searchDelay;
	        log.warn(`Search rate limited for ${(w / 1000).toFixed(1)}s! Increasing search delay…`);
	        this.printStats();
	        if (!await this.interruptibleWait(w * 2)) return;
	        if (!this.state.running) return;
	        return await this.search();
	      }
	      if (resp.status === 403) {
	        log.warn('Search returned 403 (insufficient permissions). Treating as empty.');
	        this.state._seachResponse = { messages: [], total_results: 0 };
	        return this.state._seachResponse;
	      }
	      if (resp.status >= 500 && resp.status <= 599 && this.options.retryOnNetworkError) {
	        networkAttempt++;
	        if (networkAttempt <= (this.options.maxNetworkRetries ?? 8)) {
	          const delay = this.networkRetryDelayMs(networkAttempt);
	          log.warn(`Search server error ${resp.status}. Retrying in ${Math.round(delay)}ms…`);
	          if (!await this.interruptibleWait(delay)) return;
	          return await this.search();
	        }
	      }
	      this.state.running = false;
	      const errBody = await resp.text().catch(() => '');
	      log.error(`Error searching messages, API responded with status ${resp.status}!`, errBody);
	      throw resp;
	    }

	    const data = await resp.json();
	    if (scope === 'guild' && !allowGuildChannelFilter && this.options.channelId) {
	      data.__undiscord_forceChannelId = String(this.options.channelId);
	    }
	    this.state._seachResponse = data;
	    console.log(PREFIX$1, 'search', data);
	    return data;
	  }

	  async filterResponse() {
	    const data = this.state._seachResponse;

	    const total = data.total_results;
	    const forceChannelId = String(data?.__undiscord_forceChannelId || '').trim();
	    this.state._forcedChannelFilterActive = !!forceChannelId;
	    if (!forceChannelId && total > this.state.grandTotal) this.state.grandTotal = total;

	    const discoveredMessagesRaw = (Array.isArray(data.messages) ? data.messages : [])
	      .map(convo => (Array.isArray(convo) ? convo.find(message => message?.hit === true) : null))
	      .filter(Boolean);
	    this.state._rawDiscoveredCount = discoveredMessagesRaw.length;

	    let discoveredMessages = discoveredMessagesRaw;
	    if (forceChannelId) {
	      discoveredMessages = discoveredMessagesRaw.filter(msg => String(msg?.channel_id || '') === forceChannelId);
	    }

	    // we can only delete some types of messages, system messages are not deletable.
	    // type 46 = polls (self-deletable) — PR #741
	    let messagesToDelete = discoveredMessages.filter(msg => msg.type === 0 || msg.type === 46 || (msg.type >= 6 && msg.type <= 19));
	    messagesToDelete = messagesToDelete.filter(msg => msg.pinned ? this.options.includePinned : true);

	    if (this.options.skipLink || this.options.skipFile || this.options.skipPinned) {
	      messagesToDelete = messagesToDelete.filter(msg => {
	        if (this.options.skipPinned && msg.pinned) return false;
	        if (this.options.skipLink && /https?:\/\//i.test(String(msg.content || ''))) return false;
	        if (this.options.skipFile && Array.isArray(msg.attachments) && msg.attachments.length > 0) return false;
	        return true;
	      });
	    }

	    if (this.options.pipeline === 'mediaReview' && this.options.mediaScanMode === 'media_only') {
	      messagesToDelete = messagesToDelete.filter(msg => Array.isArray(msg.attachments) && msg.attachments.length > 0);
	    }

	    // custom filter of messages
	    try {
	      const regex = new RegExp(this.options.pattern, 'i');
	      messagesToDelete = messagesToDelete.filter(msg => regex.test(msg.content));
	    } catch (e) {
	      log.warn('Ignoring RegExp because pattern is malformed!', e);
	    }

	    // create an array containing everything we skipped. (used to calculate offset for next searches)
	    const skippedMessages = discoveredMessages.filter(msg => !messagesToDelete.find(m => m.id === msg.id));

	    this.state._messagesToDelete = messagesToDelete;
	    this.state._skippedMessages = skippedMessages;

	    console.log(PREFIX$1, 'filterResponse', this.state);
	  }

	  async deleteMessagesFromList() {
	    for (let i = 0; i < this.state._messagesToDelete.length; i++) {
	      const message = this.state._messagesToDelete[i];
	      if (!this.state.running) return;

	      const deletionLine = `[${this.state.delCount + 1}/${this.state.grandTotal}] ` +
	        `<sup>${new Date(message.timestamp).toLocaleString()}</sup> ` +
	        `<b>${redact(message.author.username + '#' + message.author.discriminator)}</b>` +
	        `: <i>${redact(message.content).replace(/\n/g, '↵')}</i>` +
	        (message.attachments.length ? redact(JSON.stringify(message.attachments)) : '') +
	        ` <sup>{ID:${redact(message.id)}}</sup>`;
	      if (this.options.logEveryDeletion) log.info(deletionLine);
	      else log.debug(deletionLine);

	      // Delete a single message (with retry) — logic aligned with PR #743
	      let attempt = 0;
	      while (attempt < this.options.maxAttempt) {
	        const result = await this.deleteMessage(message);
	        attempt++;

	        if (result === 'RETRY' || result === 'FAILED') {
	          if (attempt >= this.options.maxAttempt) {
	            this.state.offset++;
	            this.state.failCount++;
	            break;
	          }
	          log.verb(`Retrying in ${this.options.deleteDelay}ms... (${attempt}/${this.options.maxAttempt})`);
	          if (!await this.interruptibleWait(this.options.deleteDelay)) return;
	          continue;
	        }
	        if (result === 'FAIL_SKIP') {
	          break;
	        }
	        break;
	      }

	      if (!this.state.running) return;

	      this.calcEtr();
	      if (this.onProgress) this.onProgress(this.state, this.stats);

	      if (!await this.interruptibleWait(this.options.deleteDelay)) return;
	    }
	  }

	  async deleteMessage(message) {
	    const API_DELETE_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
	    let networkAttempt = 0;

	    deleteAttempt: while (true) {
	      let resp;
	      try {
	        const reqCtl = this.beginAbortableRequest();
	        this.beforeRequest();
	        resp = await fetch(API_DELETE_URL, {
	          method: 'DELETE',
	          headers: { Authorization: this.options.authToken },
	          signal: reqCtl.signal,
	        });
	        this.endAbortableRequest(reqCtl);
	        this.afterRequest();
	      } catch (err) {
	        if (err?.name === 'AbortError' && !this.state.running) return 'FAILED';
	        if (!this.options.retryOnNetworkError) {
	          log.error('Delete request threw an error:', err);
	          log.verb('Related object:', redact(JSON.stringify(message)));
	          return 'FAILED';
	        }
	        networkAttempt++;
	        if (networkAttempt > (this.options.maxNetworkRetries ?? 8)) {
	          log.error(`Delete failed after ${this.options.maxNetworkRetries} network retries.`, err);
	          return 'FAILED';
	        }
	        const delay = this.networkRetryDelayMs(networkAttempt);
	        log.warn(`Network error on delete (${networkAttempt}/${this.options.maxNetworkRetries}). Retrying in ${Math.round(delay)}ms…`);
	        if (!await this.interruptibleWait(delay)) return 'FAILED';
	        continue deleteAttempt;
	      }

	      if (!resp.ok) {
	        if (resp.status === 429) {
	          const w = (await resp.json()).retry_after * 1000;
	          this.stats.throttledCount++;
	          this.stats.throttledTotalTime += w;
	          this.options.deleteDelay = w;
	          log.warn(`Delete rate limited for ${(w / 1000).toFixed(1)}s! Adjusted delete delay to ${formatDelaySeconds(this.options.deleteDelay)}s.`);
	          this.printStats();
	          if (!await this.interruptibleWait(w * 2)) return 'FAILED';
	          return 'RETRY';
	        }

	        const body = await resp.text();
	        if (resp.status >= 500 && resp.status <= 599 && this.options.retryOnNetworkError) {
	          networkAttempt++;
	          if (networkAttempt <= (this.options.maxNetworkRetries ?? 8)) {
	            const delay = this.networkRetryDelayMs(networkAttempt);
	            log.warn(`Delete server error ${resp.status}. Retrying in ${Math.round(delay)}ms…`);
	            if (!await this.interruptibleWait(delay)) return 'FAILED';
	            continue deleteAttempt;
	          }
	          log.error(`Delete failed — server error ${resp.status}.`, body.slice(0, 200));
	          return 'FAILED';
	        }

	        try {
	          const r = JSON.parse(body);
	          if (resp.status === 400 && r.code === 50083) {
	            if (this.options.unarchiveThreads && message.channel_id) {
	              const unarchived = await this.tryUnarchiveThread(message.channel_id);
	              if (unarchived) return 'RETRY';
	            }
	            log.warn('Thread is archived — skipping this message on future searches.');
	            this.state.offset++;
	            return 'FAIL_SKIP';
	          }
	          log.error(`Error deleting message, API responded with status ${resp.status}!`, r);
	          log.verb('Related object:', redact(JSON.stringify(message)));
	          return 'FAILED';
	        } catch (e) {
	          log.error(`Delete failed — API status ${resp.status} (non-JSON response).`, body.slice(0, 200));
	          return 'FAILED';
	        }
	      }

	      this.state.delCount++;
	      const pageDeletes = Number(this.state._messagesToDelete?.length || 0);
	      if (pageDeletes > 0) {
	        this.state._avgDeletePerPage = Math.max(1, Math.min(25,
	          (this.state._avgDeletePerPage * 0.85) + (pageDeletes * 0.15)
	        ));
	      }
	      return 'OK';
	    }
	  }

	  #beforeTs = 0; // used to calculate latency
	  beforeRequest() {
	    this.#beforeTs = Date.now();
	  }
	  afterRequest() {
	    this.stats.lastPing = (Date.now() - this.#beforeTs);
	    this.stats.avgPing = this.stats.avgPing > 0 ? (this.stats.avgPing * 0.9) + (this.stats.lastPing * 0.1) : this.stats.lastPing;
	  }

	  printStats() {
	    log.verb(
	      `Delete delay: ${formatDelaySeconds(this.options.deleteDelay)}s, Search delay: ${formatDelaySeconds(this.options.searchDelay)}s`,
	      `Last Ping: ${this.stats.lastPing}ms, Average Ping: ${this.stats.avgPing | 0}ms`,
	    );
	    log.verb(
	      `Rate Limited: ${this.stats.throttledCount} times.`,
	      `Total time throttled: ${msToHMS(this.stats.throttledTotalTime)}.`
	    );
	  }
	}

	const MOVE = 0;
	const RESIZE_T = 1;
	const RESIZE_B = 2;
	const RESIZE_L = 4;
	const RESIZE_R = 8;
	const RESIZE_TL = RESIZE_T + RESIZE_L;
	const RESIZE_TR = RESIZE_T + RESIZE_R;
	const RESIZE_BL = RESIZE_B + RESIZE_L;
	const RESIZE_BR = RESIZE_B + RESIZE_R;

	/**
	 * Make an element draggable/resizable
	 * @author Victor N. wwww.vitim.us
	 */
	class DragResize {
	  constructor({ elm, moveHandle, options }) {
	    this.options = defaultArgs({
	      enabledDrag: true,
	      enabledResize: true,
	      minWidth: 200,
	      maxWidth: Infinity,
	      minHeight: 100,
	      maxHeight: Infinity,
	      dragAllowX: true,
	      dragAllowY: true,
	      resizeAllowX: true,
	      resizeAllowY: true,
	      draggingClass: 'drag',
	      useMouseEvents: true,
	      useTouchEvents: true,
	      createHandlers: true,
	    }, options);
	    Object.assign(this, options);
	    options = undefined;

	    elm.style.position = 'fixed';

	    this.drag_m = new Draggable(elm, moveHandle, MOVE, this.options);

	    if (this.options.createHandlers) {
	      this.el_t = createElement('div', { name: 'grab-t' }, elm);
	      this.drag_t = new Draggable(elm, this.el_t, RESIZE_T, this.options);
	      this.el_r = createElement('div', { name: 'grab-r' }, elm);
	      this.drag_r = new Draggable(elm, this.el_r, RESIZE_R, this.options);
	      this.el_b = createElement('div', { name: 'grab-b' }, elm);
	      this.drag_b = new Draggable(elm, this.el_b, RESIZE_B, this.options);
	      this.el_l = createElement('div', { name: 'grab-l' }, elm);
	      this.drag_l = new Draggable(elm, this.el_l, RESIZE_L, this.options);
	      this.el_tl = createElement('div', { name: 'grab-tl' }, elm);
	      this.drag_tl = new Draggable(elm, this.el_tl, RESIZE_TL, this.options);
	      this.el_tr = createElement('div', { name: 'grab-tr' }, elm);
	      this.drag_tr = new Draggable(elm, this.el_tr, RESIZE_TR, this.options);
	      this.el_br = createElement('div', { name: 'grab-br' }, elm);
	      this.drag_br = new Draggable(elm, this.el_br, RESIZE_BR, this.options);
	      this.el_bl = createElement('div', { name: 'grab-bl' }, elm);
	      this.drag_bl = new Draggable(elm, this.el_bl, RESIZE_BL, this.options);
	    }
	  }
	}

	class Draggable {
	  constructor(targetElm, handleElm, op, options) {
	    Object.assign(this, options);
	    options = undefined;

	    this._targetElm = targetElm;
	    this._handleElm = handleElm;

	    let vw = window.innerWidth;
	    let vh = window.innerHeight;
	    let initialX, initialY, initialT, initialL, initialW, initialH;

	    const clamp = (value, min, max) => value < min ? min : value > max ? max : value;

	    const moveOp = (x, y) => {
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const t = clamp(initialT + deltaY, 0, vh - initialH);
	      const l = clamp(initialL + deltaX, 0, vw - initialW);
	      this._targetElm.style.top = t + 'px';
	      this._targetElm.style.left = l + 'px';
	    };

	    const resizeOp = (x, y) => {
	      x = clamp(x, 0, vw);
	      y = clamp(y, 0, vh);
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const resizeDirX = (op & RESIZE_L) ? -1 : 1;
	      const resizeDirY = (op & RESIZE_T) ? -1 : 1;
	      const deltaXMax = (this.maxWidth - initialW);
	      const deltaXMin = (this.minWidth - initialW);
	      const deltaYMax = (this.maxHeight - initialH);
	      const deltaYMin = (this.minHeight - initialH);
	      const t = initialT + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax) * resizeDirY;
	      const l = initialL + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax) * resizeDirX;
	      const w = initialW + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax);
	      const h = initialH + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax);
	      if (op & RESIZE_T) { // resize ↑
	        this._targetElm.style.top = t + 'px';
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_B) { // resize ↓
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_L) { // resize ←
	        this._targetElm.style.left = l + 'px';
	        this._targetElm.style.width = w + 'px';
	      }
	      if (op & RESIZE_R) { // resize →
	        this._targetElm.style.width = w + 'px';
	      }
	    };

	    let operation = op === MOVE ? moveOp : resizeOp;

	    function dragStartHandler(e) {
	      const touch = e.type === 'touchstart';
	      if ((e.buttons === 1 || e.which === 1) || touch) {
	        e.preventDefault();
	        const x = touch ? e.touches[0].clientX : e.clientX;
	        const y = touch ? e.touches[0].clientY : e.clientY;
	        initialX = x;
	        initialY = y;
	        vw = window.innerWidth;
	        vh = window.innerHeight;
	        initialT = this._targetElm.offsetTop;
	        initialL = this._targetElm.offsetLeft;
	        initialW = this._targetElm.clientWidth;
	        initialH = this._targetElm.clientHeight;
	        if (this.useMouseEvents) {
	          document.addEventListener('mousemove', this._dragMoveHandler);
	          document.addEventListener('mouseup', this._dragEndHandler);
	        }
	        if (this.useTouchEvents) {
	          document.addEventListener('touchmove', this._dragMoveHandler, { passive: false });
	          document.addEventListener('touchend', this._dragEndHandler);
	        }
	        this._targetElm.classList.add(this.draggingClass);
	      }
	    }

	    function dragMoveHandler(e) {
	      e.preventDefault();
	      let x, y;
	      const touch = e.type === 'touchmove';
	      if (touch) {
	        const t = e.touches[0];
	        x = t.clientX;
	        y = t.clientY;
	      } else { //mouse
	        // If the button is not down, dispatch a "fake" mouse up event, to stop listening to mousemove
	        // This happens when the mouseup is not captured (outside the browser)
	        if ((e.buttons || e.which) !== 1) {
	          this._dragEndHandler();
	          return;
	        }
	        x = e.clientX;
	        y = e.clientY;
	      }
	      // perform drag / resize operation
	      operation(x, y);
	    }

	    function dragEndHandler(e) {
	      if (this.useMouseEvents) {
	        document.removeEventListener('mousemove', this._dragMoveHandler);
	        document.removeEventListener('mouseup', this._dragEndHandler);
	      }
	      if (this.useTouchEvents) {
	        document.removeEventListener('touchmove', this._dragMoveHandler);
	        document.removeEventListener('touchend', this._dragEndHandler);
	      }
	      this._targetElm.classList.remove(this.draggingClass);
	    }

	    // We need to bind the handlers to this instance
	    this._dragStartHandler = dragStartHandler.bind(this);
	    this._dragMoveHandler = dragMoveHandler.bind(this);
	    this._dragEndHandler = dragEndHandler.bind(this);

	    this.enable();
	  }

	  /** Turn on the drag and drop of the instance */
	  enable() {
	    this.destroy(); // prevent events from getting binded twice
	    if (this.useMouseEvents) this._handleElm.addEventListener('mousedown', this._dragStartHandler);
	    if (this.useTouchEvents) this._handleElm.addEventListener('touchstart', this._dragStartHandler, { passive: false });
	  }

	  /** Teardown all events bound to the document and elements. You can resurrect this instance by calling enable() */
	  destroy() {
	    this._targetElm.classList.remove(this.draggingClass);
	    if (this.useMouseEvents) {
	      this._handleElm.removeEventListener('mousedown', this._dragStartHandler);
	      document.removeEventListener('mousemove', this._dragMoveHandler);
	      document.removeEventListener('mouseup', this._dragEndHandler);
	    }
	    if (this.useTouchEvents) {
	      this._handleElm.removeEventListener('touchstart', this._dragStartHandler);
	      document.removeEventListener('touchmove', this._dragMoveHandler);
	      document.removeEventListener('touchend', this._dragEndHandler);
	    }
	  }
	}

	function createElement(tag='div', attrs, parent) {
	  const elm = document.createElement(tag);
	  if (attrs) Object.entries(attrs).forEach(([k, v]) => elm.setAttribute(k, v));
	  if (parent) parent.appendChild(elm);
	  return elm;
	}

	function defaultArgs(defaults, options) {
	  function isObj(x) { return x !== null && typeof x === 'object'; }
	  function hasOwn(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
	  if (isObj(options)) for (let prop in defaults) {
	    if (hasOwn(defaults, prop) && hasOwn(options, prop) && options[prop] !== undefined) {
	      if (isObj(defaults[prop])) defaultArgs(defaults[prop], options[prop]);
	      else defaults[prop] = options[prop];
	    }
	  }
	  return defaults;
	}

	function createElm(html) {
	  const temp = document.createElement('div');
	  temp.innerHTML = html;
	  return temp.removeChild(temp.firstElementChild);
	}

	function insertCss(css) {
	  const style = document.createElement('style');
	  style.appendChild(document.createTextNode(css));
	  document.head.appendChild(style);
	  return style;
	}

	const messagePickerCss = `
body.undiscord-pick-message [data-list-id="chat-messages"] {
  background-color: var(--background-secondary-alt);
  box-shadow: inset 0 0 0px 2px var(--button-outline-brand-border);
}

body.undiscord-pick-message [id^="message-content-"]:hover {
  cursor: pointer;
  cursor: cell;
  background: var(--background-message-automod-hover);
}
body.undiscord-pick-message [id^="message-content-"]:hover::after {
  position: absolute;
  top: calc(50% - 11px);
  left: 4px;
  z-index: 1;
  width: 65px;
  height: 22px;
  line-height: 22px;
  font-family: var(--font-display);
  background-color: var(--button-secondary-background);
  color: var(--header-secondary);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  content: 'This 👉';
}
body.undiscord-pick-message.before [id^="message-content-"]:hover::after {
  content: 'Before 👆';
}
body.undiscord-pick-message.after [id^="message-content-"]:hover::after {
  content: 'After 👇';
}
`;

	const messagePicker = {
	  init() {
	    insertCss(messagePickerCss);
	  },
	  grab(auxiliary) {
	    return new Promise((resolve, reject) => {
	      document.body.classList.add('undiscord-pick-message');
	      if (auxiliary) document.body.classList.add(auxiliary);
	      function clickHandler(e) {
	        const message = e.target.closest('[id^="message-content-"]');
	        if (message) {
	          e.preventDefault();
	          e.stopPropagation();
	          e.stopImmediatePropagation();
	          if (auxiliary) document.body.classList.remove(auxiliary);
	          document.body.classList.remove('undiscord-pick-message');
	          document.removeEventListener('click', clickHandler);
	          try {
	            resolve(message.id.match(/message-content-(\d+)/)[1]);
	          } catch (e) {
	            resolve(null);
	          }
	        }
	      }
	      document.addEventListener('click', clickHandler);
	    });
	  }
	};
	window.messagePicker = messagePicker;

	function normalizeTokenCandidate(raw) {
	  if (typeof raw !== 'string') return '';
	  const s = raw.trim();
	  if (!s) return '';
	  try {
	    const parsed = JSON.parse(s);
	    return typeof parsed === 'string' ? parsed : '';
	  } catch {
	    return s.replace(/^"|"$/g, '');
	  }
	}

	function getTokenFromWebpack(globalObj) {
	  const chunkKeys = Object.keys(globalObj).filter(
	    k => k.startsWith('webpackChunk') && Array.isArray(globalObj[k]),
	  );
	  let req = null;
	  for (const key of chunkKeys) {
	    const chunk = globalObj[key];
	    if (!chunk || typeof chunk.push !== 'function') continue;
	    try {
	      chunk.push([[`__undiscord__${Date.now()}`], {}, r => { req = r; }]);
	      if (req?.c) break;
	      req = null;
	    } catch {}
	  }
	  if (!req && typeof globalObj.__webpack_require__ === 'function' && globalObj.__webpack_require__.c) {
	    req = globalObj.__webpack_require__;
	  }
	  if (!req?.c) throw new Error('webpack require not found');
	  const mod = Object.values(req.c).find(m => m?.exports?.default?.getToken || m?.exports?.getToken);
	  if (!mod) throw new Error('getToken module not found');
	  if (mod.exports?.default?.getToken) return mod.exports.default.getToken();
	  if (mod.exports?.getToken) return mod.exports.getToken();
	  throw new Error('getToken export not callable');
	}

	function getTokenFromClassicWebpackPush() {
	  const chunk = window.webpackChunkdiscord_app;
	  if (!Array.isArray(chunk) || typeof chunk.push !== 'function') {
	    throw new Error('webpackChunkdiscord_app unavailable');
	  }
	  let modules = [];
	  chunk.push([['__undiscord__classic__'], {}, (e) => {
	    modules = [];
	    for (const c in e.c) modules.push(e.c[c]);
	  }]);
	  const mod = modules.find(m => m?.exports?.default?.getToken || m?.exports?.getToken);
	  if (!mod) throw new Error('classic webpack: getToken module not found');
	  if (mod.exports?.default?.getToken) return mod.exports.default.getToken();
	  if (mod.exports?.getToken) return mod.exports.getToken();
	  throw new Error('classic webpack: getToken not callable');
	}

	function getTokenFromPageContext() {
	  return new Promise((resolve, reject) => {
	    const reqId = `undiscord_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;
	    const timeoutMs = 10000;
	    let done = false;
	    const cleanup = () => {
	      if (done) return;
	      done = true;
	      window.removeEventListener('message', onMessage);
	    };
	    const onMessage = (event) => {
	      if (event.source !== window) return;
	      const data = event.data;
	      if (!data || data.source !== 'undiscord' || data.id !== reqId) return;
	      cleanup();
	      if (data.error) reject(new Error(data.error));
	      else resolve(normalizeTokenCandidate(data.token || ''));
	    };
	    window.addEventListener('message', onMessage);
	    const script = document.createElement('script');
	    script.textContent = `(function(){try{
var g=window,req=null,keys=Object.keys(g).filter(function(k){return k.indexOf('webpackChunk')===0&&Array.isArray(g[k]);});
for(var i=0;i<keys.length;i++){try{var ch=g[keys[i]];ch.push([['__undiscord_pc__'+Date.now()],{},function(r){req=r;}]);if(req&&req.c)break;req=null;}catch(e){}}
if(!req&&typeof g.__webpack_require__==='function'&&g.__webpack_require__.c)req=g.__webpack_require__;
if(!req||!req.c)throw new Error('webpack require not found');
var mods=Object.values(req.c),mod=null;
for(var j=0;j<mods.length;j++){var m=mods[j];if(m&&m.exports&&(m.exports.default&&m.exports.default.getToken||m.exports.getToken)){mod=m;break;}}
if(!mod)throw new Error('getToken module not found');
var t=mod.exports.default&&mod.exports.default.getToken?mod.exports.default.getToken():mod.exports.getToken();
window.postMessage({source:'undiscord',id:'${reqId}',token:t||''},'*');
}catch(e){window.postMessage({source:'undiscord',id:'${reqId}',error:String(e)},'*');}})();`;
	    script.onerror = () => { cleanup(); reject(new Error('page-context script blocked')); };
	    (document.head || document.documentElement).appendChild(script);
	    script.remove();
	    setTimeout(() => { cleanup(); reject(new Error('token request timeout')); }, timeoutMs);
	  });
	}

	async function getToken() {
	  window.dispatchEvent(new Event('beforeunload'));
	  const iframe = document.body.appendChild(document.createElement('iframe'));
	  const LS = iframe.contentWindow.localStorage;
	  const storageToken = normalizeTokenCandidate(LS.token);
	  if (storageToken) return storageToken;

	  log.info('Token not in storage — trying webpack…');
	  try {
	    const t = normalizeTokenCandidate(getTokenFromWebpack(window));
	    if (t) return t;
	  } catch (err) {
	    log.verb('Webpack token:', err?.message || err);
	  }
	  try {
	    const t = normalizeTokenCandidate(getTokenFromClassicWebpackPush());
	    if (t) return t;
	  } catch (err) {
	    log.verb('Classic webpack:', err?.message || err);
	  }
	  try {
	    const t = normalizeTokenCandidate(await getTokenFromPageContext());
	    if (t) return t;
	  } catch (err) {
	    log.verb('Page context:', err?.message || err);
	  }
	  throw new Error('token auto-detection failed');
	}

	function getAuthorId() {
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  return JSON.parse(LS.user_id_cache);
	}

	function getGuildId() {
	  const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
	  if (m) return m[1];
	  else alert('Could not find the Guild ID!\nPlease make sure you are on a Server or DM.');
	}

	function getChannelId() {
	  const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
	  if (m) return m[2];
	  else alert('Could not find the Channel ID!\nPlease make sure you are on a Channel or DM.');
	}

	async function fillToken() {
	  try {
	    return await getToken();
	  } catch (err) {
	    log.verb(err);
	    log.error('Could not automatically detect Authorization Token!');
	    log.info(`Please make sure ${TOOL_NAME} is up to date`);
	    log.debug('Alternatively, enter a token manually under Advanced → Token.');
	  }
	  return '';
	}

	function getServerChannelIdsFromDom(guildId) {
	  const gid = String(guildId || '').trim();
	  if (!gid || gid === '@me') return [];
	  const rows = Array.from(document.querySelectorAll(
	    `#app-mount a[data-list-item-id^="channels___"][href^="/channels/${gid}/"]`,
	  ));
	  const ids = new Set();
	  for (const row of rows) {
	    const href = String(row.getAttribute('href') || '');
	    const m = href.match(new RegExp(`^/channels/${gid}/(\\d+)`));
	    if (m) ids.add(m[1]);
	  }
	  return Array.from(ids);
	}

	async function getServerMessageChannels(guildId, authToken) {
	  const gid = String(guildId || '').trim();
	  if (!gid || gid === '@me') return [];

	  if (!authToken) {
	    return getServerChannelIdsFromDom(gid).map(id => ({ id: String(id), type: null, name: '', source: 'dom' }));
	  }

	  const messageTypes = new Set([0, 5, 10, 11, 12, 13, 15, 16]);
	  const out = new Map();

	  try {
	    const resp = await fetch(`https://discord.com/api/v9/guilds/${gid}/channels`, {
	      headers: { Authorization: authToken },
	    });
	    if (!resp.ok) throw new Error(`channels ${resp.status}`);
	    const channels = await resp.json();
	    if (!Array.isArray(channels)) throw new Error('channels not array');

	    for (const ch of channels) {
	      if (!ch || String(ch.guild_id) !== gid) continue;
	      const type = Number(ch.type);
	      if (!messageTypes.has(type)) continue;
	      const id = String(ch.id || '');
	      if (id) out.set(id, { id, type, name: String(ch.name || ''), source: 'guild_channels' });
	    }

	    try {
	      const tResp = await fetch(`https://discord.com/api/v9/guilds/${gid}/threads/active`, {
	        headers: { Authorization: authToken },
	      });
	      if (tResp.ok) {
	        const tData = await tResp.json();
	        for (const th of (tData?.threads || [])) {
	          const thId = String(th?.id || '');
	          if (!thId) continue;
	          out.set(thId, {
	            id: thId,
	            type: Number(th?.type) || 11,
	            name: String(th?.name || ''),
	            source: 'threads_active',
	          });
	        }
	      }
	    } catch {}

	    const archiveParents = channels
	      .filter(ch => ch && String(ch.guild_id) === gid && [0, 5, 15, 16].includes(Number(ch.type)))
	      .map(ch => String(ch.id || ''))
	      .filter(Boolean);

	    const archivePaths = [
	      { path: 'threads/archived/public', source: 'threads_archived_public' },
	      { path: 'users/@me/threads/archived/private', source: 'threads_archived_private_me' },
	      { path: 'threads/archived/private', source: 'threads_archived_private' },
	    ];

	    for (const parentId of archiveParents) {
	      for (const endpoint of archivePaths) {
	        try {
	          const aResp = await fetch(
	            `https://discord.com/api/v9/channels/${parentId}/${endpoint.path}?limit=100`,
	            { headers: { Authorization: authToken } },
	          );
	          if (!aResp.ok) continue;
	          const aData = await aResp.json();
	          for (const th of (aData?.threads || [])) {
	            const thId = String(th?.id || '');
	            if (!thId) continue;
	            out.set(thId, {
	              id: thId,
	              type: Number(th?.type) || 11,
	              name: String(th?.name || ''),
	              source: endpoint.source,
	            });
	          }
	        } catch {}
	      }
	    }

	    const resolved = Array.from(out.values());
	    if (resolved.length) return resolved;
	  } catch (err) {
	    log.warn('Guild channel API failed — using sidebar DOM fallback.', err?.message || err);
	  }

	  return getServerChannelIdsFromDom(gid).map(id => ({ id: String(id), type: null, name: '', source: 'dom' }));
	}

	const PREFIX = '[UNDISCORD]';

	function applyRunProfileToUI(profileId) {
	  if (!ui.undiscordWindow) return;
	  const profile = RUN_PROFILES[profileId] || RUN_PROFILES.custom;
	  const select = ui.undiscordWindow.querySelector('#runProfile');
	  if (select && select.value !== profileId) select.value = profileId;
	  ui.undiscordWindow.dataset.profile = profileId;

	  const hint = ui.undiscordWindow.querySelector('#runProfileHint');
	  if (hint) hint.textContent = profile.hint || RUN_PROFILES.custom.hint;

	  const mediaSection = ui.undiscordWindow.querySelector('#mediaReviewSection');
	  const showMedia = profile.showMediaSection || profileId === 'custom';
	  if (mediaSection) mediaSection.style.display = showMedia ? '' : 'none';

	  if (profileId === 'custom') return;

	  if (profile.pipeline) {
	    const radio = ui.undiscordWindow.querySelector(`input[name="pipeline"][value="${profile.pipeline}"]`);
	    if (radio) radio.checked = true;
	  }
	  if (profile.searchDelayMs != null) syncDelayInput('searchDelay', profile.searchDelayMs, SEARCH_DELAY_MS);
	  if (profile.deleteDelayMs != null) syncDelayInput('deleteDelay', profile.deleteDelayMs, DELETE_DELAY_MS);
	  if (profile.emptyPageRetries != null) {
	    const el = ui.undiscordWindow.querySelector('#emptyPageRetries');
	    if (el) el.value = profile.emptyPageRetries;
	  }
	  if (profile.mediaScanMode) {
	    const r = ui.undiscordWindow.querySelector(`input[name="mediaScanMode"][value="${profile.mediaScanMode}"]`);
	    if (r) r.checked = true;
	  }
	  if (profile.mediaBatchSize != null) {
	    const b = ui.undiscordWindow.querySelector('#mediaBatchSize');
	    if (b) b.value = profile.mediaBatchSize;
	  }
	  const askEl = ui.undiscordWindow.querySelector('#askConfirmation');
	  if (askEl && profile.askForConfirmation !== undefined) askEl.checked = profile.askForConfirmation;
	  const allCh = ui.undiscordWindow.querySelector('#deleteAllChannels');
	  if (allCh && profile.deleteAllChannels !== undefined) allCh.checked = profile.deleteAllChannels;
	  syncDeleteAllChannelsUI();
	}

	function syncDeleteAllChannelsUI() {
	  if (!ui.undiscordWindow) return;
	  const on = !!ui.undiscordWindow.querySelector('#deleteAllChannels')?.checked;
	  const chInput = ui.undiscordWindow.querySelector('#channelId');
	  if (chInput) {
	    chInput.disabled = on;
	    chInput.placeholder = on ? 'Auto — all server channels' : 'Channel, or comma-separated';
	  }
	}

	function readPipelineFromUI() {
	  const profileId = ui.undiscordWindow?.querySelector('#runProfile')?.value || 'fastWipe';
	  if (profileId !== 'custom' && RUN_PROFILES[profileId]?.pipeline) {
	    return RUN_PROFILES[profileId].pipeline;
	  }
	  return ui.undiscordWindow?.querySelector('input[name="pipeline"]:checked')?.value || 'direct';
	}

	function getDiscordContextNames() {
	  const guildId = ui.undiscordWindow?.querySelector('#guildId')?.value?.trim();
	  const channelId = ui.undiscordWindow?.querySelector('#channelId')?.value?.trim().split(/\s*,\s*/)[0];
	  return {
	    serverName: guildId === '@me' ? 'Direct_Messages' : (guildId || 'Server'),
	    channelName: channelId || 'Channel',
	  };
	}

	function copyLogAction() {
	  const text = ui.logArea?.innerText || '';
	  if (!text.trim()) return log.warn('Log is empty.');
	  const done = () => log.success('Log copied to clipboard.');
	  const fail = () => log.error('Could not copy log — select and copy manually.');
	  if (navigator.clipboard?.writeText) {
	    navigator.clipboard.writeText(text).then(done).catch(fail);
	  } else {
	    fail();
	  }
	}

	// -------------------------- User interface ------------------------------- //

	// links — fork repo for project/issues; original wiki for field help docs
	const HOME = 'https://github.com/Levskitron/undiscord2electricboogaloo';
	const ORIGINAL = 'https://github.com/victornpb/undiscord';
	const WIKI = 'https://github.com/victornpb/undiscord/wiki';

	const undiscordCore = new UndiscordCore();
	messagePicker.init();

	const ui = {
	  undiscordWindow: null,
	  undiscordBtn: null,
	  logArea: null,
	  autoScroll: null,

	  // progress handler
	  progressMain: null,
	  progressIcon: null,
	  percent: null,
	};
	const $ = s => ui.undiscordWindow.querySelector(s);

	function syncLogOptionsFromUI() {
	  if (!ui.undiscordWindow) return;
	  undiscordCore.options.verboseLog = $('input#verboseLog').checked;
	  undiscordCore.options.logEveryDeletion = $('input#logDeletions').checked;
	}

	function onLogOptionChange(kind) {
	  const wasRunning = undiscordCore.state.running;
	  syncLogOptionsFromUI();
	  if (!wasRunning) return;
	  if (kind === 'verbose') {
	    log.info(undiscordCore.options.verboseLog
	      ? 'Verbose log enabled — extra detail from the next page fetch onward.'
	      : 'Verbose log disabled.');
	  } else {
	    log.info(undiscordCore.options.logEveryDeletion
	      ? 'Per-message log enabled — upcoming deletes will be listed.'
	      : 'Per-message log disabled.');
	  }
	}

	function initUI() {

	  insertCss(themeCss);
	  insertCss(mainCss);
	  insertCss(dragCss);

	  // create undiscord window
	  const undiscordUI = replaceInterpolations(undiscordTemplate, {
	    VERSION,
	    TOOL_NAME,
	    HOME,
	    ORIGINAL,
	    WIKI,
	  });
	  ui.undiscordWindow = createElm(undiscordUI);
	  document.body.appendChild(ui.undiscordWindow);

	  // enable drag and resize on undiscord window (fixed width)
	  new DragResize({
	    elm: ui.undiscordWindow,
	    moveHandle: $('.header'),
	    options: {
	      minWidth: WINDOW_WIDTH,
	      maxWidth: WINDOW_WIDTH,
	    },
	  });
	  requestAnimationFrame(() => centerUndiscordWindow());

	  // create undiscord Trash icon
	  ui.undiscordBtn = createElm(replaceInterpolations(buttonHtml, { TOOL_NAME }));
	  ui.undiscordBtn.onclick = (e) => {
	    e.preventDefault();
	    e.stopPropagation();
	    toggleWindow();
	  };
	  const isUndiscordBtnVisible = () => {
	    if (!ui.undiscordBtn?.isConnected) return false;
	    const r = ui.undiscordBtn.getBoundingClientRect();
	    if (r.width < 4 || r.height < 4) return false;
	    const style = getComputedStyle(ui.undiscordBtn);
	    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
	    return true;
	  };

	  const isToolbarMounted = () => {
	    if (!ui.undiscordBtn?.isConnected || ui.undiscordBtn.classList.contains('undiscord-floating')) return false;
	    if (ui.undiscordBtn.parentElement === document.body) return false;
	    return isUndiscordBtnVisible();
	  };

	  function isElementVisible(el) {
	    if (!el?.isConnected) return false;
	    const r = el.getBoundingClientRect();
	    if (r.width < 4 || r.height < 4) return false;
	    const style = getComputedStyle(el);
	    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
	    return true;
	  }

	  function scoreToolbar(el) {
	    if (!isElementVisible(el)) return -1;
	    let score = 0;
	    const cls = String(el.className || '');
	    const r = el.getBoundingClientRect();

	    if (el.closest('[aria-label="Channel header"], section[aria-label="Channel header"], header[aria-label="Channel header"]')) score += 120;
	    if (/toolbar/i.test(cls)) score += 25;

	    const iconBtns = el.querySelectorAll(':scope > button, :scope > [role="button"]');
	    score += Math.min(iconBtns.length, 6) * 8;

	    if (r.top >= 0 && r.top < 160 && r.left > 200) score += 35;
	    if (r.right > window.innerWidth * 0.35) score += 15;
	    if (r.width > 500 || r.height > 72) score -= 40;

	    const display = getComputedStyle(el).display;
	    if (display === 'flex' || display === 'inline-flex') score += 10;

	    return score;
	  }

	  function collectToolbarCandidates(root) {
	    const seen = new Set();
	    const candidates = [];

	    function add(el) {
	      if (!el || seen.has(el)) return;
	      seen.add(el);
	      const score = scoreToolbar(el);
	      if (score >= 0) candidates.push({ el, score });
	    }

	    // Anchor off header icons (Search / Threads / Pins) — stable across class renames
	    const headerIconLabels = ['Search', 'Threads', 'Pinned Messages', 'Pin', 'Notifications', 'Start Voice', 'Open Chat'];
	    for (const label of headerIconLabels) {
	      const btn = root.querySelector(`[aria-label*="${label}" i]`);
	      if (!btn) continue;
	      const toolbar = btn.closest('[class*="toolbar"], [class^="toolbar_"], [class*="toolBar"]');
	      if (toolbar) add(toolbar);
	    }

	    const selectors = [
	      '[aria-label="Channel header"] [class*="toolbar"]',
	      '[aria-label="Channel header"] [class^="toolbar_"]',
	      'section[aria-label="Channel header"] [class*="toolbar"]',
	      '[class*="upperContainer"] [class*="toolbar"]',
	      'main [class*="toolbar"]',
	      '[class^="toolbar_"]',
	      '[class^="toolbar-"]',
	      '[class*="toolbar__"]',
	      '[class*="-toolbar"]',
	      '[role="toolbar"]',
	    ];
	    for (const sel of selectors) {
	      root.querySelectorAll(sel).forEach(add);
	    }

	    candidates.sort((a, b) => b.score - a.score);
	    return candidates;
	  }

	  function findToolbar() {
	    const root = document.querySelector('#app-mount');
	    if (!root) return null;
	    const candidates = collectToolbarCandidates(root);
	    return candidates[0]?.el || null;
	  }

	  function mountFloatingBtn() {
	    ui.undiscordBtn.classList.add('undiscord-floating');
	    if (!document.body.contains(ui.undiscordBtn)) document.body.appendChild(ui.undiscordBtn);
	    return true;
	  }

	  function tryMountToolbar() {
	    const toolbar = findToolbar();
	    if (!toolbar) return false;
	    ui.undiscordBtn.classList.remove('undiscord-floating');
	    if (!toolbar.contains(ui.undiscordBtn)) toolbar.appendChild(ui.undiscordBtn);
	    return isUndiscordBtnVisible();
	  }

	  function mountBtn() {
	    if (tryMountToolbar()) return true;
	    if (!isUndiscordBtnVisible()) return mountFloatingBtn();
	    return isToolbarMounted();
	  }

	  mountBtn();
	  let mountTries = 0;
	  const mountRetryTimer = setInterval(() => {
	    if (tryMountToolbar()) {
	      clearInterval(mountRetryTimer);
	      return;
	    }
	    if (!isUndiscordBtnVisible()) mountFloatingBtn();
	    if (++mountTries >= 48) clearInterval(mountRetryTimer);
	  }, 2500);

	  // Re-mount when Discord re-renders; keep trying to move off floating fallback
	  const discordElm = document.querySelector('#app-mount');
	  let observerThrottle = null;
	  const observer = new MutationObserver((_mutationsList, _observer) => {
	    if (observerThrottle) return;
	    observerThrottle = setTimeout(() => {
	      observerThrottle = null;
	      if (!discordElm?.contains(ui.undiscordBtn)) {
	        mountBtn();
	      } else if (!isToolbarMounted()) {
	        tryMountToolbar() || (!isUndiscordBtnVisible() && mountFloatingBtn());
	      }
	    }, 800);
	  });
	  if (discordElm) observer.observe(discordElm, { attributes: false, childList: true, subtree: true });

	  function toggleWindow() {
	    // Class-based hide — inline display:none loses to themeCss `display:flex !important`
	    const hidden = ui.undiscordWindow.classList.toggle('undiscord-hidden');
	    ui.undiscordBtn.style.color = hidden
	      ? 'var(--interactive-text-default, var(--interactive-normal))'
	      : 'var(--interactive-text-hover, var(--interactive-active))';
	  }

	  // cached elements
	  ui.logArea = $('#logArea');
	  ui.autoScroll = $('#autoScroll');
	  ui.progressMain = $('#progressBar');
	  ui.progressIcon = ui.undiscordBtn.querySelector('progress');
	  ui.percent = $('#progressPercent');

	  function centerUndiscordWindow() {
	    const el = ui.undiscordWindow;
	    el.style.right = 'auto';
	    el.style.transform = 'none';
	    const w = el.offsetWidth || WINDOW_WIDTH;
	    const h = el.offsetHeight || Math.round(window.innerHeight * 0.8);
	    el.style.left = `${Math.max(0, Math.round((window.innerWidth - w) / 2))}px`;
	    el.style.top = `${Math.max(0, Math.round((window.innerHeight - h) / 2))}px`;
	  }

	  // register event listeners
	  $('#toggleSidebar').onclick = (e) => {
	    e.preventDefault();
	    e.stopPropagation();
	    ui.undiscordWindow.classList.toggle('hide-sidebar');
	  };
	  $('button#start').onclick = startAction;
	  $('button#stop').onclick = stopAction;
	  $('button#copyLog').onclick = copyLogAction;
	  $('button#clear').onclick = () => ui.logArea.innerHTML = '';
	  $('select#runProfile').onchange = (e) => applyRunProfileToUI(e.target.value);
	  $('input#deleteAllChannels').onchange = syncDeleteAllChannelsUI;
	  applyRunProfileToUI('fastWipe');

	  let lastRoutePath = location.pathname;
	  function tryAutofillFromRoute() {
	    if (!$('input#autofillOnNavigate').checked) return;
	    if (undiscordCore.state.running) return;
	    const m = location.pathname.match(/\/channels\/([\w@]+)\/(\d+)/);
	    if (!m) return;
	    $('input#guildId').value = m[1];
	    if (!$('input#deleteAllChannels').checked) $('input#channelId').value = m[2];
	  }
	  tryAutofillFromRoute();
	  setInterval(() => {
	    if (location.pathname !== lastRoutePath) {
	      lastRoutePath = location.pathname;
	      tryAutofillFromRoute();
	    }
	  }, 1200);
	  $('button#getAuthor').onclick = () => $('input#authorId').value = getAuthorId();
	  $('button#getGuild').onclick = () => {
	    const guildId = $('input#guildId').value = getGuildId();
	    if (guildId === '@me') $('input#channelId').value = getChannelId();
	  };
	  $('button#getChannel').onclick = () => {
	    $('input#channelId').value = getChannelId();
	    $('input#guildId').value = getGuildId();
	  };
	  function applyPrivacyMode() {
	    ui.undiscordWindow.classList.toggle('privacy-mode', $('input#privacyMode').checked);
	  }
	  $('input#privacyMode').onchange = applyPrivacyMode;
	  applyPrivacyMode();
	  $('#pickMessageAfter').onclick = async () => {
	    alert('Select a message on the chat.\nThe message below it will be deleted.');
	    toggleWindow();
	    const id = await messagePicker.grab('after');
	    if (id) $('input#minId').value = id;
	    toggleWindow();
	  };
	  $('#pickMessageBefore').onclick = async () => {
	    alert('Select a message on the chat.\nThe message above it will be deleted.');
	    toggleWindow();
	    const id = await messagePicker.grab('before');
	    if (id) $('input#maxId').value = id;
	    toggleWindow();
	  };
	  $('button#getToken').onclick = async () => { $('input#token').value = await fillToken(); };

	  $('input#verboseLog').onchange = () => onLogOptionChange('verbose');
	  $('input#logDeletions').onchange = () => onLogOptionChange('deletions');

	  $('input#searchDelay').onchange = () => readDelayInput('searchDelay', SEARCH_DELAY_MS);
	  $('input#deleteDelay').onchange = () => readDelayInput('deleteDelay', DELETE_DELAY_MS);

	  undiscordCore.options.searchDelay = SEARCH_DELAY_MS.default;
	  undiscordCore.options.deleteDelay = DELETE_DELAY_MS.default;
	  syncDelayInput('searchDelay', SEARCH_DELAY_MS.default, SEARCH_DELAY_MS);
	  syncDelayInput('deleteDelay', DELETE_DELAY_MS.default, DELETE_DELAY_MS);

	  // import json
	  const fileSelection = $('input#importJsonInput');
	  fileSelection.onchange = async () => {
	    const files = fileSelection.files;

	    // No files added
	    if (files.length === 0) return log.warn('No file selected.');

	    // Get channel id field to set it later
	    const channelIdField = $('input#channelId');

	    // Force the guild id to be ourself (@me)
	    const guildIdField = $('input#guildId');
	    guildIdField.value = '@me';

	    // Set author id in case its not set already
	    $('input#authorId').value = getAuthorId();
	    try {
	      const file = files[0];
	      const text = await file.text();
	      const json = JSON.parse(text);
	      const channelIds = Object.keys(json);
	      channelIdField.value = channelIds.join(',');
	      log.info(`Loaded ${channelIds.length} channels.`);
	    } catch(err) {
	      log.error('Error parsing file!', err);
	    }
	  };

	  // redirect console logs to inside the window after setting up the UI
	  setLogFn(printLog);

	  setupUndiscordCore();
	}

	function printLog(type = '', args) {
	  if (type === 'debug' && !undiscordCore.options.verboseLog) {
	    console.debug(PREFIX, ...Array.from(args));
	    return;
	  }
	  const text = Array.from(args).map(o => {
	    if (typeof o !== 'object' || o === null) return o;
	    if (o instanceof Error) return o.message;
	    if (undiscordCore.options.verboseLog) return JSON.stringify(o);
	    return null;
	  }).filter(v => v !== null).join(' ');
	  if (!text) return;
	  ui.logArea.insertAdjacentHTML('beforeend', `<div class="log log-${type}">${text}</div>`);
	  if (ui.autoScroll.checked) ui.logArea.querySelector('div:last-child').scrollIntoView(false);
	  if (type === 'error') console.error(PREFIX, ...Array.from(args));
	  else if (type === 'debug') console.debug(PREFIX, ...Array.from(args));
	}

	function setupUndiscordCore() {

	  undiscordCore.onStart = (state, stats) => {
	    console.log(PREFIX, 'onStart', state, stats);
	    $('#start').disabled = true;
	    $('#stop').disabled = false;

	    ui.undiscordBtn.classList.add('running');
	    ui.progressMain.style.display = 'block';
	    ui.percent.style.display = 'block';
	  };

	  undiscordCore.onProgress = (state, stats) => {
	    // console.log(PREFIX, 'onProgress', state, stats);
	    let max = state.grandTotal;
	    const value = state.delCount + state.failCount;
	    max = Math.max(max, value, 0); // clamp max

	    // status bar
	    const percent = value >= 0 && max ? Math.round(value / max * 100) + '%' : '';
	    const elapsed = msToHMS(Date.now() - stats.startTime.getTime());
	    const remaining = msToHMS(stats.etr);
	    const batchPrefix = state._batchActive && state._batchTotal
	      ? `Ch ${state._batchIndex}/${state._batchTotal} · `
	      : '';
	    ui.percent.innerHTML = `${batchPrefix}${percent} (${value}/${max}) Elapsed: ${elapsed} Remaining: ${remaining}`;

	    ui.progressIcon.value = value;
	    ui.progressMain.value = value;

	    // indeterminate progress bar
	    if (max) {
	      ui.progressIcon.setAttribute('max', max);
	      ui.progressMain.setAttribute('max', max);
	    } else {
	      ui.progressIcon.removeAttribute('value');
	      ui.progressMain.removeAttribute('value');
	      ui.percent.innerHTML = '...';
	    }

	    // update delays (rate limit may have increased them mid-run)
	    syncDelayInput('searchDelay', undiscordCore.options.searchDelay, SEARCH_DELAY_MS);
	    syncDelayInput('deleteDelay', undiscordCore.options.deleteDelay, DELETE_DELAY_MS);
	  };

	  undiscordCore.onStop = (state, stats) => {
	    console.log(PREFIX, 'onStop', state, stats);
	    $('#start').disabled = false;
	    $('#stop').disabled = true;
	    ui.undiscordBtn.classList.remove('running');
	    ui.progressMain.style.display = 'none';
	    ui.percent.style.display = 'none';
	  };
	}

	async function startAction() {
	  console.log(PREFIX, 'startAction');
	  // general
	  const authorId = $('input#authorId').value.trim();
	  const guildId = $('input#guildId').value.trim();
	  const deleteAllChannels = $('input#deleteAllChannels').checked;
	  let channelIds = deleteAllChannels
	    ? []
	    : $('input#channelId').value.trim().split(/\s*,\s*/).filter(Boolean);
	  const includeNsfw = $('input#includeNsfw').checked;
	  // filter
	  const content = $('input#search').value.trim();
	  const hasLink = $('input#hasLink').checked;
	  const hasFile = $('input#hasFile').checked;
	  const includePinned = $('input#includePinned').checked;
	  const pattern = $('input#pattern').value;
	  // message interval
	  const minId = $('input#minId').value.trim();
	  const maxId = $('input#maxId').value.trim();
	  // date range
	  const minDate = $('input#minDate').value.trim();
	  const maxDate = $('input#maxDate').value.trim();
	  //advanced
	  const searchDelay = readDelayInput('searchDelay', SEARCH_DELAY_MS);
	  const deleteDelay = readDelayInput('deleteDelay', DELETE_DELAY_MS);
	  const emptyPageRetries = parseInt($('input#emptyPageRetries').value.trim(), 10);
	  const skipLink = $('input#skipLink').checked;
	  const skipFile = $('input#skipFile').checked;
	  const skipPinned = $('input#skipPinned').checked;
	  const pipeline = readPipelineFromUI();
	  const mediaScanMode = $('input[name="mediaScanMode"]:checked')?.value || 'media_only';
	  const mediaBatchSize = parseInt($('input#mediaBatchSize').value.trim(), 10);
	  const profileId = $('select#runProfile').value;
	  const profile = RUN_PROFILES[profileId] || RUN_PROFILES.custom;
	  const askForConfirmation = profileId === 'custom'
	    ? $('input#askConfirmation').checked
	    : (profile.askForConfirmation ?? false);
	  const unarchiveThreads = $('input#unarchiveThreads').checked;
	  const { serverName, channelName } = getDiscordContextNames();
	  syncLogOptionsFromUI();

	  if (pipeline === 'mediaReview' && (deleteAllChannels || channelIds.length > 1)) {
	    return log.error('Interactive media review supports one channel at a time. Use a single Channel ID or run Fast wipe for batch jobs.');
	  }
	  if (deleteAllChannels && guildId === '@me') {
	    return log.error('Server-wide wipe does not work in DMs. Use a real Server ID.');
	  }
	  if (deleteAllChannels && pipeline === 'mediaReview') {
	    return log.error('Server-wide wipe cannot use interactive media review. Switch to Fast wipe or Server wipe profile.');
	  }

	  // token
	  const authToken = $('input#token').value.trim() || await fillToken();
	  if (!authToken) return;

	  // validate input
	  if (!guildId) return log.error('You must fill the "Server ID" field!');

	  let channelInfos = [];
	  if (deleteAllChannels) {
	    log.info('Discovering all message channels in this server…');
	    channelInfos = await getServerMessageChannels(guildId, authToken);
	    channelIds = channelInfos.map(c => c.id).filter(Boolean);
	    if (!channelIds.length) {
	      return log.error('No message channels found. Open the server in Discord and try again, or enter Channel IDs manually.');
	    }
	    const bySource = channelInfos.reduce((acc, c) => {
	      acc[c.source] = (acc[c.source] || 0) + 1;
	      return acc;
	    }, {});
	    log.info(`Server wipe: ${channelIds.length} channel(s) queued.`);
	    if ($('input#verboseLog').checked) log.verb('Discovery breakdown:', bySource);
	    log.warn('Server-wide deletion is slow and rate-limit sensitive. Keep Delete delay ≥ 1.5s.');
	  }

	  // clear logArea
	  ui.logArea.innerHTML = '';

	  undiscordCore.resetState();
	  undiscordCore.options = {
	    ...undiscordCore.options,
	    authToken,
	    authorId,
	    guildId,
	    channelId: channelIds.length === 1 ? channelIds[0] : undefined, // single or multiple channel
	    minId: minId || minDate,
	    maxId: maxId || maxDate,
	    content,
	    hasLink,
	    hasFile,
	    includeNsfw,
	    includePinned,
	    pattern,
	    searchDelay,
	    deleteDelay,
	    emptyPageRetries: Number.isNaN(emptyPageRetries) ? 2 : emptyPageRetries,
	    verboseLog: undiscordCore.options.verboseLog,
	    logEveryDeletion: undiscordCore.options.logEveryDeletion,
	    pipeline,
	    mediaScanMode,
	    mediaBatchSize: Number.isNaN(mediaBatchSize) ? 50 : Math.max(5, Math.min(100, mediaBatchSize)),
	    skipLink,
	    skipFile,
	    skipPinned,
	    askForConfirmation,
	    serverName,
	    channelName,
	    unarchiveThreads,
	  };

	  if (pipeline === 'mediaReview') {
	    log.info(`Profile: ${profileId} — interactive review (${mediaScanMode === 'media_only' ? 'attachments only' : 'all messages'}).`);
	  } else if (profileId === 'serverWipe' || deleteAllChannels) {
	    log.info(`Profile: ${profileId} — server-wide delete across ${channelIds.length} channel(s).`);
	  } else if (profileId !== 'fastWipe') {
	    log.info(`Profile: ${profileId} — direct delete.`);
	  }

	  const infoById = new Map(channelInfos.map(c => [c.id, c]));

	  if (channelIds.length > 1 || deleteAllChannels) {
	    const jobs = channelIds.map(ch => {
	      const info = infoById.get(ch);
	      return {
	        guildId,
	        channelId: ch,
	        channelName: info?.name || ch,
	        serverName,
	      };
	    });

	    try {
	      await undiscordCore.runBatch(jobs);
	    } catch (err) {
	      log.error('CoreException', err);
	      undiscordCore.state.running = false;
	      undiscordCore.completeRun();
	    }
	  } else {
	    try {
	      await undiscordCore.run();
	    } catch (err) {
	      log.error('CoreException', err);
	      undiscordCore.state.running = false;
	      undiscordCore.completeRun();
	    }
	  }
	}

	function stopAction() {
	  console.log(PREFIX, 'stopAction');
	  undiscordCore.stop();
	}

	// ---- END Undiscord ----

	initUI();
})();
