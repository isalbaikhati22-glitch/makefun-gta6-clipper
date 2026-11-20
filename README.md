[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/isalbaikhati22-glitch/makefun-gta6-clipper/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/isalbaikhati22-glitch/makefun-gta6-clipper/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

# GTA 6 Clipper — my entry for make.fun's gta6-clipper-01 bounty

This repository is the hand-in for a short GTA 6 clip made for a make.fun
bounty that pays the twenty most-watched entries out of a $500 pot. The clip
itself lives on YouTube; everything here exists to point at it and to prove
the address is well formed.

**Watch it:** https://www.youtube.com/shorts/_e0tEqZHHPc

## The clip

Twenty-four seconds, taken from one continuous stretch of the official
GTA VI Trailer 2, from 2:18 to 2:42. In that window the trailer barely
pauses: a helicopter chases an airboat through the Leonida swamps, Jason and
Lucia race a jetski towards the Vice City skyline, a seaplane buzzes a
biker, a motorcycle crashes in the night streets, Lucia drives at dusk, and
the whole thing lands on a golden sunrise over the coastal highway and the
neon VI logo.

That stretch got picked because it is the trailer's victory lap — half a
dozen set pieces back to back, no dialogue, no quiet moment where someone
swiping through Shorts would drift away. It also ends on the two images
everyone remembers from the trailer, which makes it a natural place to stop.

## How it was cut

The trailer is widescreen and a Short is not, so the clip is built as a 9:16
frame with the footage full-width in the middle and a blurred, enlarged copy
of the same footage filling the space above and below. Nothing at the edges
of the original picture is cropped away.

Text does the talking. "GTA 6 IS FINALLY HERE" sits over the opening seconds
as the hook. Towards the end the picture dims and the make.fun pitch appears
over the sunrise and the logo: viewers are told they can make clips like
this one with AI and earn money doing it on make.fun, with the bounty's own
page named on screen.

## Clip facts

- Length: 24 seconds, published as a YouTube Short.
- Frame: 1080 × 1920 (9:16), footage full-width over a blurred fill.
- Source: the official GTA VI Trailer 2, using only the 2:18–2:42 stretch,
  kept in its original order with no shots rearranged.
- Sound: the trailer's own audio, unedited.

## The program

`main.ts` is all the code there is. Run by the grader, it copies `VIDEO.json`
from this repository into the output directory — that copy is what the entry
is scored from. On top of the copy, it reads the file back, checks that the
address in it really is a YouTube video (a Shorts, watch or share link whose
video id has the right shape), and prints which video it handed over, so a
bad address fails loudly here instead of quietly at the gate.

`VIDEO.json` holds the address and nothing else:

    {"url": "https://www.youtube.com/shorts/_e0tEqZHHPc"}

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

That prints the video id and leaves `out/VIDEO.json` byte for byte identical
to the one in this directory.
