New Component: Video and Subtitles

Purpose

A video player component with subtitles for Russian-speaking users learning English.

The component is implemented from scratch as an isolated part of the project, without modifying existing pages, components, or architecture.

The user:
	•	uploads a video in English (locally, no server)
	•	inputs subtitles in SRT format
	•	plays the video while relying on subtitles

Use the root component VideoRoot (face/_pages/video/VideoRoot). It is already connected and rendered on the page.

The component consists of two parts:
	1.	Top part — video
	2.	Bottom part — subtitles and subtitle controls

⸻

Storage rules
	•	Use IndexedDB to store user-uploaded subtitles, video metadata, and current playback time.
	•	Use a single IndexedDB helper file.
	•	No reusable database layers.

⸻

Video part

Loading and Display

On component mount:
	•	check for previously saved video data
	•	if data exists — display the video
	•	if no data exists — show the upload screen

Video:
	•	is stored locally on the user’s computer
	•	is not uploaded to a server

⸻

Desktop (mouse)

Upload screen:
	•	Title: “Drag the video here”
	•	Subtitle: “Supported formats: MP4, WebM, OGG, MKV”
	•	Button: “Where to get and how to convert to the correct format” (inactive, no logic)

The user uploads a video via drag-and-drop.

⸻

Touch devices

Since drag-and-drop is not available:
	•	Title: “Select a video”
	•	File selection button (file input)
	•	Button: “Where to get and how to convert to the correct format” (inactive)

⸻

Errors

If an unsupported file format is selected:
	•	show an error message: “Unsupported file type”
	•	the error message is displayed immediately after the title

After successful video upload:
	•	the video is displayed in the player

⸻

Playback Controls

Play / Pause
	•	click / tap anywhere on the player
	•	Space key

⸻

Seeking

Gesture-based:
	•	horizontal drag with mouse or finger
	•	left → right — seek forward
	•	right → left — seek backward
	•	seek speed depends on the initial vertical position:
	•	the higher the starting point, the higher the seek speed (from 0.1x to 1x, linear scale)

Keyboard:
	•	← / → : 2-second step
	•	Shift + ← / → : 10-second step

⸻

Seek Visualization
	•	a semi-transparent blue overlay is drawn on top of the video
	•	the overlay:
	•	starts from the left edge
	•	fills the area up to the current playback position
	•	occupies the full height of the player

In the center of the screen:
	•	current time (70px)
	•	total duration (30px)
	•	format: 09:18 / 1:48:32
	•	text color: white

If no seeking occurs for 1 second:
	•	the overlay and text disappear

⸻

Progress Bar
	•	container at the bottom of the player
	•	container height: 10px
	•	visible bar: 5px, blue

On hover:
	•	the bar expands to the full container height
	•	clicking seeks the video to the selected position

⸻

Volume Control

Gesture-based:
	•	vertical drag with mouse or finger

Keyboard:
	•	↑ / ↓ : 2% step
	•	Shift + ↑ / ↓ : 10% step

Gesture conflict resolution:
	•	Horizontal movement has priority over vertical
	•	Vertical volume change applies only if vertical delta > horizontal delta

⸻

Volume Visualization
	•	orange horizontal bar at the bottom of the player
	•	width: 100%
	•	height proportional to volume level
	•	at 100% volume, occupies the full height of the player

In the center of the screen:
	•	text displaying current volume percentage
	•	color: white
	•	text height: 70px

If volume does not change for 1 second:
	•	the overlay and text disappear

⸻

Delete Video Button
	•	the delete button appears on mouse hover over the player
	•	For touch devices: show delete button via long press

On click:
	•	the video is removed
	•	stored data is cleared
	•	the upload screen is shown again

⸻

Subtitles on the Player
	•	if subtitles are not set — display nothing

Display
	•	subtitles are rendered at the bottom of the player on top of the video
	•	displayed as a single continuous horizontal line
	•	dialogue blocks follow one another sequentially
	•	pauses may exist between dialogues
	•	pause is visible if the end time of a previous subtitle is less then start time of the next subtitle.
	•	We should not display pause duration

If a pause exists:
	•	a circle is displayed

⸻

Virtualization / Performance
	•	no more than 20 dialogue blocks may exist in the DOM at the same time
	•	elements that ended more than 10 seconds ago are removed. But we should keep a buffer of elements before the current time for scrollback
	•	new elements are added as playback progresses

⸻

Interaction
	•	the subtitle line can be:
	•	dragged with the mouse
	•	dragged with a finger
	•	during playback, the subtitle line automatically scrolls to the current dialogue. It should be scrolled to the left side with short animation.
	•	clicking a dialogue or pause:
	•	seeks the video to the corresponding time
	•	during manual seeking, the subtitle window must be recalculated immediately

⸻

Styles
	•	subtitle text:
	•	color: white
	•	font size: 22px
	•	line-height: 26px
	•	pause circle:
	•	color: white
	•	opacity: 0.1
	•	radius: 14px
	•	horizontally centered
	•	container:
	•	padding-bottom: 10px
	•	padding-left/right: 20px
	•	no background
	•	current dialogue:
	•	accent background
	•	padding-left/right: 4px
	•	border-radius: 3px

⸻

Pause Timer
	•	if the current position is a pause:
	•	the circle becomes fully opaque
	•	the circle is a circular countdown timer
	•	it shows the remaining time until the next dialogue
	•	after the pause ends:
	•	the circle becomes semi-transparent again
	•	implementation via requestAnimationFrame
	•	no external libraries

⸻

Subtitles part

Subtitles Input

On component mount:
	•	check for saved subtitles
	•	if present — display them
	•	if not — display the input field

Use the TextInput component:
	•	number of rows: 5
	•	label: “Subtitles in SRT format”

⸻

Format hint
1
00:00:01,000 --> 00:00:04,000
First subtitle line

2
00:00:05,000 --> 00:00:08,000
Second subtitle line

Buttons

Below the input field:
	•	left: “Where to get subtitles” (no logic)
	•	right: “Save”

The “Save” button:
	•	is disabled if:
	•	the field is empty
	•	the format is invalid
	•	the error message is shown near the input field

The error message disappears as soon as the format becomes valid.

After successful save:
	•	the input field is hidden
	•	an “Edit” button appears

⸻

Subtitles List
	•	subtitles are displayed as a list of paragraphs
	•	each paragraph:
	•	padding-left/right: 20px
	•	margin-bottom: 10px

If there is a pause between subtitles:
	•	a horizontal line is displayed between paragraphs:
	•	thickness: 2px
	•	color: accent
	•	a circle on the left:
	•	diameter: 10px
	•	color: accent

⸻

Active state
	•	if the current time matches a subtitle paragraph:
	•	paragraph text becomes accent-colored
	•	a vertical line on the left:
	•	width: 3px
	•	color: accent
	•	if the current time is a pause:
	•	the horizontal line becomes accent-colored

⸻

Interaction
	•	each paragraph is clickable
	•	on click:
	•	playback seeks to the corresponding time
	•	hover:
	•	text color becomes blue
	•	cursor: pointer

⸻

Player subtitles and Subtitles List are two independent renderings based on the same parsed SRT data.

⸻

Clipboard rules

If the current playback position falls within a subtitle paragraph:
	•	copy the full sentence or sentences associated with that paragraph to the clipboard

Rules
	1.	Determine the current subtitle block by time
	2.	Split text into sentences
	3.	If a sentence starts in a previous block, include previous blocks until the sentence start
	4.	If a sentence ends in a next block, include next blocks until the sentence end
	5.	Copy ONLY sentences that are fully completed
	6.	If the current subtitle block contains multiple sentences, copy all of them

⸻

NLP
	•	Use compromise.js
	•	Language: English
	•	No dynamic imports
	•	No fallback logic

⸻

SRT parsing rules
	•	Support multiline subtitles
	•	Time format: HH:MM:SS,mmm
	•	Entries are separated by an empty line
	•	On parsing error:
	•	show an error message under the input field
	•	do not save data

⸻

Development rules
	•	Do not improve UX
	•	Do not simplify interactions
	•	Follow this document strictly
	•	If anything is unclear — ask a question first
	•	First propose a plan and file structure, do not write code

⸻

Non-goals
	•	Backend / server-side
	•	Mobile browser optimization
	•	Additional subtitle formats

⸻

Architecture clarification
	•	Business logic MAY be extracted:
	•	fn/
	•	UI components must stay thin