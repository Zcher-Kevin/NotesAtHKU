interface GitEditOptions {
  repo: string;
  owner: string;
  path: string;
  token: string;
}

export async function getGithubLastEdit({
  repo,
  owner,
  path,
  token,
}: GitEditOptions) {
  const params = new URLSearchParams();
  params.set("path", path);
  params.set("page", "1");
  params.set("per_page", "1");

  const headers = new Headers();

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?${params.toString()}`,
    {
      cache: "force-cache",
      headers,
    }
  );
  if (!res.ok)
    throw new Error(
      `Failed to fetch last edit time from Git ${await res.text()}`
    );
  const data = await res.json();
  if (data.length === 0) return null;
  return new Date(data[0].commit.committer.date);
}
