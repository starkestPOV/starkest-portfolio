import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<div style={{ alignItems: "center", background: "#0b0d0d", color: "#eec022", display: "flex", fontFamily: "Arial, sans-serif", fontSize: 34, fontWeight: 800, height: "100%", justifyContent: "center", width: "100%" }}>S</div>, size);
}
