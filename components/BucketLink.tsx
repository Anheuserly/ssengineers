"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import {
  readServiceBucket,
  SERVICE_BUCKET_UPDATED_EVENT,
} from "@/lib/service-bucket";

export default function BucketLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(readServiceBucket().length);
    refresh();
    window.addEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Link className="bucket-link" href="/bucket" aria-label={`Service bucket: ${count} selected`}>
      <ShoppingBag aria-hidden="true" size={18} strokeWidth={2} />
      <span className="bucket-link-label">Bucket</span>
      <span className="bucket-count" aria-hidden="true">{count}</span>
    </Link>
  );
}
