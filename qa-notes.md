# QA Notes

- 2026-08-13: After replacing timestamp-only sparkle IDs with `crypto.randomUUID()`, rapid click events were dispatched in the active `/files` page to exercise concurrent sparkle batches. Console review follows before checkpointing.
- 2026-08-13: The subsequent console inspection contained only the synthetic-click command and no duplicate React key warning.
- 2026-08-13: In the active Flashcard Lab, marking one glossary card as understood updated the visible totals from 0 to 1 mastered and 16 to 15 pending; the next card loaded immediately.
- 2026-08-13: Reloading Flashcard Lab retained 1 mastered and 15 pending cards. Global search was opened from navigation and a `prompt` query returned material, quiz, and glossary result types.
- 2026-08-13: Selecting the Prompt Engineering material result from global search navigated to `/materi/16` and rendered the expected lesson.
- 2026-08-13: Pressing `/` on a lesson page opened global search, and Escape closed it without changing the route.
- 2026-08-13: In Flashcard Lab, using “Perlu diulang” advanced from Machine Learning to Neural Network while retaining 1 mastered and 15 pending cards.
- 2026-08-13: Reloading Flashcard Lab after “Perlu diulang” retained 1 mastered and 15 pending cards, keeping the reviewed deck active for subsequent review.
- 2026-08-13: Resetting the known card through the needs-review flow returned the deck to 0 mastered and 16 pending; reloading preserved that result.
- 2026-08-13: With direct queue persistence enabled, selecting “Perlu diulang” on AI advanced to Machine Learning while retaining all 16 cards in the review deck.
- 2026-08-13: After reload, AI returned as the first active card, confirming that the direct needs-review queue persisted and was prioritized.
- 2026-08-13: Profile quota page rendered for the authenticated account on desktop, showing account details, a 25 MB storage meter, 0.0 MB used, 25.0 MB remaining, one stored file, Study Files shortcut, and sign-out action.
- 2026-08-13: Initial mobile Profile review found the four account-detail cells and quota explanatory copy too compressed; responsive stacking will be refined before final verification.
- 2026-08-13: Final mobile Profile verification showed full-width readable account details, a legible 25 MB quota meter with usage and remaining-space metrics, stacked Study Files actions, and an accessible sign-out action.
- 2026-08-13: Quota regression coverage confirmed that the protected endpoint reads the current user-owned aggregate on every request, rejects uploads beyond 25 MB before storage, and that Study Files invalidates the quota cache after successful uploads or removals.
- 2026-08-13: Final release verification passed: 4 Vitest files / 12 tests, TypeScript check, and production build.
- 2026-08-13: Browser-level upload-and-delete quota refresh verification was deferred at the user's request before the checkpoint; automated quota, cache-invalidation, and fresh-aggregate coverage remains in place.
