import clsx from "clsx";
import { UiSpinner } from "./ui-spinner";
import { useAppearanceDelay } from "../lib/react";

export function UiPageSpinner({
  className,
  isLoading,
}: {
  className?: string;
  isLoading?: boolean;
}) {
  const isShown = useAppearanceDelay(isLoading, {
    minDisplay: 500,
    defaultValue: isLoading,
  });

  if (!isShown) return null;

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-primary-foreground",
        className,
      )}
    >
      <UiSpinner className="text-primary w-16 h-16 " />
    </div>
  );
}
