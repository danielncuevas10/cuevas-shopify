"use client";

import { useState } from "react";

export default function VariantSelector({ variants }: any) {
  const [selected, setSelected] = useState(variants?.[0]?.node?.id);

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="border p-2"
    >
      {variants?.map((v: any) => (
        <option key={v.node.id} value={v.node.id}>
          {v.node.title || "Default"}
        </option>
      ))}
    </select>
  );
}
