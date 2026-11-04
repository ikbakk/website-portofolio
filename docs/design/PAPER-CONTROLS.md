# Paper controls

A shared `PaperControl.astro` component owns homepage action/link markup. `paper-controls.css` owns the shape, material and interaction states; themes supply pigments through CSS variables. It is used by elemental selectors, sidebar navigation, social/resume links and the GitHub action. Passive Playground interest labels reuse the material tokens without being presented as working game controls.

## Material

Asymmetric paper corners, a fine inset rim, a small stepped fold, and a solid lower edge give controls a tactile paper appearance. The material uses green/ivory for Meadow, blue/white for Blizzard, and violet/dark paper for Storm. Instant state feedback uses no animation timeline or new runtime dependency.

| State | Behavior |
| --- | --- |
| Rest | Paper face with inset rim and 3 px lower edge |
| Hover | Theme-specific face/border color and stronger shadow; applies to hover-capable pointers |
| Pressed | Face darkens and moves down 2 px; lower edge compresses to 1 px |
| Selected | Inset accent border and tinted paper, driven by `aria-pressed`, `aria-current`, or `selected` |
| Keyboard focus | 2 px theme focus outline, offset 5 px, independent of selection |
| Disabled | Flat muted paper; native disabled button, or inert anchor with no href and tabindex -1 |

Variants: `primary`, `secondary` (default), `icon`, `nav`. Use real anchors for destinations and buttons for actions. Pass `disabled` rather than only changing opacity. Preserve accessible names for icon-only controls. Navigation click selection updates `aria-current="location"`; theme selection retains its native pressed state.

Example usage:

```astro
<PaperControl variant="primary" href="/projects/sungkar-group/">View project</PaperControl>
<PaperControl variant="icon" aria-label="Switch to Cryo" aria-pressed="false">…</PaperControl>
<PaperControl disabled>Unavailable</PaperControl>
```

Measured primary-label contrast for rest / hover / pressed:

| Theme | Rest | Hover | Pressed |
| --- | --- | --- | --- |
| Meadow | 5.44:1 | 6.85:1 | 9.04:1 |
| Blizzard | 5.81:1 | 7.32:1 | 10.00:1 |
| Storm | 6.14:1 | 7.89:1 | 5.11:1 |

These checks cover the primary text pairs, not a full accessibility audit. Forced-colors rules preserve borders, selected/focus indicators and disabled text.

[Three-theme state review](verification/p2/paper-control-states.jpg) · [Homepage application](verification/p2/paper-controls-cryo.jpg)
