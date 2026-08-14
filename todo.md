# Todo — Personalized Learning Path

- [x] Define quiz-performance buckets and category-level recommendation rules.
- [x] Extend persisted learning state with quiz attempt history and recommendation metadata.
- [x] Build a recommendation helper that prioritizes weak topics, then unfinished prerequisite topics, then the next exploration topic.
- [x] Add a personalized learning-path panel to the Progress dashboard.
- [x] Add clear empty-state copy before the user has completed any quiz.
- [x] Verify quiz submission, localStorage persistence, dashboard rendering, responsive layout, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Goal-based Learning Profile

- [x] Define learning-goal profiles, labels, descriptions, and category priorities.
- [x] Persist the selected profile in localStorage and expose profile actions through learning state.
- [x] Add a profile selector to the Progress dashboard with a clear active state.
- [x] Update recommendation ranking and copy using profile priorities plus quiz performance.
- [x] Verify profile switching, persistence, recommendation changes, responsive layout, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Goal Profile Progress Indicator

- [x] Define the profile progress formula using relevant completion and quiz performance.
- [x] Implement profile-progress calculation and milestone copy.
- [x] Add the visual progress bar and metric breakdown to the Progress dashboard.
- [x] Verify profile changes, zero-state behavior, responsive layout, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Content Audit and Enrichment

- [x] Audit all 33 materials for brevity, jargon, missing context, and weak analogies.
- [x] Expand each material with a clear explanation, short relatable story, practical example, and recap.
- [x] Keep category, difficulty, duration, quiz, and learning-path compatibility intact.
- [x] Add article sections and visual treatment needed for longer, more readable lessons.
- [x] Verify representative lessons across all four categories, mobile readability, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Technical Lesson Diagrams

- [x] Define accurate, beginner-friendly Transformer and RAG visual flows.
- [x] Create deterministic diagram source files and rendered web assets.
- [x] Upload diagram assets outside the project and reference stable web URLs.
- [x] Add diagram metadata, captions, and explanatory callouts to relevant lessons.
- [x] Verify desktop/mobile rendering, accessibility text, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Diagram Fullscreen Viewer

- [x] Define modal behavior, zoom controls, close actions, and focus expectations.
- [x] Implement fullscreen diagram viewer for Transformer and RAG assets.
- [x] Add Escape and backdrop-close behavior with accessible labels.
- [x] Verify desktop/mobile readability, zoom limits, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Diagram Micro-Quizzes

- [x] Define one short visual-comprehension quiz for Transformer and RAG diagrams.
- [x] Add diagram quiz attempts to persisted quiz history without breaking existing lesson scores.
- [x] Render the micro-quiz immediately below each matching diagram with direct feedback.
- [x] Verify retry behavior, score updates, responsive layout, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Neural Network and Embedding Micro-Quizzes

- [x] Define beginner-friendly Neural Network and Embedding visual flows.
- [x] Create and upload deterministic diagram assets.
- [x] Attach diagram metadata and one visual quiz to materials 6 and 23.
- [x] Verify feedback, retry, persistence, responsive layout, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Function Calling and AI Agent Diagrams

- [x] Define beginner-friendly Function Calling and AI Agent visual flows.
- [x] Create and upload deterministic diagram assets.
- [x] Attach diagram metadata and one visual quiz to materials 28 and 29.
- [x] Verify fullscreen, zoom, feedback, retry, persistence, responsive layout, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Learning Experience Upgrade Pass

- [x] Audit existing learning surfaces and choose high-value, frontend-only improvements.
- [x] Add persisted bookmarks and bookmark actions to cards and lesson pages.
- [x] Add a review mode that prioritizes weak quiz results, bookmarked lessons, and unfinished materials.
- [x] Add a searchable glossary with beginner-friendly AI terms and quick links to related lessons.
- [x] Add better discovery through continue-learning, next-step, and filter states.
- [x] Surface review, bookmark, and glossary metrics on Progress without cluttering the dashboard.
- [x] Verify localStorage persistence, empty states, keyboard access, responsive layout, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Flashcards and Global Search

- [x] Define flashcard sources from glossary terms and incorrect quiz answers.
- [x] Persist flashcard review state and support known/needs-review actions.
- [x] Build a dedicated flashcard page with flip, next, shuffle, and reset controls.
- [x] Add global navigation search for materials, quiz topics, and glossary terms.
- [x] Add keyboard shortcuts and accessible empty states for both features.
- [x] Verify persistence, responsive layout, search routing, and production build.
- [x] Save a new delivery checkpoint and report the update.

## Full-Stack File Storage Integration

- [x] Read the full-stack project guide and define the supported file workflow.
- [x] Upgrade the static project to full-stack with backend, database, auth, and storage scaffolding.
- [x] Model stored-file metadata and ownership without exposing private file access.
- [x] Add upload, list, preview/download, and delete flows with validation and clear error states.
- [x] Connect storage to a useful learning use case, such as personal study notes and reference files.
- [x] Verify authenticated access, file-size/type handling, responsive UI, TypeScript, and production build.
- [x] Save a new delivery checkpoint and report required follow-up configuration.

## Duplicate Sparkle Key Fix

- [x] Replace timestamp-only sparkle identifiers with collision-resistant IDs.
- [x] Verify repeated clicks no longer emit duplicate-key warnings.
- [x] Run TypeScript checks, tests, and production build.
- [x] Save a new checkpoint and report the fix.

## Learning Tools End-to-End Verification

- [x] Verify global search opens by keyboard, returns material/quiz/glossary results, and routes correctly.
- [x] Verify flashcard known/needs-review state persists across page reload.

## Learning Tools Browser Follow-up

- [x] Verify global search opens with the `/` keyboard shortcut.
- [x] Verify the flashcard “Perlu diulang” action persists after page reload.

## Direct Needs-Review Persistence

- [x] Persist a direct needs-review queue when users select “Perlu diulang”.
- [x] Prioritize queued cards in Flashcard Lab and retain the queue after reload.
- [x] Verify the direct action end-to-end, then run tests, TypeScript, and production build.

## Storage Quota Profile Indicator

- [x] Define a transparent per-user storage quota and usage calculation from stored-file metadata.
- [x] Add a protected backend quota summary procedure with tests.
- [x] Build an authenticated Profile page with usage, remaining space, file count, and visual progress bar.
- [x] Add a Profile navigation entry and graceful authentication/loading/error states.
- [x] Keep the quota summary fresh after uploads and file removals.
- [x] Add a dedicated Profile authentication-error state so service failures are not shown as a login gate.
- [x] Verify responsive layout, TypeScript, tests, and production build.
- [x] Browser-test quota refresh after upload and deletion; intentionally deferred at the user's request, with protected quota/cache regression coverage retained.
- [x] Save a new delivery checkpoint and report the update.

## Canvas Atmosphere Across Pages

- [x] Audit page families and choose readable, non-interactive canvas motifs for each visual context.
- [x] Build an accessible, low-motion global canvas decoration component with responsive sizing.
- [x] Integrate varied canvas scenes into home, catalogue, lesson, learning-tool, file, profile, and informational pages.
- [x] Respect reduced-motion preferences and prevent canvas layers from blocking interaction or focus.
- [x] Verify desktop/mobile visuals, TypeScript, tests, and production build.
- [x] Save a delivery checkpoint and report the visual update.

## NPC Pet Gamification System

- [x] Define four distinct pet identities, a shared evolution curve, XP thresholds, and a clear reward language for learning actions.
- [x] Create real AI-generated five-stage game assets for cat, dog, and unicorn pets, plus a usable temporary robot reference asset.
- [x] Replace the temporary robot fallback with a complete five-stage AI-generated robot evolution set when image-generation quota is available.
- [x] Upload pet assets as durable web assets and document their visual usage.
- [x] Extend persisted learning state with active pet, XP, derived stage, earned milestones, and a popup preference that defaults to off.
- [x] Persist NPC Pet milestone unlock history and surface it in the evolution guide.
- [x] Award pet XP for meaningful learning actions such as completing lessons and answering quizzes correctly without disrupting existing progress logic.
- [x] Build a dedicated NPC Pet collection page with selection, evolution display, XP meter, stage guide, and activity rewards.
- [x] Add an opt-in, dismissible pet popup that can appear consistently on learning pages without blocking content.
- [x] Add global navigation access and responsive Paper Playground styling for the NPC system.
- [x] Add automated coverage for evolution rules, then verify desktop/mobile UI, TypeScript, tests, and production build.
- [x] Save a delivery checkpoint and report the NPC Pet system.

## NPC Pet Care, Daily Quest, and Evolution Upgrade

- [x] Define food inventory rules, three daily feeding uses, play actions, special quests, and rewards in clear Indonesian UI copy.
- [x] Make pet evolution five to fifteen times more challenging with transparent higher XP thresholds.
- [x] Persist daily reset state, food inventory, feeding count, play interactions, quest progress, and claimed quest rewards.
- [x] Add daily quests that earn food through meaningful learning missions, then allow food to grant 5 XP per use.
- [x] Build an interactive NPC care area with feed and play controls, inventory status, action feedback, and daily limits.
- [x] Build a daily quest board with progress, reward claims, and routing to relevant learning actions.
- [x] Add level-up and evolution celebration animation with non-blocking particle effects and reduced-motion support.
- [x] Remove the Byte temporary-asset note from the visible NPC page while retaining the internal follow-up record.
- [x] Add automated coverage for food limits, reset rules, quest claims, and tougher evolution thresholds.
- [x] Verify desktop/mobile interactions, TypeScript, tests, and production build.
- [x] Save a delivery checkpoint and report the NPC interaction update.

## NPC Social Leaderboard, Shop, and Audio

- [x] Define a privacy-first public pet profile, leaderboard ranking, opt-in sharing control, and abuse-safe display rules.
- [x] Add database schema, migration, server helpers, and protected procedures for public pet profiles and leaderboard records.
- [x] Build an authenticated leaderboard that ranks users by pet evolution and XP without fabricating user entries.
- [x] Add a quest-coin shop catalogue for foods and cosmetic accessories, with inventory ownership and safe purchase validation.
- [x] Display owned accessories on the active pet and allow players to equip or remove them.
- [x] Synchronize existing quest-coin and food inventory actions with the new shop experience without losing persisted local progress.
- [x] Add opt-in audio controls, interactive feed/play sound effects, and an evolution music cue with graceful browser fallbacks.
- [x] Add automated coverage for public-profile privacy, rankings, shop validation, inventory, and audio-preference behavior.
- [x] Add router-level regression coverage proving non-public profiles are excluded and public profiles rank by XP then update time.
- [x] Add a mixed-record petSocial.leaderboard router-contract test proving hidden profiles are absent and ranking order is preserved.
- [x] Confirm desktop/mobile interfaces, shop purchases, sound controls, TypeScript, tests, and production build.
- [x] Verify authenticated sharing flow in browser; intentionally deferred at the user's request, with privacy and ranking regression coverage retained.
- [x] Save a delivery checkpoint and report the social NPC Pet update.

## NPC Pet Bonus-Coin Mini-Game

- [x] Define a quick pet-play mini-game, reward tiers, and a daily bonus-coin cap that complements rather than replaces quests.
- [x] Persist daily mini-game attempts, best result, claimed bonus coins, and reset behavior in the NPC state.
- [x] Build an accessible interactive mini-game surface on the NPC page with clear instructions, feedback, and replay controls.
- [x] Add an explicit practice replay control that does not grant additional daily coins after the reward-cap round is complete.
- [x] Award snack coins only for valid completed rounds and surface the reward in the pet inventory.
- [x] Add automated coverage for scoring, reward cap, repeat-round prevention, and next-day reset behavior.
- [x] Verify desktop/mobile play, reward persistence, TypeScript, tests, and production build.
- [x] Browser-test Snack Sprint reward persistence after a reload and record the result.
- [x] Save a delivery checkpoint and report the mini-game update.

## Course Expansion Beyond AI Engineering

- [x] Audit the current catalogue to identify complementary capability gaps beyond AI Engineering.
- [x] Recommend prioritized course tracks with outcomes, explicit prerequisites, and appropriate difficulty progression.
- [x] Add clear prerequisite and prerequisite-free labels for every proposed course track in the recommendation document.
- [x] Confirm the selected infrastructure curriculum direction before writing the six Hermes, 9Router, and AWS lessons.

## Draggable NPC, Infrastructure Course, and PRD Maker

- [x] Redesign the optional NPC popup as an art-only companion with no background, label, or speech panel.
- [x] Persist a draggable companion position across routes, constrain it to the viewport, and add safe idle animations with reduced-motion support.
- [x] Research and write sourced Hermes Agent setup lessons for VPS, local development, WhatsApp, and Telegram, including original screenshots or diagrams where permitted.
- [x] Research and write sourced 9Router setup and Hermes integration lessons, including the official repository link and safe configuration guidance.
- [x] Research and write an AWS cloud-architecture lesson using authoritative source images or original diagrams with clear attribution.
- [x] Define a secure PRD Maker provider-configuration flow that accepts a user-controlled base URL and API key without exposing credentials in client storage or logs.
- [x] Implement PRD Maker generation, model discovery, step-by-step guidance, starter templates, and downloadable project-document output.
- [x] Include example generated files for architecture.md, prd.md, rules.md, design.md, security/qc.md, todo.md, workflow.md, and personality.mdd.
- [x] Add automated tests for drag persistence, PRD template assembly, validation, and provider-request safety.
- [x] Verify content citations, credentials handling, desktop/mobile flows, TypeScript, tests, and production build.
- [x] Save a delivery checkpoint and report the course and PRD Maker update.

## Catalogue Count Accuracy Follow-up

- [x] Update the home-page material count so it reflects the expanded 39-lesson catalogue rather than the pre-expansion total.
- [x] Replace stale literal catalogue totals on the catalogue and progress pages with the live material count.
- [x] Re-run TypeScript, tests, and production build; then save a follow-up checkpoint.

## Username and Password Authentication

- [x] Audit the existing OAuth session, user table, protected procedures, and protected-page entry points for compatibility with local credentials.
- [x] Add secure credential fields and session persistence without storing plaintext passwords or exposing password hashes.
- [x] Create guarded registration and sign-in procedures with duplicate-account handling, password verification, and rate-limit-friendly errors.
- [x] Build responsive Paper Playground sign-up and sign-in screens, then route private-feature login prompts to those screens.
- [x] Preserve authenticated ownership for Study Files, storage quota, and public-pet sharing under local credential sessions.
- [x] Add regression tests for credential validation, duplicate accounts, password verification, session creation, and logout.
- [x] Verify desktop/mobile account flows, TypeScript, tests, and production build before saving the credential-authentication release.

## Login Convenience Controls

- [x] Add a Remember Me choice that controls a clearly bounded local credential-session duration.
- [x] Add an accessible show-or-hide password control without changing the entered password value.
- [x] Add regression coverage for session-duration choice and password-visibility behavior, then verify responsive sign-in UI, TypeScript, tests, and production build.
