import { useRouter } from "next/router";
import { Button } from "@/shared/ui/primitives/button";
import { UiText } from "@/shared/ui";

export function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-6">
          <UiText variant="h1" align="center">
            403
          </UiText>

          <div className="h-12 w-px bg-white" />

          <UiText variant="small" align="center">
            Access denied
          </UiText>
        </div>

        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
}
