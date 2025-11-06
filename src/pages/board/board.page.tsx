import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui";
import { useState } from "react";

export function BoardPage() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <UiPageSpinner />;
  }

  return (
    <ComposeChildren>
      <div className="flex flex-col py-3 px-4 grow">
        {/* TODO: Add page title */}
        <div className="shrink-0 mb-2 flex gap-5"></div>
      </div>
    </ComposeChildren>
  );
}
