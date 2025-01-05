import React from "react";

interface Entry {
  debit: [React.ReactNode, React.ReactNode][];
  credit: [React.ReactNode, React.ReactNode][];
  date?: React.ReactNode;
  note?: React.ReactNode;
}

interface JournalEntryProps {
  entries: Entry[];
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entries }) => {
  const hasDate = entries.some((entry) => entry.date);

  return (
    <table className="mx-0 my-2 text-xs md:text-sm border-fd-border">
      <thead>
        <tr>
          {hasDate && <th className="px-2 py-[2px] md:px-3 md:py-1">Date</th>}
          <th className="px-2 py-[2px] md:px-3 md:py-1">Account</th>
          <th className="px-2 py-[2px] md:px-3 md:py-1">Debit</th>
          <th className="px-2 py-[2px] md:px-3 md:py-1">Credit</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, entryIndex) => {
          const combinedEntries = [
            ...entry.debit.map((debitEntry) => ({
              type: "Debit",
              entry: debitEntry,
            })),
            ...entry.credit.map((creditEntry) => ({
              type: "Credit",
              entry: creditEntry,
            })),
          ];

          return (
            <React.Fragment key={entryIndex}>
              {combinedEntries.map(
                ({ type, entry: [account, amount] }, index) => (
                  <tr key={index}>
                    {entry.date ? (
                      index === 0 ? (
                        <td className="px-2 py-[2px] md:px-3 md:py-1">
                          {entry.date}
                        </td>
                      ) : (
                        <td></td>
                      )
                    ) : null}
                    <td
                      className={`px-2 py-[2px] md:px-3 md:py-1 ${
                        type === "Credit" && "pl-5 md:pl-8"
                      }`}
                    >
                      {account}
                    </td>
                    <td className="px-2 py-[2px] md:px-3 md:py-1">
                      {type === "Debit" ? amount : ""}
                    </td>
                    <td className="px-2 py-[2px] md:px-3 md:py-1">
                      {type === "Credit" ? amount : ""}
                    </td>
                  </tr>
                )
              )}
              {entry.note && (
                <tr>
                  <td
                    colSpan={hasDate ? 4 : 3}
                    className="px-2 py-[2px] md:px-4 md:py-1 text-gray-600"
                  >
                    {entry.note}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default JournalEntry;
