interface GithubData {
    totalStars: number;
    totalRepos: number;
    followers: number;
    contributions: number;
    isMockData: boolean;
    formattedStats: {
        totalRepos: string;
        totalStars: string;
        followers: string;
        contributions: string;
    };
}

const FALLBACK_DATA: GithubData = {
    totalStars: 0,
    totalRepos: 0,
    followers: 0,
    contributions: 0,
    isMockData: true,
    formattedStats: {
        totalRepos: "0",
        totalStars: "0",
        followers: "0",
        contributions: "0",
    },
};

export async function getGithubData(): Promise<GithubData> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const res = await fetch(
            "https://portfolio.elias4044.com/api/github/stats",
            { signal: controller.signal }
        );
        clearTimeout(timeout);

        if (!res.ok) {
            console.warn("GitHub stats request failed:", res.status);
            return FALLBACK_DATA;
        }

        let data: unknown;

        try {
            data = await res.json();
        } catch (err) {
            console.warn("JSON parse failed:", err);
            return FALLBACK_DATA;
        }

        // Validate required fields
        if (
            typeof data === "object" &&
            data !== null &&
            "totalRepos" in data &&
            "totalStars" in data &&
            "followers" in data &&
            "contributions" in data
        ) {
            return data as unknown as GithubData;
        }

        console.warn("Invalid GitHub data structure:", data);
        return FALLBACK_DATA;

    } catch (err: any) {
        if (err.name === "AbortError") {
            console.warn("GitHub stats request timed out");
        } else {
            console.warn("Network/CORS error:", err);
        }

        return FALLBACK_DATA;
    }
}
