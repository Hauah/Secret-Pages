
"use client";

import { useEffect, useState } from "react";

const SIGNATURE = "Made with a little extra care, just for you.🎀";

export default function SecretNote({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let n = 0;
    setShown(0);

    const id = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= text.length) window.clearInterval(id);
    }, 38);

    return () => window.clearInterval(id);
  }, [text]);

  const signatureStart = text.indexOf(SIGNATURE);
  const signatureEnd =
    signatureStart === -1 ? -1 : signatureStart + SIGNATURE.length;

  const visibleText = text.slice(0, shown);
  const beforeSignature =
    signatureStart === -1
      ? visibleText
      : text.slice(0, Math.min(shown, signatureStart));

  const visibleSignature =
    signatureStart !== -1 && shown > signatureStart
      ? text.slice(signatureStart, Math.min(shown, signatureEnd))
      : "";

  const afterSignature =
    signatureEnd !== -1 && shown > signatureEnd
      ? text.slice(signatureEnd, shown)
      : "";

  return (
    <div
      role="dialog"
      aria-label="Secret note"
      className="absolute inset-0 z-[10000] flex items-center justify-center bg-black/60 p-3"
    >
      <div
        className="note-in relative w-fit max-w-[82vw] px-4 sm:px-6 pb-4 pt-8 text-stone-700 shadow-2xl"
        style={{
          background: "#fff8e7",
          backgroundImage:
            "repeating-linear-gradient(transparent 0 23px, rgba(200,150,160,.35) 23px 24px)",
          backgroundPosition: "0 6px",
        }}
      >
        <span className="absolute -top-3 left-4 h-5 w-14 -rotate-6 bg-pink-300/70" />
        <span className="absolute -top-3 right-4 h-5 w-14 rotate-6 bg-pink-300/70" />

        {shown >= text.length && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-10 text-sm hover:scale-110 transition-transform"
            aria-label="Close note"
          >
            ❌
          </button>
        )}

        <p className="whitespace-pre-line font-serif text-[11px] sm:text-xs italic leading-[24px]">
          {signatureStart === -1 ? (
            visibleText
          ) : (
            <>
              {beforeSignature}
              <span className="font-bold italic">
                {visibleSignature}
              </span>
              {afterSignature}
            </>
          )}
          {shown < text.length && <span className="note-caret">|</span>}
        </p>
      </div>
    </div>
  );
}
