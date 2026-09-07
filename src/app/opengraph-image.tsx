import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "STARKEST POV — Sinto Pallipadan Varghese";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ alignItems: "flex-start", background: "#0b0d0d", color: "#f2f0e9", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "72px", position: "relative", width: "100%" }}><div style={{ color: "#eec022", display: "flex", fontFamily: "Arial, sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: "5px" }}>STARKEST POV</div><div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 84, fontWeight: 800, letterSpacing: "-5px", lineHeight: 0.9, marginTop: "30px" }}>VISUAL<br />STORIES</div><div style={{ color: "#a7aaa5", display: "flex", fontFamily: "Arial, sans-serif", fontSize: 24, letterSpacing: "2px", marginTop: "34px" }}>SINTO PALLIPADAN VARGHESE · VIDEO EDITOR / PHOTOGRAPHER / CREATIVE</div><div style={{ background: "#03685a", borderRadius: "50%", display: "flex", height: "360px", opacity: 0.55, position: "absolute", right: "-100px", top: "-100px", width: "360px" }} /></div>, size);
}
