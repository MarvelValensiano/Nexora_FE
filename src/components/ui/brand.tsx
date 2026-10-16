import Image from "next/image";

export function Brand({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/images/nexalora-logo.webp"
      alt="Nexalora — Where Your Future Begins"
      width={512}
      height={128}
      className={`object-contain ${className}`}
    />
  );
}
