---
name: nextjs-travel-portal
description: "Build, modify, debug, and review the Next.js travel portal. Use for pages, destinations, packages, booking flows, navigation, responsive UI, motion, accessibility, and visual verification in this repository."
argument-hint: "Describe the travel-portal page, component, or behavior to change."
user-invocable: true
---

# Next.js Travel Portal

## Purpose

Deliver focused, production-ready changes in this Next.js travel portal while preserving its existing structure, visual language, and user journeys.

## Before Editing

1. Read the repository `AGENTS.md` and any nearby component guidance.
2. For Next.js behavior or APIs, consult the relevant guide under `node_modules/next/dist/docs/` before writing code.
3. Locate the concrete anchor: the named page, component, route, failing behavior, test, or command.
4. Trace one hop to the code that directly decides the behavior. Do not map unrelated parts of the repository.
5. State a falsifiable local hypothesis about the behavior and choose one cheap check that could disconfirm it.
6. Identify the smallest change that tests the hypothesis.

## Implementation Workflow

1. Preserve the existing App Router structure, route conventions, shared UI components, data modules, and public APIs.
2. Keep server and client boundaries explicit. Add `"use client"` only when the component needs browser APIs, state, effects, event handlers, or client-only libraries.
3. Reuse existing primitives and data sources before adding abstractions or dependencies.
4. Keep page sections full-width or unframed where appropriate; reserve cards for repeated items, dialogs, and genuinely framed tools.
5. For visual work, maintain a clear hierarchy, stable dimensions, responsive constraints, accessible contrast, and intentional motion. Respect reduced-motion preferences.
6. Use semantic HTML, keyboard-accessible controls, visible focus states, meaningful labels, useful alternative text, and correct heading order.
7. Avoid unrelated formatting, metadata churn, dependency upgrades, and refactors.

## Validation Loop

After the first substantive edit, immediately run the narrowest available check for the touched behavior:

1. Prefer the focused test or reproduction command.
2. Otherwise run a targeted lint, typecheck, or build check for the affected slice.
3. If the change is visual or interactive, run the app and verify the route at desktop and mobile sizes. Check for overflow, overlap, broken navigation, empty states, loading states, console errors, and nonfunctional controls.
4. For 3D or canvas changes, verify the scene is nonblank, correctly framed, responsive, and still interactive.
5. If validation fails, repair the same slice and rerun the same check before expanding scope.
6. Finish with at least one executable post-edit validation. Report any unavailable checks and the remaining risk.

## Decision Points

- If the starting file only forwards props or registers a component, move to the nearest implementation that computes or mutates the behavior.
- If multiple paths look plausible, choose the one with the clearest falsifiable hypothesis and the smallest testable change.
- If the check supports the hypothesis but reveals a local defect, fix it in place and rerun the check.
- If the check falsifies the hypothesis, take one nearby hop to the controlling code and revise the hypothesis.
- If a visual requirement conflicts with an established design-system convention, preserve the local convention unless the request explicitly changes it.
- If a new dependency is genuinely necessary, prefer a maintained library already compatible with the project and update the package manifest deliberately.

## Completion Criteria

A change is complete when:

- The requested route or behavior works through its real user path.
- Existing navigation, booking, destination, and package flows remain intact.
- The UI is responsive without clipped text, overlap, or unstable layout.
- Interactive elements are keyboard accessible and have appropriate labels and states.
- Reduced-motion behavior and meaningful loading, error, and empty states are handled where relevant.
- The focused executable validation passes, or its limitation is documented clearly.
- The diff contains only the files and behavior needed for the request.
