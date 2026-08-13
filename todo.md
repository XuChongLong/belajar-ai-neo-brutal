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
- [ ] Browser-test quota refresh after upload and deletion; deferred at the user's request before this checkpoint.
- [x] Save a new delivery checkpoint and report the update.
