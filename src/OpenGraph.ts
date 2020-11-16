export interface HybridGraph {
    title?: string
    description?: string
    favicon?: string
    url?: string
}

export interface OpenGraphResponse {
    hybridGraph: HybridGraph
}

/**
 * Function to get site info from opengraph.io
 * @param apikey API key for opengraph.io
 * @param url URL to look up
 */
export async function pageInfo(apikey: string, url: string): Promise<OpenGraphResponse> {
    let requestURL = new URL("https://opengraph.io/api/1.1/site/" + encodeURIComponent(url))
    requestURL.searchParams.append("accept_lang", "auto");
    requestURL.searchParams.append("app_id", apikey);

    return await (await fetch(requestURL.toString())).json();
}
