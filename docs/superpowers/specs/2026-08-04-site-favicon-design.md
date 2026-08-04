# Site Favicon Design

## Goal

Give every static entry page an identifiable browser icon that matches the existing Applied AI Mastery header mark.

## Visual Design

The favicon is a square SVG with a rounded dark-teal tile, a lighter teal inset, and a centered white `AI` monogram. It uses the professional track brand colors so it remains recognizable on the course-selection, professional, personal, and document pages.

## Integration

`site/assets/favicon.svg` is the single reusable asset. Each top-level HTML page references it with `rel="icon"`, alongside its existing stylesheet and metadata.

## Verification

A lightweight repository check confirms the asset exists, contains SVG markup, and every static HTML entry point references the same favicon path. Browser verification confirms the page continues to load without console or layout regressions.
