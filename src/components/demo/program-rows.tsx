import { demoPrograms } from "./demo-data";

type ProgramRowsProps = {
  query: string;
  selectedPrograms: string[];
  onToggle: (id: string) => void;
};

export function ProgramRows({
  query,
  selectedPrograms,
  onToggle,
}: ProgramRowsProps) {
  const programs = demoPrograms.filter((program) =>
    `${program.name} ${program.location}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <tbody className="divide-y divide-border-subtle text-xs">
      {programs.map((program) => (
        <tr key={program.id} className="transition-colors hover:bg-surface">
          <td
            data-label="Program Studi & Status"
            className="px-4 py-3.5 align-top"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold leading-snug text-text-primary">
                {program.name}
              </span>
              <span className="text-[11px] text-text-secondary">
                {program.location}
              </span>
              <span className="mt-0.5 self-start rounded bg-surface-subtle px-1.5 py-0.5 text-[10px] font-semibold text-secondary">
                {program.status}
              </span>
              <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded p-1 text-[11px] text-primary">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={selectedPrograms.includes(program.id)}
                  onChange={() => onToggle(program.id)}
                />{" "}
                Bandingkan
              </label>
            </div>
          </td>
          <td data-label="Minat Belajar" className="px-4 py-3.5 align-top">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-text-primary">
                {program.interest}
              </span>
              <span className="text-[11px] text-text-secondary">
                {program.interestNote}
              </span>
            </div>
          </td>
          <td data-label="Kesiapan Akademik" className="px-4 py-3.5 align-top">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-text-primary">
                {program.academic}
              </span>
              <span className="text-[11px] text-text-secondary">
                {program.academicNote}
              </span>
            </div>
          </td>
          <td
            data-label="Kelayakan Praktis & Biaya"
            className="px-4 py-3.5 align-top"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-text-primary">
                {program.cost}
              </span>
              <span className="text-[11px] text-text-secondary">
                {program.costNote}
              </span>
            </div>
          </td>
        </tr>
      ))}
      {programs.length === 0 && (
        <tr>
          <td colSpan={4} className="p-6 text-center text-secondary">
            Tidak ada pilihan yang sesuai pencarian “{query}”. Coba Informatika,
            Industri, atau DKV.
          </td>
        </tr>
      )}
    </tbody>
  );
}
