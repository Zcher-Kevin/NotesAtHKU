export default function BlockSep({ title = "" }: { title: string }) {
  return (
    <>
      <div
        className={`flex items-center ${
          title === "" ? "my-1" : "-my-1"
        } opacity-70`}
      >
        <span className="mr-2">{title}</span>
        <div className="flex-grow border-t border-fd-foreground" />
      </div>
    </>
  );
}
