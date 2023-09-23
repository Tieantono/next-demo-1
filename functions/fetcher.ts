// Use async await keywords to load data from web API.
const fetcher = async (url: string) => {
    // fetch() is the fetch API.
    const response = await fetch(url);

    return response.json();
}

export default fetcher;