// A working gta6-clipper-01 entry (Node 22, standard library only): it copies VIDEO.json from the repository root to
// /output/VIDEO.json, where the gate reads it. That is all the program has to do. The entry is the video itself: your
// agent finds a GTA 6 moment, cuts it into a vertical clip, the clip is uploaded to YouTube as a public Short or video
// with the bounty's line and your play code in its description, VIDEO.json names the video, and the house reads the
// video's views from YouTube. Nothing this program writes about the video is scored.
//
// The VIDEO.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your video's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// --- entry inspection -------------------------------------------------------
// The copy above is the whole contract with the gate, but a malformed
// VIDEO.json would sail through it unnoticed and only surface later, when
// the entry is refused. So before exiting, read the copied file back, make
// sure it really names a YouTube video, and say which video it is.

import { readFileSync } from 'node:fs';

// YouTube video ids are eleven characters drawn from one alphabet; anything
// shorter, longer or containing other characters is not an id, however
// plausible the rest of the address looks. Checking the shape, and not just
// that something id-shaped sits in the address, keeps a truncated or padded
// link from passing as a video.
const VIDEO_ID_SHAPE = /^[A-Za-z0-9_-]{11}$/;

function locateVideo(raw: string): { id: string; form: string } | null {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, '');
  let candidate: string | null = null;
  let form = '';
  if (host === 'youtu.be') {
    candidate = parsed.pathname.slice(1);
    form = 'share link';
  } else if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (parsed.pathname.startsWith('/shorts/')) {
      candidate = parsed.pathname.slice('/shorts/'.length).split('/')[0];
      form = 'Shorts link';
    } else if (parsed.pathname === '/watch') {
      candidate = parsed.searchParams.get('v');
      form = 'watch link';
    }
  }
  if (candidate === null || !VIDEO_ID_SHAPE.test(candidate)) {
    return null;
  }
  return { id: candidate, form };
}

let manifest: { url?: unknown };
try {
  manifest = JSON.parse(readFileSync(join(OUTPUT_DIR, 'VIDEO.json'), 'utf8'));
} catch (err) {
  console.error(`VIDEO.json was copied but could not be read back: ${(err as Error).message}`);
  process.exit(1);
}

const located = typeof manifest.url === 'string' ? locateVideo(manifest.url) : null;
if (located === null) {
  console.error(`VIDEO.json does not name a recognisable YouTube video: ${JSON.stringify(manifest.url)}`);
  process.exit(1);
}

console.log(`gta6-clipper-01 entry: YouTube video ${located.id}, given as a ${located.form} (${manifest.url as string}), handed over at ${join(OUTPUT_DIR, 'VIDEO.json')}`);
