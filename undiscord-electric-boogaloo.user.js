// ==UserScript==
// @name            Undiscord 2: Electric Boogaloo
// @description     An overhauled, fixed version of the original Undiscord for bulk message deletion.
// @version         1.0.0
// @author          Levskitron
// @homepageURL     https://github.com/Levskitron/undiscord2electricboogaloo
// @supportURL      https://github.com/Levskitron/undiscord2electricboogaloo/issues
// @match           https://*.discord.com/*
// @license         MIT
// @namespace       https://github.com/Levskitron/undiscord2electricboogaloo
// @icon            https://victornpb.github.io/undiscord/images/icon128.png
// @grant           none
// @attribution     Original project (https://github.com/victornpb/undiscord)
// ==/UserScript==
(function () {
	'use strict';

	/* rollup-plugin-baked-env */
	const VERSION = '1.0.0';
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
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important; /* Keeps panels perfectly aligned at bottom */
    overflow: hidden !important;
}

#undiscord .sidebar {
    background-color: #1e1f22 !important;
    width: 270px;
    min-width: 270px;
    padding: 16px 12px !important;
    height: 100% !important;
    box-sizing: border-box !important;
    border-right: 1px solid #111214 !important;
}

#undiscord .main {
    background-color: #313338 !important;
    display: flex !important;
    flex-direction: column !important;
    flex-grow: 1;
    min-width: 0 !important;
    height: 100% !important;
    box-sizing: border-box !important;
}

/* Fix stacked input containers with proper padding margins */
#undiscord fieldset {
    margin-top: 10px !important;
    margin-bottom: 24px !important; /* Gives breathing room to elements below */
    border: none !important;
    padding: 0 !important;
}

#undiscord .multiInput {
    display: flex !important;
    flex-direction: column !important; /* Stack cleanly */
    align-items: stretch !important;
    gap: 6px !important;
}

#undiscord .input-wrapper {
    width: 100% !important;
}

/* Custom styled layout text boxes */
#undiscord input[type="text"],
#undiscord input[type="datetime-local"],
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

/* Clean, modern label typography */
#undiscord legend, #undiscord label, #undiscord summary {
    color: #949ba4 !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    margin-bottom: 6px !important;
    letter-spacing: 0.5px;
}

#undiscord summary {
    font-size: 14px !important;
    color: #dbdee1 !important;
    cursor: pointer;
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

/* Sidebar action button structural configuration */
#undiscord .sidebar button {
    width: 100% !important; /* Makes target select buttons full width below text fields */
    margin: 2px 0 0 0 !important;
    background-color: #383a40 !important;
}

#undiscord .sidebar button:hover {
    background-color: #4e5058 !important;
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

#undiscord hr {
    border: none !important;
    border-bottom: 1px solid #3f4147 !important;
    margin: 20px 0 !important;
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
`);

	var mainCss = (`
/**** Undiscord Button ****/
#undicord-btn { position: relative; width: auto; height: 24px; margin: 0 8px; cursor: pointer; color: var(--interactive-normal); flex: 0 0 auto; }
#undicord-btn.undiscord-floating { position: fixed !important; bottom: 24px !important; right: 24px !important; z-index: 999999 !important; margin: 0 !important; padding: 8px !important; border-radius: 50% !important; background: var(--background-floating, #2b2d31) !important; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45) !important; }
#undicord-btn progress { position: absolute; top: 23px; left: -4px; width: 32px; height: 12px; display: none; }
#undicord-btn.running { color: var(--button-danger-background) !important; }
#undicord-btn.running progress { display: block; }
/**** Undiscord Interface ****/
#undiscord { position: fixed; z-index: 100; display: flex; flex-direction: column; width: 960px; min-width: 960px; max-width: 96vw; height: 80vh; min-height: 448px; max-height: 100vh; color: var(--text-normal); border-radius: 4px; background-color: var(--background-secondary); box-shadow: var(--elevation-stroke), var(--elevation-high); will-change: top, left, height; }
#undiscord .header .icon { cursor: pointer; }
#undiscord .window-body { height: calc(100% - 48px); }
#undiscord .sidebar { overflow: hidden scroll; overflow-y: auto; width: 270px; min-width: 250px; height: 100%; max-height: 100%; padding: 8px; background: var(--bg-overlay-4, var(--background-base-lowest)); }
#undiscord .sidebar legend,
#undiscord .sidebar label { display: block; width: 100%; }
#undiscord .main { display: flex; max-width: calc(100% - 250px); background-color: var(--bg-overlay-chat, var(--background-base-lower)); flex-grow: 1; }
#undiscord.hide-sidebar .sidebar { display: none; }
#undiscord.hide-sidebar .main { max-width: 100%; }
#undiscord #logArea { font-family: Consolas, Liberation Mono, Menlo, Courier, monospace; font-size: 0.75rem; padding: 10px; user-select: text; flex-grow: 1; min-width: 0; min-height: 0; cursor: auto; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; overflow-x: hidden; overflow-y: auto; }
#undiscord #logArea .log { white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; max-width: 100%; line-height: 1.45; margin-bottom: 4px; }
#undiscord .tbar { padding: 8px; background-color: var(--bg-overlay-2, var(--__header-bar-background)); }
#undiscord .tbar button { margin-right: 4px; margin-bottom: 4px; }
#undiscord .footer { display: flex !important; align-items: center !important; cursor: se-resize; padding-right: 30px; flex-wrap: nowrap !important; gap: 12px !important; }
#undiscord .footer label { display: inline-flex !important; align-items: center !important; white-space: nowrap !important; flex-shrink: 0 !important; gap: 6px !important; margin: 0 !important; }
#undiscord .footer #progressPercent { padding: 0 1em; font-size: small; color: var(--interactive-muted); flex-grow: 1; min-width: 0; overflow-wrap: anywhere; word-break: break-word; white-space: normal; }
.resize-handle { position: absolute; bottom: -15px; right: -15px; width: 30px; height: 30px; transform: rotate(-45deg); background: repeating-linear-gradient(0, var(--background-modifier-accent), var(--background-modifier-accent) 1px, transparent 2px, transparent 4px); cursor: nwse-resize; }
/**** Elements ****/
#undiscord summary { font-size: 16px; font-weight: 500; line-height: 20px; position: relative; overflow: hidden; margin-bottom: 2px; padding: 6px 10px; cursor: pointer; white-space: nowrap; text-overflow: ellipsis; color: var(--interactive-normal); border-radius: 4px; flex-shrink: 0; }
#undiscord fieldset { padding-left: 8px; }
#undiscord legend a { float: right; text-transform: initial; }
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
        <div class="sidebar scroll">
            <details open>
                <summary>General</summary>
                <fieldset>
                    <legend>
                        Author ID
                        <a href="{{WIKI}}/authorId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="authorId" type="text" priv>
                        </div>
                        <button id="getAuthor">me</button>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Server ID
                        <a href="{{WIKI}}/guildId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="guildId" type="text" priv>
                        </div>
                        <button id="getGuild">current</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Channel ID
                        <a href="{{WIKI}}/channelId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input class="input" id="channelId" type="text" priv>
                        </div>
                        <button id="getChannel">current</button>
                    </div>
                    <div class="sectionDescription">
                        <label class="row" title="Required for Discord to return messages from age-restricted channels when searching a server">
                            <input id="includeNsfw" type="checkbox"> Include NSFW channels (server search)
                        </label>
                        <div class="sectionDescription">Only applies to server channels, not DMs. Enable if you are wiping an age-restricted channel.</div>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Wipe Archive</summary>
                <fieldset>
                    <legend>
                        Import index.json
                        <a href="{{WIKI}}/importJson" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input type="file" id="importJsonInput" accept="application/json,.json" style="width:100%";>
                    </div>
                    <div class="sectionDescription">
                        <br>
                        After requesting your data from discord, you can import it here.<br>
                        Select the "messages/index.json" file from the discord archive.
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Filter</summary>
                <fieldset>
                    <legend>
                        Search
                        <a href="{{WIKI}}/filters" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="search" type="text" placeholder="Containing text" priv>
                    </div>
                    <div class="sectionDescription">
                        Only delete messages that contain the text
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasLink" type="checkbox">has: link</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasFile" type="checkbox">has: file</label>
                    </div>
                    <div class="sectionDescription">
                        <label title="When enabled, pinned messages are deleted too (upstream Undiscord left this off by default)">
                            <input id="includePinned" type="checkbox" checked> Delete pinned messages
                        </label>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Pattern
                        <a href="{{WIKI}}/pattern" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="sectionDescription">
                        Delete messages that match the regular expression
                    </div>
                    <div class="input-wrapper">
                        <span class="info">/</span>
                        <input id="pattern" type="text" placeholder="regular expression" priv>
                        <span class="info">/</span>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Messages interval</summary>
                <fieldset>
                    <legend>
                        Interval of messages
                        <a href="{{WIKI}}/messageId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input id="minId" type="text" placeholder="After a message" priv>
                        </div>
                        <button id="pickMessageAfter">Pick</button>
                    </div>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input id="maxId" type="text" placeholder="Before a message" priv>
                        </div>
                        <button id="pickMessageBefore">Pick</button>
                    </div>
                    <div class="sectionDescription">
                        Specify an interval to delete messages.
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Date interval</summary>
                <fieldset>
                    <legend>
                        After date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper mb1">
                        <input id="minDate" type="datetime-local" title="Messages posted AFTER this date">
                    </div>
                    <legend>
                        Before date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="maxDate" type="datetime-local" title="Messages posted BEFORE this date">
                    </div>
                    <div class="sectionDescription">
                        Delete messages that were posted between the two dates.
                    </div>
                    <div class="sectionDescription">
                        * Filtering by date doesn't work if you use the "Messages interval".
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Advanced settings</summary>
                <fieldset>
                    <legend>
                        Search delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="searchDelay" type="range" value="30000" step="100" min="100" max="60000">
                        <div id="searchDelayValue"></div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Delete delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="deleteDelay" type="range" value="1000" step="50" min="50" max="10000">
                        <div id="deleteDelayValue"></div>
                    </div>
                    <br>
                    <div class="sectionDescription">
                        This will affect the speed in which the messages are deleted.
                        Use the help link for more information.
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Empty page retries</legend>
                    <div class="input-wrapper">
                        <input id="emptyPageRetries" type="number" value="2" min="0" max="10" step="1">
                    </div>
                    <br>
                    <div class="sectionDescription">
                        Retries when the search API returns an empty page before stopping. Discord sometimes returns empty pages transiently.
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Authorization Token
                        <a href="{{WIKI}}/authToken" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="token" type="text" autocomplete="dont" priv>
                        </div>
                        <button id="getToken">fill</button>
                    </div>
                </fieldset>
            </details>
            <hr>
            <div></div>
            <div class="info">
                <strong>{{TOOL_NAME}}</strong> v{{VERSION}}
                <br> by <a href="https://github.com/Levskitron" target="_blank" rel="noopener noreferrer">Levskitron</a>
                <br> fork of <a href="{{ORIGINAL}}" target="_blank" rel="noopener noreferrer" title="Original Undiscord by Victornpb">Undiscord</a> (victornpb)
            </div>
        </div>
        <div class="main col">
            <div class="tbar col">
                <div class="row">
                    <button id="toggleSidebar" class="sizeMedium icon">☰</button>
                    <button id="start" class="sizeMedium danger" style="width: 150px;" title="Start the deletion process">▶︎ Delete</button>
                    <button id="stop" class="sizeMedium" title="Stop the deletion process" disabled>🛑 Stop</button>
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
                <div class="" style="background: var(--background-mentioned); padding: .5em;">Tip: If deletion stops early on empty pages, increase <b>Empty page retries</b> under Advanced settings.</div>
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
	    pinnedSkipCount: 0,
	  };

	  stats = {
	    startTime: new Date(), // start time
	    throttledCount: 0, // how many times you have been throttled
	    throttledTotalTime: 0, // the total amount of time you spent being throttled
	    lastPing: null, // the most recent ping
	    avgPing: null, // average ping used to calculate the estimated remaining time
	    etr: 0,
	  };

	  // events
	  onStart = undefined;
	  onProgress = undefined;
	  onStop = undefined;

	  _userStopped = false;
	  _runFinished = false;

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
	      pinnedSkipCount: 0,
	    };

	    this._skipHintShown = false;
	    this._pinnedHintShown = false;
	    this.options.askForConfirmation = true;
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

	    log.info(`Runnning batch with queue of ${queue.length} jobs`);
	    for (let i = 0; i < queue.length; i++) {
	      const job = queue[i];
	      log.info('Starting job...', `(${i + 1}/${queue.length})`);

	      // set options
	      this.options = {
	        ...this.options, // keep current options
	        ...job, // override with options for that job
	      };

	      await this.run(true);
	      if (!this.state.running) break;

	      log.info('Job ended.', `(${i + 1}/${queue.length})`);
	      this.resetState();
	      this.options.askForConfirmation = false;
	      this.state.running = true; // continue running
	    }

	    log.info('Batch finished.');
	    this.state.running = false;
	  }

	  /** Sleep in small steps so Stop can break out without waiting the full delay */
	  async interruptibleWait(ms) {
	    const step = 250;
	    for (let elapsed = 0; elapsed < ms; elapsed += step) {
	      if (!this.state.running) return false;
	      await wait(Math.min(step, ms - elapsed));
	    }
	    return this.state.running;
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

	    log.success(`Finished at ${this.stats.endTime.toLocaleString()} (${elapsed})`);
	    if (this.onStop) this.onStop(this.state, this.stats);
	  }

	  /** Start the deletion process */
	  async run(isJob = false) {
	    if (this.state.running && !isJob) return log.error('Already running!');

	    this._userStopped = false;
	    this._runFinished = false;
	    this.state.running = true;
	    this.stats.startTime = new Date();

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
	        this.state.emptyPageRetryCount = 0;

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

	        if (this.isComplete()) {
	          this.logSummary(this.completionMessage());
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          this.state.running = false;
	        }
	      }
	      else {
	        const pastResults = this.state.grandTotal > 0 && this.state.offset >= this.state.grandTotal;

	        if (this.isComplete() || pastResults) {
	          this.logSummary(this.state.grandTotal === 0 ? END_MSG.NO_MATCHES : END_MSG.EMPTY_END);
	          console.log(PREFIX$1, '[End state]', this.state);
	          if (isJob) break;
	          this.state.running = false;
	        } else if (this.state.emptyPageRetryCount < this.options.emptyPageRetries) {
	          this.state.emptyPageRetryCount++;
	          log.warn(`Empty page from Discord — retrying (${this.state.emptyPageRetryCount}/${this.options.emptyPageRetries})…`);
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
	    if (!this._runFinished) log.warn('Stop requested — finishing current request…');
	  }

	  /** Calculate the estimated time remaining based on the current stats */
	  calcEtr() {
	    this.stats.etr = (this.options.searchDelay * Math.round(this.state.grandTotal / 25)) + ((this.options.deleteDelay + this.stats.avgPing) * this.state.grandTotal);
	  }

	  /** As for confirmation in the beggining process */
	  async confirm() {
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
	    let API_SEARCH_URL;
	    if (this.options.guildId === '@me') API_SEARCH_URL = `https://discord.com/api/v9/channels/${this.options.channelId}/messages/`; // DMs
	    else API_SEARCH_URL = `https://discord.com/api/v9/guilds/${this.options.guildId}/messages/`; // Server

	    let resp;
	    try {
	      this.beforeRequest();
	      resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
	        ['author_id', this.options.authorId || undefined],
	        ['channel_id', (this.options.guildId !== '@me' ? this.options.channelId : undefined) || undefined],
	        ['min_id', this.options.minId ? toSnowflake(this.options.minId) : undefined],
	        ['max_id', this.options.maxId ? toSnowflake(this.options.maxId) : undefined],
	        ['sort_by', 'timestamp'],
	        ['sort_order', 'desc'],
	        ['offset', this.state.offset],
	        ['has', this.options.hasLink ? 'link' : undefined],
	        ['has', this.options.hasFile ? 'file' : undefined],
	        ['content', this.options.content || undefined],
	        ['include_nsfw', this.options.includeNsfw ? true : undefined],
	      ]), {
	        headers: {
	          'Authorization': this.options.authToken,
	        }
	      });
	      this.afterRequest();
	    } catch (err) {
	      this.state.running = false;
	      log.error('Search request threw an error:', err);
	      throw err;
	    }

	    // not indexed yet
	    if (resp.status === 202) {
	      let w = (await resp.json()).retry_after * 1000;
	      w = w || this.stats.searchDelay; // Fix retry_after 0
	      this.stats.throttledCount++;
	      this.stats.throttledTotalTime += w;
	      log.warn(`This channel isn't indexed yet. Waiting ${w}ms for discord to index it...`);
	      if (!await this.interruptibleWait(w)) return;
	      if (!this.state.running) return;
	      return await this.search();
	    }

	    if (!resp.ok) {
	      // searching messages too fast
	      if (resp.status === 429) {
	        let w = (await resp.json()).retry_after * 1000;
	        w = w || this.stats.searchDelay; // Fix retry_after 0

	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.stats.searchDelay += w; // increase delay
	        w = this.stats.searchDelay;
	        log.warn(`Being rate limited by the API for ${w}ms! Increasing search delay...`);
	        this.printStats();
	        log.verb(`Cooling down for ${w * 2}ms before retrying...`);

	        if (!await this.interruptibleWait(w * 2)) return;
	        if (!this.state.running) return;
	        return await this.search();
	      }
	      else {
	        this.state.running = false;
	        log.error(`Error searching messages, API responded with status ${resp.status}!\n`, await resp.json());
	        throw resp;
	      }
	    }
	    const data = await resp.json();
	    this.state._seachResponse = data;
	    console.log(PREFIX$1, 'search', data);
	    return data;
	  }

	  async filterResponse() {
	    const data = this.state._seachResponse;

	    // the search total will decrease as we delete stuff
	    const total = data.total_results;
	    if (total > this.state.grandTotal) this.state.grandTotal = total;

	    // search returns messages near the the actual message, only get the messages we searched for.
	    const discoveredMessages = data.messages
	      .map(convo => convo.find(message => message?.hit === true))
	      .filter(Boolean);

	    // we can only delete some types of messages, system messages are not deletable.
	    let messagesToDelete = discoveredMessages.filter(msg => msg.type === 0 || (msg.type >= 6 && msg.type <= 21));
	    messagesToDelete = messagesToDelete.filter(msg => msg.pinned ? this.options.includePinned : true);

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

	      // Delete a single message (with retry)
	      let attempt = 0;
	      while (attempt < this.options.maxAttempt) {
	        const result = await this.deleteMessage(message);

	        if (result === 'RETRY') {
	          attempt++;
	          log.verb(`Retrying in ${this.options.deleteDelay}ms... (${attempt}/${this.options.maxAttempt})`);
	          if (!await this.interruptibleWait(this.options.deleteDelay)) return;
	        }
	        else break;
	      }

	      if (!this.state.running) return;

	      this.calcEtr();
	      if (this.onProgress) this.onProgress(this.state, this.stats);

	      if (!await this.interruptibleWait(this.options.deleteDelay)) return;
	    }
	  }

	  async deleteMessage(message) {
	    const API_DELETE_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
	    let resp;
	    try {
	      this.beforeRequest();
	      resp = await fetch(API_DELETE_URL, {
	        method: 'DELETE',
	        headers: {
	          'Authorization': this.options.authToken,
	        },
	      });
	      this.afterRequest();
	    } catch (err) {
	      // no response error (e.g. network error)
	      log.error('Delete request throwed an error:', err);
	      log.verb('Related object:', redact(JSON.stringify(message)));
	      this.state.failCount++;
	      return 'FAILED';
	    }

	    if (!resp.ok) {
	      if (resp.status === 429) {
	        // deleting messages too fast
	        const w = (await resp.json()).retry_after * 1000;
	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.options.deleteDelay = w; // increase delay
	        log.warn(`Being rate limited by the API for ${w}ms! Adjusted delete delay to ${this.options.deleteDelay}ms.`);
	        this.printStats();
	        log.verb(`Cooling down for ${w * 2}ms before retrying...`);
	        if (!await this.interruptibleWait(w * 2)) return 'FAILED';
	        return 'RETRY';
	      } else {
	        const body = await resp.text();

	        try {
	          const r = JSON.parse(body);

	          if (resp.status === 400 && r.code === 50083) {
	            // 400 can happen if the thread is archived (code=50083)
	            // in this case we need to "skip" this message from the next search
	            // otherwise it will come up again in the next page (and fail to delete again)
	            log.warn('Error deleting message (Thread is archived). Will increment offset so we don\'t search this in the next page...');
	            this.state.offset++;
	            this.state.failCount++;
	            return 'FAIL_SKIP'; // Failed but we will skip it next time
	          }

	          log.error(`Error deleting message, API responded with status ${resp.status}!`, r);
	          log.verb('Related object:', redact(JSON.stringify(message)));
	          this.state.failCount++;
	          return 'FAILED';
	        } catch (e) {
	          log.error(`Fail to parse JSON. API responded with status ${resp.status}!`, body);
	        }
	      }
	    }

	    this.state.delCount++;
	    return 'OK';
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
	      `Delete delay: ${this.options.deleteDelay}ms, Search delay: ${this.options.searchDelay}ms`,
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

	function getToken() {
	  window.dispatchEvent(new Event('beforeunload'));
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  try {
	    return JSON.parse(LS.token);
	  } catch {
	    log.info('Could not automatically detect Authorization Token in local storage!');
	    log.info('Attempting to grab token using webpack');
	    return (window.webpackChunkdiscord_app.push([[''], {}, e => { window.m = []; for (let c in e.c) window.m.push(e.c[c]); }]), window.m).find(m => m?.exports?.default?.getToken !== void 0).exports.default.getToken();
	  }
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

	function fillToken() {
	  try {
	    return getToken();
	  } catch (err) {
	    log.verb(err);
	    log.error('Could not automatically detect Authorization Token!');
	    log.info(`Please make sure ${TOOL_NAME} is up to date`);
	    log.debug('Alternatively, you can try entering a Token manually in the "Advanced Settings" section.');
	  }
	  return '';
	}

	const PREFIX = '[UNDISCORD]';

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
	    return r.width > 0 && r.height > 0;
	  };

	  function findToolbar() {
	    const root = document.querySelector('#app-mount');
	    if (!root) return null;

	    // Discord renames hashed classes often (#779, #793, #750, PR #762)
	    const selectors = [
	      '[class*="upperContainer"] [class*="toolbar"]',
	      '[class*="upperContainer"] [class^="toolbar_"]',
	      '[class*="chat"] [class*="toolbar"]',
	      '[class*="toolbar__"]',
	      '[class^="toolbar_"]',
	      '[class*="-toolbar"]',
	      '[class^="toolbar"]',
	    ];
	    for (const sel of selectors) {
	      const el = root.querySelector(sel);
	      if (el) {
	        const r = el.getBoundingClientRect();
	        if (r.width > 0 && r.height > 0) return el;
	      }
	    }

	    const candidates = root.querySelectorAll('[class*="toolbar"], [class^="toolbar_"], [class*="-toolbar"]');
	    for (let i = candidates.length - 1; i >= 0; i--) {
	      const r = candidates[i].getBoundingClientRect();
	      if (r.width > 0 && r.height > 0) return candidates[i];
	    }
	    return candidates[candidates.length - 1] || null;
	  }

	  function mountFloatingBtn() {
	    ui.undiscordBtn.classList.add('undiscord-floating');
	    if (!document.body.contains(ui.undiscordBtn)) document.body.appendChild(ui.undiscordBtn);
	    return true;
	  }

	  function mountBtn() {
	    const toolbar = findToolbar();
	    if (toolbar) {
	      ui.undiscordBtn.classList.remove('undiscord-floating');
	      if (!toolbar.contains(ui.undiscordBtn)) toolbar.appendChild(ui.undiscordBtn);
	      if (isUndiscordBtnVisible()) return true;
	    }
	    return mountFloatingBtn();
	  }

	  mountBtn();
	  let mountTries = 0;
	  const mountRetryTimer = setInterval(() => {
	    mountBtn();
	    if (isUndiscordBtnVisible() || ++mountTries >= 24) clearInterval(mountRetryTimer);
	  }, 2500);

	  // watch for changes and re-mount button if necessary
	  const discordElm = document.querySelector('#app-mount');
	  let observerThrottle = null;
	  const observer = new MutationObserver((_mutationsList, _observer) => {
	    if (observerThrottle) return;
	    observerThrottle = setTimeout(() => {
	      observerThrottle = null;
	      if (!isUndiscordBtnVisible()) mountBtn();
	    }, 800);
	  });
	  if (discordElm) observer.observe(discordElm, { attributes: false, childList: true, subtree: true });

	  function toggleWindow() {
	    // Class-based hide — inline display:none loses to themeCss `display:flex !important`
	    const hidden = ui.undiscordWindow.classList.toggle('undiscord-hidden');
	    ui.undiscordBtn.style.color = hidden
	      ? 'var(--interactive-normal)'
	      : 'var(--interactive-active)';
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
	  $('#toggleSidebar').onclick = ()=> ui.undiscordWindow.classList.toggle('hide-sidebar');
	  $('button#start').onclick = startAction;
	  $('button#stop').onclick = stopAction;
	  $('button#clear').onclick = () => ui.logArea.innerHTML = '';
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
	  $('button#getToken').onclick = () => $('input#token').value = fillToken();

	  $('input#verboseLog').onchange = () => onLogOptionChange('verbose');
	  $('input#logDeletions').onchange = () => onLogOptionChange('deletions');

	  // sync delays
	  $('input#searchDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.searchDelay = v;
	  };
	  $('input#deleteDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.deleteDelay = v;
	  };

	  $('input#searchDelay').addEventListener('input', (event) => {
	    $('div#searchDelayValue').textContent = event.target.value + 'ms';
	  });
	  $('input#deleteDelay').addEventListener('input', (event) => {
	    $('div#deleteDelayValue').textContent = event.target.value + 'ms';
	  });

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
	    ui.percent.innerHTML = `${percent} (${value}/${max}) Elapsed: ${elapsed} Remaining: ${remaining}`;

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

	    // update delays
	    const searchDelayInput = $('input#searchDelay');
	    searchDelayInput.value = undiscordCore.options.searchDelay;
	    $('div#searchDelayValue').textContent = undiscordCore.options.searchDelay+'ms';

	    const deleteDelayInput = $('input#deleteDelay');
	    deleteDelayInput.value = undiscordCore.options.deleteDelay;
	    $('div#deleteDelayValue').textContent = undiscordCore.options.deleteDelay+'ms';
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
	  const channelIds = $('input#channelId').value.trim().split(/\s*,\s*/);
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
	  const searchDelay = parseInt($('input#searchDelay').value.trim());
	  const deleteDelay = parseInt($('input#deleteDelay').value.trim());
	  const emptyPageRetries = parseInt($('input#emptyPageRetries').value.trim(), 10);
	  syncLogOptionsFromUI();

	  // token
	  const authToken = $('input#token').value.trim() || fillToken();
	  if (!authToken) return; // get token already logs an error.

	  // validate input
	  if (!guildId) return log.error('You must fill the "Server ID" field!');

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
	    // maxAttempt: 2,
	  };
	  if (channelIds.length > 1) {
	    const jobs = channelIds.map(ch => ({
	      guildId: guildId,
	      channelId: ch,
	    }));

	    try {
	      await undiscordCore.runBatch(jobs);
	    } catch (err) {
	      log.error('CoreException', err);
	      undiscordCore.state.running = false;
	      undiscordCore.completeRun();
    }
	  }
	  // single channel
	  else {
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
