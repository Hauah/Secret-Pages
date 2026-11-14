// ─────────────────────────────────────────────────────────────────────────
//  ADD YOUR PHOTO PAGES HERE
//
//  1. Put your photos in  public/photos/   (e.g. public/photos/trip1.jpg)
//  2. Add a new { left, right } block below. Each block = one open spread
//     (a left page + a right page), so pages are always added in pairs.
//  3. Each page holds 1, 2 or 3 photos. Cute stickers are added around them
//     automatically. Optional extras per page:
//       caption (on a photo), title, decor: ["ted", "billa", ...],
//       corners: { top: "side1", bottom: "side2" }
//
//  Photos:   "/photos/trip1.jpg"
//  Stickers: ids from public/stickers, e.g. "ted", "billa6", "peng", "kit",
//            "rabbit", "mouse", "butter", "lovetape", "start", "starem" ...
//  Tip: avoid special characters like # or spaces in photo file names.
// ─────────────────────────────────────────────────────────────────────────
import type { SpreadConfig } from "./PhotoPage";

export const PHOTO_SPREADS: SpreadConfig[] = [
  {
    // LEFT page = page 8 (spiral on the right edge): 2 smaller framed photos
    left: {
      pairFrame: "frame7", // two photos close together, same frame as page 6
      photos: [
        { src: "/photos/page8-a.jpg", caption: "one of my favourite days" },
        { src: "/photos/page8-b.jpg", caption: "a memory I keep" },
      ],
      // hand-placed stickers (top/left in % of the 400x500 page, w/h in px) so nothing covers the photos
      stickers: [
        { src: "/stickers/lyrics.png", top: 3, left: 29, w: 96, h: 34, rot: -4 },
        { src: "/stickers/mine.png", top: 3, left: 63, w: 76, h: 29, rot: 5 },
        { src: "/stickers/flow.png", top: 17, left: 74, w: 36, h: 74, rot: 8 },
        { src: "/stickers/rosel.png", top: 37, left: 71, w: 46, h: 71, rot: 6 },
        { src: "/stickers/cutbox.png", top: 53, left: 69, w: 60, h: 58, rot: -6 },
        { src: "/stickers/ted.png", top: 68, left: 66, w: 54, h: 54, rot: -4 },
        { src: "/stickers/billa3.png", top: 83, left: 73, w: 44, h: 52, rot: 6 },
        { src: "/stickers/lovey.png", top: 26, left: 3, w: 32, h: 108, rot: -6 },
        { src: "/stickers/tape2.png", top: 17, left: 15, w: 38, h: 42, rot: -35 },
        { src: "/stickers/rabbit.png", top: 50, left: 4, w: 46, h: 60, rot: -6 },
        { src: "/stickers/cutold.png", top: 62, left: 6, w: 56, h: 50, rot: 8 },
        { src: "/stickers/recorder.png", top: 86, left: 36, w: 70, h: 54, rot: -4 },
      ],
      corners: { top: "paper", bottom: "side2" },
    },
    // RIGHT page (spiral on the left edge)
    right: {
      photos: [{ src: "/photos/memory1.jpg", caption: "a memory I keep" }],
      decor: ["fits", "start", "fwine", "twoStar", "peng", "billa5", "kit"],
      corners: { top: "side1", bottom: "side2" },
    },
  },

  // ───────────── NEW SPREAD 1: cute cats (pink Polaroid frames) ─────────────
  {
    left:
    {
      designFrame: { id: "h1", cx: 41, cy: 50, h: 580, rot: 0 },
      photos: [{ src: "/ref/girl.jpg" }],
      corners: {},
      stickers: [
        { src: "/stickers/cat1.png", top: 0.0, left: 0.5, w: 112, h: 118, rot: -6 },
        { src: "/stickers/fits.png", top: 2.4, left: 30.0, w: 56, h: 51, rot: -8, z: 40 },
        { src: "/stickers/brn22.png", top: 1.9, left: 51.2, w: 84, h: 87, rot: 6 },
        { src: "/stickers/boqey.png", top: 20.0, left: 72.0, w: 58, h: 72, rot: 7 },
        { src: "/stickers/momo.png", top: 39.2, left: 70.5, w: 66, h: 66, rot: 6 },
        { src: "/stickers/butter.png", top: 58.4, left: 72.5, w: 54, h: 47, rot: 6 },
        { src: "/stickers/stamp.png", top: 69.0, left: 73.0, w: 46, h: 44, rot: -6 },
        { src: "/stickers/lovey.png", top: 28.0, left: 1.0, w: 26, h: 88, rot: -6 },
        { src: "/stickers/starem.png", top: 64.0, left: 1.0, w: 26, h: 25, rot: 12, z: 40 },
        { src: "/stickers/twoStar.png", top: 50.0, left: 1.5, w: 34, h: 34, rot: 8 },
        { src: "/stickers/brn28.png", top: 78.4, left: 49.1, w: 99, h: 107, rot: 4 },
        { src: "/stickers/rosel.png", top: 77.0, left: 1.0, w: 46, h: 74, rot: -6 },
        { src: "/stickers/txt3.png", top: 93.2, left: 1.0, w: 130, h: 29, rot: -3 },
        { src: "/stickers/lovetape.png", top: 85.0, left: 75.0, w: 40, h: 13, rot: -20 },
      ],
    },
    right:
    {
      designFrame: { id: "h4", cx: 50, cy: 50, h: 560, rot: 0 },
      photos: [{ src: "/ref/girl4.jpg" }, { src: "/photos/photo1.jpg" }, { src: "/photos/photo2.jpg" }],
      corners: {},
      stickers: [
        { src: "/stickers/brn24.png", top: 1.0, left: 14.5, w: 88, h: 95, rot: -6 },
        { src: "/stickers/brn3.png", top: 2.4, left: 37.5, w: 48, h: 41, rot: 6 },
        { src: "/stickers/cat2.png", top: 0.0, left: 75.0, w: 96, h: 79, rot: 5 },
        { src: "/stickers/moon.png", top: 23.6, left: 14.5, w: 56, h: 56, rot: -7 },
        { src: "/stickers/miss.png", top: 76.0, left: 13.5, w: 70, h: 23, rot: 4 },
        { src: "/stickers/starB.png", top: 20.0, left: 86.0, w: 52, h: 47, rot: 6 },
        { src: "/stickers/brn27.png", top: 34.2, left: 86.5, w: 47, h: 40, rot: -5 },
        { src: "/stickers/brn21.png", top: 46.6, left: 87.5, w: 40, h: 34, rot: 5 },
        { src: "/stickers/brn11.png", top: 60.3, left: 86.5, w: 42, h: 39, rot: -8 },
        { src: "/stickers/recorder.png", top: 86.0, left: 14.0, w: 84, h: 65, rot: -4 },
        { src: "/stickers/gussa.png", top: 79.6, left: 65.5, w: 70, h: 100, rot: 5 },
        { src: "/stickers/start.png", top: 94.8, left: 40.0, w: 80, h: 26, rot: -3 },
      ],
    },
  },

  // ───────────── NEW SPREAD 2: vintage collage (hearts string + photo strip) ─────────────
  {
    left:
    {
      designFrame: { id: "h2", cx: 42, cy: 51, h: 470, rot: 0 },
      photos: [{ src: "/ref/girl5.jpg" }, { src: "/ref/girl6.jpg" }, { src: "/ref/girl7.jpg" }],
      corners: { bottom: "side2" },
      stickers: [
        { src: "/stickers/vin4.png", top: 0.0, left: 0.0, w: 96, h: 139, rot: 0, z: 5 },
        { src: "/stickers/vin2.png", top: 0.0, left: 72.5, w: 44, h: 100, rot: 4 },
        { src: "/stickers/txt1.png", top: 0.4, left: 25.0, w: 120, h: 63, rot: -4, z: 40 },
        { src: "/stickers/vin3.png", top: 21.0, left: 67.5, w: 70, h: 74, rot: 7 },
        { src: "/stickers/vin7.png", top: 38.0, left: 65.5, w: 78, h: 78, rot: -6 },
        { src: "/stickers/vin1.png", top: 55.0, left: 67.5, w: 62, h: 74, rot: 5 },
        { src: "/stickers/flow.png", top: 71.0, left: 75.0, w: 11, h: 23, rot: 10 },
        { src: "/stickers/vin8.png", top: 79.0, left: 62.5, w: 92, h: 92, rot: -5 },
        { src: "/stickers/brn26.png", top: 39.2, left: 1.0, w: 44, h: 47, rot: -8 },
        { src: "/stickers/bot7.png", top: 60.0, left: 1.0, w: 42, h: 95, rot: -6 },
        { src: "/stickers/vin5.png", top: 83.0, left: 29.5, w: 100, h: 92, rot: 3 },
      ],
    },
    right:
    {
      designFrame: { id: "h3", cx: 55, cy: 38, h: 620, rot: 0 },
      photos: [{ src: "/ref/girl8.jpg" }, { src: "/ref/girl9.jpg" }, { src: "/ref/girl10.jpg" }],
      corners: { top: "side1" },
      stickers: [
        { src: "/stickers/brn31.png", top: 1.2, left: 14.0, w: 99, h: 70, rot: -4 },
        { src: "/stickers/fwine.png", top: 22.0, left: 14.5, w: 44, h: 82, rot: -6 },
        { src: "/stickers/cutold.png", top: 46.0, left: 14.5, w: 46, h: 41, rot: 5 },
        { src: "/stickers/brn18.png", top: 63.6, left: 14.5, w: 64, h: 88, rot: -5 },
        { src: "/stickers/tape2.png", top: 18.0, left: 85.0, w: 38, h: 42, rot: -30 },
        { src: "/stickers/cutbox.png", top: 30.0, left: 84.0, w: 60, h: 58, rot: 6 },
        { src: "/stickers/vin6.png", top: 62.0, left: 66.5, w: 130, h: 190, rot: 0, z: 5 },
        { src: "/stickers/txt2.png", top: 88.0, left: 14.0, w: 100, h: 32, rot: -4 },
        { src: "/stickers/brn25.png", top: 86.4, left: 37.5, w: 130, h: 65, rot: -3 },
        { src: "/stickers/brn1.png", top: 0.4, left: 37.5, w: 120, h: 46, rot: -3 },
        { src: "/stickers/brn20.png", top: 44.4, left: 85.0, w: 56, h: 51, rot: 8 },
        { src: "/stickers/brn19.png", top: 57.0, left: 87.2, w: 42, h: 44, rot: 0 },
      ],
    },
  },

  // ───────────── NEW SPREAD 3: botanical scraps (binder clips + stars frame) ─────────────
  {
    left:
    {
      designFrame: { id: "g2", cx: 42, cy: 51, h: 480, rot: 0 },
      photos: [{ src: "/ref/girl11.jpg" }, { src: "/photos/page8-a.jpg" }],
      corners: {},
      stickers: [
        { src: "/stickers/bot2.png", top: 0.0, left: 0.0, w: 92, h: 130, rot: 0, z: 5 },
        { src: "/stickers/bot13.png", top: 0.0, left: 49.0, w: 92, h: 96, rot: -5 },
        { src: "/stickers/bot3.png", top: 12.0, left: 71.5, w: 56, h: 58, rot: 8 },
        { src: "/stickers/bot4.png", top: 26.0, left: 72.0, w: 54, h: 68, rot: 6 },
        { src: "/stickers/bot6.png", top: 75.0, left: 0.0, w: 44, h: 100, rot: 0, z: 5 },
        { src: "/stickers/txt4.png", top: 82.4, left: 12.0, w: 122, h: 59, rot: -3 },
        { src: "/stickers/lyrics.png", top: 89.6, left: 45.0, w: 98, h: 34, rot: -4, z: 40 },
        { src: "/stickers/brn9.png", top: 35.2, left: 69.0, w: 66, h: 52, rot: 5 },
        { src: "/stickers/brn8.png", top: 47.2, left: 70.5, w: 60, h: 59, rot: -6 },
        { src: "/stickers/brn5.png", top: 60.8, left: 69.5, w: 64, h: 68, rot: 6 },
        { src: "/stickers/brn7.png", top: 76.0, left: 71.0, w: 56, h: 56, rot: -8 },
        { src: "/stickers/brn6.png", top: 90.4, left: 59.0, w: 44, h: 42, rot: 12 },
      ],
    },
    right:
    {
      designFrame: { id: "v10", cx: 55, cy: 47, h: 400, rot: -3 },
      photos: [{ src: "/photos/page8-right.jpg" }],
      corners: {},
      stickers: [
        { src: "/stickers/bot8.png", top: 0.0, left: 14.5, w: 70, h: 98, rot: -6 },
        { src: "/stickers/bot1.png", top: 0.4, left: 47.5, w: 40, h: 52, rot: 3 },
        { src: "/stickers/bot12.png", top: 0.4, left: 75.0, w: 60, h: 95, rot: 6 },
        { src: "/stickers/mine.png", top: 22.0, left: 14.5, w: 66, h: 25, rot: -4 },
        { src: "/stickers/bot10.png", top: 70.0, left: 72.0, w: 108, h: 150, rot: 0, z: 5 },
        { src: "/stickers/bot5.png", top: 77.6, left: 15.0, w: 76, h: 83, rot: -6 },
        { src: "/stickers/bot11.png", top: 82.4, left: 35.0, w: 60, h: 84, rot: 4 },
        { src: "/stickers/brn2.png", top: 21.0, left: 86.0, w: 50, h: 38, rot: 6 },
        { src: "/stickers/brn10.png", top: 30.2, left: 14.0, w: 56, h: 24, rot: -6 },
        { src: "/stickers/brn16.png", top: 37.2, left: 14.5, w: 34, h: 61, rot: -4 },
        { src: "/stickers/brn17.png", top: 35.2, left: 86.5, w: 50, h: 62, rot: 5 },
        { src: "/stickers/brn15.png", top: 53.6, left: 13.5, w: 56, h: 23, rot: -8 },
        { src: "/stickers/brn29.png", top: 50.4, left: 87.0, w: 40, h: 60, rot: 6 },
        { src: "/stickers/brn23.png", top: 78.4, left: 51.2, w: 68, h: 96, rot: 2 },
      ],
    },
  },
];
