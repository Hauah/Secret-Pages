"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { DESIGN_FRAMES } from "./frameData";
import { POOLS, SCRAPS, STICKER_SIZES, stickerSrc, type StickerKind } from "./stickers";

export type PagePhoto = {
  src: string;
  caption?: string;
  /** Put the photo inside a decorative frame image (e.g. "frame6-tight" from public/frames). */
  frame?: string;
  /** Override the photo width (% of the page) and rotation for this photo. */
  width?: number;
  rot?: number;
};

// Frames: aspect ratio + where the transparent window sits (in % of the frame image).
const FRAMES: Record<string, { ratio: number; win: { x: number; y: number; w: number; h: number } }> = {
  "frame6-tight": { ratio: 335 / 416, win: { x: 6.9, y: 12.5, w: 85.7, h: 68.3 } },
};

// Fully manual sticker (use when you want exact control).
// top/left = % of the page, w/h = px, rot = degrees.
export type PageSticker = {
  src: string;
  top: number;
  left: number;
  w: number;
  h?: number;
  rot?: number;
  z?: number;
};

export type PageConfig = {
  photos: PagePhoto[];
  title?: string;
  /** Sticker ids (from public/stickers) for the decor slots, in order. Missing ones are picked automatically. */
  decor?: string[];
  /** Torn-paper corner pieces: ids like "side1" (top) / "side2" (bottom). Pass {} for none. */
  corners?: { top?: string; bottom?: string };
  /**
   * Two-photo "pair" frame like page 6: id of a 2-window frame from public/elements (e.g. "frame7").
   * The first two photos go inside its windows, close together. Needs photos.length >= 2.
   */
  pairFrame?: string;
  /** Manual stickers: replaces the automatic decor completely. */
  stickers?: PageSticker[];
  /**
   * Decorative multi-photo frame (vinyl, film strip, hearts, binder clips ...). Photos fill its windows in order.
   * id: key of DESIGN_FRAMES (componets/frameData.ts). cx/cy = centre in % of the page, h = height in px, rot = tilt.
   */
  designFrame?: { id: string; cx: number; cy: number; h: number; rot?: number };
};
export type SpreadConfig = { left: PageConfig; right: PageConfig };

// Photo slots for a RIGHT page: [left %, top %, width %, rotation deg].
// Left pages are mirrored so nothing sits on the spiral.
const PHOTO_SLOTS: Record<number, [number, number, number, number][]> = {
  1: [[20, 25, 44, -4]],
  2: [
    [14, 10, 38, -5],
    [46, 48, 38, 4],
  ],
  3: [
    [12, 6, 34, -5],
    [48, 24, 34, 4],
    [16, 54, 34, -3],
  ],
};

// Two-window frames. Windows are measured on the frame image (px): centre, size, tilt (deg).
const PAIR_FRAMES: Record<
  string,
  { w: number; h: number; wins: { cx: number; cy: number; w: number; h: number; rot: number }[] }
> = {
  frame7: {
    w: 375,
    h: 666,
    wins: [
      { cx: 161, cy: 207, w: 203, h: 212, rot: -3.4 }, // top polaroid
      { cx: 211, cy: 420, w: 187, h: 192, rot: 11.2 }, // bottom polaroid (sits on top of the first)
    ],
  },
};

type Slot = { kind: StickerKind; top: number; left: number; w: number; h: number; rot: number };

// Where cute stickers go around the photos (RIGHT page coordinates).
const DECOR_SLOTS: Record<number, Slot[]> = {
  1: [
    { kind: "small", top: 3, left: 11, w: 72, h: 72, rot: -8 },
    { kind: "wide", top: 4, left: 36, w: 104, h: 38, rot: -3 },
    { kind: "tall", top: 28, left: 67, w: 62, h: 92, rot: 6 },
    { kind: "tiny", top: 51, left: 11, w: 34, h: 34, rot: -10 },
    { kind: "big", top: 73, left: 11, w: 100, h: 100, rot: -5 },
    { kind: "big", top: 75, left: 41, w: 88, h: 88, rot: 5 },
    { kind: "small", top: 61, left: 62, w: 62, h: 62, rot: 12 },
  ],
  2: [
    { kind: "small", top: 2, left: 56, w: 74, h: 74, rot: -6 },
    { kind: "tall", top: 22, left: 64, w: 60, h: 88, rot: 6 },
    { kind: "wide", top: 56, left: 10, w: 112, h: 38, rot: -3 },
    { kind: "big", top: 67, left: 9, w: 104, h: 104, rot: -5 },
    { kind: "tiny", top: 2, left: 12, w: 38, h: 38, rot: -10 },
    { kind: "small", top: 84, left: 76, w: 66, h: 66, rot: 10 },
    { kind: "tiny", top: 44, left: 84, w: 40, h: 40, rot: 12 },
  ],
  3: [
    { kind: "wide", top: 3, left: 52, w: 100, h: 36, rot: 3 },
    { kind: "small", top: 12, left: 76, w: 66, h: 66, rot: 8 },
    { kind: "tiny", top: 30, left: 85, w: 40, h: 40, rot: -8 },
    { kind: "wide", top: 45, left: 12, w: 108, h: 38, rot: -3 },
    { kind: "big", top: 66, left: 54, w: 98, h: 98, rot: 5 },
    { kind: "small", top: 72, left: 80, w: 62, h: 62, rot: -6 },
    { kind: "tiny", top: 90, left: 56, w: 40, h: 40, rot: 10 },
  ],
};

const HAND_FONT = '"Segoe Script","Bradley Hand","Comic Sans MS",cursive';
const PAGE_W = 400; // px width of one page

/** One diary page with polaroid photos + cute stickers. Must stay a direct child of the book. */
export default function PhotoPage({
  side,
  seed = 0,
  photos,
  title,
  decor = [],
  corners,
  stickers,
  pairFrame,
  designFrame,
}: PageConfig & { side: "left" | "right"; seed?: number }) {
  const count = Math.min(Math.max(photos.length, 1), 3);
  const mirror = side === "left";
  const photoSlots = PHOTO_SLOTS[count];

  // Torn-paper corner pieces (default: one at the top + one at the bottom on single-photo pages).
  const cornerIds =
    corners ?? (count === 1 ? { top: ["side1", "paper", "side3"][seed % 3], bottom: "side2" } : {});

  // Decide which sticker goes in each slot.
  const used: Record<string, number> = {};
  const decorItems = (stickers ? [] : DECOR_SLOTS[count]).map((slot, i) => {
    const n = (used[slot.kind] = (used[slot.kind] ?? -1) + 1);
    const pool = POOLS[slot.kind];
    const id = decor[i] ?? pool[(seed * 2 + n) % pool.length];
    return { slot, id };
  });

  const renderSticker = (
    key: string,
    src: string,
    top: number,
    left: number,
    w: number,
    h: number,
    rot: number,
    z: number
  ) => (
    <div
      key={key}
      className="pointer-events-none absolute"
      style={{ top: `${top}%`, left: `${left}%`, width: w, height: h, zIndex: z, transform: `rotate(${rot}deg)` }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="160px"
        loading="eager"
        draggable={false}
        className="object-contain select-none"
      />
    </div>
  );

  return (
    <div
      className="relative overflow-hidden book-page bg-amber-50 text-black"
      style={{ width: PAGE_W, height: 500 }}
    >
      <Image
        src={mirror ? "/pages/left.jpg" : "/pages/right.jpg"}
        alt=""
        fill
        priority
        draggable={false}
        className="object-contain pointer-events-none select-none"
      />

      {/* torn-paper corners (behind everything else) */}
      {(["top", "bottom"] as const).map((pos) => {
        const id = cornerIds[pos];
        const info = id ? SCRAPS[id] : undefined;
        if (!id || !info) return null;
        const [iw, ih] = STICKER_SIZES[id];
        const outerRight = !mirror;
        // Flip the artwork horizontally / vertically so its straight edges
        // always sit on the page's outer edge and top/bottom edge.
        const naturalRight = info.corner.endsWith("R");
        const naturalBottom = info.corner.startsWith("B");
        const flipX = outerRight !== naturalRight;
        const flipY = (pos === "bottom") !== naturalBottom;
        const style: CSSProperties = {
          width: info.w,
          height: (info.w * ih) / iw,
          zIndex: 5,
          transform: flipX || flipY ? `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` : undefined,
        };
        if (pos === "top") style.top = 0;
        else style.bottom = 0;
        if (outerRight) style.right = 0;
        else style.left = 0;
        return (
          <div key={`corner-${pos}`} className="pointer-events-none absolute" style={style}>
            <Image
              src={stickerSrc(id)}
              alt=""
              fill
              sizes="130px"
              loading="eager"
              draggable={false}
              className="object-contain select-none"
            />
          </div>
        );
      })}

      {/* manual stickers */}
      {stickers?.map((st, i) =>
        renderSticker(`m${i}`, st.src, st.top, st.left, st.w, st.h ?? st.w, st.rot ?? 0, st.z ?? 30)
      )}

      {/* automatic / chosen decor stickers */}
      {decorItems.map(({ slot, id }, i) => {
        const left = mirror ? 100 - slot.left - (slot.w / PAGE_W) * 100 : slot.left;
        return renderSticker(`d${i}`, stickerSrc(id), slot.top, left, slot.w, slot.h, mirror ? -slot.rot : slot.rot, i === 6 ? 30 : 25);
      })}

      {/* two photos tucked into one pair frame (same look as page 6) */}
      {pairFrame && PAIR_FRAMES[pairFrame] && photos.length >= 2 && (() => {
        const f = PAIR_FRAMES[pairFrame];
        const H = 340; // px, same size as the frame on page 6
        const W = (H * f.w) / f.h;
        // page 6 is a right page (frame left of centre); on a left page it mirrors to the right of centre.
        const centreX = PAGE_W / 2 + (mirror ? -20 : -56); // left page: nudged away from the spiral
        return (
          <div
            className="pointer-events-none absolute z-20 drop-shadow-md"
            style={{ left: `${((centreX - W / 2) / PAGE_W) * 100}%`, top: 250 + 4 - H / 2, width: W, height: H }}
          >
            {photos.slice(0, 2).map((photo, i) => {
              const win = f.wins[i];
              return (
                <div
                  key={photo.src}
                  className="absolute overflow-hidden"
                  style={{
                    left: `${(win.cx / f.w) * 100}%`,
                    top: `${(win.cy / f.h) * 100}%`,
                    width: `${(win.w / f.w) * 100}%`,
                    height: `${(win.h / f.h) * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${win.rot}deg)`,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption ?? ""}
                    fill
                    sizes="200px"
                    loading="eager"
                    draggable={false}
                    className="object-cover select-none"
                  />
                </div>
              );
            })}
            <Image
              src={`/elements/${pairFrame}.png`}
              alt=""
              fill
              sizes="200px"
              loading="eager"
              draggable={false}
              className="object-fill select-none"
            />
          </div>
        );
      })()}

      {/* decorative design frame: photos sit behind the artwork, clipped to its (tilted) windows */}
      {designFrame && DESIGN_FRAMES[designFrame.id] && (() => {
        const f = DESIGN_FRAMES[designFrame.id];
        const H = designFrame.h;
        const W = (H * f.w) / f.h;
        return (
          <div
            className="pointer-events-none absolute z-20 drop-shadow-lg"
            style={{
              left: `${designFrame.cx}%`,
              top: `${designFrame.cy}%`,
              width: W,
              height: H,
              transform: `translate(-50%, -50%) rotate(${designFrame.rot ?? 0}deg)`,
            }}
          >
            {f.wins.map((win, i) => {
              const photo = photos[i];
              if (!photo) return null;
              const clip = `polygon(${win.poly.map(([x, y]) => `${x}% ${y}%`).join(",")})`;
              return (
                <div
                  key={`${photo.src}-${i}`}
                  className="absolute overflow-hidden"
                  style={{
                    left: `${(win.x / f.w) * 100}%`,
                    top: `${(win.y / f.h) * 100}%`,
                    width: `${(win.w / f.w) * 100}%`,
                    height: `${(win.h / f.h) * 100}%`,
                    clipPath: clip,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption ?? ""}
                    fill
                    sizes="200px"
                    loading="eager"
                    draggable={false}
                    className="object-cover select-none"
                    style={{ filter: "contrast(1.04) saturate(1.06)" }}
                  />
                </div>
              );
            })}
            <Image
              src={f.src}
              alt=""
              fill
              sizes="260px"
              loading="eager"
              draggable={false}
              className="object-fill select-none"
            />
          </div>
        );
      })()}

      {/* photos */}
      {(designFrame || (pairFrame && PAIR_FRAMES[pairFrame] && photos.length >= 2) ? [] : photos.slice(0, 3)).map((photo, i) => {
        const [x, top, slotW, slotRot] = photoSlots[i];
        const w = photo.width ?? slotW;
        const rot = photo.rot ?? slotRot;
        const left = mirror ? 100 - x - w : x;
        const frame = photo.frame ? FRAMES[photo.frame] : undefined;
        const wrapStyle: CSSProperties = {
          left: `${left}%`,
          top: `${top}%`,
          width: `${w}%`,
          transform: `rotate(${mirror ? -rot : rot}deg)`,
        };

        if (frame) {
          const { win } = frame;
          return (
            <figure key={photo.src} className="absolute z-20 drop-shadow-lg" style={wrapStyle}>
              <div className="relative w-full" style={{ aspectRatio: `${frame.ratio}` }}>
                {/* photo sits behind the frame, inside its window */}
                <div
                  className="absolute overflow-hidden"
                  style={{ left: `${win.x}%`, top: `${win.y}%`, width: `${win.w}%`, height: `${win.h}%` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption ?? ""}
                    fill
                    sizes="180px"
                    loading="eager"
                    draggable={false}
                    className="object-cover pointer-events-none select-none"
                  />
                </div>
                <Image
                  src={`/frames/${photo.frame}.png`}
                  alt=""
                  fill
                  sizes="180px"
                  loading="eager"
                  draggable={false}
                  className="object-fill pointer-events-none select-none"
                />
                {photo.caption && (
                  <figcaption
                    className="absolute inset-x-0 truncate text-center text-[10px] text-stone-600"
                    style={{ top: `${win.y + win.h + 3}%`, fontFamily: HAND_FONT }}
                  >
                    {photo.caption}
                  </figcaption>
                )}
              </div>
            </figure>
          );
        }

        // Default: a CSS-built instant-photo (cream paper, soft inner shadow, glossy photo, washi tape).
        const tapes = [
          "repeating-linear-gradient(135deg, rgba(244,184,200,.85) 0 5px, rgba(252,222,230,.85) 5px 10px)",
          "repeating-linear-gradient(135deg, rgba(196,222,206,.85) 0 5px, rgba(226,240,230,.85) 5px 10px)",
          "repeating-linear-gradient(135deg, rgba(242,214,160,.88) 0 5px, rgba(250,236,200,.88) 5px 10px)",
        ];
        return (
          <figure
            key={photo.src}
            className="absolute z-20 rounded-[2px] p-2 pb-9"
            style={{
              ...wrapStyle,
              background: "linear-gradient(160deg,#fffdf8 0%,#f7f1e4 100%)",
              boxShadow:
                "0 1px 1px rgba(0,0,0,.18), 0 6px 10px -2px rgba(60,40,20,.28), 0 14px 24px -8px rgba(60,40,20,.25), inset 0 0 0 1px rgba(120,100,70,.12)",
            }}
          >
            <span
              className="absolute -top-2.5 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 shadow-sm"
              style={{ background: tapes[(seed + i) % tapes.length], clipPath: "polygon(0 8%,4% 0,8% 10%,12% 0,100% 0,96% 12%,100% 24%,96% 36%,100% 50%,96% 64%,100% 76%,96% 88%,100% 100%,0 100%,4% 88%,0 76%,4% 62%,0 50%,4% 36%,0 24%)" }}
            />
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4 / 5", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.25), inset 0 0 14px rgba(0,0,0,.35)" }}
            >
              <Image
                src={photo.src}
                alt={photo.caption ?? ""}
                fill
                sizes="180px"
                loading="eager"
                draggable={false}
                className="object-cover pointer-events-none select-none"
                style={{ filter: "contrast(1.05) saturate(1.08) sepia(.1)" }}
              />
              {/* glossy sheen + soft vignette */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(125deg, rgba(255,255,255,.32) 0%, rgba(255,255,255,0) 38%), radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(40,20,0,.22) 100%)",
                }}
              />
            </div>
            {photo.caption && (
              <figcaption
                className="absolute inset-x-2 bottom-1.5 truncate text-center text-[12px] text-stone-700"
                style={{ fontFamily: HAND_FONT }}
              >
                {photo.caption}
              </figcaption>
            )}
          </figure>
        );
      })}

      {/* optional handwritten title strip */}
      {title && (
        <p
          className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 -rotate-2 whitespace-nowrap bg-[#f5d9b0] px-3 py-1 text-sm text-stone-700 shadow"
          style={{ fontFamily: HAND_FONT }}
        >
          {title}
        </p>
      )}
    </div>
  );
}
