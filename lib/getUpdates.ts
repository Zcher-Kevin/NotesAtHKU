import { REPO_NAME, REPO_OWNER } from "@/constants";

export async function getUpdatedFilesInLast5Days(): Promise<string[]> {
  const branch = "master";
  const daysAgo = 5;

  // Get the date 5 days ago in ISO format
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - daysAgo);
  const sinceISO = sinceDate.toISOString();

  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${process.env.PROD_GITHUB_TOKEN}`, // Personal Access Token
  };

  const fetchOptions = {
    headers,
    next: {
      revalidate: 86400, // 24 hours in seconds
    },
  };

  try {
    // Step 1: Get the branch's latest commit
    const branchResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/branches/${branch}`,
      fetchOptions
    );
    if (!branchResponse.ok) {
      throw new Error(
        `Failed to fetch the branch details: ${branchResponse.statusText}`
      );
    }
    const branchData = await branchResponse.json();
    const latestCommitSha = branchData.commit.sha;

    // Step 2: Get the commits history in the last 5 days
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=${latestCommitSha}&since=${sinceISO}`,
      fetchOptions
    );
    if (!commitsResponse.ok) {
      throw new Error(`Failed to fetch commits: ${commitsResponse.statusText}`);
    }
    const commits = await commitsResponse.json();

    // Step 3: Extract modified/added/removed files from each commit
    const updatedFiles = new Set<string>();
    for (const commit of commits) {
      const commitDetailsResponse = await fetch(commit.url, fetchOptions);
      if (!commitDetailsResponse.ok) {
        throw new Error(
          `Failed to fetch commit details: ${commitDetailsResponse.statusText}`
        );
      }
      const commitDetails = await commitDetailsResponse.json();
      const files = commitDetails.files || [];

      files.forEach((file: { filename: string }) => {
        updatedFiles.add(file.filename);
      });
    }

    // Convert the Set to an Array and return it
    return Array.from(updatedFiles);
  } catch (error) {
    console.error("Error fetching updated files:", error);
    return [];
  }
}
