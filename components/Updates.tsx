import { getUpdatedFilesInLast5Days } from "@/lib/getUpdates";

export default async function Updates() {
  const updatedFiles = await getUpdatedFilesInLast5Days();

  return (
    <div className="flex items-center justify-center w-full h-auto px-6 text-center bg-fd-accent">
      {updatedFiles.length > 0 ? (
        <div className="text-sm text-white">
          {updatedFiles.length} files have been updated in the last 5 days:
          <br />
          {updatedFiles.map((file, index) => (
            <span key={`file-${index}`} className="block text-xs">
              {file}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white">No updates in the last 5 days.</p>
      )}
    </div>
  );
}
